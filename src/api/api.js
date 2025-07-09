// src/api/api.js
import axios from "./axios"; // 👈 this is now the token-enabled instance

export const fetchStats = async () => {
  const res = await axios.get("/admin/dashboard-stats");
  return res.data;
};

export const fetchCampaigns = async (search, status, page) => {
  const res = await axios.get("/admin/campaigns", {
    params: { search, status, page },
  });
  return res.data;
};

export const updateStatus = async (campaignId, status) => {
  const res = await axios.put(`/admin/campaigns/${campaignId}/status`, { status });
  return res.data;
};