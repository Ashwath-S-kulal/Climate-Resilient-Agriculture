import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import { FaUserShield, FaUserAlt, FaEnvelope, FaCalendarAlt, FaTrashAlt, FaExternalLinkAlt } from "react-icons/fa";
import { ShieldCheck } from "lucide-react";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch("/api/admin/getallusers", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        const text = await res.text(); // read HTML or error
        throw new Error(`Request failed: ${res.status} - ${text}`);
      }

      const data = await res.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error.message);
    } finally {
      setLoading(false);
    }
  };


  const handleDeleteUser = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user? This action cannot be undone.")) {
      try {
        const res = await fetch(`/api/admin/deleteuser/${userId}`, {
          method: 'DELETE',
        });
        const data = await res.json();
        if (data.success) {
          setUsers(users.filter((user) => user._id !== userId));
        }
      } catch (error) {
        console.log(error)
        console.error("Failed to delete user");
      }
    }
  };

  const handleRoleChange = async (userId, isAdmin) => {
    if (!window.confirm(`Make this user ${isAdmin ? "User" : "Admin"}?`)) return;

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `/api/admin/${userId}/role`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text);
      }

      await fetchUsers();
    } catch (error) {
      console.error("Role update failed:", error.message);
    }
  };



  return (
    <div className="min-h-screen pt-20 w-full bg-gradient-to-b from-[#d8f3dc] via-[#b7e4c7] to-[#95d5b2] text-slate-900 font-sans">
      <Header />

      <div className="p-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 border-b border-slate-200 pb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">Admin Dashboard</h1>
            <p className="text-slate-500 mt-1">Manage platform access and user permissions.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Total Accounts</p>
              <p className="text-2xl font-bold text-indigo-600">{users.length}</p>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col justify-center items-center py-12">
            <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-md font-medium text-green-600 mt-3">
              {"Loading Users Database..."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {users.map((user) => (
              <div
                key={user._id}
                className="bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col"
              >
                <div className="p-6 flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <img
                      src={user.profilePicture || "https://img.freepik.com/premium-vector/business-man-avatar-profile_1133257-2431.jpg?semt=ais_hybrid&w=740&q=80"}
                      alt={user.username}
                      className="w-14 h-14 rounded-full object-cover border-2 border-slate-50 shadow-sm"
                    />
                    <div>
                      <h3 className="font-bold text-lg text-slate-800 leading-tight">{user.username}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        {user.isAdmin ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-amber-50 text-amber-700 border border-amber-100">
                            <FaUserShield className="mr-1" /> Admin
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200">
                            <FaUserAlt className="mr-1" size={10} /> User
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="px-6 pb-6 flex-grow">
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-slate-500">
                      <FaEnvelope className="w-4 mr-3 text-slate-400" />
                      <span className="truncate">{user.email}</span>
                    </div>
                    <div className="flex items-center text-sm text-slate-500">
                      <FaCalendarAlt className="w-4 mr-3 text-slate-400" />
                      <span>Joined {new Date(user.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                  </div>
                </div>


                <div className="bg-slate-50 px-6 py-3 border-t border-slate-100 flex justify-between items-center">
                  <button
                    onClick={() => handleRoleChange(user._id, user.isAdmin)}
                    className="flex items-center gap-2 text-xs font-bold text-green-500 hover:text-green-700 uppercase tracking-tighter transition-colors"
                  >
                    <ShieldCheck size={16} />Make {user.isAdmin ? "User" : "Admin"}
                  </button>
                  <button
                    onClick={() => handleDeleteUser(user._id)}
                    className="flex items-center gap-2 text-xs font-bold text-red-500 hover:text-red-700 uppercase tracking-tighter transition-colors"
                  >
                    <FaTrashAlt size={12} /> Delete User
                  </button>
                </div>


              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}