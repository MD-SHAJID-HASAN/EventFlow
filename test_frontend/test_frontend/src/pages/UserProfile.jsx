import React from "react";
import { Link } from "react-router-dom";

function UserProfile() {
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  if (!user) {
    return (
      <div className="text-center py-5">
        <h4>No user information found.</h4>
        <p>Please sign in to view your profile.</p>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="card p-4 shadow">
        <h2 className="mb-3">User Profile</h2>
        <h4>Name: <span className="text-primary">{user.name}</span></h4>
        <h4>Email: <span className="text-secondary">{user.email}</span></h4>
        <div className="mt-4">
        <Link to='/added-events' className="btn btn-outline-primary">View Added Events</Link>
        </div>
      </div>
    </div>
  );
}


export default UserProfile;
