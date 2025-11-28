import React, { useEffect } from 'react';

const LiveTrackingView = ({
  trackingOrder,
  deliveryPartner,
  setActiveView,
  callDeliveryPartner,
  getDeliveryStatusText,
  getDeliveryProgress
}) => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, []);

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
      onClick={() => {
        // Scroll to top first, then navigate
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth'
        });
        // Small delay to ensure scroll completes before navigation
        setTimeout(() => {
          onClick();
        }, 100);
      }}
      type="button"
    >
      ← {text}
    </button>
  );

  const handleCallDeliveryPartner = () => {
    // Scroll to top first
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
    
    // Then call the delivery partner
    setTimeout(() => {
      callDeliveryPartner();
    }, 100);
  };

  return (
    <div style={{
      marginTop: '140px',
      padding: '2rem',
      minHeight: 'calc(100vh - 140px)',
      backgroundColor: '#f8fafc',
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '1.5rem 2rem',
        borderRadius: '15px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        marginBottom: '2rem',
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
      }}>
        <BackButton onClick={() => setActiveView('orders')} text="Back to Orders" />
        <h2 style={{
          margin: 0,
          color: '#7C2A62',
          fontSize: '1.8rem',
        }}>Live Order Tracking</h2>
        <p style={{
          margin: 0,
          color: '#666',
          fontSize: '1rem',
        }}>Order #{trackingOrder?.id}</p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '2fr 1fr',
        gap: '2rem',
        height: '600px',
      }}>
        <div style={{
          backgroundColor: 'white',
          borderRadius: '15px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          overflow: 'hidden',
          height: '100%',
        }}>
          <iframe
            src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d248756.11675378976!2d77.4651372271771!3d12.953945987030732!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0xf8dfc3e8517e4fe0!2sBengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v${Date.now()}!5m2!1sen!2sin`}
            width="100%"
            height="100%"
            style={{ border: 0, borderRadius: '15px' }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Live Order Tracking Map"
          ></iframe>
        </div>

        <div style={{
          backgroundColor: 'white',
          borderRadius: '15px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          padding: '1.5rem',
          overflowY: 'auto',
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
          }}>
            <h3 style={{
              color: '#7C2A62',
              margin: '0 0 1rem 0',
              fontSize: '1.3rem',
            }}>Delivery Information</h3>
            
            <div style={{
              marginBottom: '1rem',
            }}>
              <div style={{
                height: '8px',
                backgroundColor: '#f0f0f0',
                borderRadius: '4px',
                overflow: 'hidden',
                marginBottom: '0.5rem',
              }}>
                <div 
                  style={{
                    height: '100%',
                    backgroundColor: '#7C2A62',
                    transition: 'width 0.5s ease',
                    width: `${getDeliveryProgress(deliveryPartner.status)}%`
                  }}
                ></div>
              </div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '0.8rem',
                color: '#666',
              }}>
                <span>Order Placed</span>
                <span>On the Way</span>
                <span>Delivered</span>
              </div>
            </div>

            <div style={{
              backgroundColor: '#f8f5ff',
              padding: '1rem',
              borderRadius: '10px',
              border: '1px solid #F7D9EB',
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '0.5rem',
              }}>
                <span style={{
                  color: '#666',
                  fontSize: '0.9rem',
                }}>Current Status:</span>
                <span style={{
                  color: '#7C2A62',
                  fontWeight: '600',
                  fontSize: '0.9rem',
                }}>
                  {getDeliveryStatusText(deliveryPartner.status)}
                </span>
              </div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
                <span style={{
                  color: '#666',
                  fontSize: '0.9rem',
                }}>Estimated Time:</span>
                <span style={{
                  color: '#4CAF50',
                  fontWeight: '600',
                  fontSize: '0.9rem',
                }}>{deliveryPartner.estimatedTime}</span>
              </div>
            </div>

            <div style={{
              border: '1px solid #F7D9EB',
              borderRadius: '10px',
              padding: '1rem',
            }}>
              <h4 style={{
                color: '#7C2A62',
                margin: '0 0 1rem 0',
                fontSize: '1.1rem',
              }}>Delivery Partner</h4>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                marginBottom: '1rem',
              }}>
                <div style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  backgroundColor: '#F7D9EB',
                  color: '#7C2A62',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold',
                  fontSize: '1.2rem',
                }}>
                  {deliveryPartner.name.charAt(0)}
                </div>
                <div style={{
                  flex: 1,
                }}>
                  <p style={{
                    margin: '0 0 0.25rem 0',
                    fontWeight: '600',
                    color: '#333',
                  }}>{deliveryPartner.name}</p>
                  <p style={{
                    margin: '0 0 0.25rem 0',
                    color: '#666',
                    fontSize: '0.9rem',
                  }}>
                    {deliveryPartner.vehicle} • {deliveryPartner.vehicleNumber}
                  </p>
                  <div style={{
                    color: '#FFD700',
                    fontWeight: 'bold',
                    fontSize: '0.9rem',
                  }}>
                    ⭐ {deliveryPartner.rating}
                  </div>
                </div>
              </div>
              <button 
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  backgroundColor: '#4CAF50',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  fontSize: '0.9rem',
                }}
                onClick={handleCallDeliveryPartner}
                type="button"
              >
                📞 Call Delivery Partner
              </button>
            </div>

            <div style={{
              border: '1px solid #F7D9EB',
              borderRadius: '10px',
              padding: '1rem',
            }}>
              <h4 style={{
                color: '#7C2A62',
                margin: '0 0 1rem 0',
                fontSize: '1.1rem',
              }}>Order Summary</h4>
              {trackingOrder.items.map((item, index) => (
                <div key={index} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '0.5rem 0',
                  borderBottom: '1px solid #f0f0f0',
                }}>
                  <span>{item.name}</span>
                  <span>Qty: {item.quantity}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveTrackingView;