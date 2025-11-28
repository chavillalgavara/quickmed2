import React, { useState, useEffect } from 'react';

const AboutUs = ({ onNavigateToAuth }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [showLearnMoreModal, setShowLearnMoreModal] = useState(false);
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

  const handleBookAppointment = () => {
    const confirmLogin = window.confirm(
      'To book an appointment, you need to login first.\n\nClick OK to proceed to login page.'
    );
    
    if (confirmLogin && onNavigateToAuth) {
      onNavigateToAuth();
    }
  };

  const handleLearnMore = () => {
    setShowLearnMoreModal(true);
  };

  const closeLearnMoreModal = () => {
    setShowLearnMoreModal(false);
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      closeLearnMoreModal();
    }
  };

  const styles = {
    // Main About Section with Bubble Background
    about: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #F7D9EB 0%, #ffffff 50%, #F7D9EB 100%)',
      position: 'relative',
      overflow: 'hidden',
      padding: isMobile ? '60px 20px' : isTablet ? '70px 30px' : '80px 20px',
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
    header: {
      textAlign: 'center',
      marginBottom: isMobile ? '40px' : '60px',
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
      transition: 'all 0.8s ease-out',
    },
    sectionTitle: {
      fontSize: isMobile ? '36px' : isTablet ? '42px' : '48px',
      fontWeight: '700',
      color: '#7C2A62',
      marginBottom: '16px',
      background: 'linear-gradient(45deg, #7C2A62, #9C3A7A)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
    sectionSubtitle: {
      fontSize: isMobile ? '16px' : '20px',
      color: '#666',
      fontWeight: '300',
      maxWidth: '600px',
      margin: '0 auto',
      lineHeight: '1.6',
    },
    mainContent: {
      display: 'grid',
      gridTemplateColumns: '1fr',
      gap: isMobile ? '30px' : '40px',
      alignItems: 'start',
      marginBottom: isMobile ? '60px' : '80px',
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
      transition: 'all 0.8s ease-out 0.2s',
    },
    textSection: {
      display: 'flex',
      flexDirection: 'column',
      gap: isMobile ? '20px' : '30px',
    },
    paragraph: {
      fontSize: isMobile ? '16px' : '18px',
      lineHeight: '1.8',
      color: '#333',
      textAlign: 'left',
    },
    highlightBox: {
      backgroundColor: 'rgba(124, 42, 98, 0.05)',
      padding: isMobile ? '20px' : '30px',
      borderRadius: '15px',
      borderLeft: '4px solid #7C2A62',
      textAlign: 'center',
      margin: isMobile ? '20px 0' : '30px 0',
    },
    highlightText: {
      fontSize: isMobile ? '18px' : '20px',
      color: '#7C2A62',
      fontWeight: '600',
      fontStyle: 'italic',
      lineHeight: '1.6',
      margin: 0,
    },
    missionVisionSection: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
      gap: isMobile ? '25px' : '40px',
      marginBottom: isMobile ? '40px' : '60px',
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
      transition: 'all 0.8s ease-out 0.4s',
    },
    missionCard: {
      backgroundColor: 'white',
      padding: isMobile ? '30px 20px' : '40px 30px',
      borderRadius: '20px',
      boxShadow: '0 8px 30px rgba(124, 42, 98, 0.1)',
      textAlign: 'center',
      transition: 'all 0.3s ease',
      border: '2px solid transparent',
      backdropFilter: 'blur(10px)',
    },
    missionIcon: {
      fontSize: isMobile ? '40px' : '48px',
      marginBottom: isMobile ? '15px' : '20px',
      color: '#7C2A62',
    },
    missionTitle: {
      fontSize: isMobile ? '24px' : '28px',
      fontWeight: '700',
      color: '#7C2A62',
      marginBottom: isMobile ? '15px' : '20px',
    },
    missionDescription: {
      fontSize: isMobile ? '14px' : '16px',
      color: '#555',
      lineHeight: '1.7',
      marginBottom: '20px',
    },
    missionPoints: {
      textAlign: 'left',
    },
    missionPoint: {
      fontSize: isMobile ? '13px' : '14px',
      color: '#666',
      marginBottom: '12px',
      paddingLeft: '20px',
      position: 'relative',
      lineHeight: '1.5',
    },
    pointIcon: {
      position: 'absolute',
      left: '0',
      color: '#7C2A62',
      fontWeight: 'bold',
    },
    statsSection: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
      gap: isMobile ? '20px' : isTablet ? '25px' : '30px',
      marginBottom: isMobile ? '40px' : '80px',
    },
    statCard: {
      backgroundColor: 'white',
      padding: isMobile ? '30px 15px' : '40px 20px',
      borderRadius: '15px',
      boxShadow: '0 5px 20px rgba(124, 42, 98, 0.1)',
      textAlign: 'center',
      transition: 'all 0.3s ease',
      backdropFilter: 'blur(10px)',
    },
    statNumber: {
      fontSize: isMobile ? '32px' : isTablet ? '36px' : '42px',
      fontWeight: '700',
      color: '#7C2A62',
      marginBottom: '10px',
      background: 'linear-gradient(45deg, #7C2A62, #9C3A7A)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
    statLabel: {
      fontSize: isMobile ? '14px' : '16px',
      color: '#666',
      fontWeight: '500',
    },
    valuesSection: {
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      padding: isMobile ? '40px 20px' : '60px 40px',
      borderRadius: '25px',
      boxShadow: '0 10px 40px rgba(124, 42, 98, 0.1)',
      marginBottom: isMobile ? '40px' : '60px',
      backdropFilter: 'blur(10px)',
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
      transition: 'all 0.8s ease-out 0.6s',
    },
    valuesTitle: {
      fontSize: isMobile ? '28px' : isTablet ? '32px' : '36px',
      textAlign: 'center',
      fontWeight: '700',
      color: '#7C2A62',
      marginBottom: isMobile ? '30px' : '50px',
    },
    valuesGrid: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
      gap: isMobile ? '20px' : isTablet ? '25px' : '30px',
    },
    valueCard: {
      backgroundColor: '#F7D9EB',
      padding: isMobile ? '25px 15px' : '30px 20px',
      borderRadius: '15px',
      textAlign: 'center',
      transition: 'all 0.3s ease',
      backdropFilter: 'blur(5px)',
    },
    valueIcon: {
      fontSize: isMobile ? '35px' : '40px',
      marginBottom: isMobile ? '15px' : '20px',
      color: '#7C2A62',
    },
    valueTitle: {
      fontSize: isMobile ? '18px' : '20px',
      fontWeight: '600',
      color: '#333',
      marginBottom: isMobile ? '12px' : '15px',
    },
    valueDescription: {
      fontSize: isMobile ? '13px' : '14px',
      color: '#666',
      lineHeight: '1.6',
    },
    aboutGrid: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
      gap: isMobile ? '40px' : '60px',
      alignItems: 'center',
      marginBottom: isMobile ? '60px' : '80px',
    },
    aboutText: {
      display: 'flex',
      flexDirection: 'column',
      gap: isMobile ? '20px' : '25px',
    },
    aboutImage: {
      position: 'relative',
      borderRadius: '20px',
      overflow: 'hidden',
      boxShadow: '0 15px 40px rgba(124, 42, 98, 0.15)',
    },
    aboutImg: {
      width: '100%',
      height: isMobile ? '300px' : '400px',
      objectFit: 'cover',
      display: 'block',
    },
    imageOverlay: {
      position: 'absolute',
      bottom: '0',
      left: '0',
      right: '0',
      background: 'linear-gradient(transparent, rgba(124, 42, 98, 0.8))',
      padding: isMobile ? '20px 15px' : '30px 20px',
      color: 'white',
    },
    overlayContent: {
      display: 'flex',
      alignItems: 'center',
      gap: '15px',
    },
    overlayIcon: {
      fontSize: isMobile ? '28px' : '32px',
    },
    teamSection: {
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      padding: isMobile ? '40px 20px' : '60px 40px',
      borderRadius: '25px',
      boxShadow: '0 10px 40px rgba(124, 42, 98, 0.1)',
      marginBottom: isMobile ? '40px' : '60px',
      backdropFilter: 'blur(10px)',
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
      transition: 'all 0.8s ease-out 0.8s',
    },
    teamTitle: {
      fontSize: isMobile ? '28px' : isTablet ? '32px' : '36px',
      textAlign: 'center',
      fontWeight: '700',
      color: '#7C2A62',
      marginBottom: isMobile ? '30px' : '50px',
    },
    teamGrid: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
      gap: isMobile ? '20px' : isTablet ? '25px' : '40px',
    },
    teamMember: {
      backgroundColor: '#F7D9EB',
      padding: isMobile ? '30px 20px' : '40px 30px',
      borderRadius: '20px',
      textAlign: 'center',
      transition: 'all 0.3s ease',
      backdropFilter: 'blur(5px)',
    },
    memberAvatar: {
      fontSize: isMobile ? '50px' : '60px',
      marginBottom: isMobile ? '15px' : '20px',
    },
    memberName: {
      fontSize: isMobile ? '20px' : '22px',
      fontWeight: '600',
      color: '#333',
      marginBottom: '10px',
    },
    memberRole: {
      fontSize: isMobile ? '14px' : '16px',
      color: '#7C2A62',
      fontWeight: '500',
      marginBottom: '15px',
    },
    memberBio: {
      fontSize: isMobile ? '13px' : '14px',
      color: '#666',
      lineHeight: '1.6',
    },
    ctaSection: {
      backgroundColor: 'rgba(124, 42, 98, 0.05)',
      padding: isMobile ? '60px 20px' : '80px 40px',
      borderRadius: '25px',
      textAlign: 'center',
      marginBottom: '40px',
      backdropFilter: 'blur(10px)',
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
      transition: 'all 0.8s ease-out 1s',
    },
    ctaTitle: {
      fontSize: isMobile ? '28px' : isTablet ? '32px' : '36px',
      fontWeight: '700',
      color: '#7C2A62',
      marginBottom: '20px',
    },
    ctaDescription: {
      fontSize: isMobile ? '16px' : '18px',
      color: '#666',
      marginBottom: isMobile ? '30px' : '40px',
      maxWidth: '600px',
      margin: '0 auto 40px',
      lineHeight: '1.6',
    },
    ctaButtons: {
      display: 'flex',
      gap: '20px',
      justifyContent: 'center',
      flexWrap: 'wrap',
      flexDirection: isMobile ? 'column' : 'row',
      alignItems: 'center',
    },
    btnPrimary: {
      backgroundColor: '#7C2A62',
      color: 'white',
      border: 'none',
      padding: isMobile ? '12px 25px' : '15px 30px',
      borderRadius: '50px',
      fontSize: isMobile ? '14px' : '16px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      boxShadow: '0 5px 15px rgba(124, 42, 98, 0.3)',
      minWidth: isMobile ? '200px' : 'auto',
    },
    btnSecondary: {
      backgroundColor: 'transparent',
      color: '#7C2A62',
      border: '2px solid #7C2A62',
      padding: isMobile ? '12px 25px' : '15px 30px',
      borderRadius: '50px',
      fontSize: isMobile ? '14px' : '16px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      minWidth: isMobile ? '200px' : 'auto',
    },
    // Learn More Modal Styles
    modalOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: isMobile ? '1rem' : '2rem',
      backdropFilter: 'blur(5px)',
    },
    modalContent: {
      backgroundColor: 'white',
      padding: isMobile ? '1.5rem' : '2.5rem',
      borderRadius: '15px',
      maxWidth: isMobile ? '95%' : '800px',
      width: '100%',
      maxHeight: isMobile ? '90vh' : '80vh',
      overflowY: 'auto',
      boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
      position: 'relative',
    },
    modalHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '2rem',
      paddingBottom: '1rem',
      borderBottom: '2px solid #7C2A62',
    },
    modalTitle: {
      fontSize: isMobile ? '1.5rem' : '2rem',
      color: '#7C2A62',
      fontWeight: 'bold',
      margin: 0,
    },
    closeButton: {
      background: 'none',
      border: 'none',
      fontSize: '1.5rem',
      color: '#7C2A62',
      cursor: 'pointer',
      padding: '0.5rem',
      borderRadius: '50%',
      width: '40px',
      height: '40px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all 0.3s ease',
    },
    modalBody: {
      color: '#333',
      lineHeight: '1.6',
    },
    modalSection: {
      marginBottom: '2rem',
    },
    modalHeading: {
      fontSize: isMobile ? '1.1rem' : '1.3rem',
      color: '#7C2A62',
      fontWeight: '600',
      marginBottom: '1rem',
    },
    modalText: {
      fontSize: isMobile ? '0.9rem' : '1rem',
      color: '#666',
      marginBottom: '1rem',
      lineHeight: '1.6',
    },
    featureList: {
      listStyle: 'none',
      padding: 0,
      margin: '1rem 0',
    },
    featureItem: {
      padding: '0.5rem 0',
      borderBottom: '1px solid #f0f0f0',
      display: 'flex',
      alignItems: 'flex-start',
      gap: '0.8rem',
    },
    featureIcon: {
      color: '#7C2A62',
      fontSize: '1.2rem',
      marginTop: '0.2rem',
      flexShrink: 0,
    },
  };

  const values = [
    {
      icon: '❤️',
      title: 'Compassion',
      description: 'We treat every patient with empathy, understanding, and genuine care for their well-being.'
    },
    {
      icon: '⚡',
      title: 'Innovation',
      description: 'Leveraging cutting-edge technology to make healthcare faster, smarter, and more accessible.'
    },
    {
      icon: '🛡️',
      title: 'Trust',
      description: 'Building lasting relationships based on reliability, transparency, and medical excellence.'
    },
    {
      icon: '🤝',
      title: 'Collaboration',
      description: 'Working together with patients, doctors, and partners to achieve the best health outcomes.'
    }
  ];

  const teamMembers = [
    {
      avatar: '👨‍💼',
      name: 'Dr. Simhadri Naidu',
      role: 'Chief Medical Officer',
      bio: '20+ years of experience in healthcare management and patient care.'
    },
    {
      avatar: '👨‍💼',
      name: 'Sai Krishna',
      role: 'CEO & Founder',
      bio: 'Visionary leader passionate about healthcare technology and accessibility.'
    },
    {
      avatar: '👨‍💻',
      name: 'Sankar Rao',
      role: 'CTO',
      bio: 'Technology expert driving innovation in healthcare platforms.'
    }
  ];

  // Generate floating elements
  const floatingElements = Array.from({ length: isMobile ? 8 : 15 }, (_, i) => ({
    id: i,
    size: Math.random() * (isMobile ? 50 : 100) + (isMobile ? 30 : 50),
    left: Math.random() * 100,
    top: Math.random() * 100,
    animationDelay: Math.random() * 5,
  }));

  // Learn More Modal Component
  const LearnMoreModal = ({ onClose }) => {
    return (
      <div style={styles.modalOverlay} onClick={handleBackdropClick}>
        <div style={styles.modalContent}>
          <div style={styles.modalHeader}>
            <h2 style={styles.modalTitle}>Why Choose QuickMed?</h2>
            <button
              style={styles.closeButton}
              onClick={onClose}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#F7D9EB';
                e.target.style.color = '#7C2A62';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.color = '#7C2A62';
              }}
              aria-label="Close modal"
            >
              ✕
            </button>
          </div>
          
          <div style={styles.modalBody}>
            <div style={styles.modalSection}>
              <h3 style={styles.modalHeading}>Comprehensive Healthcare Solutions</h3>
              <p style={styles.modalText}>
                QuickMed offers a complete ecosystem of healthcare services designed to meet all your medical needs in one platform.
              </p>
              
              <ul style={styles.featureList}>
                <li style={styles.featureItem}>
                  <span style={styles.featureIcon}>💊</span>
                  <div>
                    <strong>Medicine Delivery</strong> - Get prescribed and OTC medicines delivered to your doorstep within 30-40 minutes
                  </div>
                </li>
                <li style={styles.featureItem}>
                  <span style={styles.featureIcon}>🎥</span>
                  <div>
                    <strong>Online Consultations</strong> - Connect with specialist doctors via secure video calls from anywhere
                  </div>
                </li>
                <li style={styles.featureItem}>
                  <span style={styles.featureIcon}>🏥</span>
                  <div>
                    <strong>Emergency Services</strong> - 24/7 emergency medical assistance with rapid response teams
                  </div>
                </li>
                <li style={styles.featureItem}>
                  <span style={styles.featureIcon}>📱</span>
                  <div>
                    <strong>Health Tracking</strong> - Monitor your health records, prescriptions, and appointments in one place
                  </div>
                </li>
              </ul>
            </div>

            <div style={styles.modalSection}>
              <h3 style={styles.modalHeading}>Our Technology Advantage</h3>
              <p style={styles.modalText}>
                Powered by advanced technology to ensure seamless healthcare experiences:
              </p>
              
              <ul style={styles.featureList}>
                <li style={styles.featureItem}>
                  <span style={styles.featureIcon}>🔒</span>
                  <div>Secure and encrypted medical data storage</div>
                </li>
                <li style={styles.featureItem}>
                  <span style={styles.featureIcon}>⚡</span>
                  <div>AI-powered symptom checker and health recommendations</div>
                </li>
                <li style={styles.featureItem}>
                  <span style={styles.featureIcon}>📊</span>
                  <div>Real-time prescription and health monitoring</div>
                </li>
                <li style={styles.featureItem}>
                  <span style={styles.featureIcon}>🌐</span>
                  <div>Multi-platform accessibility (Web, iOS, Android)</div>
                </li>
              </ul>
            </div>

            <div style={styles.modalSection}>
              <h3 style={styles.modalHeading}>Quality Assurance</h3>
              <p style={styles.modalText}>
                We maintain the highest standards in healthcare delivery:
              </p>
              
              <ul style={styles.featureList}>
                <li style={styles.featureItem}>
                  <span style={styles.featureIcon}>✅</span>
                  <div>All doctors are verified and licensed practitioners</div>
                </li>
                <li style={styles.featureItem}>
                  <span style={styles.featureIcon}>💯</span>
                  <div>Medicines sourced from certified pharmacies only</div>
                </li>
                <li style={styles.featureItem}>
                  <span style={styles.featureIcon}>⭐</span>
                  <div>4.9/5 patient satisfaction rating</div>
                </li>
                <li style={styles.featureItem}>
                  <span style={styles.featureIcon}>🕒</span>
                  <div>24/7 customer support and emergency services</div>
                </li>
              </ul>
            </div>

            <div style={styles.modalSection}>
              <h3 style={styles.modalHeading}>Get Started Today</h3>
              <p style={styles.modalText}>
                Join over 50,000 satisfied patients who trust QuickMed for their healthcare needs. 
                Download our app or visit our website to experience the future of healthcare.
              </p>
              <p style={{...styles.modalText, fontStyle: 'italic', color: '#7C2A62'}}>
                Your health journey starts here. We're committed to making it smooth, safe, and successful.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <section style={styles.about}>
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
          {/* Header Section */}
          <div style={styles.header}>
            <h2 style={styles.sectionTitle}>About QuickMed</h2>
            <p style={styles.sectionSubtitle}>
              Revolutionizing healthcare delivery since 2025
            </p>
          </div>

          {/* Main Content Section */}
          <div style={styles.mainContent}>
            <div style={styles.aboutGrid}>
              <div style={styles.aboutText}>
                <h2 style={{...styles.valuesTitle, textAlign: 'left', marginBottom: '20px', fontSize: isMobile ? '24px' : '32px'}}>Our Story</h2>
                <p style={styles.paragraph}>
                  QuickMed was founded with a simple mission: to make quality healthcare
                  accessible to everyone. We believe that getting medical help should be
                  quick, convenient, and reliable.
                </p>
                <p style={styles.paragraph}>
                  Our platform connects patients with healthcare providers, pharmacies,
                  and diagnostic centers, creating a seamless healthcare ecosystem that
                  puts your health first.
                </p>

                {/* Stats Grid */}
                <div style={styles.statsSection}>
                  <div 
                    style={styles.statCard}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.05)';
                      e.currentTarget.style.boxShadow = '0 10px 30px rgba(124, 42, 98, 0.15)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                      e.currentTarget.style.boxShadow = '0 5px 20px rgba(124, 42, 98, 0.1)';
                    }}
                  >
                    <div style={styles.statNumber}>50,000+</div>
                    <div style={styles.statLabel}>Happy Patients</div>
                  </div>
                  <div 
                    style={styles.statCard}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.05)';
                      e.currentTarget.style.boxShadow = '0 10px 30px rgba(124, 42, 98, 0.15)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                      e.currentTarget.style.boxShadow = '0 5px 20px rgba(124, 42, 98, 0.1)';
                    }}
                  >
                    <div style={styles.statNumber}>500+</div>
                    <div style={styles.statLabel}>Verified Doctors</div>
                  </div>
                  <div 
                    style={styles.statCard}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.05)';
                      e.currentTarget.style.boxShadow = '0 10px 30px rgba(124, 42, 98, 0.15)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                      e.currentTarget.style.boxShadow = '0 5px 20px rgba(124, 42, 98, 0.1)';
                    }}
                  >
                    <div style={styles.statNumber}>100+</div>
                    <div style={styles.statLabel}>Cities Served</div>
                  </div>
                  <div 
                    style={styles.statCard}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.05)';
                      e.currentTarget.style.boxShadow = '0 10px 30px rgba(124, 42, 98, 0.15)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                      e.currentTarget.style.boxShadow = '0 5px 20px rgba(124, 42, 98, 0.1)';
                    }}
                  >
                    <div style={styles.statNumber}>24/7</div>
                    <div style={styles.statLabel}>Service Available</div>
                  </div>
                </div>
              </div>

              <div style={styles.aboutImage}>
                <img
                  src="https://png.pngtree.com/background/20250710/original/pngtree-medical-tools-and-supplies-arranged-on-a-white-surface-representing-healthcare-picture-image_16678403.jpg"
                  alt="Healthcare professionals providing medical care"
                  style={styles.aboutImg}
                />
                <div style={styles.imageOverlay}>
                  <div style={styles.overlayContent}>
                    <span style={styles.overlayIcon}>🏥</span>
                    <div>
                      <h4 style={{margin: '0 0 5px 0', color: 'white', fontSize: isMobile ? '16px' : '18px'}}>Quality Care</h4>
                      <p style={{margin: 0, color: 'white', fontSize: isMobile ? '12px' : '14px'}}>Committed to excellence in healthcare delivery</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mission & Vision Section */}
          <div style={styles.missionVisionSection}>
            <div 
              style={styles.missionCard}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px)';
                e.currentTarget.style.boxShadow = '0 15px 40px rgba(124, 42, 98, 0.15)';
                e.currentTarget.style.borderColor = '#7C2A62';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 8px 30px rgba(124, 42, 98, 0.1)';
                e.currentTarget.style.borderColor = 'transparent';
              }}
            >
              <div style={styles.missionIcon}>🎯</div>
              <h3 style={styles.missionTitle}>Our Mission</h3>
              <p style={styles.missionDescription}>
                To provide accessible, affordable, and high-quality healthcare services to every household through technology innovation and compassionate care.
              </p>
            </div>
            
            <div 
              style={styles.missionCard}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px)';
                e.currentTarget.style.boxShadow = '0 15px 40px rgba(124, 42, 98, 0.15)';
                e.currentTarget.style.borderColor = '#7C2A62';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 8px 30px rgba(124, 42, 98, 0.1)';
                e.currentTarget.style.borderColor = 'transparent';
              }}
            >
              <div style={styles.missionIcon}>🔭</div>
              <h3 style={styles.missionTitle}>Our Vision</h3>
              <p style={styles.missionDescription}>
                To become the most trusted healthcare platform that transforms how people access medical services globally, making quality healthcare a fundamental right.
              </p>
            </div>
          </div>

          {/* Values Section */}
          <div style={styles.valuesSection}>
            <h2 style={styles.valuesTitle}>Our Values</h2>
            <div style={styles.valuesGrid}>
              {values.map((value, index) => (
                <div 
                  key={index}
                  style={styles.valueCard}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-5px)';
                    e.currentTarget.style.boxShadow = '0 10px 25px rgba(124, 42, 98, 0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div style={styles.valueIcon}>{value.icon}</div>
                  <h3 style={styles.valueTitle}>{value.title}</h3>
                  <p style={styles.valueDescription}>{value.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Team Section */}
          <div style={styles.teamSection}>
            <h2 style={styles.teamTitle}>Leadership Team</h2>
            <div style={styles.teamGrid}>
              {teamMembers.map((member, index) => (
                <div 
                  key={index}
                  style={styles.teamMember}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-10px)';
                    e.currentTarget.style.boxShadow = '0 15px 40px rgba(124, 42, 98, 0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div style={styles.memberAvatar}>{member.avatar}</div>
                  <h3 style={styles.memberName}>{member.name}</h3>
                  <p style={styles.memberRole}>{member.role}</p>
                  <p style={styles.memberBio}>{member.bio}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div style={styles.ctaSection}>
            <h2 style={styles.ctaTitle}>Ready to Experience Better Healthcare?</h2>
            <p style={styles.ctaDescription}>
              Join thousands of satisfied patients who trust QuickMed for their healthcare needs.
            </p>
            <div style={styles.ctaButtons}>
              <button 
                style={styles.btnPrimary}
                onClick={handleBookAppointment}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#9C3A7A';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 8px 20px rgba(124, 42, 98, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#7C2A62';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 5px 15px rgba(124, 42, 98, 0.3)';
                }}
              >
                Book Appointment
              </button>
              <button 
                style={styles.btnSecondary}
                onClick={handleLearnMore}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#7C2A62';
                  e.currentTarget.style.color = 'white';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = '#7C2A62';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Learn More Modal */}
      {showLearnMoreModal && (
        <LearnMoreModal onClose={closeLearnMoreModal} />
      )}
    </>
  );
};

export default AboutUs;