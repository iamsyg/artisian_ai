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

    if (!user || userError)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await request.json();
    const {
      artisan_shop_name,
      artisan_shop_description,
      artisan_email,
      artisan_password,
      artisan_profile_photo,
      artisan_cover_photo,
    } = body;

    if (!artisan_shop_name || !artisan_email || !artisan_password) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if this user already exists in users table
    const { data: existingUser, error: fetchError } = await supabase
      .from("users")
      .select("*")
      .eq("user_supabase_uid", user.id)
      .maybeSingle();

    if (fetchError) {
      console.error("Fetch error:", fetchError);
      return NextResponse.json({ error: "User lookup failed" }, { status: 500 });
    }

    if (!existingUser) {
      return NextResponse.json(
        { error: "User not found — must register first as customer" },
        { status: 400 }
      );
    }

    if (existingUser.is_artisan) {
      return NextResponse.json(
        { error: "User is already registered as an artisan" },
        { status: 400 }
      );
    }

    // Hash artisan password (used only for artisan login)
    const hashedPassword = await bcrypt.hash(artisan_password, 10);

    // Update the existing user record with artisan fields
    const { data: updatedUser, error: updateError } = await supabase
      .from("users")
      .update({
        is_artisan: true,
        artisan_supabase_uid: user.id,
        artisan_shop_name,
        artisan_shop_description,
        artisan_email,
        artisan_password: hashedPassword,
        artisan_profile_photo,
        artisan_cover_photo,
      })
      .eq("user_supabase_uid", user.id)
      .select()
      .single();

      console.log("Updated user data:", updatedUser);

    if (updateError) {
      console.error("Error updating artisan profile:", updateError);
      return NextResponse.json(
        { error: "Failed to upgrade to artisan" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: "Artisan profile created successfully",
      success: true,
      updatedUser,
    });
  } catch (error) {
    console.error("Artisan signup error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
