import { useState } from 'react';

export default function CreateCampaign() {
  const [title, setTitle] = useState('');
  const [goal, setGoal] = useState('');

  const handleCreate = (e) => {
    e.preventDefault();
    alert(`Created campaign: ${title}`);
  };

  return (
    <div className="max-w-2xl mx-auto mt-20 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-blue-900 text-center">Create Campaign</h2>
      
      <form onSubmit={handleCreate} className="space-y-4">
        <input 
          type="text" 
          placeholder="Campaign Title" 
          value={title} 
          onChange={e => setTitle(e.target.value)} 
          className="w-full border border-gray-300 p-2 rounded" 
        />
        <input 
          type="number" 
          placeholder="Goal Amount (₹)" 
          value={goal} 
          onChange={e => setGoal(e.target.value)} 
          className="w-full border border-gray-300 p-2 rounded" 
        />

       
        <div className="flex justify-center">
          <button 
            type="submit" 
            className="bg-accent px-6 py-2 rounded text-white hover:bg-blue-500 transition"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
}
