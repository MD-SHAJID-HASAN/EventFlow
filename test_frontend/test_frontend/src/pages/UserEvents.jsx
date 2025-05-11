import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

function UserEvents() {
  const [events, setEvents] = useState([]);
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;
  const navigate = useNavigate();

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

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        await axios.delete(`http://localhost:5000/api/events/${id}`);
        setEvents((prev) => prev.filter((event) => event._id !== id));
        alert("Event deleted successfully!");
      } catch (error) {
        console.error("Delete error:", error);
        alert("Failed to delete event");
      }
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit-event/${id}`);
  };

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
                <p className="card-text" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{event.description}</p>
              </div>
              <div className="card-footer d-flex justify-content-between">
                <Button variant="warning" onClick={() => handleEdit(event._id)}>Edit</Button>
                <Button variant="danger" onClick={() => handleDelete(event._id)}>Delete</Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserEvents;
