// src/components/EventDetail.jsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import RegistrationForm from './RegistrationForm';

const API_BASE = 'http://127.0.0.1:5000';

export default function EventDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Edit mode
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({});

  useEffect(() => {
    fetch(`${API_BASE}/api/events/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Event not found');
        return res.json();
      })
      .then(data => {
        setEvent(data);
        setEditForm({
          title: data.title || '',
          description: data.description || '',
          date: data.date || '',
          location: data.location || '',
          contactInfo: data.contactInfo || ''
        });
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm('Delete this event and ALL registrations? This cannot be undone.')) {
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/api/events/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || 'Delete failed');
      }

      alert('Event and all related registrations deleted successfully');
      navigate('/');
    } catch (err) {
      alert('Error deleting event: ' + err.message);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE}/api/events/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editForm),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || 'Update failed');
      }

      const updatedEvent = await res.json();
      setEvent(updatedEvent);
      setIsEditing(false);
      alert('Event updated successfully');
    } catch (err) {
      alert('Error updating event: ' + err.message);
    }
  };

  if (loading) return <div style={{ textAlign: 'center', padding: '100px' }}>Loading...</div>;
  if (error) return <div style={{ textAlign: 'center', padding: '100px', color: 'red' }}>{error}</div>;
  if (!event) return <div style={{ textAlign: 'center', padding: '100px' }}>Event not found</div>;

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '20px' }}>
      <Link
        to="/"
        style={{
          display: 'inline-block',
          marginBottom: '24px',
          color: '#1976d2',
          textDecoration: 'none',
          fontWeight: '500',
          fontSize: '1.1rem'
        }}
      >
        ← Back to Events
      </Link>

      {/* Edit / Delete buttons */}
      <div style={{ marginBottom: '24px', textAlign: 'right' }}>
        {!isEditing && (
          <>
            <button
              onClick={() => setIsEditing(true)}
              style={{
                backgroundColor: '#ff9800',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '6px',
                marginRight: '12px',
                cursor: 'pointer'
              }}
            >
              Edit Event
            </button>

            <button
              onClick={handleDelete}
              style={{
                backgroundColor: '#d32f2f',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '6px',
                cursor: 'pointer'
              }}
            >
              Delete Event
            </button>
          </>
        )}
      </div>

      {/* Edit form or display */}
      {isEditing ? (
        <form onSubmit={handleEditSubmit} style={{ background: '#fff', padding: '24px', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
          <h2 style={{ marginTop: 0 }}>Edit Event</h2>

          <div style={{ marginBottom: '16px' }}>
            <label>Title</label><br />
            <input
              value={editForm.title}
              onChange={e => setEditForm({ ...editForm, title: e.target.value })}
              required
              style={{ width: '100%', padding: '10px', marginTop: '6px' }}
            />
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label>Description</label><br />
            <textarea
              value={editForm.description}
              onChange={e => setEditForm({ ...editForm, description: e.target.value })}
              rows={5}
              style={{ width: '100%', padding: '10px', marginTop: '6px' }}
            />
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label>Date</label><br />
            <input
              type="date"
              value={editForm.date}
              onChange={e => setEditForm({ ...editForm, date: e.target.value })}
              required
              style={{ width: '100%', padding: '10px', marginTop: '6px' }}
            />
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label>Location</label><br />
            <input
              value={editForm.location}
              onChange={e => setEditForm({ ...editForm, location: e.target.value })}
              required
              style={{ width: '100%', padding: '10px', marginTop: '6px' }}
            />
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label>Contact Info</label><br />
            <input
              value={editForm.contactInfo}
              onChange={e => setEditForm({ ...editForm, contactInfo: e.target.value })}
              style={{ width: '100%', padding: '10px', marginTop: '6px' }}
            />
          </div>

          <div>
            <button
              type="submit"
              style={{ background: '#4caf50', color: 'white', padding: '12px 24px', border: 'none', borderRadius: '6px', marginRight: '12px' }}
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              style={{ background: '#9e9e9e', color: 'white', padding: '12px 24px', border: 'none', borderRadius: '6px' }}
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div style={{ background: '#fff', padding: '32px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
          <h1 style={{ marginTop: 0, color: '#111' }}>{event.title}</h1>

          <div style={{ margin: '20px 0', lineHeight: '1.8' }}>
            <div><strong>Date:</strong> {event.date}</div>
            <div><strong>Location:</strong> {event.location}</div>
            {event.contactInfo && <div><strong>Contact:</strong> {event.contactInfo}</div>}
          </div>

          {event.description && (
            <div>
              <h3 style={{ margin: '24px 0 12px' }}>Description</h3>
              <p style={{ whiteSpace: 'pre-line', lineHeight: '1.6' }}>{event.description}</p>
            </div>
          )}
        </div>
      )}

      {/* Registration Form */}
      <div style={{ marginTop: '40px', background: '#fff', padding: '32px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
        <h2 style={{ marginTop: 0 }}>Register for Event</h2>
        <RegistrationForm eventId={id} />
      </div>
    </div>
  );
}