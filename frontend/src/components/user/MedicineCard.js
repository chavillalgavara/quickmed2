import React from 'react';

const MedicineCard = ({ medicine, cart, addToCart, updateQuantity }) => {
  const cartItem = cart.find(item => item.id === medicine.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  // Enhanced add to cart handler with scroll to top
  const handleAddToCart = (med) => {
    // Scroll to top first
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // Then add to cart after a small delay to ensure scroll completes
    setTimeout(() => {
      addToCart(med);
    }, 100);
  };

  // Enhanced update quantity handler with scroll to top
  const handleUpdateQuantity = (id, newQuantity) => {
    // Scroll to top first
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // Then update quantity after a small delay to ensure scroll completes
    setTimeout(() => {
      updateQuantity(id, newQuantity);
    }, 100);
  };

  return (
    <div style={{
      border: '2px solid #F7D9EB',
      borderRadius: '12px',
      padding: '1.5rem',
      display: 'flex',
      flexDirection: 'column',
      transition: 'all 0.3s ease',
      backgroundColor: 'white',
    }}>
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
      }}>
        <h4 style={{
          margin: '0 0 0.5rem 0',
          color: '#7C2A62',
          fontSize: '1.1rem',
          fontWeight: '600',
        }}>{medicine.name}</h4>
        <p style={{
          margin: '0 0 0.5rem 0',
          color: '#666',
          fontSize: '0.9rem',
        }}>{medicine.vendor}</p>
        <div style={{
          marginBottom: '1rem',
        }}>
          <span style={{
            padding: '0.25rem 0.75rem',
            backgroundColor: '#F7D9EB',
            color: '#7C2A62',
            borderRadius: '12px',
            fontSize: '0.8rem',
            fontWeight: '500',
          }}>{medicine.category}</span>
        </div>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 'auto',
        }}>
          <p style={{
            color: '#7C2A62',
            fontWeight: 'bold',
            fontSize: '1.2rem',
            margin: 0,
          }}>₹{medicine.price}</p>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}>
            {quantity > 0 ? (
              <>
                <button 
                  style={{
                    width: '32px',
                    height: '32px',
                    border: '1px solid #7C2A62',
                    backgroundColor: 'transparent',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  onClick={() => handleUpdateQuantity(medicine.id, quantity - 1)}
                  type="button"
                >
                  −
                </button>
                <span style={{
                  padding: '0 0.5rem',
                  fontWeight: '600',
                  minWidth: '30px',
                  textAlign: 'center',
                }}>{quantity}</span>
                <button 
                  style={{
                    width: '32px',
                    height: '32px',
                    border: '1px solid #7C2A62',
                    backgroundColor: 'transparent',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  onClick={() => handleUpdateQuantity(medicine.id, quantity + 1)}
                  type="button"
                >
                  +
                </button>
              </>
            ) : (
              <button 
                style={{
                  padding: '0.75rem 1rem',
                  backgroundColor: '#7C2A62',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  fontSize: '0.9rem',
                  transition: 'all 0.3s ease',
                }}
                onClick={() => handleAddToCart(medicine)}
                type="button"
              >
                Add to Cart
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicineCard;