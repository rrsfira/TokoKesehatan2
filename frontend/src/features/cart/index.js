import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ShoppingCartIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [shippingMethods, setShippingMethods] = useState([]);
  const [selectedShippingCost, setSelectedShippingCost] = useState(0);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [address, setAddress] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editAddress, setEditAddress] = useState({
    name: "",
    contact: "",
    email: "",
    address: "",
    city: "",
  });

  const paymentMethods = [
    { id: 1, name: "Midtrans Payment Gateway" },
    { id: 2, name: "COD (Bayar di Tempat)" },
  ];

  const handleCheckout = async () => {
    if (!selectedShippingCost || !selectedPaymentMethod) {
      return Swal.fire(
        "Peringatan",
        "Pilih metode pengiriman dan pembayaran",
        "warning"
      );
    }

    try {
      // Buat atau dapatkan transaksi pending
      const response = await axios.post(
        "http://localhost:5000/api/transactions/create-or-get",
        {
          user_id,
        }
      );

      const transactionId = response.data.transaction_id;

      // Kirim data lengkap transaksi (update existing)
      await axios.put(
        `http://localhost:5000/api/transactions/${transactionId}`,
        {
          user_id,
          shipping_method_id: shippingMethods.find(
            (method) => method.cost === selectedShippingCost
          )?.id,
          payment:
            selectedPaymentMethod === "COD (Bayar di Tempat)"
              ? "Tunai"
              : "Midtrans",
          total,
          token: token,
          method: selectedPaymentMethod,
          status:
            selectedPaymentMethod === "COD (Bayar di Tempat)"
              ? "berhasil"
              : "berhasil",
        }
      );

      // Menyimpan data invoice ke localStorage
      const invoiceData = {
        cartItems,
        address,
        selectedShippingCost,
        selectedPaymentMethod,
        subtotal,
        total,
      };
      localStorage.setItem("invoiceData", JSON.stringify(invoiceData));

      // Tambah ini untuk mengirim invoice hanya jika COD
      if (selectedPaymentMethod === "COD (Bayar di Tempat)") {
        await generateAndSendInvoice(invoiceData, address);
      }

      Swal.fire("Berhasil", "Transaksi berhasil dibuat!", "success").then(
        () => {
          window.location.href = "/app/Invoice";
        }
      );
    } catch (err) {
      console.error("Gagal saat proses checkout:", err);
      Swal.fire("Gagal", "Terjadi kesalahan saat checkout", "error");
    }
  };

  const user_id = localStorage.getItem("user_id");
  const token = localStorage.getItem("token");

  // Mengambil data alamat user setelah mendeklarasikan state address
  useEffect(() => {
    if (user_id && token) {
      axios
        .get(`http://localhost:5000/api/profile/address/${user_id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => setAddress(response.data))
        .catch((err) => console.error("Gagal mengambil alamat:", err));
    }
  }, [user_id, token]);

  useEffect(() => {
    if (address) {
      setEditAddress({
        name: address.name || "",
        contact: address.contact || "",
        email: address.email || "",
        address: address.address || "",
        city: address.city || "",
      });
    }
  }, [address]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/shipping-methods")
      .then((response) => setShippingMethods(response.data))
      .catch((error) => {
        console.error("Gagal mengambil metode pengiriman!", error);
      });
  }, []);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/carts/user/${user_id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setCartItems(res.data);
      } catch (err) {
        console.error("Gagal mengambil keranjang:", err);
        setCartItems([]);
      }
    };

    if (user_id && token) fetchCart();
  }, [user_id, token]);

  const formatRupiah = (number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(number || 0);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + parseFloat(item.total || 0),
    0
  );
  const total = subtotal + parseFloat(selectedShippingCost || 0);

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Hapus Item?",
      text: "Apakah Anda yakin ingin menghapus item ini dari keranjang?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e70012",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Ya, Hapus",
      cancelButtonText: "Batal",
    });

    if (confirm.isConfirmed) {
      try {
        await axios.delete(`http://localhost:5000/api/carts/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCartItems(cartItems.filter((item) => item.id !== id));
        Swal.fire({
          icon: "success",
          title: "Item Dihapus",
          timer: 1500,
          showConfirmButton: false,
        });
      } catch (error) {
        console.error("Gagal menghapus item dari keranjang:", error);
        Swal.fire({
          icon: "error",
          title: "Gagal",
          text: "Item tidak dapat dihapus",
        });
      }
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-6">Keranjang Belanja</h1>
        <div className="bg-white shadow-md rounded-lg flex flex-col items-center justify-center py-20">
          <ShoppingCartIcon className="w-16 h-16 text-gray-500 mb-4" />
          <p className="text-xl font-semibold text-center">
            Keranjang belanja Anda kosong
          </p>
          <p className="text-gray-500 text-center mt-2">
            Silakan tambahkan produk ke keranjang Anda.
          </p>
          <Link to="/app/Product">
            <button className="btn btn-primary mt-6 flex items-center gap-2">
              <ArrowLeftIcon className="w-5 h-5" />
              Lihat Produk
            </button>
          </Link>
        </div>
      </div>
    );
  }

  const generateAndSendInvoice = async (invoiceData, address) => {
    const doc = new jsPDF();
  
    // Header
    doc.setFontSize(18);
    doc.text("INVOICE PEMBELIAN", 105, 20, { align: "center" });
  
    doc.setFontSize(12);
    doc.text(`Tanggal: ${new Date().toLocaleDateString("id-ID")}`, 14, 30);
    doc.text(`Order ID: #${Date.now()}`, 150, 30);
  
    // Info Pengguna
    doc.setFontSize(14);
    doc.text("Informasi Pengguna", 14, 40);
  
    doc.setFontSize(11);
    const userInfo = [
      [`Nama`, address?.name || "-"],
      [`Email`, address?.email || "-"],
      [`Alamat`, `${address?.address || "-"}, ${address?.city || "-"}`],
      [`No. Telepon`, address?.contact || "-"],
    ];
    userInfo.forEach(([label, value], i) => {
      doc.text(`${label}: ${value}`, 14, 50 + i * 6);
    });
  
    // Tabel Produk
    const tableData = invoiceData.cartItems.map((item) => [
      item.name,
      formatRupiah(item.price),
      item.amount,
      formatRupiah(item.total),
    ]);
  
    autoTable(doc, {
      startY: 80,
      head: [["Produk", "Harga", "Jumlah", "Total"]],
      body: tableData,
    });
  
    // Total
    doc.text(
      `Subtotal: ${formatRupiah(invoiceData.subtotal)}`,
      14,
      doc.lastAutoTable.finalY + 10
    );
    doc.text(
      `Ongkir: ${formatRupiah(invoiceData.selectedShippingCost)}`,
      14,
      doc.lastAutoTable.finalY + 16
    );
    doc.text(
      `Total: ${formatRupiah(invoiceData.total)}`,
      14,
      doc.lastAutoTable.finalY + 22
    );
  
    // Convert ke Blob
    const pdfBlob = doc.output("blob");
  
    const formData = new FormData();
    formData.append("email", address.email); // Email pengguna
    formData.append("pdf", pdfBlob, "invoice.pdf"); // Menambahkan PDF sebagai file
  
    try {
      await axios.post(
        "http://localhost:5000/api/email/send-invoice",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Untuk file upload
          },
        }
      );
      Swal.fire("Berhasil", "Invoice berhasil dikirim melalui email!", "success");
    } catch (error) {
      console.error("Failed to send invoice:", error);
      Swal.fire("Gagal", "Gagal mengirim invoice melalui email", "error");
    }
  };  

  return (
    <div className="p-8 space-y-6 bg-base-100 min-h-screen">
      <h1 className="text-3xl font-bold">Keranjang Belanja</h1>
      {/* Alamat Pengiriman */}
      {address && (
        <div className="bg-base-200 p-4 rounded-xl shadow space-y-2">
          <div className="flex justify-between items-center">
            <h2 className="font-bold text-lg">Informasi Pengiriman</h2>
            <button
              className="btn btn-sm btn-outline"
              onClick={() => setEditMode(!editMode)}
            >
              {editMode ? "Batal" : "Edit"}
            </button>
          </div>

          {!editMode ? (
            <>
              <table className="table-auto w-full border-collapse border border-gray-300">
                <tbody>
                  <tr>
                    <td className="font-semibold px-4 py-2 border-b border-gray-300">
                      Nama
                    </td>
                    <td className="px-4 py-2 border-b border-gray-300">
                      {address.name}
                    </td>
                  </tr>
                  <tr>
                    <td className="font-semibold px-4 py-2 border-b border-gray-300">
                      Nomor Telepon
                    </td>
                    <td className="px-4 py-2 border-b border-gray-300">
                      {address.contact}
                    </td>
                  </tr>
                  <tr>
                    <td className="font-semibold px-4 py-2 border-b border-gray-300">
                      Email
                    </td>
                    <td className="px-4 py-2 border-b border-gray-300">
                      {address.email}
                    </td>
                  </tr>
                  <tr>
                    <td className="font-semibold px-4 py-2 border-b border-gray-300">
                      Alamat
                    </td>
                    <td className="px-4 py-2 border-b border-gray-300">
                      {address.address}
                    </td>
                  </tr>
                  <tr>
                    <td className="font-semibold px-4 py-2 border-b border-gray-300">
                      Kota
                    </td>
                    <td className="px-4 py-2 border-b border-gray-300">
                      {address.city}
                    </td>
                  </tr>
                </tbody>
              </table>
            </>
          ) : (
            <form
              className="space-y-2"
              onSubmit={async (e) => {
                e.preventDefault();
                try {
                  await axios.put(
                    `http://localhost:5000/api/profile/address/${user_id}`,
                    {
                      name: editAddress.name,
                      contact: editAddress.contact,
                      email: editAddress.email,
                      address: editAddress.address,
                      city: editAddress.city,
                    },
                    {
                      headers: { Authorization: `Bearer ${token}` },
                    }
                  );
                  setAddress({
                    ...address,
                    address: editAddress.address,
                    city: editAddress.city,
                  });
                  setEditMode(false);
                  Swal.fire({
                    icon: "success",
                    title: "Berhasil",
                    text: "Alamat berhasil diperbarui!",
                    timer: 2000,
                    showConfirmButton: false,
                  });
                } catch (err) {
                  console.error("Gagal update alamat:", err);
                  Swal.fire({
                    icon: "error",
                    title: "Gagal",
                    text: "Terjadi kesalahan saat memperbarui alamat",
                  });
                }
              }}
            >
              <input
                type="text"
                className="input input-bordered w-full bg-gray-100"
                placeholder="Nama Lengkap"
                value={editAddress.name}
                readOnly
              />
              <input
                type="text"
                className="input input-bordered w-full bg-gray-100"
                placeholder="Nomor Telepon"
                value={editAddress.contact}
                readOnly
              />
              <input
                type="email"
                className="input input-bordered w-full bg-gray-100"
                placeholder="Email"
                value={editAddress.email}
                readOnly
              />
              <input
                type="text"
                className="input input-bordered w-full"
                placeholder="Alamat"
                value={editAddress.address}
                onChange={(e) =>
                  setEditAddress({ ...editAddress, address: e.target.value })
                }
              />
              <input
                type="text"
                className="input input-bordered w-full"
                placeholder="Kota"
                value={editAddress.city}
                onChange={(e) =>
                  setEditAddress({ ...editAddress, city: e.target.value })
                }
              />
              <button type="submit" className="btn btn-primary w-full">
                Simpan Alamat
              </button>
            </form>
          )}
        </div>
      )}
      <div className="bg-base-200 p-4 rounded-xl shadow">
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Produk</th>
                <th>Harga</th>
                <th>Jumlah</th>
                <th>Total</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id}>
                  <td className="flex items-center space-x-4">
                    <img
                      src={`http://localhost:5000${item.image}`}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div>
                      <div className="font-bold">{item.name}</div>
                      <div className="text-sm text-gray-500">
                        {item.category}
                      </div>
                    </div>
                  </td>
                  <td>{formatRupiah(parseFloat(item.price))}</td>
                  <td>
                    <input
                      type="number"
                      value={item.amount}
                      className="input input-bordered w-16"
                      readOnly
                    />
                  </td>
                  <td>{formatRupiah(parseFloat(item.total))}</td>
                  <td>
                    <button
                      className="btn btn-outline btn-error btn-sm"
                      onClick={() => handleDelete(item.id)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Metode Pengiriman */}
        <div className="bg-base-200 p-4 rounded-xl shadow space-y-4">
          <h2 className="font-bold text-lg">Metode Pengiriman</h2>
          <select
            className="select select-bordered w-full"
            onChange={(e) => {
              const selected = shippingMethods.find(
                (method) => method.name === e.target.value
              );
              setSelectedShippingCost(selected ? parseFloat(selected.cost) : 0);
            }}
          >
            <option disabled selected>
              Pilih metode pengiriman
            </option>
            {shippingMethods.map((method) => (
              <option key={method.id} value={method.name}>
                {method.name} - {formatRupiah(method.cost)} - (Est.{" "}
                {method.estimated})
              </option>
            ))}
          </select>
          {/* Metode Pembayaran */}
          <h2 className="font-bold text-lg">Metode Pembayaran</h2>
          <select
            className="select"
            value={selectedPaymentMethod}
            onChange={(e) => setSelectedPaymentMethod(e.target.value)}
          >
            <option value="">-- Pilih Metode Pembayaran --</option>
            {paymentMethods.map((method) => (
              <option key={method.id} value={method.name}>
                {method.name}
              </option>
            ))}
          </select>
        </div>

        {/* Ringkasan Pembayaran */}
        <div className="bg-base-200 p-4 rounded-xl shadow space-y-4">
          <h2 className="font-bold text-lg">Ringkasan Pembayaran</h2>
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>{formatRupiah(subtotal)}</span>
          </div>
          <div className="flex justify-between">
            <span>Ongkir</span>
            <span>{formatRupiah(selectedShippingCost)}</span>
          </div>
          <hr />
          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>{formatRupiah(total)}</span>
          </div>
          <button className="btn btn-primary w-full" onClick={handleCheckout}>
            Checkout Sekarang
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
