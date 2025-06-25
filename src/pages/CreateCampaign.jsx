// pages/CreateCampaign.jsx
import { useState } from 'react';
import axios from 'axios';

export default function CreateCampaign() {
  const [title, setTitle] = useState('');
  const [goal, setGoal] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');

  const handleCreate = async (e) => {
    e.preventDefault();

    const campaign = {
      title,
      goal: Number(goal),
      description,
      category,
    };

   try {
    const res = await axios.post('http://localhost:5000/api/campaigns', campaign);
    alert(res.data.message || "Campaign created successfully"); // ✅ show success
    console.log("Saved campaign:", res.data.campaign);          // ✅ optional debug
    navigate('/dashboard'); // 👈 redirect to dashboard or wherever you want
  } catch (err) {
    console.error("Create Campaign Error:", err);
    alert("Failed to create campaign");
  }
};

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Create a New Campaign</h2>
      <form onSubmit={handleCreate} className="space-y-4">
        <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} className="border p-2 w-full" required />
        <input type="number" placeholder="Goal Amount" value={goal} onChange={e => setGoal(e.target.value)} className="border p-2 w-full" required />
        <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} className="border p-2 w-full" />
          <select value={category} 
        onChange={e => setCategory(e.target.value)} 
        required
          className="border p-2 w-full">
          <option value="">Select Category</option>
          <option value="Tech">Tech</option>
          <option value="Art">Art</option>
          <option value="Social">Social</option>
          </select>
        <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded">Create Campaign</button>
      </form>
    </div>
  );
}
