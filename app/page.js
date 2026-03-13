"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Truck, LogOut, Clock, CheckCircle, XCircle, Package } from "lucide-react";

const STATUS_STYLES = {
  pending:  { bg: "#FEF9C3", color: "#854D0E", label: "Pending" },
  approved: { bg: "#DCFCE7", color: "#166534", label: "Approved" },
  rejected: { bg: "#FEE2E2", color: "#991B1B", label: "Rejected" },
  delivered:{ bg: "#DBEAFE", color: "#1E40AF", label: "Delivered" },
};

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { window.location.href = "/auth"; return; }
      setUser(user);
      const { data } = await supabase
        .from("quotes")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });
      setQuotes(data || []);
      setLoading(false);
    };
    init();
  }, []);

  const logout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  if (loading) return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#F1F5F9" }}>
      <div style={{ color: "#64748B", fontSize: 15 }}>Loading your dashboard...</div>
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: "#F1F5F9", fontFamily: "'Segoe UI', system-ui, sans-serif" }}>

      {/* Header */}
      <div style={{ background: "#0D2B4E", padding: "0 5%" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 36, height: 36, background: "#3B82C4", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Truck size={18} color="#fff" />
            </div>
            <div>
              <div style={{ fontSize: 16, fontWeight: 700, color: "#fff", letterSpacing: 1 }}>FAN<span style={{ color: "#3B82C4" }}>TAF</span></div>
              <div style={{ fontSize: 9, color: "rgba(255,255,255,0.5)", letterSpacing: 2, textTransform: "uppercase" }}>My Dashboard</div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <span style={{ color: "rgba(255,255,255,0.7)", fontSize: 13 }}>{user?.email}</span>
            <button onClick={logout} style={{ display: "flex", alignItems: "center", gap: 6, background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", color: "#fff", borderRadius: 6, padding: "7px 14px", fontSize: 13, cursor: "pointer" }}>
              <LogOut size={14} /> Logout
            </button>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "2.5rem 5%" }}>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: 16, marginBottom: "2rem" }}>
          {[
            ["Total Requests", quotes.length, <Package size={20} color="#3B82C4" />],
            ["Pending", quotes.filter(q => q.status === "pending").length, <Clock size={20} color="#D97706" />],
            ["Approved", quotes.filter(q => q.status === "approved").length, <CheckCircle size={20} color="#16A34A" />],
            ["Delivered", quotes.filter(q => q.status === "delivered").length, <Truck size={20} color="#2563EB" />],
          ].map(([label, val, icon]) => (
            <div key={label} style={{ background: "#fff", borderRadius: 10, padding: "1.25rem", border: "1px solid #E2E8F0" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>{icon}</div>
              <div style={{ fontSize: 26, fontWeight: 700, color: "#0D2B4E" }}>{val}</div>
              <div style={{ fontSize: 13, color: "#64748B", marginTop: 2 }}>{label}</div>
            </div>
          ))}
        </div>

        {/* Quote Requests */}
        <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #E2E8F0", overflow: "hidden" }}>
          <div style={{ padding: "1.25rem 1.5rem", borderBottom: "1px solid #E2E8F0", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <h2 style={{ fontSize: 16, fontWeight: 700, color: "#0D2B4E", margin: 0 }}>My Quote Requests</h2>
            <a href="/#quote" style={{ background: "#3B82C4", color: "#fff", padding: "8px 16px", borderRadius: 6, fontSize: 13, fontWeight: 600, textDecoration: "none" }}>+ New Request</a>
          </div>

          {quotes.length === 0 ? (
            <div style={{ padding: "3rem", textAlign: "center", color: "#94A3B8" }}>
              <Package size={40} style={{ margin: "0 auto 12px", display: "block", opacity: 0.4 }} />
              <p style={{ margin: 0 }}>No quote requests yet.</p>
              <a href="/#quote" style={{ color: "#3B82C4", fontSize: 14, marginTop: 8, display: "inline-block" }}>Submit your first request →</a>
            </div>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
                <thead>
                  <tr style={{ background: "#F8FAFC" }}>
                    {["Date", "Pickup", "Delivery", "Cargo", "Weight", "Status"].map((h) => (
                      <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontSize: 12, fontWeight: 600, color: "#64748B", textTransform: "uppercase", letterSpacing: 1 }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {quotes.map((q) => {
                    const s = STATUS_STYLES[q.status] || STATUS_STYLES.pending;
                    return (
                      <tr key={q.id} style={{ borderTop: "1px solid #F1F5F9" }}>
                        <td style={{ padding: "14px 16px", color: "#64748B" }}>{new Date(q.created_at).toLocaleDateString()}</td>
                        <td style={{ padding: "14px 16px", color: "#1E293B", fontWeight: 500 }}>{q.pickup}</td>
                        <td style={{ padding: "14px 16px", color: "#1E293B", fontWeight: 500 }}>{q.delivery}</td>
                        <td style={{ padding: "14px 16px", color: "#1E293B" }}>{q.cargo}</td>
                        <td style={{ padding: "14px 16px", color: "#1E293B" }}>{q.weight} kg</td>
                        <td style={{ padding: "14px 16px" }}>
                          <span style={{ background: s.bg, color: s.color, padding: "4px 10px", borderRadius: 20, fontSize: 12, fontWeight: 600 }}>{s.label}</span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}