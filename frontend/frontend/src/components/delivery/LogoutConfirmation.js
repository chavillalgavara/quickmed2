import React from 'react';

const LogoutConfirmation = ({ onConfirm, onCancel }) => {
  const styles = {
    modalOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    },
    logoutModal: {
      backgroundColor: 'white',
      borderRadius: '12px',
      padding: '0',
      width: '400px',
      maxWidth: '90vw',
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      border: '1px solid #E5E7EB'
    },
    logoutModalHeader: {
      padding: '24px 24px 0 24px',
      borderBottom: '1px solid #E5E7EB'
    },
    logoutModalTitle: {
      margin: '0',
      fontSize: '18px',
      fontWeight: '600',
      color: '#111827',
      textAlign: 'center'
    },
    logoutModalContent: {
      padding: '24px'
    },
    logoutModalText: {
      margin: '0',
      fontSize: '14px',
      color: '#6B7280',
      textAlign: 'center',
      lineHeight: '1.5'
    },
    logoutModalActions: {
      padding: '16px 24px 24px 24px',
      display: 'flex',
      gap: '12px',
      justifyContent: 'flex-end',
      borderTop: '1px solid #E5E7EB'
    },
    logoutCancelButton: {
      padding: '8px 16px',
      backgroundColor: 'white',
      color: '#374151',
      border: '1px solid #D1D5DB',
      borderRadius: '6px',
      fontSize: '14px',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'all 0.2s',
      minWidth: '80px'
    },
    logoutConfirmButton: {
      padding: '8px 16px',
      backgroundColor: '#7C2A62',
      color: 'white',
      border: 'none',
      borderRadius: '6px',
      fontSize: '14px',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'all 0.2s',
      minWidth: '100px'
    }
  };

  return (
    <div style={styles.modalOverlay}>
      <div style={styles.logoutModal}>
        <div style={styles.logoutModalHeader}>
          <h3 style={styles.logoutModalTitle}>Confirm Logout</h3>
        </div>
        <div style={styles.logoutModalContent}>
          <p style={styles.logoutModalText}>
            Are you sure you want to logout from your QuickMed account?
          </p>
        </div>
        <div style={styles.logoutModalActions}>
          <button
            style={styles.logoutCancelButton}
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            style={styles.logoutConfirmButton}
            onClick={onConfirm}
          >
            Yes, Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutConfirmation;