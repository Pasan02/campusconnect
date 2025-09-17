import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './components/Home/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import LostFoundForm from './components/LostFoundForm';
import Report from './components/report/report';

function App() {
  const handleFormSubmit = (formData) => {
    console.log('Lost/Found form submitted:', formData);
    
    // In a real application, you would send this data to your backend API
    // For now, we'll just show an alert
    alert('Form submitted successfully! Check the console for submitted data.');
    
    // Example of how you might send to an API:
    // fetch('/api/lost-found', {
    //   method: 'POST',
    //   body: formData
    // })
    // .then(response => response.json())
    // .then(data => {
    //   console.log('Success:', data);
    //   // Handle success (e.g., show success message, redirect, etc.)
    // })
    // .catch(error => {
    //   console.error('Error:', error);
    //   // Handle error
    // });
  };

  return (
    <Router>
      <div className="App">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/add-lost-item" element={<LostFoundForm onSubmit={handleFormSubmit} />} />
            <Route path="/add-found-item" element={<LostFoundForm onSubmit={handleFormSubmit} />} />
            <Route path="/report" element={<Report />} />
            <Route path="/lost-found-form" element={<LostFoundForm onSubmit={handleFormSubmit} />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
