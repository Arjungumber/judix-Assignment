import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const actionText = {
    activate: "activated",
    deactivate: "deactivated",
};

    const fetchUsers = async (pageNo = 1) => {
        try {
        setLoading(true);
        const res = await axios.get(
            `${process.env.REACT_APP_API_URL}admin/users?page=${pageNo}&limit=10`,
            {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            }
        );
        console.log(res.data);
        setUsers(res.data.data);
        setTotalPages(res.data.pagination.totalPages);
        setPage(res.data.pagination.currentPage);
        
        toast.success("Users Fetched successfully");
        } catch (err) {
        setError("Failed to load users");
        toast.error(err);
        } finally {
        setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers(page);
    }, []);

    const updateStatus = async (id, action) => {
        const confirm = window.confirm(
        `Are you sure you want to ${action} this user?`
        );
        if (!confirm) return;
        setLoading(true);
        try {
        await axios.put(
            `${process.env.REACT_APP_API_URL}admin/users/${id}/${action}`,
            {},
            {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            }
        );
        setLoading(false);
        toast.success(`User ${actionText[action]} successfully`);
        fetchUsers(page);
        } catch(err) {
        setLoading(false);
        toast.error(err.message);
        }
    };

    return (
      <div className="mt-5 container mx-auto px-4">
        <div className="flex justify-center">
          <div className="w-full lg:w-10/12">
            <div className="shadow-sm bg-white rounded-lg">
              <div className="p-4">
                <h4 className="text-center mb-4 text-xl font-semibold">
                  Admin Dashboard
                </h4>

                {loading && (
                  <div className="text-center my-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-4 border-blue-600 border-b-4 border-gray-200 mx-auto"></div>
                  </div>
                )}

                {error && (
                  <div className="bg-red-100 text-red-700 px-3 py-2 rounded text-center mb-3">
                    {error}
                  </div>
                )}

                {!loading && (
                  <>
                    <div className="overflow-x-auto">
                      <table className="min-w-full border border-gray-200 divide-y divide-gray-200 table-auto">
                        <thead className="bg-gray-100">
                          <tr>
                            <th className="px-4 py-2 text-left">Email</th>
                            <th className="px-4 py-2 text-left">Full Name</th>
                            <th className="px-4 py-2 text-left">Role</th>
                            <th className="px-4 py-2 text-left">Status</th>
                            <th className="px-4 py-2 text-center">Actions</th>
                          </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-200">
                          {users.map((user) => (
                            <tr key={user._id}>
                              <td className="px-4 py-2">{user.email}</td>
                              <td className="px-4 py-2">{user.fullName}</td>
                              <td className="px-4 py-2">
                                <span
                                  className={`inline-block px-2 py-1 text-sm font-medium rounded ${
                                    user.role === "admin"
                                      ? "bg-blue-600 text-white"
                                      : "bg-gray-400 text-white"
                                  }`}
                                >
                                  {user.role}
                                </span>
                              </td>
                              <td className="px-4 py-2">
                                <span
                                  className={`inline-block px-2 py-1 text-sm font-medium rounded ${
                                    user.status === "active"
                                      ? "bg-green-600 text-white"
                                      : "bg-red-600 text-white"
                                  }`}
                                >
                                  {user.status}
                                </span>
                              </td>
                              <td className="px-4 py-2 text-center">
                                {user.status === "active" ? (
                                  <button
                                    className="text-sm border border-red-500 text-red-500 px-2 py-1 rounded hover:bg-red-500 hover:text-white transition"
                                    onClick={() =>
                                      updateStatus(user._id, "deactivate")
                                    }
                                  >
                                    Deactivate
                                  </button>
                                ) : (
                                  <button
                                    className="text-sm border border-green-500 text-green-500 px-2 py-1 rounded hover:bg-green-500 hover:text-white transition"
                                    onClick={() =>
                                      updateStatus(user._id, "activate")
                                    }
                                  >
                                    Activate
                                  </button>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                   
                    <div className="flex justify-between items-center mt-4">
                      <button
                        className="px-3 py-1 border border-gray-400 rounded hover:bg-gray-100 disabled:opacity-50"
                        disabled={page === 1}
                        onClick={() => fetchUsers(page - 1)}
                      >
                        Prev
                      </button>

                      <span className="text-gray-500">
                        Page <strong>{page}</strong> of{" "}
                        <strong>{totalPages}</strong>
                      </span>

                      <button
                        className="px-3 py-1 border border-gray-400 rounded hover:bg-gray-100 disabled:opacity-50"
                        disabled={page === totalPages}
                        onClick={() => fetchUsers(page + 1)}
                      >
                        Next
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};

export default AdminDashboard;
