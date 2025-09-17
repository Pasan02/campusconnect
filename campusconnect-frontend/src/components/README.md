# Lost & Found Form Component

## Overview
The `LostFoundForm` component is a comprehensive form for reporting lost or found items within a university campus. It includes conditional fields, validation, and a responsive design.

## Features

### Core Functionality
- **Report Type Selection**: Users can choose between reporting a lost or found item
- **Item Categories**: Predefined categories including Phone, Laptop, Book, Wallet, ID Card, Keys, etc.
- **Campus Locations**: Radio buttons for common campus locations
- **Date/Time Selection**: Date picker and optional time input
- **Photo Upload**: Allows users to upload images of the item
- **User Authentication**: Form is designed for logged-in users (no contact info needed)

### Conditional Fields
The form dynamically shows additional fields based on the selected item category:

#### For Phones and Laptops:
- Brand (required)
- Model (optional)  
- Color (required)

#### For ID Cards:
- ID Type selection (Student ID, Driving License, National ID, etc.)
- Student ID number (if Student ID is selected)

### Validation
- Required field validation
- Category-specific validations
- Date validation (cannot be future dates)

## Usage

### Basic Implementation
```jsx
import React from 'react';
import LostFoundForm from './components/LostFoundForm';

function App() {
  const handleFormSubmit = (formData) => {
    console.log('Form submitted:', formData);
    
    // Send to your backend API
    fetch('/api/lost-found', {
      method: 'POST',
      body: formData // FormData object with all fields and file
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      // Handle success
    })
    .catch(error => {
      console.error('Error:', error);
      // Handle error
    });
  };

  return (
    <div className="App">
      <LostFoundForm onSubmit={handleFormSubmit} />
    </div>
  );
}
```

### Props
- `onSubmit` (function): Callback function called when the form is submitted. Receives a FormData object containing all form fields.

### Form Data Structure
The form submits a FormData object containing the following fields:

```javascript
{
  reportType: 'lost' | 'found',
  itemCategory: string,
  customCategory: string (if itemCategory is 'Other'),
  location: string,
  customLocation: string (if location is 'Other'),
  date: string (YYYY-MM-DD format),
  time: string (HH:MM format),
  photo: File object,
  description: string,
  // Conditional fields
  brand: string (for phones/laptops),
  model: string (for phones/laptops),
  color: string (for phones/laptops),
  idType: string (for ID cards),
  studentId: string (for student IDs),
  additionalDetails: string
}
```

## Styling
The component includes comprehensive CSS styling with:
- Responsive design for mobile, tablet, and desktop
- Accessible focus indicators
- Modern gradient backgrounds
- Smooth animations and transitions
- Professional form styling

## Accessibility Features
- Proper label associations
- Focus indicators
- Keyboard navigation support
- Screen reader friendly structure
- ARIA attributes where appropriate

## Campus Locations
The form includes common university locations:
- Library
- Student Union
- Cafeteria/Food Court
- Lecture Halls
- Computer Lab
- Science/Engineering/Arts Buildings
- Gymnasium
- Parking Lot
- Student Dormitory
- Administrative Building
- Outdoor Campus Area

## Item Categories
Supported item categories:
- Phone
- Laptop
- Book
- Wallet
- ID Card
- Keys
- Bag/Backpack
- Jewelry
- Clothing
- Electronics
- Documents
- Other (with custom input)

## Browser Support
The component works in all modern browsers and includes fallbacks for:
- CSS Grid (falls back to flexbox on older browsers)
- Custom file input styling
- Focus-visible for better accessibility

## Future Enhancements
Potential improvements could include:
- Real-time search and matching of lost/found items
- Email notifications
- Image compression before upload
- Location services integration
- Multi-language support
- Advanced filtering and search capabilities