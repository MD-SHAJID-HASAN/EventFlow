import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function StorageListener() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Listen for changes in localStorage
  useEffect(() => {
    const handleStorageChange = () => {
      // If the localStorage no longer has a "user" key, sign the user out
      if (!localStorage.getItem('user')) {
        setIsLoggedIn(false);
        navigate('/signin'); // Redirect to sign in page
      }
    };

    window.addEventListener('storage', handleStorageChange);

    // Cleanup listener when the component is unmounted
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [navigate]);

  // Check the user's logged-in state on initial render
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  return (
    <div>
      {isLoggedIn ? (
        <h1>Welcome back!</h1>
      ) : (
        <h1>Please sign in</h1>
      )}
    </div>
  );
}

export default StorageListener;
