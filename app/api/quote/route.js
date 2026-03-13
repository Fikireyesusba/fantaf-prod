export async function POST(request) {
  try {
    const body = await request.json();
    const { name, phone, pickup, delivery, weight, cargo, notes } = body;

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