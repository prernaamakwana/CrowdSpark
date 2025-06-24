export default function Dashboard() {
  const role = 'owner'; // Change to 'backer' to simulate backer dashboard

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-4xl font-bold text-center text-blue-900 mb-4">Dashboard</h2>
      {role === 'owner' ? (
        <div>
          <h3 className="text-xl font-semibold text-blue-800">My Campaigns</h3>
          <ul className="mt-3 space-y-2">
            <li className="bg-white p-3 shadow-md rounded">📢 Tech for Kids - ₹12,000 funded</li>
            <li className="bg-white p-3 shadow-md rounded">🎨 Art Revival - ₹15,000 funded</li>
          </ul>
        </div>
      ) : (
        <div>
          <h3 className="text-xl font-semibold text-blue-800">Campaigns You Funded</h3>
          <ul className="mt-3 space-y-2">
            <li className="bg-white p-3 shadow-md rounded">🌳 Save the Trees - ₹500</li>
          </ul>
        </div>
      )}
    </div>
  );
}
