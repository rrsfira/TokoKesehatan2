import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [otherProducts, setOtherProducts] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error("Gagal mengambil data produk:", err));
  }, [id]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((res) => {
        const filtered = res.data.filter((p) => p.id !== Number(id));
        setOtherProducts(filtered.slice(0, 4));
      })
      .catch((err) => console.error("Gagal mengambil produk lainnya:", err));
  }, [id]);

  const formatRupiah = (number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(number);

  const adjustQuantity = (amount) => {
    setQuantity((prev) => Math.max(1, prev + amount));
  };

  const handleAddToCart = async () => {
    try {
      const token = localStorage.getItem("token");
      const user_id = localStorage.getItem("user_id");

      const trxRes = await axios.post(
        "http://localhost:5000/api/transactions/create-or-get",
        { user_id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const transaction_id = trxRes.data.transaction_id;

      if (!transaction_id) {
        return Swal.fire("Gagal!", "Transaksi tidak ditemukan.", "error");
      }

      const trxCheck = await axios.get(
        `http://localhost:5000/api/transactions/${transaction_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (trxCheck.data.status !== "pending") {
        return Swal.fire("Gagal!", "Status transaksi tidak valid.", "error");
      }

      const cartItems = await axios.get(
        `http://localhost:5000/api/carts/transaction/${transaction_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const existing = cartItems.data.find(
        (item) => item.product_id === product.id
      );

      if (existing) {
        await axios.put(
          `http://localhost:5000/api/carts/${existing.id}`,
          {
            transaction_id,
            user_id,
            product_id: product.id,
            amount: existing.amount + quantity,
            total: (existing.amount + quantity) * product.price,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else {
        await axios.post(
          "http://localhost:5000/api/carts",
          {
            transaction_id,
            user_id,
            product_id: product.id,
            amount: quantity,
            total: quantity * product.price,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }

      Swal.fire("Berhasil!", "Produk ditambahkan ke keranjang.", "success");
      navigate("/app/cart");
    } catch (error) {
      console.error("Gagal tambah ke keranjang:", error);
      Swal.fire("Gagal!", "Terjadi kesalahan.", "error");
    }
  };

  if (!product) return <div className="p-8">Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start bg-base-100 p-6 rounded-lg shadow">
        <div>
          <img
            src={`http://localhost:5000${product.image}`}
            alt={product.name}
            className="w-full h-auto object-contain rounded"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <p className="text-red-600 text-2xl font-bold mb-4">
            {formatRupiah(product.price)}
          </p>
          <p className="mb-4">{product.description}</p>

          <div className="mb-4">
            <h3 className="font-semibold">Jumlah</h3>
            <div className="flex items-center border rounded w-max">
              <button className="px-3 py-1" onClick={() => adjustQuantity(-1)}>
                –
              </button>
              <input
                readOnly
                type="text"
                value={quantity}
                className="w-12 text-center border-l bg-base-100 border-r"
              />
              <button className="px-3 py-1" onClick={() => adjustQuantity(1)}>
                +
              </button>
            </div>
          </div>

          {token ? (
            <>
              <button
                onClick={handleAddToCart}
                className="btn btn-primary w-full mb-3"
              >
                🛒 Tambahkan ke Keranjang
              </button>
              <Link to="/app/cart" className="btn btn-outline w-full">
                👁️ Lihat Keranjang
              </Link>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-primary w-full mb-3">
                🛒 Login untuk Tambah Keranjang
              </Link>
              <Link to="/login" className="btn btn-outline w-full">
                👁️ Login untuk Lihat Keranjang
              </Link>
            </>
          )}
        </div>
      </div>

      <section className="mt-8 bg-base-100 px-4 py-6">
        <h2 className="text-2xl font-bold mb-4">Produk Lainnya</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {otherProducts.map((item) => (
            <div
              key={item.id}
              className="bg-base-100 rounded-lg shadow p-3 text-center"
            >
              <img
                src={`http://localhost:5000${item.image}`}
                alt={item.name}
                className="mx-auto h-28 object-contain"
              />
              <h3 className="text-sm font-semibold">{item.name}</h3>
              <p className="text-red-600 font-bold text-sm">
                {formatRupiah(item.price)}
              </p>
              <Link
                to={`/app/product/${item.id}`}
                className="btn btn-primary btn-sm mt-2 w-full"
              >
                Detail Produk
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProductDetail;
