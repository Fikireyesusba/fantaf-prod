"use client";

import { useState } from "react";
import {
  Truck, Package, HardHat, Phone, Mail, MapPin, Clock,
  FileText, Send, CheckCircle, Navigation, ChevronRight,
} from "lucide-react";

const NAV_LINKS = ["Services", "Quote", "Contact"];

const SERVICES = [
  {
    icon: <Truck size={24} color="#3B82C4" />,
    title: "Road Freight Transport",
    desc: "Long-haul and short-distance road freight across all Ethiopian regions. We handle oversized and heavy loads for construction projects of all scales.",
    tag: "Core Service",
  },
  {
    icon: <Package size={24} color="#3B82C4" />,
    title: "Construction Materials Supply",
    desc: "We supply and deliver key construction materials including cement, steel rebar, sand, gravel, and building aggregates direct to your site.",
    tag: "Materials",
  },
  {
    icon: <HardHat size={24} color="#3B82C4" />,
    title: "Project Site Logistics",
    desc: "End-to-end logistics coordination for active construction sites — scheduling, route planning, and on-site delivery management to keep your project on track.",
    tag: "Full Service",
  },
];

const CARGO_TYPES = [
  "Cement bags", "Steel rebar / metal", "Sand & gravel",
  "Bricks & blocks", "Heavy machinery / equipment",
  "Timber & wood", "Mixed construction materials", "Other",
];

const CONTACT_ITEMS = [
  { icon: <Phone size={20} />, label: "Phone", value: "+251 952 974 980" },
  { icon: <Mail size={20} />, label: "Email", value: "fikireyesusb@gmail.com" },
  { icon: <MapPin size={20} />, label: "Operating Region", value: "Ethiopia — Nationwide Road Freight" },
  { icon: <Clock size={20} />, label: "Business Hours", value: "Mon – Sat, 8:00 AM – 6:00 PM" },
];

const SOCIAL_LINKS = [
  {
    name: "WhatsApp",
    url: "https://wa.me/48780517696",
    color: "#25D366",
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    ),
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/fikireyesus_bancha",
    color: "#E1306C",
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    ),
  },
  {
    name: "Facebook",
    url: "https://www.facebook.com/share/1CWV2fQR5Z/?mibextid=wwXIfr",
    color: "#1877F2",
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
  },
];

const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

// Logo Component
const Logo = ({ size = "md" }) => {
  const large = size === "lg";
  return (
    <div style={{ display: "flex", alignItems: "center", gap: large ? 14 : 10 }}>
      <div style={{ width: large ? 52 : 38, height: large ? 52 : 38, background: "#3B82C4", borderRadius: large ? 12 : 8, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <Truck size={large ? 28 : 20} color="#fff" />
      </div>
      <div>
        <div style={{ fontSize: large ? 26 : 18, fontWeight: 700, color: "#fff", lineHeight: 1, letterSpacing: 1 }}>
          FAN<span style={{ color: "#3B82C4" }}>TAF</span>
        </div>
        <div style={{ fontSize: large ? 10 : 8, color: "rgba(255,255,255,0.6)", letterSpacing: large ? 2.5 : 2, textTransform: "uppercase", marginTop: 2 }}>
          Trading & Logistics
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  const [form, setForm] = useState({
    name: "", phone: "", pickup: "", delivery: "",
    weight: "", cargo: "", notes: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const set = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }));

  const submit = async () => {
    const { name, phone, pickup, delivery, weight, cargo } = form;
    if (!name || !phone || !pickup || !delivery || !weight || !cargo) {
      setError(true); return;
    }
    setError(false);
    setLoading(true);
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
        setForm({ name: "", phone: "", pickup: "", delivery: "", weight: "", cargo: "", notes: "" });
      } else {
        alert("Something went wrong. Please try again or call us directly.");
      }
    } catch {
      alert("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ fontFamily: "'Segoe UI', system-ui, sans-serif", color: "#1E293B", background: "#fff", minHeight: "100vh" }}>

      <style>{`
        .form-box { padding: 2.5rem; }
        .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        .form-full { grid-column: 1 / -1; }
        .social-btn:hover { opacity: 0.85; transform: translateY(-2px); }
        @media (max-width: 640px) {
          .form-box { padding: 1.25rem; }
          .form-grid { grid-template-columns: 1fr; }
          .form-full { grid-column: 1; }
        }
      `}</style>

      {/* NAV */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: "#0D2B4E", padding: "0 5%" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Logo size="sm" />
          <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
            {NAV_LINKS.map((l) => (
              <button key={l} onClick={() => scrollTo(l.toLowerCase())}
                style={{ background: "none", border: "none", color: "rgba(255,255,255,0.8)", fontSize: 14, fontWeight: 500, cursor: "pointer" }}>
                {l}
              </button>
            ))}
            <button onClick={() => scrollTo("quote")}
              style={{ background: "#3B82C4", color: "#fff", border: "none", borderRadius: 6, padding: "9px 18px", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
              Request Freight
            </button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section id="hero" style={{ minHeight: "100vh", background: "linear-gradient(135deg,#0D2B4E 0%,#1A4A7A 60%,#1E3A5F 100%)", display: "flex", alignItems: "center", padding: "0 5%", paddingTop: 64 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 20, padding: "6px 16px", fontSize: 13, color: "rgba(255,255,255,0.85)", marginBottom: "1.5rem" }}>
            <MapPin size={14} color="rgba(255,255,255,0.85)" />
            <span>Operating across Ethiopia</span>
          </div>
          <h1 style={{ fontSize: "clamp(2rem,5vw,3.4rem)", fontWeight: 700, color: "#fff", lineHeight: 1.2, maxWidth: 680, marginBottom: "1.25rem" }}>
            Construction Logistics &amp;{" "}
            <span style={{ color: "#3B82C4" }}>Road Freight</span>{" "}
            You Can Rely On
          </h1>
          <p style={{ fontSize: "1.1rem", color: "rgba(255,255,255,0.72)", maxWidth: 520, lineHeight: 1.7, marginBottom: "2.5rem" }}>
            FANTAF Trading & Logistics delivers construction materials and heavy cargo to your project sites across Ethiopia — on time, every time.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <button onClick={() => scrollTo("quote")}
              style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#3B82C4", color: "#fff", padding: "14px 28px", borderRadius: 6, fontSize: 15, fontWeight: 600, border: "none", cursor: "pointer" }}>
              <FileText size={16} /> Get a Quote
            </button>
            <button onClick={() => scrollTo("services")}
              style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "transparent", color: "#fff", padding: "14px 28px", borderRadius: 6, fontSize: 15, fontWeight: 600, border: "2px solid rgba(255,255,255,0.35)", cursor: "pointer" }}>
              Our Services <ChevronRight size={16} />
            </button>
          </div>
          <div style={{ display: "flex", gap: "2.5rem", marginTop: "3.5rem", paddingTop: "2.5rem", borderTop: "1px solid rgba(255,255,255,0.12)", flexWrap: "wrap" }}>
            {[["100%", "Local coverage"], ["24/7", "Support available"], ["ETH", "Nationwide routes"]].map(([n, l]) => (
              <div key={l}>
                <div style={{ fontSize: "1.8rem", fontWeight: 700, color: "#fff" }}>{n}</div>
                <div style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", marginTop: 2 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" style={{ padding: "90px 5%", background: "#F1F5F9" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#3B82C4", letterSpacing: 2, textTransform: "uppercase", marginBottom: ".75rem" }}>What We Offer</div>
          <h2 style={{ fontSize: "clamp(1.6rem,3vw,2.2rem)", fontWeight: 700, color: "#0D2B4E", marginBottom: "1rem" }}>Specialized Logistics for Construction</h2>
          <p style={{ fontSize: "1rem", color: "#64748B", maxWidth: 560, lineHeight: 1.7 }}>From heavy machinery to bulk materials, we move what your project needs — reliably and safely.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 24, marginTop: "3rem" }}>
            {SERVICES.map((s) => (
              <div key={s.title} style={{ background: "#fff", border: "1px solid #CBD5E1", borderRadius: 10, padding: "2rem", borderTop: "3px solid #3B82C4" }}>
                <div style={{ width: 52, height: 52, borderRadius: 10, background: "rgba(37,99,168,0.08)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.25rem" }}>
                  {s.icon}
                </div>
                <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#0D2B4E", marginBottom: ".6rem" }}>{s.title}</h3>
                <p style={{ fontSize: ".9rem", color: "#64748B", lineHeight: 1.7 }}>{s.desc}</p>
                <span style={{ display: "inline-block", background: "rgba(37,99,168,0.08)", color: "#1A4A7A", fontSize: 12, fontWeight: 600, padding: "3px 10px", borderRadius: 20, marginTop: "1rem" }}>{s.tag}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* QUOTE FORM */}
      <section id="quote" style={{ padding: "90px 5%", background: "#fff" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#3B82C4", letterSpacing: 2, textTransform: "uppercase", marginBottom: ".75rem" }}>Request a Shipment</div>
          <h2 style={{ fontSize: "clamp(1.6rem,3vw,2.2rem)", fontWeight: 700, color: "#0D2B4E", marginBottom: "1rem" }}>Get an Instant Quote</h2>
          <p style={{ fontSize: "1rem", color: "#64748B", maxWidth: 560, lineHeight: 1.7 }}>Fill in your shipment details and our team will reach out with a competitive quote within 24 hours.</p>
          <div className="form-box" style={{ background: "#fff", border: "1px solid #CBD5E1", borderRadius: 12, marginTop: "2.5rem", maxWidth: 780 }}>
            <div className="form-grid">
              {[
                ["name", "Full Name", "text", "Abebe Kebede"],
                ["phone", "Phone Number", "tel", "+251 9XX XXX XXX"],
                ["pickup", "Pickup City / Location", "text", "e.g. Addis Ababa"],
                ["delivery", "Delivery City / Location", "text", "e.g. Hawassa"],
                ["weight", "Total Weight (kg)", "number", "e.g. 5000"],
              ].map(([k, label, type, ph]) => (
                <div key={k} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <label style={{ fontSize: 13, fontWeight: 600, color: "#0D2B4E" }}>{label}</label>
                  <input type={type} placeholder={ph} value={form[k]} onChange={set(k)}
                    style={{ border: `1.5px solid ${error && !form[k] ? "#EF4444" : "#CBD5E1"}`, borderRadius: 6, padding: "10px 14px", fontSize: 14, outline: "none", fontFamily: "inherit" }} />
                </div>
              ))}
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <label style={{ fontSize: 13, fontWeight: 600, color: "#0D2B4E" }}>Cargo Type</label>
                <select value={form.cargo} onChange={set("cargo")}
                  style={{ border: `1.5px solid ${error && !form.cargo ? "#EF4444" : "#CBD5E1"}`, borderRadius: 6, padding: "10px 14px", fontSize: 14, outline: "none", fontFamily: "inherit", background: "#fff" }}>
                  <option value="">— Select cargo type —</option>
                  {CARGO_TYPES.map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div className="form-full" style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <label style={{ fontSize: 13, fontWeight: 600, color: "#0D2B4E" }}>Additional Notes</label>
                <textarea placeholder="Any special requirements, project details, or urgent delivery notes…"
                  value={form.notes} onChange={set("notes")} rows={4}
                  style={{ border: "1.5px solid #CBD5E1", borderRadius: 6, padding: "10px 14px", fontSize: 14, outline: "none", fontFamily: "inherit", resize: "vertical" }} />
              </div>
            </div>
            {error && <p style={{ color: "#EF4444", fontSize: 13, marginTop: 12 }}>Please fill in all required fields.</p>}
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: "1.5rem", flexWrap: "wrap" }}>
              <button onClick={submit} disabled={loading}
                style={{ display: "inline-flex", alignItems: "center", gap: 8, background: loading ? "#94A3B8" : "#3B82C4", color: "#fff", padding: "12px 24px", borderRadius: 6, fontSize: 15, fontWeight: 600, border: "none", cursor: loading ? "not-allowed" : "pointer" }}>
                <Send size={16} /> {loading ? "Sending..." : "Submit Request"}
              </button>
              <span style={{ fontSize: 12, color: "#94A3B8" }}>We will respond within 24 hours.</span>
            </div>
            {submitted && (
              <div style={{ display: "flex", alignItems: "center", gap: 10, background: "#ECFDF5", border: "1px solid #A7F3D0", borderRadius: 6, padding: "12px 16px", fontSize: 14, color: "#065F46", marginTop: "1rem" }}>
                <CheckCircle size={18} color="#065F46" />
                Thank you! Your request has been received. Our team will contact you shortly.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ padding: "90px 5%", background: "#0D2B4E" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#3B82C4", letterSpacing: 2, textTransform: "uppercase", marginBottom: ".75rem" }}>Reach Us</div>
          <h2 style={{ fontSize: "clamp(1.6rem,3vw,2.2rem)", fontWeight: 700, color: "#fff", marginBottom: "2rem" }}>Get in Touch</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "3rem", alignItems: "start" }}>
            <div>
              {CONTACT_ITEMS.map((c) => (
                <div key={c.label} style={{ display: "flex", alignItems: "flex-start", gap: 16, padding: "1.25rem", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 10, marginBottom: 14 }}>
                  <div style={{ width: 44, height: 44, minWidth: 44, background: "#3B82C4", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff" }}>
                    {c.icon}
                  </div>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>{c.label}</div>
                    <div style={{ fontSize: ".95rem", color: "#fff", fontWeight: 500 }}>{c.value}</div>
                  </div>
                </div>
              ))}

              {/* SOCIAL MEDIA */}
              <div style={{ marginTop: 8 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: 1, marginBottom: 12 }}>Follow & Message Us</div>
                <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                  {SOCIAL_LINKS.map((s) => (
                    <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer"
                      className="social-btn"
                      style={{ display: "inline-flex", alignItems: "center", gap: 8, background: s.color, color: "#fff", padding: "10px 18px", borderRadius: 8, fontSize: 14, fontWeight: 600, textDecoration: "none", transition: "opacity .2s, transform .2s" }}>
                      {s.icon} {s.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 10, padding: "2rem", textAlign: "center" }}>
              <div style={{ width: 64, height: 64, background: "rgba(59,130,196,0.3)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1rem" }}>
                <Navigation size={28} color="#3B82C4" />
              </div>
              <h3 style={{ color: "#fff", fontSize: "1.1rem", fontWeight: 700, marginBottom: ".75rem" }}>Local Experts, National Reach</h3>
              <p style={{ color: "rgba(255,255,255,0.7)", fontSize: ".9rem", lineHeight: 1.6, marginBottom: "1.5rem" }}>
                As an Ethiopia-based company, FANTAF Trading & Logistics understands local routes, regulations, and the unique demands of construction logistics across the country.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <a href="mailto:fikireyesusb@gmail.com"
                  style={{ background: "#3B82C4", color: "#fff", padding: "10px 24px", borderRadius: 6, fontSize: 14, fontWeight: 600, textDecoration: "none", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                  <Mail size={16} /> Email Us Now
                </a>
                <a href="https://wa.me/251952974980" target="_blank" rel="noopener noreferrer"
                  style={{ background: "#25D366", color: "#fff", padding: "10px 24px", borderRadius: 6, fontSize: 14, fontWeight: 600, textDecoration: "none", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  WhatsApp Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#07192F", padding: "2.5rem 5%" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
          <Logo size="sm" />
          <div style={{ display: "flex", gap: 12 }}>
            {SOCIAL_LINKS.map((s) => (
              <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer"
                style={{ width: 36, height: 36, borderRadius: 8, background: "rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", textDecoration: "none" }}>
                {s.icon}
              </a>
            ))}
          </div>
          <p style={{ color: "rgba(255,255,255,0.38)", fontSize: 13 }}>
            &copy; 2025 FANTAF Trading & Logistics — Ethiopia
          </p>
        </div>
      </footer>

    </div>
  );
}