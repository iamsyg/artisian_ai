import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

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

    const { service_name, service_price, delivery_time_days, description, image_urls } = await request.json();

    if (!service_name || !service_price || !delivery_time_days || !description || !image_urls)
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });

    // Fetch user record
    const { data: existingUser, error: fetchError } = await supabase
      .from("users")
      .select("*")
      .eq("user_supabase_uid", user.id)
      .maybeSingle();

    if (fetchError || !existingUser)
      return NextResponse.json({ error: "User not found" }, { status: 404 });

    if (!existingUser.is_artisan || !existingUser.artisan_supabase_uid)
      return NextResponse.json({ error: "User is not registered as an artisan" }, { status: 403 });

    // Insert new service
    const { data: newService, error } = await supabase
      .from("artisan_services")
      .insert({
        artisan_supabase_uid: existingUser.artisan_supabase_uid, // ✅ fixed
        service_name,
        service_price,
        delivery_time_days,
        description,
        image_urls,
      })
      .select()
      .single();

    if (error) {
      console.error("Error creating service:", error);
      return NextResponse.json({ error: "Failed to create service" }, { status: 500 });
    }

    return NextResponse.json({
      message: "Service created successfully",
      success: true,
      registeredService: newService,
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
