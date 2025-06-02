import React, { useState, useEffect } from "react";
import axios from "axios";

const TransactionAdmin = () => {
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(5);
  const [selectedTransactionItems, setSelectedTransactionItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [invoiceDetails, setInvoiceDetails] = useState(""); // For storing the invoice HTML

  const handleViewInvoice = async (transactionId) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/transactions/${transactionId}/invoice`
      );
      setInvoiceDetails(response.data.invoiceHtml); // Assuming the server returns HTML content for the invoice
      setShowModal(true);
    } catch (error) {
      console.error("Error fetching invoice:", error);
    }
  };

  const handleViewItems = async (transactionId) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/transactions/${transactionId}/items`
      );
      setSelectedTransactionItems(response.data);
      setShowModal(true);
    } catch (error) {
      console.error("Error fetching transaction items:", error);
    }
  };

  const handleAccept = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/transactions/${id}`, {
        status: "Diterima",
      });
      setData((prevData) =>
        prevData.map((item) =>
          item.id === id ? { ...item, status: "Diterima" } : item
        )
      );
    } catch (error) {
      console.error("Error accepting transaction:", error);
    }
  };

  const handleReject = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/transactions/${id}`, {
        status: "Ditolak",
      });
      setData((prevData) =>
        prevData.map((item) =>
          item.id === id ? { ...item, status: "Ditolak" } : item
        )
      );
    } catch (error) {
      console.error("Error rejecting transaction:", error);
    }
  };

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/transactionsAdmin"
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();
  }, []);

  const filteredData = data.filter((item) =>
    Object.values(item).some((val) =>
      String(val).toLowerCase().includes(searchText.toLowerCase())
    )
  );
  const formatRupiah = (value) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(value);

  const currentData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  return (
    <div className="min-h-screen bg-base-200 px-6 py-10 space-y-12">
      <div className="bg-base-100 p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-bold mb-4">Tabel Transaksi</h2>

        <div className="flex flex-col sm:flex-row sm:justify-between gap-4 mb-4">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-full sm:w-1/3"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>

        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th className="text-center">No.</th>
                <th className="text-center">Nama</th>
                <th className="text-center">Status</th>
                <th className="text-center">Total</th>
                <th className="text-center">Metode Pembayaran</th>
                <th className="text-center">Tanggal</th>
                <th className="text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((item, idx) => (
                <tr key={item.id}>
                  <td className="text-center">
                    {(currentPage - 1) * rowsPerPage + idx + 1}
                  </td>
                  <td className="text-center">{item.name}</td>
                  <td className="text-center">{item.status}</td>
                  <td className="text-center">{formatRupiah(item.total)}</td>
                  <td className="text-center">{item.method}</td>
                  <td className="text-center">
                    {new Date(item.created_at).toLocaleDateString()}
                  </td>
                  <td className="text-center space-x-2">
                    <button
                      className="btn btn-info btn-xs"
                      onClick={() => handleViewItems(item.id)}
                    >
                      Lihat Barang
                    </button>
                    <button
                      className="btn btn-success btn-xs"
                      onClick={() => handleAccept(item.id)}
                      disabled={item.status === "Diterima"}
                    >
                      Terima
                    </button>
                    <button
                      className="btn btn-error btn-xs"
                      onClick={() => handleReject(item.id)}
                      disabled={item.status === "Ditolak"}
                    >
                      Tolak
                    </button>
                    <button
                      className="btn btn-primary btn-xs"
                      onClick={() => handleViewInvoice(item.id)}
                    >
                      Lihat Invoice
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="btn btn-sm btn-outline"
          >
            ← Prev
          </button>

          <div className="flex items-center gap-1">
            {currentPage > 3 && (
              <>
                <button
                  onClick={() => setCurrentPage(1)}
                  className="btn btn-sm btn-outline"
                >
                  1
                </button>
                {currentPage > 4 && (
                  <span className="px-2 text-gray-500">...</span>
                )}
              </>
            )}

            {Array.from({ length: 5 }, (_, i) => {
              const page = currentPage - 2 + i;
              if (page < 1 || page > totalPages) return null;
              return (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`btn btn-sm btn-outline ${
                    page === currentPage ? "btn-active" : ""
                  }`}
                >
                  {page}
                </button>
              );
            })}

            {currentPage < totalPages - 2 && (
              <>
                {currentPage < totalPages - 3 && (
                  <span className="px-2 text-gray-500">...</span>
                )}
                <button
                  onClick={() => setCurrentPage(totalPages)}
                  className="btn btn-sm btn-outline"
                >
                  {totalPages}
                </button>
              </>
            )}
          </div>

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="btn btn-sm btn-outline"
          >
            Next →
          </button>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md">
            <h3 className="text-lg font-bold mb-4">Invoice</h3>
            <div
              className="space-y-2"
              dangerouslySetInnerHTML={{ __html: invoiceDetails }} // Rendering HTML invoice
            ></div>
            <div className="text-right mt-4">
              <button
                className="btn btn-sm btn-outline"
                onClick={() => setShowModal(false)}
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionAdmin;
