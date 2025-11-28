import React, { useState, useEffect, useRef, useMemo } from 'react';

const Modals = ({
  showCheckoutConfirm,
  showPrescriptionModal,
  showPharmacyStore,
  showAppointmentDetails,
  showDoctorChat,
  showLogoutConfirm,
  showProfilePhotoModal,
  selectedPharmacy,
  selectedAppointment,
  activeDoctorChat,
  doctorChats,
  prescriptionFile,
  prescriptionPreview,
  profilePhotoFile,
  profilePhotoPreview,
  profile,
  cart,
  getTotalPrice,
  paymentLoading,
  getFilteredPharmacyMedicines,
  pharmacySearchQueries,
  handlePharmacySearch,
  addToCartFromPharmacy,
  updateQuantity,
  setShowPharmacyStore,
  setShowAppointmentDetails,
  setShowDoctorChat,
  setShowCheckoutConfirm,
  setShowPrescriptionModal,
  setShowLogoutConfirm,
  setShowProfilePhotoModal,
  handlePrescriptionUpload,
  handlePrescriptionSubmit,
  handleConfirmCheckout,
  handleCancelCheckout,
  confirmLogout,
  cancelLogout,
  handleProfilePhotoSubmit,
  removeProfilePhoto,
  sendDoctorMessage,
  setPrescriptionFile,
  setPrescriptionPreview,
  setProfilePhotoFile,
  setProfilePhotoPreview,
  handleProfilePhotoUpload,
  setActiveView
}) => {
  // Refs for click outside detection
  const checkoutModalRef = useRef(null);
  const prescriptionModalRef = useRef(null);
  const pharmacyStoreModalRef = useRef(null);
  const appointmentModalRef = useRef(null);
  const doctorChatModalRef = useRef(null);
  const logoutModalRef = useRef(null);
  const profilePhotoModalRef = useRef(null);

  // Scroll to top when any modal opens
  useEffect(() => {
    if (showCheckoutConfirm || showPrescriptionModal || showPharmacyStore || 
        showAppointmentDetails || showDoctorChat || showLogoutConfirm || showProfilePhotoModal) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    }
  }, [
    showCheckoutConfirm,
    showPrescriptionModal,
    showPharmacyStore,
    showAppointmentDetails,
    showDoctorChat,
    showLogoutConfirm,
    showProfilePhotoModal
  ]);

  // Click outside handler for all modals
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Checkout Confirmation Modal
      if (showCheckoutConfirm && 
          checkoutModalRef.current && 
          !checkoutModalRef.current.contains(event.target)) {
        setShowCheckoutConfirm(false);
      }

      // Prescription Upload Modal
      if (showPrescriptionModal && 
          prescriptionModalRef.current && 
          !prescriptionModalRef.current.contains(event.target)) {
        setShowPrescriptionModal(false);
        setPrescriptionFile(null);
        setPrescriptionPreview(null);
      }

      // Pharmacy Store Modal
      if (showPharmacyStore && 
          pharmacyStoreModalRef.current && 
          !pharmacyStoreModalRef.current.contains(event.target)) {
        setShowPharmacyStore(false);
      }

      // Appointment Details Modal
      if (showAppointmentDetails && 
          appointmentModalRef.current && 
          !appointmentModalRef.current.contains(event.target)) {
        setShowAppointmentDetails(false);
      }

      // Doctor Chat Modal
      if (showDoctorChat && 
          doctorChatModalRef.current && 
          !doctorChatModalRef.current.contains(event.target)) {
        setShowDoctorChat(false);
      }

      // Logout Confirmation Modal
      if (showLogoutConfirm && 
          logoutModalRef.current && 
          !logoutModalRef.current.contains(event.target)) {
        setShowLogoutConfirm(false);
      }

      // Profile Photo Modal
      if (showProfilePhotoModal && 
          profilePhotoModalRef.current && 
          !profilePhotoModalRef.current.contains(event.target)) {
        setShowProfilePhotoModal(false);
        setProfilePhotoFile(null);
        setProfilePhotoPreview(profile.profilePhoto);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [
    showCheckoutConfirm,
    showPrescriptionModal,
    showPharmacyStore,
    showAppointmentDetails,
    showDoctorChat,
    showLogoutConfirm,
    showProfilePhotoModal,
    setShowCheckoutConfirm,
    setShowPrescriptionModal,
    setShowPharmacyStore,
    setShowAppointmentDetails,
    setShowDoctorChat,
    setShowLogoutConfirm,
    setShowProfilePhotoModal,
    setPrescriptionFile,
    setPrescriptionPreview,
    setProfilePhotoFile,
    setProfilePhotoPreview,
    profile.profilePhoto
  ]);

  // Modal overlay style
  const modalOverlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2000,
  };

  // Common modal styles
  const modalTitleStyle = {
    color: '#7C2A62',
    marginBottom: '1rem',
    fontSize: '1.5rem',
    textAlign: 'center',
  };

  const closeModalButtonStyle = {
    background: 'none',
    border: 'none',
    fontSize: '1.8rem',
    cursor: 'pointer',
    color: 'white',
    padding: '0',
    width: '35px',
    height: '35px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    transition: 'background-color 0.2s ease',
  };

  const cancelButtonStyle = {
    padding: '0.75rem 1.5rem',
    backgroundColor: 'transparent',
    color: '#7C2A62',
    border: '2px solid #7C2A62',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '0.9rem',
  };

  const confirmButtonStyle = {
    padding: '0.75rem 1.5rem',
    backgroundColor: '#7C2A62',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '0.9rem',
  };

  // Enhanced close handlers with scroll to top
  const handleCloseCheckout = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    handleCancelCheckout();
  };

  const handleClosePrescription = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    setShowPrescriptionModal(false);
    setPrescriptionFile(null);
    setPrescriptionPreview(null);
  };

  const handleClosePharmacyStore = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    setShowPharmacyStore(false);
  };

  const handleCloseAppointmentDetails = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    setShowAppointmentDetails(false);
  };

  const handleCloseDoctorChat = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    setShowDoctorChat(false);
  };

  const handleCloseProfilePhoto = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    setShowProfilePhotoModal(false);
    setProfilePhotoFile(null);
    setProfilePhotoPreview(profile.profilePhoto);
  };

  const handleViewCart = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    setTimeout(() => {
      setShowPharmacyStore(false);
      setActiveView('cart');
    }, 100);
  };

  // Doctor Chat Modal Component
  const DoctorChatModal = () => {
    const [message, setMessage] = useState('');
    const chatEndRef = useRef(null);

    const activeDoctorId = activeDoctorChat?.id;
    const currentChat = useMemo(() => {
      if (!activeDoctorId) return [];
      return doctorChats[activeDoctorId] || [];
    }, [activeDoctorId, doctorChats]);

    useEffect(() => {
      if (chatEndRef.current) {
        chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }, [currentChat]);

    const handleSendMessage = () => {
      if (!message.trim()) return;
      sendDoctorMessage(activeDoctorChat.id, message);
      setMessage('');
    };

    const handleKeyPress = (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSendMessage();
      }
    };

    return (
      <div style={modalOverlayStyle}>
        <div style={{
          backgroundColor: 'white',
          padding: '0',
          borderRadius: '15px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
          width: '450px',
          height: '650px',
          display: 'flex',
          flexDirection: 'column',
        }} ref={doctorChatModalRef}>
          <div style={{
            padding: '1rem 1.5rem',
            backgroundColor: '#7C2A62',
            color: 'white',
            borderTopLeftRadius: '15px',
            borderTopRightRadius: '15px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              flex: 1,
            }}>
              <div style={{
                fontSize: '2rem',
                width: '50px',
                height: '50px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                borderRadius: '50%',
              }}>
                {activeDoctorChat?.image}
              </div>
              <div>
                <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: '600' }}>{activeDoctorChat?.name}</h3>
                <p style={{ margin: 0, fontSize: '0.9rem', opacity: 0.9 }}>{activeDoctorChat?.specialty}</p>
              </div>
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}>
              <button 
                style={closeModalButtonStyle}
                onClick={handleCloseDoctorChat}
                type="button"
              >
                ×
              </button>
            </div>
          </div>

          <div style={{
            flex: 1,
            padding: '1rem',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            backgroundColor: '#fafafa',
          }}>
            {currentChat.map(chatMessage => (
              <div
                key={chatMessage.id}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  maxWidth: '85%',
                  alignSelf: chatMessage.sender === 'user' ? 'flex-end' : 'flex-start',
                  alignItems: chatMessage.sender === 'user' ? 'flex-end' : 'flex-start',
                }}
              >
                <div style={{
                  padding: '0.75rem 1rem',
                  borderRadius: '15px',
                  fontSize: '0.9rem',
                  lineHeight: '1.4',
                  wordWrap: 'break-word',
                  maxWidth: '100%',
                  backgroundColor: chatMessage.sender === 'user' ? '#7C2A62' : '#e0e0e0',
                  color: chatMessage.sender === 'user' ? 'white' : '#333',
                  borderBottomRightRadius: chatMessage.sender === 'user' ? '5px' : '15px',
                  borderBottomLeftRadius: chatMessage.sender === 'user' ? '15px' : '5px',
                }}>
                  {chatMessage.text}
                </div>
                <span style={{
                  fontSize: '0.7rem',
                  color: '#666',
                  marginTop: '0.25rem',
                  padding: '0 0.5rem',
                }}>
                  {chatMessage.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          <div style={{
            padding: '1rem',
            borderTop: '1px solid #e0e0e0',
            display: 'flex',
            gap: '0.5rem',
            backgroundColor: 'white',
            borderBottomLeftRadius: '15px',
            borderBottomRightRadius: '15px',
          }}>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message to the doctor..."
              style={{
                flex: 1,
                padding: '0.75rem 1rem',
                border: '1px solid #ddd',
                borderRadius: '25px',
                fontSize: '0.9rem',
                outline: 'none',
              }}
              autoFocus
            />
            <button 
              style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: '#7C2A62',
                color: 'white',
                border: 'none',
                borderRadius: '25px',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '0.9rem',
                transition: 'all 0.2s ease',
                minWidth: '60px',
              }}
              onClick={handleSendMessage}
              type="button"
              disabled={!message.trim()}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Checkout Confirmation Modal
  const CheckoutConfirmation = () => (
    <div style={modalOverlayStyle}>
      <div style={{
        backgroundColor: 'white',
        padding: '2rem',
        borderRadius: '15px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
        maxWidth: '500px',
        width: '90%',
      }} ref={checkoutModalRef}>
        <h3 style={modalTitleStyle}>Confirm Checkout</h3>
        <p style={{
          color: '#666',
          marginBottom: '1.5rem',
          textAlign: 'center',
          lineHeight: '1.5',
        }}>
          You are about to proceed with your order. Total amount: <strong>₹{getTotalPrice()}</strong>
        </p>
        
        <div style={{
          marginBottom: '1.5rem',
          maxHeight: '200px',
          overflowY: 'auto',
        }}>
          {cart.map(item => (
            <div key={item.id} style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '0.5rem 0',
              borderBottom: '1px solid #f0f0f0',
            }}>
              <span>{item.name}</span>
              <span>₹{item.price} × {item.quantity}</span>
            </div>
          ))}
        </div>

        <div style={{
          display: 'flex',
          gap: '1rem',
          justifyContent: 'center',
        }}>
          <button 
            style={cancelButtonStyle}
            onClick={handleCloseCheckout}
            disabled={paymentLoading}
            type="button"
          >
            Cancel
          </button>
          <button 
            style={confirmButtonStyle}
            onClick={handleConfirmCheckout}
            disabled={paymentLoading}
            type="button"
          >
            {paymentLoading ? 'Processing...' : 'Proceed to Payment'}
          </button>
        </div>
      </div>
    </div>
  );

  // Prescription Upload Modal
  const PrescriptionUploadModal = () => (
    <div style={modalOverlayStyle}>
      <div style={{
        backgroundColor: 'white',
        padding: '2rem',
        borderRadius: '15px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
        maxWidth: '600px',
        width: '90%',
        maxHeight: '80vh',
        overflowY: 'auto',
      }} ref={prescriptionModalRef}>
        <h3 style={modalTitleStyle}>Upload Prescription</h3>
        
        <div style={{
          border: '2px dashed #F7D9EB',
          borderRadius: '10px',
          padding: '2rem',
          textAlign: 'center',
          marginBottom: '1.5rem',
          minHeight: '200px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          {prescriptionPreview ? (
            <div style={{
              position: 'relative',
              width: '100%',
              maxHeight: '300px',
              overflow: 'hidden',
              borderRadius: '8px',
            }}>
              <img 
                src={prescriptionPreview} 
                alt="Prescription preview" 
                style={{
                  width: '100%',
                  height: 'auto',
                  maxHeight: '300px',
                  objectFit: 'contain',
                }}
              />
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                backgroundColor: 'rgba(0,0,0,0.7)',
                color: 'white',
                padding: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
              }}>
                <span style={{ fontSize: '2rem' }}>📄</span>
                <div>
                  <p style={{ margin: '0 0 0.25rem 0', fontWeight: '600' }}>{prescriptionFile.name}</p>
                  <p style={{ margin: 0, fontSize: '0.9rem' }}>
                    {(prescriptionFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
            </div>
          ) : prescriptionFile ? (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              justifyContent: 'center',
            }}>
              <span style={{ fontSize: '2rem' }}>📄</span>
              <div>
                <p style={{ margin: '0 0 0.25rem 0', fontWeight: '600', color: '#333' }}>{prescriptionFile.name}</p>
                <p style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>
                  {(prescriptionFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
          ) : (
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem', color: '#7C2A62' }}>📎</div>
              <p style={{ margin: '0 0 0.5rem 0', color: '#666', fontSize: '1.1rem' }}>No file selected</p>
              <p style={{ margin: 0, color: '#999', fontSize: '0.9rem' }}>Supported formats: JPG, PNG, PDF (Max 5MB)</p>
            </div>
          )}
        </div>

        <div style={{
          backgroundColor: '#f8f5ff',
          padding: '1rem',
          borderRadius: '8px',
          marginBottom: '1.5rem',
          border: '1px solid #F7D9EB',
        }}>
          <h4 style={{ color: '#7C2A62', margin: '0 0 0.5rem 0', fontSize: '1rem' }}>Prescription Requirements:</h4>
          <ul style={{
            margin: 0,
            paddingLeft: '1.5rem',
            color: '#666',
            fontSize: '0.9rem',
            lineHeight: '1.5',
          }}>
            <li>Clear image of your doctor's prescription</li>
            <li>All text should be readable</li>
            <li>Doctor's signature and stamp should be visible</li>
            <li>Supported formats: JPG, PNG, PDF</li>
            <li>Maximum file size: 5MB</li>
          </ul>
        </div>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
        }}>
          <label style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: 'transparent',
            color: '#7C2A62',
            border: '2px solid #7C2A62',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '600',
            fontSize: '0.9rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
          }}>
            <span style={{ marginRight: '0.5rem', fontSize: '1rem' }}>📎</span>
            {prescriptionFile ? 'Change File' : 'Choose File'}
            <input
              type="file"
              accept=".jpg,.jpeg,.png,.pdf"
              onChange={handlePrescriptionUpload}
              style={{ display: 'none' }}
            />
          </label>
          <button 
            style={confirmButtonStyle}
            onClick={handlePrescriptionSubmit}
            disabled={!prescriptionFile}
            type="button"
          >
            Upload Prescription
          </button>
          <button 
            style={cancelButtonStyle}
            onClick={handleClosePrescription}
            type="button"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );

  // Logout Confirmation Modal
  const LogoutConfirmation = () => (
    <div style={modalOverlayStyle}>
      <div style={{
        backgroundColor: 'white',
        padding: '2rem',
        borderRadius: '15px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
        maxWidth: '400px',
        width: '90%',
        textAlign: 'center',
      }} ref={logoutModalRef}>
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>👋</div>
        <h3 style={modalTitleStyle}>Confirm Logout</h3>
        <p style={{
          color: '#666',
          marginBottom: '2rem',
          lineHeight: '1.5',
        }}>
          Are you sure you want to logout from your QuickMed account?
        </p>
        <div style={{
          display: 'flex',
          gap: '1rem',
          justifyContent: 'center',
        }}>
          <button 
            style={cancelButtonStyle}
            onClick={cancelLogout}
            type="button"
          >
            Cancel
          </button>
          <button 
            style={confirmButtonStyle}
            onClick={confirmLogout}
            type="button"
          >
            Yes, Logout
          </button>
        </div>
      </div>
    </div>
  );

  // Profile Photo Upload Modal
  const ProfilePhotoModal = () => (
    <div style={modalOverlayStyle}>
      <div style={{
        backgroundColor: 'white',
        padding: '2rem',
        borderRadius: '15px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
        maxWidth: '500px',
        width: '90%',
        maxHeight: '80vh',
        overflowY: 'auto',
      }} ref={profilePhotoModalRef}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1.5rem',
          borderBottom: '2px solid #F7D9EB',
          paddingBottom: '1rem',
        }}>
          <h3 style={modalTitleStyle}>Update Profile Photo</h3>
          <button 
            style={closeModalButtonStyle}
            onClick={handleCloseProfilePhoto}
            type="button"
          >
            ×
          </button>
        </div>
        
        <div style={{
          border: '2px dashed #F7D9EB',
          borderRadius: '10px',
          padding: '2rem',
          textAlign: 'center',
          marginBottom: '1.5rem',
          minHeight: '200px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          {profilePhotoPreview ? (
            <div style={{
              width: '100%',
              maxHeight: '300px',
              overflow: 'hidden',
              borderRadius: '8px',
            }}>
              <img 
                src={profilePhotoPreview} 
                alt="Profile preview" 
                style={{
                  width: '100%',
                  height: 'auto',
                  maxHeight: '300px',
                  objectFit: 'contain',
                }}
              />
            </div>
          ) : (
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem', color: '#7C2A62' }}>👤</div>
              <p style={{ margin: '0 0 0.5rem 0', color: '#666', fontSize: '1.1rem' }}>No photo selected</p>
              <p style={{ margin: 0, color: '#999', fontSize: '0.9rem' }}>Supported formats: JPG, PNG (Max 5MB)</p>
            </div>
          )}
        </div>

        <div style={{
          backgroundColor: '#f8f5ff',
          padding: '1rem',
          borderRadius: '8px',
          marginBottom: '1.5rem',
          border: '1px solid #F7D9EB',
        }}>
          <h4 style={{ color: '#7C2A62', margin: '0 0 0.5rem 0', fontSize: '1rem' }}>Photo Requirements:</h4>
          <ul style={{
            margin: 0,
            paddingLeft: '1.5rem',
            color: '#666',
            fontSize: '0.9rem',
            lineHeight: '1.5',
          }}>
            <li>Clear, recent photo of yourself</li>
            <li>Face should be clearly visible</li>
            <li>Supported formats: JPG, PNG</li>
            <li>Maximum file size: 5MB</li>
          </ul>
        </div>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
        }}>
          <label style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: 'transparent',
            color: '#7C2A62',
            border: '2px solid #7C2A62',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '600',
            fontSize: '0.9rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
          }}>
            <span style={{ marginRight: '0.5rem', fontSize: '1rem' }}>📷</span>
            {profilePhotoFile ? 'Change Photo' : 'Choose Photo'}
            <input
              type="file"
              accept="image/*"
              onChange={handleProfilePhotoUpload}
              style={{ display: 'none' }}
            />
          </label>
          {profile.profilePhoto && (
            <button 
              style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: '#FF6B6B',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '0.9rem',
              }}
              onClick={removeProfilePhoto}
              type="button"
            >
              Remove Current Photo
            </button>
          )}
          <button 
            style={confirmButtonStyle}
            onClick={handleProfilePhotoSubmit}
            disabled={!profilePhotoFile}
            type="button"
          >
            Update Profile Photo
          </button>
          <button 
            style={cancelButtonStyle}
            onClick={handleCloseProfilePhoto}
            type="button"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );

  // Pharmacy Store Modal
  const PharmacyStoreModal = () => {
    const filteredMedicines = getFilteredPharmacyMedicines(selectedPharmacy);
    const searchQuery = pharmacySearchQueries[selectedPharmacy?.id] || '';

    const handleSearchChange = (e) => {
      handlePharmacySearch(selectedPharmacy.id, e.target.value);
    };

    const PharmacyMedicineCard = ({ medicine }) => {
      const cartItem = cart.find(item => item.id === medicine.id);
      const quantity = cartItem ? cartItem.quantity : 0;

      return (
        <div style={{
          border: '1px solid #F7D9EB',
          borderRadius: '8px',
          padding: '1rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}>
          <div style={{ marginBottom: '1rem' }}>
            <h5 style={{ margin: '0 0 0.5rem 0', color: '#7C2A62', fontSize: '1rem' }}>{medicine.name}</h5>
            <p style={{ margin: '0 0 0.5rem 0', color: '#666', fontSize: '0.8rem' }}>{medicine.category}</p>
            <p style={{ margin: 0, color: '#7C2A62', fontWeight: 'bold', fontSize: '1.1rem' }}>₹{medicine.price}</p>
          </div>
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
                  onClick={() => updateQuantity(medicine.id, quantity - 1)}
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
                  onClick={() => updateQuantity(medicine.id, quantity + 1)}
                  type="button"
                >
                  +
                </button>
              </>
            ) : (
              <button 
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: '#7C2A62',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                }}
                onClick={() => addToCartFromPharmacy(medicine)}
                type="button"
              >
                Add to Cart
              </button>
            )}
          </div>
        </div>
    );
    };

    return (
      <div style={modalOverlayStyle}>
        <div style={{
          backgroundColor: 'white',
          padding: '2rem',
          borderRadius: '15px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
          maxWidth: '800px',
          width: '90%',
          maxHeight: '80vh',
          overflowY: 'auto',
        }} ref={pharmacyStoreModalRef}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1.5rem',
            borderBottom: '2px solid #F7D9EB',
            paddingBottom: '1rem',
          }}>
            <h3 style={modalTitleStyle}>{selectedPharmacy?.name}</h3>
            <button 
              style={closeModalButtonStyle}
              onClick={handleClosePharmacyStore}
              type="button"
            >
              ×
            </button>
          </div>
          
          <div style={{ marginBottom: '2rem' }}>
            <div style={{
              display: 'flex',
              gap: '2rem',
              flexWrap: 'wrap',
            }}>
              <p style={{ color: '#666', fontSize: '0.9rem', margin: '0.5rem 0' }}>📍 {selectedPharmacy?.distance} away</p>
              <p style={{ color: '#4CAF50', fontSize: '0.9rem', margin: '0.5rem 0' }}>🚚 Delivery: {selectedPharmacy?.deliveryTime}</p>
              <p style={{ color: '#FFD700', fontSize: '0.9rem', margin: '0.5rem 0' }}>⭐ {selectedPharmacy?.rating} Rating</p>
            </div>
          </div>

          {/* Updated Search Bar Section */}
          <div style={{
            backgroundColor: 'white',
            padding: '1rem',
            borderRadius: '10px',
            marginBottom: '1.5rem',
            border: '1px solid #F7D9EB',
          }}>
            <div style={{
              display: 'flex',
              gap: '0.5rem',
              alignItems: 'center',
            }}>
              <input
                type="text"
                placeholder="Search for medicines in this pharmacy..."
                value={searchQuery}
                onChange={handleSearchChange}
                style={{
                  flex: 1,
                  padding: '0.5rem 0.75rem',
                  border: '2px solid #F7D9EB',
                  borderRadius: '8px',
                  fontSize: '0.9rem',
                  height: '38px'
                }}
                autoFocus
              />
              <button style={{
                padding: '0.5rem 1.25rem',
                backgroundColor: '#7C2A62',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '0.9rem',
                height: '38px',
                whiteSpace: 'nowrap'
              }} type="button">Search</button>
            </div>
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <h4 style={{ color: '#7C2A62', marginBottom: '1rem', fontSize: '1.2rem' }}>Available Medicines</h4>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
              gap: '1rem',
            }}>
              {filteredMedicines.length === 0 ? (
                <div style={{
                  gridColumn: '1 / -1',
                  textAlign: 'center',
                  padding: '2rem',
                  color: '#666',
                }}>
                  <p>No medicines found matching your search.</p>
                </div>
              ) : (
                filteredMedicines.map(medicine => (
                  <PharmacyMedicineCard key={medicine.id} medicine={medicine} />
                ))
              )}
            </div>
          </div>

          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '1rem',
            marginTop: '1rem',
          }}>
            <button 
              style={confirmButtonStyle}
              onClick={handleViewCart}
              type="button"
            >
              View Cart ({cart.length})
            </button>
            <button 
              style={cancelButtonStyle}
              onClick={handleClosePharmacyStore}
              type="button"
            >
              Back to Pharmacies
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Appointment Details Modal
  const AppointmentDetailsModal = () => (
    <div style={modalOverlayStyle}>
      <div style={{
        backgroundColor: 'white',
        padding: '2rem',
        borderRadius: '15px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
        maxWidth: '700px',
        width: '90%',
        maxHeight: '80vh',
        overflowY: 'auto',
      }} ref={appointmentModalRef}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1.5rem',
          borderBottom: '2px solid #F7D9EB',
          paddingBottom: '1rem',
        }}>
          <h3 style={modalTitleStyle}>Appointment Details</h3>
          <button 
            style={closeModalButtonStyle}
            onClick={handleCloseAppointmentDetails}
            type="button"
          >
            ×
          </button>
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <div style={{ marginBottom: '2rem' }}>
            <h4 style={{ color: '#7C2A62', marginBottom: '1rem', fontSize: '1.1rem' }}>Basic Information</h4>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '1rem',
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <span style={{ color: '#666', fontSize: '0.9rem', fontWeight: '500' }}>Appointment ID:</span>
                <span style={{ color: '#333', fontSize: '1rem' }}>{selectedAppointment?.id}</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <span style={{ color: '#666', fontSize: '0.9rem', fontWeight: '500' }}>Doctor:</span>
                <span style={{ color: '#333', fontSize: '1rem' }}>{selectedAppointment?.doctorName}</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <span style={{ color: '#666', fontSize: '0.9rem', fontWeight: '500' }}>Specialty:</span>
                <span style={{ color: '#333', fontSize: '1rem' }}>{selectedAppointment?.specialty}</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <span style={{ color: '#666', fontSize: '0.9rem', fontWeight: '500' }}>Date & Time:</span>
                <span style={{ color: '#333', fontSize: '1rem' }}>{selectedAppointment?.date} at {selectedAppointment?.time}</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <span style={{ color: '#666', fontSize: '0.9rem', fontWeight: '500' }}>Type:</span>
                <span style={{ color: '#333', fontSize: '1rem' }}>{selectedAppointment?.type}</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <span style={{ color: '#666', fontSize: '0.9rem', fontWeight: '500' }}>Fee:</span>
                <span style={{ color: '#333', fontSize: '1rem' }}>₹{selectedAppointment?.fee}</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <span style={{ color: '#666', fontSize: '0.9rem', fontWeight: '500' }}>Status:</span>
                <span style={{
                  padding: '0.5rem 1rem',
                  borderRadius: '20px',
                  color: 'white',
                  fontSize: '0.8rem',
                  fontWeight: '600',
                  backgroundColor: 
                    selectedAppointment?.status === 'Scheduled' ? '#4CAF50' :
                    selectedAppointment?.status === 'Completed' ? '#2196F3' :
                    selectedAppointment?.status === 'Cancelled' ? '#FF6B6B' :
                    selectedAppointment?.status === 'Rescheduled' ? '#FF9800' :
                    selectedAppointment?.status === 'Pending' ? '#FFC107' : '#9E9E9E'
                }}>
                  {selectedAppointment?.status}
                </span>
              </div>
            </div>
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <h4 style={{ color: '#7C2A62', marginBottom: '1rem', fontSize: '1.1rem' }}>Patient Details</h4>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '1rem',
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <span style={{ color: '#666', fontSize: '0.9rem', fontWeight: '500' }}>Patient Name:</span>
                <span style={{ color: '#333', fontSize: '1rem' }}>{selectedAppointment?.details.patientName}</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <span style={{ color: '#666', fontSize: '0.9rem', fontWeight: '500' }}>Symptoms:</span>
                <span style={{ color: '#333', fontSize: '1rem' }}>{selectedAppointment?.details.symptoms}</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <span style={{ color: '#666', fontSize: '0.9rem', fontWeight: '500' }}>Notes:</span>
                <span style={{ color: '#333', fontSize: '1rem' }}>{selectedAppointment?.details.notes}</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <span style={{ color: '#666', fontSize: '0.9rem', fontWeight: '500' }}>Prescription:</span>
                <span style={{ color: '#333', fontSize: '1rem' }}>{selectedAppointment?.details.prescription}</span>
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button 
            style={confirmButtonStyle}
            onClick={handleCloseAppointmentDetails}
            type="button"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {showCheckoutConfirm && <CheckoutConfirmation />}
      {showPrescriptionModal && <PrescriptionUploadModal />}
      {showPharmacyStore && <PharmacyStoreModal />}
      {showAppointmentDetails && <AppointmentDetailsModal />}
      {showDoctorChat && <DoctorChatModal />}
      {showLogoutConfirm && <LogoutConfirmation />}
      {showProfilePhotoModal && <ProfilePhotoModal />}
    </>
  );
};

export default Modals;