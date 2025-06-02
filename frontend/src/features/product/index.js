import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState(["Semua Produk"]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua Produk");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Gagal mengambil produk:", err));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/categories")
      .then((res) => {
        const names = res.data.map((c) => c.name);
        setCategories(["Semua Produk", ...names]);
      })
      .catch((err) => console.error("Gagal mengambil kategori:", err));
  }, []);

  const handleSearch = (e) => setSearch(e.target.value);
  const handleCategorySelect = (cat) => setSelectedCategory(cat);

  const filteredProducts = products.filter(
    (p) =>
      (selectedCategory === "Semua Produk" ||
        p.category_name === selectedCategory) &&
      p.name.toLowerCase().includes(search.toLowerCase())
  );

  const formatRupiah = (number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(number);

  return (
    <div>
      {/* Hero */}
      <div className="-mx-2 md:-mx-4">
        <div
          className="hero h-60 md:h-72 lg:h-80 bg-cover bg-center"
          style={{ backgroundImage: 'url("/product.jpg")' }}
        >
          <div className="hero-overlay bg-black bg-opacity-50"></div>
          <div className="hero-content flex justify-start items-left pl-4">
            <h1 className="text-4xl font-bold text-white">Produk Kami</h1>
          </div>
        </div>
      </div>

      {/* Konten utama */}
      <div className="max-w-screen-xl mx-auto px-4 md:px-4 lg:px-10 py-10">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <div className="lg:w-1/4 space-y-6">
            {/* 🔍 Pencarian */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Pencarian</span>
              </label>
              <div className="join">
                <input
                  type="text"
                  value={search}
                  onChange={handleSearch}
                  placeholder="Cari produk..."
                  className="input input-bordered join-item w-full"
                />
                <button className="btn btn-primary join-item">
                  <MagnifyingGlassIcon className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* 📁 Kategori */}
            <div>
              <p className="font-bold mb-2">Kategori</p>
              <ul className="menu bg-base-100 rounded-box">
                {categories.map((cat) => (
                  <li key={cat}>
                    <a
                      onClick={() => handleCategorySelect(cat)}
                      className={`btn btn-sm w-full justify-start 
                              ${
                                selectedCategory === cat
                                  ? "btn-primary"
                                  : "btn-ghost"
                              }`}
                    >
                      {cat}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Produk */}
          <div className="lg:w-3/4 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div key={product.id} className="card bg-base-100 shadow-md">
                <figure className="h-48 bg-white p-4">
                  <img
                    src={`http://localhost:5000${product.image}`}
                    alt={product.name}
                    className="object-contain h-full w-full"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/placeholder.jpg"; // fallback kalau error
                    }}
                  />
                </figure>
                <div className="card-body p-4">
                  <span className="badge badge-primary">
                    {product.category_name}
                  </span>
                  <h2 className="card-title text-base mt-2">{product.name}</h2>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {product.description}
                  </p>
                  <p className="text-red-600 font-bold">
                    {formatRupiah(product.price)}
                  </p>
                  <div className="card-actions justify-end">
                    <Link
                      to={`/app/Product/${product.id}`}
                      className="btn btn-primary btn-sm"
                    >
                      <i className="fas fa-shopping-cart mr-1"></i> Detail
                      Produk
                    </Link>
                  </div>
                </div>
              </div>
            ))}

            {/* Jika tidak ada produk */}
            {filteredProducts.length === 0 && (
              <p className="col-span-full text-center text-gray-500">
                Tidak ada produk ditemukan.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
