// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import ProductCreate from './pages/ProductCreate';
import Home from './pages/Home';
import Registration from './pages/Registration';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import ProductList from './pages/ProductList';
import Header from './components/Header';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import AddEvent from './pages/AddEvent';
import StorageListener from '../public/storageListener';
import EventList from './pages/EventList';
import UserProfile from './pages/UserProfile';
import UserEvents from './pages/UserEvents';
import EventDetails from './pages/EventDetails';
import EditEvent from './pages/EditEvent';
import Footer from './components/Footer';

function App() {
  return (
    <AuthProvider>
      
      <Router>
      {/* <StorageListener></StorageListener> */}
        <Header></Header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/events" element={<EventList />} /> 
          <Route path="/profile" element={<UserProfile />} /> 
          <Route path="/added-events" element={<UserEvents />} /> 
          <Route path="/events/:id" element={<EventDetails />} />
          <Route path="/edit-event/:id" element={<EditEvent />} />
          <Route
            path="/add-event"
            element={
              <PrivateRoute>
                <AddEvent/>
              </PrivateRoute>
            }
          />
          <Route path="/products" element={<ProductList />} />
        </Routes>
        <Footer></Footer>
      </Router>
    </AuthProvider>
  );
}

export default App;
