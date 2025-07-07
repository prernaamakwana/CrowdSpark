import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CreateCampaign from "./pages/CreateCampaign";
import CampaignDetail from "./pages/CampaignDetail";
import Navbar from "./components/Navbar";
import PaymentPage from './pages/paymentpage';

function App() {
  return (
    <div className="bg-primary min-h-screen text-gray-900">

      {window.location.pathname !== "/" && <Navbar />}

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create" element={<CreateCampaign />} />
        <Route path="/campaign/:id" element={<CampaignDetail />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/campaign/:id" element={<CampaignDetail />} />
        <Route path="/payment" element={<PaymentPage />} />
 
      </Routes>
    </div>
  );
}

export default App;
