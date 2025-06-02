import { themeChange } from "theme-change";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import MoonIcon from "@heroicons/react/24/outline/MoonIcon";
import SunIcon from "@heroicons/react/24/outline/SunIcon";
import { useNavigate, useLocation, Link } from "react-router-dom";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  const { pageTitle } = useSelector((state) => state.header);
  const [currentTheme, setCurrentTheme] = useState(
    localStorage.getItem("theme")
  );
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    themeChange(false);
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);

    if (currentTheme === null) {
      if (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      ) {
        setCurrentTheme("dark");
      } else {
        setCurrentTheme("light");
      }
    }
  }, []);

  const handleKeranjangClick = (e) => {
    const token = localStorage.getItem("token");
    if (!token) {
      e.preventDefault(); // cegah navigasi ke /keranjang
      navigate("/login"); // arahkan ke login
    }
  };

  function toggleLogin() {
    if (isLoggedIn) {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      setIsLoggedIn(false);
      navigate("/login");
    } else {
      navigate("/login");
    }
  }

  return (
    <div className="navbar sticky top-0 bg-base-100 z-10 shadow-md">
      <div className="flex-1 flex items-center gap-2">
        <img
          className="mask mask-squircle w-10"
          src="/logo192.png"
          alt="DashWind Logo"
        />
        <span className="text-xl font-bold">
            <span className="text-primary">Shafira</span>
            <span className="text-secondary">Hub</span>
        </span>
      </div>

      <div className="flex-none flex items-center space-x-2">
        <Link
          to="/app/dashboard"
          className={`btn btn-ghost normal-case hidden md:inline-flex ${
            currentPath === "/app/dashboard" ? "font-bold text-primary" : ""
          }`}
        >
          Beranda
        </Link>
        <Link
          to="/app/Product"
          className={`btn btn-ghost normal-case hidden md:inline-flex ${
            currentPath === "/app/Product" ? "font-bold text-primary" : ""
          }`}
        >
          Produk
        </Link>
        <Link
          to="/app/Cart"
          onClick={handleKeranjangClick}
          className={`btn btn-ghost normal-case hidden md:inline-flex ${
            currentPath === "/app/Cart" ? "font-bold text-primary" : ""
          }`}
        >
          Keranjang
        </Link>
        <Link
          to="/app/profileInfo"
          onClick={handleKeranjangClick}
          className={`btn btn-ghost normal-case hidden md:inline-flex ${
            currentPath === "/app/profileInfo" ? "font-bold text-primary" : ""
          }`}
        >
          Profil
        </Link>

        {/* Tema */}
        <label className="swap">
          <input type="checkbox" />
          <SunIcon
            data-set-theme="light"
            data-act-class="ACTIVECLASS"
            className={
              "fill-current w-6 h-6 " +
              (currentTheme === "dark" ? "swap-on" : "swap-off")
            }
          />
          <MoonIcon
            data-set-theme="dark"
            data-act-class="ACTIVECLASS"
            className={
              "fill-current w-6 h-6 " +
              (currentTheme === "light" ? "swap-on" : "swap-off")
            }
          />
        </label>

        {/* Tombol Masuk/Keluar */}
        <button onClick={toggleLogin} className="btn btn-primary ml-2">
          {isLoggedIn ? "Keluar" : "Masuk"}
        </button>
      </div>
    </div>
  );
}

export default Header;
