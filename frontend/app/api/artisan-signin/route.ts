import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import bcrypt from "bcryptjs";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_OR_ANON_KEY ?? ""
);

export async function POST(request: NextRequest) {
  try {
    const token = request.headers.get("Authorization")?.replace("Bearer ", "");
    if (!token)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser(token);

    if (userError || !user)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { artisan_email, artisan_password } = await request.json();

    if (!artisan_email || !artisan_password)
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });

    // 🔍 Fetch the user record from your "users" table
    const { data: existingUser, error: fetchError } = await supabase
      .from("users")
      .select("*")
      .eq("user_supabase_uid", user.id)
      .maybeSingle();

    if (fetchError) {
      console.error("Fetch error:", fetchError);
      return NextResponse.json({ error: "User lookup failed" }, { status: 500 });
    }

    if (!existingUser)
      return NextResponse.json({ error: "Must register first as a customer" }, { status: 400 });

    if (!existingUser.artisan_email)
      return NextResponse.json({ error: "Not registered as an artisan" }, { status: 400 });

    if (artisan_email !== existingUser.artisan_email)
      return NextResponse.json({ error: "Invalid artisan email" }, { status: 400 });

    // 🔐 Compare hashed password
    const passwordMatch = await bcrypt.compare(
      artisan_password,
      existingUser.artisan_password
    );

    if (!passwordMatch)
      return NextResponse.json({ error: "Invalid password" }, { status: 400 });

    // ✅ Artisan login successful — create response and set cookie
    const response = NextResponse.json({
      message: "Artisan login successful",
      success: true,
      artisan: {
        shop_name: existingUser.artisan_shop_name,
        shop_description: existingUser.artisan_shop_description,
        email: existingUser.artisan_email,
      },
    });

    // 🍪 Set cookie properly using response.cookies
    response.cookies.set("artisan_logged_in", "true", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24, // 1 day
    });

    // optionally store token for API access (if needed)
    response.cookies.set("artisan_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    return response;
  } catch (error) {
    console.error("Artisan login error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
