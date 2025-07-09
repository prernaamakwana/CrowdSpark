import { useState, useEffect } from "react";
import axios from "../api/axios"; // ✅ using your configured instance
import CampaignCard from "../components/CampaignCard";
import dayjs from "dayjs";

export default function Explore() {
  const [campaigns, setCampaigns] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("Latest");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const delayFetch = setTimeout(() => fetchCampaigns(), 300); // debounce search
    return () => clearTimeout(delayFetch);
  }, [search, category, sort]);

  const fetchCampaigns = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/campaigns");
      setCampaigns(res.data);
    } catch (err) {
      console.error("Failed to fetch campaigns", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this campaign permanently?")) return;
    try {
      await axios.delete(`/campaigns/${id}`);
      setCampaigns(campaigns.filter((c) => c._id !== id));
    } catch (err) {
      console.error("Delete failed:", err.response?.data || err.message);
      alert("Error deleting campaign");
    }
  };
const filteredCampaigns = campaigns
  .filter(
    (c) =>
      String(c.title || "").toLowerCase().includes(search.toLowerCase()) &&
      (category === "All" || c.category === category)
  )
  .sort((a, b) => {
    if (sort === "Goal") return b.goal - a.goal;
    if (sort === "Funded") return (b.funded || 0) - (a.funded || 0);
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  const topCampaigns = [...campaigns]
    .filter((c) => c.funded && c.goal)
    .sort((a, b) => (b.funded || 0) - (a.funded || 0))
    .slice(0, 3);

  const endingSoon = [...campaigns]
    .filter((c) => c.endDate)
    .filter((c) => {
      const daysLeft = dayjs(c.endDate).diff(dayjs(), "day");
      return daysLeft >= 0 && daysLeft <= 5;
    })
    .slice(0, 3);

  return (
    <div className="p-6 bg-primary min-h-screen">
      <h2 className="text-3xl font-bold text-center text-blue-900 mb-9">🌟 Explore Campaigns</h2>

      <div className="flex flex-col md:flex-row items-center justify-between mb-9 gap-4">
        <input
          type="text"
          placeholder="Search campaigns..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded w-full md:w-1/3 shadow-sm"
        />

        <select
          className="border p-2 rounded shadow-sm"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="All">All Categories</option>
          <option value="Tech">Tech</option>
          <option value="Art">Art</option>
          <option value="Social">Social</option>
        </select>

        <select
          className="border p-2 rounded shadow-sm"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="Latest">Latest</option>
          <option value="Funded">Most Funded</option>
          <option value="Goal">Highest Goal</option>
        </select>
      </div>

      {loading ? (
        <p className="text-center italic text-gray-600 mb-12">Loading campaigns...</p>
      ) : (
        <>
          {endingSoon.length > 0 && (
            <>
              <h3 className="text-xl font-semibold text-red-600 mb-3">⏳ Ending Soon – Donate Fast!</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                {endingSoon.map((c) => (
                  <CampaignCard key={c._id} campaign={c} onDelete={handleDelete} />
                ))}
              </div>
            </>
          )}

          {topCampaigns.length > 0 && (
            <>
              <h3 className="text-xl font-semibold text-green-700 mb-3">🏆 Top Funded Campaigns</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                {topCampaigns.map((c) => (
                  <CampaignCard key={c._id} campaign={c} onDelete={handleDelete} />
                ))}
              </div>
            </>
          )}

          <h3 className="text-xl font-semibold text-blue-800 mb-3">All Campaigns</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCampaigns.length > 0 ? (
              filteredCampaigns.map((c) => (
                <CampaignCard key={c._id} campaign={c} onDelete={handleDelete} />
              ))
            ) : (
              <p className="text-center text-gray-500 col-span-full">No matching campaigns found.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
}