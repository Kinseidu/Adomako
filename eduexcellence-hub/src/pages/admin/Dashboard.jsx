import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const [summary, setSummary] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      const token = localStorage.getItem("admin_token");
      if (!token) return navigate("/admin/login");
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/admin/summary`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.status === 401) return navigate("/admin/login");
        const data = await res.json();
        setSummary(data.data);
      } catch (err) {
        console.error(err);
      }
    };
    load();
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <Button onClick={() => { localStorage.removeItem('admin_token'); navigate('/admin/login'); }}>Logout</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-card rounded">Total Donations: {summary?.donations ?? '—'}</div>
        <div className="p-4 bg-card rounded">Volunteers: {summary?.volunteers ?? '—'}</div>
        <div className="p-4 bg-card rounded">News: {summary?.news ?? '—'}</div>
      </div>
    </div>
  );
}
