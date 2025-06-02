// Mengimpor modul yang dibutuhkan
const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const feedbacksRoutes = require("./routes/feedbacks");
const categoriesRoutes = require("./routes/categories");
const userAdminRoutes = require("./routes/userAdmin");
const profileRoutes = require("./routes/profile");
const productRoutes = require("./routes/product");
const statsDataRoutes = require("./routes/statsData");
const transactionRoutes = require("./routes/transaction");
const cartRoutes = require("./routes/carts");
const shippingMethodsRoutes = require("./routes/shippingMethods");
const TransactionAdminRoutes = require("./routes/transactionAdmin");
const VendorRoutes = require("./routes/vendors");
const emailRoutes = require("./routes/email");
const transactionsRoutes = require("./routes/transactionRoutes");
const purchasesRoutes = require("./routes/purchases");
require("dotenv").config();

// Membuat instance aplikasi Express
const app = express();
// Menggunakan middleware CORS untuk mengizinkan permintaan dari domain yang berbeda
app.use(cors());

// Menggunakan middleware untuk memparsing request body dalam format JSON dan URL-encoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const path = require('path');
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.use("/api/auth", authRoutes);
app.use("/api/feedbacks", feedbacksRoutes);
app.use("/api", categoriesRoutes);
app.use("/api/userAdmin", userAdminRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api", productRoutes);
app.use("/api/stats", statsDataRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/carts', cartRoutes);
app.use('/api', shippingMethodsRoutes);
app.use('/api/transactionsAdmin', TransactionAdminRoutes);
app.use('/api/', VendorRoutes);
app.use('/api/', emailRoutes);
app.use("/api/transactions", transactionsRoutes);
app.use("/api", purchasesRoutes);

app.get("/", (req, res) => res.send("Midtrans Server is running"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
