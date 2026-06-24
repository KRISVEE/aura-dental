import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const supabase = await createClient();
  await supabase.auth.signOut();
  
  // Redirect to login page
  const url = new URL("/login", request.url);
  return NextResponse.redirect(url, {
    status: 303, // See Other (standard for redirecting after a POST)
  });
}
