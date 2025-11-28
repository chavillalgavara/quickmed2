import React, { useState } from 'react';

const DoctorModals = ({ state, actions, onLogout, dashboardData }) => {
  const {
    showProfileModal,
    showNotificationsModal,
    showMessagesModal,
    showChatbotModal,
    showLogoutConfirm,
    consultationDetails,
    userProfile,
    notifications,
    patientMessages,
    selectedPatient,
    formErrors,
    windowSize
  } = state;

  const {
    setShowProfileModal,
    setShowNotificationsModal,
    setShowMessagesModal,
    setShowChatbotModal,
    setShowLogoutConfirm,
    setConsultationDetails,
    setUserProfile,
    setFormErrors,
    handleProfileUpdate,
    handleMarkNotificationAsRead,
    handleMarkAllNotificationsAsRead,
    handleClearAllNotifications,
    handleSendMessage,
    handleMarkAsRead,
    handleViewFullHistory,
    handleAddNotes,
    validateForm,
    handleStartConversation
  } = actions;

  const isMobile = windowSize ? windowSize.width <= 768 : window.innerWidth <= 768;

  // Add state for patient history modal
  const [showPatientHistory, setShowPatientHistory] = useState(false);
  const [selectedPatientHistory, setSelectedPatientHistory] = useState(null);

  // Enhanced handleViewFullHistory to show in modal
  const handleViewFullHistoryModal = (patientName) => {
    const patient = dashboardData.patients.find(p => p.name === patientName);
    if (patient) {
      setSelectedPatientHistory(patient);
      setShowPatientHistory(true);
    }
  };

  if (!showProfileModal && !showNotificationsModal && !showMessagesModal && 
      !showChatbotModal && !showLogoutConfirm && !consultationDetails && !showPatientHistory) {
    return null;
  }

  return (
    <>
      {/* Patient History Modal */}
      {showPatientHistory && (
        <PatientHistoryModal
          patient={selectedPatientHistory}
          setShowPatientHistory={setShowPatientHistory}
          isMobile={isMobile}
        />
      )}

      {/* Profile Modal */}
      {showProfileModal && (
        <ProfileModal
          userProfile={userProfile}
          setUserProfile={setUserProfile}
          setShowProfileModal={setShowProfileModal}
          handleProfileUpdate={handleProfileUpdate}
          formErrors={formErrors}
          setFormErrors={setFormErrors}
          validateForm={validateForm}
          isMobile={isMobile}
        />
      )}

      {/* Notifications Modal */}
      {showNotificationsModal && (
        <NotificationsModal
          notifications={notifications}
          setShowNotificationsModal={setShowNotificationsModal}
          handleMarkNotificationAsRead={handleMarkNotificationAsRead}
          handleMarkAllNotificationsAsRead={handleMarkAllNotificationsAsRead}
          handleClearAllNotifications={handleClearAllNotifications}
          isMobile={isMobile}
        />
      )}

      {/* Chatbot Modal */}
      {showChatbotModal && (
        <ChatbotModal
          setShowChatbotModal={setShowChatbotModal}
          isMobile={isMobile}
        />
      )}

      {/* Messages Modal */}
      {showMessagesModal && (
        <MessagesModal
          showMessagesModal={showMessagesModal}
          setShowMessagesModal={setShowMessagesModal}
          selectedPatient={selectedPatient}
          patientMessages={patientMessages}
          handleSendMessage={handleSendMessage}
          handleMarkAsRead={handleMarkAsRead}
          handleViewFullHistory={handleViewFullHistoryModal}
          handleAddNotes={handleAddNotes}
          dashboardData={dashboardData}
          isMobile={isMobile}
        />
      )}

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <LogoutModal
          setShowLogoutConfirm={setShowLogoutConfirm}
          onLogout={onLogout}
          isMobile={isMobile}
        />
      )}

      {/* Consultation Details Modal */}
      {consultationDetails && (
        <ConsultationModal
          consultationDetails={consultationDetails}
          setConsultationDetails={setConsultationDetails}
          handleViewFullHistory={handleViewFullHistoryModal}
          handleAddNotes={handleAddNotes}
          handleStartConversation={handleStartConversation}
          dashboardData={dashboardData}
          isMobile={isMobile}
        />
      )}
    </>
  );
};

// Patient History Modal Component
const PatientHistoryModal = ({ patient, setShowPatientHistory, isMobile }) => {
  if (!patient) return null;

  return (
    <div style={modalStyles.overlay}>
      <div style={{
        ...modalStyles.modal,
        width: isMobile ? '95%' : '90%',
        maxWidth: '800px',
        maxHeight: '90vh'
      }}>
        <div style={modalStyles.header}>
          <h3 style={modalStyles.title}>
            Medical History - {patient.name}
          </h3>
          <button 
            style={modalStyles.closeButton}
            onClick={() => setShowPatientHistory(false)}
          >
            ✕
          </button>
        </div>

        <div style={modalStyles.content}>
          <div style={modalStyles.patientOverview}>
            <div style={modalStyles.profileIconLarge}>👤</div>
            <div style={modalStyles.patientBasicInfo}>
              <h4 style={modalStyles.patientName}>{patient.name}</h4>
              <div style={modalStyles.patientDetailsGrid}>
                <div style={modalStyles.detailItem}>
                  <span style={modalStyles.detailLabel}>Age:</span>
                  <span style={modalStyles.detailValue}>{patient.age}</span>
                </div>
                <div style={modalStyles.detailItem}>
                  <span style={modalStyles.detailLabel}>Blood Group:</span>
                  <span style={modalStyles.detailValue}>{patient.bloodGroup}</span>
                </div>
                <div style={modalStyles.detailItem}>
                  <span style={modalStyles.detailLabel}>Phone:</span>
                  <span style={modalStyles.detailValue}>{patient.phone}</span>
                </div>
                <div style={modalStyles.detailItem}>
                  <span style={modalStyles.detailLabel}>Last Visit:</span>
                  <span style={modalStyles.detailValue}>{patient.lastVisit}</span>
                </div>
              </div>
            </div>
          </div>

          <div style={modalStyles.medicalConditions}>
            <h4 style={modalStyles.sectionTitle}>Medical Conditions</h4>
            <div style={modalStyles.conditionsList}>
              {patient.conditions.map((condition, index) => (
                <span key={index} style={modalStyles.conditionTag}>
                  {condition}
                </span>
              ))}
            </div>
          </div>

          <div style={modalStyles.medicalHistory}>
            <h4 style={modalStyles.sectionTitle}>Consultation History</h4>
            <div style={modalStyles.historyList}>
              {patient.medicalHistory.map((record, index) => (
                <div key={index} style={modalStyles.historyItem}>
                  <div style={modalStyles.historyHeader}>
                    <strong style={modalStyles.historyDate}>{record.date}</strong>
                    <span style={modalStyles.historyStatus}>Completed</span>
                  </div>
                  <div style={modalStyles.historyDetails}>
                    <p style={modalStyles.historyDiagnosis}>
                      <strong>Diagnosis:</strong> {record.diagnosis}
                    </p>
                    <p style={modalStyles.historyPrescription}>
                      <strong>Prescription:</strong> {record.prescription}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={modalStyles.emergencyInfo}>
            <h4 style={modalStyles.sectionTitle}>Emergency Contact</h4>
            <p style={modalStyles.emergencyContact}>
              {patient.emergencyContact}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Chatbot Modal Component
const ChatbotModal = ({ setShowChatbotModal, isMobile }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello Doctor! I'm your Medical AI assistant. 🤖 How can I help you with patient care today?",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Inject CSS styles safely
  React.useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes typing {
        0%, 60%, 100% {
          transform: translateY(0);
          opacity: 0.4;
        }
        30% {
          transform: translateY(-10px);
          opacity: 1;
        }
      }
      .typing-dots span {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background-color: #9CA3AF;
        animation: typing 1.4s infinite ease-in-out;
      }
      .typing-dots span:nth-child(1) { 
        animation-delay: -0.32s; 
      }
      .typing-dots span:nth-child(2) { 
        animation-delay: -0.16s; 
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    // Add user message
    const userMessage = {
      id: Date.now(),
      text: inputText,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botResponses = [
        "🤖 I can help you with patient summaries, medication information, or clinical guidelines.",
        "🤖 Based on the patient data, I recommend reviewing the latest lab results.",
        "🤖 I can assist with medical literature searches or clinical decision support.",
        "🤖 Would you like me to generate a patient education summary?",
        "🤖 I can help analyze patient trends from your recent consultations.",
        "🤖 I can provide information about drug interactions and side effects.",
        "🤖 Let me help you with differential diagnosis based on symptoms."
      ];
      
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
      
      const botMessage = {
        id: Date.now() + 1,
        text: randomResponse,
        isBot: true,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const formatTime = (timestamp) => {
    return timestamp.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div style={modalStyles.overlay}>
      <div style={{
        ...modalStyles.modal,
        width: isMobile ? '95%' : '420px',
        height: isMobile ? '70vh' : '520px',
        position: 'fixed',
        bottom: isMobile ? 'auto' : '110px',
        right: isMobile ? 'auto' : '30px',
        top: isMobile ? '50%' : 'auto',
        left: isMobile ? '50%' : 'auto',
        transform: isMobile ? 'translate(-50%, -50%)' : 'none'
      }}>
        <div style={modalStyles.header}>
          <div style={modalStyles.chatbotHeader}>
            <div style={modalStyles.chatbotAvatar}>🤖</div>
            <div>
              <h3 style={modalStyles.title}>Medical AI Assistant</h3>
              <p style={modalStyles.chatbotSubtitle}>Clinical support & patient care</p>
            </div>
          </div>
          <button 
            style={modalStyles.closeButton}
            onClick={() => setShowChatbotModal(false)}
          >
            ✕
          </button>
        </div>
        
        <div style={modalStyles.chatbotContent}>
          <div style={modalStyles.chatbotMessages}>
            {messages.map(message => (
              <div
                key={message.id}
                style={{
                  ...modalStyles.chatbotMessage,
                  ...(message.isBot ? modalStyles.botMessage : modalStyles.userMessage)
                }}
              >
                <div style={{
                  ...modalStyles.messageBubble,
                  ...(message.isBot ? modalStyles.botMessageBubble : modalStyles.userMessageBubble)
                }}>
                  <p style={modalStyles.messageText}>{message.text}</p>
                  <span style={modalStyles.messageTime}>
                    {formatTime(message.timestamp)}
                  </span>
                </div>
              </div>
            ))}
            {isTyping && (
              <div style={modalStyles.typingIndicator}>
                <div className="typing-dots" style={modalStyles.typingDots}>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <span style={modalStyles.typingText}>🤖 Medical AI is typing...</span>
              </div>
            )}
          </div>

          <div style={modalStyles.chatbotInput}>
            <input
              type="text"
              placeholder="Ask about patient care, medications, or clinical guidelines..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              style={modalStyles.input}
            />
            <button 
              style={{
                ...modalStyles.primaryButton,
                ...(!inputText.trim() && modalStyles.buttonDisabled)
              }}
              onClick={handleSendMessage}
              disabled={!inputText.trim()}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Profile Modal Component
const ProfileModal = ({ 
  userProfile, 
  setUserProfile, 
  setShowProfileModal, 
  handleProfileUpdate,
  formErrors,
  setFormErrors,
  validateForm,
  isMobile
}) => {
  const [formData, setFormData] = useState({...userProfile});
  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (formErrors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm(formData)) {
      handleProfileUpdate(formData);
      setIsEditing(false);
    }
  };

  const validateName = (name) => {
    const nameRegex = /^[a-zA-Z\s]*$/;
    return nameRegex.test(name) && name.trim().length > 0;
  };

  const handleNameChange = (value) => {
    if (validateName(value) || value === '') {
      handleInputChange('fullName', value);
    }
  };

  const handlePhoneChange = (value) => {
    const phoneRegex = /^[\+\-\d\s\(\)]*$/;
    if (phoneRegex.test(value)) {
      handleInputChange('phone', value);
    }
  };

  const handlePincodeChange = (value) => {
    const pincodeRegex = /^\d{0,6}$/;
    if (pincodeRegex.test(value)) {
      handleInputChange('pincode', value);
    }
  };

  const handleLicenseChange = (value) => {
    const licenseRegex = /^[A-Za-z0-9\-]*$/;
    if (licenseRegex.test(value)) {
      handleInputChange('licenseNumber', value);
    }
  };

  const handleExperienceChange = (value) => {
    const experienceRegex = /^[0-9\sA-Za-z]*$/;
    if (experienceRegex.test(value)) {
      handleInputChange('experience', value);
    }
  };

  return (
    <div style={modalStyles.overlay}>
      <div style={{
        ...modalStyles.modal,
        width: isMobile ? '95%' : '90%',
        maxWidth: '500px',
        maxHeight: '90vh',
        overflow: 'auto'
      }}>
        <div style={modalStyles.header}>
          <h3 style={modalStyles.title}>
            {isEditing ? 'Edit Profile' : 'Profile Information'}
          </h3>
          <div style={modalStyles.headerActions}>
            {!isEditing ? (
              <button 
                style={modalStyles.editButton}
                onClick={() => setIsEditing(true)}
              >
                ✏️ Edit
              </button>
            ) : null}
            <button 
              style={modalStyles.closeButton}
              onClick={() => {
                setShowProfileModal(false);
                setFormErrors({});
                setIsEditing(false);
              }}
            >
              ✕
            </button>
          </div>
        </div>

        {!isEditing ? (
          // View Mode
          <div style={modalStyles.content}>
            <div style={modalStyles.profileView}>
              <div style={modalStyles.profileAvatar}>👨‍⚕️</div>
              <div style={modalStyles.profileInfo}>
                <h4 style={modalStyles.profileName}>Dr. {userProfile.fullName}</h4>
                <p style={modalStyles.profileSpecialization}>{userProfile.specialization}</p>
              </div>
            </div>

            <div style={modalStyles.profileDetails}>
              <div style={modalStyles.detailItem}>
                <span style={modalStyles.detailLabel}>Email:</span>
                <span style={modalStyles.detailValue}>{userProfile.email}</span>
              </div>
              <div style={modalStyles.detailItem}>
                <span style={modalStyles.detailLabel}>Phone:</span>
                <span style={modalStyles.detailValue}>{userProfile.phone}</span>
              </div>
              <div style={modalStyles.detailItem}>
                <span style={modalStyles.detailLabel}>License Number:</span>
                <span style={modalStyles.detailValue}>{userProfile.licenseNumber}</span>
              </div>
              <div style={modalStyles.detailItem}>
                <span style={modalStyles.detailLabel}>Experience:</span>
                <span style={modalStyles.detailValue}>{userProfile.experience}</span>
              </div>
              <div style={modalStyles.detailItem}>
                <span style={modalStyles.detailLabel}>Hospital/Clinic:</span>
                <span style={modalStyles.detailValue}>{userProfile.hospital}</span>
              </div>
              <div style={modalStyles.detailItem}>
                <span style={modalStyles.detailLabel}>Address:</span>
                <span style={modalStyles.detailValue}>{userProfile.address}</span>
              </div>
            </div>
          </div>
        ) : (
          // Edit Mode
          <form onSubmit={handleSubmit}>
            <div style={modalStyles.content}>
              <div style={{
                ...modalStyles.formGrid,
                gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr'
              }}>
                <div style={modalStyles.formRow}>
                  <label style={modalStyles.label}>Full Name *</label>
                  <input
                    type="text"
                    style={{
                      ...modalStyles.input,
                      ...(formErrors.fullName && modalStyles.inputError)
                    }}
                    value={formData.fullName}
                    onChange={(e) => handleNameChange(e.target.value)}
                    placeholder="Enter your full name"
                  />
                  {formErrors.fullName && <span style={modalStyles.error}>{formErrors.fullName}</span>}
                </div>
                <div style={modalStyles.formRow}>
                  <label style={modalStyles.label}>Email *</label>
                  <input
                    type="email"
                    style={{
                      ...modalStyles.input,
                      ...(formErrors.email && modalStyles.inputError)
                    }}
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="Enter your email"
                  />
                  {formErrors.email && <span style={modalStyles.error}>{formErrors.email}</span>}
                </div>
              </div>

              <div style={{
                ...modalStyles.formGrid,
                gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr'
              }}>
                <div style={modalStyles.formRow}>
                  <label style={modalStyles.label}>Phone *</label>
                  <input
                    type="tel"
                    style={{
                      ...modalStyles.input,
                      ...(formErrors.phone && modalStyles.inputError)
                    }}
                    value={formData.phone}
                    onChange={(e) => handlePhoneChange(e.target.value)}
                    placeholder="Enter your phone number"
                  />
                  {formErrors.phone && <span style={modalStyles.error}>{formErrors.phone}</span>}
                </div>
                <div style={modalStyles.formRow}>
                  <label style={modalStyles.label}>Specialization *</label>
                  <input
                    type="text"
                    style={{
                      ...modalStyles.input,
                      ...(formErrors.specialization && modalStyles.inputError)
                    }}
                    value={formData.specialization}
                    onChange={(e) => handleInputChange('specialization', e.target.value)}
                    placeholder="Enter your specialization"
                  />
                  {formErrors.specialization && <span style={modalStyles.error}>{formErrors.specialization}</span>}
                </div>
              </div>

              <div style={{
                ...modalStyles.formGrid,
                gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr'
              }}>
                <div style={modalStyles.formRow}>
                  <label style={modalStyles.label}>License Number *</label>
                  <input
                    type="text"
                    style={{
                      ...modalStyles.input,
                      ...(formErrors.licenseNumber && modalStyles.inputError)
                    }}
                    value={formData.licenseNumber}
                    onChange={(e) => handleLicenseChange(e.target.value)}
                    placeholder="Enter license number"
                  />
                  {formErrors.licenseNumber && <span style={modalStyles.error}>{formErrors.licenseNumber}</span>}
                </div>
                <div style={modalStyles.formRow}>
                  <label style={modalStyles.label}>Experience *</label>
                  <input
                    type="text"
                    style={{
                      ...modalStyles.input,
                      ...(formErrors.experience && modalStyles.inputError)
                    }}
                    value={formData.experience}
                    onChange={(e) => handleExperienceChange(e.target.value)}
                    placeholder="Enter years of experience"
                  />
                  {formErrors.experience && <span style={modalStyles.error}>{formErrors.experience}</span>}
                </div>
              </div>

              <div style={modalStyles.formRow}>
                <label style={modalStyles.label}>Hospital/Clinic</label>
                <input
                  type="text"
                  style={modalStyles.input}
                  value={formData.hospital}
                  onChange={(e) => handleInputChange('hospital', e.target.value)}
                  placeholder="Enter hospital or clinic name"
                />
              </div>

              <div style={modalStyles.formRow}>
                <label style={modalStyles.label}>Address</label>
                <input
                  type="text"
                  style={modalStyles.input}
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  placeholder="Enter complete address"
                />
              </div>

              <div style={{
                ...modalStyles.formGrid,
                gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr 1fr'
              }}>
                <div style={modalStyles.formRow}>
                  <label style={modalStyles.label}>City</label>
                  <input
                    type="text"
                    style={modalStyles.input}
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    placeholder="Enter city"
                  />
                </div>
                <div style={modalStyles.formRow}>
                  <label style={modalStyles.label}>State</label>
                  <input
                    type="text"
                    style={modalStyles.input}
                    value={formData.state}
                    onChange={(e) => handleInputChange('state', e.target.value)}
                    placeholder="Enter state"
                  />
                </div>
                <div style={modalStyles.formRow}>
                  <label style={modalStyles.label}>Pincode</label>
                  <input
                    type="text"
                    style={{
                      ...modalStyles.input,
                      ...(formErrors.pincode && modalStyles.inputError)
                    }}
                    value={formData.pincode}
                    onChange={(e) => handlePincodeChange(e.target.value)}
                    placeholder="Enter 6-digit pincode"
                    maxLength="6"
                  />
                  {formErrors.pincode && <span style={modalStyles.error}>{formErrors.pincode}</span>}
                </div>
              </div>
            </div>
            <div style={{
              ...modalStyles.actions,
              flexDirection: isMobile ? 'column' : 'row'
            }}>
              <button 
                type="button"
                style={{
                  ...modalStyles.secondaryButton,
                  ...(isMobile && { width: '100%' })
                }}
                onClick={() => {
                  setIsEditing(false);
                  setFormData({...userProfile});
                  setFormErrors({});
                }}
              >
                Cancel
              </button>
              <button 
                type="submit"
                style={{
                  ...modalStyles.primaryButton,
                  ...(isMobile && { width: '100%' })
                }}
              >
                Update Profile
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

// Notifications Modal Component
const NotificationsModal = ({ 
  notifications, 
  setShowNotificationsModal,
  handleMarkNotificationAsRead,
  handleMarkAllNotificationsAsRead,
  handleClearAllNotifications,
  isMobile
}) => (
  <div style={modalStyles.overlay}>
    <div style={{
      ...modalStyles.modal,
      width: isMobile ? '95%' : '500px',
      maxHeight: '80vh'
    }}>
      <div style={modalStyles.header}>
        <h3 style={modalStyles.title}>Notifications</h3>
        <div style={modalStyles.notificationActions}>
          <button style={modalStyles.smallButton} onClick={handleMarkAllNotificationsAsRead}>
            Mark All Read
          </button>
          <button style={modalStyles.smallButton} onClick={handleClearAllNotifications}>
            Clear All
          </button>
          <button 
            style={modalStyles.closeButton}
            onClick={() => setShowNotificationsModal(false)}
          >
            ✕
          </button>
        </div>
      </div>
      <div style={modalStyles.content}>
        {notifications.length === 0 ? (
          <div style={modalStyles.emptyState}>
            <div style={modalStyles.emptyIcon}>🔔</div>
            <h4>No Notifications</h4>
            <p>You're all caught up!</p>
          </div>
        ) : (
          <div style={modalStyles.notificationsList}>
            {notifications.map(notification => (
              <div
                key={notification.id}
                style={{
                  ...modalStyles.notificationItem,
                  ...(!notification.read && modalStyles.unreadNotification)
                }}
                onClick={() => handleMarkNotificationAsRead(notification.id)}
              >
                <div style={modalStyles.notificationIcon}>
                  {notification.type === 'appointment' && '📅'}
                  {notification.type === 'message' && '💬'}
                  {notification.type === 'reminder' && '⏰'}
                  {notification.type === 'system' && '🔧'}
                  {notification.type === 'prescription' && '💊'}
                </div>
                <div style={modalStyles.notificationContent}>
                  <h4 style={modalStyles.notificationTitle}>{notification.title}</h4>
                  <p style={modalStyles.notificationMessage}>{notification.message}</p>
                  <span style={modalStyles.notificationTime}>{notification.time}</span>
                  <div style={{
                    ...modalStyles.priorityIndicator,
                    ...(notification.priority === 'high' && modalStyles.highPriority),
                    ...(notification.priority === 'medium' && modalStyles.mediumPriority),
                    ...(notification.priority === 'low' && modalStyles.lowPriority)
                  }}>
                    {notification.priority}
                  </div>
                </div>
                {!notification.read && <div style={modalStyles.unreadDot}></div>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  </div>
);

// Messages Modal Component
const MessagesModal = ({
  showMessagesModal,
  setShowMessagesModal,
  selectedPatient,
  patientMessages,
  handleSendMessage,
  handleMarkAsRead,
  handleViewFullHistory,
  handleAddNotes,
  dashboardData,
  isMobile
}) => {
  const [newMessage, setNewMessage] = useState('');

  if (!showMessagesModal) return null;

  const patientName = selectedPatient?.name;
  const messages = patientName ? patientMessages[patientName] || [] : [];

  const handleSend = () => {
    if (newMessage.trim() && patientName) {
      handleSendMessage(patientName, newMessage);
      setNewMessage('');
    }
  };

  const formatMessageTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now - date) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };

  return (
    <div style={modalStyles.overlay}>
      <div style={{
        ...modalStyles.modal,
        width: isMobile ? '95%' : '600px',
        height: isMobile ? '90vh' : '70vh'
      }}>
        <div style={modalStyles.header}>
          <h3 style={modalStyles.title}>
            {selectedPatient ? `Messages with ${selectedPatient.name}` : 'Messages'}
          </h3>
          <button 
            style={modalStyles.closeButton}
            onClick={() => setShowMessagesModal(false)}
          >
            ✕
          </button>
        </div>
        <div style={modalStyles.messagesContent}>
          {selectedPatient ? (
            <>
              <div style={modalStyles.chatHeader}>
                <div style={modalStyles.chatPatientInfo}>
                  <div style={modalStyles.chatAvatar}>👤</div>
                  <div>
                    <h4 style={modalStyles.chatPatientName}>{selectedPatient.name}</h4>
                    <p style={modalStyles.chatPatientDetails}>
                      {selectedPatient.conditions?.join(', ')} • Last visit: {selectedPatient.lastVisit}
                    </p>
                  </div>
                </div>
                <div style={{
                  ...modalStyles.chatActions,
                  flexDirection: isMobile ? 'column' : 'row',
                  gap: isMobile ? '5px' : '8px'
                }}>
                  <button 
                    style={modalStyles.smallButton}
                    onClick={() => handleViewFullHistory(selectedPatient.name)}
                  >
                    View History
                  </button>
                  <button 
                    style={modalStyles.smallButton}
                    onClick={() => handleAddNotes(selectedPatient.name)}
                  >
                    Add Notes
                  </button>
                </div>
              </div>

              <div style={modalStyles.messagesList}>
                {messages.map(message => (
                  <div
                    key={message.id}
                    style={{
                      ...modalStyles.messageBubble,
                      ...(message.from === 'doctor' ? modalStyles.messageRight : modalStyles.messageLeft),
                      maxWidth: isMobile ? '85%' : '70%'
                    }}
                  >
                    <div style={{
                      ...modalStyles.messageContent,
                      ...(message.from === 'doctor' ? modalStyles.messageRightContent : modalStyles.messageLeftContent)
                    }}>
                      <p style={modalStyles.messageText}>{message.message}</p>
                      <span style={modalStyles.messageTime}>
                        {formatMessageTime(message.timestamp)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{
                ...modalStyles.messageInput,
                flexDirection: isMobile ? 'column' : 'row',
                gap: isMobile ? '10px' : '12px'
              }}>
                <input
                  type="text"
                  placeholder="Type your message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  style={modalStyles.input}
                />
                <button 
                  style={{
                    ...modalStyles.primaryButton,
                    ...(!newMessage.trim() && modalStyles.buttonDisabled),
                    ...(isMobile && { width: '100%' })
                  }}
                  onClick={handleSend}
                  disabled={!newMessage.trim()}
                >
                  Send
                </button>
              </div>
            </>
          ) : (
            <div style={modalStyles.emptyState}>
              <div style={modalStyles.emptyIcon}>💬</div>
              <h4>Select a conversation</h4>
              <p>Choose a patient to start messaging</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Logout Modal Component
const LogoutModal = ({ setShowLogoutConfirm, onLogout, isMobile }) => (
  <div style={modalStyles.overlay}>
    <div style={{
      ...modalStyles.confirmModal,
      width: isMobile ? '90%' : '400px'
    }}>
      <div style={modalStyles.confirmHeader}>
        <div style={modalStyles.confirmIcon}>🚪</div>
        <h3 style={modalStyles.title}>Confirm Logout</h3>
      </div>
      <div style={modalStyles.confirmContent}>
        <p>Are you sure you want to logout from your account?</p>
      </div>
      <div style={{
        ...modalStyles.confirmActions,
        flexDirection: isMobile ? 'column' : 'row'
      }}>
        <button 
          style={{
            ...modalStyles.secondaryButton,
            ...(isMobile && { width: '100%' })
          }}
          onClick={() => setShowLogoutConfirm(false)}
        >
          Cancel
        </button>
        <button 
          style={{
            ...modalStyles.dangerButton,
            ...(isMobile && { width: '100%' })
          }}
          onClick={onLogout}
        >
          Logout
        </button>
      </div>
    </div>
  </div>
);

// Consultation Modal Component
const ConsultationModal = ({
  consultationDetails,
  setConsultationDetails,
  handleViewFullHistory,
  handleAddNotes,
  handleStartConversation,
  dashboardData,
  isMobile
}) => {
  const handleViewHistory = () => {
    handleViewFullHistory(consultationDetails.patientName);
    setConsultationDetails(null);
  };

  return (
    <div style={modalStyles.overlay}>
      <div style={{
        ...modalStyles.modal,
        width: isMobile ? '95%' : '500px'
      }}>
        <div style={modalStyles.header}>
          <h3 style={modalStyles.title}>Consultation Details</h3>
          <button 
            style={modalStyles.closeButton}
            onClick={() => setConsultationDetails(null)}
          >
            ✕
          </button>
        </div>
        <div style={modalStyles.content}>
          <div style={modalStyles.patientInfo}>
            <div style={modalStyles.profileIcon}>👤</div>
            <div>
              <h4 style={modalStyles.patientName}>{consultationDetails.patientName}</h4>
              <p style={modalStyles.patientAge}>Age: {consultationDetails.age}</p>
            </div>
          </div>
          <div style={modalStyles.details}>
            <p><strong>Date & Time:</strong> {consultationDetails.date} at {consultationDetails.time}</p>
            <p><strong>Reason:</strong> {consultationDetails.issue}</p>
            <p><strong>Status:</strong> {consultationDetails.status}</p>
            {consultationDetails.prescription && (
              <p><strong>Prescription:</strong> {consultationDetails.prescription}</p>
            )}
            {consultationDetails.notes && (
              <p><strong>Doctor Notes:</strong> {consultationDetails.notes}</p>
            )}
          </div>
          <div style={{
            ...modalStyles.actions,
            flexDirection: isMobile ? 'column' : 'row'
          }}>
            <button 
              style={{
                ...modalStyles.primaryButton,
                ...(isMobile && { width: '100%' })
              }}
              onClick={handleViewHistory}
            >
              View Full History
            </button>
            <button 
              style={{
                ...modalStyles.secondaryButton,
                ...(isMobile && { width: '100%' })
              }}
              onClick={() => handleAddNotes(consultationDetails.patientName)}
            >
              Add Notes
            </button>
            <button 
              style={{
                ...modalStyles.secondaryButton,
                ...(isMobile && { width: '100%' })
              }}
              onClick={() => {
                const patient = dashboardData.patients.find(p => p.name === consultationDetails.patientName);
                if (patient) handleStartConversation(patient);
              }}
            >
              Message Patient
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Modal styles
const modalStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: '20px'
  },
  modal: {
    backgroundColor: 'white',
    borderRadius: '12px',
    maxHeight: '90vh',
    overflow: 'auto',
    boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)'
  },
  confirmModal: {
    backgroundColor: 'white',
    borderRadius: '12px',
    textAlign: 'center'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px',
    borderBottom: '1px solid #e5e7eb'
  },
  confirmHeader: {
    padding: '32px 24px 16px',
    borderBottom: '1px solid #e5e7eb'
  },
  confirmIcon: {
    fontSize: '48px',
    marginBottom: '16px'
  },
  title: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#1f2937',
    margin: 0
  },
  closeButton: {
    background: 'none',
    border: 'none',
    fontSize: '20px',
    cursor: 'pointer',
    color: '#6b7280'
  },
  content: {
    padding: '20px'
  },
  confirmContent: {
    padding: '20px'
  },
  formGrid: {
    display: 'grid',
    gap: '16px',
    marginBottom: '16px'
  },
  formRow: {
    marginBottom: '16px'
  },
  label: {
    display: 'block',
    marginBottom: '6px',
    fontWeight: '500',
    color: '#374151',
    fontSize: '14px'
  },
  input: {
    width: '100%',
    padding: '10px 12px',
    border: '1px solid #d1d5db',
    borderRadius: '6px',
    fontSize: '14px',
    boxSizing: 'border-box'
  },
  inputError: {
    borderColor: '#EF4444',
    backgroundColor: '#FEF2F2'
  },
  error: {
    color: '#EF4444',
    fontSize: '12px',
    marginTop: '4px',
    display: 'block'
  },
  actions: {
    display: 'flex',
    gap: '12px',
    padding: '20px',
    borderTop: '1px solid #e5e7eb'
  },
  confirmActions: {
    display: 'flex',
    gap: '12px',
    padding: '20px',
    borderTop: '1px solid #e5e7eb'
  },
  primaryButton: {
    padding: '12px 20px',
    backgroundColor: '#7C2A62',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    flex: 1
  },
  secondaryButton: {
    padding: '12px 20px',
    backgroundColor: 'transparent',
    color: '#6b7280',
    border: '2px solid #e5e7eb',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    flex: 1
  },
  dangerButton: {
    padding: '12px 20px',
    backgroundColor: '#EF4444',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    flex: 1
  },
  smallButton: {
    padding: '6px 12px',
    backgroundColor: 'transparent',
    color: '#7C2A62',
    border: '1px solid #7C2A62',
    borderRadius: '6px',
    fontSize: '12px',
    cursor: 'pointer',
    whiteSpace: 'nowrap'
  },
  buttonDisabled: {
    backgroundColor: '#9CA3AF',
    cursor: 'not-allowed'
  },
  notificationActions: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    flexWrap: 'wrap'
  },
  emptyState: {
    textAlign: 'center',
    padding: '40px 20px',
    color: '#6b7280'
  },
  emptyIcon: {
    fontSize: '48px',
    marginBottom: '16px',
    opacity: 0.5
  },
  notificationsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  notificationItem: {
    display: 'flex',
    padding: '16px',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    cursor: 'pointer',
    position: 'relative'
  },
  unreadNotification: {
    backgroundColor: '#F7D9EB',
    borderColor: '#7C2A62'
  },
  notificationIcon: {
    fontSize: '20px',
    marginRight: '12px',
    marginTop: '2px',
    flexShrink: 0
  },
  notificationContent: {
    flex: 1
  },
  notificationTitle: {
    fontSize: '14px',
    fontWeight: '600',
    margin: '0 0 4px 0'
  },
  notificationMessage: {
    fontSize: '13px',
    color: '#6b7280',
    margin: '0 0 8px 0'
  },
  notificationTime: {
    fontSize: '11px',
    color: '#9CA3AF'
  },
  priorityIndicator: {
    display: 'inline-block',
    padding: '2px 8px',
    borderRadius: '12px',
    fontSize: '10px',
    fontWeight: '600',
    textTransform: 'uppercase'
  },
  highPriority: {
    backgroundColor: '#FEE2E2',
    color: '#DC2626'
  },
  mediumPriority: {
    backgroundColor: '#FEF3C7',
    color: '#D97706'
  },
  lowPriority: {
    backgroundColor: '#D1FAE5',
    color: '#059669'
  },
  unreadDot: {
    position: 'absolute',
    top: '12px',
    right: '12px',
    width: '8px',
    height: '8px',
    backgroundColor: '#EF4444',
    borderRadius: '50%'
  },
  messagesContent: {
    display: 'flex',
    flexDirection: 'column',
    height: '400px'
  },
  chatHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px',
    borderBottom: '1px solid #e5e7eb',
    flexWrap: 'wrap',
    gap: '10px'
  },
  chatPatientInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    flex: 1
  },
  chatAvatar: {
    fontSize: '32px',
    flexShrink: 0
  },
  chatPatientName: {
    fontSize: '16px',
    fontWeight: '600',
    margin: '0 0 4px 0'
  },
  chatPatientDetails: {
    fontSize: '12px',
    color: '#6b7280',
    margin: 0
  },
  chatActions: {
    display: 'flex',
    gap: '8px'
  },
  messagesList: {
    flex: 1,
    padding: '20px',
    overflow: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  messageBubble: {
    display: 'flex'
  },
  messageLeft: {
    alignSelf: 'flex-start'
  },
  messageRight: {
    alignSelf: 'flex-end'
  },
  messageContent: {
    padding: '12px 16px',
    borderRadius: '16px'
  },
  messageLeftContent: {
    backgroundColor: '#f3f4f6'
  },
  messageRightContent: {
    backgroundColor: '#7C2A62',
    color: 'white'
  },
  messageText: {
    margin: '0 0 4px 0',
    fontSize: '14px'
  },
  messageTime: {
    fontSize: '11px',
    opacity: 0.7
  },
  messageInput: {
    display: 'flex',
    padding: '20px',
    borderTop: '1px solid #e5e7eb'
  },
  patientInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '20px'
  },
  profileIcon: {
    width: '50px',
    height: '50px',
    backgroundColor: '#F7D9EB',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '20px',
    flexShrink: 0
  },
  patientName: {
    fontSize: '18px',
    fontWeight: '600',
    margin: '0 0 4px 0'
  },
  patientAge: {
    fontSize: '14px',
    color: '#6b7280',
    margin: 0
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    marginBottom: '20px'
  },
  // Chatbot specific styles
  chatbotHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  chatbotAvatar: {
    fontSize: '32px'
  },
  chatbotSubtitle: {
    fontSize: '12px',
    color: '#6b7280',
    margin: 0
  },
  chatbotContent: {
    display: 'flex',
    flexDirection: 'column',
    height: '400px'
  },
  chatbotMessages: {
    flex: 1,
    padding: '20px',
    overflow: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  chatbotMessage: {
    display: 'flex'
  },
  botMessage: {
    alignSelf: 'flex-start'
  },
  userMessage: {
    alignSelf: 'flex-end'
  },
  botMessageBubble: {
    backgroundColor: '#f3f4f6'
  },
  userMessageBubble: {
    backgroundColor: '#7C2A62',
    color: 'white'
  },
  chatbotInput: {
    display: 'flex',
    padding: '20px',
    borderTop: '1px solid #e5e7eb',
    gap: '12px'
  },
  typingIndicator: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 16px',
    backgroundColor: '#f3f4f6',
    borderRadius: '16px',
    alignSelf: 'flex-start'
  },
  typingDots: {
    display: 'flex',
    gap: '4px'
  },
  typingText: {
    fontSize: '12px',
    color: '#6b7280'
  },
  editButton: {
    padding: '6px 12px',
    backgroundColor: 'transparent',
    color: '#7C2A62',
    border: '1px solid #7C2A62',
    borderRadius: '6px',
    fontSize: '12px',
    cursor: 'pointer'
  },
  headerActions: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  profileView: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    marginBottom: '24px',
    padding: '16px',
    backgroundColor: '#f8fafc',
    borderRadius: '8px'
  },
  profileAvatar: {
    fontSize: '48px'
  },
  profileInfo: {
    flex: 1
  },
  profileName: {
    fontSize: '18px',
    fontWeight: '600',
    margin: '0 0 4px 0',
    color: '#1f2937'
  },
  profileSpecialization: {
    fontSize: '14px',
    color: '#6b7280',
    margin: 0
  },
  profileDetails: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  detailItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: '8px 0',
    borderBottom: '1px solid #e5e7eb'
  },
  detailLabel: {
    fontSize: '14px',
    color: '#6b7280',
    fontWeight: '500'
  },
  detailValue: {
    fontSize: '14px',
    color: '#1f2937',
    fontWeight: '600',
    textAlign: 'right',
    maxWidth: '60%'
  },
  // Patient History Modal Styles
  patientOverview: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '20px',
    marginBottom: '24px',
    padding: '16px',
    backgroundColor: '#f8fafc',
    borderRadius: '8px'
  },
  profileIconLarge: {
    fontSize: '48px',
    flexShrink: 0
  },
  patientBasicInfo: {
    flex: 1
  },
  patientDetailsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '12px'
  },
  medicalConditions: {
    marginBottom: '24px'
  },
  sectionTitle: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#1f2937',
    margin: '0 0 12px 0'
  },
  conditionsList: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px'
  },
  conditionTag: {
    backgroundColor: '#F7D9EB',
    color: '#7C2A62',
    padding: '6px 12px',
    borderRadius: '16px',
    fontSize: '12px',
    fontWeight: '500'
  },
  medicalHistory: {
    marginBottom: '24px'
  },
  historyList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  historyItem: {
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    padding: '16px'
  },
  historyHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '8px',
    flexWrap: 'wrap',
    gap: '8px'
  },
  historyDate: {
    fontSize: '14px',
    color: '#1f2937'
  },
  historyStatus: {
    backgroundColor: '#10B981',
    color: 'white',
    padding: '4px 8px',
    borderRadius: '12px',
    fontSize: '11px',
    fontWeight: '500'
  },
  historyDetails: {
    fontSize: '14px',
    color: '#6b7280'
  },
  historyDiagnosis: {
    margin: '0 0 4px 0'
  },
  historyPrescription: {
    margin: 0
  },
  emergencyInfo: {
    padding: '16px',
    backgroundColor: '#FEF3C7',
    borderRadius: '8px',
    border: '1px solid #F59E0B'
  },
  emergencyContact: {
    margin: 0,
    fontSize: '14px',
    color: '#92400E',
    fontWeight: '500'
  }
};

export default DoctorModals;