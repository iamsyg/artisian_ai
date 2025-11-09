import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_OR_ANON_KEY ?? ""
);

export async function GET(request: NextRequest) {
  try {
    // 🔒 Verify authorization
    const token = request.headers.get("Authorization")?.replace("Bearer ", "");
    if (!token)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    // ✅ Validate Supabase session
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser(token);

    if (userError || !user)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    // ✅ Check if user exists in `users` table
    const { data: existingUser, error: fetchError } = await supabase
      .from("users")
      .select("*")
      .eq("user_supabase_uid", user.id)
      .maybeSingle();

    if (fetchError || !existingUser)
      return NextResponse.json({ error: "User not found" }, { status: 404 });

    // ✅ Fetch all users who are artisans (i.e., artisan_supabase_uid is NOT null)
    const { data: artisans, error: artisansError } = await supabase
      .from("users")
      .select(
        "id, full_name, artisan_shop_name, artisan_email, artisan_profile_photo, artisan_cover_photo, artisan_shop_description"
      )
      .not("artisan_supabase_uid", "is", null);

    if (artisansError) {
      console.error("Error fetching artisans:", artisansError);
      return NextResponse.json(
        { error: "Failed to fetch artisans" },
        { status: 500 }
      );
    }

    return NextResponse.json({ artisans }, { status: 200 });

  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
