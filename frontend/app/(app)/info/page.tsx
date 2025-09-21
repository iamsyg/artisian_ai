"use client";

import { useAuth } from "@/app/context/AuthContext";

export default function Dashboard() {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      {user ? (
        <h2>Welcome, {user.displayName || user.phoneNumber || "User"} 👋</h2>
      ) : (
        <p>No user signed in</p>
      )}

      {user && (
        <div>
          <p>Email: {user.email}</p>
          <p>Phone: {user.phoneNumber}</p>
        </div>
      )}
      {user && user.photoURL && (
        <div>
          <img src={user.photoURL} alt="User Photo" />
        </div>
      )}
      {user && user.metadata && (
        <div>
          <p>Account Created: {new Date(user.metadata.creationTime || "").toLocaleDateString()}</p>
        </div>
      )}
      {user?.uid && (
        <div>
          <p>UID: {user.uid}</p>
        </div>
      )}
    </div>
  );
}
