-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 06, 2025 at 09:48 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ujikom`
--

-- --------------------------------------------------------

--
-- Table structure for table `carts`
--

CREATE TABLE `carts` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `transaction_id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `product_id` bigint(20) UNSIGNED NOT NULL,
  `amount` int(11) NOT NULL,
  `total` decimal(10,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `carts`
--

INSERT INTO `carts` (`id`, `transaction_id`, `user_id`, `product_id`, `amount`, `total`, `created_at`, `updated_at`) VALUES
(16, 6, 2, 3, 2, 32000.00, NULL, NULL),
(17, 7, 2, 3, 1, 16000.00, NULL, NULL),
(18, 7, 2, 2, 1, 330000.00, NULL, NULL),
(19, 8, 2, 3, 1, 16000.00, NULL, NULL),
(20, 9, 2, 5, 1, 243000.00, NULL, NULL),
(21, 10, 2, 4, 1, 33074019.00, NULL, NULL),
(22, 11, 2, 2, 1, 330000.00, NULL, NULL),
(23, 12, 2, 3, 1, 16000.00, NULL, NULL),
(24, 13, 2, 3, 2, 32000.00, NULL, NULL),
(25, 14, 2, 3, 1, 16000.00, NULL, NULL),
(26, 15, 2, 3, 4, 64000.00, NULL, NULL),
(27, 16, 2, 3, 2, 32000.00, NULL, NULL),
(28, 17, 2, 3, 1, 16000.00, NULL, NULL),
(29, 18, 2, 2, 1, 330000.00, NULL, NULL),
(30, 19, 2, 3, 1, 16000.00, NULL, NULL),
(31, 20, 2, 4, 1, 33074019.00, NULL, NULL),
(32, 21, 2, 3, 10, 160000.00, NULL, NULL),
(33, 22, 2, 3, 1, 16000.00, NULL, NULL),
(34, 23, 2, 3, 1, 16000.00, NULL, NULL),
(35, 24, 2, 3, 1, 16000.00, NULL, NULL),
(36, 25, 2, 3, 1, 16000.00, NULL, NULL),
(37, 26, 2, 3, 1, 16000.00, NULL, NULL),
(38, 27, 2, 3, 1, 16000.00, NULL, NULL),
(39, 28, 2, 3, 1, 16000.00, NULL, NULL),
(40, 30, 2, 5, 1, 243000.00, NULL, NULL),
(41, 32, 2, 5, 2, 486000.00, NULL, NULL),
(42, 33, 2, 4, 1, 33074019.00, NULL, NULL),
(43, 34, 2, 3, 1, 16000.00, NULL, NULL),
(44, 35, 2, 5, 2, 486000.00, NULL, NULL),
(45, 36, 2, 4, 1, 33074019.00, NULL, NULL),
(46, 37, 2, 3, 1, 16000.00, NULL, NULL),
(47, 38, 2, 3, 1, 16000.00, NULL, NULL),
(48, 39, 2, 3, 1, 16000.00, NULL, NULL),
(49, 40, 2, 3, 1, 16000.00, NULL, NULL),
(50, 41, 2, 3, 1, 16000.00, NULL, NULL),
(51, 42, 2, 3, 1, 16000.00, NULL, NULL),
(52, 43, 2, 3, 1, 16000.00, NULL, NULL),
(53, 44, 2, 3, 1, 16000.00, NULL, NULL),
(54, 45, 2, 3, 1, 16000.00, NULL, NULL),
(55, 46, 2, 3, 1, 16000.00, NULL, NULL),
(56, 47, 2, 3, 1, 16000.00, NULL, NULL),
(57, 48, 2, 3, 1, 16000.00, NULL, NULL),
(58, 49, 2, 1, 1, 660000.00, NULL, NULL),
(59, 50, 2, 3, 1, 16000.00, NULL, NULL),
(60, 51, 2, 3, 1, 16000.00, NULL, NULL),
(61, 52, 2, 3, 1, 16000.00, NULL, NULL),
(62, 53, 2, 3, 1, 16000.00, NULL, NULL),
(63, 54, 2, 1, 1, 660000.00, NULL, NULL),
(64, 55, 2, 2, 1, 330000.00, NULL, NULL),
(65, 56, 2, 5, 1, 243000.00, NULL, NULL),
(66, 56, 2, 3, 3, 48000.00, NULL, NULL),
(67, 57, 2, 3, 1, 16000.00, NULL, NULL),
(68, 58, 2, 3, 1, 16000.00, NULL, NULL),
(69, 59, 2, 3, 1, 16000.00, NULL, NULL),
(71, 61, 2, 5, 1, 243000.00, NULL, NULL),
(72, 62, 2, 5, 1, 243000.00, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'Alat Medis', '2025-05-02 01:44:25', '2025-05-02 15:22:28'),
(3, 'Alat P3K', '2025-05-02 01:45:53', '2025-05-02 14:49:32'),
(4, 'Rapid test', '2025-05-02 07:28:15', '2025-05-02 07:28:15'),
(5, 'Alat Bantu Jalan', '2025-05-02 07:58:28', '2025-05-02 07:58:28'),
(6, 'Kursi Roda', '2025-05-02 15:22:52', '2025-05-02 15:22:52'),
(7, 'Pulse Oximeter', '2025-05-03 06:12:53', '2025-05-03 06:17:34');

-- --------------------------------------------------------

--
-- Table structure for table `feedbacks`
--

CREATE TABLE `feedbacks` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `product_id` bigint(20) UNSIGNED NOT NULL,
  `description` text NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `feedbacks`
--

INSERT INTO `feedbacks` (`id`, `user_id`, `product_id`, `description`, `created_at`, `updated_at`) VALUES
(1, 2, 1, 'Barang nya lengkap dan murah-murah nih', '2025-04-21 09:23:20', '2025-04-21 09:23:20'),
(2, 3, 3, 'ShafiraHub terbaik karena murah haha', '2025-04-21 09:24:45', '2025-04-21 09:24:45'),
(4, 2, 5, 'woww pengemasan sangat rapi dan baikk', NULL, NULL),
(13, 2, 3, 'bagus', NULL, NULL),
(14, 2, 0, 'barang ori', NULL, NULL),
(15, 2, 0, 'ok', NULL, NULL),
(16, 2, 0, 'bagus', NULL, NULL),
(17, 2, 0, 'bagus', NULL, NULL),
(18, 2, 0, 'oke', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `category_id` bigint(20) UNSIGNED NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `description`, `image`, `category_id`, `price`, `created_at`, `updated_at`) VALUES
(1, 'Alat Tes Malaria Mono', 'Cepat dan akurat', '/uploads/1746202458053.jpg', 4, 660000.00, '2025-05-02 16:14:18', '2025-05-02 16:14:18'),
(2, 'Alat Bantu Jalan ABJ 41', 'Walker Sederhana dengan Fitur Menarik', '/uploads/1746202488585.jpg', 5, 330000.00, '2025-05-02 16:14:48', '2025-05-02 16:14:48'),
(3, 'Buli - buli Panas WWZ OneMed', 'Dijamin original dan bergaransi', '/uploads/1746202527369.jpeg', 3, 16000.00, '2025-05-02 16:15:27', '2025-05-02 16:15:27'),
(4, '3A Suction Unit Max speed 9.4', 'Alat medis yang digunakan untuk menyedot cairan dari tubuh pasien, misalnya darah, lendir, atau dahak. \"Maxispeed 9.4\" menunjukkan tingkat hisapan yang tinggi, dengan kecepatan maksimum hisapan sekitar 9.4 L/menit. ', '/uploads/1746202634208.jpeg', 1, 33074019.00, '2025-05-02 16:17:14', '2025-05-02 16:17:14'),
(5, 'Family Dr FS101 Oximeter', 'Alat kesehatan portabel yang dirancang untuk mengukur kadar oksigen dalam darah (SpO₂) dan denyut jantung (pulse rate) secara cepat dan akurat. Alat ini cocok digunakan oleh anak-anak maupun dewasa, baik di rumah, saat berolahraga, mendaki gunung, maupun dalam perjalanan udara.', '/uploads/1746253043778.png', 7, 243000.00, '2025-05-03 06:17:23', '2025-05-03 06:36:23');

-- --------------------------------------------------------

--
-- Table structure for table `shipping_methods`
--

CREATE TABLE `shipping_methods` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `cost` decimal(10,2) NOT NULL,
  `estimated` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `shipping_methods`
--

INSERT INTO `shipping_methods` (`id`, `name`, `cost`, `estimated`, `created_at`, `updated_at`) VALUES
(1, 'Reguler', 10000.00, '3-5 hari', '2025-05-03 04:28:49', '2025-05-03 04:28:49'),
(2, 'Express', 20000.00, '1-2 hari', '2025-05-03 04:28:49', '2025-05-03 04:28:49'),
(3, 'Same Day', 30000.00, 'Hari yang sama', '2025-05-03 04:28:49', '2025-05-03 04:28:49');

-- --------------------------------------------------------

--
-- Table structure for table `transactions`
--

CREATE TABLE `transactions` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `shipping_method_id` bigint(20) UNSIGNED DEFAULT NULL,
  `status` varchar(255) NOT NULL,
  `payment` decimal(10,2) DEFAULT NULL,
  `total` decimal(10,2) DEFAULT NULL,
  `token` varchar(150) DEFAULT NULL,
  `method` varchar(150) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `transactions`
--

INSERT INTO `transactions` (`id`, `user_id`, `shipping_method_id`, `status`, `payment`, `total`, `token`, `method`, `created_at`, `updated_at`) VALUES
(6, 2, NULL, 'berhasil', 0.00, 42000.00, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZSI6InVzZXIiLCJpYXQiOjE3NDYzNzMzODEsImV4cCI6MTc0NjQ1OTc4MX0.1nhZ7OStp51Q5cM4OPgoLf0jR4WO0oU3MOmNQ', 'COD (Bayar di Tempat)', '2025-05-04 13:34:07', '2025-05-04 13:34:07'),
(7, 2, NULL, 'berhasil', 0.00, 356000.00, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZSI6InVzZXIiLCJpYXQiOjE3NDYzNzMzODEsImV4cCI6MTc0NjQ1OTc4MX0.1nhZ7OStp51Q5cM4OPgoLf0jR4WO0oU3MOmNQ', 'COD (Bayar di Tempat)', '2025-05-04 16:18:34', '2025-05-04 16:18:34'),
(8, 2, NULL, 'berhasil', 0.00, 26000.00, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZSI6InVzZXIiLCJpYXQiOjE3NDYzNzMzODEsImV4cCI6MTc0NjQ1OTc4MX0.1nhZ7OStp51Q5cM4OPgoLf0jR4WO0oU3MOmNQ', 'COD (Bayar di Tempat)', '2025-05-04 16:21:18', '2025-05-04 16:21:18'),
(9, 2, NULL, 'berhasil', 0.00, 253000.00, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZSI6InVzZXIiLCJpYXQiOjE3NDY0MjE0MDgsImV4cCI6MTc0NjUwNzgwOH0.Ab_BzNlXI6uWnzZHW1RkSgzn9X6Z548tHkJXF', 'COD (Bayar di Tempat)', '2025-05-05 05:05:27', '2025-05-05 05:05:27'),
(10, 2, NULL, 'berhasil', 0.00, 33104019.00, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZSI6InVzZXIiLCJpYXQiOjE3NDY0MjE0MDgsImV4cCI6MTc0NjUwNzgwOH0.Ab_BzNlXI6uWnzZHW1RkSgzn9X6Z548tHkJXF', 'COD (Bayar di Tempat)', '2025-05-05 05:20:14', '2025-05-05 05:20:14'),
(11, 2, NULL, 'berhasil', 0.00, 360000.00, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZSI6InVzZXIiLCJpYXQiOjE3NDY0MjE0MDgsImV4cCI6MTc0NjUwNzgwOH0.Ab_BzNlXI6uWnzZHW1RkSgzn9X6Z548tHkJXF', 'COD (Bayar di Tempat)', '2025-05-05 05:22:44', '2025-05-05 05:22:44'),
(12, 2, NULL, 'berhasil', 0.00, 26000.00, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZSI6InVzZXIiLCJpYXQiOjE3NDY0MjI3OTUsImV4cCI6MTc0NjUwOTE5NX0.CoPgcJHbMNydwjk1cLEVPyHqnaG1EHNRNJoTN', 'COD (Bayar di Tempat)', '2025-05-05 05:26:42', '2025-05-05 05:26:42'),
(13, 2, NULL, 'berhasil', 0.00, 42000.00, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZSI6InVzZXIiLCJpYXQiOjE3NDY0MjI3OTUsImV4cCI6MTc0NjUwOTE5NX0.CoPgcJHbMNydwjk1cLEVPyHqnaG1EHNRNJoTN', 'COD (Bayar di Tempat)', '2025-05-05 05:28:36', '2025-05-05 05:28:36'),
(14, 2, NULL, 'berhasil', 0.00, 36000.00, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZSI6InVzZXIiLCJpYXQiOjE3NDY0MjI3OTUsImV4cCI6MTc0NjUwOTE5NX0.CoPgcJHbMNydwjk1cLEVPyHqnaG1EHNRNJoTN', 'COD (Bayar di Tempat)', '2025-05-05 05:29:28', '2025-05-05 05:29:28'),
(15, 2, NULL, 'berhasil', 0.00, 74000.00, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZSI6InVzZXIiLCJpYXQiOjE3NDY0MjI3OTUsImV4cCI6MTc0NjUwOTE5NX0.CoPgcJHbMNydwjk1cLEVPyHqnaG1EHNRNJoTN', 'COD (Bayar di Tempat)', '2025-05-05 05:33:11', '2025-05-05 05:33:11'),
(16, 2, NULL, 'berhasil', 0.00, 42000.00, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZSI6InVzZXIiLCJpYXQiOjE3NDY0MjI3OTUsImV4cCI6MTc0NjUwOTE5NX0.CoPgcJHbMNydwjk1cLEVPyHqnaG1EHNRNJoTN', 'COD (Bayar di Tempat)', '2025-05-05 05:45:23', '2025-05-05 05:45:23'),
(17, 2, NULL, 'berhasil', 0.00, 46000.00, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZSI6InVzZXIiLCJpYXQiOjE3NDY0MjI3OTUsImV4cCI6MTc0NjUwOTE5NX0.CoPgcJHbMNydwjk1cLEVPyHqnaG1EHNRNJoTN', 'COD (Bayar di Tempat)', '2025-05-05 05:47:07', '2025-05-05 05:47:07'),
(18, 2, NULL, 'berhasil', 0.00, 340000.00, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZSI6InVzZXIiLCJpYXQiOjE3NDY0MjI3OTUsImV4cCI6MTc0NjUwOTE5NX0.CoPgcJHbMNydwjk1cLEVPyHqnaG1EHNRNJoTN', 'COD (Bayar di Tempat)', '2025-05-05 05:49:11', '2025-05-05 05:49:11'),
(19, 2, NULL, 'berhasil', 0.00, 26000.00, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZSI6InVzZXIiLCJpYXQiOjE3NDY0MjI3OTUsImV4cCI6MTc0NjUwOTE5NX0.CoPgcJHbMNydwjk1cLEVPyHqnaG1EHNRNJoTN', 'COD (Bayar di Tempat)', '2025-05-05 05:51:17', '2025-05-05 05:51:17'),
(20, 2, NULL, 'berhasil', 0.00, 33104019.00, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZSI6InVzZXIiLCJpYXQiOjE3NDY0MjI3OTUsImV4cCI6MTc0NjUwOTE5NX0.CoPgcJHbMNydwjk1cLEVPyHqnaG1EHNRNJoTN', 'COD (Bayar di Tempat)', '2025-05-05 05:55:16', '2025-05-05 05:55:16'),
(21, 2, NULL, 'berhasil', 0.00, 190000.00, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZSI6InVzZXIiLCJpYXQiOjE3NDY0MjI3OTUsImV4cCI6MTc0NjUwOTE5NX0.CoPgcJHbMNydwjk1cLEVPyHqnaG1EHNRNJoTN', 'COD (Bayar di Tempat)', '2025-05-05 06:00:40', '2025-05-05 06:00:40'),
(22, 2, NULL, 'berhasil', 0.00, 26000.00, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZSI6InVzZXIiLCJpYXQiOjE3NDY0MjI3OTUsImV4cCI6MTc0NjUwOTE5NX0.CoPgcJHbMNydwjk1cLEVPyHqnaG1EHNRNJoTN', 'COD (Bayar di Tempat)', '2025-05-05 06:02:59', '2025-05-05 06:02:59'),
(23, 2, NULL, 'berhasil', 0.00, 46000.00, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZSI6InVzZXIiLCJpYXQiOjE3NDY0MjI3OTUsImV4cCI6MTc0NjUwOTE5NX0.CoPgcJHbMNydwjk1cLEVPyHqnaG1EHNRNJoTN', 'COD (Bayar di Tempat)', '2025-05-05 06:17:39', '2025-05-05 06:17:39'),
(24, 2, NULL, 'berhasil', 0.00, 46000.00, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZSI6InVzZXIiLCJpYXQiOjE3NDY0MjI3OTUsImV4cCI6MTc0NjUwOTE5NX0.CoPgcJHbMNydwjk1cLEVPyHqnaG1EHNRNJoTN', 'COD (Bayar di Tempat)', '2025-05-05 06:23:10', '2025-05-05 06:23:10'),
(25, 2, NULL, 'berhasil', 0.00, 26000.00, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZSI6InVzZXIiLCJpYXQiOjE3NDY0MjI3OTUsImV4cCI6MTc0NjUwOTE5NX0.CoPgcJHbMNydwjk1cLEVPyHqnaG1EHNRNJoTN', 'COD (Bayar di Tempat)', '2025-05-05 07:33:27', '2025-05-05 07:33:27'),
(26, 2, NULL, 'berhasil', 0.00, 26000.00, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZSI6InVzZXIiLCJpYXQiOjE3NDY0MjI3OTUsImV4cCI6MTc0NjUwOTE5NX0.CoPgcJHbMNydwjk1cLEVPyHqnaG1EHNRNJoTN', 'COD (Bayar di Tempat)', '2025-05-05 07:36:10', '2025-05-05 07:36:10'),
(27, 2, NULL, 'berhasil', 0.00, 26000.00, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZSI6InVzZXIiLCJpYXQiOjE3NDY0MjI3OTUsImV4cCI6MTc0NjUwOTE5NX0.CoPgcJHbMNydwjk1cLEVPyHqnaG1EHNRNJoTN', 'COD (Bayar di Tempat)', '2025-05-05 07:55:04', '2025-05-05 07:55:04'),
(28, 2, NULL, 'berhasil', 0.00, 26000.00, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZSI6InVzZXIiLCJpYXQiOjE3NDY0MjI3OTUsImV4cCI6MTc0NjUwOTE5NX0.CoPgcJHbMNydwjk1cLEVPyHqnaG1EHNRNJoTN', 'COD (Bayar di Tempat)', '2025-05-05 08:01:58', '2025-05-05 08:01:58'),
(29, 2, NULL, 'berhasil', 0.00, 26000.00, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZSI6InVzZXIiLCJpYXQiOjE3NDY0MjI3OTUsImV4cCI6MTc0NjUwOTE5NX0.CoPgcJHbMNydwjk1cLEVPyHqnaG1EHNRNJoTN', 'COD (Bayar di Tempat)', '2025-05-05 08:09:25', '2025-05-05 08:09:25'),
(30, 2, NULL, 'berhasil', 0.00, 253000.00, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZSI6InVzZXIiLCJpYXQiOjE3NDY0MjI3OTUsImV4cCI6MTc0NjUwOTE5NX0.CoPgcJHbMNydwjk1cLEVPyHqnaG1EHNRNJoTN', 'COD (Bayar di Tempat)', '2025-05-05 08:09:36', '2025-05-05 08:09:36'),
(31, 2, NULL, 'berhasil', 0.00, 253000.00, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZSI6InVzZXIiLCJpYXQiOjE3NDY0MjI3OTUsImV4cCI6MTc0NjUwOTE5NX0.CoPgcJHbMNydwjk1cLEVPyHqnaG1EHNRNJoTN', 'COD (Bayar di Tempat)', '2025-05-05 08:11:30', '2025-05-05 08:11:30'),
(32, 2, NULL, 'berhasil', 0.00, 496000.00, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZSI6InVzZXIiLCJpYXQiOjE3NDY0MjI3OTUsImV4cCI6MTc0NjUwOTE5NX0.CoPgcJHbMNydwjk1cLEVPyHqnaG1EHNRNJoTN', 'COD (Bayar di Tempat)', '2025-05-05 08:11:41', '2025-05-05 08:11:41'),
(33, 2, NULL, 'berhasil', 0.00, 33084019.00, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZSI6InVzZXIiLCJpYXQiOjE3NDY0MjI3OTUsImV4cCI6MTc0NjUwOTE5NX0.CoPgcJHbMNydwjk1cLEVPyHqnaG1EHNRNJoTN', 'COD (Bayar di Tempat)', '2025-05-05 08:21:16', '2025-05-05 08:21:16'),
(34, 2, NULL, 'menunggu', 0.00, 26000.00, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZSI6InVzZXIiLCJpYXQiOjE3NDY0MzM0MzcsImV4cCI6MTc0NjUxOTgzN30.xISEJAZF1NZpWMD87BxRoEyxWi2GIN0YaQ0YO', 'Midtrans Payment Gateway', '2025-05-05 08:24:24', '2025-05-05 08:24:24'),
(35, 2, NULL, 'berhasil', 0.00, 496000.00, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZSI6InVzZXIiLCJpYXQiOjE3NDY0MzkxOTksImV4cCI6MTc0NjUyNTU5OX0.uDZMqX6vuMWQGwkLptdXQsttElXWTrR0P5nRc', 'COD (Bayar di Tempat)', '2025-05-05 10:00:23', '2025-05-05 10:00:23'),
(36, 2, NULL, 'berhasil', 0.00, 33084019.00, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZSI6InVzZXIiLCJpYXQiOjE3NDY0MzkxOTksImV4cCI6MTc0NjUyNTU5OX0.uDZMqX6vuMWQGwkLptdXQsttElXWTrR0P5nRc', 'COD (Bayar di Tempat)', '2025-05-05 10:30:14', '2025-05-05 10:30:14'),
(37, 2, NULL, 'menunggu', 0.00, 26000.00, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZSI6InVzZXIiLCJpYXQiOjE3NDY0MzkxOTksImV4cCI6MTc0NjUyNTU5OX0.uDZMqX6vuMWQGwkLptdXQsttElXWTrR0P5nRc', 'Midtrans Payment Gateway', '2025-05-05 10:33:53', '2025-05-05 10:33:53'),
(38, 2, NULL, 'menunggu', 0.00, 26000.00, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZSI6InVzZXIiLCJpYXQiOjE3NDY0MzkxOTksImV4cCI6MTc0NjUyNTU5OX0.uDZMqX6vuMWQGwkLptdXQsttElXWTrR0P5nRc', 'Midtrans Payment Gateway', '2025-05-05 10:36:20', '2025-05-05 10:36:20'),
(39, 2, NULL, 'menunggu', 0.00, 26000.00, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZSI6InVzZXIiLCJpYXQiOjE3NDY0NDE3NjAsImV4cCI6MTc0NjUyODE2MH0.yQig3Q8Xu9Rl-obv-3lqqoKoliCoeOiFylkLS', 'Midtrans Payment Gateway', '2025-05-05 10:42:46', '2025-05-05 10:42:46'),
(40, 2, NULL, 'menunggu', 0.00, 26000.00, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZSI6InVzZXIiLCJpYXQiOjE3NDY0NDE3NjAsImV4cCI6MTc0NjUyODE2MH0.yQig3Q8Xu9Rl-obv-3lqqoKoliCoeOiFylkLS', 'Midtrans Payment Gateway', '2025-05-05 10:45:34', '2025-05-05 10:45:34'),
(41, 2, NULL, 'menunggu', 0.00, 26000.00, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZSI6InVzZXIiLCJpYXQiOjE3NDY0NDIwODcsImV4cCI6MTc0NjUyODQ4N30.G1uVFqXTJwkGbBZQh1Wgepb_mbmboN7KTNWN6', 'Midtrans Payment Gateway', '2025-05-05 10:48:11', '2025-05-05 10:48:11'),
(42, 2, NULL, 'menunggu', 0.00, 26000.00, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZSI6InVzZXIiLCJpYXQiOjE3NDY0NDIyNzMsImV4cCI6MTc0NjUyODY3M30.VeliLsO4JKC1qUBMzL3IhjuDTNd2LTt-h1Npd', 'Midtrans Payment Gateway', '2025-05-05 10:51:16', '2025-05-05 10:51:16'),
(43, 2, NULL, 'menunggu', 0.00, 26000.00, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZSI6InVzZXIiLCJpYXQiOjE3NDY0NDI1MzYsImV4cCI6MTc0NjUyODkzNn0.BWhLGPwAiYS-pNJO2dLLsJx0BCjqTpejjHZcu', 'Midtrans Payment Gateway', '2025-05-05 10:55:41', '2025-05-05 10:55:41'),
(44, 2, NULL, 'menunggu', 0.00, 26000.00, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZSI6InVzZXIiLCJpYXQiOjE3NDY0NDI1MzYsImV4cCI6MTc0NjUyODkzNn0.BWhLGPwAiYS-pNJO2dLLsJx0BCjqTpejjHZcu', 'Midtrans Payment Gateway', '2025-05-05 11:04:48', '2025-05-05 11:04:48'),
(45, 2, NULL, 'menunggu', 0.00, 26000.00, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZSI6InVzZXIiLCJpYXQiOjE3NDY0NDI1MzYsImV4cCI6MTc0NjUyODkzNn0.BWhLGPwAiYS-pNJO2dLLsJx0BCjqTpejjHZcu', 'Midtrans Payment Gateway', '2025-05-05 11:37:46', '2025-05-05 11:37:46'),
(46, 2, NULL, 'menunggu', 0.00, 26000.00, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZSI6InVzZXIiLCJpYXQiOjE3NDY0NDI1MzYsImV4cCI6MTc0NjUyODkzNn0.BWhLGPwAiYS-pNJO2dLLsJx0BCjqTpejjHZcu', 'Midtrans Payment Gateway', '2025-05-05 11:39:01', '2025-05-05 11:39:01'),
(47, 2, NULL, 'menunggu', 0.00, 26000.00, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZSI6InVzZXIiLCJpYXQiOjE3NDY0NDI1MzYsImV4cCI6MTc0NjUyODkzNn0.BWhLGPwAiYS-pNJO2dLLsJx0BCjqTpejjHZcu', 'Midtrans Payment Gateway', '2025-05-05 11:53:33', '2025-05-05 11:53:33'),
(48, 2, NULL, 'menunggu', 0.00, 26000.00, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZSI6InVzZXIiLCJpYXQiOjE3NDY0NDI1MzYsImV4cCI6MTc0NjUyODkzNn0.BWhLGPwAiYS-pNJO2dLLsJx0BCjqTpejjHZcu', 'Midtrans Payment Gateway', '2025-05-05 12:09:48', '2025-05-05 12:09:48'),
(49, 2, NULL, 'canceled', 0.00, 670000.00, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZSI6InVzZXIiLCJpYXQiOjE3NDY0NDI1MzYsImV4cCI6MTc0NjUyODkzNn0.BWhLGPwAiYS-pNJO2dLLsJx0BCjqTpejjHZcu', 'Midtrans Payment Gateway', '2025-05-05 12:11:30', '2025-05-05 12:11:30'),
(50, 2, NULL, 'berhasil', 0.00, 26000.00, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZSI6InVzZXIiLCJpYXQiOjE3NDY0NDgxMjYsImV4cCI6MTc0NjUzNDUyNn0.vl-7O4Si0qO2-oM1oi50fhcPcmONou38haWoE', 'COD (Bayar di Tempat)', '2025-05-05 12:16:48', '2025-05-05 12:16:48'),
(51, 2, NULL, 'berhasil', 0.00, 26000.00, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZSI6InVzZXIiLCJpYXQiOjE3NDY0NDgxMjYsImV4cCI6MTc0NjUzNDUyNn0.vl-7O4Si0qO2-oM1oi50fhcPcmONou38haWoE', 'COD (Bayar di Tempat)', '2025-05-05 13:34:14', '2025-05-05 13:34:14'),
(52, 2, NULL, 'berhasil', 0.00, 26000.00, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZSI6InVzZXIiLCJpYXQiOjE3NDY0NDgxMjYsImV4cCI6MTc0NjUzNDUyNn0.vl-7O4Si0qO2-oM1oi50fhcPcmONou38haWoE', 'COD (Bayar di Tempat)', '2025-05-05 13:37:13', '2025-05-05 13:37:13'),
(53, 2, NULL, 'berhasil', 0.00, 26000.00, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZSI6InVzZXIiLCJpYXQiOjE3NDY0NDgxMjYsImV4cCI6MTc0NjUzNDUyNn0.vl-7O4Si0qO2-oM1oi50fhcPcmONou38haWoE', 'COD (Bayar di Tempat)', '2025-05-05 13:39:00', '2025-05-05 13:39:00'),
(54, 2, NULL, 'berhasil', 0.00, 670000.00, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZSI6InVzZXIiLCJpYXQiOjE3NDY0NDgxMjYsImV4cCI6MTc0NjUzNDUyNn0.vl-7O4Si0qO2-oM1oi50fhcPcmONou38haWoE', 'COD (Bayar di Tempat)', '2025-05-05 13:40:18', '2025-05-05 13:40:18'),
(55, 2, NULL, 'canceled', 0.00, 350000.00, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZSI6InVzZXIiLCJpYXQiOjE3NDY0NDgxMjYsImV4cCI6MTc0NjUzNDUyNn0.vl-7O4Si0qO2-oM1oi50fhcPcmONou38haWoE', 'Midtrans Payment Gateway', '2025-05-05 13:40:56', '2025-05-05 13:40:56'),
(56, 2, NULL, 'berhasil', 0.00, 301000.00, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZSI6InVzZXIiLCJpYXQiOjE3NDY0NDgxMjYsImV4cCI6MTc0NjUzNDUyNn0.vl-7O4Si0qO2-oM1oi50fhcPcmONou38haWoE', 'COD (Bayar di Tempat)', '2025-05-05 15:15:25', '2025-05-05 15:15:25'),
(57, 2, NULL, 'menunggu', 0.00, 26000.00, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZSI6InVzZXIiLCJpYXQiOjE3NDY0OTUzOTAsImV4cCI6MTc0NjU4MTc5MH0.DIjSAIyH-2-yN_oxxKnEdtcvmtCPj9ODOtG32', 'Midtrans Payment Gateway', '2025-05-06 02:07:45', '2025-05-06 02:07:45'),
(58, 2, NULL, 'berhasil', 0.00, 26000.00, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZSI6InVzZXIiLCJpYXQiOjE3NDY0OTUzOTAsImV4cCI6MTc0NjU4MTc5MH0.DIjSAIyH-2-yN_oxxKnEdtcvmtCPj9ODOtG32', 'COD (Bayar di Tempat)', '2025-05-06 02:08:12', '2025-05-06 02:08:12'),
(59, 2, NULL, 'berhasil', 0.00, 26000.00, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZSI6InVzZXIiLCJpYXQiOjE3NDY0OTk1NTQsImV4cCI6MTc0NjU4NTk1NH0.Ic9TIvW6V35fGml6E47TdMB8kUolJQ8iAH0lD', 'COD (Bayar di Tempat)', '2025-05-06 03:06:04', '2025-05-06 03:06:04'),
(61, 2, NULL, 'berhasil', 0.00, 253000.00, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZSI6InVzZXIiLCJpYXQiOjE3NDY0OTk1NTQsImV4cCI6MTc0NjU4NTk1NH0.Ic9TIvW6V35fGml6E47TdMB8kUolJQ8iAH0lD', 'COD (Bayar di Tempat)', '2025-05-06 05:46:28', '2025-05-06 05:46:28'),
(62, 2, NULL, 'pending', NULL, NULL, NULL, NULL, '2025-05-06 07:12:26', '2025-05-06 07:12:26');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `role` enum('user','admin') NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `birth` date DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `contact` varchar(255) DEFAULT NULL,
  `bill` text DEFAULT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `role`, `name`, `email`, `email_verified_at`, `password`, `gender`, `birth`, `address`, `city`, `contact`, `bill`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'admin', 'admin', 'admin@gmail.com', NULL, '$2a$10$xntll4VavFCpQXpHgE2S7uZP2hxdqRRxyQrdpdSmSdST28H4XRWg2', '', '0000-00-00', '', '', '', '', NULL, '2025-05-03 06:58:11', '2025-05-03 06:58:11'),
(2, 'user', 'Shafira', 'rrachmashafira@gmail.com', NULL, '$2a$10$G6JMDwdhAOV/85cAWIVvke2cQOafN6flSm6dKXPR/E41B9TPcEz52', 'Female', '2003-04-29', 'Griyo Wage Asri 1 C-08, Taman', 'Sidoarjo', '0859106507285', '123456789', NULL, '2025-05-03 06:59:38', '2025-05-03 06:59:38');

-- --------------------------------------------------------

--
-- Table structure for table `vendors`
--

CREATE TABLE `vendors` (
  `id` int(11) NOT NULL,
  `nama_perusahaan` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `no_telepon` varchar(20) DEFAULT NULL,
  `deskripsi_produk` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `vendors`
--

INSERT INTO `vendors` (`id`, `nama_perusahaan`, `email`, `no_telepon`, `deskripsi_produk`, `created_at`) VALUES
(1, 'medimart', 'medimart@example.com', '09109101428', 'Kursi Roda', '2025-05-04 17:55:06');

-- --------------------------------------------------------

--
-- Table structure for table `vendors_deliveries`
--

CREATE TABLE `vendors_deliveries` (
  `id` int(11) NOT NULL,
  `vendor_id` int(11) NOT NULL,
  `nama_produk` varchar(255) NOT NULL,
  `jumlah` int(11) NOT NULL,
  `nama_penjual_tujuan` varchar(255) NOT NULL,
  `alamat_tujuan` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `carts`
--
ALTER TABLE `carts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `carts_product_id_foreign` (`product_id`),
  ADD KEY `carts_transaction_id_foreign` (`transaction_id`),
  ADD KEY `carts_user_id_foreign` (`user_id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `feedbacks`
--
ALTER TABLE `feedbacks`
  ADD PRIMARY KEY (`id`),
  ADD KEY `feedbacks_user_id_foreign` (`user_id`),
  ADD KEY `fk_product` (`product_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `shipping_methods`
--
ALTER TABLE `shipping_methods`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `transactions_shipping_method_id_foreign` (`shipping_method_id`),
  ADD KEY `transactions_user_id_foreign` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `vendors`
--
ALTER TABLE `vendors`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `vendors_deliveries`
--
ALTER TABLE `vendors_deliveries`
  ADD PRIMARY KEY (`id`),
  ADD KEY `vendor_id` (`vendor_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `carts`
--
ALTER TABLE `carts`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=73;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `feedbacks`
--
ALTER TABLE `feedbacks`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `shipping_methods`
--
ALTER TABLE `shipping_methods`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `transactions`
--
ALTER TABLE `transactions`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=63;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `vendors`
--
ALTER TABLE `vendors`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `vendors_deliveries`
--
ALTER TABLE `vendors_deliveries`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `carts`
--
ALTER TABLE `carts`
  ADD CONSTRAINT `carts_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `carts_transaction_id_foreign` FOREIGN KEY (`transaction_id`) REFERENCES `transactions` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `carts_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `feedbacks`
--
ALTER TABLE `feedbacks`
  ADD CONSTRAINT `fk_product` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `transactions`
--
ALTER TABLE `transactions`
  ADD CONSTRAINT `transactions_shipping_method_id_foreign` FOREIGN KEY (`shipping_method_id`) REFERENCES `shipping_methods` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `transactions_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `vendors_deliveries`
--
ALTER TABLE `vendors_deliveries`
  ADD CONSTRAINT `vendors_deliveries_ibfk_1` FOREIGN KEY (`vendor_id`) REFERENCES `vendors` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
