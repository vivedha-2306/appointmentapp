// src/pages/Home.js

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const API_BASE = 'http://127.0.0.1:5000';

export default function Home() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API_BASE}/api/events`)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(data => {
        // Sort by date descending (newest first)
        const sorted = [...data].sort((a, b) => new Date(b.date) - new Date(a.date));
        setEvents(sorted);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '120px 20px', fontSize: '1.4rem', color: '#555' }}>
        Loading events...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: 'center', padding: '100px 20px', color: '#d32f2f' }}>
        <strong>Error loading events:</strong> {error}
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 20px' }}>
      {/* Header row with title left + button right */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '40px'
      }}>
        <h1 style={{
          fontSize: '2.4rem',
          fontWeight: 'bold',
          color: '#000',
          margin: 0
        }}>
          Upcoming Events
        </h1>

        <button
          onClick={() => navigate('/add')}
          style={{
            backgroundColor: '#0288d1',
            color: 'white',
            border: 'none',
            padding: '10px 24px',
            fontSize: '1.05rem',
            fontWeight: '500',
            borderRadius: '6px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 2px 6px rgba(0,0,0,0.12)'
          }}
        >
          <span style={{ fontSize: '1.4rem', fontWeight: 'bold' }}>+</span>
          Add Event
        </button>
      </div>

      {/* Cards – starting from left */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {events.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '80px',
            background: '#fff',
            borderRadius: '10px',
            color: '#666'
          }}>
            No upcoming events found
          </div>
        ) : (
          events.map(event => (
            <div
              key={event._id}
              onClick={() => navigate(`/event/${event._id}`)}
              style={{
                background: '#fff',
                border: '1px solid #ddd',
                borderRadius: '10px',
                padding: '24px',
                cursor: 'pointer',
                transition: 'box-shadow 0.2s, transform 0.1s'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.boxShadow = '0 6px 16px rgba(0,0,0,0.12)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <h2 style={{
                fontSize: '1.45rem',
                fontWeight: '600',
                margin: '0 0 12px 0',
                color: '#000'
              }}>
                {event.title}
              </h2>

              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '24px',
                marginBottom: '12px',
                color: '#444',
                fontSize: '1.05rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '1.5rem', color: '#0288d1' }}>📅</span>
                  <span>{event.date}</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '1.5rem', color: '#e91e63' }}>📍</span>
                  <span>{event.location}</span>
                </div>
              </div>

              <p style={{
                color: '#555',
                lineHeight: '1.5',
                margin: '0 0 16px 0',
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}>
                {event.description || 'No description provided.'}
              </p>

              <div style={{
                color: '#0288d1',
                fontWeight: '500',
                fontSize: '1.05rem'
              }}>
                Click to view details
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}