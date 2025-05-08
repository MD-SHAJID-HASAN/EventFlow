import React, { useState } from 'react';

import { Button, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import SignUp from '../components/SignUp';
import SignIn from '../components/SignIn';

function Registration() {
  const [isSignUp, setIsSignUp] = useState(true);

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
  };

  return (
    <Container className="d-flex flex-column justify-content-center align-items-center vh-100" style={{ backgroundColor: "#f0f2f5" }}>
      {isSignUp ? <SignUp /> : <SignIn />}

      <Button variant="link" onClick={toggleForm} className="mt-3">
        {isSignUp ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
      </Button>
    </Container>
  );
}

export default Registration;
