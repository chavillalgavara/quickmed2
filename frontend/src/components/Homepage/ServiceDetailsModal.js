import React from 'react';

const ServiceDetailsModal = ({ service, onClose, onBookService }) => {
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
      maxWidth: '600px',
      width: '100%',
      maxHeight: '90vh',
      overflowY: 'auto',
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
    serviceIcon: {
      textAlign: 'center',
      fontSize: '4rem',
      marginBottom: '1rem',
    },
    serviceDescription: {
      fontSize: '1.1rem',
      lineHeight: '1.6',
      color: '#333',
      textAlign: 'center',
      marginBottom: '2rem',
    },
    featuresList: {
      listStyle: 'none',
      padding: 0,
      margin: '0 0 2rem 0',
    },
    featureItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      marginBottom: '0.8rem',
      fontSize: '1rem',
    },
    checkIcon: {
      color: '#4CAF50',
      fontWeight: 'bold',
    },
    processSteps: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
      marginBottom: '2rem',
    },
    processStep: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      padding: '1rem',
      backgroundColor: '#F7D9EB',
      borderRadius: '10px',
    },
    stepNumber: {
      backgroundColor: '#7C2A62',
      color: 'white',
      width: '30px',
      height: '30px',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 'bold',
      flexShrink: 0,
    },
    stepText: {
      margin: 0,
      fontSize: '1rem',
    },
    bookButton: {
      width: '100%',
      padding: '1rem 2rem',
      backgroundColor: '#7C2A62',
      color: 'white',
      border: 'none',
      borderRadius: '25px',
      cursor: 'pointer',
      fontSize: '1.1rem',
      fontWeight: 'bold',
      transition: 'all 0.3s ease',
    }
  };

  const serviceDetails = {
    'Medicine Delivery': {
      description: 'Get your prescribed medicines delivered to your doorstep within 30-40 minutes with real-time tracking and temperature-controlled packaging.',
      features: [
        'Same-day delivery available',
        'Real-time order tracking',
        'Prescription verification',
        'Temperature-sensitive packaging',
        'Emergency delivery options'
      ],
      process: [
        'Upload your prescription',
        'Select medicines from verified pharmacies',
        'Track delivery in real-time',
        'Receive at your doorstep'
      ]
    },
    'Doctor Consultation': {
      description: 'Connect with certified doctors online for quick consultations and digital prescriptions from the comfort of your home.',
      features: [
        '24/7 doctor availability',
        'Video and audio consultations',
        'Digital prescriptions',
        'Follow-up consultations',
        'Specialist doctor access'
      ],
      process: [
        'Choose your preferred doctor',
        'Schedule appointment',
        'Connect via secure video call',
        'Receive digital prescription'
      ]
    }
  };

  const details = serviceDetails[service.title] || {};

  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modalContent}>
        <div style={styles.modalHeader}>
          <h2 style={styles.modalTitle}>{service.title}</h2>
          <button 
            style={styles.closeButton}
            onClick={onClose}
          >
            ×
          </button>
        </div>
        
        <div style={styles.serviceIcon}>{service.icon}</div>
        <p style={styles.serviceDescription}>{details.description}</p>
        
        <div>
          <h3 style={{color: '#7C2A62', marginBottom: '1rem'}}>Key Features</h3>
          <ul style={styles.featuresList}>
            {details.features?.map((feature, index) => (
              <li key={index} style={styles.featureItem}>
                <span style={styles.checkIcon}>✓</span>
                {feature}
              </li>
            ))}
          </ul>
        </div>
        
        <div>
          <h3 style={{color: '#7C2A62', marginBottom: '1rem'}}>How It Works</h3>
          <div style={styles.processSteps}>
            {details.process?.map((step, index) => (
              <div key={index} style={styles.processStep}>
                <div style={styles.stepNumber}>{index + 1}</div>
                <p style={styles.stepText}>{step}</p>
              </div>
            ))}
          </div>
        </div>
        
        <button 
          style={styles.bookButton}
          onClick={onBookService}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#5a1a4a';
            e.target.style.transform = 'scale(1.02)';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = '#7C2A62';
            e.target.style.transform = 'scale(1)';
          }}
        >
          Book This Service
        </button>
      </div>
    </div>
  );
};

export default ServiceDetailsModal;