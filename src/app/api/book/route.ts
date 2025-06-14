import { NextResponse } from "next/server";

/**
 * Receive a booking request and acknowledge.
 * Persist the booking or trigger an email here (add l8er).
 */
export async function POST(request: Request) {
  const body = await request.json();
  console.log("🗓️  new booking:", body);

  return NextResponse.json({ ok: true });
}
