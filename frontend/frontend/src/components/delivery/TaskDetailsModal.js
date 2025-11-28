import React from 'react';

const TaskDetailsModal = ({ task, onClose, onAccept, onStatusUpdate }) => {
  // Safe access to all task properties with fallbacks
  const safeTask = task || {};
  const medicines = safeTask.medicines || [];
  const orderId = safeTask.orderId || 'N/A';
  const customerName = safeTask.customerName || 'N/A';
  const pharmacyLocation = safeTask.pharmacyLocation || 'N/A';
  const deliveryLocation = safeTask.deliveryLocation || 'N/A';
  const estimatedTime = safeTask.estimatedTime || 'N/A';
  const distance = safeTask.distance || 'N/A';
  const amount = safeTask.amount || 0;
  const tip = safeTask.tip || 0;
  const instructions = safeTask.instructions || 'No special instructions';
  const priority = safeTask.priority || 'Medium';
  const status = safeTask.status || 'pending';

  const modalStyles = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
    },
    modal: {
      backgroundColor: 'white',
      borderRadius: '12px',
      padding: '24px',
      maxWidth: '500px',
      width: '90%',
      maxHeight: '80vh',
      overflow: 'auto',
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '20px',
      borderBottom: '1px solid #e5e7eb',
      paddingBottom: '16px',
    },
    title: {
      fontSize: '20px',
      fontWeight: '600',
      margin: 0,
      color: '#1f2937',
    },
    closeButton: {
      backgroundColor: 'transparent',
      border: 'none',
      fontSize: '24px',
      cursor: 'pointer',
      color: '#6b7280',
      padding: '4px',
      borderRadius: '4px',
      ':hover': {
        backgroundColor: '#f3f4f6',
      }
    },
    content: {
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
    },
    section: {
      marginBottom: '16px',
    },
    sectionTitle: {
      fontSize: '16px',
      fontWeight: '600',
      margin: '0 0 12px 0',
      color: '#374151',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    },
    medicineList: {
      listStyle: 'none',
      padding: 0,
      margin: 0,
    },
    medicineItem: {
      padding: '8px 12px',
      backgroundColor: '#f8f9fa',
      borderRadius: '6px',
      marginBottom: '8px',
      fontSize: '14px',
      color: '#374151',
      borderLeft: '3px solid #7C2A62',
    },
    noData: {
      fontSize: '14px',
      color: '#6b7280',
      fontStyle: 'italic',
      textAlign: 'center',
      padding: '20px',
      backgroundColor: '#f9fafb',
      borderRadius: '6px',
    },
    infoGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '12px',
      marginBottom: '16px',
    },
    infoItem: {
      display: 'flex',
      flexDirection: 'column',
      gap: '4px',
    },
    infoLabel: {
      fontSize: '12px',
      color: '#6b7280',
      fontWeight: '500',
    },
    infoValue: {
      fontSize: '14px',
      color: '#374151',
      fontWeight: '500',
    },
    priorityBadge: {
      display: 'inline-block',
      padding: '4px 8px',
      borderRadius: '12px',
      fontSize: '12px',
      fontWeight: '500',
      color: 'white',
    },
    statusBadge: {
      display: 'inline-block',
      padding: '4px 8px',
      borderRadius: '12px',
      fontSize: '12px',
      fontWeight: '500',
      color: 'white',
    },
    instructions: {
      backgroundColor: '#f0fdf4',
      padding: '12px',
      borderRadius: '6px',
      border: '1px solid #bbf7d0',
      fontSize: '14px',
      color: '#065f46',
      lineHeight: '1.4',
    },
    actions: {
      display: 'flex',
      gap: '12px',
      justifyContent: 'flex-end',
      marginTop: '20px',
      paddingTop: '16px',
      borderTop: '1px solid #e5e7eb',
    },
    primaryButton: {
      backgroundColor: '#7C2A62',
      color: 'white',
      border: 'none',
      padding: '10px 16px',
      borderRadius: '6px',
      fontSize: '14px',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
    },
    secondaryButton: {
      backgroundColor: 'transparent',
      color: '#7C2A62',
      border: '1px solid #7C2A62',
      padding: '9px 15px',
      borderRadius: '6px',
      fontSize: '14px',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
    },
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return '#EF4444';
      case 'Medium': return '#F59E0B';
      case 'Low': return '#10B981';
      default: return '#6B7280';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return '#F59E0B';
      case 'assigned': return '#3B82F6';
      case 'pickup_reached': return '#8B5CF6';
      case 'pickup_completed': return '#7C2A62';
      case 'delivery_reached': return '#F59E0B';
      case 'delivery_completed': return '#10B981';
      case 'cancelled': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const formatIndianCurrency = (amount) => {
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  return (
    <div style={modalStyles.overlay}>
      <div style={modalStyles.modal}>
        <div style={modalStyles.header}>
          <h2 style={modalStyles.title}>Order Details - {orderId}</h2>
          <button 
            style={modalStyles.closeButton} 
            onClick={onClose}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#f3f4f6'}
            onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
          >
            ×
          </button>
        </div>
        
        <div style={modalStyles.content}>
          {/* Order Information */}
          <div style={modalStyles.infoGrid}>
            <div style={modalStyles.infoItem}>
              <span style={modalStyles.infoLabel}>Customer</span>
              <span style={modalStyles.infoValue}>{customerName}</span>
            </div>
            <div style={modalStyles.infoItem}>
              <span style={modalStyles.infoLabel}>Priority</span>
              <span 
                style={{
                  ...modalStyles.priorityBadge,
                  backgroundColor: getPriorityColor(priority)
                }}
              >
                {priority}
              </span>
            </div>
            <div style={modalStyles.infoItem}>
              <span style={modalStyles.infoLabel}>Status</span>
              <span 
                style={{
                  ...modalStyles.statusBadge,
                  backgroundColor: getStatusColor(status)
                }}
              >
                {status.replace('_', ' ').toUpperCase()}
              </span>
            </div>
            <div style={modalStyles.infoItem}>
              <span style={modalStyles.infoLabel}>Amount</span>
              <span style={modalStyles.infoValue}>
                {formatIndianCurrency(amount)}
                {tip > 0 && (
                  <span style={{color: '#10B981', marginLeft: '8px'}}>
                    + {formatIndianCurrency(tip)} tip
                  </span>
                )}
              </span>
            </div>
          </div>

          {/* Medicine Details Section */}
          <div style={modalStyles.section}>
            <h3 style={modalStyles.sectionTitle}>
              💊 Medicine Details
            </h3>
            {medicines.length > 0 ? (
              <ul style={modalStyles.medicineList}>
                {medicines.map((medicine, index) => (
                  <li key={index} style={modalStyles.medicineItem}>
                    {medicine}
                  </li>
                ))}
              </ul>
            ) : (
              <div style={modalStyles.noData}>
                No medicine details available
              </div>
            )}
          </div>

          {/* Locations */}
          <div style={modalStyles.section}>
            <h3 style={modalStyles.sectionTitle}>📍 Locations</h3>
            <div style={modalStyles.infoGrid}>
              <div style={modalStyles.infoItem}>
                <span style={modalStyles.infoLabel}>Pharmacy</span>
                <span style={modalStyles.infoValue}>{pharmacyLocation}</span>
              </div>
              <div style={modalStyles.infoItem}>
                <span style={modalStyles.infoLabel}>Delivery</span>
                <span style={modalStyles.infoValue}>{deliveryLocation}</span>
              </div>
            </div>
          </div>

          {/* Delivery Information */}
          <div style={modalStyles.section}>
            <h3 style={modalStyles.sectionTitle}>🚚 Delivery Info</h3>
            <div style={modalStyles.infoGrid}>
              <div style={modalStyles.infoItem}>
                <span style={modalStyles.infoLabel}>Estimated Time</span>
                <span style={modalStyles.infoValue}>{estimatedTime}</span>
              </div>
              <div style={modalStyles.infoItem}>
                <span style={modalStyles.infoLabel}>Distance</span>
                <span style={modalStyles.infoValue}>{distance}</span>
              </div>
            </div>
          </div>

          {/* Instructions */}
          {instructions && instructions !== 'No special instructions' && (
            <div style={modalStyles.section}>
              <h3 style={modalStyles.sectionTitle}>📝 Instructions</h3>
              <div style={modalStyles.instructions}>
                {instructions}
              </div>
            </div>
          )}

          {/* Actions */}
          <div style={modalStyles.actions}>
            <button 
              style={modalStyles.secondaryButton}
              onClick={onClose}
            >
              Close
            </button>
            {onAccept && status === 'pending' && (
              <button 
                style={modalStyles.primaryButton}
                onClick={() => onAccept(safeTask)}
              >
                Accept Delivery
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailsModal;