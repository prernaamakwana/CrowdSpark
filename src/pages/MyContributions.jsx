import { useEffect, useState } from "react";
import axios from "axios";

export default function MyContributions() {
  const [contributions, setContributions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContributions = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/contributions/my", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });
        setContributions(res.data);
      } catch (err) {
        console.error("Error loading contributions:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchContributions();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-blue-800 mb-4">📦 Campaigns You’ve Funded</h2>
      {loading ? (
        <p>Loading your contributions...</p>
      ) : contributions.length === 0 ? (
        <p>You haven’t funded any campaigns yet.</p>
      ) : (
        <ul className="space-y-4">
          {contributions.map((c) => (
            <li key={c._id} className="bg-white border p-4 rounded shadow">
              <h3 className="text-lg font-semibold">{c.campaignId.title}</h3>
              <p>Amount: ₹{c.amount}</p>
              <p>Date: {new Date(c.createdAt).toDateString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}