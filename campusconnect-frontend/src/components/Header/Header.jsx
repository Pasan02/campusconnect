// src/components/Header/Header.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const { pathname } = useLocation();
  return (
    <header className="header">
      <div className="brand">
        <span className="brand-icon" aria-hidden>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
        </span>
        <span className="brand-name">CampusConnect</span>
      </div>
      <nav className="nav">
        <Link className={pathname === "/" || pathname === "/home" ? "active" : ""} to="/home">Home</Link>
        <Link to="/add-lost-item">Add Item</Link>
  <Link to="/items">Items</Link>
        <Link to="#">Messages</Link>
      </nav>
      <div className="actions">
        <Link className="login-btn" to="/login">Login</Link>
      </div>
    </header>
  );
};

export default Header;
