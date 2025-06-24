import { useParams } from 'react-router-dom';

export default function CampaignDetail() {
  const { id } = useParams();

  // Mock data - replace with API call
  const campaign = {
    id,
    title: "Save the Rainforest",
    goal: 50000,
    funded: 20000,
    description: "A campaign to protect the Amazon rainforest.",
    owner: "Green Earth Org",
  };

  const progress = (campaign.funded / campaign.goal) * 100;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white mt-10 rounded-xl shadow-md">
      <h2 className="text-3xl font-bold text-blue-900">{campaign.title}</h2>
      <p className="text-gray-700 mt-2">{campaign.description}</p>
      <div className="w-full bg-gray-200 h-3 rounded my-4">
        <div className="bg-accent h-3 rounded" style={{ width: `${progress}%` }}></div>
      </div>
      <p className="font-semibold">₹{campaign.funded} raised of ₹{campaign.goal}</p>
      <p className="text-sm text-gray-500 mt-2">Created by: {campaign.owner}</p>
      <button className="mt-6 bg-accent p-2 text-white rounded">Back This Campaign</button>
    </div>
  );
}
