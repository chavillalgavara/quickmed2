import React, { useEffect } from 'react';

const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const getToastStyle = () => {
    const baseStyle = {
      position: 'fixed',
      top: '20px',
      right: '20px',
      padding: '12px 20px',
      borderRadius: '8px',
      color: 'white',
      fontWeight: '500',
      zIndex: 1002,
      minWidth: '250px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      animation: 'slideIn 0.3s ease-out'
    };

    switch (type) {
      case 'success':
        return { ...baseStyle, backgroundColor: '#10B981' };
      case 'error':
        return { ...baseStyle, backgroundColor: '#EF4444' };
      case 'warning':
        return { ...baseStyle, backgroundColor: '#F59E0B' };
      case 'info':
        return { ...baseStyle, backgroundColor: '#3B82F6' };
      default:
        return { ...baseStyle, backgroundColor: '#7C2A62' };
    }
  };

  const getToastIcon = () => {
    switch (type) {
      case 'success': return '✅';
      case 'error': return '❌';
      case 'warning': return '⚠️';
      case 'info': return 'ℹ️';
      default: return '💬';
    }
  };

  return (
    <div style={getToastStyle()}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span>{getToastIcon()}</span>
        <span>{message}</span>
      </div>
      <button
        onClick={onClose}
        style={{
          background: 'none',
          border: 'none',
          color: 'white',
          fontSize: '16px',
          cursor: 'pointer',
          marginLeft: '10px'
        }}
      >
        ✕
      </button>
    </div>
  );
};

export default Toast;