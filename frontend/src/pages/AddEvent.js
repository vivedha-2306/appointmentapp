// src/pages/AddEvent.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const API_BASE = 'http://127.0.0.1:5000';

export default function AddEvent() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    contactInfo: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE}/api/events`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || 'Failed to create event');
      }

      alert('Event created successfully!');
      navigate('/'); // immediately back to home page
    } catch (err) {
      alert('Error: ' + err.message);
    }
  };

  return (
    <div style={{ maxWidth: '700px', margin: '0 auto', padding: '40px 20px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '40px', fontSize: '2rem', color: '#333' }}>
        Add New Event
      </h1>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Event Title"
            required
            style={{
              width: '100%',
              padding: '14px',
              border: '1px solid #ccc',
              borderRadius: '8px',
              fontSize: '1.1rem',
              background: '#f9f9f9'
            }}
          />
        </div>

        <div>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Event Description"
            rows={6}
            style={{
              width: '100%',
              padding: '14px',
              border: '1px solid #ccc',
              borderRadius: '8px',
              fontSize: '1.1rem',
              background: '#f9f9f9',
              resize: 'vertical'
            }}
          />
        </div>

        <div>
          <input
            name="date"
            type="date"
            value={form.date}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '14px',
              border: '1px solid #ccc',
              borderRadius: '8px',
              fontSize: '1.1rem',
              background: '#f9f9f9'
            }}
          />
        </div>

        <div>
          <input
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="Location"
            required
            style={{
              width: '100%',
              padding: '14px',
              border: '1px solid #ccc',
              borderRadius: '8px',
              fontSize: '1.1rem',
              background: '#f9f9f9'
            }}
          />
        </div>

        <div>
          <input
            name="contactInfo"
            value={form.contactInfo}
            onChange={handleChange}
            placeholder="Contact Number"
            style={{
              width: '100%',
              padding: '14px',
              border: '1px solid #ccc',
              borderRadius: '8px',
              fontSize: '1.1rem',
              background: '#f9f9f9'
            }}
          />
        </div>

        <div style={{ display: 'flex', gap: '16px', marginTop: '20px' }}>
          <button
            type="submit"
            style={{
              flex: 1,
              backgroundColor: '#1976d2',
              color: 'white',
              padding: '14px',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            Create Event
          </button>

          <button
            type="button"
            onClick={() => navigate('/')}
            style={{
              flex: 1,
              backgroundColor: '#757575',
              color: 'white',
              padding: '14px',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1.1rem',
              cursor: 'pointer'
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}