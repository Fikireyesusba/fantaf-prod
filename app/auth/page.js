"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Mail, Lock, User, Truck, Eye, EyeOff } from "lucide-react";

export default function AuthPage() {
  const [mode, setMode] = useState("login"); // "login" or "signup"
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const set = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }));

  const handleSubmit = async () => {
    setError(null);
    setMessage(null);
    setLoading(true);

    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email: form.email,
          password: form.password,
          options: { data: { full_name: form.name } },
        });
        if (error) throw error;
        setMessage("Account created! Please check your email to verify your account.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: form.email,
          password: form.password,
        });
        if (error) throw error;
        window.location.href = "/dashboard";
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg,#0D2B4E 0%,#1A4A7A 100%)", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
      <div style={{ background: "#fff", borderRadius: 16, padding: "2.5rem", width: "100%", maxWidth: 420, boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}>

        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{ width: 56, height: 56, background: "#3B82C4", borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px" }}>
            <Truck size={28} color="#fff" />
          </div>
          <div style={{ fontSize: 22, fontWeight: 700, color: "#0D2B4E", letterSpacing: 1 }}>
            FAN<span style={{ color: "#3B82C4" }}>TAF</span>
          </div>
          <div style={{ fontSize: 11, color: "#94A3B8", letterSpacing: 2, textTransform: "uppercase", marginTop: 2 }}>Trading & Logistics</div>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", background: "#F1F5F9", borderRadius: 8, padding: 4, marginBottom: "1.75rem" }}>
          {["login", "signup"].map((m) => (
            <button key={m} onClick={() => { setMode(m); setError(null); setMessage(null); }}
              style={{ flex: 1, padding: "9px 0", borderRadius: 6, border: "none", cursor: "pointer", fontSize: 14, fontWeight: 600, background: mode === m ? "#fff" : "transparent", color: mode === m ? "#0D2B4E" : "#94A3B8", boxShadow: mode === m ? "0 1px 4px rgba(0,0,0,0.1)" : "none", transition: "all .2s" }}>
              {m === "login" ? "Log In" : "Sign Up"}
            </button>
          ))}
        </div>

        {/* Form */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {mode === "signup" && (
            <div style={{ position: "relative" }}>
              <User size={16} color="#94A3B8" style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)" }} />
              <input placeholder="Full Name" value={form.name} onChange={set("name")}
                style={{ width: "100%", border: "1.5px solid #CBD5E1", borderRadius: 8, padding: "11px 14px 11px 38px", fontSize: 14, outline: "none", fontFamily: "inherit", boxSizing: "border-box" }} />
            </div>
          )}
          <div style={{ position: "relative" }}>
            <Mail size={16} color="#94A3B8" style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)" }} />
            <input type="email" placeholder="Email address" value={form.email} onChange={set("email")}
              style={{ width: "100%", border: "1.5px solid #CBD5E1", borderRadius: 8, padding: "11px 14px 11px 38px", fontSize: 14, outline: "none", fontFamily: "inherit", boxSizing: "border-box" }} />
          </div>
          <div style={{ position: "relative" }}>
            <Lock size={16} color="#94A3B8" style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)" }} />
            <input type={showPass ? "text" : "password"} placeholder="Password" value={form.password} onChange={set("password")}
              style={{ width: "100%", border: "1.5px solid #CBD5E1", borderRadius: 8, padding: "11px 40px 11px 38px", fontSize: 14, outline: "none", fontFamily: "inherit", boxSizing: "border-box" }} />
            <button onClick={() => setShowPass(!showPass)}
              style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#94A3B8" }}>
              {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        {error && (
          <div style={{ background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: 6, padding: "10px 14px", fontSize: 13, color: "#DC2626", marginTop: 14 }}>
            {error}
          </div>
        )}

        {message && (
          <div style={{ background: "#ECFDF5", border: "1px solid #A7F3D0", borderRadius: 6, padding: "10px 14px", fontSize: 13, color: "#065F46", marginTop: 14 }}>
            {message}
          </div>
        )}

        <button onClick={handleSubmit} disabled={loading}
          style={{ width: "100%", background: loading ? "#94A3B8" : "#3B82C4", color: "#fff", border: "none", borderRadius: 8, padding: "13px", fontSize: 15, fontWeight: 600, cursor: loading ? "not-allowed" : "pointer", marginTop: "1.25rem" }}>
          {loading ? "Please wait..." : mode === "login" ? "Log In" : "Create Account"}
        </button>

        <p style={{ textAlign: "center", fontSize: 13, color: "#94A3B8", marginTop: "1.25rem" }}>
          <a href="/" style={{ color: "#3B82C4", textDecoration: "none" }}>← Back to website</a>
        </p>
      </div>
    </div>
  );
}
