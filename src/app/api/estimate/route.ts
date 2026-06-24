import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, treatment, scope, estimatedRange } = body;

    if (!firstName || !lastName || !email || !treatment || !scope || !estimatedRange) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const supabase = await createClient();

    const { error } = await supabase.from("treatment_estimates").insert([
      {
        first_name: firstName,
        last_name: lastName,
        email: email,
        treatment: treatment,
        scope: scope,
        estimated_range: estimatedRange,
      },
    ]);

    if (error) {
      console.error("Error inserting treatment estimate:", error);
      return NextResponse.json({ error: "Failed to save estimate lead" }, { status: 500 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("API Error (estimate):", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
