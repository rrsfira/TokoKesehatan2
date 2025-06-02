// Mengimpor konfigurasi database
const db = require("../config/db.js");
// Mengimpor konstanta status transaksi
const { PENDING_PAYMENT } = require("../utils/constant.js");

class TransactionService {
  // Fungsi untuk membuat transaksi baru (mengupdate transaksi yang ada)
  async createTransaction({ transaction_id, snap_token, snap_redirect_url }) {
    try {
      // Melakukan query untuk mengupdate transaksi dengan snap_token dan snap_redirect_url yang baru
      db.query(
        `UPDATE transactions 
        SET snap_token = ?, snap_redirect_url = ? 
        WHERE id = ?`,
        [snap_token, snap_redirect_url, transaction_id], // Menggunakan parameter untuk menghindari SQL injection
        (err, result) => {
          // Menangani error query jika terjadi
          if (err) {
            console.error("Error in createTransaction:", err);
            throw new Error("Failed to update transaction");
          }

          return { id: transaction_id };
        }
      );
    } catch (error) {
      console.error("Error in createTransaction:", error);
      throw new Error("Failed to create transaction");
    }
  }

  async getTransactions({ status }) {
    let query = "SELECT * FROM transactions";
    let values = [];

    if (status) {
      query += " WHERE status = ?";
      values.push(status);
    }

    const [rows] = await db.query(query, values);
    return rows;
  }

  async getTransactionById({ transaction_id }) {
    const [rows] = await db.query(`SELECT * FROM transactions WHERE id = ?`, [
      transaction_id,
    ]);

    return rows[0];
  }

  async updateTransactionStatus({
    transaction_id,
    status,
    payment_method = null,
  }) {
    const [result] = await db.query(
      `UPDATE transactions SET status = ?, payment_method = ? WHERE id = ?`,
      [status, payment_method, transaction_id]
    );

    return result;
  }
}

module.exports = { transactionService: new TransactionService() };
