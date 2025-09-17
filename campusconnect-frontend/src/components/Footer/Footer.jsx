import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="home-footer">
      <div className="container footer-grid">
        <div>
          <h4>CampusConnect</h4>
          <p>
            Helping students and faculty reconnect with their lost belongings
            since 2023.
          </p>
        </div>
        <div>
          <h5>Quick Links</h5>
          <ul>
            <li>
              <Link to="/home">Home</Link>
            </li>
            <li>
              <Link to="/add-lost-item">Report Item</Link>
            </li>
            <li>
              <Link to="#">Browse Items</Link>
            </li>
            <li>
              <Link to="#">Messages</Link>
            </li>
          </ul>
        </div>
        <div>
          <h5>Resources</h5>
          <ul>
            <li>
              <Link to="#">Help Center</Link>
            </li>
            <li>
              <Link to="#">Privacy Policy</Link>
            </li>
            <li>
              <Link to="#">Terms of Service</Link>
            </li>
            <li>
              <Link to="#">FAQ</Link>
            </li>
          </ul>
        </div>
        <div>
          <h5>Contact</h5>
          <ul>
            <li>help@campusconnect.edu</li>
            <li>(123) 456-7890</li>
            <li>University Campus</li>
          </ul>
        </div>
      </div>
      <div className="copyright">
        © {new Date().getFullYear()} CampusConnect. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;