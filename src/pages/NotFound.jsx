// src/pages/NotFound.jsx
export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-6xl font-bold text-red-600 mb-4">404</h1>
      <p className="text-xl text-gray-700 mb-6">Page not found.</p>
      <a
        href="/"
        className="text-blue-600 underline hover:text-blue-800 transition"
      >
        Go back home
      </a>
    </div>
  );
}