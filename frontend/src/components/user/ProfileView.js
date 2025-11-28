import React, { useState, useEffect, useCallback } from 'react';
import { useProfile } from './ProfileContext';

const ProfileView = ({ setActiveView }) => {
  const { profile, updateProfile } = useProfile();

  const [localProfile, setLocalProfile] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
    dateOfBirth: "",
    age: "",
    gender: "",
    profilePhoto: ""
  });

  const [localFormErrors, setLocalFormErrors] = useState({});
  const [localIsFormValid, setLocalIsFormValid] = useState(false);
  const [localIsFormTouched, setLocalIsFormTouched] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [saveStatus, setSaveStatus] = useState('');

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Enhanced navigation handler
  const handleBackToDashboard = () => {
    setActiveView("dashboard");
  };

  // Compact Profile-specific styles
  const styles = {
    // Profile Container with proper spacing
    profileContainer: {
      marginTop: '120px',
      padding: '2rem 1rem 1rem 1rem',
      maxWidth: '800px',
      marginLeft: 'auto',
      marginRight: 'auto',
      minHeight: 'calc(100vh - 120px)',
      backgroundColor: '#f8fafc',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      position: 'relative',
      zIndex: 1,
    },

    // Success Message Styles
    successMessage: {
      backgroundColor: '#E8F5E8',
      color: '#2E7D32',
      padding: '1rem 1.5rem',
      borderRadius: '12px',
      marginBottom: '1.5rem',
      border: '2px solid #4CAF50',
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      fontWeight: '600',
      fontSize: '0.95rem',
      boxShadow: '0 4px 12px rgba(76, 175, 80, 0.2)',
      animation: 'slideDown 0.3s ease-out',
    },
    successIcon: {
      fontSize: '1.5rem',
    },

    // Page Header - Compact with proper spacing
    pageHeader: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '2rem', // Increased gap between back button and header content
      marginBottom: '2rem',
      textAlign: 'center',
      position: 'relative',
    },
    backButton: {
      padding: '0.75rem 0.5rem', // Increased padding for longer button
      backgroundColor: 'transparent',
       marginTop: '1.5rem',
      color: '#7C2A62',
      border: '2px solid #7C2A62',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '0.9rem',
      fontWeight: '600',
      transition: 'all 0.3s ease',
      alignSelf: 'flex-start',
      position: 'relative',
      zIndex: 2,
      marginBottom: '0.5rem', // Added margin for better spacing
      minWidth: '180px', // Minimum width for consistent button size
    },
    headerContent: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '0.75rem',
      width: '100%',
    },
    sectionTitle: {
      color: '#7C2A62',
      fontSize: '2rem',
      margin: 0,
      fontWeight: '800',
      background: 'linear-gradient(135deg, #7C2A62, #E91E63)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
    },
    profileStatus: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
    },
    statusComplete: {
      color: '#4CAF50',
      fontWeight: '700',
      fontSize: '0.9rem',
      padding: '0.5rem 1rem',
      backgroundColor: '#E8F5E8',
      borderRadius: '20px',
      border: '1px solid #4CAF50',
    },
    statusIncomplete: {
      color: '#FF9800',
      fontWeight: '700',
      fontSize: '0.9rem',
      padding: '0.5rem 1rem',
      backgroundColor: '#FFF3E0',
      borderRadius: '20px',
      border: '1px solid #FF9800',
    },

    // Profile Photo Section - Compact
    profilePhotoSection: {
      backgroundColor: 'white',
      padding: '1.5rem',
      borderRadius: '15px',
      boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
      marginBottom: '1.5rem',
      textAlign: 'center',
      border: '1px solid #F7D9EB',
    },
    profilePhotoContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '1rem',
    },
    profilePhotoPreview: {
      width: '120px',
      height: '120px',
      borderRadius: '50%',
      backgroundColor: '#F7D9EB',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      border: '3px solid #7C2A62',
      boxShadow: '0 2px 8px rgba(124, 42, 98, 0.3)',
      position: 'relative',
    },
    profilePhotoImage: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    },
    profilePhotoPlaceholder: {
      fontSize: '3rem',
      color: '#7C2A62',
      fontWeight: 'bold',
    },
    profilePhotoActions: {
      display: 'flex',
      gap: '0.75rem',
      flexWrap: 'wrap',
      justifyContent: 'center',
      alignItems: 'center',
    },
    uploadPhotoButton: {
      padding: '0.75rem 1.5rem',
      backgroundColor: '#4CAF50',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontWeight: '600',
      fontSize: '0.9rem',
      transition: 'all 0.3s ease',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5rem',
      boxShadow: '0 2px 8px rgba(76, 175, 80, 0.3)',
    },
    removePhotoButton: {
      padding: '0.75rem 1.5rem',
      backgroundColor: '#FF6B6B',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontWeight: '600',
      fontSize: '0.9rem',
      transition: 'all 0.3s ease',
      boxShadow: '0 2px 8px rgba(255, 107, 107, 0.3)',
    },
    editProfileButton: {
      padding: '0.75rem 2rem', // Increased padding for longer button
      backgroundColor: '#7C2A62',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontWeight: '600',
      fontSize: '0.9rem',
      transition: 'all 0.3s ease',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5rem',
      boxShadow: '0 2px 8px rgba(124, 42, 98, 0.3)',
      minWidth: '160px', // Minimum width for consistent button size
    },

    // Profile Form - Compact
    profileForm: {
      backgroundColor: 'white',
      padding: '1.5rem',
      borderRadius: '15px',
      boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
      border: '1px solid #F7D9EB',
    },
    formGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '1rem',
      marginBottom: '1.5rem',
    },
    formGroup: {
      display: 'flex',
      flexDirection: 'column',
    },
    formLabel: {
      marginBottom: '0.5rem',
      color: '#7C2A62',
      fontWeight: '600',
      fontSize: '0.9rem',
    },
    formInput: {
      padding: '0.75rem',
      border: '1px solid #F7D9EB',
      borderRadius: '8px',
      fontSize: '0.9rem',
      transition: 'all 0.3s ease',
      cursor: 'text',
      fontFamily: 'inherit',
    },
    formInputError: {
      borderColor: '#FF6B6B !important',
      backgroundColor: '#FFF5F5',
    },
    formError: {
      color: '#FF6B6B',
      fontSize: '0.8rem',
      marginTop: '0.25rem',
      fontWeight: '500',
    },
    formTextarea: {
      padding: '0.75rem',
      border: '1px solid #F7D9EB',
      borderRadius: '8px',
      fontSize: '0.9rem',
      resize: 'vertical',
      minHeight: '80px',
      fontFamily: 'inherit',
      cursor: 'text',
    },
    fieldNote: {
      color: '#666',
      fontSize: '0.8rem',
      marginTop: '0.25rem',
      fontStyle: 'italic',
    },
    nonEditableField: {
      backgroundColor: '#f8f5ff',
      color: '#666',
      cursor: 'not-allowed',
      borderColor: '#F7D9EB',
    },

    // Phone Input Styles - Extended container
    phoneInputContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      width: '100%', // Ensure full width
    },
    phonePrefix: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      padding: '0.75rem 1rem', // Increased horizontal padding
      backgroundColor: '#f8f5ff',
      borderRadius: '8px',
      fontWeight: '600',
      color: '#7C2A62',
      fontSize: '0.9rem',
      border: '1px solid #F7D9EB',
      minWidth: '100px', // Increased minimum width
      justifyContent: 'center',
      flexShrink: 0, // Prevent shrinking
    },

    // Action Buttons - Compact
    actionButtons: {
      display: 'flex',
      gap: '0.75rem',
      justifyContent: 'center',
      marginTop: '1.5rem',
      paddingTop: '1.5rem',
      borderTop: '2px solid #F7D9EB',
    },
    updateButton: {
      padding: '0.75rem 2rem', // Increased padding for longer button
      backgroundColor: '#7C2A62',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontWeight: '600',
      fontSize: '0.9rem',
      transition: 'all 0.3s ease',
      boxShadow: '0 2px 8px rgba(124, 42, 98, 0.3)',
      minWidth: '160px', // Minimum width for consistent button size
    },
    updateButtonDisabled: {
      backgroundColor: '#cccccc',
      cursor: 'not-allowed',
      boxShadow: 'none',
    },
    cancelButton: {
      padding: '0.75rem 2rem', // Increased padding for longer button
      backgroundColor: 'transparent',
      color: '#7C2A62',
      border: '1px solid #7C2A62',
      borderRadius: '8px',
      cursor: 'pointer',
      fontWeight: '600',
      fontSize: '0.9rem',
      transition: 'all 0.3s ease',
      minWidth: '120px', // Minimum width for consistent button size
    },

    // Save Status - Compact
    saveStatus: {
      textAlign: 'center',
      padding: '0.75rem',
      marginTop: '0.75rem',
      borderRadius: '6px',
      fontWeight: '500',
      fontSize: '0.85rem',
    },
    saveStatusSuccess: {
      backgroundColor: '#E8F5E8',
      color: '#4CAF50',
      border: '1px solid #4CAF50',
    },
    saveStatusError: {
      backgroundColor: '#FFE5E5',
      color: '#FF6B6B',
      border: '1px solid #FF6B6B',
    },
    saveStatusLoading: {
      backgroundColor: '#E3F2FD',
      color: '#2196F3',
      border: '1px solid #2196F3',
    },
  };

  // Add CSS animation for success message
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes slideDown {
        from {
          opacity: 0;
          transform: translateY(-20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // Real-time profile sync from context
  useEffect(() => {
    setLocalProfile({
      fullName: profile.fullName || "",
      email: profile.email || "",
      phone: profile.phone || "",
      address: profile.address || "",
      city: profile.city || "",
      pincode: profile.pincode || "",
      dateOfBirth: profile.dateOfBirth || "",
      age: profile.age || "",
      gender: profile.gender || "",
      profilePhoto: profile.profilePhoto || ""
    });
  }, [profile]);

  // Real-time age calculation
  useEffect(() => {
    if (!localProfile.dateOfBirth) return;

    const calculateAge = (birthDate) => {
      const dob = new Date(birthDate);
      const today = new Date();
      
      if (dob > today) {
        return "0";
      }

      let age = today.getFullYear() - dob.getFullYear();
      const monthDiff = today.getMonth() - dob.getMonth();
      
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
        age--;
      }
      
      return age > 0 ? age.toString() : "0";
    };

    const calculatedAge = calculateAge(localProfile.dateOfBirth);
    if (calculatedAge !== localProfile.age) {
      setLocalProfile(prev => ({ ...prev, age: calculatedAge }));
    }
  }, [localProfile.dateOfBirth, localProfile.age]);

  // Real-time validation
  const validateLocalForm = useCallback(() => {
    const errors = {};

    // Name validation
    if (!localProfile.fullName.trim()) {
      errors.fullName = "Full name is required";
    } else if (localProfile.fullName.trim().length < 2) {
      errors.fullName = "Name should be at least 2 characters long";
    } else if (!/^[A-Za-z\s]{2,}$/.test(localProfile.fullName)) {
      errors.fullName = "Name should contain only letters and spaces";
    }

    // Email validation
    if (!localProfile.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(localProfile.email)) {
      errors.email = "Enter a valid email address";
    }

    // Phone validation
    if (!localProfile.phone.trim()) {
      errors.phone = "Phone number is required";
    } else if (!/^[6-9]\d{9}$/.test(localProfile.phone)) {
      errors.phone = "Enter a valid 10-digit number starting with 6-9";
    }

    // Address validation
    if (!localProfile.address.trim()) {
      errors.address = "Address is required";
    } else if (localProfile.address.trim().length < 10) {
      errors.address = "Address should be at least 10 characters long";
    }

    // City validation
    if (!localProfile.city.trim()) {
      errors.city = "City is required";
    } else if (!/^[A-Za-z\s]{2,}$/.test(localProfile.city)) {
      errors.city = "City should contain only letters and be at least 2 characters";
    }

    // Pincode validation
    if (!localProfile.pincode) {
      errors.pincode = "Pincode is required";
    } else if (!/^\d{6}$/.test(localProfile.pincode)) {
      errors.pincode = "Pincode must be exactly 6 digits";
    }

    // Date of Birth validation
    if (!localProfile.dateOfBirth) {
      errors.dateOfBirth = "Date of birth is required";
    } else {
      const dob = new Date(localProfile.dateOfBirth);
      const today = new Date();
      if (dob > today) {
        errors.dateOfBirth = "Date of birth cannot be in the future";
      }
    }

    // Age validation
    if (!localProfile.age || parseInt(localProfile.age) <= 0) {
      errors.age = "Age must be a positive number";
    } else if (parseInt(localProfile.age) > 120) {
      errors.age = "Please enter a valid age";
    }

    // Gender validation
    if (!localProfile.gender) {
      errors.gender = "Please select your gender";
    }

    setLocalFormErrors(errors);
    setLocalIsFormValid(Object.keys(errors).length === 0);
  }, [localProfile]);

  // Real-time validation on every change
  useEffect(() => {
    validateLocalForm();
  }, [validateLocalForm]);

  // Real-time input handlers
  const handleLocalProfileChange = (e) => {
    if (!isEditMode) return;
    
    const { name, value } = e.target;
    let updatedValue = value;

    // Real-time input formatting and validation
    switch (name) {
      case "fullName":
        updatedValue = value.replace(/[^A-Za-z\s]/g, "");
        break;
      case "city":
        updatedValue = value.replace(/[^A-Za-z\s]/g, "");
        break;
      case "pincode":
        updatedValue = value.replace(/\D/g, "").slice(0, 6);
        break;
      case "phone":
        updatedValue = value.replace(/\D/g, "").slice(0, 10);
        break;
      default:
        break;
    }

    setLocalProfile(prev => ({ ...prev, [name]: updatedValue }));
    setLocalIsFormTouched(true);
    
    // Clear save status when user starts typing
    if (saveStatus) {
      setSaveStatus('');
    }
  };

  const handleLocalProfileBlur = (e) => {
    if (!isEditMode) return;
    
    const { name, value } = e.target;
    
    // Auto-trim on blur
    if (value && typeof value === 'string') {
      setLocalProfile(prev => ({ ...prev, [name]: value.trim() }));
    }
  };

  // Real-time profile photo handling
  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Real-time file validation
    if (!file.type.startsWith('image/')) {
      setSaveStatus('❌ Please select a valid image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setSaveStatus('❌ Image size should be less than 5MB');
      return;
    }

    try {
      setSaveStatus('🔄 Uploading photo...');
      
      const imgURL = URL.createObjectURL(file);
      setLocalProfile(prev => ({ ...prev, profilePhoto: imgURL }));
      
      await updateProfile({
        ...profile,
        profilePhoto: imgURL
      });
      
      setSaveStatus('✅ Photo updated successfully!');
      setTimeout(() => setSaveStatus(''), 3000);
    } catch (error) {
      console.error('Error uploading photo:', error);
      setSaveStatus('❌ Error uploading photo. Please try again.');
    }
  };

  const handleRemovePhoto = async () => {
    try {
      setSaveStatus('🔄 Removing photo...');
      
      setLocalProfile(prev => ({ ...prev, profilePhoto: "" }));
      await updateProfile({ ...profile, profilePhoto: "" });
      
      setSaveStatus('✅ Photo removed successfully!');
      setTimeout(() => setSaveStatus(''), 3000);
    } catch (error) {
      console.error('Error removing photo:', error);
      setSaveStatus('❌ Error removing photo. Please try again.');
    }
  };

  // Enhanced edit mode handler
  const handleEditModeToggle = () => {
    setIsEditMode(true);
  };

  // Real-time form submission
  const handleLocalProfileUpdate = async (e) => {
    e.preventDefault();

    if (!isEditMode) {
      handleEditModeToggle();
      return;
    }

    // Final validation check
    validateLocalForm();
    if (!localIsFormValid) {
      setSaveStatus('❌ Please fix all validation errors before submitting.');
      return;
    }

    setIsSubmitting(true);
    setSaveStatus('🔄 Saving profile changes...');

    try {
      const updatedProfile = {
        ...profile,
        ...localProfile,
        lastUpdated: new Date().toISOString()
      };

      await updateProfile(updatedProfile);
      
      // Show success message
      setSaveStatus('success');
      setLocalIsFormTouched(false);
      setIsEditMode(false);
      
      // Auto-hide success message after 5 seconds
      setTimeout(() => {
        setSaveStatus('');
      }, 5000);
    } catch (error) {
      console.error('Profile update error:', error);
      setSaveStatus('❌ Error updating profile. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancelEdit = () => {
    if (localIsFormTouched) {
      const confirmReset = window.confirm(
        "You have unsaved changes. Are you sure you want to cancel?"
      );
      if (!confirmReset) return;
    }

    setLocalProfile({
      fullName: profile.fullName || "",
      email: profile.email || "",
      phone: profile.phone || "",
      address: profile.address || "",
      city: profile.city || "",
      pincode: profile.pincode || "",
      dateOfBirth: profile.dateOfBirth || "",
      age: profile.age || "",
      gender: profile.gender || "",
      profilePhoto: profile.profilePhoto || ""
    });
    
    setLocalFormErrors({});
    setLocalIsFormTouched(false);
    setIsEditMode(false);
    setSaveStatus('');
  };

  // Helper function to get input styles
  const getInputStyle = (fieldName) => {
    const baseStyle = styles.formInput;
    const errorStyle = localIsFormTouched && localFormErrors[fieldName] && styles.formInputError;
    const disabledStyle = !isEditMode && styles.nonEditableField;
    
    return {
      ...baseStyle,
      ...errorStyle,
      ...disabledStyle,
      cursor: !isEditMode ? 'not-allowed' : 'text'
    };
  };

  // Check if profile is complete
  const isProfileComplete = () => {
    const requiredFields = ['fullName', 'email', 'phone', 'address', 'city', 'pincode', 'dateOfBirth', 'gender'];
    return requiredFields.every(field => localProfile[field] && localProfile[field].trim());
  };

  // Get save status style
  const getSaveStatusStyle = () => {
    if (saveStatus.includes('✅')) return { ...styles.saveStatus, ...styles.saveStatusSuccess };
    if (saveStatus.includes('❌')) return { ...styles.saveStatus, ...styles.saveStatusError };
    if (saveStatus.includes('🔄')) return { ...styles.saveStatus, ...styles.saveStatusLoading };
    return styles.saveStatus;
  };

  return (
    <div style={styles.profileContainer}>
      {/* Success Message */}
      {saveStatus === 'success' && (
        <div style={styles.successMessage}>
          <span style={styles.successIcon}>✅</span>
          <span>Profile updated successfully!</span>
        </div>
      )}

      {/* Compact Header */}
      <div style={styles.pageHeader}>
        <button 
          style={styles.backButton} 
          onClick={handleBackToDashboard}
          aria-label="Back to dashboard"
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#7C2A62';
            e.target.style.color = 'white';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = 'transparent';
            e.target.style.color = '#7C2A62';
          }}
        >
          ← Back to Dashboard
        </button>
        <div style={styles.headerContent}>
          <h2 style={styles.sectionTitle}>My Profile</h2>
          {!isEditMode && (
            <div style={styles.profileStatus}>
              <span style={isProfileComplete() ? styles.statusComplete : styles.statusIncomplete}>
                {isProfileComplete() ? '✅ Profile Complete' : '⚠ Profile Incomplete'}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Profile Photo Section - Compact */}
      <div style={styles.profilePhotoSection}>
        <div style={styles.profilePhotoContainer}>
          <div style={styles.profilePhotoPreview}>
            {localProfile.profilePhoto ? (
              <img
                src={localProfile.profilePhoto}
                alt="Profile"
                style={styles.profilePhotoImage}
                onError={(e) => {
                  e.target.style.display = 'none';
                  handleRemovePhoto();
                }}
              />
            ) : (
              <div style={styles.profilePhotoPlaceholder}>
                {localProfile.fullName?.charAt(0).toUpperCase() || "👤"}
              </div>
            )}
          </div>

          <div style={styles.profilePhotoActions}>
            {!isEditMode ? (
              <button
                style={styles.editProfileButton}
                onClick={handleEditModeToggle}
                type="button"
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#6a2460';
                  e.target.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#7C2A62';
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                ✏️ Edit Profile
              </button>
            ) : (
              <>
                <label style={styles.uploadPhotoButton}>
                   Update Photo
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={handlePhotoUpload}
                  />
                </label>

                {localProfile.profilePhoto && (
                  <button
                    style={styles.removePhotoButton}
                    type="button"
                    onClick={handleRemovePhoto}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = '#cc0000';
                      e.target.style.transform = 'translateY(-1px)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = '#FF6B6B';
                      e.target.style.transform = 'translateY(0)';
                    }}
                  >
                    Remove
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Save Status Display */}
      {saveStatus && saveStatus !== 'success' && (
        <div style={getSaveStatusStyle()}>
          {saveStatus}
        </div>
      )}

      {/* Profile Form - Compact */}
      <form onSubmit={handleLocalProfileUpdate} style={styles.profileForm}>
        <div style={styles.formGrid}>
          {/* Editable Name Field */}
          <div style={styles.formGroup}>
            <label style={styles.formLabel}>Full Name *</label>
            <input
              type="text"
              name="fullName"
              value={localProfile.fullName}
              onChange={handleLocalProfileChange}
              onBlur={handleLocalProfileBlur}
              placeholder="Enter your full name"
              style={getInputStyle("fullName")}
              disabled={!isEditMode}
              onFocus={(e) => e.target.style.borderColor = '#7C2A62'}
            />
            {localIsFormTouched && localFormErrors.fullName && (
              <span style={styles.formError}>{localFormErrors.fullName}</span>
            )}
          </div>

          {/* Editable Email Field */}
          <div style={styles.formGroup}>
            <label style={styles.formLabel}>Email *</label>
            <input
              type="email"
              name="email"
              value={localProfile.email}
              onChange={handleLocalProfileChange}
              onBlur={handleLocalProfileBlur}
              placeholder="Enter your email address"
              style={getInputStyle("email")}
              disabled={!isEditMode}
              onFocus={(e) => e.target.style.borderColor = '#7C2A62'}
            />
            {localIsFormTouched && localFormErrors.email && (
              <span style={styles.formError}>{localFormErrors.email}</span>
            )}
          </div>

          {/* Editable Phone Field - Extended container */}
          <div style={styles.formGroup}>
            <label style={styles.formLabel}>Phone *</label>
            <div style={styles.phoneInputContainer}>
              <div style={styles.phonePrefix}>🇮🇳 +91</div>
              <input
                type="tel"
                name="phone"
                value={localProfile.phone}
                onChange={handleLocalProfileChange}
                onBlur={handleLocalProfileBlur}
                style={{
                  ...styles.formInput,
                  ...(localIsFormTouched && localFormErrors.phone && styles.formInputError),
                  ...(!isEditMode && styles.nonEditableField),
                  flex: '1', // Take remaining space
                }}
                placeholder="10-digit mobile number"
                maxLength="10"
                disabled={!isEditMode}
                onFocus={(e) => e.target.style.borderColor = '#7C2A62'}
              />
            </div>
            {localIsFormTouched && localFormErrors.phone && (
              <span style={styles.formError}>{localFormErrors.phone}</span>
            )}
          </div>

          {/* Date of Birth Field */}
          <div style={styles.formGroup}>
            <label style={styles.formLabel}>Date of Birth *</label>
            <input
              type="date"
              name="dateOfBirth"
              value={localProfile.dateOfBirth}
              onChange={handleLocalProfileChange}
              style={getInputStyle("dateOfBirth")}
              disabled={!isEditMode}
              max={new Date().toISOString().split('T')[0]}
              onFocus={(e) => e.target.style.borderColor = '#7C2A62'}
            />
            {localIsFormTouched && localFormErrors.dateOfBirth && (
              <span style={styles.formError}>{localFormErrors.dateOfBirth}</span>
            )}
          </div>

          {/* Age Field (Read-only) */}
          <div style={styles.formGroup}>
            <label style={styles.formLabel}>Age *</label>
            <input
              type="text"
              name="age"
              value={localProfile.age ? `${localProfile.age} years` : ""}
              readOnly
              style={getInputStyle("age")}
            />
            <p style={styles.fieldNote}>Automatically calculated from date of birth</p>
          </div>

          {/* Gender Field */}
          <div style={styles.formGroup}>
            <label style={styles.formLabel}>Gender *</label>
            <select
              name="gender"
              value={localProfile.gender}
              onChange={handleLocalProfileChange}
              style={getInputStyle("gender")}
              disabled={!isEditMode}
              onFocus={(e) => e.target.style.borderColor = '#7C2A62'}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
              <option value="prefer-not-to-say">Prefer not to say</option>
            </select>
            {localIsFormTouched && localFormErrors.gender && (
              <span style={styles.formError}>{localFormErrors.gender}</span>
            )}
          </div>

          {/* Address Field */}
          <div style={styles.formGroup}>
            <label style={styles.formLabel}>Address *</label>
            <textarea
              name="address"
              rows="3"
              value={localProfile.address}
              onChange={handleLocalProfileChange}
              onBlur={handleLocalProfileBlur}
              style={getInputStyle("address")}
              disabled={!isEditMode}
              placeholder="Enter your complete address"
              onFocus={(e) => e.target.style.borderColor = '#7C2A62'}
            />
            {localIsFormTouched && localFormErrors.address && (
              <span style={styles.formError}>{localFormErrors.address}</span>
            )}
          </div>

          {/* City Field */}
          <div style={styles.formGroup}>
            <label style={styles.formLabel}>City *</label>
            <input
              type="text"
              name="city"
              value={localProfile.city}
              onChange={handleLocalProfileChange}
              onBlur={handleLocalProfileBlur}
              placeholder="Enter your city"
              style={getInputStyle("city")}
              disabled={!isEditMode}
              onFocus={(e) => e.target.style.borderColor = '#7C2A62'}
            />
            {localIsFormTouched && localFormErrors.city && (
              <span style={styles.formError}>{localFormErrors.city}</span>
            )}
          </div>

          {/* Pincode Field */}
          <div style={styles.formGroup}>
            <label style={styles.formLabel}>Pincode *</label>
            <input
              type="text"
              name="pincode"
              value={localProfile.pincode}
              onChange={handleLocalProfileChange}
              placeholder="6-digit pincode"
              maxLength="6"
              style={getInputStyle("pincode")}
              disabled={!isEditMode}
              onFocus={(e) => e.target.style.borderColor = '#7C2A62'}
            />
            {localIsFormTouched && localFormErrors.pincode && (
              <span style={styles.formError}>{localFormErrors.pincode}</span>
            )}
          </div>
        </div>

        {/* Action Buttons - Compact */}
        {isEditMode && (
          <div style={styles.actionButtons}>
            <button
              type="submit"
              style={{
                ...styles.updateButton,
                ...(!localIsFormValid && styles.updateButtonDisabled),
                ...(isSubmitting && styles.updateButtonDisabled)
              }}
              disabled={!localIsFormValid || isSubmitting}
              onMouseEnter={(e) => {
                if (!isSubmitting && localIsFormValid) {
                  e.target.style.backgroundColor = '#6a2460';
                  e.target.style.transform = 'translateY(-1px)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isSubmitting && localIsFormValid) {
                  e.target.style.backgroundColor = '#7C2A62';
                  e.target.style.transform = 'translateY(0)';
                }
              }}
            >
              {isSubmitting ? "🔄 Saving..." : "Save Changes"}
            </button>
            <button
              type="button"
              style={styles.cancelButton}
              onClick={handleCancelEdit}
              disabled={isSubmitting}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#7C2A62';
                e.target.style.color = 'white';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.color = '#7C2A62';
              }}
            >
              Cancel
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default ProfileView;