import React, { useEffect, useState } from "react";
import { Container, Row, Col, Carousel, Card, Button, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";

const Home = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const featuredEvents = [
    {
      title: "Tech Conference 2025",
      imageUrl: "https://images.unsplash.com/photo-1551836022-d5d88e9218df",
    },
    {
      title: "Music Fiesta",
      imageUrl: "https://images.unsplash.com/photo-1497032205916-ac775f0649ae",
    },
    {
      title: "Startup Expo",
      imageUrl: "https://images.unsplash.com/photo-1551836022-d5d88e9218df",
    },
  ];

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/events");
        const data = await res.json();
        setEvents(data.slice(0, 6)); // limit for homepage
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <>
      {/* Hero Carousel */}
      <Container className="my-4">
        <Carousel fade interval={2000} className="rounded shadow overflow-hidden">
          {featuredEvents.map((event, idx) => (
            <Carousel.Item key={idx}>
              <img
                className="d-block w-100"
                src={event.imageUrl}
                alt={event.title}
                style={{ height: "400px", objectFit: "cover" }}
              />
              <Carousel.Caption>
                <h4 className="bg-dark bg-opacity-50 p-2 rounded">{event.title}</h4>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      </Container>

      {/* Upcoming Events */}
      <Container className="my-5">
        <h2 className="text-center mb-4 fw-bold">🎉 Upcoming Events</h2>
        {loading ? (
          <div className="text-center">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : (
          <Row className="g-4">
            {events.map((event) => (
              <Col md={4} key={event._id}>
                <Card className="h-100 shadow-sm border-0">
                  <Card.Img
                    variant="top"
                    src={`http://localhost:5000${event.imageUrl}`}
                    alt={event.title}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <Card.Body>
                    <Card.Title>{event.title}</Card.Title>
                    <Card.Text  style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{event.description}...</Card.Text>
                    <Button
                      as={Link}
                      to={`/events/${event._id}`}
                      variant="outline-primary"
                      size="sm"
                    >
                      View Details
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Container>

      {/* Why Choose Us */}
      <Container className="my-5">
        <h2 className="text-center mb-4 fw-bold">🚀 Why Choose Our Platform?</h2>
        <Row className="g-4">
          <Col md={4}>
            <Card className="h-100 text-center shadow-sm border-0">
              <Card.Body>
                <Card.Title>Easy Event Discovery</Card.Title>
                <Card.Text>
                  Quickly explore events by category, date, or location.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="h-100 text-center shadow-sm border-0">
              <Card.Body>
                <Card.Title>Organizer Friendly</Card.Title>
                <Card.Text>
                  Add, edit, and manage your events in one seamless dashboard.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="h-100 text-center shadow-sm border-0">
              <Card.Body>
                <Card.Title>Secure & Reliable</Card.Title>
                <Card.Text>
                  Built with modern tech to ensure fast, safe, and reliable access.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Call to Action */}
      <Container className="text-center my-5">
        <h3 className="mb-3">Want to explore more events?</h3>
        <Button as={Link} to="/events" variant="primary" size="lg">
          Browse All Events
        </Button>
      </Container>
    </>
  );
};

export default Home;
