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
        <div className="container mt-5">
            <div className="row justify-content-center">
            <div className="col-lg-10">
                <div className="card shadow-sm">
                <div className="card-body">
                    <h4 className="card-title mb-4 text-center">Admin Dashboard</h4>

                    {loading && (
                    <div className="text-center my-4">
                        <div className="spinner-border text-primary" />
                    </div>
                    )}

                    {error && (
                    <div className="alert alert-danger text-center">{error}</div>
                    )}

                    {!loading && (
                    <>
                        <div className="table-responsive">
                        <table className="table table-bordered table-hover align-middle">
                            <thead className="table-light">
                            <tr>
                                <th>Email</th>
                                <th>Full Name</th>
                                <th>Role</th>
                                <th>Status</th>
                                <th className="text-center">Actions</th>
                            </tr>
                            </thead>

                            <tbody>
                            {users.map((user) => (
                                <tr key={user._id}>
                                <td>{user.email}</td>
                                <td>{user.fullName}</td>
                                <td>
                                    <span
                                    className={`badge ${
                                        user.role === "admin"
                                        ? "bg-primary"
                                        : "bg-secondary"
                                    }`}
                                    >
                                    {user.role}
                                    </span>
                                </td>
                                <td>
                                    <span
                                    className={`badge ${
                                        user.status === "active"
                                        ? "bg-success"
                                        : "bg-danger"
                                    }`}
                                    >
                                    {user.status}
                                    </span>
                                </td>
                                <td className="text-center">
                                    {user.status === "active" ? (
                                    <button
                                        className="btn btn-sm btn-outline-danger"
                                        onClick={() =>
                                        updateStatus(user._id, "deactivate")
                                        }
                                    >
                                        Deactivate
                                    </button>
                                    ) : (
                                    <button
                                        className="btn btn-sm btn-outline-success"
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

                        {/* Pagination */}
                        <div className="d-flex justify-content-between align-items-center mt-4">
                        <button
                            className="btn btn-outline-secondary"
                            disabled={page === 1}
                            onClick={() => fetchUsers(page - 1)}
                        >
                            Prev
                        </button>

                        <span className="text-muted">
                            Page <strong>{page}</strong> of{" "}
                            <strong>{totalPages}</strong>
                        </span>

                        <button
                            className="btn btn-outline-secondary"
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
