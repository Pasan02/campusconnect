import React, { useMemo, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ItemsDashboard.css';

// Type/shape for a Lost Item stored in localStorage
// { id, title, description, location, image (dataURL), createdAt }

const ItemsDashboard = () => {
  // Lost panel state
  const [queryLost, setQueryLost] = useState('');
  const [sortLost, setSortLost] = useState('newest');
  const [lostItems, setLostItems] = useState([]);

  // Found panel state
  const [queryFound, setQueryFound] = useState('');
  const [sortFound, setSortFound] = useState('newest');
  const [foundItems, setFoundItems] = useState([]);

  useEffect(() => {
    // Read existing items
    let parsedLost = [];
    let parsedFound = [];
    try {
      const rawLost = localStorage.getItem('lostItems');
      parsedLost = rawLost ? JSON.parse(rawLost) : [];
      parsedLost = Array.isArray(parsedLost) ? parsedLost : [];
    } catch (e) {
      console.error('Failed to parse lostItems from localStorage', e);
      parsedLost = [];
    }

    try {
      const rawFound = localStorage.getItem('foundItems');
      parsedFound = rawFound ? JSON.parse(rawFound) : [];
      parsedFound = Array.isArray(parsedFound) ? parsedFound : [];
    } catch (e) {
      console.error('Failed to parse foundItems from localStorage', e);
      parsedFound = [];
    }

    // Optionally seed sample data in dev mode if lists are empty.
    const isTestEnv = typeof process !== 'undefined' && process.env && process.env.NODE_ENV === 'test';
    const needSeedLost = parsedLost.length === 0;
    const needSeedFound = parsedFound.length === 0;

    if (!isTestEnv && (needSeedLost || needSeedFound)) {
      const now = Date.now();
      const sampleLost = [
        { id: now - 101, title: 'Lost Phone', description: 'Black iPhone 12 with a cracked screen', location: 'Library', image: null, createdAt: now - 60_000 },
        { id: now - 102, title: 'Lost Wallet', description: 'Brown leather wallet with college ID', location: 'Cafeteria', image: null, createdAt: now - 120_000 },
      ];
      const sampleFound = [
        { id: now - 201, title: 'Found Keys', description: 'Keychain with 3 keys and a blue tag', location: 'Gymnasium', image: null, createdAt: now - 90_000 },
        { id: now - 202, title: 'Found ID Card', description: 'Student ID card named Alex', location: 'Student Union', image: null, createdAt: now - 150_000 },
      ];

      if (needSeedLost) {
        parsedLost = sampleLost;
        try { localStorage.setItem('lostItems', JSON.stringify(parsedLost)); } catch {}
      }
      if (needSeedFound) {
        parsedFound = sampleFound;
        try { localStorage.setItem('foundItems', JSON.stringify(parsedFound)); } catch {}
      }
    }

    setLostItems(parsedLost);
    setFoundItems(parsedFound);
  }, []);

  const filterAndSort = (list, query, sortBy) => {
    const q = query.trim().toLowerCase();
    let result = [...list];
    if (q) {
      result = result.filter((it) =>
        [it.title, it.description, it.location]
          .filter(Boolean)
          .some((f) => f.toLowerCase().includes(q))
      );
    }
    if (sortBy === 'newest') {
      result.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
    } else if (sortBy === 'oldest') {
      result.sort((a, b) => (a.createdAt || 0) - (b.createdAt || 0));
    } else if (sortBy === 'title') {
      result.sort((a, b) => (a.title || '').localeCompare(b.title || ''));
    }
    return result;
  };

  const filteredLost = useMemo(() => filterAndSort(lostItems, queryLost, sortLost), [lostItems, queryLost, sortLost]);
  const filteredFound = useMemo(() => filterAndSort(foundItems, queryFound, sortFound), [foundItems, queryFound, sortFound]);

  return (
    <div className="items-page">
      <div className="items-header gradient-bg">
        <div className="container">
          <h1>Lost Items Dashboard</h1>
          <p>Browse, search, and manage reported lost items</p>
          <div className="header-actions">
            <Link className="btn btn-white" to="/add-lost-item">Report Lost Item</Link>
          </div>
        </div>
      </div>

      <div className="container items-content">
        <div className="panels">
          {/* LOST PANEL */}
          <section className="panel panel-lost">
            <div className="panel-header">
              <h2>Lost Items</h2>
              <span className="badge">{filteredLost.length}</span>
            </div>
            <div className="panel-toolbar">
              <div className="search">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <input
                  type="text"
                  placeholder="Search lost items..."
                  value={queryLost}
                  onChange={(e) => setQueryLost(e.target.value)}
                />
              </div>
              <div className="sort">
                <label htmlFor="sortLost">Sort by</label>
                <select id="sortLost" value={sortLost} onChange={(e) => setSortLost(e.target.value)}>
                  <option value="newest">Newest</option>
                  <option value="oldest">Oldest</option>
                  <option value="title">Title (A–Z)</option>
                </select>
              </div>
            </div>

            {filteredLost.length === 0 ? (
              <div className="empty">
                <div className="empty-card">
                  <h3>No lost items</h3>
                  <p>Start by reporting a lost item. It will appear here once saved.</p>
                  <Link className="btn btn-primary" to="/add-lost-item">Add Lost Item</Link>
                </div>
              </div>
            ) : (
              <div className="items-grid">
                {filteredLost.map((it) => (
                  <Link to={`/items/${it.id}`} className="item-card" key={`lost-${it.id}`}>
                    <div className="media">
                      {it.image ? (
                        <img src={it.image} alt={it.title} />
                      ) : (
                        <div className="placeholder">
                          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                            <circle cx="8.5" cy="8.5" r="1.5" />
                            <polyline points="21 15 16 10 5 21" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <div className="body">
                      <div className="title-row">
                        <h3 title={it.title}>{it.title}</h3>
                        <span className="pill pill-red">Lost</span>
                      </div>
                      <p className="desc">{it.description}</p>
                      <div className="meta">
                        <span className="loc">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1 1 18 0z" />
                            <circle cx="12" cy="10" r="3" />
                          </svg>
                          {it.location}
                        </span>
                        <span className="time">{it.createdAt ? new Date(it.createdAt).toLocaleString() : ''}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </section>

          {/* FOUND PANEL */}
          <section className="panel panel-found">
            <div className="panel-header">
              <h2>Found Items</h2>
              <span className="badge">{filteredFound.length}</span>
            </div>
            <div className="panel-toolbar">
              <div className="search">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <input
                  type="text"
                  placeholder="Search found items..."
                  value={queryFound}
                  onChange={(e) => setQueryFound(e.target.value)}
                />
              </div>
              <div className="sort">
                <label htmlFor="sortFound">Sort by</label>
                <select id="sortFound" value={sortFound} onChange={(e) => setSortFound(e.target.value)}>
                  <option value="newest">Newest</option>
                  <option value="oldest">Oldest</option>
                  <option value="title">Title (A–Z)</option>
                </select>
              </div>
            </div>

            {filteredFound.length === 0 ? (
              <div className="empty">
                <div className="empty-card">
                  <h3>No found items</h3>
                  <p>Report a found item so the owner can recover it.</p>
                  <Link className="btn btn-primary" to="/add-found-item">Add Found Item</Link>
                </div>
              </div>
            ) : (
              <div className="items-grid">
                {filteredFound.map((it) => (
                  <Link to={`/items/${it.id}`} className="item-card" key={`found-${it.id}`}>
                    <div className="media">
                      {it.image ? (
                        <img src={it.image} alt={it.title} />
                      ) : (
                        <div className="placeholder">
                          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                            <circle cx="8.5" cy="8.5" r="1.5" />
                            <polyline points="21 15 16 10 5 21" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <div className="body">
                      <div className="title-row">
                        <h3 title={it.title}>{it.title}</h3>
                        <span className="pill pill-green">Found</span>
                      </div>
                      <p className="desc">{it.description}</p>
                      <div className="meta">
                        <span className="loc">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1 1 18 0z" />
                            <circle cx="12" cy="10" r="3" />
                          </svg>
                          {it.location}
                        </span>
                        <span className="time">{it.createdAt ? new Date(it.createdAt).toLocaleString() : ''}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default ItemsDashboard;
