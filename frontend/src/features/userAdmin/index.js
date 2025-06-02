import React, { useState, useEffect } from "react";
import axios from "axios";

const UsersAdmin = () => {
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(5);
  const [showModal, setShowModal] = useState(false);
  const [editUser, setEditUser] = useState(null);

  const handleEdit = (item) => {
    setEditUser(item);
    setShowModal(true);
  };

  const handleSave = async () => {
    try {
      await axios.put(
        `http://localhost:5000/api/userAdmin/${editUser.id}`,
        editUser
      );
      setShowModal(false);
      fetchUserAdmin(); // refresh data
    } catch (error) {
      console.error("Gagal update user:", error);
    }
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("Yakin ingin menghapus user ini?");
    if (confirm) {
      try {
        await axios.delete(`http://localhost:5000/api/userAdmin/${id}`);
        fetchUserAdmin(); // refresh data
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  useEffect(() => {
    fetchUserAdmin();
  }, []);

  const fetchUserAdmin = () => {
    axios
      .get("http://localhost:5000/api/userAdmin")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching User data:", error);
      });
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
        <h2 className="text-xl font-bold mb-4">Tabel User</h2>

        <div className="flex flex-col sm:flex-row sm:justify-between gap-4 mb-4">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-full sm:w-1/3"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>

        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th className="text-center">No.</th>
                <th className="text-center">Nama</th>
                <th className="text-center">Email</th>
                <th className="text-center">Gender</th>
                <th className="text-center">Alamat</th>
                <th className="text-center">Kontak</th>
                <th className="text-center">Bill</th>
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
                  <td className="text-center">{item.email}</td>
                  <td className="text-center">{item.gender}</td>
                  <td className="text-center">{item.address}</td>
                  <td className="text-center">{item.contact}</td>
                  <td className="text-center">{item.bill}</td>
                  <td className="text-center space-x-2">
                    <button
                      className="btn btn-sm btn-warning"
                      onClick={() => handleEdit(item)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-error"
                      onClick={() => handleDelete(item.id)}
                    >
                      Hapus
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
      {showModal && (
        <dialog className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Edit User</h3>
            <div className="form-control space-y-2 mt-4">
              <input
                type="text"
                className="input input-bordered"
                placeholder="Nama"
                value={editUser.name}
                onChange={(e) =>
                  setEditUser({ ...editUser, name: e.target.value })
                }
              />
              <input
                type="email"
                className="input input-bordered"
                placeholder="Email"
                value={editUser.email}
                onChange={(e) =>
                  setEditUser({ ...editUser, email: e.target.value })
                }
              />
              <input
                type="text"
                className="input input-bordered"
                placeholder="Gender"
                value={editUser.gender}
                onChange={(e) =>
                  setEditUser({ ...editUser, gender: e.target.value })
                }
              />
              <input
                type="text"
                className="input input-bordered"
                placeholder="Alamat"
                value={editUser.address}
                onChange={(e) =>
                  setEditUser({ ...editUser, address: e.target.value })
                }
              />
              <input
                type="text"
                className="input input-bordered"
                placeholder="Kontak"
                value={editUser.contact}
                onChange={(e) =>
                  setEditUser({ ...editUser, contact: e.target.value })
                }
              />
              <input
                type="number"
                className="input input-bordered"
                placeholder="Bill"
                value={editUser.bill}
                onChange={(e) =>
                  setEditUser({ ...editUser, bill: e.target.value })
                }
              />
            </div>

            <div className="modal-action">
              <button className="btn" onClick={() => setShowModal(false)}>
                Batal
              </button>
              <button className="btn btn-primary" onClick={handleSave}>
                Simpan
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default UsersAdmin;
