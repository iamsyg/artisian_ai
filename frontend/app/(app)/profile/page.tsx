"use client";

import { supabase } from '@/app/lib/supabaseClient';
import React from 'react'

const page = () => {

  const handleSignOut = async() => {
    // Sign out logic here
    const {error} = await supabase.auth.signOut();
    if (error) console.log('Error signing out:', error.message);
    else window.location.href = '/store';
  }

  return (
    <div>
      <button onClick={handleSignOut}>
        sign out
      </button>
    </div>
  )
}

export default page 