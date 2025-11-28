import React, { useEffect } from 'react';
import MedicineCard from './MedicineCard';
import PharmacyCard from './PharmacyCard';

const MedicineView = ({ 
  searchQuery, 
  setSearchQuery, 
  filteredMedicines, 
  pharmacies, 
  setActiveView, 
  addToCart, 
  updateQuantity, 
  cart, 
  handlePrescriptionUpload, 
  viewPharmacyStore,
  handlePharmacySearch,
  pharmacySearchQueries,
  startDoctorChat 
}) => {
  
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Safe access to pharmacies array
  const safePharmacies = Array.isArray(pharmacies) ? pharmacies : [];

  // Enhanced navigation handler that scrolls to top
  const handleBackToDashboard = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      setActiveView('dashboard');
    }, 100);
  };

  const BackButton = ({ onClick, text = 'Back' }) => (
    <button 
      style={{
        padding: '0.5rem 1rem',
        backgroundColor: 'transparent',
        color: '#7C2A62',
        border: '1px solid #7C2A62',
        borderRadius: '6px',
        cursor: 'pointer',
        fontSize: '0.9rem',
      }}
      onClick={onClick}
      type="button"
    >
      ← {text}
    </button>
  );

  return (
    <div style={{
      padding: '2rem',
      maxWidth: '1200px',
      margin: '140px auto 0',
      minHeight: 'calc(100vh - 140px)',
    }}>
      {/* Header with Back Button */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        marginBottom: '2rem',
      }}>
        <BackButton onClick={handleBackToDashboard} text="" />
        <h2 style={{
          color: '#7C2A62',
          fontSize: '1.5rem',
          margin: 0,
        }}>Medicine Delivery</h2>
      </div>

      <div style={{
        width: '100%',
      }}>
        {/* Search and Prescription Section */}
        <section style={{
          backgroundColor: 'white',
          padding: '1.5rem',
          borderRadius: '15px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          marginBottom: '1.5rem',
        }}>
          <div style={{
            display: 'flex',
            gap: '0.75rem',
            marginBottom: '0',
            position: 'relative',
            alignItems: 'flex-start', // Changed to flex-start for proper alignment
            justifyContent: 'space-between'
          }}>
            {/* Combined Search Bar and Search Button Group with gap */}
            <div style={{
              display: 'flex',
              gap: '0.5rem',
              alignItems: 'center',
              flex: '0 1 auto'
            }}>
              <input
                type="text"
                placeholder="Search for medicines, vendors, or categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '700px',
                  padding: '0.5rem 0.75rem',
                  border: '2px solid #F7D9EB',
                  borderRadius: '8px',
                  fontSize: '0.9rem',
                  transition: 'border-color 0.3s ease',
                  height: '38px'
                }}
              />
            </div>
            
            {/* Prescription Upload Button with supported formats below */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
              gap: '0.25rem'
            }}>
              <label style={{
                padding: '0.5rem 1.25rem',
                backgroundColor: '#4CAF50',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '0.9rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                height: '38px',
                whiteSpace: 'nowrap',
                transition: 'all 0.3s ease',
              }}>
                <span style={{ fontSize: '0.9rem' }}>📄</span>
                Upload Prescription
                <input
                  type="file"
                  id="prescription-upload"
                  accept=".jpg,.jpeg,.png,.pdf"
                  onChange={handlePrescriptionUpload}
                  style={{ display: 'none' }}
                />
              </label>
              {/* Supported formats text positioned under the button */}
              <p style={{
                color: '#666',
                fontSize: '0.75rem',
                margin: 0,
                fontStyle: 'italic',
                textAlign: 'right',
                whiteSpace: 'nowrap'
              }}>Supported formats: JPG, PNG, PDF (Max 5MB)</p>
            </div>
          </div>
        </section>

        {/* Medicines Section */}
        <section style={{
          backgroundColor: 'white',
          padding: '2rem',
          borderRadius: '15px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          marginBottom: '1.5rem',
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1.5rem',
          }}>
            <h3 style={{
              color: '#7C2A62',
              fontSize: '1.5rem',
              margin: 0,
            }}>Available Medicines</h3>
            <p style={{
              color: '#666',
              fontSize: '0.9rem',
            }}>{filteredMedicines.length} products found</p>
          </div>
          
          {filteredMedicines.length > 0 ? (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '1.5rem',
            }}>
              {filteredMedicines.map(medicine => (
                <MedicineCard 
                  key={medicine.id} 
                  medicine={medicine}
                  cart={cart}
                  addToCart={addToCart}
                  updateQuantity={updateQuantity}
                />
              ))}
            </div>
          ) : (
            <div style={{
              textAlign: 'center',
              padding: '3rem 1rem',
              color: '#666',
            }}>
              <p>No medicines found matching your search.</p>
              <p style={{
                color: '#999',
                fontSize: '0.9rem',
                marginTop: '0.5rem',
              }}>Try different keywords or check the pharmacies section.</p>
            </div>
          )}
        </section>

        {/* Pharmacies Section */}
        <section style={{
          backgroundColor: 'white',
          padding: '2rem',
          borderRadius: '15px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1.5rem',
          }}>
            <h3 style={{
              color: '#7C2A62',
              fontSize: '1.5rem',
              margin: 0,
            }}>Nearby Medical Shops</h3>
            <p style={{
              color: '#666',
              fontSize: '0.9rem',
              margin: 0,
            }}>Fast delivery from trusted pharmacies</p>
          </div>
          
          {safePharmacies.length > 0 ? (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '1.5rem'
            }}>
              {safePharmacies.map((pharmacy, index) => (
                <PharmacyCard
                  key={pharmacy?.id || index}
                  pharmacy={pharmacy}
                  viewPharmacyStore={viewPharmacyStore}
                  handlePharmacySearch={handlePharmacySearch}
                  pharmacySearchQueries={pharmacySearchQueries}
                  startDoctorChat={startDoctorChat}
                />
              ))}
            </div>
          ) : (
            <div style={{
              textAlign: 'center',
              padding: '3rem 1rem',
              color: '#666',
            }}>
              <p>No pharmacies found nearby.</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default MedicineView;