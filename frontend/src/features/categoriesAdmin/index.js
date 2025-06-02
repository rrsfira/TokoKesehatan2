import React, { useState, useEffect } from "react";
import {
  PlusIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import axios from "axios";

const Categories = () => {
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(5);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(""); // "create", "edit", "delete"
  const [selectedItem, setSelectedItem] = useState(null);
  const [categoryName, setCategoryName] = useState("");

  // Fetch data
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    axios
      .get("http://localhost:5000/api/categories")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching Kategori data:", error);
      });
  };

  const handleCreateCategory = () => {
    setModalType("create");
    setSelectedItem(null);
    setCategoryName("");
    setIsModalOpen(true);
  };

  const handleEditCategory = (item) => {
    setModalType("edit");
    setSelectedItem(item);
    setCategoryName(item.name); // Set category name to the selected item
    setIsModalOpen(true);
  };

  const handleDeleteCategory = (item) => {
    setModalType("delete");
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleModalSubmit = async (e) => {
    e.preventDefault();

    if (!categoryName.trim()) {
      console.error("Category name cannot be empty");
      return; // Don't allow empty category name
    }

    try {
      if (modalType === "create") {
        await axios.post("http://localhost:5000/api/categories", {
          name: categoryName,
        });
      } else if (modalType === "edit" && selectedItem) {
        await axios.put(
          `http://localhost:5000/api/categories/${selectedItem.id}`,
          { name: categoryName }
        );
      }

      fetchCategories(); // Refresh the data
      setIsModalOpen(false); // Close the modal
    } catch (error) {
      console.error("Error saving category:", error);
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      if (!selectedItem) {
        console.error("No category selected for deletion.");
        return;
      }

      await axios.delete(
        `http://localhost:5000/api/categories/${selectedItem.id}`
      );
      fetchCategories(); // Refresh data after deletion
      setIsModalOpen(false); // Close the modal
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  const filteredData = data.filter((item) =>
    Object.values(item).some((val) =>
      String(val).toLowerCase().includes(searchText.toLowerCase())
    )
  );

  const currentData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  return (
    <div className="min-h-screen bg-base-200 px-6 py-10 space-y-12">
      <div className="bg-base-100 p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-bold mb-4">Tabel Kategori</h2>

        <div className="flex flex-col sm:flex-row sm:justify-between gap-4 mb-4">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-full sm:w-1/3"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />

          <button
            className="btn btn-primary flex items-center"
            onClick={handleCreateCategory}
          >
            <PlusIcon className="w-5 h-5 mr-1" />
            Tambah
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th className="text-center">No.</th>
                <th className="text-center">Nama</th>
                <th className="text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((item, idx) => (
                <tr key={item.id}>
                  <td className="text-center">
                    {(currentPage - 1) * rowsPerPage + idx + 1}
                  </td>
                  <td className="text-center">{item.name}</td>
                  <td className="text-center space-x-2">
                    <button
                      onClick={() => handleEditCategory(item)}
                      className="btn btn-sm btn-warning"
                    >
                      <PencilSquareIcon className="w-5 h-5" />
                    </button>
                    <button
                      className="btn btn-sm btn-error"
                      onClick={() => handleDeleteCategory(item)}
                    >
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="btn btn-sm btn-outline"
          >
            ← Prev
          </button>

          <div className="flex items-center gap-1">
            {currentPage > 3 && (
              <>
                <button
                  onClick={() => setCurrentPage(1)}
                  className="btn btn-sm btn-outline"
                >
                  1
                </button>
                {currentPage > 4 && (
                  <span className="px-2 text-gray-500">...</span>
                )}
              </>
            )}

            {Array.from({ length: 5 }, (_, i) => {
              const page = currentPage - 2 + i;
              if (page < 1 || page > totalPages) return null;
              return (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`btn btn-sm btn-outline ${
                    page === currentPage ? "btn-active" : ""
                  }`}
                >
                  {page}
                </button>
              );
            })}

            {currentPage < totalPages - 2 && (
              <>
                {currentPage < totalPages - 3 && (
                  <span className="px-2 text-gray-500">...</span>
                )}
                <button
                  onClick={() => setCurrentPage(totalPages)}
                  className="btn btn-sm btn-outline"
                >
                  {totalPages}
                </button>
              </>
            )}
          </div>

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="btn btn-sm btn-outline"
          >
            Next →
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-[90%] max-w-md space-y-4">
            <h3 className="text-lg font-bold">
              {modalType === "create" && "Tambah Kategori"}
              {modalType === "edit" && "Edit Kategori"}
              {modalType === "delete" && "Hapus Kategori"}
            </h3>

            {/* Delete Confirmation */}
            {modalType === "delete" ? (
              <div>
                <p>
                  Yakin ingin menghapus kategori <b>{selectedItem?.name}</b>?
                </p>
                <div className="flex justify-end gap-2 mt-4">
                  <button
                    className="btn btn-sm"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Batal
                  </button>
                  <button
                    className="btn btn-sm btn-error"
                    onClick={handleDeleteConfirm}
                  >
                    Hapus
                  </button>
                </div>
              </div>
            ) : (
              <form
                className="flex flex-col gap-4"
                onSubmit={handleModalSubmit}
              >
                <input
                  type="text"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  placeholder="Nama Kategori"
                  className="input input-bordered w-full"
                  required
                />
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    className="btn btn-sm"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Batal
                  </button>
                  <button type="submit" className="btn btn-sm btn-primary">
                    Simpan
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Categories;
