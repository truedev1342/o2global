import { NextRequest, NextResponse } from "next/server";

// POST to save nonce
export async function POST(request: NextRequest) {
  const { email, firstName, lastName, initials, password } = await request.json();
console.log(`${process.env.NEXT_PUBLIC_ENDPOINT_URL}/auth/register`)
  const response = await fetch(`${process.env.NEXT_PUBLIC_ENDPOINT_URL}/api/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, firstName, lastName, initials, password }),
  });

  if (response.ok) {
    const data = await response.json();
    return NextResponse.json({ data }, { status: 200 });
  } else {
    return NextResponse.json({}, { status: 500 });
  }
}
