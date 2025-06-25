import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export default function Explore() {
  const [campaigns, setCampaigns] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [sort, setSort] = useState('Latest');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/campaigns');
        setCampaigns(res.data);
      } catch (err) {
        console.error('Failed to fetch campaigns', err);
      }
    };
    fetchCampaigns();
  }, []);

  const filteredCampaigns = campaigns
    .filter((c) =>
      c.title.toLowerCase().includes(search.toLowerCase()) &&
      (category === 'All' || c.category === category)
    )
    .sort((a, b) => {
      if (sort === 'Goal') return b.goal - a.goal;
      if (sort === 'Funded') return (b.funded || 0) - (a.funded || 0);
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-center text-blue-900 mb-9">Explore Campaigns</h2>

      <div className="flex flex-col md:flex-row items-center justify-between mb-9 gap-4">
        <input
          type="text"
          placeholder="Search campaigns..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded w-full md:w-1/3"
        />

        <select
          className="border p-2 rounded"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="All">All Categories</option>
          <option value="Tech">Tech</option>
          <option value="Art">Art</option>
          <option value="Social">Social</option>
        </select>

        <select
          className="border p-2 rounded"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="Latest">Latest</option>
          <option value="Funded">Most Funded</option>
          <option value="Goal">Highest Goal</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCampaigns.length > 0 ? (
          filteredCampaigns.map((c) => (
            <div key={c._id} className="bg-white p-4 shadow rounded">
              <h3 className="text-lg font-bold text-blue-900">{c.title}</h3>
              <p className="mt-1">{c.description}</p>
              <p className="text-sm text-gray-500 mt-2">Target: ₹{c.goal}</p>

              <button
                onClick={() => navigate(`/campaign/${c._id}`)}
                className="mt-3 text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
              >
                View Details
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600 col-span-full">
            No campaigns found matching your search.
          </p>
        )}
      </div>
    </div>
  );
}
