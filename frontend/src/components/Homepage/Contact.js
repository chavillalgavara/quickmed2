// import React, { useState, useEffect } from 'react';

// const Contact = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     service: '',
//     message: ''
//   });
//   const [errors, setErrors] = useState({});
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [isMobile, setIsMobile] = useState(false);
//   const [isTablet, setIsTablet] = useState(false);
//   const [isVisible, setIsVisible] = useState(false);
//   const [emailStatus, setEmailStatus] = useState('');
//   const [phoneStatus, setPhoneStatus] = useState('');
//   const [currentAnimation, setCurrentAnimation] = useState(0);

//   useEffect(() => {
//     const checkScreenSize = () => {
//       const width = window.innerWidth;
//       setIsMobile(width <= 768);
//       setIsTablet(width <= 1024 && width > 768);
//     };

//     checkScreenSize();
//     window.addEventListener('resize', checkScreenSize);

//     // Add fade-in animation
//     setIsVisible(true);

//     // Animation rotation
//     const interval = setInterval(() => {
//       setCurrentAnimation(prev => (prev + 1) % 3);
//     }, 4000);

//     return () => {
//       window.removeEventListener('resize', checkScreenSize);
//       clearInterval(interval);
//     };
//   }, []);

//   // Stats data
//   const stats = [
//     { number: '50,000+', label: 'Happy Customers' },
//     { number: '30-40 min', label: 'Avg Delivery Time' },
//     { number: '500+', label: 'Partner Pharmacies' },
//     { number: '100+', label: 'Expert Doctors' }
//   ];

//   // Medical animations data
//   const medicalAnimations = [
//     {
//       title: "Medicine Delivery",
//       description: "Get your prescribed medicines delivered to your doorstep within 30-40 minutes with real-time tracking",
//       image: "🚚",
//       features: ["Real-time Tracking", "24/7 Service", "Prescription Upload", "Live Updates"]
//     },
//     {
//       title: "Doctor Consultation",
//       description: "Connect with certified doctors via video call for instant medical advice and e-prescriptions",
//       image: "👨‍⚕️",
//       features: ["Instant Booking", "Multiple Specialties", "E-Prescriptions", "Follow-up Care"]
//     },
//     {
//       title: "Emergency Care",
//       description: "24/7 emergency medical assistance with rapid response teams and GPS-enabled ambulances",
//       image: "🏥",
//       features: ["Immediate Response", "Ambulance Service", "GPS Tracking", "Hospital Coordination"]
//     }
//   ];

//   // Validation functions
//   const validateName = (name) => {
//     const nameRegex = /^[A-Za-z\s]+$/;
//     return nameRegex.test(name.trim());
//   };

//   const validateEmail = (email) => {
//     const emailRegex = /^\S+@\S+\.\S+$/;
//     return emailRegex.test(email.trim());
//   };

//   const validatePhone = (phone) => {
//     const phoneRegex = /^[6-9]\d{9}$/;
//     return phoneRegex.test(phone.replace('+91', '').trim());
//   };

//   const styles = {
//     // Main Contact Section with Bubble Background
//     contact: {
//       minHeight: '100vh',
//       background: 'linear-gradient(135deg, #F7D9EB 0%, #ffffff 50%, #F7D9EB 100%)',
//       position: 'relative',
//       overflow: 'hidden',
//       padding: isMobile ? '4rem 1rem' : isTablet ? '5rem 2rem' : '6rem 2rem',
//     },
//     floatingElements: {
//       position: 'absolute',
//       top: 0,
//       left: 0,
//       width: '100%',
//       height: '100%',
//       pointerEvents: 'none',
//       zIndex: 1,
//     },
//     floatingElement: {
//       position: 'absolute',
//       background: 'rgba(124, 42, 98, 0.1)',
//       borderRadius: '50%',
//       animation: 'float 6s ease-in-out infinite',
//     },
//     container: {
//       maxWidth: '1200px',
//       margin: '0 auto',
//       position: 'relative',
//       zIndex: 2,
//     },
//     sectionHeader: {
//       textAlign: 'center',
//       marginBottom: isMobile ? '3rem' : '4rem',
//     },
//     sectionTitle: {
//       fontSize: isMobile ? '2.5rem' : isTablet ? '3rem' : '3.5rem',
//       marginBottom: '1rem',
//       color: '#7C2A62',
//       fontWeight: '700',
//       background: 'linear-gradient(45deg, #7C2A62, #9C3A7A)',
//       WebkitBackgroundClip: 'text',
//       WebkitTextFillColor: 'transparent',
//       opacity: isVisible ? 1 : 0,
//       transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
//       transition: 'all 0.8s ease-out',
//     },
//     sectionSubtitle: {
//       fontSize: isMobile ? '1rem' : isTablet ? '1.1rem' : '1.2rem',
//       color: '#666',
//       maxWidth: '600px',
//       margin: '0 auto',
//       lineHeight: '1.5',
//       opacity: isVisible ? 1 : 0,
//       transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
//       transition: 'all 0.8s ease-out 0.2s',
//     },
//     // Stats Section
//     statsSection: {
//       display: 'grid',
//       gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : isTablet ? 'repeat(4, 1fr)' : 'repeat(4, 1fr)',
//       gap: isMobile ? '1rem' : '1.5rem',
//       marginBottom: isMobile ? '3rem' : '4rem',
//       opacity: isVisible ? 1 : 0,
//       transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
//       transition: 'all 0.8s ease-out 0.4s',
//     },
//     statItem: {
//       textAlign: 'center',
//       padding: isMobile ? '1.5rem 1rem' : '2rem 1.5rem',
//       background: 'rgba(255, 255, 255, 0.9)',
//       borderRadius: '15px',
//       boxShadow: '0 8px 30px rgba(124, 42, 98, 0.1)',
//       backdropFilter: 'blur(10px)',
//       transition: 'all 0.3s ease',
//     },
//     statNumber: {
//       fontSize: isMobile ? '1.5rem' : isTablet ? '1.8rem' : '2rem',
//       fontWeight: 'bold',
//       color: '#7C2A62',
//       marginBottom: '0.5rem',
//       background: 'linear-gradient(45deg, #7C2A62, #D32F2F)',
//       WebkitBackgroundClip: 'text',
//       WebkitTextFillColor: 'transparent',
//     },
//     statLabel: {
//       fontSize: isMobile ? '0.8rem' : '0.9rem',
//       color: '#666',
//       fontWeight: '500',
//     },
//     // Main Content Container
//     contentContainer: {
//       display: 'grid',
//       gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
//       gap: isMobile ? '3rem' : '4rem',
//       alignItems: 'stretch',
//     },
//     // Left Side - Form Section
//     formSection: {
//       opacity: isVisible ? 1 : 0,
//       transform: isVisible ? 'translateX(0)' : 'translateX(-30px)',
//       transition: 'all 0.8s ease-out 0.6s',
//       display: 'flex',
//       flexDirection: 'column',
//     },
//     contactForm: {
//       background: 'rgba(255, 255, 255, 0.9)',
//       padding: isMobile ? '2rem 1.5rem' : '2.5rem',
//       borderRadius: '20px',
//       boxShadow: '0 15px 40px rgba(124, 42, 98, 0.15)',
//       backdropFilter: 'blur(10px)',
//       border: '2px solid transparent',
//       flex: 1,
//       display: 'flex',
//       flexDirection: 'column',
//     },
//     formHeader: {
//       marginBottom: '2rem',
//       textAlign: 'center',
//     },
//     formTitle: {
//       fontSize: isMobile ? '1.5rem' : '1.8rem',
//       fontWeight: '700',
//       color: '#7C2A62',
//       marginBottom: '0.8rem',
//     },
//     formSubtitle: {
//       fontSize: isMobile ? '0.9rem' : '1rem',
//       color: '#666',
//       lineHeight: '1.5',
//     },
//     form: {
//       display: 'flex',
//       flexDirection: 'column',
//       gap: '1.2rem',
//       flex: 1,
//     },
//     formRow: {
//       display: 'grid',
//       gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
//       gap: '1rem',
//     },
//     formGroup: {
//       display: 'flex',
//       flexDirection: 'column',
//     },
//     formLabel: {
//       fontSize: isMobile ? '0.85rem' : '0.9rem',
//       fontWeight: '600',
//       color: '#333',
//       marginBottom: '0.5rem',
//       display: 'flex',
//       alignItems: 'center',
//       gap: '0.3rem',
//     },
//     requiredStar: {
//       color: '#dc3545',
//       fontSize: '0.8rem',
//     },
//     formInput: {
//       padding: isMobile ? '0.8rem' : '1rem',
//       border: '2px solid #e9ecef',
//       borderRadius: '10px',
//       fontSize: isMobile ? '0.9rem' : '1rem',
//       transition: 'all 0.3s ease',
//       outline: 'none',
//       background: '#f8f9fa',
//       width: '100%',
//       boxSizing: 'border-box',
//       fontFamily: 'inherit',
//     },
//     formInputFocus: {
//       borderColor: '#7C2A62',
//       background: 'white',
//       boxShadow: '0 0 0 3px rgba(124, 42, 98, 0.1)',
//     },
//     formInputError: {
//       borderColor: '#dc3545',
//       background: '#fff5f5',
//     },
//     formInputValid: {
//       borderColor: '#28a745',
//       background: '#f8fff9',
//     },
//     formSelect: {
//       padding: isMobile ? '0.8rem' : '1rem',
//       border: '2px solid #e9ecef',
//       borderRadius: '10px',
//       fontSize: isMobile ? '0.9rem' : '1rem',
//       transition: 'all 0.3s ease',
//       outline: 'none',
//       background: '#f8f9fa',
//       cursor: 'pointer',
//       width: '100%',
//       boxSizing: 'border-box',
//       fontFamily: 'inherit',
//     },
//     formTextarea: {
//       padding: isMobile ? '0.8rem' : '1rem',
//       border: '2px solid #e9ecef',
//       borderRadius: '10px',
//       fontSize: isMobile ? '0.9rem' : '1rem',
//       minHeight: isMobile ? '100px' : '120px',
//       resize: 'vertical',
//       transition: 'all 0.3s ease',
//       outline: 'none',
//       fontFamily: 'inherit',
//       background: '#f8f9fa',
//       width: '100%',
//       boxSizing: 'border-box',
//       lineHeight: '1.4',
//       flex: 1,
//     },
//     errorText: {
//       color: '#dc3545',
//       fontSize: isMobile ? '0.75rem' : '0.8rem',
//       marginTop: '0.3rem',
//       display: 'flex',
//       alignItems: 'center',
//       gap: '0.3rem',
//     },
//     statusIndicator: {
//       display: 'flex',
//       alignItems: 'center',
//       gap: '0.3rem',
//       fontSize: isMobile ? '0.75rem' : '0.8rem',
//       marginTop: '0.3rem',
//     },
//     validStatus: {
//       color: '#28a745',
//       fontWeight: '600',
//     },
//     invalidStatus: {
//       color: '#dc3545',
//       fontWeight: '600',
//     },
//     submitButton: {
//       padding: isMobile ? '1rem' : '1.2rem',
//       background: 'linear-gradient(135deg, #7C2A62, #9C3A7A)',
//       color: 'white',
//       border: 'none',
//       borderRadius: '12px',
//       fontSize: isMobile ? '1rem' : '1.1rem',
//       fontWeight: '700',
//       cursor: 'pointer',
//       transition: 'all 0.3s ease',
//       marginTop: 'auto',
//       width: '100%',
//       position: 'relative',
//       overflow: 'hidden',
//       boxShadow: '0 5px 15px rgba(124, 42, 98, 0.3)',
//     },
//     submitButtonHover: {
//       transform: 'translateY(-2px)',
//       boxShadow: '0 8px 25px rgba(124, 42, 98, 0.4)',
//     },
//     submitButtonDisabled: {
//       background: 'linear-gradient(135deg, #cccccc, #aaaaaa)',
//       cursor: 'not-allowed',
//       transform: 'none',
//       boxShadow: 'none',
//     },
//     // Right Side - Medical Animations
//     animationSection: {
//       opacity: isVisible ? 1 : 0,
//       transform: isVisible ? 'translateX(0)' : 'translateX(30px)',
//       transition: 'all 0.8s ease-out 0.8s',
//       display: 'flex',
//       flexDirection: 'column',
//     },
//     animationContainer: {
//       background: 'rgba(255, 255, 255, 0.9)',
//       padding: isMobile ? '2rem 1.5rem' : '2.5rem',
//       borderRadius: '20px',
//       boxShadow: '0 15px 40px rgba(124, 42, 98, 0.15)',
//       backdropFilter: 'blur(10px)',
//       border: '2px solid transparent',
//       textAlign: 'center',
//       flex: 1,
//       display: 'flex',
//       flexDirection: 'column',
//       justifyContent: 'space-between',
//       minHeight: isMobile ? 'auto' : '600px',
//     },
//     animationIcon: {
//       fontSize: isMobile ? '4rem' : '5rem',
//       marginBottom: '1.5rem',
//       animation: 'pulse 2s ease-in-out infinite',
//     },
//     animationTitle: {
//       fontSize: isMobile ? '1.5rem' : '1.8rem',
//       fontWeight: '700',
//       color: '#7C2A62',
//       marginBottom: '1rem',
//     },
//     animationDescription: {
//       fontSize: isMobile ? '1rem' : '1.1rem',
//       color: '#666',
//       lineHeight: '1.6',
//       marginBottom: '2rem',
//     },
//     featuresGrid: {
//       display: 'grid',
//       gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
//       gap: '1rem',
//       marginBottom: '2rem',
//     },
//     featureItem: {
//       padding: '0.8rem',
//       background: 'rgba(124, 42, 98, 0.1)',
//       borderRadius: '10px',
//       fontSize: isMobile ? '0.8rem' : '0.9rem',
//       fontWeight: '600',
//       color: '#7C2A62',
//     },
//     animationIndicators: {
//       display: 'flex',
//       justifyContent: 'center',
//       gap: '0.5rem',
//       marginTop: 'auto',
//     },
//     animationIndicator: {
//       width: '12px',
//       height: '12px',
//       borderRadius: '50%',
//       background: '#e9ecef',
//       cursor: 'pointer',
//       transition: 'all 0.3s ease',
//     },
//     activeIndicator: {
//       background: '#7C2A62',
//       transform: 'scale(1.2)',
//     },
//     // Real-time Animation Elements
//     realTimeAnimation: {
//       position: 'relative',
//       height: isMobile ? '150px' : '200px',
//       marginBottom: '2rem',
//       overflow: 'hidden',
//       borderRadius: '15px',
//       background: 'linear-gradient(135deg, #f8f9fa, #ffffff)',
//       flexShrink: 0,
//     },
//     // Medicine Delivery Animation - FIXED DIRECTION
//     deliveryAnimation: {
//       position: 'absolute',
//       top: '50%',
//       left: '0%',
//       transform: 'translateY(-50%)',
//       animation: 'deliveryMove 3s linear infinite',
//     },
//     deliveryTruck: {
//       fontSize: '3rem',
//       position: 'relative',
//       transform: 'scaleX(-1)', // This flips the truck to face right
//     },
//     deliveryPath: {
//       position: 'absolute',
//       bottom: '20px',
//       left: '0',
//       width: '100%',
//       height: '2px',
//       background: '#7C2A62',
//     },
//     deliveryDots: {
//       position: 'absolute',
//       bottom: '18px',
//       left: '0',
//       width: '100%',
//       display: 'flex',
//       justifyContent: 'space-between',
//     },
//     deliveryDot: {
//       width: '6px',
//       height: '6px',
//       borderRadius: '50%',
//       background: '#7C2A62',
//     },
//     // Doctor Consultation Animation
//     consultationAnimation: {
//       position: 'absolute',
//       top: '50%',
//       left: '50%',
//       transform: 'translate(-50%, -50%)',
//     },
//     doctorIcon: {
//       fontSize: '4rem',
//       animation: 'pulse 1.5s ease-in-out infinite',
//     },
//     videoWaves: {
//       position: 'absolute',
//       top: '50%',
//       left: '50%',
//       transform: 'translate(-50%, -50%)',
//       width: '100px',
//       height: '100px',
//       border: '2px solid #7C2A62',
//       borderRadius: '50%',
//       animation: 'ripple 2s linear infinite',
//     },
//     // Emergency Care Animation
//     emergencyAnimation: {
//       position: 'absolute',
//       top: '50%',
//       left: '50%',
//       transform: 'translate(-50%, -50%)',
//     },
//     ambulanceIcon: {
//       fontSize: '4rem',
//       animation: 'emergencyMove 1s ease-in-out infinite',
//     },
//     heartbeatLine: {
//       position: 'absolute',
//       bottom: '30px',
//       left: '20px',
//       right: '20px',
//       height: '2px',
//       background: 'linear-gradient(90deg, transparent, #dc3545, transparent)',
//       animation: 'heartbeat 1.5s ease-in-out infinite',
//     },
//   };

//   const [hoverStates, setHoverStates] = useState({
//     submitButton: false,
//     formFocus: {
//       name: false,
//       email: false,
//       phone: false,
//       service: false,
//       message: false
//     }
//   });

//   const handleInputChange = (field, value) => {
//     let processedValue = value;

//     if (field === 'name') {
//       processedValue = value.replace(/[^A-Za-z\s]/g, '');
//     }

//     if (field === 'phone') {
//       processedValue = value.replace(/\D/g, '');
//       if (processedValue.length > 0 && /^[6-9]/.test(processedValue)) {
//         if (processedValue.length <= 10) {
//           processedValue = `+91 ${processedValue.slice(0, 10)}`;
//         } else {
//           processedValue = `+91 ${processedValue.slice(0, 10)}`;
//         }
//       }
//     }

//     setFormData(prev => ({
//       ...prev,
//       [field]: processedValue
//     }));

//     if (errors[field]) {
//       setErrors(prev => ({
//         ...prev,
//         [field]: ''
//       }));
//     }

//     if (field === 'email') {
//       if (processedValue.trim() === '') {
//         setEmailStatus('');
//       } else {
//         setEmailStatus(validateEmail(processedValue) ? 'valid' : 'invalid');
//       }
//     }

//     if (field === 'phone') {
//       const phoneWithoutPrefix = processedValue.replace('+91', '').trim();
//       if (phoneWithoutPrefix === '') {
//         setPhoneStatus('');
//       } else {
//         setPhoneStatus(validatePhone(processedValue) ? 'valid' : 'invalid');
//       }
//     }
//   };

//   const handleFocus = (field) => {
//     setHoverStates(prev => ({
//       ...prev,
//       formFocus: {
//         ...prev.formFocus,
//         [field]: true
//       }
//     }));
//   };

//   const handleBlur = (field) => {
//     setHoverStates(prev => ({
//       ...prev,
//       formFocus: {
//         ...prev.formFocus,
//         [field]: false
//       }
//     }));

//     if (field === 'name' && formData.name.trim()) {
//       if (!validateName(formData.name)) {
//         setErrors(prev => ({ ...prev, name: 'Name should contain only alphabets' }));
//       }
//     }
//   };

//   const validateForm = () => {
//     const newErrors = {};

//     if (!formData.name.trim()) {
//       newErrors.name = 'Name is required';
//     } else if (!validateName(formData.name)) {
//       newErrors.name = 'Name should contain only alphabets';
//     }

//     if (!formData.email.trim()) {
//       newErrors.email = 'Email is required';
//     } else if (!validateEmail(formData.email)) {
//       newErrors.email = 'Please enter a valid email address';
//     }

//     if (!formData.phone.trim()) {
//       newErrors.phone = 'Phone number is required';
//     } else if (!validatePhone(formData.phone)) {
//       newErrors.phone = 'Please enter a valid 10-digit Indian mobile number starting with 6,7,8,9';
//     }

//     if (!formData.service) {
//       newErrors.service = 'Please select a service';
//     }

//     if (!formData.message.trim()) {
//       newErrors.message = 'Please provide details';
//     }

//     return newErrors;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const newErrors = validateForm();

//     if (Object.keys(newErrors).length > 0) {
//       setErrors(newErrors);
//       return;
//     }

//     setIsSubmitting(true);
//     setTimeout(() => {
//       alert('Thank you! We will contact you within 30 minutes for your medicine delivery/consultation.');
//       setFormData({ name: '', email: '', phone: '', service: '', message: '' });
//       setEmailStatus('');
//       setPhoneStatus('');
//       setIsSubmitting(false);
//     }, 2000);
//   };

//   const handleAnimationChange = (index) => {
//     setCurrentAnimation(index);
//   };

//   // Generate floating elements
//   const floatingElements = Array.from({ length: isMobile ? 8 : 15 }, (_, i) => ({
//     id: i,
//     size: Math.random() * (isMobile ? 50 : 100) + (isMobile ? 30 : 50),
//     left: Math.random() * 100,
//     top: Math.random() * 100,
//     animationDelay: Math.random() * 5,
//   }));

//   const currentAnimationData = medicalAnimations[currentAnimation];

//   const renderRealTimeAnimation = () => {
//     switch (currentAnimation) {
//       case 0: // Medicine Delivery - FIXED DIRECTION
//         return (
//           <div style={styles.realTimeAnimation}>
//             <div style={styles.deliveryAnimation}>
//               <div style={styles.deliveryTruck}>🚚</div>
//             </div>
//             <div style={styles.deliveryPath}></div>
//             <div style={styles.deliveryDots}>
//               {[...Array(8)].map((_, i) => (
//                 <div key={i} style={styles.deliveryDot}></div>
//               ))}
//             </div>
//           </div>
//         );
//       case 1: // Doctor Consultation
//         return (
//           <div style={styles.realTimeAnimation}>
//             <div style={styles.consultationAnimation}>
//               <div style={styles.doctorIcon}>👨‍⚕️</div>
//               <div style={styles.videoWaves}></div>
//               <div style={{...styles.videoWaves, animationDelay: '0.5s'}}></div>
//               <div style={{...styles.videoWaves, animationDelay: '1s'}}></div>
//             </div>
//           </div>
//         );
//       case 2: // Emergency Care
//         return (
//           <div style={styles.realTimeAnimation}>
//             <div style={styles.emergencyAnimation}>
//               <div style={styles.ambulanceIcon}>🚑</div>
//             </div>
//             <div style={styles.heartbeatLine}></div>
//           </div>
//         );
//       default:
//         return null;
//     }
//   };

//   return (
//     <section style={styles.contact} id="contact">
//       {/* Floating Background Elements */}
//       <div style={styles.floatingElements}>
//         {floatingElements.map((element) => (
//           <div
//             key={element.id}
//             style={{
//               ...styles.floatingElement,
//               width: element.size,
//               height: element.size,
//               left: `${element.left}%`,
//               top: `${element.top}%`,
//               animationDelay: `${element.animationDelay}s`,
//             }}
//           />
//         ))}
//       </div>

//       <div style={styles.container}>
//         <div style={styles.sectionHeader}>
//           <h2 style={styles.sectionTitle}>Get Quick Medical Service</h2>
//           <p style={styles.sectionSubtitle}>
//             Request medicine delivery or doctor consultation. We'll respond within 30 minutes.
//           </p>
//         </div>

//         {/* Stats Section */}
//         <div style={styles.statsSection}>
//           {stats.map((stat, index) => (
//             <div
//               key={index}
//               style={styles.statItem}
//               onMouseEnter={(e) => {
//                 e.currentTarget.style.transform = 'translateY(-5px)';
//                 e.currentTarget.style.boxShadow = '0 15px 40px rgba(124, 42, 98, 0.2)';
//               }}
//               onMouseLeave={(e) => {
//                 e.currentTarget.style.transform = 'translateY(0)';
//                 e.currentTarget.style.boxShadow = '0 8px 30px rgba(124, 42, 98, 0.1)';
//               }}
//             >
//               <div style={styles.statNumber}>{stat.number}</div>
//               <div style={styles.statLabel}>{stat.label}</div>
//             </div>
//           ))}
//         </div>

//         {/* Main Content Container */}
//         <div style={styles.contentContainer}>
//           {/* Left Side - Contact Form */}
//           <div style={styles.formSection}>
//             <div
//               style={styles.contactForm}
//               onMouseEnter={(e) => {
//                 e.currentTarget.style.transform = 'translateY(-5px)';
//                 e.currentTarget.style.boxShadow = '0 20px 50px rgba(124, 42, 98, 0.2)';
//                 e.currentTarget.style.borderColor = '#7C2A62';
//               }}
//               onMouseLeave={(e) => {
//                 e.currentTarget.style.transform = 'translateY(0)';
//                 e.currentTarget.style.boxShadow = '0 15px 40px rgba(124, 42, 98, 0.15)';
//                 e.currentTarget.style.borderColor = 'transparent';
//               }}
//             >
//               <div style={styles.formHeader}>
//                 <h3 style={styles.formTitle}>Request Quick Service</h3>
//                 <p style={styles.formSubtitle}>
//                   Fill this form for medicine delivery or doctor consultation.
//                   We'll respond within 30 minutes.
//                 </p>
//               </div>

//               <form style={styles.form} onSubmit={handleSubmit}>
//                 <div style={styles.formRow}>
//                   <div style={styles.formGroup}>
//                     <label style={styles.formLabel}>
//                       Full Name <span style={styles.requiredStar}>*</span>
//                     </label>
//                     <input
//                       type="text"
//                       placeholder="Enter your full name"
//                       style={{
//                         ...styles.formInput,
//                         ...(hoverStates.formFocus.name && styles.formInputFocus),
//                         ...(errors.name && styles.formInputError)
//                       }}
//                       value={formData.name}
//                       onChange={(e) => handleInputChange('name', e.target.value)}
//                       onFocus={() => handleFocus('name')}
//                       onBlur={() => handleBlur('name')}
//                     />
//                     {errors.name && (
//                       <span style={styles.errorText}>⚠️ {errors.name}</span>
//                     )}
//                   </div>

//                   <div style={styles.formGroup}>
//                     <label style={styles.formLabel}>
//                       Email <span style={styles.requiredStar}>*</span>
//                     </label>
//                     <input
//                       type="email"
//                       placeholder="Enter your email"
//                       style={{
//                         ...styles.formInput,
//                         ...(hoverStates.formFocus.email && styles.formInputFocus),
//                         ...(errors.email && styles.formInputError),
//                         ...(emailStatus === 'valid' && styles.formInputValid)
//                       }}
//                       value={formData.email}
//                       onChange={(e) => handleInputChange('email', e.target.value)}
//                       onFocus={() => handleFocus('email')}
//                       onBlur={() => handleBlur('email')}
//                     />
//                     {errors.email && (
//                       <span style={styles.errorText}>⚠️ {errors.email}</span>
//                     )}
//                     {emailStatus === 'valid' && (
//                       <div style={{...styles.statusIndicator, ...styles.validStatus}}>
//                         ✓ Valid email
//                       </div>
//                     )}
//                     {emailStatus === 'invalid' && formData.email && (
//                       <div style={{...styles.statusIndicator, ...styles.invalidStatus}}>
//                         ✗ Invalid email format
//                       </div>
//                     )}
//                   </div>
//                 </div>

//                 <div style={styles.formRow}>
//                   <div style={styles.formGroup}>
//                     <label style={styles.formLabel}>
//                       Phone <span style={styles.requiredStar}>*</span>
//                     </label>
//                     <input
//                       type="tel"
//                       placeholder="+91 "
//                       style={{
//                         ...styles.formInput,
//                         ...(hoverStates.formFocus.phone && styles.formInputFocus),
//                         ...(errors.phone && styles.formInputError),
//                         ...(phoneStatus === 'valid' && styles.formInputValid)
//                       }}
//                       value={formData.phone}
//                       onChange={(e) => handleInputChange('phone', e.target.value)}
//                       onFocus={() => handleFocus('phone')}
//                       onBlur={() => handleBlur('phone')}
//                     />
//                     {errors.phone && (
//                       <span style={styles.errorText}>⚠️ {errors.phone}</span>
//                     )}
//                     {phoneStatus === 'valid' && (
//                       <div style={{...styles.statusIndicator, ...styles.validStatus}}>
//                         ✓ Valid mobile number
//                       </div>
//                     )}
//                     {phoneStatus === 'invalid' && formData.phone && (
//                       <div style={{...styles.statusIndicator, ...styles.invalidStatus}}>
//                         ✗ Invalid mobile number
//                       </div>
//                     )}
//                   </div>

//                   <div style={styles.formGroup}>
//                     <label style={styles.formLabel}>
//                       Service <span style={styles.requiredStar}>*</span>
//                     </label>
//                     <select
//                       style={{
//                         ...styles.formSelect,
//                         ...(hoverStates.formFocus.service && styles.formInputFocus),
//                         ...(errors.service && styles.formInputError)
//                       }}
//                       value={formData.service}
//                       onChange={(e) => handleInputChange('service', e.target.value)}
//                       onFocus={() => handleFocus('service')}
//                       onBlur={() => handleBlur('service')}
//                     >
//                       <option value="">Select service</option>
//                       <option value="medicine-delivery">Medicine Delivery</option>
//                       <option value="doctor-consultation">Doctor Consultation</option>
//                       <option value="both">Both Services</option>
//                     </select>
//                     {errors.service && (
//                       <span style={styles.errorText}>⚠️ {errors.service}</span>
//                     )}
//                   </div>
//                 </div>

//                 <div style={styles.formGroup}>
//                   <label style={styles.formLabel}>
//                     {formData.service === 'medicine-delivery' ? 'Medicine Details *' :
//                      formData.service === 'doctor-consultation' ? 'Symptoms Description *' :
//                      'Service Details *'}
//                   </label>
//                   <textarea
//                     placeholder={
//                       formData.service === 'medicine-delivery' ?
//                       'Medicine names, prescription details...' :
//                       formData.service === 'doctor-consultation' ?
//                       'Describe your symptoms and concerns...' :
//                       'Tell us about the services you need...'
//                     }
//                     style={{
//                       ...styles.formTextarea,
//                       ...(hoverStates.formFocus.message && styles.formInputFocus),
//                       ...(errors.message && styles.formInputError)
//                     }}
//                     value={formData.message}
//                     onChange={(e) => handleInputChange('message', e.target.value)}
//                     onFocus={() => handleFocus('message')}
//                     onBlur={() => handleBlur('message')}
//                   />
//                   {errors.message && (
//                     <span style={styles.errorText}>⚠️ {errors.message}</span>
//                   )}
//                 </div>

//                 <button
//                   type="submit"
//                   style={{
//                     ...styles.submitButton,
//                     ...(hoverStates.submitButton && !isSubmitting && styles.submitButtonHover),
//                     ...(isSubmitting && styles.submitButtonDisabled)
//                   }}
//                   disabled={isSubmitting}
//                   onMouseEnter={() => !isSubmitting && setHoverStates(prev => ({ ...prev, submitButton: true }))}
//                   onMouseLeave={() => !isSubmitting && setHoverStates(prev => ({ ...prev, submitButton: false }))}
//                 >
//                   {isSubmitting ? 'Processing Request...' : 'Get Quick Service Now'}
//                 </button>
//               </form>
//             </div>
//           </div>

//           {/* Right Side - Medical Animations */}
//           <div style={styles.animationSection}>
//             <div
//               style={styles.animationContainer}
//               onMouseEnter={(e) => {
//                 e.currentTarget.style.transform = 'translateY(-5px)';
//                 e.currentTarget.style.boxShadow = '0 20px 50px rgba(124, 42, 98, 0.2)';
//                 e.currentTarget.style.borderColor = '#7C2A62';
//               }}
//               onMouseLeave={(e) => {
//                 e.currentTarget.style.transform = 'translateY(0)';
//                 e.currentTarget.style.boxShadow = '0 15px 40px rgba(124, 42, 98, 0.15)';
//                 e.currentTarget.style.borderColor = 'transparent';
//               }}
//             >
//               {/* Real-time Animation */}
//               {renderRealTimeAnimation()}

//               <div>
//                 <h3 style={styles.animationTitle}>{currentAnimationData.title}</h3>
//                 <p style={styles.animationDescription}>{currentAnimationData.description}</p>

//                 <div style={styles.featuresGrid}>
//                   {currentAnimationData.features.map((feature, index) => (
//                     <div key={index} style={styles.featureItem}>
//                       {feature}
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               <div style={styles.animationIndicators}>
//                 {medicalAnimations.map((_, index) => (
//                   <div
//                     key={index}
//                     style={{
//                       ...styles.animationIndicator,
//                       ...(index === currentAnimation && styles.activeIndicator)
//                     }}
//                     onClick={() => handleAnimationChange(index)}
//                   />
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* CSS Animations */}
//       <style jsx>{`
//         @keyframes float {
//           0%, 100% {
//             transform: translateY(0px);
//           }
//           50% {
//             transform: translateY(-20px);
//           }
//         }

//         @keyframes pulse {
//           0%, 100% {
//             transform: scale(1);
//           }
//           50% {
//             transform: scale(1.1);
//           }
//         }

//         @keyframes deliveryMove {
//           0% {
//             left: -50px;
//           }
//           100% {
//             left: 100%;
//           }
//         }

//         @keyframes ripple {
//           0% {
//             width: 0;
//             height: 0;
//             opacity: 1;
//           }
//           100% {
//             width: 200px;
//             height: 200px;
//             opacity: 0;
//           }
//         }

//         @keyframes emergencyMove {
//           0%, 100% {
//             transform: translate(-50%, -50%) translateX(0);
//           }
//           25% {
//             transform: translate(-50%, -50%) translateX(-5px);
//           }
//           75% {
//             transform: translate(-50%, -50%) translateX(5px);
//           }
//         }

//         @keyframes heartbeat {
//           0%, 100% {
//             transform: scaleX(0.3);
//             opacity: 0.3;
//           }
//           25% {
//             transform: scaleX(1);
//             opacity: 0.7;
//           }
//           50% {
//             transform: scaleX(0.5);
//             opacity: 0.5;
//           }
//           75% {
//             transform: scaleX(0.8);
//             opacity: 0.6;
//           }
//         }
//       `}</style>
//     </section>
//   );
// };

// export default Contact;

import React, { useState, useEffect } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [emailStatus, setEmailStatus] = useState("");
  const [phoneStatus, setPhoneStatus] = useState("");
  const [currentAnimation, setCurrentAnimation] = useState(0);

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setIsMobile(width <= 768);
      setIsTablet(width <= 1024 && width > 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    // Add fade-in animation
    setIsVisible(true);

    // Animation rotation
    const interval = setInterval(() => {
      setCurrentAnimation((prev) => (prev + 1) % 3);
    }, 4000);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
      clearInterval(interval);
    };
  }, []);

  // Stats data
  const stats = [
    { number: "50,000+", label: "Happy Customers" },
    { number: "30-40 min", label: "Avg Delivery Time" },
    { number: "500+", label: "Partner Pharmacies" },
    { number: "100+", label: "Expert Doctors" },
  ];

  // Medical animations data
  const medicalAnimations = [
    {
      title: "Medicine Delivery",
      description:
        "Get your prescribed medicines delivered to your doorstep within 30-40 minutes with real-time tracking",
      image: "🚚",
      features: [
        "Real-time Tracking",
        "24/7 Service",
        "Prescription Upload",
        "Live Updates",
      ],
    },
    {
      title: "Doctor Consultation",
      description:
        "Connect with certified doctors via video call for instant medical advice and e-prescriptions",
      image: "👨‍⚕️",
      features: [
        "Instant Booking",
        "Multiple Specialties",
        "E-Prescriptions",
        "Follow-up Care",
      ],
    },
    {
      title: "Emergency Care",
      description:
        "24/7 emergency medical assistance with rapid response teams and GPS-enabled ambulances",
      image: "🏥",
      features: [
        "Immediate Response",
        "Ambulance Service",
        "GPS Tracking",
        "Hospital Coordination",
      ],
    },
  ];

  // Validation functions
  const validateName = (name) => {
    const nameRegex = /^[A-Za-z\s]+$/;
    return nameRegex.test(name.trim());
  };

  const validateEmail = (email) => {
    const emailRegex = /^\S+@\S+\.\S+$/;
    return emailRegex.test(email.trim());
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(phone.replace("+91", "").trim());
  };

  const styles = {
    // Main Contact Section with Bubble Background
    contact: {
      minHeight: "100vh",
      background:
        "linear-gradient(135deg, #F7D9EB 0%, #ffffff 50%, #F7D9EB 100%)",
      position: "relative",
      overflow: "hidden",
      padding: isMobile ? "4rem 1rem" : isTablet ? "5rem 2rem" : "6rem 2rem",
    },
    floatingElements: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      pointerEvents: "none",
      zIndex: 1,
    },
    floatingElement: {
      position: "absolute",
      background: "rgba(124, 42, 98, 0.1)",
      borderRadius: "50%",
      animation: "float 6s ease-in-out infinite",
    },
    container: {
      maxWidth: "1200px",
      margin: "0 auto",
      position: "relative",
      zIndex: 2,
    },
    sectionHeader: {
      textAlign: "center",
      marginBottom: isMobile ? "3rem" : "4rem",
    },
    sectionTitle: {
      fontSize: isMobile ? "2.5rem" : isTablet ? "3rem" : "3.5rem",
      marginBottom: "1rem",
      color: "#7C2A62",
      fontWeight: "700",
      background: "linear-gradient(45deg, #7C2A62, #9C3A7A)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? "translateY(0)" : "translateY(30px)",
      transition: "all 0.8s ease-out",
    },
    sectionSubtitle: {
      fontSize: isMobile ? "1rem" : isTablet ? "1.1rem" : "1.2rem",
      color: "#666",
      maxWidth: "600px",
      margin: "0 auto",
      lineHeight: "1.5",
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? "translateY(0)" : "translateY(30px)",
      transition: "all 0.8s ease-out 0.2s",
    },
    // Stats Section
    statsSection: {
      display: "grid",
      gridTemplateColumns: isMobile
        ? "repeat(2, 1fr)"
        : isTablet
        ? "repeat(4, 1fr)"
        : "repeat(4, 1fr)",
      gap: isMobile ? "1rem" : "1.5rem",
      marginBottom: isMobile ? "3rem" : "4rem",
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? "translateY(0)" : "translateY(30px)",
      transition: "all 0.8s ease-out 0.4s",
    },
    statItem: {
      textAlign: "center",
      padding: isMobile ? "1.5rem 1rem" : "2rem 1.5rem",
      background: "rgba(255, 255, 255, 0.9)",
      borderRadius: "15px",
      boxShadow: "0 8px 30px rgba(124, 42, 98, 0.1)",
      backdropFilter: "blur(10px)",
      transition: "all 0.3s ease",
    },
    statNumber: {
      fontSize: isMobile ? "1.5rem" : isTablet ? "1.8rem" : "2rem",
      fontWeight: "bold",
      color: "#7C2A62",
      marginBottom: "0.5rem",
      background: "linear-gradient(45deg, #7C2A62, #D32F2F)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
    },
    statLabel: {
      fontSize: isMobile ? "0.8rem" : "0.9rem",
      color: "#666",
      fontWeight: "500",
    },
    // Main Content Container
    contentContainer: {
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
      gap: isMobile ? "3rem" : "4rem",
      alignItems: "stretch",
    },
    // Left Side - Form Section
    formSection: {
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? "translateX(0)" : "translateX(-30px)",
      transition: "all 0.8s ease-out 0.6s",
      display: "flex",
      flexDirection: "column",
    },
    contactForm: {
      background: "rgba(255, 255, 255, 0.9)",
      padding: isMobile ? "2rem 1.5rem" : "2.5rem",
      borderRadius: "20px",
      boxShadow: "0 15px 40px rgba(124, 42, 98, 0.15)",
      backdropFilter: "blur(10px)",
      border: "2px solid transparent",
      flex: 1,
      display: "flex",
      flexDirection: "column",
    },
    formHeader: {
      marginBottom: "2rem",
      textAlign: "center",
    },
    formTitle: {
      fontSize: isMobile ? "1.5rem" : "1.8rem",
      fontWeight: "700",
      color: "#7C2A62",
      marginBottom: "0.8rem",
    },
    formSubtitle: {
      fontSize: isMobile ? "0.9rem" : "1rem",
      color: "#666",
      lineHeight: "1.5",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      gap: "1.2rem",
      flex: 1,
    },
    formRow: {
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
      gap: "1rem",
    },
    formGroup: {
      display: "flex",
      flexDirection: "column",
    },
    formLabel: {
      fontSize: isMobile ? "0.85rem" : "0.9rem",
      fontWeight: "600",
      color: "#333",
      marginBottom: "0.5rem",
      display: "flex",
      alignItems: "center",
      gap: "0.3rem",
    },
    requiredStar: {
      color: "#dc3545",
      fontSize: "0.8rem",
    },
    formInput: {
      padding: isMobile ? "0.8rem" : "1rem",
      border: "2px solid #e9ecef",
      borderRadius: "10px",
      fontSize: isMobile ? "0.9rem" : "1rem",
      transition: "all 0.3s ease",
      outline: "none",
      background: "#f8f9fa",
      width: "100%",
      boxSizing: "border-box",
      fontFamily: "inherit",
    },
    formInputFocus: {
      borderColor: "#7C2A62",
      background: "white",
      boxShadow: "0 0 0 3px rgba(124, 42, 98, 0.1)",
    },
    formInputError: {
      borderColor: "#dc3545",
      background: "#fff5f5",
    },
    formInputValid: {
      borderColor: "#28a745",
      background: "#f8fff9",
    },
    formSelect: {
      padding: isMobile ? "0.8rem" : "1rem",
      border: "2px solid #e9ecef",
      borderRadius: "10px",
      fontSize: isMobile ? "0.9rem" : "1rem",
      transition: "all 0.3s ease",
      outline: "none",
      background: "#f8f9fa",
      cursor: "pointer",
      width: "100%",
      boxSizing: "border-box",
      fontFamily: "inherit",
    },
    formTextarea: {
      padding: isMobile ? "0.8rem" : "1rem",
      border: "2px solid #e9ecef",
      borderRadius: "10px",
      fontSize: isMobile ? "0.9rem" : "1rem",
      minHeight: isMobile ? "100px" : "120px",
      resize: "vertical",
      transition: "all 0.3s ease",
      outline: "none",
      fontFamily: "inherit",
      background: "#f8f9fa",
      width: "100%",
      boxSizing: "border-box",
      lineHeight: "1.4",
      flex: 1,
    },
    errorText: {
      color: "#dc3545",
      fontSize: isMobile ? "0.75rem" : "0.8rem",
      marginTop: "0.3rem",
      display: "flex",
      alignItems: "center",
      gap: "0.3rem",
    },
    statusIndicator: {
      display: "flex",
      alignItems: "center",
      gap: "0.3rem",
      fontSize: isMobile ? "0.75rem" : "0.8rem",
      marginTop: "0.3rem",
    },
    validStatus: {
      color: "#28a745",
      fontWeight: "600",
    },
    invalidStatus: {
      color: "#dc3545",
      fontWeight: "600",
    },
    submitButton: {
      padding: isMobile ? "1rem" : "1.2rem",
      background: "linear-gradient(135deg, #7C2A62, #9C3A7A)",
      color: "white",
      border: "none",
      borderRadius: "12px",
      fontSize: isMobile ? "1rem" : "1.1rem",
      fontWeight: "700",
      cursor: "pointer",
      transition: "all 0.3s ease",
      marginTop: "auto",
      width: "100%",
      position: "relative",
      overflow: "hidden",
      boxShadow: "0 5px 15px rgba(124, 42, 98, 0.3)",
    },
    submitButtonHover: {
      transform: "translateY(-2px)",
      boxShadow: "0 8px 25px rgba(124, 42, 98, 0.4)",
    },
    submitButtonDisabled: {
      background: "linear-gradient(135deg, #cccccc, #aaaaaa)",
      cursor: "not-allowed",
      transform: "none",
      boxShadow: "none",
    },
    // Right Side - Medical Animations
    animationSection: {
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? "translateX(0)" : "translateX(30px)",
      transition: "all 0.8s ease-out 0.8s",
      display: "flex",
      flexDirection: "column",
    },
    animationContainer: {
      background: "rgba(255, 255, 255, 0.9)",
      padding: isMobile ? "2rem 1.5rem" : "2.5rem",
      borderRadius: "20px",
      boxShadow: "0 15px 40px rgba(124, 42, 98, 0.15)",
      backdropFilter: "blur(10px)",
      border: "2px solid transparent",
      textAlign: "center",
      flex: 1,
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      minHeight: isMobile ? "auto" : "600px",
    },
    animationIcon: {
      fontSize: isMobile ? "4rem" : "5rem",
      marginBottom: "1.5rem",
      animation: "pulse 2s ease-in-out infinite",
    },
    animationTitle: {
      fontSize: isMobile ? "1.5rem" : "1.8rem",
      fontWeight: "700",
      color: "#7C2A62",
      marginBottom: "1rem",
    },
    animationDescription: {
      fontSize: isMobile ? "1rem" : "1.1rem",
      color: "#666",
      lineHeight: "1.6",
      marginBottom: "2rem",
    },
    featuresGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
      gap: "1rem",
      marginBottom: "2rem",
    },
    featureItem: {
      padding: "0.8rem",
      background: "rgba(124, 42, 98, 0.1)",
      borderRadius: "10px",
      fontSize: isMobile ? "0.8rem" : "0.9rem",
      fontWeight: "600",
      color: "#7C2A62",
    },
    animationIndicators: {
      display: "flex",
      justifyContent: "center",
      gap: "0.5rem",
      marginTop: "auto",
    },
    animationIndicator: {
      width: "12px",
      height: "12px",
      borderRadius: "50%",
      background: "#e9ecef",
      cursor: "pointer",
      transition: "all 0.3s ease",
    },
    activeIndicator: {
      background: "#7C2A62",
      transform: "scale(1.2)",
    },
    // Real-time Animation Elements
    realTimeAnimation: {
      position: "relative",
      height: isMobile ? "150px" : "200px",
      marginBottom: "2rem",
      overflow: "hidden",
      borderRadius: "15px",
      background: "linear-gradient(135deg, #f8f9fa, #ffffff)",
      flexShrink: 0,
    },
    // Medicine Delivery Animation - FIXED DIRECTION
    deliveryAnimation: {
      position: "absolute",
      top: "50%",
      left: "0%",
      transform: "translateY(-50%)",
      animation: "deliveryMove 3s linear infinite",
    },
    deliveryTruck: {
      fontSize: "3rem",
      position: "relative",
      transform: "scaleX(-1)", // This flips the truck to face right
    },
    deliveryPath: {
      position: "absolute",
      bottom: "20px",
      left: "0",
      width: "100%",
      height: "2px",
      background: "#7C2A62",
    },
    deliveryDots: {
      position: "absolute",
      bottom: "18px",
      left: "0",
      width: "100%",
      display: "flex",
      justifyContent: "space-between",
    },
    deliveryDot: {
      width: "6px",
      height: "6px",
      borderRadius: "50%",
      background: "#7C2A62",
    },
    // Doctor Consultation Animation
    consultationAnimation: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
    },
    doctorIcon: {
      fontSize: "4rem",
      animation: "pulse 1.5s ease-in-out infinite",
    },
    videoWaves: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "100px",
      height: "100px",
      border: "2px solid #7C2A62",
      borderRadius: "50%",
      animation: "ripple 2s linear infinite",
    },
    // Emergency Care Animation
    emergencyAnimation: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
    },
    ambulanceIcon: {
      fontSize: "4rem",
      animation: "emergencyMove 1s ease-in-out infinite",
    },
    heartbeatLine: {
      position: "absolute",
      bottom: "30px",
      left: "20px",
      right: "20px",
      height: "2px",
      background: "linear-gradient(90deg, transparent, #dc3545, transparent)",
      animation: "heartbeat 1.5s ease-in-out infinite",
    },
  };

  const [hoverStates, setHoverStates] = useState({
    submitButton: false,
    formFocus: {
      name: false,
      email: false,
      phone: false,
      service: false,
      message: false,
    },
  });

  const handleInputChange = (field, value) => {
    let processedValue = value;

    if (field === "name") {
      processedValue = value.replace(/[^A-Za-z\s]/g, "");
    }

    if (field === "phone") {
      processedValue = value.replace(/\D/g, "");
      if (processedValue.length > 0 && /^[6-9]/.test(processedValue)) {
        if (processedValue.length <= 10) {
          processedValue = `+91 ${processedValue.slice(0, 10)}`;
        } else {
          processedValue = `+91 ${processedValue.slice(0, 10)}`;
        }
      }
    }

    setFormData((prev) => ({
      ...prev,
      [field]: processedValue,
    }));

    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }

    if (field === "email") {
      if (processedValue.trim() === "") {
        setEmailStatus("");
      } else {
        setEmailStatus(validateEmail(processedValue) ? "valid" : "invalid");
      }
    }

    if (field === "phone") {
      const phoneWithoutPrefix = processedValue.replace("+91", "").trim();
      if (phoneWithoutPrefix === "") {
        setPhoneStatus("");
      } else {
        setPhoneStatus(validatePhone(processedValue) ? "valid" : "invalid");
      }
    }
  };

  const handleFocus = (field) => {
    setHoverStates((prev) => ({
      ...prev,
      formFocus: {
        ...prev.formFocus,
        [field]: true,
      },
    }));
  };

  const handleBlur = (field) => {
    setHoverStates((prev) => ({
      ...prev,
      formFocus: {
        ...prev.formFocus,
        [field]: false,
      },
    }));

    if (field === "name" && formData.name.trim()) {
      if (!validateName(formData.name)) {
        setErrors((prev) => ({
          ...prev,
          name: "Name should contain only alphabets",
        }));
      }
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (!validateName(formData.name)) {
      newErrors.name = "Name should contain only alphabets";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone =
        "Please enter a valid 10-digit Indian mobile number starting with 6,7,8,9";
    }

    if (!formData.service) {
      newErrors.service = "Please select a service";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Please provide details";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/contact/submit/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            service: formData.service,
            message: formData.message,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Your request submitted successfully. We will contact you soon!");
        setFormData({
          name: "",
          email: "",
          phone: "",
          service: "",
          message: "",
        });
        setEmailStatus("");
        setPhoneStatus("");
      } else {
        alert(
          "Something went wrong: " + (data.message || "Please try again later.")
        );
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert(
        "Error while sending request! Please check your connection and try again."
      );
    }

    setIsSubmitting(false);
  };

  const handleAnimationChange = (index) => {
    setCurrentAnimation(index);
  };

  // Generate floating elements
  const floatingElements = Array.from(
    { length: isMobile ? 8 : 15 },
    (_, i) => ({
      id: i,
      size: Math.random() * (isMobile ? 50 : 100) + (isMobile ? 30 : 50),
      left: Math.random() * 100,
      top: Math.random() * 100,
      animationDelay: Math.random() * 5,
    })
  );

  const currentAnimationData = medicalAnimations[currentAnimation];

  const renderRealTimeAnimation = () => {
    switch (currentAnimation) {
      case 0: // Medicine Delivery - FIXED DIRECTION
        return (
          <div style={styles.realTimeAnimation}>
            <div style={styles.deliveryAnimation}>
              <div style={styles.deliveryTruck}>🚚</div>
            </div>
            <div style={styles.deliveryPath}></div>
            <div style={styles.deliveryDots}>
              {[...Array(8)].map((_, i) => (
                <div key={i} style={styles.deliveryDot}></div>
              ))}
            </div>
          </div>
        );
      case 1: // Doctor Consultation
        return (
          <div style={styles.realTimeAnimation}>
            <div style={styles.consultationAnimation}>
              <div style={styles.doctorIcon}>👨‍⚕️</div>
              <div style={styles.videoWaves}></div>
              <div
                style={{ ...styles.videoWaves, animationDelay: "0.5s" }}
              ></div>
              <div style={{ ...styles.videoWaves, animationDelay: "1s" }}></div>
            </div>
          </div>
        );
      case 2: // Emergency Care
        return (
          <div style={styles.realTimeAnimation}>
            <div style={styles.emergencyAnimation}>
              <div style={styles.ambulanceIcon}>🚑</div>
            </div>
            <div style={styles.heartbeatLine}></div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section style={styles.contact} id="contact">
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
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>Get Quick Medical Service</h2>
          <p style={styles.sectionSubtitle}>
            Request medicine delivery or doctor consultation. We'll respond
            within 30 minutes.
          </p>
        </div>

        {/* Stats Section */}
        <div style={styles.statsSection}>
          {stats.map((stat, index) => (
            <div
              key={index}
              style={styles.statItem}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow =
                  "0 15px 40px rgba(124, 42, 98, 0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 8px 30px rgba(124, 42, 98, 0.1)";
              }}
            >
              <div style={styles.statNumber}>{stat.number}</div>
              <div style={styles.statLabel}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Main Content Container */}
        <div style={styles.contentContainer}>
          {/* Left Side - Contact Form */}
          <div style={styles.formSection}>
            <div
              style={styles.contactForm}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow =
                  "0 20px 50px rgba(124, 42, 98, 0.2)";
                e.currentTarget.style.borderColor = "#7C2A62";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 15px 40px rgba(124, 42, 98, 0.15)";
                e.currentTarget.style.borderColor = "transparent";
              }}
            >
              <div style={styles.formHeader}>
                <h3 style={styles.formTitle}>Request Quick Service</h3>
                <p style={styles.formSubtitle}>
                  Fill this form for medicine delivery or doctor consultation.
                  We'll respond within 30 minutes.
                </p>
              </div>

              <form style={styles.form} onSubmit={handleSubmit}>
                <div style={styles.formRow}>
                  <div style={styles.formGroup}>
                    <label style={styles.formLabel}>
                      Full Name <span style={styles.requiredStar}>*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your full name"
                      style={{
                        ...styles.formInput,
                        ...(hoverStates.formFocus.name &&
                          styles.formInputFocus),
                        ...(errors.name && styles.formInputError),
                      }}
                      value={formData.name}
                      onChange={(e) =>
                        handleInputChange("name", e.target.value)
                      }
                      onFocus={() => handleFocus("name")}
                      onBlur={() => handleBlur("name")}
                    />
                    {errors.name && (
                      <span style={styles.errorText}>⚠️ {errors.name}</span>
                    )}
                  </div>

                  <div style={styles.formGroup}>
                    <label style={styles.formLabel}>
                      Email <span style={styles.requiredStar}>*</span>
                    </label>
                    <input
                      type="email"
                      placeholder="Enter your email"
                      style={{
                        ...styles.formInput,
                        ...(hoverStates.formFocus.email &&
                          styles.formInputFocus),
                        ...(errors.email && styles.formInputError),
                        ...(emailStatus === "valid" && styles.formInputValid),
                      }}
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      onFocus={() => handleFocus("email")}
                      onBlur={() => handleBlur("email")}
                    />
                    {errors.email && (
                      <span style={styles.errorText}>⚠️ {errors.email}</span>
                    )}
                    {emailStatus === "valid" && (
                      <div
                        style={{
                          ...styles.statusIndicator,
                          ...styles.validStatus,
                        }}
                      >
                        ✓ Valid email
                      </div>
                    )}
                    {emailStatus === "invalid" && formData.email && (
                      <div
                        style={{
                          ...styles.statusIndicator,
                          ...styles.invalidStatus,
                        }}
                      >
                        ✗ Invalid email format
                      </div>
                    )}
                  </div>
                </div>

                <div style={styles.formRow}>
                  <div style={styles.formGroup}>
                    <label style={styles.formLabel}>
                      Phone <span style={styles.requiredStar}>*</span>
                    </label>
                    <input
                      type="tel"
                      placeholder="+91 "
                      style={{
                        ...styles.formInput,
                        ...(hoverStates.formFocus.phone &&
                          styles.formInputFocus),
                        ...(errors.phone && styles.formInputError),
                        ...(phoneStatus === "valid" && styles.formInputValid),
                      }}
                      value={formData.phone}
                      onChange={(e) =>
                        handleInputChange("phone", e.target.value)
                      }
                      onFocus={() => handleFocus("phone")}
                      onBlur={() => handleBlur("phone")}
                    />
                    {errors.phone && (
                      <span style={styles.errorText}>⚠️ {errors.phone}</span>
                    )}
                    {phoneStatus === "valid" && (
                      <div
                        style={{
                          ...styles.statusIndicator,
                          ...styles.validStatus,
                        }}
                      >
                        ✓ Valid mobile number
                      </div>
                    )}
                    {phoneStatus === "invalid" && formData.phone && (
                      <div
                        style={{
                          ...styles.statusIndicator,
                          ...styles.invalidStatus,
                        }}
                      >
                        ✗ Invalid mobile number
                      </div>
                    )}
                  </div>

                  <div style={styles.formGroup}>
                    <label style={styles.formLabel}>
                      Service <span style={styles.requiredStar}>*</span>
                    </label>
                    <select
                      style={{
                        ...styles.formSelect,
                        ...(hoverStates.formFocus.service &&
                          styles.formInputFocus),
                        ...(errors.service && styles.formInputError),
                      }}
                      value={formData.service}
                      onChange={(e) =>
                        handleInputChange("service", e.target.value)
                      }
                      onFocus={() => handleFocus("service")}
                      onBlur={() => handleBlur("service")}
                    >
                      <option value="">Select service</option>
                      <option value="medicine-delivery">
                        Medicine Delivery
                      </option>
                      <option value="doctor-consultation">
                        Doctor Consultation
                      </option>
                      <option value="both">Both Services</option>
                    </select>
                    {errors.service && (
                      <span style={styles.errorText}>⚠️ {errors.service}</span>
                    )}
                  </div>
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>
                    {formData.service === "medicine-delivery"
                      ? "Medicine Details *"
                      : formData.service === "doctor-consultation"
                      ? "Symptoms Description *"
                      : "Service Details *"}
                  </label>
                  <textarea
                    placeholder={
                      formData.service === "medicine-delivery"
                        ? "Medicine names, prescription details..."
                        : formData.service === "doctor-consultation"
                        ? "Describe your symptoms and concerns..."
                        : "Tell us about the services you need..."
                    }
                    style={{
                      ...styles.formTextarea,
                      ...(hoverStates.formFocus.message &&
                        styles.formInputFocus),
                      ...(errors.message && styles.formInputError),
                    }}
                    value={formData.message}
                    onChange={(e) =>
                      handleInputChange("message", e.target.value)
                    }
                    onFocus={() => handleFocus("message")}
                    onBlur={() => handleBlur("message")}
                  />
                  {errors.message && (
                    <span style={styles.errorText}>⚠️ {errors.message}</span>
                  )}
                </div>

                <button
                  type="submit"
                  style={{
                    ...styles.submitButton,
                    ...(hoverStates.submitButton &&
                      !isSubmitting &&
                      styles.submitButtonHover),
                    ...(isSubmitting && styles.submitButtonDisabled),
                  }}
                  disabled={isSubmitting}
                  onMouseEnter={() =>
                    !isSubmitting &&
                    setHoverStates((prev) => ({ ...prev, submitButton: true }))
                  }
                  onMouseLeave={() =>
                    !isSubmitting &&
                    setHoverStates((prev) => ({ ...prev, submitButton: false }))
                  }
                >
                  {isSubmitting
                    ? "Processing Request..."
                    : "Get Quick Service Now"}
                </button>
              </form>
            </div>
          </div>

          {/* Right Side - Medical Animations */}
          <div style={styles.animationSection}>
            <div
              style={styles.animationContainer}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow =
                  "0 20px 50px rgba(124, 42, 98, 0.2)";
                e.currentTarget.style.borderColor = "#7C2A62";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 15px 40px rgba(124, 42, 98, 0.15)";
                e.currentTarget.style.borderColor = "transparent";
              }}
            >
              {/* Real-time Animation */}
              {renderRealTimeAnimation()}

              <div>
                <h3 style={styles.animationTitle}>
                  {currentAnimationData.title}
                </h3>
                <p style={styles.animationDescription}>
                  {currentAnimationData.description}
                </p>

                <div style={styles.featuresGrid}>
                  {currentAnimationData.features.map((feature, index) => (
                    <div key={index} style={styles.featureItem}>
                      {feature}
                    </div>
                  ))}
                </div>
              </div>

              <div style={styles.animationIndicators}>
                {medicalAnimations.map((_, index) => (
                  <div
                    key={index}
                    style={{
                      ...styles.animationIndicator,
                      ...(index === currentAnimation && styles.activeIndicator),
                    }}
                    onClick={() => handleAnimationChange(index)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes pulse {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
        }

        @keyframes deliveryMove {
          0% {
            left: -50px;
          }
          100% {
            left: 100%;
          }
        }

        @keyframes ripple {
          0% {
            width: 0;
            height: 0;
            opacity: 1;
          }
          100% {
            width: 200px;
            height: 200px;
            opacity: 0;
          }
        }

        @keyframes emergencyMove {
          0%,
          100% {
            transform: translate(-50%, -50%) translateX(0);
          }
          25% {
            transform: translate(-50%, -50%) translateX(-5px);
          }
          75% {
            transform: translate(-50%, -50%) translateX(5px);
          }
        }

        @keyframes heartbeat {
          0%,
          100% {
            transform: scaleX(0.3);
            opacity: 0.3;
          }
          25% {
            transform: scaleX(1);
            opacity: 0.7;
          }
          50% {
            transform: scaleX(0.5);
            opacity: 0.5;
          }
          75% {
            transform: scaleX(0.8);
            opacity: 0.6;
          }
        }
      `}</style>
    </section>
  );
};

export default Contact;
