import React from 'react';

const PharmacyCard = ({ 
  pharmacy, 
  onViewStore,
  viewPharmacyStore,
  handlePharmacySearch, 
  pharmacySearchQueries,
  startDoctorChat 
}) => {
  // Safe access to pharmacy properties with fallbacks
  const {
    id = Math.random(),
    name = 'Unknown Pharmacy',
    distance = 'N/A',
    deliveryTime = 'N/A',
    rating = 0,
    medicines = []
  } = pharmacy || {};

  // Enhanced handleViewStore with scroll to top
  const handleViewStore = () => {
    // Scroll to top first
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
    
    // Then open the pharmacy store with a small delay
    setTimeout(() => {
      if (onViewStore) {
        onViewStore(pharmacy);
      } else if (viewPharmacyStore) {
        viewPharmacyStore(pharmacy);
      }
    }, 100);
  };

  return (
    <div key={id} style={{
      border: '2px solid #F7D9EB',
      borderRadius: '12px',
      padding: '1.5rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      backgroundColor: 'white'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '1rem'
      }}>
        <div style={{
          fontSize: '2rem',
          width: '50px',
          height: '50px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#F7D9EB',
          borderRadius: '10px'
        }}>🏪</div>
        <div style={{
          flex: 1
        }}>
          <h3 style={{
            margin: '0 0 0.25rem 0',
            color: '#7C2A62',
            fontSize: '1.1rem',
            fontWeight: '600'
          }}>{name}</h3>
          <div style={{
            color: '#FFD700',
            fontWeight: 'bold',
            fontSize: '0.9rem'
          }}>
            <span>⭐ {rating || 'N/A'}</span>
          </div>
        </div>
      </div>
      
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <span style={{
            color: '#666',
            fontSize: '0.9rem',
            fontWeight: '500'
          }}>Distance:</span>
          <span style={{
            color: '#333',
            fontSize: '0.9rem',
            fontWeight: '600'
          }}>{distance}</span>
        </div>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <span style={{
            color: '#666',
            fontSize: '0.9rem',
            fontWeight: '500'
          }}>Delivery Time:</span>
          <span style={{
            color: '#333',
            fontSize: '0.9rem',
            fontWeight: '600'
          }}>{deliveryTime}</span>
        </div>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <span style={{
            color: '#666',
            fontSize: '0.9rem',
            fontWeight: '500'
          }}>Medicines Available:</span>
          <span style={{
            color: '#7C2A62',
            fontWeight: 'bold',
            fontSize: '1rem',
          }}>{medicines.length}</span>
        </div>
      </div>
      
      {/* Search Bar for Individual Pharmacy */}
      {handlePharmacySearch && (
        <div style={{
          margin: '0.5rem 0',
        }}>
          <input
            type="text"
            placeholder={`Search medicines in ${name}...`}
            value={pharmacySearchQueries?.[id] || ''}
            onChange={(e) => handlePharmacySearch(id, e.target.value)}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #F7D9EB',
              borderRadius: '8px',
              fontSize: '0.9rem',
            }}
          />
        </div>
      )}
      
      <button 
        style={{
          padding: '0.75rem 1.5rem',
          backgroundColor: 'transparent',
          color: '#7C2A62',
          border: '2px solid #7C2A62',
          borderRadius: '10px',
          cursor: 'pointer',
          fontWeight: '600',
          fontSize: '0.95rem',
          transition: 'all 0.3s ease',
          marginTop: '1rem',
          width: '100%',
          textTransform: 'none',
          letterSpacing: '0.5px',
          position: 'relative',
          overflow: 'hidden',
        }}
        onClick={handleViewStore}
        type="button"
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = '#7C2A62';
          e.target.style.color = 'white';
          e.target.style.transform = 'translateY(-2px)';
          e.target.style.boxShadow = '0 4px 15px rgba(124, 42, 98, 0.4)';
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = 'transparent';
          e.target.style.color = '#7C2A62';
          e.target.style.transform = 'translateY(0)';
          e.target.style.boxShadow = 'none';
        }}
      >
        View Store
      </button>
    </div>
  );
};

export default PharmacyCard;