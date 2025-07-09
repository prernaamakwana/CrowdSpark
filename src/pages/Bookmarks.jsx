import { useEffect, useState } from "react";
import axios from "axios";
import CampaignCard from "../components/CampaignCard";

export default function Bookmarks() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const bookmarkedIds = JSON.parse(localStorage.getItem("bookmarks")) || [];

    if (bookmarkedIds.length === 0) {
      setCampaigns([]);
      setLoading(false);
      return;
    }

    const fetchBookmarkedCampaigns = async () => {
      try {
        const query = bookmarkedIds.join(",");
        const res = await axios.get(
          `http://localhost:5000/api/campaigns/bookmarked?ids=${query}`
        );
        setCampaigns(res.data);
      } catch (err) {
        console.error("Failed to fetch bookmarked campaigns", err);
        setCampaigns([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBookmarkedCampaigns();
  }, []);

  return (
    <div className="p-6 min-h-screen bg-white">
      <h2 className="text-3xl font-bold text-blue-900 mb-6">📌 Saved Campaigns</h2>

      {loading ? (
        <p className="text-gray-500 italic">Loading your bookmarks...</p>
      ) : campaigns.length === 0 ? (
        <p className="text-gray-600">You haven’t bookmarked any campaigns yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {campaigns.map((c) => (
            <CampaignCard key={c._id} campaign={c} />
          ))}
        </div>
      )}
    </div>
  );
}