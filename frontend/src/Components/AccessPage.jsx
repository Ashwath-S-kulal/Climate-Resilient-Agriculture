import React from "react";
import Header from "./Header";
import { NavLink } from "react-router-dom";
import {
  FaHome, FaArrowRight, FaChartLine, FaMicroscope,
  FaExclamationTriangle, FaLightbulb, FaCloudSun, FaBug, FaRobot, FaLock
} from "react-icons/fa";

export default function AccessPage() {
  const features = [
    { icon: <FaMicroscope />, title: "Disease Info", desc: "AI-driven plant pathology database.", color: "text-blue-600", bg: "bg-blue-50" },
    { icon: <FaExclamationTriangle />, title: "Risk Analysis", desc: "Real-time crop Risk assessment.", color: "text-orange-600", bg: "bg-orange-50" },
    { icon: <FaLightbulb />, title: "Crop Advisor", desc: "weather-specific recommendations.", color: "text-emerald-600", bg: "bg-emerald-50" },
    { icon: <FaCloudSun />, title: "Weather Plus", desc: "Hyper-local climate tracking.", color: "text-sky-600", bg: "bg-sky-50" },
    { icon: <FaBug />, title: "Pest Control", desc: "Predictive modeling for outbreaks.", color: "text-rose-600", bg: "bg-rose-50" },
    { icon: <FaRobot />, title: "AgriBot 24/7", desc: "Instant expert farming advice.", color: "text-indigo-600", bg: "bg-indigo-50" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#d8f3dc] via-[#b7e4c7] to-[#95d5b2] text-slate-900 font-sans overflow-x-hidden">
      <Header />

      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-20 md:pt-24 pb-24">
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-12 items-center">

          <div className="lg:col-span-7 text-center lg:text-left order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-[10px] sm:text-xs font-bold tracking-wider uppercase mb-6 shadow-lg shadow-emerald-200">
              New: Climate Resilient Farming Tools
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] mb-6 sm:mb-8">
              Grow Smarter with <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-emerald-500 to-teal-400">
                Data-Driven Tech.
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-800 max-w-xl mx-auto lg:mx-0 leading-relaxed mb-8 sm:mb-10 border-l-0 lg:border-l-4 border-emerald-500 px-4 lg:pl-6">
              The all-in-one platform for modern farmers.
              Empower your farms with modern solutions, including Crop Management, Crop Recommender, Disease Prediction, and Weather Center, to increase crop yield, monitor weather, and streamline agricultural operations for a sustainable future.
            </p>
            <p className="font-bold text-lg italic text-red-800  max-w-xl mx-auto lg:mx-0 leading-relaxed mb-4 sm:mb-4 border-l-0 lg:border-l-4 border-red-500 px-4 lg:pl-6">Login to access these feature</p>

            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
              <NavLink to="/signup" className="w-full sm:w-auto">
                <button className="w-full flex items-center justify-center gap-3 px-8 py-4 sm:px-10 sm:py-5 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-100">
                  Get Started <FaArrowRight />
                </button>
              </NavLink>

              <NavLink to="/signin" className="w-full sm:w-auto">
                <button className="w-full px-8 py-4 sm:px-10 sm:py-5 bg-white text-slate-700 font-bold rounded-2xl border-2 border-slate-100 hover:border-blue-200 transition-all shadow-sm">
                  Member Login
                </button>
              </NavLink>
            </div>
          </div>


          <div className="lg:col-span-5 relative order-1 lg:order-2 w-full max-w-md lg:max-w-none mx-auto">
            <div className="lg:col-span-5 relative order-1 lg:order-2 w-full max-w-[320px] xs:max-w-md lg:max-w-none mx-auto">
              <div className="relative z-10 p-2 bg-white rounded-[2.5rem] sm:rounded-[3.5rem] shadow-2xl border border-slate-100">
                <img
                  src="https://cdn.prod.website-files.com/637f7c161a14232e2ea8473d/68b84418387c0de1052a3238_dc1a55f6.png"
                  alt="Agriculture Tech"
                  className="rounded-[2rem] sm:rounded-[3rem] w-full aspect-[4/5] object-cover"
                />

                <div className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 bg-white p-4 sm:p-6 rounded-[1.5rem] sm:rounded-[1.8rem] shadow-xl border border-slate-50 w-[180px] sm:w-[260px]">
                  <div className="flex flex-col gap-2 sm:gap-4">
                    <div className="flex items-center justify-between">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#6EE731] flex items-center justify-center text-white">
                        <FaChartLine className="text-sm sm:text-xl" />
                      </div>
                      <div className="flex items-center gap-1 sm:gap-1.5 border border-slate-100 px-2 py-0.5 rounded-full">
                        <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-1.5 w-1.5 sm:h-2 sm:w-2 bg-emerald-500"></span>
                        </span>
                        <span className="text-[8px] sm:text-[10px] font-bold text-emerald-600 uppercase tracking-wide">Live</span>
                      </div>
                    </div>

                    <div>
                      <p className="text-[10px] sm:text-sm font-bold text-slate-800">Current Users</p>
                      <p className="text-xl sm:text-4xl font-black text-slate-900">24,800+</p>
                    </div>

                    <div className="w-full bg-slate-100 h-2 sm:h-3 rounded-full overflow-hidden">
                      <div className="bg-[#34A853] h-full rounded-full w-[45%]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section className="mt-20 md:mt-32">
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-20 px-4">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">Expert Farming Modules</h2>
            <p className="text-slate-600 text-sm sm:text-base">Unlock the full potential of your acreage with our specialized AI tools.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 px-2 sm:px-0">
            {features.map((f, i) => (
              <div key={i} className="relative group rounded-2xl p-[1px] transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/30 via-sky-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />

                <div className="relative z-10 bg-white rounded-2xl p-8 sm:p-10 h-full shadow-md group-hover:shadow-2xl transition-all duration-300 flex flex-col">
                  <div className="absolute -top-5 left-6 sm:left-8 z-20">
                    <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl ${f.bg} flex items-center justify-center text-xl sm:text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <span className={f.color}>{f.icon}</span>
                    </div>
                  </div>

                  <div className="absolute top-6 right-6 text-slate-300">
                    <FaLock size={12} />
                  </div>

                  <div className="pt-8 flex-grow">
                    <h3 className="text-lg sm:text-xl font-extrabold text-slate-800 mb-2 tracking-tight">
                      {f.title}
                    </h3>
                    <p className="text-slate-500 text-sm sm:text-base leading-relaxed mb-6 font-medium">
                      {f.desc}
                    </p>
                  </div>

                  <div className="mt-auto">
                    <NavLink
                      to="/signin"
                      className={`inline-flex items-center gap-2 text-xs sm:text-sm font-bold ${f.color} group-hover:gap-3 transition-all`}
                    >
                      Access Module
                      <FaArrowRight size={12} />
                    </NavLink>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <NavLink
        to="/"
        className=" fixed bottom-6 right-6 sm:bottom-10 sm:right-10 flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-slate-900 text-white rounded-full shadow-2xl hover:bg-blue-600 transition-all duration-300 active:scale-95 z-50">
        <FaHome className="w-5 h-5 sm:w-6 sm:h-6" />
      </NavLink>
    </div>
  );
}