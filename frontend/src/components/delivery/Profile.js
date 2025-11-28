import React, { useState } from 'react';

const Profile = ({ profileData, setShowProfileImageUpload }) => {
  const [fieldErrors, setFieldErrors] = useState({});
  const [activeEditField, setActiveEditField] = useState(null);
  const [formData, setFormData] = useState({
    // Personal Information
    fullName: profileData.fullName,
    email: profileData.email,
    phone: profileData.phone,
    currentLocation: profileData.currentLocation,
    vehicleType: profileData.vehicleType,
    vehicleNumber: profileData.vehicleNumber,
    
    // Emergency Contacts
    emergencyContact1Name: profileData.emergencyContact1Name || '',
    emergencyContact1Phone: profileData.emergencyContact1Phone || '',
    emergencyContact1Relation: profileData.emergencyContact1Relation || '',
    emergencyContact2Name: profileData.emergencyContact2Name || '',
    emergencyContact2Phone: profileData.emergencyContact2Phone || '',
    emergencyContact2Relation: profileData.emergencyContact2Relation || '',
    
    // Bank Details
    bankAccountNumber: profileData.bankAccountNumber || '',
    bankAccountHolder: profileData.bankAccountHolder || '',
    bankName: profileData.bankName || '',
    ifscCode: profileData.ifscCode || '',
    upiId: profileData.upiId || ''
  });

  const styles = {
    mainContent: {
      padding: '20px',
      minHeight: '100vh',
      backgroundColor: '#f8f9fa'
    },
    header: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      marginBottom: '30px'
    },
    greeting: {
      fontSize: '28px',
      fontWeight: '700',
      color: '#1f2937',
      margin: '0 0 8px 0',
      textAlign: 'center'
    },
    subtitle: {
      fontSize: '14px',
      color: '#6b7280',
      margin: 0,
      textAlign: 'center'
    },
    profileContainer: {
      maxWidth: '800px',
      margin: '0 auto',
      backgroundColor: 'white',
      borderRadius: '8px',
      padding: '30px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
    },
    profileHeader: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '30px',
      paddingBottom: '20px',
      borderBottom: '1px solid #e5e7eb'
    },
    profileAvatar: {
      marginRight: '20px',
      position: 'relative'
    },
    profileImage: {
      width: '80px',
      height: '80px',
      borderRadius: '50%',
      objectFit: 'cover',
      border: '3px solid #7C2A62'
    },
    profileImagePlaceholder: {
      width: '80px',
      height: '80px',
      borderRadius: '50%',
      backgroundColor: '#F7D9EB',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: '3px solid #7C2A62'
    },
    avatarIcon: {
      fontSize: '32px',
      color: '#7C2A62'
    },
    changePhotoButton: {
      position: 'absolute',
      bottom: '0',
      right: '0',
      backgroundColor: '#7C2A62',
      color: 'white',
      border: 'none',
      borderRadius: '50%',
      width: '28px',
      height: '28px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '12px',
      boxShadow: '0 1px 4px rgba(0,0,0,0.3)'
    },
    profileUserInfo: {
      flex: 1
    },
    agentId: {
      fontSize: '16px',
      color: '#6b7280',
      margin: '0 0 10px 0',
      fontWeight: '500'
    },
    formSection: {
      marginBottom: '40px'
    },
    sectionTitle: {
      fontSize: '18px',
      fontWeight: '600',
      color: '#1f2937',
      margin: '0 0 20px 0',
      paddingBottom: '10px',
      borderBottom: '2px solid #7C2A62'
    },
    sectionSubtitle: {
      fontSize: '14px',
      color: '#6b7280',
      margin: '0 0 15px 0',
      fontStyle: 'italic'
    },
    formGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '20px',
      marginBottom: '10px'
    },
    formRow: {
      display: 'flex',
      flexDirection: 'column',
      marginBottom: '15px'
    },
    formRowFull: {
      gridColumn: '1 / -1',
      display: 'flex',
      flexDirection: 'column',
      marginBottom: '15px'
    },
    label: {
      fontSize: '14px',
      fontWeight: '600',
      color: '#374151',
      marginBottom: '6px',
      display: 'flex',
      alignItems: 'center',
      gap: '5px'
    },
    required: {
      color: '#EF4444'
    },
    inputContainer: {
      position: 'relative',
      width: '100%'
    },
    input: {
      width: '100%',
      padding: '10px 12px',
      border: '1px solid #d1d5db',
      borderRadius: '6px',
      fontSize: '14px',
      backgroundColor: 'white',
      transition: 'all 0.2s ease',
      outline: 'none',
      boxSizing: 'border-box'
    },
    inputEditing: {
      borderColor: '#7C2A62',
      backgroundColor: '#fafafa'
    },
    inputError: {
      borderColor: '#EF4444',
      backgroundColor: '#FEF2F2'
    },
    inputSuccess: {
      borderColor: '#10B981',
      backgroundColor: '#F0FDF4'
    },
    select: {
      width: '100%',
      padding: '10px 12px',
      border: '1px solid #d1d5db',
      borderRadius: '6px',
      fontSize: '14px',
      backgroundColor: 'white',
      outline: 'none',
      boxSizing: 'border-box'
    },
    phonePrefix: {
      position: 'absolute',
      left: '12px',
      top: '50%',
      transform: 'translateY(-50%)',
      color: '#6b7280',
      fontWeight: '500',
      fontSize: '14px'
    },
    phoneInput: {
      paddingLeft: '40px'
    },
    errorText: {
      color: '#EF4444',
      fontSize: '12px',
      marginTop: '4px',
      fontWeight: '500',
      display: 'flex',
      alignItems: 'center',
      gap: '4px'
    },
    successText: {
      color: '#10B981',
      fontSize: '12px',
      marginTop: '4px',
      fontWeight: '500',
      display: 'flex',
      alignItems: 'center',
      gap: '4px'
    },
    fieldValue: {
      padding: '10px 12px',
      fontSize: '14px',
      color: '#1f2937',
      fontWeight: '500',
      backgroundColor: '#f8fafc',
      borderRadius: '6px',
      border: '1px solid #e5e7eb',
      minHeight: '40px',
      display: 'flex',
      alignItems: 'center',
      position: 'relative'
    },
    sensitiveData: {
      color: '#EF4444',
      fontWeight: '600',
      backgroundColor: '#FEF2F2',
      padding: '2px 6px',
      borderRadius: '4px'
    },
    editButton: {
      position: 'absolute',
      right: '10px',
      top: '50%',
      transform: 'translateY(-50%)',
      backgroundColor: 'transparent',
      border: 'none',
      color: '#7C2A62',
      cursor: 'pointer',
      fontSize: '14px',
      padding: '4px',
      borderRadius: '4px',
      transition: 'all 0.2s ease'
    },
    fieldActions: {
      position: 'absolute',
      right: '10px',
      top: '50%',
      transform: 'translateY(-50%)',
      display: 'flex',
      gap: '8px'
    },
    iconButton: {
      backgroundColor: 'transparent',
      border: 'none',
      cursor: 'pointer',
      fontSize: '12px',
      padding: '4px',
      borderRadius: '4px',
      width: '24px',
      height: '24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all 0.2s ease'
    },
    saveIcon: {
      color: '#10B981',
      '&:hover': {
        backgroundColor: '#10B981',
        color: 'white'
      }
    },
    cancelIcon: {
      color: '#EF4444',
      '&:hover': {
        backgroundColor: '#EF4444',
        color: 'white'
      }
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '15px',
      marginTop: '10px'
    },
    statItem: {
      padding: '15px',
      backgroundColor: '#f8fafc',
      borderRadius: '8px',
      border: '1px solid #e5e7eb',
      textAlign: 'center'
    },
    statLabel: {
      fontSize: '12px',
      color: '#6b7280',
      fontWeight: '600',
      textTransform: 'uppercase',
      marginBottom: '5px'
    },
    statValue: {
      fontSize: '16px',
      color: '#1f2937',
      fontWeight: '600'
    },
    nameSection: {
      display: 'flex',
      gap: '15px',
      marginBottom: '10px'
    },
    nameField: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column'
    }
  };

  const handleFieldEdit = (field) => {
    setActiveEditField(field);
  };

  const handleFieldSave = (field) => {
    const isValid = validateField(field, formData[field]);
    if (isValid) {
      setActiveEditField(null);
      // Update the profile data in real-time
      profileData[field] = formData[field];
      console.log(`Field ${field} saved:`, formData[field]);
      // Here you would typically send the data to your backend for this specific field
    }
  };

  const handleFieldCancel = (field) => {
    setActiveEditField(null);
    setFormData(prev => ({
      ...prev,
      [field]: profileData[field] || ''
    }));
    setFieldErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[field];
      return newErrors;
    });
  };

  const validateField = (field, value) => {
    const errors = { ...fieldErrors };

    switch (field) {
      case 'fullName':
        if (!value.trim()) {
          errors.fullName = 'Full name is required';
        } else if (!/^[a-zA-Z\s]{2,50}$/.test(value)) {
          errors.fullName = 'Name should contain only alphabets (2-50 characters)';
        } else {
          delete errors.fullName;
        }
        break;

      case 'email':
        if (!value.trim()) {
          errors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          errors.email = 'Please enter a valid email address';
        } else {
          delete errors.email;
        }
        break;

      case 'phone':
        if (!value.trim()) {
          errors.phone = 'Phone number is required';
        } else {
          const cleanPhone = value.replace(/\D/g, '');
          if (cleanPhone.length !== 10) {
            errors.phone = 'Phone number must be 10 digits';
          } else if (!/^[6-9]/.test(cleanPhone)) {
            errors.phone = 'Phone number must start with 6, 7, 8, or 9';
          } else {
            delete errors.phone;
          }
        }
        break;

      case 'currentLocation':
        if (!value.trim()) {
          errors.currentLocation = 'Current location is required';
        } else if (value.length < 3) {
          errors.currentLocation = 'Location must be at least 3 characters';
        } else {
          delete errors.currentLocation;
        }
        break;

      case 'vehicleNumber':
        if (!value.trim()) {
          errors.vehicleNumber = 'Vehicle number is required';
        } else if (value.length < 3) {
          errors.vehicleNumber = 'Vehicle number must be at least 3 characters';
        } else {
          delete errors.vehicleNumber;
        }
        break;

      case 'emergencyContact1Phone':
        if (value && value.trim()) {
          const cleanPhone = value.replace(/\D/g, '');
          if (cleanPhone.length !== 10) {
            errors.emergencyContact1Phone = 'Phone number must be 10 digits';
          } else if (!/^[6-9]/.test(cleanPhone)) {
            errors.emergencyContact1Phone = 'Phone number must start with 6, 7, 8, or 9';
          } else {
            delete errors.emergencyContact1Phone;
          }
        }
        break;

      case 'emergencyContact2Phone':
        if (value && value.trim()) {
          const cleanPhone = value.replace(/\D/g, '');
          if (cleanPhone.length !== 10) {
            errors.emergencyContact2Phone = 'Phone number must be 10 digits';
          } else if (!/^[6-9]/.test(cleanPhone)) {
            errors.emergencyContact2Phone = 'Phone number must start with 6, 7, 8, or 9';
          } else {
            delete errors.emergencyContact2Phone;
          }
        }
        break;

      case 'bankAccountNumber':
        if (value && value.trim()) {
          if (!/^\d{9,18}$/.test(value.replace(/\s/g, ''))) {
            errors.bankAccountNumber = 'Account number must be 9-18 digits';
          } else {
            delete errors.bankAccountNumber;
          }
        }
        break;

      case 'ifscCode':
        if (value && value.trim()) {
          if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(value)) {
            errors.ifscCode = 'Please enter a valid IFSC code';
          } else {
            delete errors.ifscCode;
          }
        }
        break;

      case 'upiId':
        if (value && value.trim()) {
          if (!/^[\w.-]+@[\w]+$/.test(value)) {
            errors.upiId = 'Please enter a valid UPI ID';
          } else {
            delete errors.upiId;
          }
        }
        break;

      default:
        break;
    }

    setFieldErrors(errors);
    return !errors[field];
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Real-time validation
    validateField(field, value);
  };

  const handlePhoneChange = (value) => {
    const cleanValue = value.replace(/\D/g, '');
    const limitedValue = cleanValue.slice(0, 10);
    
    setFormData(prev => ({
      ...prev,
      phone: limitedValue
    }));
    
    validateField('phone', limitedValue);
  };

  const handleEmergencyPhoneChange = (contactNumber, value) => {
    const cleanValue = value.replace(/\D/g, '');
    const limitedValue = cleanValue.slice(0, 10);
    
    setFormData(prev => ({
      ...prev,
      [contactNumber]: limitedValue
    }));
    
    validateField(contactNumber, limitedValue);
  };

  const maskSensitiveData = (data) => {
    if (!data) return 'Not provided';
    return '•'.repeat(Math.min(data.length, 8));
  };

  const maskAccountNumber = (accountNumber) => {
    if (!accountNumber) return 'Not provided';
    const visibleDigits = 4;
    if (accountNumber.length <= visibleDigits) return '•'.repeat(accountNumber.length);
    return '•'.repeat(accountNumber.length - visibleDigits) + accountNumber.slice(-visibleDigits);
  };

  const isFieldValid = (field) => {
    return !fieldErrors[field] && formData[field] && formData[field].toString().trim();
  };

  const getCurrentValue = (field) => {
    // Return the current value from formData if editing, otherwise from profileData
    return activeEditField === field ? formData[field] : profileData[field];
  };

  const renderFormField = (field, label, isRequired = false, isFullWidth = false, isSelect = false, options = []) => {
    const isEditing = activeEditField === field;
    const hasError = fieldErrors[field];
    const isValid = isFieldValid(field);
    const currentValue = getCurrentValue(field);

    return (
      <div style={isFullWidth ? styles.formRowFull : styles.formRow}>
        <label style={styles.label}>
          {label}
          {isRequired && <span style={styles.required}>*</span>}
        </label>
        
        {isEditing ? (
          <div style={styles.inputContainer}>
            {isSelect ? (
              <select
                value={formData[field]}
                onChange={(e) => handleInputChange(field, e.target.value)}
                style={{
                  ...styles.select,
                  ...(hasError ? styles.inputError : 
                      isValid ? styles.inputSuccess : styles.inputEditing)
                }}
              >
                {options.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type="text"
                value={formData[field]}
                onChange={(e) => handleInputChange(field, e.target.value)}
                style={{
                  ...styles.input,
                  ...(hasError ? styles.inputError : 
                      isValid ? styles.inputSuccess : styles.inputEditing)
                }}
                placeholder={`Enter ${label.toLowerCase()}`}
              />
            )}
            {hasError && (
              <div style={styles.errorText}>⚠️ {hasError}</div>
            )}
            <div style={styles.fieldActions}>
              <button
                style={{...styles.iconButton, ...styles.saveIcon}}
                onClick={() => handleFieldSave(field)}
                title="Save"
              >
                ✓
              </button>
              <button
                style={{...styles.iconButton, ...styles.cancelIcon}}
                onClick={() => handleFieldCancel(field)}
                title="Cancel"
              >
                ✕
              </button>
            </div>
          </div>
        ) : (
          <div style={styles.fieldValue}>
            {currentValue || 'Not provided'}
            <button
              style={styles.editButton}
              onClick={() => handleFieldEdit(field)}
              title={`Edit ${label}`}
            >
              ✏️
            </button>
          </div>
        )}
      </div>
    );
  };

  const renderPhoneField = (field, label, isRequired = false, isEmergency = false) => {
    const isEditing = activeEditField === field;
    const hasError = fieldErrors[field];
    const isValid = isFieldValid(field);
    const currentValue = getCurrentValue(field);

    return (
      <div style={styles.formRow}>
        <label style={styles.label}>
          {label}
          {isRequired && <span style={styles.required}>*</span>}
        </label>
        
        {isEditing ? (
          <div style={styles.inputContainer}>
            <span style={styles.phonePrefix}>+91</span>
            <input
              type="tel"
              value={formData[field]}
              onChange={(e) => isEmergency ? 
                handleEmergencyPhoneChange(field, e.target.value) : 
                handlePhoneChange(e.target.value)
              }
              style={{
                ...styles.input,
                ...styles.phoneInput,
                ...(hasError ? styles.inputError : 
                    isValid ? styles.inputSuccess : styles.inputEditing)
              }}
              placeholder="Enter 10-digit number"
              maxLength="10"
            />
            {hasError && (
              <div style={styles.errorText}>⚠️ {hasError}</div>
            )}
            <div style={styles.fieldActions}>
              <button
                style={{...styles.iconButton, ...styles.saveIcon}}
                onClick={() => handleFieldSave(field)}
                title="Save"
              >
                ✓
              </button>
              <button
                style={{...styles.iconButton, ...styles.cancelIcon}}
                onClick={() => handleFieldCancel(field)}
                title="Cancel"
              >
                ✕
              </button>
            </div>
          </div>
        ) : (
          <div style={styles.fieldValue}>
            {currentValue ? `+91 ${currentValue}` : 'Not provided'}
            <button
              style={styles.editButton}
              onClick={() => handleFieldEdit(field)}
              title={`Edit ${label}`}
            >
              ✏️
            </button>
          </div>
        )}
      </div>
    );
  };

  const renderSensitiveField = (field, label, maskFunction, isRequired = false) => {
    const isEditing = activeEditField === field;
    const hasError = fieldErrors[field];
    const isValid = isFieldValid(field);
    const currentValue = getCurrentValue(field);

    return (
      <div style={styles.formRow}>
        <label style={styles.label}>
          {label}
          {isRequired && <span style={styles.required}>*</span>}
        </label>
        
        {isEditing ? (
          <div style={styles.inputContainer}>
            <input
              type="text"
              value={formData[field]}
              onChange={(e) => handleInputChange(field, e.target.value)}
              style={{
                ...styles.input,
                ...(hasError ? styles.inputError : 
                    isValid ? styles.inputSuccess : styles.inputEditing)
              }}
              placeholder={`Enter ${label.toLowerCase()}`}
            />
            {hasError && (
              <div style={styles.errorText}>⚠️ {hasError}</div>
            )}
            <div style={styles.fieldActions}>
              <button
                style={{...styles.iconButton, ...styles.saveIcon}}
                onClick={() => handleFieldSave(field)}
                title="Save"
              >
                ✓
              </button>
              <button
                style={{...styles.iconButton, ...styles.cancelIcon}}
                onClick={() => handleFieldCancel(field)}
                title="Cancel"
              >
                ✕
              </button>
            </div>
          </div>
        ) : (
          <div style={styles.fieldValue}>
            {currentValue ? (
              <span style={styles.sensitiveData}>
                {maskFunction(currentValue)}
              </span>
            ) : 'Not provided'}
            <button
              style={styles.editButton}
              onClick={() => handleFieldEdit(field)}
              title={`Edit ${label}`}
            >
              ✏️
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div style={styles.mainContent}>
      <div style={styles.header}>
        <h1 style={styles.greeting}>My Profile</h1>
        <p style={styles.subtitle}>Manage your account information and preferences</p>
      </div>

      <div style={styles.profileContainer}>
        {/* Profile Header */}
        <div style={styles.profileHeader}>
          <div style={styles.profileAvatar}>
            {profileData.profileImage ? (
              <img 
                src={profileData.profileImage} 
                alt="Profile" 
                style={styles.profileImage}
              />
            ) : (
              <div style={styles.profileImagePlaceholder}>
                <span style={styles.avatarIcon}>👤</span>
              </div>
            )}
            <button 
              style={styles.changePhotoButton}
              onClick={() => setShowProfileImageUpload(true)}
              title="Change profile photo"
            >
              📷
            </button>
          </div>
          <div style={styles.profileUserInfo}>
            <div style={styles.agentId}>
              <strong>AGENT ID:</strong> {profileData.agentId}
            </div>
          </div>
        </div>

        {/* Personal Information */}
        <div style={styles.formSection}>
          <h3 style={styles.sectionTitle}>Personal Information</h3>
          
          {/* Name Section - Similar to email, phone layout */}
          <div style={styles.nameSection}>
            <div style={styles.nameField}>
              {renderFormField('fullName', 'Full Name', true)}
            </div>
          </div>

          <div style={styles.formGrid}>
            {renderFormField('email', 'Email Address', true)}
            {renderPhoneField('phone', 'Phone Number', true)}
            {renderFormField('currentLocation', 'Current Location', true)}
            {renderFormField(
              'vehicleType', 
              'Vehicle Type', 
              true,
              false,
              true,
              [
                { value: 'Motorcycle', label: 'Motorcycle' },
                { value: 'Scooter', label: 'Scooter' },
                { value: 'Bicycle', label: 'Bicycle' },
                { value: 'Car', label: 'Car' }
              ]
            )}
            {renderFormField('vehicleNumber', 'Vehicle Number', true)}
          </div>
        </div>

        {/* Emergency Contacts */}
        <div style={styles.formSection}>
          <h3 style={styles.sectionTitle}>Emergency Contacts</h3>
          <p style={styles.sectionSubtitle}>In case of emergencies, we'll contact these people</p>
          <div style={styles.formGrid}>
            {renderFormField('emergencyContact1Name', 'Contact 1 Name')}
            {renderPhoneField('emergencyContact1Phone', 'Contact 1 Phone', false, true)}
            {renderFormField(
              'emergencyContact1Relation', 
              'Contact 1 Relation', 
              false,
              false,
              true,
              [
                { value: '', label: 'Select relation' },
                { value: 'Father', label: 'Father' },
                { value: 'Mother', label: 'Mother' },
                { value: 'Spouse', label: 'Spouse' },
                { value: 'Sibling', label: 'Sibling' },
                { value: 'Friend', label: 'Friend' },
                { value: 'Other', label: 'Other' }
              ]
            )}
            {renderFormField('emergencyContact2Name', 'Contact 2 Name')}
            {renderPhoneField('emergencyContact2Phone', 'Contact 2 Phone', false, true)}
            {renderFormField(
              'emergencyContact2Relation', 
              'Contact 2 Relation', 
              false,
              false,
              true,
              [
                { value: '', label: 'Select relation' },
                { value: 'Father', label: 'Father' },
                { value: 'Mother', label: 'Mother' },
                { value: 'Spouse', label: 'Spouse' },
                { value: 'Sibling', label: 'Sibling' },
                { value: 'Friend', label: 'Friend' },
                { value: 'Other', label: 'Other' }
              ]
            )}
          </div>
        </div>

        {/* Bank Details */}
        <div style={styles.formSection}>
          <h3 style={styles.sectionTitle}>Bank Details</h3>
          <p style={styles.sectionSubtitle}>For salary transfers and payments</p>
          <div style={styles.formGrid}>
            {renderFormField('bankAccountHolder', 'Account Holder Name')}
            {renderFormField('bankName', 'Bank Name')}
            {renderSensitiveField('bankAccountNumber', 'Account Number', maskAccountNumber)}
            {renderFormField('ifscCode', 'IFSC Code')}
            {renderSensitiveField('upiId', 'UPI ID', maskSensitiveData)}
          </div>
        </div>

        {/* Performance Statistics */}
        <div style={styles.formSection}>
          <h3 style={styles.sectionTitle}>Performance Statistics</h3>
          <div style={styles.statsGrid}>
            <div style={styles.statItem}>
              <div style={styles.statLabel}>Joined Date</div>
              <div style={styles.statValue}>{profileData.joinedDate}</div>
            </div>
            <div style={styles.statItem}>
              <div style={styles.statLabel}>Total Deliveries</div>
              <div style={styles.statValue}>{profileData.totalDeliveries}</div>
            </div>
            <div style={styles.statItem}>
              <div style={styles.statLabel}>Current Rating</div>
              <div style={styles.statValue}>{profileData.rating}/5 ⭐</div>
            </div>
            <div style={styles.statItem}>
              <div style={styles.statLabel}>Completion Rate</div>
              <div style={styles.statValue}>{profileData.completionRate}</div>
            </div>
            <div style={styles.statItem}>
              <div style={styles.statLabel}>Avg Response Time</div>
              <div style={styles.statValue}>{profileData.responseTime}</div>
            </div>
            <div style={styles.statItem}>
              <div style={styles.statLabel}>Average Rating</div>
              <div style={styles.statValue}>{profileData.averageRating}/5 ⭐</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;