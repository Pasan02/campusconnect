import React from 'react';
import './App.css';
import LostFoundForm from './components/LostFoundForm';

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
    <div className="App">
      <header className="App-header">
        <h1>Campus Connect - Lost & Found</h1>
        <p>Report lost or found items on campus</p>
      </header>
      <main>
        <LostFoundForm onSubmit={handleFormSubmit} />
      </main>
    </div>
  );
}

export default App;
