import React, { useEffect, useState } from "react";
import axios from "axios";

function UserEvents() {
  const [events, setEvents] = useState([]);
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  useEffect(() => {
    const fetchUserEvents = async () => {
      if (!user?.email) return;

      try {
        const response = await axios.get(`http://localhost:5000/api/events?userEmail=${user.email}`);
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching user events:", error);
      }
    };

    fetchUserEvents();
  }, [user]);

  if (!user) {
    return <div className="text-center py-5"><p>Please sign in to view your events.</p></div>;
  }

  if (events.length === 0) {
    return <div className="text-center py-5"><p>No events added yet.</p></div>;
  }

  return (
    <div className="container py-4">
      <h3 className="mb-4">Your Added Events</h3>
      <div className="row">
        {events.map((event) => (
          <div key={event._id} className="col-md-6 col-lg-4 mb-4">
            <div className="card h-100 shadow-sm border-0">
              {event.imageUrl && (
                <img
                  src={`http://localhost:5000${event.imageUrl}`}
                  alt="Event Banner"
                  className="card-img-top"
                  style={{ height: "180px", objectFit: "cover" }}
                />
              )}
              <div className="card-body">
                <h5 className="card-title">{event.title}</h5>
                <p className="card-text"><strong>Date:</strong> {event.date}</p>
                <p className="card-text"><strong>Venue:</strong> {event.venue}</p>
                <p className="card-text">{event.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserEvents;
