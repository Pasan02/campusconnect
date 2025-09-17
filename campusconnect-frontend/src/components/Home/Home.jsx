import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const items = [
    {
      id: 1,
      status: "Found",
      title: "Found: Laptop Bag",
      desc:
        "Black laptop bag found near the library entrance. Contains notebooks and charger.",
      image:
        "https://images.unsplash.com/photo-1519671282429-b44660ead0a7?q=80&w=1400&auto=format&fit=crop",
      location: "Main Library",
      time: "2 hours ago",
    },
    {
      id: 2,
      status: "Lost",
      title: "Lost: AirPods Case",
      desc:
        "White AirPods case lost somewhere in the science building. Last seen in lecture hall B.",
      image:
        "https://images.unsplash.com/photo-1522040806052-bc96f9b9b7c8?q=80&w=1400&auto=format&fit=crop",
      location: "Science Building",
      time: "5 hours ago",
    },
    {
      id: 3,
      status: "Found",
      title: "Found: Student ID",
      desc:
        "Student ID card found in the cafeteria. Name: John Doe, ID: 12345678.",
      image:
        "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1400&auto=format&fit=crop",
      location: "Campus Cafeteria",
      time: "1 day ago",
    },
  ];

  return (
    <div className="home">
      {/* Hero Section */}
      <section
        className="hero"
        style={{
          backgroundImage:
            "linear-gradient(135deg, rgba(102,126,234,0.45) 0%, rgba(118,75,162,0.55) 100%), url('/images/hero-illustration.png')",
        }}
      >
        <div className="hero-inner">
          <h1>Lost &amp; Found Made Easy</h1>
          <p>
            Reconnect with your lost belongings across campus with our simple
            platform
          </p>
          <div className="hero-ctas">
           
            <Link className="cta cta-outline" to="/add-lost-item">
              Report Lost Item
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="hiw">
        <div className="container">
          <h2>How It Works</h2>
          <div className="hiw-steps">
          <div className="hiw-step">
            <div className="hiw-icon">
              {/* upload icon */}
              <svg
                width="26"
                height="26"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#5b59ff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 5 17 10" />
                <line x1="12" y1="5" x2="12" y2="20" />
              </svg>
            </div>
            <h3>1. Report Item</h3>
            <p>
              Upload details and photos of lost or found items with location
              information.
            </p>
          </div>
          <div className="hiw-step">
            <div className="hiw-icon">
              {/* search icon */}
              <svg
                width="26"
                height="26"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#5b59ff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </div>
            <h3>2. Smart Matching</h3>
            <p>
              Our system automatically matches similar reports to help you find
              your items.
            </p>
          </div>
          <div className="hiw-step">
            <div className="hiw-icon">
              {/* message icon */}
              <svg
                width="26"
                height="26"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#5b59ff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </div>
            <h3>3. Connect &amp; Recover</h3>
            <p>
              Chat with the finder or owner to arrange for item recovery.
            </p>
          </div>
          </div>
        </div>
      </section>

      {/* Recently Reported Items */}
      <section className="recent">
        <div className="container recent-head">
          <h2>Recently Reported Items</h2>
          <Link className="view-all" to="#">
            View All
            <span className="arrow">→</span>
          </Link>
        </div>
        <div className="container cards">
          {items.map((it) => (
            <article className="card" key={it.id}>
              <div className="card-media">
                <img src={it.image} alt={it.title} />
              </div>
              <div className="card-body">
                <div className="card-title-row">
                  <h3>{it.title}</h3>
                  <span
                    className={`pill ${
                      it.status === "Found" ? "pill-green" : "pill-red"
                    }`}
                  >
                    {it.status}
                  </span>
                </div>
                <p className="card-desc">{it.desc}</p>
                <div className="card-meta">
                  <span className="meta">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#6b7280"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    {it.location}
                  </span>
                  <span className="meta time">{it.time}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* CTA Band */}
      <section className="cta-band">
        <div className="container cta-inner">
          <h2>Ready to Find Your Lost Items?</h2>
          <p>
            Join thousands of students and faculty who have successfully
            reunited with their belongings
          </p>
          <Link to="/add-lost-item" className="cta cta-white">
            Get Started Now
          </Link>
        </div>
      </section>

      {/* Footer */}
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
    </div>
  );
};

export default Home;
