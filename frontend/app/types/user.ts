export interface User {
  user_supabase_uid: string;
  artisan_supabase_uid?: string;
  full_name: string;
  email: string;
  phone_number: string;
  address: string;
  photo_url?: string;
  is_artisan: boolean;
  total_orders: number;
  completed_orders: number;
  pending_orders: number;
  created_at: string;
  updated_at: string;
}

export interface ProfilePageProps {
  user: User;
}