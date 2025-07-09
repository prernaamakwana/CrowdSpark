import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function MyCampaigns() {
  const [campaigns, setCampaigns] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyCampaigns = async () => {
      const token = localStorage.getItem("token");
      const user = JSON.parse(localStorage.getItem("user"));

      if (!token || !user) {
        navigate("/login");
        return;
      }

      const res = await axios.get("http://localhost:5000/api/campaigns/my", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCampaigns(res.data);
    };

    fetchMyCampaigns();
  }, [navigate]);

  return (
    <div className="p-6 min-h-screen bg-white">
      <h2 className="text-2xl font-bold mb-4 text-blue-800">My Campaigns</h2>

      {campaigns.length === 0 ? (
        <p className="text-gray-600 italic">You haven’t created any campaigns yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {campaigns.map((c) => (
            <div key={c._id} className="border shadow rounded p-4 bg-gray-50">
              <h3 className="text-lg font-bold text-blue-700">{c.title}</h3>
              <p className="text-gray-700">{c.description}</p>
              <p className="text-sm text-gray-500 mt-2">
                Category: {c.category} | Status:{" "}
                <span className={`font-medium capitalize ${
                  c.status === "approved" ? "text-green-600"
                  : c.status === "rejected" ? "text-red-600"
                  : "text-yellow-600"
                }`}>
                  {c.status}
                </span>
              </p>
              <p className="text-sm mt-1">
                Goal: ₹{c.goal} | Raised: ₹{c.fundsRaised}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}