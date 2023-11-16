import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Home from './Home';
import Shop from './Shop';
import Contact from './Contact';
import ThankYou from './ThankYou';
import LoginForm from './LoginForm';
import Dashboard from './Dashboard';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'; 

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Shop />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/ThankYou" element={<ThankYou />} />
          <Route path="/LoginForm" element={<LoginForm />} />
          <Route path="/Dashboard" element={<Dashboard />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
