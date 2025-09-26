import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL?? "",
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_OR_ANON_KEY ?? ""
)

export async function POST(request: NextRequest) {
  try {

    const token = request.headers.get('Authorization')?.replace('Bearer ', '');
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { data: { user }, error: userError } = await supabase.auth.getUser(token);

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const reqBody = await request.json();
    const { full_name, email, phone_number, address, photo_url } = reqBody;

    console.log("Received body:", reqBody);

    // Check if user exists
    const { data: existingUser } = await supabase
  .from("users")
  .select("*")
  .eq("email", email)
  .single();

    if (existingUser) {
      return NextResponse.json({ error: "User already exist" }, { status: 400 });
    }

    // Insert new user
   const { data: newUser, error } = await supabase
  .from("users")
  .insert({
    user_supabase_uid: user.id, // Auth user ID from Supabase session
    full_name: full_name,        // match DB column exactly
    email: email,
    phone_number: phone_number,  // match DB column exactly
    address: address,
    photo_url: photo_url
  })
  .select()
  .single();

    if (error) {
      console.error("Error creating user:", error);
      return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
    }

    return NextResponse.json({
      message: "User created",
      success: true,
      registeredUser: newUser,
    });
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
