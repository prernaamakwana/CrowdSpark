import { Link } from 'react-router-dom';

export default function CampaignCard({ campaign }) {
  const progress = (campaign.funded / campaign.goal) * 100;

  return (
    <div className="bg-white p-4 rounded-2xl shadow-lg">
      <h2 className="text-xl font-semibold text-blue-900">{campaign.title}</h2>
      <div className="w-full bg-gray-200 h-3 rounded mt-2 mb-2">
        <div className="bg-accent h-3 rounded" style={{ width: `${progress}%` }}></div>
      </div>
      <p>₹{campaign.funded} raised of ₹{campaign.goal}</p>
      <Link to={`/campaign/${campaign.id}`} className="mt-3 inline-block text-accent underline">View Campaign</Link>
    </div>
  );
}
