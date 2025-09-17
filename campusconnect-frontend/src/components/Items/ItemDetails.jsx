import React, { useEffect, useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './ItemsDashboard.css';

const getItemById = (id) => {
  try {
    const lost = JSON.parse(localStorage.getItem('lostItems') || '[]');
    const found = JSON.parse(localStorage.getItem('foundItems') || '[]');
    const all = [
      ...lost.map((x) => ({ ...x, status: 'lost' })),
      ...found.map((x) => ({ ...x, status: 'found' })),
    ];
    return all.find((x) => String(x.id) === String(id));
  } catch (e) {
    return null;
  }
};

const ItemDetails = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    setItem(getItemById(id));
  }, [id]);

  if (!item) {
    return (
      <div className="container items-content">
        <div className="empty">
          <div className="empty-card">
            <h3>Item not found</h3>
            <p>The item might have been removed or the link is invalid.</p>
            <Link className="btn btn-primary" to="/items">Back to Items</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container items-content">
      <div className="detail-card">
        <div className="detail-media">
          {item.image ? (
            <img src={item.image} alt={item.title} />
          ) : (
            <div className="placeholder" style={{height: 240}}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
            </div>
          )}
        </div>
        <div className="detail-body">
          <div className="title-row">
            <h2>{item.title}</h2>
            <span className={`pill ${item.status === 'found' ? 'pill-green' : 'pill-red'}`}>
              {item.status === 'found' ? 'Found' : 'Lost'}
            </span>
          </div>
          <p className="desc" style={{display: 'block', WebkitLineClamp: 'unset'}}>{item.description}</p>
          <div className="meta">
            <span className="loc">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              {item.location}
            </span>
            <span className="time">{item.createdAt ? new Date(item.createdAt).toLocaleString() : ''}</span>
          </div>
          <div style={{marginTop: 16}}>
            <Link className="btn btn-white" to="/items">Back to Items</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetails;
