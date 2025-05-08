import React, { useState } from "react";
import axios from "axios";
import { Container, Form, Button, Card, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function AddEvent() {
  const [eventData, setEventData] = useState({
    title: "",
    date: "",
    venue: "",
    description: "",
    banner: null,
  });

  const handleChange = (e) => {
    setEventData({
      ...eventData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    setEventData({
      ...eventData,
      banner: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user?.email) {
      alert("Please log in first.");
      return;
    }
  
    const formData = new FormData();
    formData.append("title", eventData.title);
    formData.append("date", eventData.date);
    formData.append("venue", eventData.venue);
    formData.append("description", eventData.description);
    formData.append("userEmail", user.email);  // ✅ attach userEmail
    if (eventData.banner) {
      formData.append("banner", eventData.banner);  // ✅ image file
    }
  
    try {
      const res = await axios.post("http://localhost:5000/api/events", formData);
      console.log("Event submitted:", res.data);
      alert("Event added successfully!");
    } catch (err) {
      console.error("Error submitting event:", err);
      alert("Failed to add event");
    }
  };
  

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="p-4 shadow">
            <Card.Body>
              <h3 className="text-center mb-4">Create Event</h3>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="eventTitle">
                  <Form.Label>Event Title</Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    placeholder="Enter event title"
                    value={eventData.title}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="eventDate">
                  <Form.Label>Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="date"
                    value={eventData.date}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="eventVenue">
                  <Form.Label>Venue</Form.Label>
                  <Form.Control
                    type="text"
                    name="venue"
                    value={eventData.venue}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="eventDescription">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    name="description"
                    placeholder="Enter event description"
                    value={eventData.description}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-4" controlId="eventBanner">
                  <Form.Label>Event Banner</Form.Label>
                  <Form.Control
                    type="file"
                    name="banner"
                    onChange={handleImageChange}
                    accept="image/*"
                  />
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100">
                  Add Event
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default AddEvent;
