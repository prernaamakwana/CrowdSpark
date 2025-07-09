import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import dayjs from 'dayjs';

export default function CampaignCard({ campaign, onDelete }) {
  const navigate = useNavigate();
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("bookmarks")) || [];
    setBookmarked(stored.includes(campaign._id));
  }, [campaign._id]);

  const toggleBookmark = () => {
    const stored = JSON.parse(localStorage.getItem("bookmarks")) || [];
    let updated = [];

    if (stored.includes(campaign._id)) {
      updated = stored.filter((id) => id !== campaign._id);
    } else {
      updated = [...stored, campaign._id];
    }

    localStorage.setItem("bookmarks", JSON.stringify(updated));
    setBookmarked(!bookmarked);
  };

  const progress = campaign.goal
    ? Math.min((campaign.funded / campaign.goal) * 100, 100)
    : 0;

  const daysLeft =
    campaign.endDate != null
      ? dayjs(campaign.endDate).diff(dayjs(), 'day')
      : null;

  return (
    <div className="bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 relative">

      {/* 📌 Bookmark Button */}
      <button
        onClick={toggleBookmark}
        className={`absolute top-4 right-4 text-2xl transition ${
          bookmarked ? "text-yellow-500 hover:text-yellow-400" : "text-gray-300 hover:text-gray-500"
        }`}
        title={bookmarked ? "Remove Bookmark" : "Save Bookmark"}
      >
        {bookmarked ? "★" : "☆"}
      </button>

      <h2 className="text-2xl font-bold text-blue-800 mb-1">{campaign.title}</h2>

      {campaign.category && (
        <span className="inline-block text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full mb-3">
          {campaign.category}
        </span>
      )}

      {campaign.description && (
        <p className="text-gray-700 text-sm mb-4">{campaign.description}</p>
      )}

      <div className="w-full bg-gray-200 h-3 rounded-full mb-2">
        <div
          className="bg-green-500 h-3 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      <p className="text-sm text-gray-600">
        <span className="font-semibold text-green-700">
          ₹{campaign.funded || 0}
        </span>{' '}
        raised of ₹{campaign.goal}
      </p>

      {daysLeft != null && (
        <p
          className={`text-sm ${
            daysLeft > 0
              ? daysLeft <= 5
                ? 'text-red-600 font-semibold'
                : 'text-gray-500'
              : 'text-gray-400'
          } mb-1`}
        >
          {daysLeft > 0
            ? `${daysLeft} day${daysLeft !== 1 ? 's' : ''} left`
            : '⏱️ Campaign ended'}
        </p>
      )}

      {campaign.createdAt && (
        <p className="text-xs text-gray-400 mb-4">
          Created on {new Date(campaign.createdAt).toLocaleDateString()}
        </p>
      )}

      <div className="flex flex-wrap gap-3">
        <Link
          to={`/campaign/${campaign._id}`}
          className="bg-blue-100 text-blue-800 text-sm px-4 py-2 rounded-full shadow hover:bg-blue-200 transition"
        >
          📄 View
        </Link>

        <button
          onClick={() =>
            navigate('/payment', {
              state: { amount: campaign.goal, title: campaign.title },
            })
          }
          className="bg-green-600 text-white text-sm px-4 py-2 rounded-full shadow hover:bg-green-700 transition"
        >
          Pay
        </button>

        {onDelete && (
          <button
            onClick={() => onDelete(campaign._id)}
            className="bg-red-100 text-red-700 text-sm px-4 py-2 rounded-full shadow hover:bg-red-200 transition"
          >
            🗑️ Delete
          </button>
        )}
      </div>
    </div>
  );
}