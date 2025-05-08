import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { Container, Card, Button } from "react-bootstrap";

function EventDetails() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/events/${id}`);
        setEvent(res.data);
      } catch (error) {
        console.error("Error fetching event:", error);
      }
    };
    fetchEvent();
  }, [id]);

  if (!event) return <p className="text-center mt-5">Loading...</p>;

  return (
    <Container className="py-4">
      <Card className="mx-auto shadow-sm" style={{ maxWidth: "600px" }}>
        <Card.Img
          variant="top"
          src={`http://localhost:5000${event.imageUrl}`}
          style={{ height: "300px", objectFit: "cover" }}
        />
        <Card.Body>
          <Card.Title>{event.title}</Card.Title>
          <Card.Text><strong>Date:</strong> {event.date}</Card.Text>
          <Card.Text><strong>Venue:</strong> {event.venue}</Card.Text>
          <Card.Text><strong>Description:</strong> {event.description}</Card.Text>
          <Button variant="secondary" as={Link} to="/">Back to Events</Button>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default EventDetails;
