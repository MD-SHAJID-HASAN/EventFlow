

// SignIn.jsx
import React, { useState } from "react";
import axios from "axios";
import { Container, Form, Button, Card } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuth } from "../context/AuthContext"; // Import the useAuth hook
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate for redirection

function SignIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { login } = useAuth(); // Destructure the login function from AuthContext
  const navigate = useNavigate(); // Initialize navigate for redirection

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/signin', formData);
      const userData = res.data.user; // Assuming the response contains user data
      login(userData); // Update the global authentication state
      alert(res.data.message || "Login successful!");
      localStorage.setItem('user', JSON.stringify(userData));
      setFormData({ email: "", password: "" }); // Clear form

      navigate("/add-event"); // Redirect to home or desired route
    } catch (err) {
      console.error("Error logging in:", err);
      alert(err.response?.data?.message || "Login failed.");
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: "#f3f4f6" }}>
      <Card style={{ padding: "2rem", width: "100%", maxWidth: "400px", boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}>
        <Card.Body>
          <h2 className="text-center mb-4" style={{ fontWeight: "bold" }}>Sign In</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Control
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-4" controlId="formPassword">
              <Form.Control
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Login
            </Button>
          </Form>
          <p className="p-2">New here? <Link className="text-decoration-none" to='/signup'>Sign Up</Link> now.</p>
        </Card.Body>
      </Card>
      
    </Container>
  );
}

export default SignIn;
