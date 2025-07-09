import CountUp from "react-countup";

export default function AvatarHeader({ user, totalFunded }) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between mb-6 bg-gray-50 p-4 rounded-lg shadow">
      {/* 🖼️ Avatar */}
      <div className="flex items-center gap-4">
        <img
          src={`https://api.dicebear.com/8.x/initials/svg?seed=${user.username}`}
          alt="avatar"
          className="w-12 h-12 rounded-full"
        />
        <div>
          <h2 className="text-xl font-bold text-blue-900">Welcome, {user.username} 👋</h2>
          <p className="text-sm text-gray-500">Role: {user.role}</p>
        </div>
      </div>

      {/* 💸 Funding Streak */}
      <div className="text-center sm:text-right mt-4 sm:mt-0">
        <h3 className="text-lg font-semibold text-green-700">
          <CountUp end={totalFunded} duration={1.5} prefix="₹" />
        </h3>
        <p className="text-xs text-gray-600">Total Supported</p>
      </div>
    </div>
  );
}