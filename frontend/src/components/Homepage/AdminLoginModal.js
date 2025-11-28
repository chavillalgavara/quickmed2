import React, { useState } from 'react';

const AdminLoginModal = ({ onClose, onLoginSuccess, onBackToHome }) => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const styles = {
    modalOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 2000,
      padding: '20px',
    },
    modalContent: {
      background: 'white',
      borderRadius: '20px',
      padding: '2rem',
      maxWidth: '400px',
      width: '100%',
      boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
    },
    modalHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '2rem',
    },
    modalTitle: {
      margin: 0,
      color: '#7C2A62',
      fontSize: '1.5rem',
      fontWeight: 'bold',
    },
    closeButton: {
      background: 'none',
      border: 'none',
      fontSize: '2rem',
      cursor: 'pointer',
      color: '#7C2A62',
    },
    errorMessage: {
      backgroundColor: '#ffebee',
      color: '#d32f2f',
      padding: '12px',
      borderRadius: '8px',
      marginBottom: '1rem',
      textAlign: 'center',
    },
    adminForm: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5rem',
    },
    formGroup: {
      display: 'flex',
      flexDirection: 'column',
    },
    formLabel: {
      marginBottom: '0.5rem',
      color: '#333',
      fontWeight: '600',
    },
    formInput: {
      padding: '12px 15px',
      border: '2px solid #e1e1e1',
      borderRadius: '10px',
      fontSize: '1rem',
      transition: 'border-color 0.3s ease',
      outline: 'none',
    },
    adminLoginButton: {
      padding: '12px 2rem',
      backgroundColor: '#7C2A62',
      color: 'white',
      border: 'none',
      borderRadius: '10px',
      cursor: 'pointer',
      fontSize: '1.1rem',
      fontWeight: 'bold',
      transition: 'all 0.3s ease',
      marginTop: '1rem',
    },
    adminNote: {
      marginTop: '2rem',
      padding: '1rem',
      backgroundColor: '#F7D9EB',
      borderRadius: '10px',
      border: '1px solid #7C2A62',
    },
    securityText: {
      margin: 0,
      color: '#7C2A62',
      fontSize: '0.8rem',
      textAlign: 'center',
    },
    backButton: {
      marginTop: '1rem',
      padding: '0.8rem 1.5rem',
      backgroundColor: 'transparent',
      color: '#7C2A62',
      border: '2px solid #7C2A62',
      borderRadius: '25px',
      cursor: 'pointer',
      fontWeight: '600',
      transition: 'all 0.3s ease',
      width: '100%',
    }
  };

  const ADMIN_CREDENTIALS = {
    email: 'poornima@gmail.com',
    password: 'Poori@123'
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (credentials.email === ADMIN_CREDENTIALS.email && 
        credentials.password === ADMIN_CREDENTIALS.password) {
      
      const adminUser = {
        id: 1,
        name: 'Admin User',
        email: credentials.email,
        userType: 'admin',
        permissions: ['all']
      };
      
      onLoginSuccess(adminUser);
    } else {
      setError('Invalid email or password. Please try again.');
    }
  };

  const handleInputChange = (field, value) => {
    setCredentials(prev => ({
      ...prev,
      [field]: value
    }));
    if (error) setError('');
  };

  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modalContent}>
        <div style={styles.modalHeader}>
          <h2 style={styles.modalTitle}>Admin Access</h2>
          <button 
            style={styles.closeButton}
            onClick={onClose}
          >
            ×
          </button>
        </div>
        
        {error && (
          <div style={styles.errorMessage}>
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} style={styles.adminForm}>
          <div style={styles.formGroup}>
            <label style={styles.formLabel}>Admin Email</label>
            <input
              type="email"
              value={credentials.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="Enter admin email"
              style={styles.formInput}
              required
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.formLabel}>Password</label>
            <input
              type="password"
              value={credentials.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              placeholder="Enter admin password"
              style={styles.formInput}
              required
            />
          </div>
          <button 
            type="submit" 
            style={styles.adminLoginButton}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#5a1a4a';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#7C2A62';
            }}
          >
            Access Admin Panel
          </button>
        </form>
        
        <div style={styles.adminNote}>
          <p style={styles.securityText}>
            <strong>Note:</strong> This area is restricted to authorized personnel only. 
            Unauthorized access is prohibited.
          </p>
        </div>

        {/* <button 
          style={styles.backButton}
          onClick={onBackToHome}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#7C2A62';
            e.target.style.color = 'white';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = 'transparent';
            e.target.style.color = '#7C2A62';
          }}
        >
          ← Back to Home
        </button> */}
      </div>
    </div>
  );
};

export default AdminLoginModal;