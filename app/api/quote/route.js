import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, phone, pickup, delivery, weight, cargo, notes, user_id } = body;

    // Save to Supabase
    const { error: dbError } = await supabase.from("quotes").insert([{
      user_id: user_id || null,
      name, phone, pickup, delivery, weight, cargo, notes,
    }]);
    if (dbError) console.error("DB error:", dbError);

    // Send email via Formspree
    const res = await fetch("https://formspree.io/f/mnjgvowv", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        "Full Name": name,
        "Phone Number": phone,
        "Pickup Location": pickup,
        "Delivery Location": delivery,
        "Weight (kg)": weight,
        "Cargo Type": cargo,
        "Additional Notes": notes || "None",
      }),
    });

    if (res.ok) {
      return Response.json({ success: true });
    } else {
      return Response.json({ success: false }, { status: 500 });
    }
  } catch (error) {
    console.error("Error:", error);
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}