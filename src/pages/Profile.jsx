import { useEffect, useState } from "react";
import axios from "axios";
import CampaignCard from "../components/CampaignCard";
import AvatarHeader from "../components/AvatarHeader";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [campaigns, setCampaigns] = useState([]);
  const [totalFunded, setTotalFunded] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/users/me", {
          withCredentials: true,
        });
        setUser(res.data);
      } catch (err) {
        console.error("User info fetch error:", err);
      }
    };

    const fetchMyCampaigns = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/campaigns/my", {
          withCredentials: true,
        });
        setCampaigns(res.data);
      } catch (err) {
        console.error("Campaign fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    const fetchContributions = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/contributions/my", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const total = res.data.reduce((sum, c) => sum + c.amount, 0);
        setTotalFunded(total);
      } catch (err) {
        console.error("Contribution fetch error:", err);
      }
    };

    fetchUser();
    fetchMyCampaigns();
    fetchContributions();
  }, []);

  return (
    <div className="p-6 min-h-screen bg-white">
      {user && (
        <AvatarHeader user={user} totalFunded={totalFunded} />
      )}

      {/* 🏅 Badge & Edit */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-semibold">
          {totalFunded >= 1000
            ? "🌟 Impact Hero"
            : totalFunded >= 500
            ? "Supporter"
            : "New Contributor"}
        </span>

        <button
          onClick={() => navigate("/edit-profile")}
          className="text-blue-600 border px-3 py-1 rounded hover:bg-blue-50 transition"
        >
          ✏️ Edit Profile
        </button>
      </div>

      {/* 📊 Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded shadow text-center">
          <h4 className="text-xl font-bold text-blue-800">{campaigns.length}</h4>
          <p className="text-sm text-gray-500">Campaigns Created</p>
        </div>
        <div className="bg-white p-4 rounded shadow text-center">
          <h4 className="text-xl font-bold text-green-700">₹{totalFunded}</h4>
          <p className="text-sm text-gray-500">Funds Contributed</p>
        </div>
        <div className="bg-white p-4 rounded shadow text-center">
          <h4 className="text-xl font-bold">⭐</h4>
          <p className="text-sm text-gray-500">Badge Level</p>
        </div>
      </div>

      {/* 👤 Profile Info */}
      <h2 className="text-3xl font-bold text-blue-900 mb-4">Your Profile</h2>
      {user ? (
        <div className="mb-6 bg-gray-50 border rounded-lg p-4">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Role:</strong> {user.role}</p>
          <p><strong>Joined:</strong> {new Date(user.createdAt).toDateString()}</p>
        </div>
      ) : (
        <p className="text-gray-500 mb-6">Fetching your profile...</p>
      )}

      {/* 📦 User Campaigns */}
      <h3 className="text-2xl font-semibold text-blue-800 mb-3">Your Campaigns</h3>
      {loading ? (
        <p className="text-gray-500 italic">Loading your campaigns...</p>
      ) : campaigns.length === 0 ? (
        <p className="text-gray-600">You haven’t created any campaigns yet.</p>
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