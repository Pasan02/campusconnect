import React, { useState } from 'react';
import './LostFoundForm.css';

const LostFoundForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    reportType: '', // 'lost' or 'found'
    itemCategory: '',
    customCategory: '',
    location: '',
    customLocation: '',
    date: '',
    time: '',
    photo: null,
    description: '',
    // Conditional fields
    brand: '',
    model: '',
    color: '',
    idType: '',
    studentId: '',
    additionalDetails: ''
  });

  const [errors, setErrors] = useState({});

  const itemCategories = [
    'Phone',
    'Laptop',
    'Book',
    'Wallet',
    'ID Card',
    'Keys',
    'Bag/Backpack',
    'Jewelry',
    'Clothing',
    'Electronics',
    'Documents',
    'Other'
  ];

  const campusLocations = [
    'Library',
    'Student Union',
    'Cafeteria/Food Court',
    'Lecture Hall A',
    'Lecture Hall B',
    'Computer Lab',
    'Science Building',
    'Engineering Building',
    'Arts Building',
    'Gymnasium',
    'Parking Lot',
    'Student Dormitory',
    'Administrative Building',
    'Outdoor Campus Area',
    'Other'
  ];

  const idTypes = [
    'Student ID',
    'Driving License',
    'National ID',
    'Passport',
    'Other Government ID'
  ];

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    
    if (type === 'file') {
      setFormData(prev => ({
        ...prev,
        [name]: files[0]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Required fields
    if (!formData.reportType) newErrors.reportType = 'Please select if you are reporting a lost or found item';
    if (!formData.itemCategory) newErrors.itemCategory = 'Please select an item category';
    if (formData.itemCategory === 'Other' && !formData.customCategory) {
      newErrors.customCategory = 'Please specify the item category';
    }
    if (!formData.date) newErrors.date = 'Please select the date';

    // Category-specific validations
    if (formData.itemCategory === 'Phone' || formData.itemCategory === 'Laptop') {
      if (!formData.brand) newErrors.brand = `Please enter the ${formData.itemCategory.toLowerCase()} brand`;
      if (!formData.color) newErrors.color = `Please enter the ${formData.itemCategory.toLowerCase()} color`;
    }

    if (formData.itemCategory === 'ID Card') {
      if (!formData.idType) newErrors.idType = 'Please select the type of ID';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Create FormData object for file upload
      const submitData = new FormData();
      
      // Append all form fields
      Object.keys(formData).forEach(key => {
        if (formData[key] !== null && formData[key] !== '') {
          submitData.append(key, formData[key]);
        }
      });

      // Call the onSubmit prop if provided
      if (onSubmit) {
        onSubmit(submitData);
      } else {
        console.log('Form submitted:', formData);
        alert('Form submitted successfully! (In a real app, this would be sent to the server)');
      }
    }
  };

  const renderConditionalFields = () => {
    const category = formData.itemCategory;

    if (category === 'Phone' || category === 'Laptop') {
      return (
        <div className="conditional-fields">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="brand">Brand *</label>
              <input
                type="text"
                id="brand"
                name="brand"
                value={formData.brand}
                onChange={handleInputChange}
                placeholder={`Enter ${category.toLowerCase()} brand`}
              />
              {errors.brand && <span className="error">{errors.brand}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="model">Model</label>
              <input
                type="text"
                id="model"
                name="model"
                value={formData.model}
                onChange={handleInputChange}
                placeholder={`Enter ${category.toLowerCase()} model`}
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="color">Color *</label>
            <input
              type="text"
              id="color"
              name="color"
              value={formData.color}
              onChange={handleInputChange}
              placeholder={`Enter ${category.toLowerCase()} color`}
            />
            {errors.color && <span className="error">{errors.color}</span>}
          </div>
        </div>
      );
    }

    if (category === 'ID Card') {
      return (
        <div className="conditional-fields">
          <div className="form-group">
            <label htmlFor="idType">ID Type *</label>
            <select
              id="idType"
              name="idType"
              value={formData.idType}
              onChange={handleInputChange}
            >
              <option value="">Select ID type</option>
              {idTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            {errors.idType && <span className="error">{errors.idType}</span>}
          </div>
          {formData.idType === 'Student ID' && (
            <div className="form-group">
              <label htmlFor="studentId">Student ID Number</label>
              <input
                type="text"
                id="studentId"
                name="studentId"
                value={formData.studentId}
                onChange={handleInputChange}
                placeholder="Enter student ID number"
              />
            </div>
          )}
        </div>
      );
    }

    return null;
  };

  return (
    <div className="lost-found-form-container">
      <form onSubmit={handleSubmit} className="lost-found-form">
        <h2>Report Lost or Found Item</h2>
        
        {/* Report Type */}
        <div className="form-group report-type">
          <label>Are you reporting a lost or found item? *</label>
          <div className="radio-group">
            <label className="radio-label">
              <input
                type="radio"
                name="reportType"
                value="lost"
                checked={formData.reportType === 'lost'}
                onChange={handleInputChange}
              />
              Lost Item
            </label>
            <label className="radio-label">
              <input
                type="radio"
                name="reportType"
                value="found"
                checked={formData.reportType === 'found'}
                onChange={handleInputChange}
              />
              Found Item
            </label>
          </div>
          {errors.reportType && <span className="error">{errors.reportType}</span>}
        </div>

        {/* Item Category */}
        <div className="form-group">
          <label htmlFor="itemCategory">Item Category *</label>
          <select
            id="itemCategory"
            name="itemCategory"
            value={formData.itemCategory}
            onChange={handleInputChange}
          >
            <option value="">Select category</option>
            {itemCategories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          {errors.itemCategory && <span className="error">{errors.itemCategory}</span>}
        </div>

        {/* Custom Category */}
        {formData.itemCategory === 'Other' && (
          <div className="form-group">
            <label htmlFor="customCategory">Specify Item Category *</label>
            <input
              type="text"
              id="customCategory"
              name="customCategory"
              value={formData.customCategory}
              onChange={handleInputChange}
              placeholder="Please specify the item category"
            />
            {errors.customCategory && <span className="error">{errors.customCategory}</span>}
          </div>
        )}

        {/* Conditional Fields */}
        {renderConditionalFields()}

        {/* Location */}
        <div className="form-group">
          <label htmlFor="location">
            {formData.reportType === 'lost' ? 'Last Known Location' : 'Found Location'}
          </label>
          <select
            id="location"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
          >
            <option value="">Select location</option>
            {campusLocations.map(location => (
              <option key={location} value={location}>{location}</option>
            ))}
          </select>
        </div>

        {/* Custom Location */}
        {formData.location === 'Other' && (
          <div className="form-group">
            <label htmlFor="customLocation">Specify Location</label>
            <input
              type="text"
              id="customLocation"
              name="customLocation"
              value={formData.customLocation}
              onChange={handleInputChange}
              placeholder="Please specify the location"
            />
          </div>
        )}

        {/* Date and Time */}
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="date">
              {formData.reportType === 'lost' ? 'Lost Date *' : 'Found Date *'}
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              max={new Date().toISOString().split('T')[0]}
            />
            {errors.date && <span className="error">{errors.date}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="time">
              {formData.reportType === 'lost' ? 'Approximate Time' : 'Found Time'}
            </label>
            <input
              type="time"
              id="time"
              name="time"
              value={formData.time}
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* Photo Upload */}
        <div className="form-group">
          <label htmlFor="photo">Photo</label>
          <input
            type="file"
            id="photo"
            name="photo"
            accept="image/*"
            onChange={handleInputChange}
          />
          <small>Upload a photo of the item (optional but recommended)</small>
        </div>

        {/* Description */}
        <div className="form-group">
          <label htmlFor="description">Additional Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows="4"
            placeholder="Provide any additional details about the item..."
          />
        </div>

        {/* Submit Button */}
        <div className="form-actions">
          <button type="submit" className="submit-btn">
            Submit Report
          </button>
        </div>
      </form>
    </div>
  );
};

export default LostFoundForm;