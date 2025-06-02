import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import {
  InformationCircleIcon,
  TruckIcon,
  CreditCardIcon,
  ArrowLeftIcon,
  PrinterIcon,
} from "@heroicons/react/24/outline";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import axios from "axios";

const Invoice = () => {
  const location = useLocation();
  const stateData =
    location.state || JSON.parse(localStorage.getItem("invoiceData"));
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Get user authentication data
  const userId = localStorage.getItem("userId");
  useEffect(() => {
    // Cleanup function to remove invoice data from localStorage when component unmounts
    return () => {
      localStorage.removeItem("invoiceData");
    };
  }, []);

  // Load Midtrans Snap JS when component mounts
  useEffect(() => {
    // Only load if it's not already loaded
    if (!window.snap) {
      const script = document.createElement("script");
      script.src = "https://app.sandbox.midtrans.com/snap/snap.js";
      script.setAttribute("data-client-key", "SB-Mid-client-RlSG3jmAbS-NbmYl"); // Replace with your actual client key
      script.async = true;

      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
      };
    }
  }, []);

  if (!stateData) {
    return (
      <div className="p-6 text-center text-red-500">Data tidak ditemukan.</div>
    );
  }

  const {
    cartItems,
    address: user,
    selectedShippingCost,
    selectedPaymentMethod,
    subtotal,
    total,
  } = stateData;

  const transaction_id = stateData.cartItems[0]?.transaction_id;

  if (!cartItems || !user) {
    return (
      <div className="p-6 text-center text-red-500">
        Data pesanan tidak lengkap.
      </div>
    );
  }

  const orderId = new Date().getTime(); // Generate unique order ID based on timestamp
  const paymentId = orderId + 1; // Simulasi ID Pembayaran

  const formatRupiah = (value) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(value);

  const currentDateTime = new Date().toLocaleString("id-ID", {
    dateStyle: "long",
    timeStyle: "short",
  });

  const handlePrintPDF = () => {
    const doc = new jsPDF();

    // Header
    doc.setFontSize(18);
    doc.text("INVOICE PEMBELIAN", 105, 20, { align: "center" });

    doc.setFontSize(12);
    doc.text(`Tanggal: ${new Date().toLocaleDateString("id-ID")}`, 14, 30);
    doc.text(`Order ID: #${orderId}`, 150, 30);

    // Informasi Pengguna
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

    // Tabel Produk
    autoTable(doc, {
      startY: 80,
      head: [["Produk", "Harga", "Jumlah", "Total"]],
      body: cartItems.map((item) => [
        item.name,
        formatRupiah(item.price),
        item.amount,
        formatRupiah(item.total),
      ]),
      theme: "striped",
      headStyles: { fillColor: [59, 130, 246] },
    });

    // Ringkasan Total
    const finalY = doc.lastAutoTable.finalY + 10;
    doc.setFontSize(12);
    doc.text(`Subtotal: ${formatRupiah(subtotal)}`, 150, finalY);
    doc.text(`Ongkir: ${formatRupiah(selectedShippingCost)}`, 150, finalY + 7);
    doc.text(`Total: ${formatRupiah(total)}`, 150, finalY + 14);

    // Pembayaran
    doc.setFontSize(14);
    doc.text("Informasi Pembayaran", 14, finalY + 30);
    doc.setFontSize(11);
    doc.text(`Metode: ${selectedPaymentMethod}`, 14, finalY + 38);
    doc.text(`Status: Berhasil`, 14, finalY + 44);

    // Simpan PDF
    doc.save(`invoice-${Date.now()}.pdf`);
  };

  const handleMidtransPayment = async () => {
    if (user.id) {
      // Redirect to login if user is not authenticated
      window.location.href = "/auth";
      return;
    }

    setIsProcessingPayment(true);
    setErrorMessage("");

    try {
      // Prepare transaction data
      const transactionData = {
        transaction_id: parseInt(transaction_id, 10),
        id_user: parseInt(userId, 10),
        jumlah: cartItems.reduce((total, item) => total + item.amount, 0),
        harga: total,
        alamat: `tes`,
        // Include item details if your API requires them
        items: cartItems.map((item) => ({
          id_produk: item.id,
          jumlah: item.amount,
          harga: item.price,
        })),
        nama: "tes",
        email: "tes",
      };

      // Make API request to create transaction
      const response = await fetch(
        "http://localhost:5000/api/transactions/payment",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(transactionData),
        }
      );

      if (response.status === 401) {
        window.location.href = "/auth";
        return;
      }

      console.log("ini coba cek lah" + response);

      const result = await response.json();

      if (result.status === "success") {
        // Open Midtrans Snap popup
        window.snap.pay(result.data.snap_token, {
          onSuccess: function (result) {
            // Handle success
            console.log(result);
            window.location.href = "/profile";
          },
          onPending: function (result) {
            console.log(result);
            // Handle pending
            window.location.href = "/profile";
          },
          onError: function (result) {
            // Handle error
            console.error("Payment error:", result);
            setErrorMessage("Terjadi kesalahan dalam proses pembayaran");
          },
          onClose: function () {
            // Handle when customer closes the popup without finishing payment
            setErrorMessage("Pembayaran belum selesai");
          },
        });
      } else {
        setErrorMessage(result.message || "Gagal membuat transaksi");
      }
    } catch (error) {
      console.error("Error creating transaction:", error);
      setErrorMessage("Terjadi kesalahan dalam pembuatan transaksi");
    } finally {
      setIsProcessingPayment(false);
    }
  };

  return (
    <div
      id="invoice-area"
      className="max-w-4xl mx-auto p-6 space-y-6 bg-white rounded-xl shadow"
    >
      <h1 className="text-3xl font-bold text-blue-600 text-center">
        Invoice Pembelian
      </h1>
      <p className="text-center text-gray-500">
        Berikut adalah ringkasan lengkap transaksi Anda.
      </p>

      {/* Informasi Pengguna */}
      <div className="bg-gray-50 p-4 rounded-md border">
        <div className="flex items-center mb-2 text-blue-600 font-semibold">
          <InformationCircleIcon className="w-5 h-5 mr-2" />
          Informasi Pengguna
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <p>
            <strong>Nama:</strong> {user.name}
          </p>
          <p>
            <strong>Alamat Pengiriman:</strong> {user.address}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Kota:</strong> {user.city}
          </p>
          <p>
            <strong>Nomor Telepon:</strong> {user.contact}
          </p>
        </div>
      </div>

      {/* Informasi Pesanan */}
      <div className="bg-gray-50 p-4 rounded-md border">
        <div className="flex items-center mb-2 text-blue-600 font-semibold">
          <TruckIcon className="w-5 h-5 mr-2" />
          Informasi Pesanan
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <p>
            <strong>Order ID:</strong> #{orderId}
          </p>
          <p>
            <strong>Biaya Pengiriman:</strong>{" "}
            {formatRupiah(selectedShippingCost)}
          </p>
          <p>
            <strong>Tanggal Pemesanan:</strong> {currentDateTime}
          </p>
          <p>
            <strong>Total Pembayaran:</strong>{" "}
            <span className="text-blue-600 font-semibold">
              {formatRupiah(total)}
            </span>
          </p>
          <p>
            <strong>Metode Pengiriman:</strong> Reguler
          </p>
        </div>

        <div className="mt-4">
          <p className="font-semibold mb-2">Detail Item</p>
          <table className="table w-full">
            <thead>
              <tr>
                <th>Produk</th>
                <th>Harga</th>
                <th>Jumlah</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id}>
                  <td className="flex items-center gap-2">
                    <img
                      crossOrigin="anonymous"
                      src={`http://localhost:5000${item.image}`}
                      alt={item.name}
                      className="w-10 h-10 object-cover rounded"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/placeholder-image.jpg";
                      }}
                    />
                    <div>
                      <p>{item.name}</p>
                      <span className="text-xs text-gray-500">
                        {item.category || "Produk"}
                      </span>
                    </div>
                  </td>
                  <td>{formatRupiah(item.price)}</td>
                  <td>{item.amount}</td>
                  <td>{formatRupiah(item.total)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Informasi Pembayaran */}
      <div className="bg-gray-50 p-4 rounded-md border">
        <div className="flex items-center mb-2 text-blue-600 font-semibold">
          <CreditCardIcon className="w-5 h-5 mr-2" />
          Informasi Pembayaran
        </div>
        <p>
          <strong>ID Pembayaran:</strong> {paymentId}
        </p>
        <p>
          <strong>Metode Pembayaran:</strong> {selectedPaymentMethod}
        </p>
        <p>
          <strong>Status Pembayaran:</strong>{" "}
          <span className="badge badge-warning">Menunggu Pembayaran</span>
        </p>

        {/* Error message */}
        {errorMessage && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mt-4">
            {errorMessage}
          </div>
        )}

        {/* Tombol Aksi Berdasarkan Metode Pembayaran */}
        <div className="flex justify-end gap-4 mt-6">
          <Link to="/app/Product">
            <button className="btn btn-outline flex items-center gap-2">
              <ArrowLeftIcon className="w-4 h-4" />
              Kembali Belanja
            </button>
          </Link>

          {selectedPaymentMethod === "COD (Bayar di Tempat)" ? (
            <button
              className="btn btn-success flex items-center gap-2"
              onClick={handlePrintPDF}
            >
              <PrinterIcon className="w-4 h-4" />
              Cetak Invoice
            </button>
          ) : (
            <button
              className="btn btn-warning flex items-center gap-2"
              onClick={handleMidtransPayment}
              disabled={isProcessingPayment}
            >
              <CreditCardIcon className="w-4 h-4" />
              {isProcessingPayment ? "Memproses..." : "Bayar Sekarang"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Invoice;
