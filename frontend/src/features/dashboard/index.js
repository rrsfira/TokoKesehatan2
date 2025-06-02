import { Link } from "react-router-dom";
import {
  TruckIcon,
  ShieldCheckIcon,
  TagIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";

function Dashboard() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [products, setProducts] = useState([]);
  const isLoggedIn = !!localStorage.getItem("token");

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/api/feedbacks")
      .then((res) => res.json())
      .then((data) => setFeedbacks(data))
      .catch((err) => console.error("Error fetching feedbacks:", err));
  }, []);

  const [vendorData, setVendorData] = useState({
    nama_perusahaan: "",
    email: "",
    no_telepon: "",
    deskripsi_produk: "",
  });

  const [deliveryData, setDeliveryData] = useState({
    vendor_id: 1, // sementara hardcode, idealnya dari session / login
    nama_produk: "",
    jumlah: "",
    nama_penjual_tujuan: "",
    alamat_tujuan: "",
  });

  return (
    <div className="w-full min-h-screen bg-base-100 text-base-content">
      {/* Hero Section */}
      <div
        className="hero min-h-screen bg-cover bg-center"
        style={{ backgroundImage: 'url("/hero-image.jpg")' }}
      >
        <div className="hero-overlay bg-black bg-opacity-50"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-2xl">
            <h1 className="mb-5 text-5xl font-bold">
              <span>
                <span className="text-primary">Shafira</span>
                <span className="text-secondary">Hub</span> Global
              </span>
            </h1>
            <p className="mb-5 text-lg">
              Solusi terpercaya untuk kebutuhan alat kesehatan Anda
            </p>
            <Link
              to="/app/Product"
              className="btn btn-primary text-white px-8 py-2 text-lg rounded-full"
            >
              Belanja Sekarang
            </Link>
          </div>
        </div>
      </div>

      {/* Welcome Section */}
      <section className="text-center py-10 px-4 md:px-10 bg-base-100">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          Selamat Datang di{" "}
          <span>
            <span className="text-primary">Shafira</span>
            <span className="text-secondary">Hub</span>
          </span>
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto mb-10">
          Kami menyediakan alat kesehatan terpercaya dan berkualitas tinggi
          untuk rumah tangga hingga profesional.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-center mb-4">
              <div className="bg-blue-100 p-4 rounded-full w-16 h-16">
                <TruckIcon className="text-blue-500 text-2xl" />
              </div>
            </div>
            <h3 className="font-semibold text-lg mb-2">Pengiriman Global</h3>
            <p className="text-gray-600 text-sm">
              Pengiriman alat kesehatan ke seluruh dunia, cepat dan aman.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-center mb-4">
              <div className="bg-blue-100 p-4 rounded-full w-16 h-16">
                <ShieldCheckIcon className="text-blue-500 text-2xl" />
              </div>
            </div>
            <h3 className="font-semibold text-lg mb-2">Kualitas Terjamin</h3>
            <p className="text-gray-600 text-sm">
              Produk bersertifikasi dengan standar kualitas internasional.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-center mb-4">
              <div className="bg-blue-100 p-4 rounded-full w-16 h-16">
                <TagIcon className="text-blue-500 text-2xl" />
              </div>
            </div>
            <h3 className="font-semibold text-lg mb-2">Harga Kompetitif</h3>
            <p className="text-gray-600 text-sm">
              Harga bersahabat, dengan promo menarik setiap minggu.
            </p>
          </div>
        </div>
      </section>

      {/* Produk Terbaru Section */}
      <section className="py-10 px-6 bg-accent">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Produk Terbaru
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {products.slice(0, 4).map((product) => (
            <div
              key={product.id}
              className="bg-base-100 rounded-lg shadow p-3 text-center"
            >
              <div className="relative mb-3">
                <img
                  src={`http://localhost:5000${product.image}`}
                  alt={product.name}
                  className="mx-auto h-28 object-contain"
                />
                {product.category_name && (
                  <span className="absolute top-2 left-2 bg-gray-200 text-xs font-semibold text-gray-700 px-2 py-0.5 rounded">
                    {product.category_name}
                  </span>
                )}
              </div>
              <h3 className="text-sm font-semibold">{product.name}</h3>
              <p className="text-sm text-gray-600 line-clamp-1">
                {product.description}
              </p>
              <p className="text-red-600 font-bold text-sm mt-1">
                Rp {Number(product.price).toLocaleString("id-ID")}
              </p>
              <div className="mt-3">
                <Link
                  to={`/app/Product/${product.id}`}
                  className="btn btn-primary btn-sm w-full"
                >
                  Detail Produk
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Tombol Lihat Semua Produk */}
        <div className="text-center mt-8">
          <Link to="/app/Product" className="btn btn-primary btn-sm">
            Lihat Semua Produk
          </Link>
        </div>
      </section>

      {/* Vendor Section 
      {isLoggedIn && (
        <section className="py-16 px-6 bg-neutral">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-4">
              Bergabung Menjadi Vendor
            </h2>
            <p className="text-lg text-base-content mb-10">
              Daftarkan dirimu sebagai vendor dan mulai kirimkan produk langsung
              ke penjual dengan mudah dan cepat!
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                className="btn btn-primary btn-lg"
                onClick={() =>
                  document.getElementById("modal-vendor").showModal()
                }
              >
                🚀 Daftar Vendor
              </button>
              <button
                className="btn btn-success btn-lg"
                onClick={() =>
                  document.getElementById("modal-shipping").showModal()
                }
              >
                📦 Kirim Barang
              </button>
            </div>
          </div>*/}

      {/* Modal: Daftar Vendor 
          <dialog id="modal-vendor" className="modal">
            <div className="modal-box">
              <h3 className="font-bold text-xl mb-4">
                Formulir Pendaftaran Vendor
              </h3>
              <form
                className="space-y-3"
                onSubmit={(e) => {
                  e.preventDefault();
                  fetch("http://localhost:5000/api/vendors", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(vendorData),
                  })
                    .then((res) => res.json())
                    .then((data) => {
                      alert("Vendor berhasil didaftarkan!");
                      document.getElementById("modal-vendor").close();
                      setVendorData({
                        nama_perusahaan: "",
                        email: "",
                        no_telepon: "",
                        deskripsi_produk: "",
                      });
                    })
                    .catch((err) => console.error("Error:", err));
                }}
              >
                <input
                  type="text"
                  placeholder="Nama Perusahaan / Individu"
                  className="input input-bordered w-full"
                  value={vendorData.nama_perusahaan}
                  onChange={(e) =>
                    setVendorData({
                      ...vendorData,
                      nama_perusahaan: e.target.value,
                    })
                  }
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="input input-bordered w-full"
                  value={vendorData.email}
                  onChange={(e) =>
                    setVendorData({ ...vendorData, email: e.target.value })
                  }
                />
                <input
                  type="tel"
                  placeholder="No. Telepon"
                  className="input input-bordered w-full"
                  value={vendorData.no_telepon}
                  onChange={(e) =>
                    setVendorData({ ...vendorData, no_telepon: e.target.value })
                  }
                />
                <textarea
                  placeholder="Produk yang akan dijual"
                  className="textarea textarea-bordered w-full"
                  value={vendorData.deskripsi_produk}
                  onChange={(e) =>
                    setVendorData({
                      ...vendorData,
                      deskripsi_produk: e.target.value,
                    })
                  }
                ></textarea>
                <div className="modal-action">
                  <button
                    type="button"
                    className="btn btn-outline"
                    onClick={() =>
                      document.getElementById("modal-vendor").close()
                    }
                  >
                    Batal
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Kirim
                  </button>
                </div>
              </form>
            </div>
          </dialog>

          {/* Modal: Kirim Barang 
          <dialog id="modal-shipping" className="modal">
            <div className="modal-box">
              <h3 className="font-bold text-xl mb-4">Form Pengiriman Barang</h3>
              <form
                className="space-y-3"
                onSubmit={(e) => {
                  e.preventDefault();
                  fetch("http://localhost:5000/api/deliveries", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(deliveryData),
                  })
                    .then((res) => res.json())
                    .then((data) => {
                      alert("Pengiriman berhasil!");
                      document.getElementById("modal-shipping").close();
                      setDeliveryData({
                        vendor_id: 1,
                        nama_produk: "",
                        jumlah: "",
                        nama_penjual_tujuan: "",
                        alamat_tujuan: "",
                      });
                    })
                    .catch((err) => console.error("Error:", err));
                }}
              >
                <input
                  type="text"
                  placeholder="Nama Produk"
                  className="input input-bordered w-full"
                  value={deliveryData.nama_produk}
                  onChange={(e) =>
                    setDeliveryData({
                      ...deliveryData,
                      nama_produk: e.target.value,
                    })
                  }
                />
                <input
                  type="number"
                  placeholder="Jumlah Barang"
                  className="input input-bordered w-full"
                  value={deliveryData.jumlah}
                  onChange={(e) =>
                    setDeliveryData({ ...deliveryData, jumlah: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="Nama Penjual Tujuan"
                  className="input input-bordered w-full"
                  value={deliveryData.nama_penjual_tujuan}
                  onChange={(e) =>
                    setDeliveryData({
                      ...deliveryData,
                      nama_penjual_tujuan: e.target.value,
                    })
                  }
                />
                <input
                  type="text"
                  placeholder="Alamat Tujuan"
                  className="input input-bordered w-full"
                  value={deliveryData.alamat_tujuan}
                  onChange={(e) =>
                    setDeliveryData({
                      ...deliveryData,
                      alamat_tujuan: e.target.value,
                    })
                  }
                />
                <div className="modal-action">
                  <button
                    type="button"
                    className="btn btn-outline"
                    onClick={() =>
                      document.getElementById("modal-shipping").close()
                    }
                  >
                    Batal
                  </button>
                  <button type="submit" className="btn btn-success">
                    Kirim
                  </button>
                </div>
              </form>
            </div>
          </dialog>
        </section>
      )}*/}

      {/* Ulasan Pelanggan */}
      <section className="py-12 px-8 bg-base-100">
        <h2 className="text-3xl font-semibold mb-6 text-center">
          Ulasan Pelanggan
        </h2>
        {feedbacks.length > 0 ? (
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={20}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            navigation
            pagination={{ clickable: true }}
          >
            {feedbacks.map((item) => (
              <SwiperSlide key={item.id}>
                <div className="bg-white p-6 rounded-lg shadow h-full">
                  <p className="text-sm mb-4 italic">“{item.description}”</p>
                  <div className="font-bold text-right">{item.user_name}</div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="text-center text-gray-500">Belum ada ulasan.</div>
        )}
      </section>
    </div>
  );
}

export default Dashboard;
