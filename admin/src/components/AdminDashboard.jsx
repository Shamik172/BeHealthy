import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const API_USERS = "http://localhost:5050/users";
const API_ASANAS = "http://localhost:5050/asanas";
const API_USER_STATS = "http://localhost:5050/users/stats/daily";

const AdminDashboard = () => {
  const [userStats, setUserStats] = useState({ total: 0, recent: [] });
  const [asanaStats, setAsanaStats] = useState({ total: 0, recent: [] });
  const [userGrowth, setUserGrowth] = useState({ labels: [], data: [] });

  useEffect(() => {
    fetch(API_USERS)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setUserStats({
            total: data.users.length,
            recent: data.users.slice(-5).reverse(),
          });
        }
      });
    fetch(API_ASANAS)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setAsanaStats({
            total: data.asanas.length,
            recent: data.asanas.slice(-5).reverse(),
          });
        }
      });
    fetch(API_USER_STATS)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setUserGrowth({
            labels: data.stats.map((s) => s._id),
            data: data.stats.map((s) => s.count),
          });
        }
      });
  }, []);

  // Calculate trend: compare last two days
  const userTrend = useMemo(() => {
    const arr = userGrowth.data;
    if (arr.length < 2) return null;
    const prev = arr[arr.length - 2];
    const curr = arr[arr.length - 1];
    if (curr > prev) return "up";
    if (curr < prev) return "down";
    return "equal";
  }, [userGrowth.data]);

  const chartData = {
    labels: userGrowth.labels,
    datasets: [
      {
        label: "User Registrations Per Day",
        data: userGrowth.data,
        backgroundColor: "rgba(99,102,241,0.8)", // Indigo-500
        borderRadius: 6,
        borderSkipped: false,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          title: (tooltipItems) => tooltipItems[0].label,
        },
        backgroundColor: "#18181b",
        titleColor: "#f472b6",
        bodyColor: "#f3f4f6",
        borderColor: "#6366f1",
        borderWidth: 2,
      },
      legend: { display: false },
      title: { display: false },
    },
    scales: {
      x: {
        title: { display: true, text: "Date", color: "#a5b4fc" },
        ticks: { color: "#a5b4fc", autoSkip: true, maxTicksLimit: 10 },
        grid: { color: "#27272a" },
      },
      y: {
        title: { display: true, text: "Users", color: "#a5b4fc" },
        beginAtZero: true,
        ticks: { color: "#a5b4fc" },
        grid: { color: "#27272a" },
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#18181b] via-[#312e81] to-[#0ea5e9] py-10 px-2">
      <div className="max-w-5xl mx-auto p-8 bg-[#232136] rounded-3xl shadow-2xl border border-[#6366f1]/30">
        <h1 className="text-4xl font-extrabold mb-10 text-pink-400 text-center tracking-wider drop-shadow-lg">
          📊 Admin Dashboard Analytics
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          <div className="bg-gradient-to-br from-indigo-500 via-blue-600 to-cyan-400 rounded-2xl p-8 shadow-xl flex flex-col items-center border border-indigo-300/40">
            <div className="text-5xl font-extrabold text-white drop-shadow-lg">{userStats.total}</div>
            <div className="text-lg text-indigo-100 mb-2 font-semibold">Total Users</div>
            <Link
              to="/admin/users"
              className="mt-2 px-4 py-2 rounded-lg bg-white/10 text-indigo-100 hover:bg-white/20 transition font-bold shadow"
            >
              Manage Users
            </Link>
          </div>
          <div className="bg-gradient-to-br from-pink-500 via-fuchsia-600 to-violet-400 rounded-2xl p-8 shadow-xl flex flex-col items-center border border-pink-300/40">
            <div className="flex items-center gap-2">
              <div className="text-5xl font-extrabold text-white drop-shadow-lg">{asanaStats.total}</div>
              {userTrend === "up" && (
                <span className="text-green-400 text-3xl" title="User registrations increased today">▲</span>
              )}
              {userTrend === "down" && (
                <span className="text-red-400 text-3xl" title="User registrations decreased today">▼</span>
              )}
              {userTrend === "equal" && (
                <span className="text-gray-400 text-3xl" title="User registrations unchanged">▬</span>
              )}
            </div>
            <div className="text-lg text-pink-100 mb-2 font-semibold">Total Asanas</div>
            <Link
              to="/admin/asanas"
              className="mt-2 px-4 py-2 rounded-lg bg-white/10 text-pink-100 hover:bg-white/20 transition font-bold shadow"
            >
              Manage Asanas
            </Link>
          </div>
        </div>

        <div className="mb-10 bg-[#18181b] rounded-2xl p-6 shadow border border-[#6366f1]/20">
          <h2 className="text-xl font-bold mb-4 text-indigo-200">Recent Users</h2>
          <ul className="space-y-2">
            {userStats.recent.length === 0 ? (
              <li className="text-gray-500">No recent users.</li>
            ) : (
              userStats.recent.map((user) => (
                <li key={user._id} className="flex items-center gap-2">
                  <span className="font-semibold text-indigo-300">{user.name}</span>
                  <span className="text-indigo-400 text-sm">&lt;{user.email}&gt;</span>
                </li>
              ))
            )}
          </ul>
        </div>

        <div className="mb-10 bg-[#18181b] rounded-2xl p-6 shadow border border-[#f472b6]/20">
          <h2 className="text-xl font-bold mb-4 text-pink-200">Recent Asanas</h2>
          <ul className="space-y-2">
            {asanaStats.recent.length === 0 ? (
              <li className="text-gray-500">No recent asanas.</li>
            ) : (
              asanaStats.recent.map((asana) => (
                <li key={asana._id} className="flex items-center gap-2">
                  <span className="font-semibold text-pink-300">{asana.name}</span>
                </li>
              ))
            )}
          </ul>
        </div>

        <div className="bg-[#18181b] rounded-2xl p-6 shadow border border-[#0ea5e9]/20">
          <h2 className="text-xl font-bold mb-4 text-cyan-200">User Growth (Daily)</h2>
          <Bar data={chartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;