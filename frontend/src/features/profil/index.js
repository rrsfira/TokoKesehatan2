import React, { useEffect, useState } from "react";
import axios from "axios";
import { UserIcon, MapPinIcon, ClockIcon } from "@heroicons/react/24/outline";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import Swal from "sweetalert2";

const ProfileInfo = () => {
  const [user, setUser] = useState(null);
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [feedbackTransaction, setFeedbackTransaction] = useState(null);
  const [feedbackMessages, setFeedbackMessages] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Token tidak ditemukan.");
      setLoading(false);
      return;
    }

    const fetchProfile = axios.get("http://localhost:5000/api/profile", {
      headers: { Authorization: `Bearer ${token}` },
    });

    const fetchPurchases = axios.get("http://localhost:5000/api/purchases", {
      headers: { Authorization: `Bearer ${token}` },
    });

    Promise.all([fetchProfile, fetchPurchases])
      .then(([profileRes, purchaseRes]) => {
        const data = profileRes.data.user || profileRes.data;
        setUser(data);
        setPurchases(purchaseRes.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(
          "Gagal mengambil data:",
          err.response?.data || err.message
        );
        setError("Gagal mengambil data.");
        setLoading(false);
      });
  }, []);

  const formatRupiah = (value) => `Rp ${value.toLocaleString("id-ID")}`;

  const handlePrintPDF = (purchase) => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("INVOICE PEMBELIAN", 105, 20, { align: "center" });

    doc.setFontSize(12);
    doc.text(
      `Tanggal: ${new Date(purchase.date).toLocaleDateString("id-ID")}`,
      14,
      30
    );
    doc.text(`Order ID: #${purchase.order_id || purchase.id}`, 150, 30);

    doc.setFontSize(14);
    doc.text("Informasi Pengguna", 14, 40);

    doc.setFontSize(11);
    const userInfo = [
      [`Nama`, user.name],
      [`Email`, user.email],
      [`Alamat`, `${user.address}, ${user.city}`],
      [`No. Telepon`, user.contact],
    ];
    userInfo.forEach(([label, value], i) => {
      doc.text(`${label}: ${value}`, 14, 50 + i * 6);
    });

    const items = Array.isArray(purchase.items) ? purchase.items : [];

    let tableEndY = 80;
    if (items.length > 0) {
      autoTable(doc, {
        startY: 80,
        head: [["Produk", "Harga", "Jumlah", "Total"]],
        body: items.map((item) => [
          item.name,
          formatRupiah(item.price),
          item.quantity,
          formatRupiah(item.price * item.quantity),
        ]),
        theme: "striped",
        headStyles: { fillColor: [59, 130, 246] },
      });
      tableEndY = doc.lastAutoTable.finalY + 10;
    } else {
      doc.setFontSize(12);
      doc.text("Tidak ada item dalam transaksi ini.", 14, 80);
    }

    doc.setFontSize(12);
    doc.text(`Total: ${formatRupiah(purchase.total)}`, 150, tableEndY);

    doc.setFontSize(14);
    doc.text("Informasi Pembayaran", 14, tableEndY + 20);
    doc.setFontSize(11);
    doc.text(`Metode: ${purchase.method}`, 14, tableEndY + 28);
    doc.text(`Status: ${purchase.status}`, 14, tableEndY + 34);

    doc.save(`invoice-${purchase.order_id || purchase.id}.pdf`);
  };

  const handleCancelTransaction = async (transactionId) => {
    const result = await Swal.fire({
      title: "Apakah Anda yakin?",
      text: "Transaksi ini akan dibatalkan.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, batalkan!",
      cancelButtonText: "Tidak",
    });

    if (result.isConfirmed) {
      try {
        const token = localStorage.getItem("token");
        await axios.put(
          `http://localhost:5000/api/transactions/${transactionId}/cancel`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );
        Swal.fire("Dibatalkan!", "Transaksi telah dibatalkan.", "success");
        setPurchases((prev) =>
          prev.map((p) =>
            p.id === transactionId ? { ...p, status: "dibatalkan" } : p
          )
        );
      } catch (error) {
        console.error("Gagal membatalkan transaksi:", error);
        Swal.fire(
          "Gagal!",
          "Terjadi kesalahan saat membatalkan transaksi.",
          "error"
        );
      }
    }
  };

  const isFeedbackEmpty = Object.values(feedbackMessages).every(
    (msg) => !msg.trim()
  );

  const sendFeedbacks = async () => {
    const token = localStorage.getItem("token");
  
    // Ambil hanya feedback yang tidak kosong
    const feedbacks = feedbackTransaction.items.map((prod) => ({
      transaction_id: feedbackTransaction.id,
      description: feedbackMessages[prod.id] || "",
    }));      
  
    console.log("Feedbacks payload:", feedbacks);
  
    try {
      await axios.post(
        `http://localhost:5000/api/feedbacks`,
        { feedbacks },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      Swal.fire("Berhasil!", "Feedback berhasil dikirim!", "success");
  
      // Tandai feedback sudah dikirim pada transaksi
      const updatedPurchases = purchases.map((p) =>
        p.id === feedbackTransaction.id
          ? {
              ...p,
              items: p.items.map((item) => ({
                ...item,
                feedbackGiven: true,
              })),
            }
          : p
      );
      setPurchases(updatedPurchases);
  
      setFeedbackTransaction(null);
      setFeedbackMessages({});
      setShowFeedbackModal(false);
    } catch (error) {
      Swal.fire("Gagal!", "Terjadi kesalahan saat mengirim feedback.", "error");
      console.error("Feedback error:", error);
    }
  };
  
  if (loading) {
    return (
      <div className="text-center mt-10 text-gray-500">
        Memuat data profil...
      </div>
    );
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-5xl mx-auto p-4 space-y-6">
      {/* Informasi Profil */}
      <div className="card bg-base-100 shadow rounded-md">
        <div className="card-body">
          <h2 className="text-lg font-semibold text-primary flex items-center border-b pb-2 mb-4">
            <UserIcon className="w-5 h-5 mr-2 text-primary" />
            Informasi Profil
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm md:text-base">
            <div className="space-y-3">
              <div>
                <p className="text-gray-500">Username</p>
                <p className="font-bold">{user.name}</p>
              </div>
              <div>
                <p className="text-gray-500">Email</p>
                <p className="font-bold">{user.email}</p>
              </div>
              <div>
                <p className="text-gray-500">Tanggal Lahir</p>
                <p className="font-bold">
                  {user.birth ? new Date(user.birth).toLocaleDateString() : "-"}
                </p>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-gray-500">Jenis Kelamin</p>
                <p className="font-bold">{user.gender}</p>
              </div>
              <div>
                <p className="text-gray-500">Nomor Kontak</p>
                <p className="font-bold">{user.contact}</p>
              </div>
              <div>
                <p className="text-gray-500">PayPal ID</p>
                <p className="font-bold">{user.bill}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Informasi Alamat */}
      <div className="card bg-base-100 shadow rounded-md">
        <div className="card-body">
          <h2 className="text-lg font-semibold text-primary flex items-center border-b pb-2 mb-4">
            <MapPinIcon className="w-5 h-5 mr-2 text-primary" />
            Informasi Alamat
          </h2>
          <div className="space-y-3 text-sm md:text-base">
            <div>
              <p className="text-gray-500">Alamat Lengkap</p>
              <p className="font-bold">{user.address}</p>
            </div>
            <div>
              <p className="text-gray-500">Kota</p>
              <p className="font-bold">{user.city}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Riwayat Pembelian */}
      <div className="card bg-base-100 shadow rounded-md">
        <div className="card-body">
          <h2 className="text-lg font-semibold text-primary flex items-center border-b pb-2 mb-4">
            <ClockIcon className="w-5 h-5 mr-2 text-primary" />
            Riwayat Pembelian
          </h2>
          <div className="overflow-x-auto">
            <table className="table w-full text-sm md:text-base">
              <thead className="bg-gray-100">
                <tr>
                  <th>Nomor</th>
                  <th>Tanggal</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {purchases.length > 0 ? (
                  purchases.map((item, index) => (
                    <tr key={item.id}>
                      <td>{index + 1}</td>
                      <td>
                        {item.date
                          ? new Date(item.date).toLocaleDateString("id-ID", {
                              day: "2-digit",
                              month: "long",
                              year: "numeric",
                            })
                          : "-"}
                      </td>
                      <td>{formatRupiah(item.total || 0)}</td>
                      <td>
                        <span
                          className={`px-3 py-1 rounded text-white text-sm font-semibold ${
                            item.status.toLowerCase() === "berhasil"
                              ? "bg-green-600"
                              : item.status.toLowerCase() === "gagal"
                              ? "bg-red-500"
                              : item.status.toLowerCase() === "menunggu"
                              ? "bg-yellow-500 text-black"
                              : "bg-gray-400"
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td className="space-x-2">
                        <button
                          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs"
                          onClick={() => handlePrintPDF(item)}
                        >
                          Invoice
                        </button>
                        {item.status.toLowerCase() === "berhasil" &&
                          !item.items?.every((prod) => prod.feedbackGiven) && (
                            <button
                              className="bg-indigo-500 hover:bg-indigo-600 text-white px-3 py-1 rounded text-xs"
                              onClick={() => {
                                setFeedbackTransaction(item);
                                setShowFeedbackModal(true);
                                setFeedbackMessages(
                                  Object.fromEntries(
                                    item.items.map((prod) => [prod.id, ""])
                                  )
                                );
                              }}
                            >
                              Feedback
                            </button>
                          )}
                        {item.status.toLowerCase() === "menunggu" && (
                          <button
                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs"
                            onClick={() => handleCancelTransaction(item.id)}
                          >
                            Batal
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center text-gray-500">
                      Belum ada pembelian.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal Feedback */}
      {showFeedbackModal && feedbackTransaction && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded p-6 w-full max-w-lg space-y-4">
            <h2 className="text-lg font-semibold mb-2">Kirim Feedback</h2>
            {feedbackTransaction.items.map((prod) => (
              <div key={prod.id} className="space-y-1">
                <p className="font-semibold">{prod.name}</p>
                <textarea
                  className="w-full p-2 border rounded"
                  rows={2}
                  placeholder="Masukkan feedback..."
                  value={feedbackMessages[prod.id] || ""}
                  onChange={(e) =>
                    setFeedbackMessages((prev) => ({
                      ...prev,
                      [prod.id]: e.target.value,
                    }))
                  }
                />
              </div>
            ))}
            <div className="flex justify-end space-x-2">
              <button
                className="px-4 py-2 bg-gray-300 rounded"
                onClick={() => {
                  setShowFeedbackModal(false);
                  setFeedbackTransaction(null);
                }}
              >
                Batal
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
                disabled={isFeedbackEmpty}
                onClick={sendFeedbacks}
              >
                Kirim
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileInfo;
