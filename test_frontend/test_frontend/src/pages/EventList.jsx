import React, { useEffect, useState } from "react";
import axios from "axios";

function EventList() {
  const [events, setEvents] = useState([]);

  const fetchEvents = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/events");
      setEvents(response.data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleAddToCart = (event) => {
    console.log("Added to Cart:", event);
  };

  const handleDeleteEvent = async (id) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        await axios.delete(`http://localhost:5000/api/events/${id}`);
        alert("Event deted successfully!");
        fetchEvents(); // Refresh the lit after deletion
      } catch (error) {
        console.error("Error deleting event", error);
        alert("Failed to delete event");
      }
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2 style={{ textAlign: "center", marginBottom: "2rem" }}>Event List</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "2rem" }}>
        {events.map((event) => (
          <div key={event._id} style={{ border: "1px solid #ccc", padding: "1rem", borderRadius: "8px" }}>
            <img
              src={`http://localhost:5000${event.imageUrl}`}
              alt={event.title}
              style={{ width: "100%", height: "200px", marginBottom: "1rem" }}
            />
            <h3>{event.title}</h3>
            <p>{event.description}</p>
            <p>${event.price}</p>

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button
                onClick={() => handleAddToCart(event)}
                style={{
                  padding: "10px",
                  backgroundColor: "blue",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  marginRight: "10px",
                  flex: 1,
                }}
              >
                Add to Cart
              </button>

              <button
                onClick={() => handleDeleteevent(event._id)}
                style={{
                  padding: "10px",
                  backgroundColor: "red",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  flex: 1,
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EventList;
