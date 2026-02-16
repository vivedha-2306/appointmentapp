// src/components/RegistrationForm.jsx

import { useState } from 'react';

const API_BASE = 'http://127.0.0.1:5000';

export default function RegistrationForm({ eventId }) {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [submittedData, setSubmittedData] = useState(null);   // ← NEW: store submitted values here
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg('');
    setSuccess(false);

    try {
      const response = await fetch(`${API_BASE}/api/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, eventId }),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message || 'Registration failed');
      }

      // Save the submitted data before resetting form
      setSubmittedData({ ...formData });
      setSuccess(true);

      // Reset form for next use (optional)
      setFormData({ name: '', email: '', phone: '' });
    } catch (err) {
      setErrorMsg(err.message || 'Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success && submittedData) {
    return (
      <div style={{
        backgroundColor: '#e8f5e9',
        border: '1px solid #a5d6a7',
        borderRadius: '8px',
        padding: '24px',
        marginTop: '16px'
      }}>
        <h3 style={{ color: '#2e7d32', marginTop: 0, fontSize: '1.3rem' }}>
          ✓ You are successfully registered!
        </h3>

        <div style={{ margin: '16px 0', lineHeight: '1.8' }}>
          <strong>Name:</strong> {submittedData.name}<br />
          <strong>Email:</strong> {submittedData.email}<br />
          <strong>Phone:</strong> {submittedData.phone}
        </div>

        <p style={{ marginTop: '16px', fontStyle: 'italic', color: '#388e3c' }}>
          Confirmation email sent (simulation).
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* ... your existing inputs ... */}
      <div>
        <label style={{ display: 'block', marginBottom: '6px', fontWeight: 500 }}>Full Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          style={{ width: '100%', padding: '12px', border: '1px solid #ccc', borderRadius: '6px' }}
        />
      </div>

      <div>
        <label style={{ display: 'block', marginBottom: '6px', fontWeight: 500 }}>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          style={{ width: '100%', padding: '12px', border: '1px solid #ccc', borderRadius: '6px' }}
        />
      </div>

      <div>
        <label style={{ display: 'block', marginBottom: '6px', fontWeight: 500 }}>Phone Number</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
          style={{ width: '100%', padding: '12px', border: '1px solid #ccc', borderRadius: '6px' }}
        />
      </div>

      {errorMsg && <div style={{ color: '#d32f2f' }}>{errorMsg}</div>}

      <button
        type="submit"
        disabled={isSubmitting}
        style={{
          backgroundColor: isSubmitting ? '#81c784' : '#4caf50',
          color: 'white',
          padding: '14px',
          border: 'none',
          borderRadius: '8px',
          fontWeight: 'bold',
          cursor: isSubmitting ? 'not-allowed' : 'pointer'
        }}
      >
        {isSubmitting ? 'Registering...' : 'Register'}
      </button>
    </form>
  );
}