import React, { useState, useEffect } from 'react';

const Services = ({ onNavigateToLogin }) => {
  const [selectedService, setSelectedService] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showLoginMessage, setShowLoginMessage] = useState(false);
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

  const styles = {
    // Main Services Section with Bubble Background
    services: {
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
    servicesGrid: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
      gap: isMobile ? '1.5rem' : '2rem',
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
      transition: 'all 0.8s ease-out 0.4s',
    },
    serviceCard: {
      padding: isMobile ? '2rem 1.5rem' : '2.5rem',
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      borderRadius: '20px',
      boxShadow: '0 8px 30px rgba(124, 42, 98, 0.1)',
      textAlign: 'center',
      transition: 'all 0.3s ease',
      border: '2px solid transparent',
      backdropFilter: 'blur(10px)',
      position: 'relative',
      overflow: 'hidden',
    },
    serviceIcon: {
      fontSize: isMobile ? '3.5rem' : '4rem',
      marginBottom: '1.5rem',
      background: 'linear-gradient(45deg, #7C2A62, #D32F2F)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
    serviceTitle: {
      fontSize: isMobile ? '1.3rem' : '1.5rem',
      marginBottom: '1rem',
      color: '#7C2A62',
      fontWeight: '600',
    },
    serviceDescription: {
      color: '#666',
      lineHeight: '1.6',
      marginBottom: '2rem',
      fontSize: isMobile ? '0.9rem' : '1rem',
    },
    serviceFeatures: {
      listStyle: 'none',
      padding: '0',
      margin: '1.5rem 0',
      textAlign: 'left',
    },
    serviceFeatureItem: {
      padding: '0.5rem 0',
      color: '#555',
      fontSize: isMobile ? '0.85rem' : '0.95rem',
      position: 'relative',
      paddingLeft: '1.5rem',
    },
    featureBullet: {
      position: 'absolute',
      left: '0',
      color: '#7C2A62',
      fontWeight: 'bold',
    },
    learnMoreButton: {
      padding: isMobile ? '0.7rem 1.2rem' : '0.8rem 1.5rem',
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
    modalOverlay: {
      position: 'fixed',
      top: '0',
      left: '0',
      right: '0',
      bottom: '0',
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: '1000',
      padding: isMobile ? '1rem' : '2rem',
      backdropFilter: 'blur(5px)',
    },
    modalContent: {
      backgroundColor: 'white',
      borderRadius: '20px',
      padding: isMobile ? '2rem' : '2.5rem',
      maxWidth: '800px',
      width: '100%',
      maxHeight: '90vh',
      overflowY: 'auto',
      position: 'relative',
      boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3)',
    },
    modalClose: {
      position: 'absolute',
      top: '1rem',
      right: '1.5rem',
      background: 'none',
      border: 'none',
      fontSize: '2rem',
      cursor: 'pointer',
      color: '#666',
      fontWeight: '300',
      width: '40px',
      height: '40px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '50%',
      transition: 'all 0.3s ease',
    },
    modalHeader: {
      display: 'flex',
      alignItems: 'center',
      gap: '1.5rem',
      marginBottom: '2rem',
      paddingBottom: '1.5rem',
      borderBottom: '2px solid #f0f0f0',
    },
    modalIcon: {
      fontSize: isMobile ? '2.5rem' : '3rem',
      background: 'linear-gradient(45deg, #7C2A62, #D32F2F)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
    modalTitle: {
      fontSize: isMobile ? '1.5rem' : '2rem',
      color: '#7C2A62',
      fontWeight: '700',
      marginBottom: '0.5rem',
    },
    modalDescription: {
      fontSize: isMobile ? '0.9rem' : '1.1rem',
      color: '#666',
      margin: '0',
    },
    modalBody: {
      marginBottom: '2rem',
    },
    modalSection: {
      marginBottom: '2rem',
    },
    modalSectionTitle: {
      fontSize: isMobile ? '1.1rem' : '1.3rem',
      color: '#7C2A62',
      fontWeight: '600',
      marginBottom: '1rem',
    },
    modalText: {
      color: '#555',
      lineHeight: '1.6',
      fontSize: isMobile ? '0.9rem' : '1rem',
    },
    modalList: {
      listStyle: 'none',
      padding: '0',
      margin: '0',
    },
    modalListItem: {
      padding: '0.5rem 0',
      color: '#555',
      fontSize: isMobile ? '0.9rem' : '1rem',
      position: 'relative',
      paddingLeft: '1.5rem',
      lineHeight: '1.5',
    },
    modalProcess: {
      listStyle: 'none',
      padding: '0',
      margin: '0',
      counterReset: 'step-counter',
    },
    modalProcessItem: {
      padding: '0.8rem 0',
      color: '#555',
      fontSize: isMobile ? '0.9rem' : '1rem',
      position: 'relative',
      paddingLeft: '2.5rem',
      lineHeight: '1.5',
      counterIncrement: 'step-counter',
    },
    processNumber: {
      position: 'absolute',
      left: '0',
      width: '1.8rem',
      height: '1.8rem',
      backgroundColor: '#7C2A62',
      color: 'white',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '0.9rem',
      fontWeight: '600',
    },
    modalDetailsGrid: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
      gap: isMobile ? '1rem' : '2rem',
      marginTop: '2rem',
      padding: '1.5rem',
      backgroundColor: '#f8f9fa',
      borderRadius: '15px',
    },
    detailItem: {
      textAlign: 'left',
    },
    detailTitle: {
      fontSize: isMobile ? '1rem' : '1.1rem',
      color: '#7C2A62',
      fontWeight: '600',
      marginBottom: '0.5rem',
    },
    detailText: {
      color: '#555',
      fontSize: isMobile ? '0.9rem' : '1rem',
      lineHeight: '1.5',
      margin: '0',
    },
    modalFooter: {
      display: 'flex',
      gap: '1rem',
      justifyContent: 'flex-end',
      paddingTop: '1.5rem',
      borderTop: '2px solid #f0f0f0',
      flexDirection: isMobile ? 'column' : 'row',
    },
    btnPrimary: {
      padding: isMobile ? '0.7rem 1.5rem' : '0.8rem 2rem',
      backgroundColor: '#7C2A62',
      color: 'white',
      border: 'none',
      borderRadius: '25px',
      cursor: 'pointer',
      fontWeight: '600',
      fontSize: isMobile ? '0.9rem' : '1rem',
      transition: 'all 0.3s ease',
      boxShadow: '0 5px 15px rgba(124, 42, 98, 0.3)',
      position: 'relative',
      overflow: 'hidden',
    },
    btnSecondary: {
      padding: isMobile ? '0.7rem 1.5rem' : '0.8rem 2rem',
      backgroundColor: 'transparent',
      color: '#7C2A62',
      border: '2px solid #7C2A62',
      borderRadius: '25px',
      cursor: 'pointer',
      fontWeight: '600',
      fontSize: isMobile ? '0.9rem' : '1rem',
      transition: 'all 0.3s ease',
      position: 'relative',
      overflow: 'hidden',
    },
    loginMessage: {
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: 'white',
      padding: isMobile ? '1.5rem' : '2rem',
      borderRadius: '15px',
      boxShadow: '0 15px 40px rgba(0, 0, 0, 0.3)',
      zIndex: '2000',
      textAlign: 'center',
      maxWidth: isMobile ? '350px' : '400px',
      width: '90%',
      backdropFilter: 'blur(10px)',
    },
    loginMessageTitle: {
      fontSize: isMobile ? '1.3rem' : '1.5rem',
      color: '#7C2A62',
      fontWeight: '600',
      marginBottom: '1rem',
    },
    loginMessageText: {
      color: '#666',
      marginBottom: '2rem',
      lineHeight: '1.5',
      fontSize: isMobile ? '0.9rem' : '1rem',
    },
    loginMessageButtons: {
      display: 'flex',
      gap: '1rem',
      justifyContent: 'center',
      flexDirection: isMobile ? 'column' : 'row',
    },
    loginMessageOverlay: {
      position: 'fixed',
      top: '0',
      left: '0',
      right: '0',
      bottom: '0',
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      zIndex: '1999',
      backdropFilter: 'blur(5px)',
    },
  };

  const services = [
    {
      
      title: 'Medicine Delivery',
      description: 'Get prescribed medicines delivered to your home within 2 hours',
      features: ['24/7 Delivery', 'Prescription Upload', 'Generic Alternatives', 'Real-time Tracking'],
      details: {
        overview: "Our fast and reliable medicine delivery service ensures you get your prescribed medications without leaving your home. We partner with licensed pharmacies to provide authentic medicines with proper storage and handling.",
        benefits: [
          "Free delivery on orders above $25",
          "Real-time order tracking",
          "Temperature-sensitive packaging",
          "Prescription verification",
          "Insurance claim support"
        ],
        process: [
          "Upload your prescription",
          "Select medicines from verified pharmacies",
          "Choose delivery time slot",
          "Track your order in real-time",
          "Safe and contactless delivery"
        ],
        pricing: "Starting from $2.99 delivery fee. Free for emergency medications.",
        duration: "2-4 hours standard delivery"
      }
    },
    {
      
      title: 'Online Consultation',
      description: 'Video calls with certified doctors and specialists',
      features: ['Instant Booking', 'Multiple Specialties', 'E-Prescriptions', 'Follow-up Care'],
      details: {
        overview: "Connect with board-certified doctors through secure video consultations. Get medical advice, prescriptions, and specialist referrals from the comfort of your home.",
        benefits: [
          "100+ certified doctors",
          "15+ medical specialties",
          "Secure and private sessions",
          "Instant e-prescriptions",
          "Follow-up consultations"
        ],
        process: [
          "Choose your doctor and specialty",
          "Book appointment (instant or scheduled)",
          "Join video call at appointment time",
          "Receive diagnosis and e-prescription",
          "Get specialist referrals if needed"
        ],
        pricing: "Starting from $25 per consultation. Insurance accepted.",
        duration: "15-30 minutes per session"
      }
    },
    {
      
      title: 'Emergency Care',
      description: 'Immediate medical assistance for urgent health issues',
      features: ['24/7 Availability', 'Ambulance Service', 'Emergency Kit', 'GPS Tracking'],
      details: {
        overview: "24/7 emergency medical support with instant response teams. We provide immediate assistance, ambulance services, and emergency medical guidance.",
        benefits: [
          "Instant response within 2 minutes",
          "GPS-enabled ambulance tracking",
          "Emergency medical guidance",
          "Hospital coordination",
          "Family notification system"
        ],
        process: [
          "Call emergency helpline",
          "Describe emergency situation",
          "Receive immediate first-aid guidance",
          "Ambulance dispatched if needed",
          "Hospital admission coordination"
        ],
        pricing: "Emergency consultation: Free. Ambulance: $50-$150 based on distance.",
        duration: "Immediate response, 15-minute ambulance ETA"
      }
    },
    {
      
      title: 'Diagnostic Tests',
      description: 'Home sample collection and lab tests',
      features: ['Home Collection', 'Digital Reports', '100+ Tests', 'Expert Consultation'],
      details: {
        overview: "Comprehensive diagnostic testing with home sample collection. Get accurate results from certified labs with digital reports and doctor consultations.",
        benefits: [
          "200+ test options",
          "Certified phlebotomists",
          "Digital reports in 24 hours",
          "Free doctor consultation on abnormal results",
          "Historical report tracking"
        ],
        process: [
          "Book test online or via app",
          "Sample collection at your home",
          "Sample processing at certified labs",
          "Digital report delivery",
          "Free doctor consultation if needed"
        ],
        pricing: "Starting from $15. Health packages available at discounted rates.",
        duration: "Sample collection: 2 hours, Reports: 6-24 hours"
      }
    },
    {
      
      title: 'Health Checkups',
      description: 'Comprehensive health packages for all ages',
      features: ['Custom Packages', 'Doctor Consultation', 'Diet Plans', 'Annual Tracking'],
      details: {
        overview: "Preventive health checkups designed for different age groups and health conditions. Comprehensive packages with detailed reports and specialist consultations.",
        benefits: [
          "Age-specific packages",
          "Comprehensive health assessment",
          "Specialist doctor consultation",
          "Personalized diet and exercise plans",
          "Annual health tracking"
        ],
        process: [
          "Choose health package",
          "Complete tests and assessments",
          "Comprehensive report generation",
          "Specialist doctor consultation",
          "Receive personalized health plan"
        ],
        pricing: "Packages starting from $99. Family and corporate discounts available.",
        duration: "2-4 hours for complete checkup"
      }
    },
    {
     
      title: 'Wellness Programs',
      description: 'Preventive healthcare and lifestyle management',
      features: ['Yoga Sessions', 'Diet Planning', 'Mental Wellness', 'Progress Tracking'],
      details: {
        overview: "Holistic wellness programs focusing on preventive care, mental health, and lifestyle management. Customized plans for overall well-being.",
        benefits: [
          "Personalized wellness plans",
          "Certified wellness coaches",
          "Mental health support",
          "Nutritionist consultations",
          "Progress tracking"
        ],
        process: [
          "Initial health assessment",
          "Personalized wellness plan creation",
          "Regular coaching sessions",
          "Progress monitoring",
          "Plan adjustments based on results"
        ],
        pricing: "Starting from $49/month. 3-month and annual plans available.",
        duration: "3-12 month programs with weekly sessions"
      }
    }
  ];

  const openModal = (service) => {
    setSelectedService(service);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedService(null);
    document.body.style.overflow = 'auto';
  };

  const handleBookNow = () => {
    setShowLoginMessage(true);
  };

  const handleLoginRedirect = () => {
    setShowLoginMessage(false);
    closeModal();
    if (onNavigateToLogin) {
      onNavigateToLogin();
    }
  };

  const handleCancelLogin = () => {
    setShowLoginMessage(false);
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
    <section style={styles.services}>
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
          Our Services
        </h2>
        <p style={styles.sectionSubtitle}>
          Comprehensive healthcare solutions for all your needs
        </p>
        
        <div style={styles.servicesGrid}>
          {services.map((service, index) => (
            <div
              key={index}
              style={styles.serviceCard}
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
              <div style={styles.serviceIcon}>
                {service.icon}
              </div>
              <h3 style={styles.serviceTitle}>
                {service.title}
              </h3>
              <p style={styles.serviceDescription}>
                {service.description}
              </p>
              
              <ul style={styles.serviceFeatures}>
                {service.features.map((feature, idx) => (
                  <li key={idx} style={styles.serviceFeatureItem}>
                    <span style={styles.featureBullet}>•</span>
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                style={styles.learnMoreButton}
                onClick={() => openModal(service)}
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
                Learn More →
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Service Details Modal */}
      {isModalOpen && selectedService && (
        <div style={styles.modalOverlay} onClick={closeModal}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button 
              style={styles.modalClose}
              onClick={closeModal}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#F7D9EB';
                e.target.style.color = '#7C2A62';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.color = '#666';
              }}
            >
              ×
            </button>
           
            <div style={styles.modalHeader}>
              <div style={styles.modalIcon}>
                {selectedService.icon}
              </div>
              <div>
                <h2 style={styles.modalTitle}>
                  {selectedService.title}
                </h2>
                <p style={styles.modalDescription}>
                  {selectedService.description}
                </p>
              </div>
            </div>

            <div style={styles.modalBody}>
              <div style={styles.modalSection}>
                <h3 style={styles.modalSectionTitle}>Overview</h3>
                <p style={styles.modalText}>{selectedService.details.overview}</p>
              </div>

              <div style={styles.modalSection}>
                <h3 style={styles.modalSectionTitle}>Key Benefits</h3>
                <ul style={styles.modalList}>
                  {selectedService.details.benefits.map((benefit, index) => (
                    <li key={index} style={styles.modalListItem}>
                      <span style={styles.featureBullet}>•</span>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>

              <div style={styles.modalSection}>
                <h3 style={styles.modalSectionTitle}>How It Works</h3>
                <ol style={styles.modalProcess}>
                  {selectedService.details.process.map((step, index) => (
                    <li key={index} style={styles.modalProcessItem}>
                      <span style={styles.processNumber}>
                        {index + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>

              <div style={styles.modalDetailsGrid}>
                <div style={styles.detailItem}>
                  <h4 style={styles.detailTitle}>Pricing</h4>
                  <p style={styles.detailText}>{selectedService.details.pricing}</p>
                </div>
                <div style={styles.detailItem}>
                  <h4 style={styles.detailTitle}>Duration</h4>
                  <p style={styles.detailText}>{selectedService.details.duration}</p>
                </div>
              </div>
            </div>

            <div style={styles.modalFooter}>
              <button 
                style={styles.btnPrimary}
                onClick={handleBookNow}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#9C3A7A';
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 8px 20px rgba(124, 42, 98, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#7C2A62';
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 5px 15px rgba(124, 42, 98, 0.3)';
                }}
              >
                Book Now
              </button>
              <button 
                style={styles.btnSecondary}
                onClick={closeModal}
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
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Login Message Modal */}
      {showLoginMessage && (
        <>
          <div style={styles.loginMessageOverlay} onClick={handleCancelLogin} />
          <div style={styles.loginMessage}>
            <h3 style={styles.loginMessageTitle}>
              Login Required
            </h3>
            <p style={styles.loginMessageText}>
              Please login to book this service and access all our healthcare features.
            </p>
            <div style={styles.loginMessageButtons}>
              <button 
                style={styles.btnPrimary}
                onClick={handleLoginRedirect}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#9C3A7A';
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 8px 20px rgba(124, 42, 98, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#7C2A62';
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 5px 15px rgba(124, 42, 98, 0.3)';
                }}
              >
                Go to Login
              </button>
              <button 
                style={styles.btnSecondary}
                onClick={handleCancelLogin}
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
                Cancel
              </button>
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default Services;