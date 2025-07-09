import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchCampaigns, fetchStats, updateStatus } from "../api/api";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [campaigns, setCampaigns] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState(null);
  const [statsLoading, setStatsLoading] = useState(true);

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "admin") navigate("/not-authorized");
  }, []);

  useEffect(() => {
    const getCampaigns = async () => {
      setLoading(true);
      const res = await fetchCampaigns(searchTerm, filterStatus, currentPage);
      setCampaigns(res.data || []);
      setTotalPages(res.totalPages || 1);
      setLoading(false);
    };
    getCampaigns();
  }, [searchTerm, filterStatus, currentPage]);

  useEffect(() => {
    const getStats = async () => {
      setStatsLoading(true);
      const statsData = await fetchStats();
      setStats(statsData);
      setStatsLoading(false);
    };
    getStats();
  }, []);

  const currentCampaigns = campaigns;

  return (
    <div className="p-4 max-w-screen-xl mx-auto">
      {/* Search Input */}
      <input
        type="text"
        placeholder="🔍 Search campaigns"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="px-4 py-2 border rounded w-full max-w-md mb-4 shadow"
      />

      {/* Stats Panel */}
      {statsLoading ? (
        <p className="italic text-gray-500 mb-6">Loading stats...</p>
      ) : stats ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          {[
            ["Total Campaigns", stats.totalCampaigns, "from-indigo-500 to-purple-500"],
            ["Pending", stats.pendingCampaigns, "from-yellow-500 to-orange-400"],
            ["Approved", stats.approvedCampaigns, "from-green-500 to-teal-400"],
            ["Rejected", stats.rejectedCampaigns, "from-red-500 to-pink-400"],
            ["Total Users", stats.totalUsers, "from-blue-400 to-purple-600"],
            ["Contributions", stats.totalContributions ?? "N/A", "from-purple-600 to-pink-500"],
          ].map(([label, value, gradient]) => (
            <div
              key={label}
              className={`p-4 rounded shadow text-white bg-gradient-to-r ${gradient} flex items-center justify-between`}
            >
              <div>
                <h4 className="text-sm font-medium">{label}</h4>
                <p className="text-xl font-bold">{value}</p>
              </div>
              <span className="text-xl opacity-30">📊</span>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-red-500 italic mb-6">Stats unavailable.</p>
      )}

      {/* Filter Buttons */}
      <div className="mb-4 flex flex-wrap gap-2">
        {["all", "pending", "approved", "rejected"].map((status) => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className={`px-4 py-2 rounded ${
              filterStatus === status ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
            }`}
          >
            {status.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Campaign Table */}
      {loading ? (
        <p className="text-gray-500 italic">Loading campaigns...</p>
      ) : currentCampaigns.length === 0 ? (
        <p className="text-gray-600">No matching campaigns found.</p>
      ) : (
        <>
          <div className="overflow-x-auto shadow rounded">
            <table className="min-w-full table-auto bg-white border border-gray-200">
              <thead className="bg-blue-100 text-left">
                <tr>
                  <th className="px-4 py-2 border">Title</th>
                  <th className="px-4 py-2 border">Category</th>
                  <th className="px-4 py-2 border">Goal ₹</th>
                  <th className="px-4 py-2 border">Creator</th>
                  <th className="px-4 py-2 border">Status</th>
                  <th className="px-4 py-2 border">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentCampaigns.map((camp) => (
                  <tr key={camp._id} className="hover:bg-blue-50 transition">
                    <td className="px-4 py-2 border font-semibold">
                      {camp.title || <span className="italic text-gray-400">Untitled</span>}
                    </td>
                    <td className="px-4 py-2 border capitalize">
                      {camp.category || <span className="italic text-gray-400">None</span>}
                    </td>
                    <td className="px-4 py-2 border text-green-600 font-semibold">
                      ₹{typeof camp.goal === "number" ? camp.goal.toLocaleString() : "0"}
                    </td>
                    <td className="px-4 py-2 border">{camp.creator?.email || "N/A"}</td>
                    <td className="px-4 py-2 border">
                      <span
                        className={`px-2 py-1 rounded text-white text-xs ${
                          camp.status === "approved"
                            ? "bg-green-600"
                            : camp.status === "rejected"
                            ? "bg-red-600"
                            : "bg-yellow-500"
                        }`}
                      >
                        {camp.status}
                      </span>
                    </td>
                    <td className="px-4 py-2 border">
                      {camp.status === "pending" ? (
                        <div className="space-x-2">
                          <button
                            onClick={() => updateStatus(camp._id, "approved")}
                            className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => updateStatus(camp._id, "rejected")}
                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                          >
                            Reject
                          </button>
                        </div>
                      ) : (
                        <span className="italic text-gray-400">No Action</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-6 flex justify-center gap-2">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-3 py-1 rounded ${
                    currentPage === i + 1 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AdminDashboard;