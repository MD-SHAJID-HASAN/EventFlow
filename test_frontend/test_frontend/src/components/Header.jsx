import React from "react";
import { Container, Nav, Navbar, Button } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const linkStyle = ({ isActive }) => ({
    color: isActive ? "#fff" : "#000",
    fontWeight: isActive ? "bold" : "normal",
    textDecoration: "none",
    marginRight: "1rem",
  });

  return (
    <Navbar collapseOnSelect expand="lg" className="bg-info">
      <Container>
        <Navbar.Brand as={NavLink} to="/" style={linkStyle}>EventFlow</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <NavLink to="/add-event" style={linkStyle}>Add Event</NavLink>
            <NavLink to="/events" style={linkStyle}>Events</NavLink>
          </Nav>
          <Nav>
            {user ? (
              <>
                <Navbar.Text className="me-3">
                  Welcome <NavLink to="/profile" style={linkStyle}><strong>{user.name || user.email}</strong></NavLink>
                </Navbar.Text>
                <Button variant="outline-danger" onClick={handleLogout}>Log Out</Button>
              </>
            ) : (
              <NavLink to="/login" style={linkStyle}>Sign In</NavLink>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
