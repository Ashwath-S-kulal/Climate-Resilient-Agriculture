import React from "react";
import { FaUserCircle } from "react-icons/fa";
import Header from "../Components/Header";
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signOut,
} from '../redux/user/userSlice';
import { FaUser, FaEnvelope, FaLock, FaSignOutAlt, FaTrash } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { ShieldCheck } from "lucide-react";


export default function ProfilePage() {
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const { currentUser, loading, error } = useSelector(state => state.user);
  const dispatch = useDispatch();



  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error));
    }
  };

  const handleDeleteAccount = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error));
    }
  };

  const handleSignOut = async () => {
    try {
      await fetch('/api/auth/signout');
      dispatch(signOut())
    } catch (error) {
      console.log(error);
    }
  };
  return (

    <div className="relative min-h-screen pt-10 w-full bg-gradient-to-b from-[#d8f3dc] via-[#b7e4c7] to-[#95d5b2] overflow-hidden text-slate-800 font-sans">
      <Header />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-100/50 blur-[100px] rounded-full"></div>
        <div className="absolute top-1/2 -right-24 w-80 h-80 bg-blue-50/50 blur-[100px] rounded-full"></div>
      </div>

      <div className="relative w-full max-w-6xl mx-auto pt-16 pb-14 px-4 sm:px-6">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-black tracking-tight text-slate-900">
              Account <span className="text-indigo-600">Settings</span>
            </h1>
            <p className="text-slate-500 mt-1">Manage your profile and security preferences.</p>
          </div>

          <div className="flex items-center gap-3">
            {currentUser?.isAdmin && (
              <NavLink to="/adminpanel">
                <button className="flex items-center gap-2 px-5 py-2.5 bg-amber-50 border border-amber-200 text-amber-700 rounded-xl hover:bg-amber-100 transition shadow-sm font-semibold text-sm">
                  <ShieldCheck size={18} /> Admin panel
                </button>
              </NavLink>
            )}
            <button
              onClick={handleSignOut}
              className="px-5 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 transition shadow-sm text-sm font-medium flex items-center gap-2"
            >
              <FaSignOutAlt size={18} /> Sign Out
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 pb-7 flex flex-col items-center text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-48 bg-gradient-to-r from-indigo-500 to-blue-600"></div>

              <div className="relative mt-4">
                <div className="w-32 h-32 rounded-3xl overflow-hidden ring-4 ring-white shadow-xl rotate-3 hover:rotate-0 transition-transform duration-300">
                  <img
                    src={currentUser.profilePicture}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="mt-6">
                <h2 className="text-2xl font-bold text-slate-900">{currentUser.username}</h2>
                <p className="text-slate-500 flex items-center justify-center gap-2 mt-1">
                  <FaEnvelope className="text-indigo-400" /> {currentUser.email}
                </p>
              </div>
              <div className="text-xs mt-2 text-gray-700 text-justify italic ">
                <p>Welcome to your profile! Here you can view and manage your personal information. Keep your details up to date to enjoy a seamless and personalized experience on our platform.</p>
              </div>

              <div className="w-full grid grid-cols-2 gap-3 mt-8">
                <button className="flex flex-col items-center justify-center p-4 bg-slate-50 rounded-2xl hover:bg-red-50 hover:text-red-600 transition group" onClick={handleDeleteAccount}>
                  <FaTrash className="text-slate-400 group-hover:text-red-500 mb-1" />
                  <span className="text-xs font-bold">Delete</span>
                </button>
                <button className="flex flex-col items-center justify-center p-4 bg-slate-50 rounded-2xl hover:bg-indigo-50 hover:text-indigo-600 transition group" onClick={handleSignOut}>
                  <FaSignOutAlt className="text-slate-400 group-hover:text-indigo-500 mb-1" />
                  <span className="text-xs font-bold">Logout</span>
                </button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8">
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 sm:p-10">
              <div className="flex items-center gap-4 mb-10">
                <div className="p-3 bg-indigo-50 rounded-2xl">
                  <MdEdit className="text-indigo-600 text-2xl" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">Personal Information</h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700 ml-1">Username</label>
                    <div className="relative">
                      <FaUser className="absolute top-1/2 -translate-y-1/2 left-4 text-slate-400" />
                      <input
                        id="username"
                        defaultValue={currentUser.username}
                        onChange={handleChange}
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-12 py-3.5 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition"
                        placeholder="John Doe"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700 ml-1">Email Address</label>
                    <div className="relative">
                      <FaEnvelope className="absolute top-1/2 -translate-y-1/2 left-4 text-slate-400" />
                      <input
                        id="email"
                        defaultValue={currentUser.email}
                        onChange={handleChange}
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-12 pr-2 py-3.5 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition"
                        placeholder="name@example.com"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 ml-1">New Password</label>
                  <div className="relative">
                    <FaLock className="absolute top-1/2 -translate-y-1/2 left-4 text-slate-400" />
                    <input
                      id="password"
                      type="password"
                      onChange={handleChange}
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-12 py-3.5 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition"
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full sm:w-max px-10 rounded-2xl bg-slate-900 text-white py-4 font-bold shadow-lg shadow-slate-200 hover:bg-indigo-600 hover:shadow-indigo-200 hover:-translate-y-1 transition-all duration-300"
                  >
                    {loading ? "Saving Changes..." : "Update Profile"}
                  </button>
                </div>
              </form>

              {error && (
                <div className="mt-6 p-4 bg-red-50 border border-red-100 rounded-2xl text-red-600 text-center text-sm font-medium">
                  Something went wrong. Please try again.
                </div>
              )}
              {updateSuccess && (
                <div className="mt-6 p-4 bg-emerald-50 border border-emerald-100 rounded-2xl text-emerald-600 text-center text-sm font-medium">
                  Profile updated successfully!
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}