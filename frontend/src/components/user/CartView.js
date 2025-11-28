import React, { useState, useEffect } from 'react';

const CartView = ({
  cart,
  setActiveView,
  updateQuantity,
  removeFromCart,
  getTotalPrice,
  handleCheckoutConfirmation,
  paymentLoading
}) => {
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [address, setAddress] = useState({
    fullName: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    pincode: '',
    landmark: ''
  });

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Enhanced back button handler
  const handleBackToMedicines = () => {
    setActiveView('medicine');
  };

  // Address form toggle without scroll
  const handleAddressFormToggle = (show) => {
    setShowAddressForm(show);
  };

  const BackButton = ({ onClick, text = 'Back' }) => (
    <button 
      style={{
        padding: '0.5rem 1rem',
        backgroundColor: 'transparent',
        color: '#7C2A62',
        border: '2px solid #7C2A62',
        borderRadius: '8px',
        cursor: 'pointer',
        fontSize: '0.9rem',
        fontWeight: '600',
        transition: 'all 0.3s ease',
      }}
      onClick={onClick}
      type="button"
      onMouseEnter={(e) => {
        e.target.style.backgroundColor = '#7C2A62';
        e.target.style.color = 'white';
      }}
      onMouseLeave={(e) => {
        e.target.style.backgroundColor = 'transparent';
        e.target.style.color = '#7C2A62';
      }}
    >
      ← {text}
    </button>
  );

  // Format numbers with commas for Indian numbering system
  const formatIndianNumber = (number) => {
    return new Intl.NumberFormat('en-IN').format(number);
  };

  // Input validation functions
  const validateFullName = (value) => {
    // Only allow alphabets and spaces
    return value.replace(/[^a-zA-Z\s]/g, '');
  };

  const validatePhone = (value) => {
    // Only allow numbers 6,7,8,9 and limit to 10 digits
    const numbersOnly = value.replace(/[^0-9]/g, '');
    // Filter only numbers starting with 6,7,8,9
    const validNumbers = numbersOnly.split('').filter((char, index) => {
      if (index === 0) {
        return ['6','7','8','9'].includes(char);
      }
      return true;
    }).join('');
    
    return validNumbers.slice(0, 10);
  };

  const validateCity = (value) => {
    // Only allow alphabets and spaces
    return value.replace(/[^a-zA-Z\s]/g, '');
  };

  const validateState = (value) => {
    // Only allow alphabets and spaces
    return value.replace(/[^a-zA-Z\s]/g, '');
  };

  const validatePincode = (value) => {
    // Only allow numbers and limit to 6 digits
    return value.replace(/[^0-9]/g, '').slice(0, 6);
  };

  // Handle address form input changes with validation
  const handleAddressChange = (field, value) => {
    let validatedValue = value;

    switch (field) {
      case 'fullName':
        validatedValue = validateFullName(value);
        break;
      case 'phone':
        validatedValue = validatePhone(value);
        break;
      case 'city':
        validatedValue = validateCity(value);
        break;
      case 'state':
        validatedValue = validateState(value);
        break;
      case 'pincode':
        validatedValue = validatePincode(value);
        break;
      default:
        validatedValue = value;
    }

    setAddress(prev => ({
      ...prev,
      [field]: validatedValue
    }));
  };

  // Validate address form
  const validateAddress = () => {
    const { fullName, phone, street, city, state, pincode } = address;
    if (!fullName.trim()) return 'Please enter full name';
    if (!phone.trim() || phone.length !== 10) return 'Please enter valid 10-digit phone number';
    if (!street.trim()) return 'Please enter street address';
    if (!city.trim()) return 'Please enter city';
    if (!state.trim()) return 'Please enter state';
    if (!pincode.trim() || pincode.length !== 6) return 'Please enter valid 6-digit pincode';
    return null;
  };

  // Handle checkout process
  const handleCheckout = async () => {
    if (!showAddressForm) {
      // First step: Show address form
      handleAddressFormToggle(true);
      return;
    }

    // Second step: Validate address and proceed to payment
    const validationError = validateAddress();
    if (validationError) {
      alert(validationError);
      return;
    }

    // Proceed with payment
    await handleCheckoutConfirmation(address);
  };

  return (
    <div style={{
      marginTop: '120px',
      padding: '1.5rem',
      maxWidth: '1400px',
      marginLeft: 'auto',
      marginRight: 'auto',
      minHeight: '80vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}>
      {/* Header Section - Compact */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.75rem',
        marginBottom: '2rem',
        textAlign: 'center',
        width: '100%',
        position: 'relative',
      }}>
        {/* Back Button - Left Edge */}
        <div style={{
          position: 'absolute',
          left: 0,
          top: '50%',
          marginTop: '1.5rem',
          transform: 'translateY(-50%)',
        }}>
          <BackButton onClick={handleBackToMedicines} text="Back to Medicines" />
        </div>
        
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          justifyContent: 'center',
          width: '100%',
        }}>
          <h2 style={{
            color: '#7C2A62',
            fontSize: '2rem',
            margin: 0,
            marginTop: '1.5rem',
            fontWeight: '800',
            background: 'linear-gradient(135deg, #7C2A62, #E91E63)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>Your Shopping Cart</h2>
        </div>
        
        {/* Cart Summary Stats - Compact */}
        {cart.length > 0 && (
          <div style={{
            display: 'flex',
            gap: '1.5rem',
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginTop: '0.5rem',
          }}>
            <div style={{
              backgroundColor: 'white',
              padding: '0.75rem 1.5rem',
              borderRadius: '10px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              border: '1px solid #F7D9EB',
              textAlign: 'center',
            }}>
              <div style={{
                color: '#7C2A62',
                fontSize: '1.4rem',
                fontWeight: '800',
                marginBottom: '0.25rem',
              }}>
                {cart.length}
              </div>
              <div style={{
                color: '#666',
                fontSize: '0.8rem',
                fontWeight: '600',
              }}>
                📦 Items
              </div>
            </div>
            
            <div style={{
              backgroundColor: 'white',
              padding: '0.75rem 1.5rem',
              borderRadius: '10px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              border: '1px solid #F7D9EB',
              textAlign: 'center',
            }}>
              <div style={{
                color: '#4CAF50',
                fontSize: '1.4rem',
                fontWeight: '800',
                marginBottom: '0.25rem',
              }}>
                ₹{formatIndianNumber(getTotalPrice())}
              </div>
              <div style={{
                color: '#666',
                fontSize: '0.8rem',
                fontWeight: '600',
              }}>
                💰 Total
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Main Content - Side by Side Layout */}
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
        width: '100%',
        maxWidth: '1300px',
        gap: '2rem',
        flexWrap: 'wrap',
      }}>
        {cart.length === 0 ? (
          /* Empty Cart State - Compact */
          <div style={{
            backgroundColor: 'white',
            padding: '3rem 2rem',
            borderRadius: '15px',
            boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
            border: '1px solid #F7D9EB',
            textAlign: 'center',
            width: '100%',
            maxWidth: '500px',
          }}>
            <div style={{
              fontSize: '4rem',
              marginBottom: '1.5rem',
              opacity: 0.7,
              animation: 'pulse 2s infinite'
            }}>🛒</div>
            <h3 style={{
              margin: '0 0 0.75rem 0',
              fontSize: '1.5rem',
              fontWeight: '700',
              color: '#7C2A62'
            }}>Your cart is empty</h3>
            <p style={{
              margin: '0 0 2rem 0',
              fontSize: '1rem',
              color: '#666',
              lineHeight: '1.5'
            }}>Looks like you haven't added any medicines to your cart yet.</p>
            <button 
              style={{
                padding: '1rem 2.5rem',
                backgroundColor: '#7C2A62',
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: '700',
                transition: 'all 0.3s ease',
                boxShadow: '0 2px 8px rgba(124, 42, 98, 0.3)',
              }}
              onClick={handleBackToMedicines}
              type="button"
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#6a2460';
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 4px 12px rgba(124, 42, 98, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#7C2A62';
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 2px 8px rgba(124, 42, 98, 0.3)';
              }}
            >
              🏥 Shop Medicines Now
            </button>
          </div>
        ) : (
          /* Cart with Items - Side by Side Layout */
          <>
            {/* Cart Items Box - Left Side */}
            <div style={{
              backgroundColor: 'white',
              padding: '2rem',
              borderRadius: '15px',
              boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
              border: '1px solid #F7D9EB',
              flex: '1 1 600px',
              minWidth: '300px',
              maxWidth: '800px',
            }}>
              <div style={{
                borderBottom: '2px solid #F7D9EB',
                paddingBottom: '1rem',
                marginBottom: '1.5rem',
                textAlign: 'center',
              }}>
                <h3 style={{
                  margin: '0 0 0.25rem 0',
                  color: '#7C2A62',
                  fontSize: '1.5rem',
                  fontWeight: '800',
                }}>🛒 Cart Items ({cart.length})</h3>
                <p style={{
                  margin: 0,
                  color: '#666',
                  fontSize: '0.9rem',
                  fontWeight: '500',
                }}>Review your items before checkout</p>
              </div>
              
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                maxHeight: '600px',
                overflowY: 'auto',
                paddingRight: '0.5rem',
              }}>
                {cart.map(item => (
                  <div key={item.id} style={{
                    display: 'grid',
                    gridTemplateColumns: '2fr 1fr 1fr auto',
                    alignItems: 'center',
                    gap: '1rem',
                    padding: '1.25rem',
                    border: '1px solid #F7D9EB',
                    borderRadius: '12px',
                    backgroundColor: '#fafafa',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
                    e.currentTarget.style.borderColor = '#7C2A62';
                    e.currentTarget.style.transform = 'translateY(-1px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.borderColor = '#F7D9EB';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}>
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                    }}>
                      <h4 style={{
                        margin: '0 0 0.25rem 0',
                        fontSize: '1rem',
                        color: '#7C2A62',
                        fontWeight: '700'
                      }}>💊 {item.name}</h4>
                      <p style={{
                        margin: '0 0 0.25rem 0',
                        fontSize: '0.8rem',
                        color: '#666',
                        fontWeight: '500'
                      }}>🏢 {item.vendor}</p>
                      <p style={{
                        margin: 0,
                        fontSize: '0.85rem',
                        color: '#7C2A62',
                        fontWeight: '600'
                      }}>₹{formatIndianNumber(item.price)} each</p>
                    </div>
                    
                    {/* Quantity Controls */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      justifyContent: 'center',
                    }}>
                      <button 
                        style={{
                          width: '35px',
                          height: '35px',
                          border: '2px solid #7C2A62',
                          backgroundColor: item.quantity <= 1 ? '#f8f5ff' : 'transparent',
                          borderRadius: '6px',
                          cursor: item.quantity <= 1 ? 'not-allowed' : 'pointer',
                          fontSize: '1rem',
                          fontWeight: 'bold',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          transition: 'all 0.3s ease',
                          color: item.quantity <= 1 ? '#ccc' : '#7C2A62',
                        }}
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        type="button"
                        disabled={item.quantity <= 1}
                      >
                        −
                      </button>
                      <span style={{
                          padding: '0.4rem 0.8rem',
                          fontWeight: '700',
                          minWidth: '35px',
                          textAlign: 'center',
                          backgroundColor: '#7C2A62',
                          color: 'white',
                          borderRadius: '6px',
                          fontSize: '0.9rem',
                        }}>{item.quantity}</span>
                      <button 
                        style={{
                          width: '35px',
                          height: '35px',
                          border: '2px solid #7C2A62',
                          backgroundColor: 'transparent',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontSize: '1rem',
                          fontWeight: 'bold',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          transition: 'all 0.3s ease',
                          color: '#7C2A62',
                        }}
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        type="button"
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor = '#7C2A62';
                          e.target.style.color = 'white';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor = 'transparent';
                          e.target.style.color = '#7C2A62';
                        }}
                      >
                        +
                      </button>
                    </div>
                    
                    {/* Item Total */}
                    <div style={{
                      fontWeight: '800',
                      color: '#7C2A62',
                      fontSize: '1.1rem',
                      textAlign: 'center',
                      backgroundColor: '#f8f5ff',
                      padding: '0.6rem 0.8rem',
                      borderRadius: '8px',
                      border: '1px solid #F7D9EB',
                    }}>
                      ₹{formatIndianNumber(item.price * item.quantity)}
                    </div>
                    
                    {/* Remove Button */}
                    <button 
                      style={{
                        width: '40px',
                        height: '40px',
                        border: 'none',
                        backgroundColor: '#ff4444',
                        color: 'white',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontSize: '1.2rem',
                        fontWeight: 'bold',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.3s ease',
                        boxShadow: '0 1px 4px rgba(255, 68, 68, 0.3)',
                      }}
                      onClick={() => removeFromCart(item.id)}
                      title="Remove item"
                      type="button"
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = '#cc0000';
                        e.target.style.transform = 'scale(1.05)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = '#ff4444';
                        e.target.style.transform = 'scale(1)';
                      }}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary Box - Right Side */}
            <div style={{
              backgroundColor: 'white',
              padding: '2rem',
              borderRadius: '15px',
              boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
              border: '1px solid #F7D9EB',
              flex: '0 1 400px',
              minWidth: '350px',
              position: 'sticky',
              top: '140px',
            }}>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem'
              }}>
                <h3 style={{
                  color: '#7C2A62',
                  fontSize: '1.5rem',
                  margin: 0,
                  textAlign: 'center',
                  fontWeight: '800',
                  borderBottom: '2px solid #F7D9EB',
                  paddingBottom: '0.75rem',
                }}>💰 Order Summary</h3>
                
                {showAddressForm && (
                  <div style={{
                    marginBottom: '1rem',
                    padding: '1.25rem',
                    backgroundColor: '#f8f5ff',
                    borderRadius: '12px',
                    border: '1px solid #F7D9EB',
                  }}>
                    <h4 style={{
                      margin: '0 0 1rem 0',
                      fontSize: '1.1rem',
                      fontWeight: '700',
                      color: '#7C2A62',
                      textAlign: 'center',
                    }}>🏠 Delivery Address</h4>
                    
                    {/* Full Name & Phone Number - Same Row */}
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: '0.75rem',
                      marginBottom: '0.75rem'
                    }}>
                      <div>
                        <label style={{
                          display: 'block',
                          fontSize: '0.8rem',
                          fontWeight: '600',
                          color: '#7C2A62',
                          marginBottom: '0.25rem',
                          marginLeft: '0.25rem'
                        }}>
                          Full Name *
                        </label>
                        <input
                          type="text"
                          placeholder="Enter full name"
                          value={address.fullName}
                          onChange={(e) => handleAddressChange('fullName', e.target.value)}
                          style={{
                            width: '100%',
                            padding: '0.75rem',
                            border: '1px solid #F7D9EB',
                            borderRadius: '8px',
                            fontSize: '0.9rem',
                            outline: 'none',
                            transition: 'border-color 0.3s ease',
                            backgroundColor: 'white',
                            boxSizing: 'border-box',
                          }}
                          onFocus={(e) => e.target.style.borderColor = '#7C2A62'}
                          onBlur={(e) => e.target.style.borderColor = '#F7D9EB'}
                        />
                      </div>
                      <div>
                        <label style={{
                          display: 'block',
                          fontSize: '0.8rem',
                          fontWeight: '600',
                          color: '#7C2A62',
                          marginBottom: '0.25rem',
                          marginLeft: '0.25rem'
                        }}>
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          placeholder="6,7,8,9 numbers only"
                          value={address.phone}
                          onChange={(e) => handleAddressChange('phone', e.target.value)}
                          style={{
                            width: '100%',
                            padding: '0.75rem',
                            border: '1px solid #F7D9EB',
                            borderRadius: '8px',
                            fontSize: '0.9rem',
                            outline: 'none',
                            transition: 'border-color 0.3s ease',
                            backgroundColor: 'white',
                            boxSizing: 'border-box',
                          }}
                          maxLength="10"
                          onFocus={(e) => e.target.style.borderColor = '#7C2A62'}
                          onBlur={(e) => e.target.style.borderColor = '#F7D9EB'}
                        />
                      </div>
                    </div>

                    {/* Street Address - Full Width */}
                    <div style={{ marginBottom: '0.75rem' }}>
                      <label style={{
                        display: 'block',
                        fontSize: '0.8rem',
                        fontWeight: '600',
                        color: '#7C2A62',
                        marginBottom: '0.25rem',
                        marginLeft: '0.25rem'
                      }}>
                        Street Address *
                      </label>
                      <input
                        type="text"
                        placeholder="Enter street address"
                        value={address.street}
                        onChange={(e) => handleAddressChange('street', e.target.value)}
                        style={{
                          width: '100%',
                          padding: '0.75rem',
                          border: '1px solid #F7D9EB',
                          borderRadius: '8px',
                          fontSize: '0.9rem',
                          outline: 'none',
                          transition: 'border-color 0.3s ease',
                          backgroundColor: 'white',
                          boxSizing: 'border-box',
                        }}
                        onFocus={(e) => e.target.style.borderColor = '#7C2A62'}
                        onBlur={(e) => e.target.style.borderColor = '#F7D9EB'}
                      />
                    </div>

                    {/* Landmark - Full Width */}
                    <div style={{ marginBottom: '0.75rem' }}>
                      <label style={{
                        display: 'block',
                        fontSize: '0.8rem',
                        fontWeight: '600',
                        color: '#7C2A62',
                        marginBottom: '0.25rem',
                        marginLeft: '0.25rem'
                      }}>
                        Landmark (Optional)
                      </label>
                      <input
                        type="text"
                        placeholder="Enter nearby landmark"
                        value={address.landmark}
                        onChange={(e) => handleAddressChange('landmark', e.target.value)}
                        style={{
                          width: '100%',
                          padding: '0.75rem',
                          border: '1px solid #F7D9EB',
                          borderRadius: '8px',
                          fontSize: '0.9rem',
                          outline: 'none',
                          transition: 'border-color 0.3s ease',
                          backgroundColor: 'white',
                          boxSizing: 'border-box',
                        }}
                        onFocus={(e) => e.target.style.borderColor = '#7C2A62'}
                        onBlur={(e) => e.target.style.borderColor = '#F7D9EB'}
                      />
                    </div>

                    {/* City & State - Same Row */}
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: '0.75rem',
                      marginBottom: '0.75rem'
                    }}>
                      <div>
                        <label style={{
                          display: 'block',
                          fontSize: '0.8rem',
                          fontWeight: '600',
                          color: '#7C2A62',
                          marginBottom: '0.25rem',
                          marginLeft: '0.25rem'
                        }}>
                          City *
                        </label>
                        <input
                          type="text"
                          placeholder="Enter city"
                          value={address.city}
                          onChange={(e) => handleAddressChange('city', e.target.value)}
                          style={{
                            width: '100%',
                            padding: '0.75rem',
                            border: '1px solid #F7D9EB',
                            borderRadius: '8px',
                            fontSize: '0.9rem',
                            outline: 'none',
                            transition: 'border-color 0.3s ease',
                            backgroundColor: 'white',
                            boxSizing: 'border-box',
                          }}
                          onFocus={(e) => e.target.style.borderColor = '#7C2A62'}
                          onBlur={(e) => e.target.style.borderColor = '#F7D9EB'}
                        />
                      </div>
                      <div>
                        <label style={{
                          display: 'block',
                          fontSize: '0.8rem',
                          fontWeight: '600',
                          color: '#7C2A62',
                          marginBottom: '0.25rem',
                          marginLeft: '0.25rem'
                        }}>
                          State *
                        </label>
                        <input
                          type="text"
                          placeholder="Enter state"
                          value={address.state}
                          onChange={(e) => handleAddressChange('state', e.target.value)}
                          style={{
                            width: '100%',
                            padding: '0.75rem',
                            border: '1px solid #F7D9EB',
                            borderRadius: '8px',
                            fontSize: '0.9rem',
                            outline: 'none',
                            transition: 'border-color 0.3s ease',
                            backgroundColor: 'white',
                            boxSizing: 'border-box',
                          }}
                          onFocus={(e) => e.target.style.borderColor = '#7C2A62'}
                          onBlur={(e) => e.target.style.borderColor = '#F7D9EB'}
                        />
                      </div>
                    </div>

                    {/* Pincode - Full Width */}
                    <div>
                      <label style={{
                        display: 'block',
                        fontSize: '0.8rem',
                        fontWeight: '600',
                        color: '#7C2A62',
                        marginBottom: '0.25rem',
                        marginLeft: '0.25rem'
                      }}>
                        Pincode *
                      </label>
                      <input
                        type="text"
                        placeholder="6-digit numbers only"
                        value={address.pincode}
                        onChange={(e) => handleAddressChange('pincode', e.target.value)}
                        style={{
                          width: '100%',
                          padding: '0.75rem',
                          border: '1px solid #F7D9EB',
                          borderRadius: '8px',
                          fontSize: '0.9rem',
                          outline: 'none',
                          transition: 'border-color 0.3s ease',
                          backgroundColor: 'white',
                          boxSizing: 'border-box',
                        }}
                        maxLength="6"
                        onFocus={(e) => e.target.style.borderColor = '#7C2A62'}
                        onBlur={(e) => e.target.style.borderColor = '#F7D9EB'}
                      />
                    </div>
                  </div>
                )}
                
                {/* Price Breakdown */}
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem'
                }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingBottom: '0.75rem',
                    borderBottom: '1px solid #f0f0f0'
                  }}>
                    <span style={{ fontSize: '1rem', fontWeight: '600' }}>Subtotal:</span>
                    <span style={{ fontSize: '1rem', fontWeight: '600' }}>₹{formatIndianNumber(getTotalPrice())}</span>
                  </div>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingBottom: '0.75rem',
                    borderBottom: '1px solid #f0f0f0'
                  }}>
                    <span style={{ fontSize: '0.9rem', fontWeight: '500' }}>Delivery Fee:</span>
                    <span style={{
                      color: '#4CAF50',
                      fontWeight: '700',
                      fontSize: '1rem'
                    }}>🆓 Free</span>
                  </div>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingBottom: '0.75rem',
                    borderBottom: '1px solid #f0f0f0'
                  }}>
                    <span style={{ fontSize: '0.9rem', fontWeight: '500' }}>Tax (GST):</span>
                    <span style={{ fontSize: '0.9rem', fontWeight: '500' }}>₹0</span>
                  </div>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingTop: '1rem',
                    borderTop: '2px solid #7C2A62',
                    fontWeight: '800',
                    fontSize: '1.2rem',
                    color: '#7C2A62',
                    backgroundColor: '#f8f5ff',
                    padding: '1.25rem',
                    borderRadius: '10px',
                  }}>
                    <span>Total Amount:</span>
                    <span>₹{formatIndianNumber(getTotalPrice())}</span>
                  </div>
                </div>
                
                {/* Checkout Button */}
                <button 
                  style={{
                    width: '100%',
                    padding: '1.25rem',
                    backgroundColor: paymentLoading ? '#cccccc' : '#7C2A62',
                    color: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    cursor: paymentLoading ? 'not-allowed' : 'pointer',
                    fontWeight: '800',
                    fontSize: '1.1rem',
                    transition: 'all 0.3s ease',
                    boxShadow: paymentLoading ? 'none' : '0 2px 8px rgba(124, 42, 98, 0.3)',
                  }}
                  onClick={handleCheckout}
                  disabled={paymentLoading}
                  type="button"
                  onMouseEnter={(e) => {
                    if (!paymentLoading) {
                      e.target.style.backgroundColor = '#6a2460';
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.boxShadow = '0 4px 12px rgba(124, 42, 98, 0.4)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!paymentLoading) {
                      e.target.style.backgroundColor = '#7C2A62';
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = '0 2px 8px rgba(124, 42, 98, 0.3)';
                    }
                  }}
                >
                  {paymentLoading ? '⏳ Processing Payment...' : 
                   showAddressForm ? '💳 Proceed to Payment' : '🚀 Proceed to Checkout'}
                </button>
                
                {showAddressForm && (
                  <button 
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      backgroundColor: 'transparent',
                      color: '#7C2A62',
                      border: '1px solid #7C2A62',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontSize: '0.9rem',
                      fontWeight: '600',
                      marginTop: '0.5rem',
                      transition: 'all 0.3s ease',
                    }}
                    onClick={() => handleAddressFormToggle(false)}
                    type="button"
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = '#7C2A62';
                      e.target.style.color = 'white';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = 'transparent';
                      e.target.style.color = '#7C2A62';
                    }}
                  >
                    ← Back to Cart
                  </button>
                )}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Add CSS animations */}
      <style>
        {`
          @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
          }
        `}
      </style>
    </div>
  );
};

export default CartView;