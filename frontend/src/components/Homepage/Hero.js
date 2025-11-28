
import React, { useState, useEffect } from 'react';

const Hero = ({ onSectionChange, onNavigateToAuth }) => {
  const [showEmergencyModal, setShowEmergencyModal] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showServiceDetails, setShowServiceDetails] = useState(null);
  const [showChatbot, setShowChatbot] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [userInput, setUserInput] = useState('');

  useEffect(() => {
    setIsVisible(true);
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // Initialize with welcome message
    setChatMessages([
      {
        id: 1,
        text: "Hello! I'm QuickMed Assistant. How can I help you today? 😊",
        isBot: true,
        timestamp: new Date()
      }
    ]);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Enhanced authentication navigation
  const handleAuthNavigation = () => {
    if (onNavigateToAuth && typeof onNavigateToAuth === 'function') {
      console.log('Navigating to login page...');
      onNavigateToAuth();
    } else {
      console.log('No navigation function provided');
      // Fallback navigation
      alert('Please navigate to the login page to continue.');
    }
  };

  const handleOrderMedicines = () => {
    const confirmLogin = window.confirm(
      'To order medicines, you need to login first.\n\nClick OK to proceed to login page.'
    );
    
    if (confirmLogin) {
      handleAuthNavigation();
    }
  };

  const handleConsultDoctor = () => {
    const confirmLogin = window.confirm(
      'To consult with a doctor, you need to login first.\n\nClick OK to proceed to login page.'
    );
    
    if (confirmLogin) {
      handleAuthNavigation();
    }
  };

  // Service Details Handlers
  const handleMedicineDeliveryClick = () => {
    setShowServiceDetails('medicineDelivery');
  };

  const handleDoctorConsultationClick = () => {
    setShowServiceDetails('doctorConsultation');
  };

  const handleLiveTrackingClick = () => {
    setShowServiceDetails('liveTracking');
  };

  const handleHealthPackagesClick = () => {
    setShowServiceDetails('healthPackages');
  };

  const handleLabTestsClick = () => {
    setShowServiceDetails('labTests');
  };

  const handleMedicalRecordsClick = () => {
    setShowServiceDetails('medicalRecords');
  };

  const closeServiceDetails = () => {
    setShowServiceDetails(null);
  };

  // Emergency contact functionality
  const handleEmergencyContact = () => {
    setShowEmergencyModal(true);
  };

  const handleEmergencyCall = () => {
    window.open('tel:9392416962');
    setShowEmergencyModal(false);
    
    setTimeout(() => {
      alert('Emergency call initiated. If the call doesn\'t connect automatically, please dial 9392416962 manually.');
    }, 500);
  };

  const handleEmergencyMessage = () => {
    const message = 'EMERGENCY: I need immediate medical assistance! Please help.';
    window.open(`https://wa.me/9392416962?text=${encodeURIComponent(message)}`, '_blank');
    setShowEmergencyModal(false);
  };

  const handleEmergencyLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const locationUrl = `https://maps.google.com/?q=${latitude},${longitude}`;
          const message = `EMERGENCY: I need medical help! My location: ${locationUrl}`;
          window.open(`sms:9392416962?body=${encodeURIComponent(message)}`);
        },
        (error) => {
          const message = 'EMERGENCY: I need immediate medical assistance! Please help.';
          window.open(`sms:9392416962?body=${encodeURIComponent(message)}`);
        }
      );
    } else {
      const message = 'EMERGENCY: I need immediate medical assistance! Please help.';
      window.open(`sms:9392416962?body=${encodeURIComponent(message)}`);
    }
    setShowEmergencyModal(false);
  };

  const handleVideoConsultation = () => {
    alert('Connecting you with the nearest available emergency doctor...\n\nPlease ensure you have a stable internet connection for the video call.');
    
    setTimeout(() => {
      const confirmCall = window.confirm('Emergency video consultation is ready. Click OK to start the call.');
      if (confirmCall) {
        window.open('#', '_blank');
      }
    }, 2000);
    
    setShowEmergencyModal(false);
  };

  const closeModal = () => {
    setShowEmergencyModal(false);
  };

  // Chatbot functionality
  const toggleChatbot = () => {
    setShowChatbot(!showChatbot);
  };

  const handleSendMessage = () => {
    if (!userInput.trim()) return;

    // Add user message
    const newUserMessage = {
      id: chatMessages.length + 1,
      text: userInput,
      isBot: false,
      timestamp: new Date()
    };

    setChatMessages(prev => [...prev, newUserMessage]);
    setUserInput('');

    // Simulate bot response
    setTimeout(() => {
      const botResponse = generateBotResponse(userInput);
      const newBotMessage = {
        id: chatMessages.length + 2,
        text: botResponse,
        isBot: true,
        timestamp: new Date()
      };
      setChatMessages(prev => [...prev, newBotMessage]);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const generateBotResponse = (userInput) => {
    const input = userInput.toLowerCase();
    
    if (input.includes('hello') || input.includes('hi') || input.includes('hey')) {
      return "Hello! I'm QuickMed Assistant. I can help you with medicine orders, doctor consultations, emergency services, and more! How can I assist you today? 🏥";
    } else if (input.includes('medicine') || input.includes('delivery')) {
      return "🚀 We offer fast medicine delivery in 30-40 minutes! You can order prescription or OTC medicines. Would you like me to help you place an order or explain how it works?";
    } else if (input.includes('doctor') || input.includes('consult')) {
      return "👨‍⚕️ We have 100+ expert doctors available for online video consultations. You can consult with specialists from various fields. Would you like to book an appointment?";
    } else if (input.includes('emergency') || input.includes('urgent')) {
      return "🚨 For emergency medical assistance, please use our emergency contact feature above or call 9392416962 immediately. Our team is available 24/7 to help!";
    } else if (input.includes('price') || input.includes('cost')) {
      return "💰 We offer competitive pricing with regular discounts! Medicine prices are market-competitive, and doctor consultations start from ₹199. Lab tests and health packages are also very affordable.";
    } else if (input.includes('time') || input.includes('delivery time')) {
      return "⏱️ We guarantee medicine delivery within 30-40 minutes! Doctor consultations can be scheduled immediately or at your preferred time. Lab test results are delivered within 6-24 hours.";
    } else if (input.includes('login') || input.includes('sign up')) {
      return "🔐 To access all features, please login or create an account. You can use the 'Order Medicines Now' or 'Consult Doctor Online' buttons to get started!";
    } else if (input.includes('thank') || input.includes('thanks')) {
      return "You're welcome! 😊 Is there anything else I can help you with regarding our healthcare services?";
    } else {
      return "I understand you're looking for: '" + userInput + "'. I can help you with:\n• Medicine delivery 🚀\n• Doctor consultations 👨‍⚕️\n• Lab tests 🩺\n• Health packages 💊\n• Emergency services 🚨\n• Pricing information 💰\n\nHow can I assist you specifically?";
    }
  };

  const quickReplies = [
    "How to order medicines?",
    "Book doctor appointment",
    "Emergency help",
    "Price information",
    "Delivery time"
  ];

  const handleQuickReply = (reply) => {
    setUserInput(reply);
    setTimeout(() => {
      handleSendMessage();
    }, 100);
  };

  // Service Details Data
  const serviceDetails = {
    medicineDelivery: {
      title: ' Medicine Delivery Service',
      description: 'Get your prescribed and over-the-counter medicines delivered to your doorstep within 30-40 minutes. Our network of 500+ partner pharmacies ensures you get genuine medicines with complete safety and privacy.',
      features: [
        '📦 30-40 Minutes Guaranteed Delivery',
        '💊 Prescription & OTC Medicines',
        '🏪 500+ Partner Pharmacies',
        '🔒 Genuine & Safe Medicines',
        '📱 Real-time Order Tracking',
        '🏠 Free Home Delivery'
      ],
      process: [
        '1. Upload your prescription or select OTC medicines',
        '2. Choose delivery address and time slot',
        '3. Make secure payment online',
        '4. Track your order in real-time',
        '5. Receive medicines at your doorstep'
      ]
    },
    doctorConsultation: {
      title: '🎥 Online Doctor Consultation',
      description: 'Connect with experienced doctors via video call for comprehensive medical consultations. Get expert advice, prescriptions, and follow-up care from the comfort of your home.',
      features: [
        '👨‍⚕️ 100+ Expert Doctors',
        '🎥 HD Video Consultations',
        '⏰ 24/7 Availability',
        '💊 Digital Prescriptions',
        '📄 Medical Record Storage',
        '🔒 Complete Privacy'
      ],
      process: [
        '1. Choose your preferred doctor & specialty',
        '2. Book convenient time slot',
        '3. Connect via secure video call',
        '4. Get diagnosis & prescription',
        '5. Follow-up consultations available'
      ]
    },
    liveTracking: {
      title: ' Live Order Tracking',
      description: 'Track your medical orders in real-time from dispatch to delivery. Get live updates, delivery executive details, and estimated arrival time for complete peace of mind.',
      features: [
        '📍 Real-time GPS Tracking',
        '👨‍💼 Delivery Executive Details',
        '⏱️ Live ETA Updates',
        '📲 Push Notifications',
        '🗺️ Route Optimization',
        '📞 Direct Communication'
      ],
      process: [
        '1. Order confirmed & dispatched',
        '2. Track live location on map',
        '3. Get real-time ETA updates',
        '4. Receive delivery notifications',
        '5. Safe & contactless delivery'
      ]
    },
    healthPackages: {
      title: 'Comprehensive Health Packages',
      description: 'Choose from our curated health checkup packages designed for different age groups and health conditions. Early detection and preventive care for a healthier life.',
      features: [
        '🩺 Basic Health Checkup',
        '❤️ Cardiac Care Package',
        '🩸 Diabetes Screening',
        '👶 Pediatric Health Package',
        '👵 Senior Citizen Package',
        '🏃‍♂️ Executive Health Check'
      ],
      process: [
        '1. Select suitable health package',
        '2. Book appointment at nearest lab',
        '3. Complete tests with expert care',
        '4. Receive detailed reports online',
        '5. Free doctor consultation included'
      ]
    },
    labTests: {
      title: ' At-Home Lab Tests',
      description: 'Get diagnostic tests done at your home by certified professionals. Accurate results, convenient scheduling, and expert interpretation.',
      features: [
        '🏠 Home Sample Collection',
        '🔬 1000+ Tests Available',
        '👨‍🔬 Certified Technicians',
        '📊 Digital Reports',
        '👨‍⚕️ Free Doctor Consultation',
        '💰 Affordable Pricing'
      ],
      process: [
        '1. Book test & select time slot',
        '2. Technician visits your home',
        '3. Sample collection with safety protocols',
        '4. Get reports within 6-24 hours',
        '5. Free doctor consultation on report'
      ]
    },
    medicalRecords: {
      title: ' Digital Medical Records',
      description: 'Store and access all your medical records securely in one place. Share with doctors easily and maintain your complete health history.',
      features: [
        '🔐 Secure Cloud Storage',
        '📄 Prescription Management',
        '🩺 Lab Report Archives',
        '💊 Medicine History',
        '👨‍⚕️ Doctor Access Sharing',
        '📱 Anytime Access'
      ],
      process: [
        '1. Upload medical documents',
        '2. Organize by date & category',
        '3. Share with doctors securely',
        '4. Access from any device',
        '5. Set reminders for follow-ups'
      ]
    }
  };

  const stats = [
    { number: '50,000+', label: 'Happy Customers' },
    { number: '30-40 min', label: 'Avg Delivery Time' },
    { number: '500+', label: 'Partner Pharmacies' },
    { number: '100+', label: 'Expert Doctors' },
    { number: '50+', label: 'Cities Covered' },
    { number: '24/7', label: 'Customer Support' }
  ];

  const services = [
    {
      name: 'Medicine Delivery',
      description: 'Prescription and OTC medicines delivered to your doorstep within 30-40 minutes',
      onClick: handleMedicineDeliveryClick
    },
    {
      name: 'Doctor Consultation',
      description: 'Video consultations with specialist doctors for comprehensive medical advice',
      onClick: handleDoctorConsultationClick
    },
    {
      name: 'Live Tracking',
      description: 'Track your medical orders in real-time from dispatch to delivery',
      onClick: handleLiveTrackingClick
    },
    {
      name: 'Health Packages',
      description: 'Comprehensive health checkup packages for preventive care',
      onClick: handleHealthPackagesClick
    },
    {
      name: 'Lab Tests at Home',
      description: 'Get diagnostic tests done at home by certified professionals',
      onClick: handleLabTestsClick
    },
    {
      name: 'Medical Records',
      description: 'Digital storage and management of all your medical documents',
      onClick: handleMedicalRecordsClick
    }
  ];

  const features = [
    {
      title: 'Lightning Fast Delivery',
      description: 'Get medicines delivered in 30-40 minutes with our optimized delivery network'
    },
    {
      title: '100% Safe & Genuine',
      description: 'All medicines are sourced directly from licensed pharmacies with proper verification'
    },
    {
      title: 'Best Prices',
      description: 'Competitive pricing with regular discounts and offers on medicines and consultations'
    },
    {
      title: 'Expert Doctors',
      description: 'Consult with experienced doctors from top hospitals across various specialties'
    }
  ];

  const testimonials = [
    {
      name: 'Rahul Sharma',
      location: 'Mumbai',
      text: 'QuickMed saved me during an emergency. Medicines were delivered in just 25 minutes! The service is truly life-saving.',
      rating: '⭐️⭐️⭐️⭐️⭐️'
    },
    {
      name: 'Priya Patel',
      location: 'Delhi',
      text: 'The doctor consultation feature is amazing. I could connect with a specialist from home and get proper treatment.',
      rating: '⭐️⭐️⭐️⭐️⭐️'
    },
    {
      name: 'Arun Kumar',
      location: 'Bangalore',
      text: 'Best healthcare app I have used. The live tracking feature kept me informed about my medicine delivery every step.',
      rating: '⭐️⭐️⭐️⭐️⭐️'
    }
  ];

  const emergencyOptions = [
    {
      title: '📞 Emergency Call',
      description: 'Direct voice call with emergency medical response team',
      action: handleEmergencyCall
    },
    {
      title: '💬 WhatsApp Message',
      description: 'Send immediate message with your location and details',
      action: handleEmergencyMessage
    },
  ];

  // Responsive Styles
  const styles = {
    // Hero Section
    hero: {
      minHeight: isMobile ? 'auto' : '100vh',
      background: 'linear-gradient(135deg, #F7D9EB 0%, #ffffff 50%, #F7D9EB 100%)',
      position: 'relative',
      overflow: 'hidden',
      padding: isMobile ? '2rem 1rem' : '2rem 1rem',
    },
    heroContent: {
      maxWidth: '1200px',
      margin: '0 auto',
      position: 'relative',
      zIndex: 2,
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
    mainHero: {
      textAlign: 'center',
      padding: isMobile ? '2rem 1rem 1rem' : '4rem 1rem 2rem',
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
      transition: 'all 0.8s ease-out',
    },
    heroTitle: {
      fontSize: isMobile ? '2.5rem' : 'clamp(2.5rem, 5vw, 4.5rem)',
      marginBottom: isMobile ? '0.8rem' : '1.5rem',
      background: 'linear-gradient(45deg, #7C2A62, #9C3A7A, #D32F2F)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      fontWeight: '800',
      lineHeight: '1.1',
      letterSpacing: '-0.02em',
    },
    heroSubtitle: {
      fontSize: isMobile ? '1.4rem' : 'clamp(1.5rem, 3vw, 2.2rem)',
      marginBottom: isMobile ? '1rem' : '2rem',
      color: '#333',
      fontWeight: '400',
      opacity: 0.9,
    },
    heroText: {
      fontSize: isMobile ? '1.1rem' : 'clamp(1.1rem, 2vw, 1.3rem)',
      lineHeight: '1.6',
      marginBottom: isMobile ? '2rem' : '3rem',
      color: '#666',
      maxWidth: '800px',
      marginLeft: 'auto',
      marginRight: 'auto',
      fontWeight: '300',
    },
    ctaButtons: {
      display: 'flex',
      gap: isMobile ? '1rem' : '1.5rem',
      justifyContent: 'center',
      flexWrap: 'wrap',
      marginBottom: isMobile ? '3rem' : '4rem',
      flexDirection: isMobile ? 'column' : 'row',
      alignItems: 'center',
    },
    primaryButton: {
      padding: isMobile ? '1rem 2rem' : '1.2rem 2.5rem',
      backgroundColor: '#7C2A62',
      color: 'white',
      border: 'none',
      borderRadius: '50px',
      cursor: 'pointer',
      fontSize: isMobile ? '1.1rem' : '1.1rem',
      fontWeight: 'bold',
      transition: 'all 0.3s ease',
      boxShadow: '0 8px 25px rgba(124, 42, 98, 0.4)',
      position: 'relative',
      overflow: 'hidden',
      width: isMobile ? '100%' : 'auto',
      maxWidth: isMobile ? '300px' : 'none',
    },
    secondaryButton: {
      padding: isMobile ? '1rem 2rem' : '1.2rem 2.5rem',
      backgroundColor: 'transparent',
      color: '#7C2A62',
      border: '3px solid #7C2A62',
      borderRadius: '50px',
      cursor: 'pointer',
      fontSize: isMobile ? '1.1rem' : '1.1rem',
      fontWeight: 'bold',
      transition: 'all 0.3s ease',
      boxShadow: '0 5px 15px rgba(124, 42, 98, 0.2)',
      position: 'relative',
      overflow: 'hidden',
      width: isMobile ? '100%' : 'auto',
      maxWidth: isMobile ? '300px' : 'none',
    },
    statsSection: {
      display: 'grid',
      gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
      gap: isMobile ? '1rem' : '2rem',
      marginBottom: isMobile ? '3rem' : '5rem',
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
      transition: 'all 0.8s ease-out 0.2s',
    },
    statItem: {
      textAlign: 'center',
      padding: isMobile ? '1rem' : '2rem 1.5rem',
      background: 'rgba(255, 255, 255, 0.7)',
      borderRadius: '20px',
      backdropFilter: 'blur(10px)',
      boxShadow: '0 8px 32px rgba(124, 42, 98, 0.1)',
      border: '1px solid rgba(255, 255, 255, 0.3)',
      transition: 'all 0.3s ease',
    },
    statNumber: {
      fontSize: isMobile ? '1.8rem' : '2.5rem',
      fontWeight: 'bold',
      background: 'linear-gradient(45deg, #7C2A62, #D32F2F)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      marginBottom: '0.5rem',
    },
    statLabel: {
      color: '#666',
      fontSize: isMobile ? '0.9rem' : '1rem',
      fontWeight: '500',
    },
    servicesSection: {
      marginBottom: isMobile ? '3rem' : '4rem',
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
      transition: 'all 0.8s ease-out 0.4s',
    },
    sectionTitle: {
      fontSize: isMobile ? '1.8rem' : 'clamp(2rem, 4vw, 3rem)',
      textAlign: 'center',
      marginBottom: isMobile ? '2rem' : '3rem',
      color: '#7C2A62',
      fontWeight: '700',
    },
    servicesGrid: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: isMobile ? '1.5rem' : '2rem',
      marginBottom: isMobile ? '2rem' : '3rem',
    },
    serviceCard: {
      padding: isMobile ? '1.5rem 1rem' : '2.5rem 2rem',
      background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(247,217,235,0.3) 100%)',
      borderRadius: '25px',
      boxShadow: '0 10px 40px rgba(124, 42, 98, 0.1)',
      transition: 'all 0.4s ease',
      border: '1px solid rgba(255, 255, 255, 0.5)',
      textAlign: 'center',
      backdropFilter: 'blur(10px)',
      position: 'relative',
      overflow: 'hidden',
      cursor: 'pointer',
    },
    serviceIcon: {
      fontSize: isMobile ? '3rem' : '3.5rem',
      marginBottom: isMobile ? '1rem' : '1.5rem',
      background: 'linear-gradient(45deg, #7C2A62, #D32F2F)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
    serviceName: {
      fontSize: isMobile ? '1.2rem' : '1.4rem',
      marginBottom: isMobile ? '0.8rem' : '1rem',
      color: '#333',
      fontWeight: '600',
    },
    serviceDescription: {
      color: '#666',
      lineHeight: '1.6',
      fontSize: isMobile ? '0.9rem' : '1rem',
    },
    featuresSection: {
      marginBottom: isMobile ? '3rem' : '4rem',
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
      transition: 'all 0.8s ease-out 0.6s',
    },
    featuresGrid: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: isMobile ? '1.5rem' : '2rem',
    },
    featureCard: {
      padding: isMobile ? '1.5rem' : '2rem',
      background: 'white',
      borderRadius: '20px',
      boxShadow: '0 8px 32px rgba(124, 42, 98, 0.1)',
      textAlign: 'center',
      transition: 'all 0.3s ease',
      border: '1px solid rgba(124, 42, 98, 0.1)',
    },
    featureIcon: {
      fontSize: isMobile ? '2.5rem' : '3rem',
      marginBottom: '1rem',
      background: 'linear-gradient(45deg, #7C2A62, #D32F2F)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
    featureTitle: {
      fontSize: isMobile ? '1.2rem' : '1.3rem',
      marginBottom: '0.8rem',
      color: '#333',
      fontWeight: '600',
    },
    featureDescription: {
      color: '#666',
      lineHeight: '1.6',
      fontSize: isMobile ? '0.9rem' : '1rem',
    },
    testimonialsSection: {
      marginBottom: isMobile ? '3rem' : '4rem',
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
      transition: 'all 0.8s ease-out 0.8s',
    },
    testimonialsGrid: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: isMobile ? '1.5rem' : '2rem',
    },
    testimonialCard: {
      padding: isMobile ? '1.5rem' : '2rem',
      background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(247,217,235,0.2) 100%)',
      borderRadius: '20px',
      boxShadow: '0 8px 32px rgba(124, 42, 98, 0.1)',
      border: '1px solid rgba(255, 255, 255, 0.5)',
    },
    testimonialText: {
      fontSize: isMobile ? '1rem' : '1.1rem',
      lineHeight: '1.6',
      color: '#666',
      marginBottom: '1rem',
      fontStyle: 'italic',
    },
    testimonialAuthor: {
      fontWeight: 'bold',
      color: '#7C2A62',
      fontSize: isMobile ? '0.9rem' : '1rem',
    },
    testimonialLocation: {
      color: '#999',
      fontSize: isMobile ? '0.8rem' : '0.9rem',
    },
    testimonialRating: {
      marginTop: '0.5rem',
      fontSize: isMobile ? '0.8rem' : '0.9rem',
    },
    emergencySection: {
      marginTop: isMobile ? '2rem' : '3rem',
      padding: isMobile ? '1.5rem' : '3rem 2rem',
      background: 'linear-gradient(135deg, rgba(255,107,107,0.1) 0%, rgba(255,255,255,0.8) 100%)',
      borderRadius: '25px',
      border: '2px solid rgba(255,107,107,0.3)',
      textAlign: 'center',
      backdropFilter: 'blur(10px)',
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
      transition: 'all 0.8s ease-out 1s',
    },
    emergencyTitle: {
      fontSize: isMobile ? '1.5rem' : '1.8rem',
      marginBottom: '1rem',
      color: '#D32F2F',
      fontWeight: '600',
    },
    emergencyText: {
      color: '#666',
      marginBottom: isMobile ? '1.5rem' : '2rem',
      fontSize: isMobile ? '1rem' : '1.1rem',
      maxWidth: '600px',
      marginLeft: 'auto',
      marginRight: 'auto',
      lineHeight: '1.6',
    },
    emergencyButton: {
      padding: isMobile ? '1rem 2rem' : '1.2rem 2.5rem',
      backgroundColor: '#FF6B6B',
      color: 'white',
      border: 'none',
      borderRadius: '50px',
      cursor: 'pointer',
      fontSize: isMobile ? '1rem' : '1.1rem',
      fontWeight: 'bold',
      transition: 'all 0.3s ease',
      boxShadow: '0 8px 25px rgba(255, 107, 107, 0.4)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.8rem',
      margin: '0 auto',
      position: 'relative',
      overflow: 'hidden',
      width: isMobile ? '100%' : 'auto',
      maxWidth: isMobile ? '300px' : 'none',
    },

    // Chatbot Styles
    chatbotContainer: {
      position: 'fixed',
      bottom: isMobile ? '1rem' : '2rem',
      right: isMobile ? '1rem' : '2rem',
      zIndex: 1000,
    },
    chatbotButton: {
      width: isMobile ? '60px' : '70px',
      height: isMobile ? '60px' : '70px',
      borderRadius: '50%',
      backgroundColor: '#7C2A62',
      border: 'none',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 8px 25px rgba(124, 42, 98, 0.4)',
      transition: 'all 0.3s ease',
      fontSize: isMobile ? '1.5rem' : '1.8rem',
    },
    chatbotWindow: {
      position: 'absolute',
      bottom: isMobile ? '70px' : '80px',
      right: 0,
      width: isMobile ? 'calc(100vw - 2rem)' : '350px',
      height: isMobile ? '500px' : '500px',
      backgroundColor: 'white',
      borderRadius: '20px',
      boxShadow: '0 15px 50px rgba(0, 0, 0, 0.2)',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      border: '2px solid #F7D9EB',
    },
    chatbotHeader: {
      backgroundColor: '#7C2A62',
      color: 'white',
      padding: isMobile ? '1rem' : '1.2rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    chatbotTitle: {
      fontSize: isMobile ? '1rem' : '1.1rem',
      fontWeight: 'bold',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
    },
    closeButton: {
      background: 'none',
      border: 'none',
      color: 'white',
      fontSize: '1.2rem',
      cursor: 'pointer',
      padding: '0.2rem',
    },
    chatMessages: {
      flex: 1,
      padding: isMobile ? '1rem' : '1.2rem',
      overflowY: 'auto',
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
      backgroundColor: '#f8f9fa',
    },
    message: {
      maxWidth: '80%',
      padding: isMobile ? '0.8rem' : '1rem',
      borderRadius: '18px',
      fontSize: isMobile ? '0.9rem' : '0.95rem',
      lineHeight: '1.4',
      wordWrap: 'break-word',
    },
    botMessage: {
      alignSelf: 'flex-start',
      backgroundColor: 'white',
      border: '1px solid #E9ECEF',
      color: '#333',
      borderBottomLeftRadius: '5px',
    },
    userMessage: {
      alignSelf: 'flex-end',
      backgroundColor: '#7C2A62',
      color: 'white',
      borderBottomRightRadius: '5px',
    },
    quickReplies: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '0.5rem',
      padding: isMobile ? '0.5rem' : '1rem',
      backgroundColor: 'white',
      borderTop: '1px solid #E9ECEF',
    },
    quickReply: {
      padding: isMobile ? '0.4rem 0.8rem' : '0.5rem 1rem',
      backgroundColor: '#F7D9EB',
      border: 'none',
      borderRadius: '15px',
      fontSize: isMobile ? '0.7rem' : '0.8rem',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      color: '#7C2A62',
      fontWeight: '500',
    },
    chatInputContainer: {
      display: 'flex',
      padding: isMobile ? '0.8rem' : '1rem',
      backgroundColor: 'white',
      borderTop: '1px solid #E9ECEF',
      gap: '0.5rem',
    },
    chatInput: {
      flex: 1,
      padding: isMobile ? '0.8rem' : '1rem',
      border: '1px solid #E9ECEF',
      borderRadius: '25px',
      fontSize: isMobile ? '0.9rem' : '1rem',
      outline: 'none',
    },
    sendButton: {
      padding: isMobile ? '0.8rem' : '1rem',
      backgroundColor: '#7C2A62',
      color: 'white',
      border: 'none',
      borderRadius: '50%',
      cursor: 'pointer',
      width: isMobile ? '45px' : '50px',
      height: isMobile ? '45px' : '50px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: isMobile ? '1rem' : '1.2rem',
    },

    // Service Details Modal Styles
    serviceDetailsModal: {
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
      padding: isMobile ? '0.5rem' : '1rem',
      backdropFilter: 'blur(5px)',
    },
    serviceDetailsContent: {
      backgroundColor: 'white',
      padding: isMobile ? '1.5rem' : '2.5rem',
      borderRadius: '20px',
      maxWidth: isMobile ? '95%' : '800px',
      width: '100%',
      maxHeight: isMobile ? '90vh' : '80vh',
      overflowY: 'auto',
      boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3)',
    },
    serviceDetailsTitle: {
      fontSize: isMobile ? '1.5rem' : '2rem',
      color: '#7C2A62',
      marginBottom: '1rem',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    serviceDetailsDescription: {
      fontSize: isMobile ? '1rem' : '1.1rem',
      color: '#666',
      lineHeight: '1.6',
      marginBottom: '2rem',
      textAlign: 'center',
    },
    featuresGrid: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '1rem',
      marginBottom: '2rem',
    },
    featureItem: {
      padding: '1rem',
      backgroundColor: '#F7D9EB',
      borderRadius: '10px',
      textAlign: 'center',
      fontSize: isMobile ? '0.9rem' : '1rem',
      fontWeight: '500',
    },
    processList: {
      backgroundColor: '#f8f9fa',
      padding: '1.5rem',
      borderRadius: '10px',
      marginBottom: '2rem',
    },
    processItem: {
      marginBottom: '0.5rem',
      fontSize: isMobile ? '0.9rem' : '1rem',
      color: '#666',
      lineHeight: '1.5',
    },

    // Emergency Modal
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
      padding: isMobile ? '0.5rem' : '1rem',
      backdropFilter: 'blur(5px)',
    },
    modalContent: {
      backgroundColor: 'white',
      padding: isMobile ? '1.5rem' : '2.5rem',
      borderRadius: '20px',
      maxWidth: isMobile ? '95%' : '500px',
      width: '100%',
      boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3)',
    },
    modalTitle: {
      fontSize: isMobile ? '1.5rem' : '2rem',
      color: '#D32F2F',
      marginBottom: '1rem',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    modalSubtitle: {
      fontSize: isMobile ? '1rem' : '1.1rem',
      color: '#666',
      marginBottom: isMobile ? '2rem' : '2.5rem',
      lineHeight: '1.5',
      textAlign: 'center',
    },
    emergencyOptions: {
      display: 'flex',
      flexDirection: 'column',
      gap: isMobile ? '0.8rem' : '1.2rem',
      marginBottom: isMobile ? '2rem' : '2.5rem',
    },
    emergencyOption: {
      padding: isMobile ? '1rem' : '1.5rem',
      background: 'linear-gradient(135deg, #FFF5F5 0%, #FFE5E5 100%)',
      border: '2px solid #FF6B6B',
      borderRadius: '15px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      textAlign: 'left',
      position: 'relative',
      overflow: 'hidden',
    },
    emergencyOptionTitle: {
      fontSize: isMobile ? '1rem' : '1.2rem',
      fontWeight: 'bold',
      color: '#D32F2F',
      marginBottom: '0.5rem',
    },
    emergencyOptionDesc: {
      fontSize: isMobile ? '0.8rem' : '0.95rem',
      color: '#666',
      lineHeight: '1.4',
    },
    modalButtons: {
      display: 'flex',
      gap: '1rem',
      justifyContent: 'center',
      flexDirection: isMobile ? 'column' : 'row',
    },
    cancelButton: {
      padding: isMobile ? '0.8rem 2rem' : '1rem 2.5rem',
      backgroundColor: '#666',
      color: 'white',
      border: 'none',
      borderRadius: '25px',
      cursor: 'pointer',
      fontSize: isMobile ? '0.9rem' : '1rem',
      fontWeight: 'bold',
      transition: 'all 0.3s ease',
      width: isMobile ? '100%' : 'auto',
    },
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
    <>
      <section style={styles.hero}>
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

        <div style={styles.heroContent}>
          {/* Main Hero Section */}
          <div style={styles.mainHero}>
            <h1 style={styles.heroTitle}>
              Your Health is Our Priority
            </h1>
            <h2 style={styles.heroSubtitle}>
              Medicine Delivery in 30-40 Minutes Guaranteed
            </h2>
            <p style={styles.heroText}>
              QuickMed revolutionizes healthcare delivery by bringing pharmacy to your doorstep. 
              Experience lightning-fast medicine delivery, expert doctor consultations, and comprehensive 
              healthcare services - all accessible through our user-friendly platform.
            </p>
            
            {/* Call to Action Buttons */}
            <div style={styles.ctaButtons}>
              <button 
                style={styles.primaryButton}
                onClick={handleOrderMedicines}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#5a1a4a';
                  e.target.style.transform = 'translateY(-5px) scale(1.05)';
                  e.target.style.boxShadow = '0 15px 35px rgba(124, 42, 98, 0.5)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#7C2A62';
                  e.target.style.transform = 'translateY(0) scale(1)';
                  e.target.style.boxShadow = '0 8px 25px rgba(124, 42, 98, 0.4)';
                }}
              >
                🚀 Order Medicines Now
              </button>
              <button 
                style={styles.secondaryButton}
                onClick={handleConsultDoctor}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#7C2A62';
                  e.target.style.color = 'white';
                  e.target.style.transform = 'translateY(-5px) scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.color = '#7C2A62';
                  e.target.style.transform = 'translateY(0) scale(1)';
                }}
              >
                👨‍⚕️ Consult Doctor Online
              </button>
            </div>
          </div>

          {/* Statistics */}
          <div style={styles.statsSection}>
            {stats.map((stat, index) => (
              <div 
                key={index} 
                style={styles.statItem}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-10px)';
                  e.currentTarget.style.boxShadow = '0 15px 40px rgba(124, 42, 98, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 8px 32px rgba(124, 42, 98, 0.1)';
                }}
              >
                <div style={styles.statNumber}>{stat.number}</div>
                <div style={styles.statLabel}>{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Services Section */}
          <div style={styles.servicesSection}>
            <h2 style={styles.sectionTitle}>Our Healthcare Services</h2>
            <div style={styles.servicesGrid}>
              {services.map((service, index) => (
                <div
                  key={index}
                  style={styles.serviceCard}
                  onClick={service.onClick}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)';
                    e.currentTarget.style.boxShadow = '0 20px 50px rgba(124, 42, 98, 0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    e.currentTarget.style.boxShadow = '0 10px 40px rgba(124, 42, 98, 0.1)';
                  }}
                >
                  <div style={styles.serviceIcon}>{service.icon}</div>
                  <h3 style={styles.serviceName}>{service.name}</h3>
                  <p style={styles.serviceDescription}>{service.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Features Section */}
          <div style={styles.featuresSection}>
            <h2 style={styles.sectionTitle}>Why Choose QuickMed?</h2>
            <div style={styles.featuresGrid}>
              {features.map((feature, index) => (
                <div
                  key={index}
                  style={styles.featureCard}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-5px)';
                    e.currentTarget.style.boxShadow = '0 15px 40px rgba(124, 42, 98, 0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 8px 32px rgba(124, 42, 98, 0.1)';
                  }}
                >
                  <div style={styles.featureIcon}>{feature.icon}</div>
                  <h3 style={styles.featureTitle}>{feature.title}</h3>
                  <p style={styles.featureDescription}>{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Testimonials Section */}
          <div style={styles.testimonialsSection}>
            <h2 style={styles.sectionTitle}>What Our Customers Say</h2>
            <div style={styles.testimonialsGrid}>
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  style={styles.testimonialCard}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-5px)';
                    e.currentTarget.style.boxShadow = '0 15px 40px rgba(124, 42, 98, 0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 8px 32px rgba(124, 42, 98, 0.1)';
                  }}
                >
                  <p style={styles.testimonialText}>"{testimonial.text}"</p>
                  <div style={styles.testimonialRating}>{testimonial.rating}</div>
                  <div style={styles.testimonialAuthor}>{testimonial.name}</div>
                  <div style={styles.testimonialLocation}>{testimonial.location}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Emergency Section */}
          <div style={styles.emergencySection}>
            <h3 style={styles.emergencyTitle}>🚨 Emergency Medical Assistance</h3>
            <p style={styles.emergencyText}>
              Need immediate medical help? Our emergency response team is available 24/7 to provide 
              urgent care and connect you with nearby medical facilities.
            </p>
            <button 
              style={styles.emergencyButton}
              onClick={handleEmergencyContact}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#D32F2F';
                e.target.style.transform = 'scale(1.05)';
                e.target.style.boxShadow = '0 12px 30px rgba(211, 47, 47, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#FF6B6B';
                e.target.style.transform = 'scale(1)';
                e.target.style.boxShadow = '0 8px 25px rgba(255, 107, 107, 0.4)';
              }}
            >
              🚑 Emergency Contact: 9392416962
            </button>
          </div>
        </div>
      </section>

      {/* Chatbot */}
      <div style={styles.chatbotContainer}>
        {showChatbot && (
          <div style={styles.chatbotWindow}>
            <div style={styles.chatbotHeader}>
              <div style={styles.chatbotTitle}>
                💬 QuickMed Assistant
              </div>
              <button 
                style={styles.closeButton}
                onClick={toggleChatbot}
              >
                ✕
              </button>
            </div>
            
            <div style={styles.chatMessages}>
              {chatMessages.map((message) => (
                <div
                  key={message.id}
                  style={{
                    ...styles.message,
                    ...(message.isBot ? styles.botMessage : styles.userMessage),
                  }}
                >
                  {message.text}
                </div>
              ))}
            </div>

            <div style={styles.quickReplies}>
              {quickReplies.map((reply, index) => (
                <button
                  key={index}
                  style={styles.quickReply}
                  onClick={() => handleQuickReply(reply)}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#7C2A62';
                    e.target.style.color = 'white';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = '#F7D9EB';
                    e.target.style.color = '#7C2A62';
                  }}
                >
                  {reply}
                </button>
              ))}
            </div>

            <div style={styles.chatInputContainer}>
              <input
                type="text"
                style={styles.chatInput}
                placeholder="Type your message..."
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <button 
                style={styles.sendButton}
                onClick={handleSendMessage}
              >
                ➤
              </button>
            </div>
          </div>
        )}
        
        <button 
          style={styles.chatbotButton}
          onClick={toggleChatbot}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#5a1a4a';
            e.target.style.transform = 'scale(1.1)';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = '#7C2A62';
            e.target.style.transform = 'scale(1)';
          }}
        >
          {showChatbot ? '✕' : '💬'}
        </button>
      </div>

      {/* Service Details Modal */}
      {showServiceDetails && (
        <div style={styles.serviceDetailsModal} onClick={closeServiceDetails}>
          <div style={styles.serviceDetailsContent} onClick={(e) => e.stopPropagation()}>
            <h2 style={styles.serviceDetailsTitle}>
              {serviceDetails[showServiceDetails].title}
            </h2>
            <p style={styles.serviceDetailsDescription}>
              {serviceDetails[showServiceDetails].description}
            </p>

            <h3 style={{color: '#7C2A62', marginBottom: '1rem', fontSize: '1.2rem'}}>Key Features:</h3>
            <div style={styles.featuresGrid}>
              {serviceDetails[showServiceDetails].features.map((feature, index) => (
                <div key={index} style={styles.featureItem}>
                  {feature}
                </div>
              ))}
            </div>

            <h3 style={{color: '#7C2A62', marginBottom: '1rem', fontSize: '1.2rem'}}>How It Works:</h3>
            <div style={styles.processList}>
              {serviceDetails[showServiceDetails].process.map((step, index) => (
                <div key={index} style={styles.processItem}>
                  {step}
                </div>
              ))}
            </div>

            <div style={styles.modalButtons}>
              <button 
                style={styles.cancelButton}
                onClick={closeServiceDetails}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Emergency Contact Modal */}
      {showEmergencyModal && (
        <div style={styles.modalOverlay} onClick={closeModal}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <h2 style={styles.modalTitle}>🚨 Emergency Assistance</h2>
            <p style={styles.modalSubtitle}>
              Choose how you'd like to contact our emergency medical response team:
            </p>
            
            <div style={styles.emergencyOptions}>
              {emergencyOptions.map((option, index) => (
                <div
                  key={index}
                  style={styles.emergencyOption}
                  onClick={option.action}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#FFD5D5';
                    e.currentTarget.style.transform = 'translateX(8px) scale(1.02)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#FFF5F5';
                    e.currentTarget.style.transform = 'translateX(0) scale(1)';
                  }}
                >
                  <div style={styles.emergencyOptionTitle}>{option.title}</div>
                  <div style={styles.emergencyOptionDesc}>{option.description}</div>
                </div>
              ))}
            </div>

            <div style={styles.modalButtons}>
              <button 
                style={styles.cancelButton}
                onClick={closeModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Hero;