import React from "react";
import { Container } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className="bg-info text-dark py-3 mt-5">
      <Container className="text-center">
        <p className="mb-1">&copy; {new Date().getFullYear()} EventFlow. All rights reserved.</p>
      </Container>
    </footer>
  );
};

export default Footer;
