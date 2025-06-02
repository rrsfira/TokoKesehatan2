import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      localStorage.setItem("user_id", data.user_id);

      if (data.role === "admin") navigate("/adm/dashboardAdmin");
      else if (data.role === "superadmin") navigate("/spr/dashboardSuper");
      else navigate("/user");
    } else {
      // Tambahkan logika respon yang lebih detail
      if (data.message === "Invalid password") {
        alert("Password salah, tapi akun terdaftar.");
      } else if (data.message === "User not found") {
        alert("Email tidak ditemukan.");
      } else {
        alert(data.message || "Login gagal");
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Kiri - Logo & Info (disembunyikan di HP) */}
      <div className="hidden md:flex w-full md:w-1/2 bg-[#FFEFE7] flex-col justify-center items-center p-10">
        <div className="text-center">
          <div className="mb-4">
            <img
              src="/logo192.png"
              alt="Logo"
              className="w-40 h-40 mx-auto drop-shadow-lg"
            />
          </div>
          <h1 className="text-2xl font-semibold text-[#ED2025]">
            Shafira<span className="text-[#2A3382] font-bold">Hub</span>
          </h1>
          <p className="mt-2 text-[#F36621]">
          Solusi terpercaya untuk kebutuhan alat kesehatan Anda, kapan pun
          dan di mana pun
          </p>
        </div>
      </div>

      {/* Kanan - Form Login */}
      <div className="w-full md:w-1/2 bg-white flex flex-col justify-center p-10">
        <h2 className="text-2xl font-semibold mb-6 text-center">Masuk</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Email</label>
            <input
              type="email"
              placeholder="Email"
              className="w-full rounded-md border border-gray-300 px-3 py-2 bg-[#FFEFE7] text-black"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Password</label>
            <input
              type="password"
              placeholder="Password"
              className="w-full rounded-md border border-gray-300 px-3 py-2 bg-[#FFEFE7] text-black"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            className="w-full py-2 rounded-md text-white"
            style={{ backgroundColor: "#F36621" }}
            type="submit"
          >
            Masuk
          </button>

          <div className="text-center text-sm space-y-2">
            <p>
              Belum memiliki akun?{" "}
              <span
                className="text-[#F36621] cursor-pointer hover:underline font-semibold"
                onClick={() => navigate("/register")}
              >
                Daftar Sekarang {" "}
              </span>
               atau{" "}
              <span
                className="text-[#F36621] cursor-pointer hover:underline font-semibold"
                onClick={() => navigate("/visitor")}
              >
                Nanti
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
