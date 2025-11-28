import React, { useState, useEffect } from 'react';

const Doctors = ({ onNavigateToLogin }) => {
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [availableSlots, setAvailableSlots] = useState({});
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setIsMobile(width <= 768);
      setIsTablet(width <= 1024 && width > 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    // Add fade-in animation
    setIsVisible(true);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Hide navbar and body overflow when modal is open
  useEffect(() => {
    if (selectedDoctor) {
      // Hide body overflow
      document.body.style.overflow = 'hidden';
      
      // Hide all navbar elements
      const navbarSelectors = [
        'header',
        'nav',
        '.navbar',
        '[class*="navbar"]',
        '[class*="header"]',
        '[class*="nav"]'
      ];
      
      navbarSelectors.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
          // Store original display style and hide
          if (!element.hasAttribute('data-original-display')) {
            element.setAttribute('data-original-display', element.style.display || '');
          }
          element.style.display = 'none';
        });
      });
    } else {
      // Restore body overflow
      document.body.style.overflow = 'unset';
      
      // Restore all navbar elements
      const elements = document.querySelectorAll('[data-original-display]');
      elements.forEach(element => {
        const originalDisplay = element.getAttribute('data-original-display');
        element.style.display = originalDisplay;
        element.removeAttribute('data-original-display');
      });
    }
  }, [selectedDoctor]);

  const styles = {
    // Main Doctors Section with Bubble Background
    doctors: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #F7D9EB 0%, #ffffff 50%, #F7D9EB 100%)',
      position: 'relative',
      overflow: 'hidden',
      padding: isMobile ? '4rem 1rem' : isTablet ? '5rem 2rem' : '6rem 2rem',
    },
    floatingElements: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
      zIndex: 1,
    },
    floatingElement: {
      position: 'absolute',
      background: 'rgba(124, 42, 98, 0.1)',
      borderRadius: '50%',
      animation: 'float 6s ease-in-out infinite',
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      position: 'relative',
      zIndex: 2,
    },
    sectionTitle: {
      fontSize: isMobile ? '2.5rem' : isTablet ? '3rem' : '3.5rem',
      textAlign: 'center',
      marginBottom: '1rem',
      color: '#7C2A62',
      fontWeight: '700',
      background: 'linear-gradient(45deg, #7C2A62, #9C3A7A)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
      transition: 'all 0.8s ease-out',
    },
    sectionSubtitle: {
      fontSize: isMobile ? '1rem' : isTablet ? '1.1rem' : '1.2rem',
      textAlign: 'center',
      marginBottom: isMobile ? '3rem' : '4rem',
      color: '#666',
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
      transition: 'all 0.8s ease-out 0.2s',
    },
    doctorsGrid: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
      gap: isMobile ? '1.5rem' : '2rem',
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
      transition: 'all 0.8s ease-out 0.4s',
    },
    doctorCard: {
      padding: isMobile ? '1.5rem' : '2rem',
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      borderRadius: '20px',
      boxShadow: '0 8px 30px rgba(124, 42, 98, 0.1)',
      textAlign: 'center',
      transition: 'all 0.3s ease',
      position: 'relative',
      backdropFilter: 'blur(10px)',
      border: '2px solid transparent',
    },
    doctorImage: {
      width: isMobile ? '100px' : '120px',
      height: isMobile ? '100px' : '120px',
      borderRadius: '50%',
      backgroundColor: '#F7D9EB',
      margin: '0 auto 1.5rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: isMobile ? '1.5rem' : '2rem',
      color: '#7C2A62',
      border: '4px solid #7C2A62',
    },
    rating: {
      position: 'absolute',
      top: '1rem',
      right: '1rem',
      backgroundColor: '#FFD700',
      color: '#000',
      padding: '0.3rem 0.8rem',
      borderRadius: '15px',
      fontSize: '0.9rem',
      fontWeight: 'bold',
    },
    doctorName: {
      fontSize: isMobile ? '1.2rem' : '1.3rem',
      marginBottom: '0.5rem',
      color: '#333',
      fontWeight: '600',
    },
    doctorSpecialty: {
      fontSize: isMobile ? '1rem' : isTablet ? '1.1rem' : '1.2rem',
      marginBottom: '0.5rem',
      color: '#7C2A62',
      fontWeight: '500',
    },
    doctorExperience: {
      color: '#666',
      marginBottom: '1.5rem',
      fontSize: isMobile ? '0.9rem' : '1rem',
    },
    buttonContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.8rem',
    },
    viewProfileButton: {
      padding: isMobile ? '0.6rem 1.2rem' : '0.8rem 1.5rem',
      backgroundColor: 'transparent',
      color: '#7C2A62',
      border: '2px solid #7C2A62',
      borderRadius: '25px',
      cursor: 'pointer',
      fontWeight: '600',
      transition: 'all 0.3s ease',
      fontSize: isMobile ? '0.9rem' : '1rem',
      position: 'relative',
      overflow: 'hidden',
    },
    bookConsultationButton: {
      padding: isMobile ? '0.6rem 1.2rem' : '0.8rem 1.5rem',
      backgroundColor: '#7C2A62',
      color: 'white',
      border: 'none',
      borderRadius: '25px',
      cursor: 'pointer',
      fontWeight: '600',
      transition: 'all 0.3s ease',
      fontSize: isMobile ? '0.9rem' : '1rem',
      position: 'relative',
      overflow: 'hidden',
      boxShadow: '0 5px 15px rgba(124, 42, 98, 0.3)',
    },
    // Profile Modal Styles
    profileModal: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
      padding: isMobile ? '1rem' : '2rem',
      backdropFilter: 'blur(5px)',
    },
    profileContent: {
      backgroundColor: 'white',
      padding: isMobile ? '1.5rem' : '2.5rem',
      borderRadius: '20px',
      maxWidth: '600px',
      width: '100%',
      maxHeight: '90vh',
      overflowY: 'auto',
      position: 'relative',
      boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3)',
    },
    closeButton: {
      position: 'absolute',
      top: '1rem',
      right: '1rem',
      background: 'none',
      border: 'none',
      fontSize: '1.5rem',
      cursor: 'pointer',
      color: '#7C2A62',
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all 0.3s ease',
      zIndex: 1001,
    },
    profileHeader: {
      textAlign: 'center',
      marginBottom: '2rem',
    },
    profileImage: {
      width: isMobile ? '120px' : '150px',
      height: isMobile ? '120px' : '150px',
      borderRadius: '50%',
      backgroundColor: '#F7D9EB',
      margin: '0 auto 1.5rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: isMobile ? '2rem' : '2.5rem',
      color: '#7C2A62',
      border: '4px solid #7C2A62',
    },
    profileName: {
      fontSize: isMobile ? '1.5rem' : '1.8rem',
      marginBottom: '0.5rem',
      color: '#333',
      fontWeight: '600',
    },
    profileSpecialty: {
      fontSize: isMobile ? '1.1rem' : '1.3rem',
      marginBottom: '0.5rem',
      color: '#7C2A62',
      fontWeight: '500',
    },
    profileRating: {
      backgroundColor: '#FFD700',
      color: '#000',
      padding: '0.3rem 0.8rem',
      borderRadius: '15px',
      fontSize: '0.9rem',
      fontWeight: 'bold',
      display: 'inline-block',
      marginBottom: '1rem',
    },
    profileDetails: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
      gap: '1rem',
      marginBottom: '2rem',
    },
    detailItem: {
      padding: '1rem',
      backgroundColor: '#f8f9fa',
      borderRadius: '10px',
      textAlign: 'left',
    },
    detailLabel: {
      fontWeight: '600',
      color: '#333',
      marginBottom: '0.3rem',
      fontSize: isMobile ? '0.85rem' : '0.9rem',
    },
    detailValue: {
      color: '#666',
      fontSize: isMobile ? '0.85rem' : '0.9rem',
    },
    fullWidthDetail: {
      gridColumn: '1 / -1',
    },
    // Slots Section Styles - Updated for hour-wise slots
    slotsSection: {
      margin: '2rem 0',
    },
    slotsHeader: {
      fontSize: isMobile ? '1.1rem' : '1.3rem',
      fontWeight: '600',
      color: '#333',
      marginBottom: '1rem',
      textAlign: 'left',
    },
    slotsContainer: {
      display: 'grid',
      gridTemplateColumns: isMobile ? 'repeat(auto-fill, minmax(80px, 1fr))' : 'repeat(auto-fill, minmax(100px, 1fr))',
      gap: '0.8rem',
      marginBottom: '1.5rem',
    },
    slotButton: {
      padding: isMobile ? '0.8rem 0.3rem' : '1rem 0.5rem',
      backgroundColor: '#f8f9fa',
      border: '2px solid #e9ecef',
      borderRadius: '10px',
      cursor: 'pointer',
      fontWeight: '500',
      fontSize: isMobile ? '0.8rem' : '0.9rem',
      transition: 'all 0.3s ease',
      textAlign: 'center',
    },
    selectedSlot: {
      backgroundColor: '#7C2A62',
      color: 'white',
      borderColor: '#7C2A62',
    },
    availableSlot: {
      backgroundColor: '#d4edda',
      borderColor: '#c3e6cb',
      color: '#155724',
    },
    unavailableSlot: {
      backgroundColor: '#f8d7da',
      borderColor: '#f5c6cb',
      color: '#721c24',
      cursor: 'not-allowed',
    },
    loadingSlots: {
      textAlign: 'center',
      padding: '2rem',
      color: '#666',
    },
    modalBookConsultationButton: {
      padding: isMobile ? '0.8rem 1.5rem' : '1rem 2rem',
      backgroundColor: '#7C2A62',
      color: 'white',
      border: 'none',
      borderRadius: '25px',
      cursor: 'pointer',
      fontWeight: '600',
      fontSize: isMobile ? '1rem' : '1.1rem',
      transition: 'all 0.3s ease',
      width: '100%',
      marginTop: '1rem',
      boxShadow: '0 5px 15px rgba(124, 42, 98, 0.3)',
      position: 'relative',
      overflow: 'hidden',
    },
    disabledButton: {
      backgroundColor: '#ccc',
      cursor: 'not-allowed',
      boxShadow: 'none',
    },
    loginMessage: {
      backgroundColor: '#FFF3CD',
      border: '1px solid #FFEAA7',
      padding: '1rem',
      borderRadius: '10px',
      marginTop: '1rem',
      color: '#856404',
      textAlign: 'center',
      fontSize: isMobile ? '0.85rem' : '0.9rem',
    },
    loginLink: {
      color: '#7C2A62',
      fontWeight: '600',
      textDecoration: 'underline',
      cursor: 'pointer',
      marginLeft: '0.3rem',
    },
    selectedSlotInfo: {
      backgroundColor: '#e7f3ff',
      border: '1px solid #b3d9ff',
      padding: '1rem',
      borderRadius: '10px',
      marginBottom: '1rem',
      textAlign: 'center',
      fontSize: isMobile ? '0.9rem' : '1rem',
    }
  };

  const doctors = [
    {
      id: 1,
      name: 'Dr. Priya Sharma',
      specialty: 'General Physician',
      experience: '10 years',
      rating: '4.9',
      initial: 'PS',
      education: 'MBBS, MD - General Medicine',
      languages: 'English, Hindi, Tamil',
      consultationFee: '₹500',
      availability: 'Mon-Sat: 9 AM - 6 PM',
      workingHours: { start: 9, end: 18 }, // 9 AM to 6 PM
      about: 'Specialized in general medicine with 10 years of experience. Expertise in chronic disease management and preventive healthcare.',
      patients: '5000+'
    },
    {
      id: 2,
      name: 'Dr. Rajesh Kumar',
      specialty: 'Cardiologist',
      experience: '12 years',
      rating: '4.8',
      initial: 'RK',
      education: 'MBBS, MD - Cardiology, DM - Cardiology',
      languages: 'English, Hindi',
      consultationFee: '₹800',
      availability: 'Mon-Fri: 10 AM - 4 PM',
      workingHours: { start: 10, end: 16 }, // 10 AM to 4 PM
      about: 'Senior cardiologist with expertise in heart disease prevention and treatment. Performed 1000+ successful procedures.',
      patients: '3000+'
    },
    {
      id: 3,
      name: 'Dr. Anjali Mehta',
      specialty: 'Pediatrician',
      experience: '8 years',
      rating: '4.9',
      initial: 'AM',
      education: 'MBBS, MD - Pediatrics',
      languages: 'English, Hindi, Gujarati',
      consultationFee: '₹600',
      availability: 'Mon-Sat: 8 AM - 5 PM',
      workingHours: { start: 8, end: 17 }, // 8 AM to 5 PM
      about: 'Dedicated pediatrician with expertise in child healthcare, vaccination, and growth monitoring.',
      patients: '4000+'
    },
    {
      id: 4,
      name: 'Dr. Sanjay Verma',
      specialty: 'Orthopedic',
      experience: '15 years',
      rating: '4.7',
      initial: 'SV',
      education: 'MBBS, MS - Orthopedics',
      languages: 'English, Hindi, Punjabi',
      consultationFee: '₹700',
      availability: 'Tue-Sat: 11 AM - 7 PM',
      workingHours: { start: 11, end: 19 }, // 11 AM to 7 PM
      about: 'Orthopedic surgeon specializing in joint replacement and sports injuries. 15 years of surgical experience.',
      patients: '6000+'
    },
    {
      id: 5,
      name: 'Dr. Neha Gupta',
      specialty: 'Dermatologist',
      experience: '9 years',
      rating: '4.8',
      initial: 'NG',
      education: 'MBBS, MD - Dermatology',
      languages: 'English, Hindi, Bengali',
      consultationFee: '₹750',
      availability: 'Mon-Fri: 9 AM - 5 PM',
      workingHours: { start: 9, end: 17 }, // 9 AM to 5 PM
      about: 'Skin and hair specialist with expertise in cosmetic dermatology and skin disease treatment.',
      patients: '3500+'
    },
    {
      id: 6,
      name: 'Dr. Amit Patel',
      specialty: 'Psychiatrist',
      experience: '11 years',
      rating: '4.9',
      initial: 'AP',
      education: 'MBBS, MD - Psychiatry',
      languages: 'English, Hindi, Marathi',
      consultationFee: '₹900',
      availability: 'Mon-Sat: 10 AM - 6 PM',
      workingHours: { start: 10, end: 18 }, // 10 AM to 6 PM
      about: 'Mental health specialist with expertise in anxiety, depression, and relationship counseling.',
      patients: '2000+'
    }
  ];

  // Function to generate hour-wise time slots based on doctor's working hours
  const generateHourWiseSlots = (doctor) => {
    const slots = [];
    const startHour = doctor.workingHours.start;
    const endHour = doctor.workingHours.end;
    
    for (let hour = startHour; hour < endHour; hour++) {
      const timeString = `${hour.toString().padStart(2, '0')}:00`;
      slots.push(timeString);
    }
    return slots;
  };

  // Simulate fetching available slots from API
  const fetchAvailableSlots = async (doctor) => {
    setLoadingSlots(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const allSlots = generateHourWiseSlots(doctor);
    const available = {};
    
    // Randomly mark some slots as available (simulating real-time availability)
    // But ensure at least 30% of slots are available
    allSlots.forEach(slot => {
      // Higher chance of availability during peak hours (10 AM - 2 PM)
      const hour = parseInt(slot.split(':')[0]);
      const isPeakHour = hour >= 10 && hour <= 14;
      const availabilityChance = isPeakHour ? 0.6 : 0.8; // 60% chance during peak, 80% otherwise
      available[slot] = Math.random() > (1 - availabilityChance);
    });
    
    // Ensure at least 2 slots are always available
    const availableSlotsList = Object.keys(available).filter(slot => available[slot]);
    if (availableSlotsList.length < 2) {
      // Make first two slots available
      allSlots.slice(0, 2).forEach(slot => {
        available[slot] = true;
      });
    }
    
    setAvailableSlots(available);
    setLoadingSlots(false);
  };

  const handleViewProfile = async (doctor) => {
    setSelectedDoctor(doctor);
    setSelectedSlot(null);
    await fetchAvailableSlots(doctor);
  };

  const handleCloseProfile = () => {
    setSelectedDoctor(null);
    setSelectedSlot(null);
    setAvailableSlots({});
  };

  const handleSlotSelect = (slot) => {
    if (availableSlots[slot]) {
      setSelectedSlot(slot);
    }
  };

  const handleBookConsultation = (doctor = null) => {
    const doctorName = doctor ? doctor.name : (selectedDoctor ? selectedDoctor.name : 'the doctor');
    const slotInfo = selectedSlot ? ` for ${formatSlotTime(selectedSlot)}` : '';
    
    if (!selectedSlot && selectedDoctor) {
      alert('Please select a time slot first to book consultation with ' + doctorName);
      return;
    }
    
    // Show confirmation message
    const confirmMessage = selectedSlot 
      ? `Booking consultation with ${doctorName}${slotInfo}. Please login to confirm.`
      : `Booking consultation with ${doctorName}. Please login to confirm.`;
    
    const userConfirmed = window.confirm(confirmMessage + '\n\nClick OK to proceed to login page.');
    
    if (userConfirmed) {
      // Close the profile modal if open
      if (selectedDoctor) {
        handleCloseProfile();
      }
      
      // Navigate to login page
      if (onNavigateToLogin) {
        onNavigateToLogin();
      }
    }
  };

  const handleLoginLinkClick = () => {
    if (selectedSlot) {
      handleBookConsultation();
    } else {
      alert('Please select a time slot first to book consultation.');
    }
  };

  // Format slot time for display (hour-wise only)
  const formatSlotTime = (slot) => {
    const [hours] = slot.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour} ${ampm}`;
  };

  // Generate floating elements
  const floatingElements = Array.from({ length: isMobile ? 8 : 15 }, (_, i) => ({
    id: i,
    size: Math.random() * (isMobile ? 50 : 100) + (isMobile ? 30 : 50),
    left: Math.random() * 100,
    top: Math.random() * 100,
    animationDelay: Math.random() * 5,
  }));

  return (
    <section style={styles.doctors}>
      {/* Floating Background Elements */}
      <div style={styles.floatingElements}>
        {floatingElements.map((element) => (
          <div
            key={element.id}
            style={{
              ...styles.floatingElement,
              width: element.size,
              height: element.size,
              left: `${element.left}%`,
              top: `${element.top}%`,
              animationDelay: `${element.animationDelay}s`,
            }}
          />
        ))}
      </div>

      <div style={styles.container}>
        <h2 style={styles.sectionTitle}>
          Our Medical Experts
        </h2>
        <p style={styles.sectionSubtitle}>
          Connect with certified healthcare professionals online
        </p>
        
        <div style={styles.doctorsGrid}>
          {doctors.map((doctor, index) => (
            <div
              key={doctor.id}
              style={styles.doctorCard}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(124, 42, 98, 0.15)';
                e.currentTarget.style.borderColor = '#7C2A62';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 8px 30px rgba(124, 42, 98, 0.1)';
                e.currentTarget.style.borderColor = 'transparent';
              }}
            >
              <div style={styles.rating}>⭐ {doctor.rating}</div>
              <div style={styles.doctorImage}>{doctor.initial}</div>
              <h3 style={styles.doctorName}>{doctor.name}</h3>
              <p style={styles.doctorSpecialty}>{doctor.specialty}</p>
              <p style={styles.doctorExperience}>Experience: {doctor.experience}</p>
              <p style={{...styles.doctorExperience, fontSize: '0.8rem', color: '#7C2A62', fontWeight: '500'}}>
                Available: {doctor.availability}
              </p>
              
              <div style={styles.buttonContainer}>
                <button
                  style={styles.viewProfileButton}
                  onClick={() => handleViewProfile(doctor)}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#7C2A62';
                    e.target.style.color = 'white';
                    e.target.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'transparent';
                    e.target.style.color = '#7C2A62';
                    e.target.style.transform = 'translateY(0)';
                  }}
                >
                  View Profile
                </button>
                
                <button
                  style={styles.bookConsultationButton}
                  onClick={() => handleBookConsultation(doctor)}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#5a1a4a';
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 8px 20px rgba(124, 42, 98, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = '#7C2A62';
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 5px 15px rgba(124, 42, 98, 0.3)';
                  }}
                >
                  Book Consultation
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Doctor Profile Modal */}
        {selectedDoctor && (
          <div style={styles.profileModal} onClick={handleCloseProfile}>
            <div style={styles.profileContent} onClick={(e) => e.stopPropagation()}>
              <button 
                style={styles.closeButton}
                onClick={handleCloseProfile}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#F7D9EB';
                  e.target.style.color = '#7C2A62';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.color = '#7C2A62';
                }}
              >
                ×
              </button>
              
              <div style={styles.profileHeader}>
                <div style={styles.profileImage}>{selectedDoctor.initial}</div>
                <h2 style={styles.profileName}>{selectedDoctor.name}</h2>
                <p style={styles.profileSpecialty}>{selectedDoctor.specialty}</p>
                <div style={styles.profileRating}>⭐ {selectedDoctor.rating} Rating</div>
              </div>

              <div style={styles.profileDetails}>
                <div style={styles.detailItem}>
                  <div style={styles.detailLabel}>Education</div>
                  <div style={styles.detailValue}>{selectedDoctor.education}</div>
                </div>
                <div style={styles.detailItem}>
                  <div style={styles.detailLabel}>Experience</div>
                  <div style={styles.detailValue}>{selectedDoctor.experience}</div>
                </div>
                <div style={styles.detailItem}>
                  <div style={styles.detailLabel}>Languages</div>
                  <div style={styles.detailValue}>{selectedDoctor.languages}</div>
                </div>
                <div style={styles.detailItem}>
                  <div style={styles.detailLabel}>Fee</div>
                  <div style={styles.detailValue}>{selectedDoctor.consultationFee}</div>
                </div>
                <div style={{...styles.detailItem, ...styles.fullWidthDetail}}>
                  <div style={styles.detailLabel}>Availability</div>
                  <div style={styles.detailValue}>{selectedDoctor.availability}</div>
                </div>
                <div style={{...styles.detailItem, ...styles.fullWidthDetail}}>
                  <div style={styles.detailLabel}>About</div>
                  <div style={styles.detailValue}>{selectedDoctor.about}</div>
                </div>
              </div>

              {/* Available Slots Section - Now Hour-wise based on doctor availability */}
              <div style={styles.slotsSection}>
                <h3 style={styles.slotsHeader}>Available Time Slots (Today)</h3>
                
                {loadingSlots ? (
                  <div style={styles.loadingSlots}>
                    Loading available slots...
                  </div>
                ) : (
                  <>
                    {selectedSlot && (
                      <div style={styles.selectedSlotInfo}>
                        <strong>Selected Slot:</strong> {formatSlotTime(selectedSlot)}
                      </div>
                    )}
                    
                    <div style={styles.slotsContainer}>
                      {Object.entries(availableSlots).map(([slot, isAvailable]) => (
                        <button
                          key={slot}
                          style={{
                            ...styles.slotButton,
                            ...(selectedSlot === slot && styles.selectedSlot),
                            ...(isAvailable ? styles.availableSlot : styles.unavailableSlot),
                            ...(!isAvailable && { cursor: 'not-allowed' })
                          }}
                          onClick={() => handleSlotSelect(slot)}
                          disabled={!isAvailable}
                          onMouseEnter={(e) => {
                            if (isAvailable && selectedSlot !== slot) {
                              e.target.style.transform = 'scale(1.05)';
                              e.target.style.boxShadow = '0 2px 8px rgba(0,0,0,0.2)';
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (isAvailable && selectedSlot !== slot) {
                              e.target.style.transform = 'scale(1)';
                              e.target.style.boxShadow = 'none';
                            }
                          }}
                        >
                          {formatSlotTime(slot)}
                        </button>
                      ))}
                    </div>
                    
                    {Object.keys(availableSlots).length === 0 && !loadingSlots && (
                      <div style={{...styles.loginMessage, backgroundColor: '#f8d7da', color: '#721c24'}}>
                        No slots available for today. Please check back tomorrow.
                      </div>
                    )}
                  </>
                )}
              </div>

              <button
                style={{
                  ...styles.modalBookConsultationButton,
                  ...(!selectedSlot && styles.disabledButton)
                }}
                onClick={() => handleBookConsultation(selectedDoctor)}
                disabled={!selectedSlot}
                onMouseEnter={(e) => {
                  if (selectedSlot) {
                    e.target.style.backgroundColor = '#5a1a4a';
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 8px 20px rgba(124, 42, 98, 0.4)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedSlot) {
                    e.target.style.backgroundColor = '#7C2A62';
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 5px 15px rgba(124, 42, 98, 0.3)';
                  }
                }}
              >
                {selectedSlot ? `Book Consultation at ${formatSlotTime(selectedSlot)}` : 'Select a Time Slot'}
              </button>

              <div style={styles.loginMessage}>
                Please 
                <span style={styles.loginLink} onClick={handleLoginLinkClick}>
                  login
                </span> 
                to confirm your booking
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Doctors;