// import { createClient } from '@supabase/supabase-js'
// import { Auth } from '@supabase/auth-ui-react'

// const supabase = createClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL?? "",
//     process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_OR_ANON_KEY ?? ""
// )

// export {Auth, supabase}


import { createBrowserClient } from "@supabase/ssr";

// ✅ Create a browser-aware Supabase client that restores sessions automatically
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_OR_ANON_KEY!
  );
}
