import { useState } from 'react';
import CampaignCard from '../components/CampaignCard';

export default function Explore() {
  const allCampaigns = [
    {
      id: 1,
      title: "Tech for Kids",
      goal: 50000,
      funded: 20000,
      category: "Tech",
    },
    {
      id: 2,
      title: "Art Revival",
      goal: 30000,
      funded: 15000,
      category: "Art",
    },
    {
      id: 3,
      title: "Clean Water for Villages",
      goal: 40000,
      funded: 12000,
      category: "Social",
    },
  ];

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [sort, setSort] = useState('Latest');

  const filteredCampaigns = allCampaigns
    .filter((c) =>
      c.title.toLowerCase().includes(search.toLowerCase()) &&
      (category === 'All' || c.category === category)
    )
    .sort((a, b) => {
      if (sort === 'Goal') return b.goal - a.goal;
      if (sort === 'Funded') return b.funded - a.funded;
      return b.id - a.id; // mock 'latest'
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
          filteredCampaigns.map((campaign) => (
            <CampaignCard key={campaign.id} campaign={campaign} />
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
