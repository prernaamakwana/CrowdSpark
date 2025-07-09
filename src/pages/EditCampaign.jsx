import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export default function EditCampaign() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");

    axios
      .get(`http://localhost:5000/api/campaigns/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const c = res.data;
        setForm({
          title: c.title,
          description: c.description,
          goal: c.goal,
          category: c.category,
          image: c.image,
          deadline: c.deadline?.slice(0, 10), // format date input
          tags: c.tags?.join(", "),
          isPublic: c.isPublic,
        });
      })
      .catch(() => {
        toast.error("Failed to fetch campaign");
        navigate("/dashboard");
      });
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const payload = {
      ...form,
      tags: form.tags ? form.tags.split(",").map((tag) => tag.trim()) : [],
    };

    try {
      await axios.put(`http://localhost:5000/api/campaigns/${id}`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Campaign updated!");
      navigate(`/campaign/${id}`);
    } catch (err) {
      toast.error("Update failed");
    }
  };

  if (!form) return <div className="p-6 text-blue-800">Loading campaign data...</div>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded mt-6">
      <h2 className="text-2xl font-bold text-blue-900 mb-4">Edit Campaign</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          required
          placeholder="Campaign Title"
          className="w-full border px-4 py-2 rounded"
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          required
          placeholder="Campaign Description"
          className="w-full border px-4 py-2 rounded"
        />
        <input
          type="number"
          name="goal"
          value={form.goal}
          onChange={handleChange}
          required
          placeholder="Goal Amount (₹)"
          className="w-full border px-4 py-2 rounded"
        />
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          required
          className="w-full border px-4 py-2 rounded"
        >
          <option value="">Select Category</option>
          <option value="Tech">Tech</option>
          <option value="Art">Art</option>
          <option value="Social">Social</option>
        </select>
        <input
          type="text"
          name="tags"
          value={form.tags}
          onChange={handleChange}
          placeholder="Comma-separated tags (e.g. AI, Sustainability)"
          className="w-full border px-4 py-2 rounded"
        />
        <input
          type="text"
          name="image"
          value={form.image}
          onChange={handleChange}
          placeholder="Image URL"
          className="w-full border px-4 py-2 rounded"
        />
        <input
          type="date"
          name="deadline"
          value={form.deadline}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
        />
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="isPublic"
            checked={form.isPublic}
            onChange={handleChange}
          />
          <span>Publicly Visible</span>
        </label>
        <button
          type="submit"
          className="bg-blue-700 text-white px-6 py-2 rounded hover:bg-blue-800"
        >
          Update Campaign
        </button>
      </form>
    </div>
  );
}