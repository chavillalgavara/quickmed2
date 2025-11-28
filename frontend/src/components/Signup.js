// import React, { useState, useEffect } from 'react';

// const Signup = ({ onSwitchToLogin, onSignupSuccess, onBackToHome }) => {
//   const [formData, setFormData] = useState({
//     fullName: '',
//     email: '',
//     phone: '',
//     password: '',
//     confirmPassword: '',
//     userType: 'user'
//   });
//   const [formErrors, setFormErrors] = useState({
//     fullName: '',
//     email: '',
//     phone: '',
//     password: '',
//     confirmPassword: ''
//   });
//   const [showToast, setShowToast] = useState(false);
//   const [toastMessage, setToastMessage] = useState('');
//   const [toastType, setToastType] = useState('success');
//   const [isLoading, setIsLoading] = useState(false);
//   const [agreeToTerms, setAgreeToTerms] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [isMobile, setIsMobile] = useState(false);
//   const [isTablet, setIsTablet] = useState(false);

//   const userTypes = [
//     {
//       type: 'user',
//       label: 'User',
//       image: 'https://media.istockphoto.com/id/1140560047/photo/customer-in-pharmacy-holding-medicine-bottle-woman-reading-the-label-text-about-medical.jpg?s=612x612&w=0&k=20&c=IeZusngtnu-o4olnwAE62nk2Xcsj7xjtA4OopAubsdc=',
//       quote: 'Access healthcare services, medicine delivery, and doctor consultations with ease.',
//       title: 'Patient & Customer'
//     },
//     {
//       type: 'vendor',
//       label: 'Vendor',
//       image: 'https://plus.unsplash.com/premium_photo-1672759453651-c6834f55c4f6?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEyfHx8ZW58MHx8fHx8&auto=format&fit=crop&q=60&w=600',
//       quote: 'Manage your medical inventory efficiently and reach more customers through our platform.',
//       title: 'Vendor Management'
//     },
//     {
//       type: 'delivery',
//       label: 'Delivery',
//       image: 'https://media.istockphoto.com/id/1325274795/photo/black-delivery-man-in-mask-giving-cardboard-box-to-woman.jpg?s=612x612&w=0&k=20&c=CpkYYHqfz0vt166SMCHXyA0CRdnyOAmyniAcp171ZXw=',
//       quote: 'Join our network of healthcare heroes delivering medicines and supplies to those in need.',
//       title: 'Medical Delivery'
//     },
//     {
//       type: 'doctor',
//       label: 'Doctor',
//       image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
//       quote: 'Expand your practice and provide exceptional care through our telemedicine platform.',
//       title: 'Healthcare Professional'
//     }
//   ];

//   const currentUserType = userTypes.find(user => user.type === formData.userType);

//   // Handle responsive layout and initialize userType
//   useEffect(() => {
//     const handleResize = () => {
//       const width = window.innerWidth;
//       setIsMobile(width <= 768);
//       setIsTablet(width > 768 && width <= 1024);
//     };

//     handleResize();
//     window.addEventListener('resize', handleResize);

//     // Initialize userType from localStorage if available
//     const lastSelected = localStorage.getItem('lastSelectedUserType');
//     if (lastSelected) {
//       setFormData(prev => ({
//         ...prev,
//         userType: lastSelected
//       }));
//     }

//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   // Generate floating elements for bubble animation
//   const floatingElements = Array.from({ length: isMobile ? 8 : 15 }, (_, i) => ({
//     id: i,
//     size: Math.random() * (isMobile ? 50 : 100) + (isMobile ? 30 : 50),
//     left: Math.random() * 100,
//     top: Math.random() * 100,
//     animationDelay: Math.random() * 5,
//   }));

//   // Validation functions
//   const validateName = (name) => {
//     const nameRegex = /^[A-Za-z\s]{2,}$/;
//     if (!name.trim()) return 'Full name is required';
//     if (!nameRegex.test(name)) return 'Name should contain only alphabets and spaces (min 2 characters)';
//     return '';
//   };

//   const validateEmail = (email) => {
//     const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
//     if (!email.trim()) return 'Email is required';
//     if (!emailRegex.test(email)) return 'Please enter a valid email address (e.g., example@gmail.com)';
//     return '';
//   };

//   const validatePhone = (phone) => {
//     const phoneRegex = /^[6-9]\d{9}$/;
//     if (!phone.trim()) return 'Phone number is required';
//     if (!phoneRegex.test(phone)) return 'Please enter a valid phone number';
//     return '';
//   };

//   const validatePassword = (password) => {
//     const minLength = 8;
//     const hasUpperCase = /[A-Z]/.test(password);
//     const hasLowerCase = /[a-z]/.test(password);
//     const hasNumbers = /\d/.test(password);
//     const hasSpecialChar = /[!@#$%^&*]/.test(password);

//     return password.length >= minLength && hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar;
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     // Apply input restrictions based on field type
//     let processedValue = value;

//     if (name === 'fullName') {
//       // Only allow letters and spaces
//       processedValue = value.replace(/[^A-Za-z\s]/g, '');
//     } else if (name === 'phone') {
//       // Only allow numbers and limit to 10 digits
//       processedValue = value.replace(/\D/g, '').slice(0, 10);
//     }

//     setFormData({
//       ...formData,
//       [name]: processedValue
//     });

//     // Clear error when user starts typing
//     if (formErrors[name]) {
//       setFormErrors({
//         ...formErrors,
//         [name]: ''
//       });
//     }
//   };

//   const handleBlur = (e) => {
//     const { name, value } = e.target;
//     let error = '';

//     switch (name) {
//       case 'fullName':
//         error = validateName(value);
//         break;
//       case 'email':
//         error = validateEmail(value);
//         break;
//       case 'phone':
//         error = validatePhone(value);
//         break;
//       case 'password':
//         if (value && !validatePassword(value)) {
//           error = 'Password must be 8+ characters with uppercase, lowercase, number & special character';
//         }
//         break;
//       case 'confirmPassword':
//         if (value && value !== formData.password) {
//           error = 'Passwords do not match';
//         }
//         break;
//       default:
//         break;
//     }

//     setFormErrors({
//       ...formErrors,
//       [name]: error
//     });
//   };

//   // Handle user type change
//   const handleUserTypeChange = (newUserType) => {
//     setFormData({
//       ...formData,
//       userType: newUserType
//     });
//     // Store the selected user type
//     localStorage.setItem('lastSelectedUserType', newUserType);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);

//     // Validate all fields before submission
//     const nameError = validateName(formData.fullName);
//     const emailError = validateEmail(formData.email);
//     const phoneError = validatePhone(formData.phone);
//     const passwordError = formData.password && !validatePassword(formData.password)
//       ? 'Password must be 8+ characters with uppercase, lowercase, number & special character'
//       : '';
//     const confirmPasswordError = formData.confirmPassword && formData.password !== formData.confirmPassword
//       ? 'Passwords do not match'
//       : '';

//     const errors = {
//       fullName: nameError,
//       email: emailError,
//       phone: phoneError,
//       password: passwordError,
//       confirmPassword: confirmPasswordError
//     };

//     setFormErrors(errors);

//     // Check if there are any errors
//     const hasErrors = Object.values(errors).some(error => error !== '');

//     if (hasErrors) {
//       setToastMessage('Please fix the errors in the form');
//       setToastType('error');
//       setShowToast(true);
//       setIsLoading(false);
//       setTimeout(() => setShowToast(false), 3000);
//       return;
//     }

//     if (!agreeToTerms) {
//       setToastMessage('Please agree to the Terms of Service and Privacy Policy');
//       setToastType('error');
//       setShowToast(true);
//       setIsLoading(false);
//       setTimeout(() => setShowToast(false), 3000);
//       return;
//     }

//     // simulate async (keep your behavior)
//     await new Promise(resolve => setTimeout(resolve, 1000));

//     const storedUsers = localStorage.getItem('registeredUsers');
//     const existingUsers = storedUsers ? JSON.parse(storedUsers) : [];

//     const userExists = existingUsers.find(user =>
//       user.email === formData.email || user.phone === formData.phone
//     );

//     if (userExists) {
//       setToastMessage('User already exists with this email or phone');
//       setToastType('error');
//       setShowToast(true);
//       setIsLoading(false);
//       setTimeout(() => setShowToast(false), 3000);
//       return;
//     }

//     const newUser = {
//       id: Date.now(),
//       ...formData,
//       createdAt: new Date().toISOString()
//     };

//     const updatedUsers = [...existingUsers, newUser];
//     localStorage.setItem('registeredUsers', JSON.stringify(updatedUsers));

//     // Store the recent signup type for login page
//     localStorage.setItem('recentSignupType', formData.userType);
//     localStorage.setItem('lastSelectedUserType', formData.userType);

//     setToastMessage(`Account created! Welcome ${formData.fullName}`);
//     setToastType('success');
//     setShowToast(true);

//     // reset form like before
//     setFormData({
//       fullName: '',
//       email: '',
//       phone: '',
//       password: '',
//       confirmPassword: '',
//       userType: formData.userType // Keep the same user type
//     });
//     setFormErrors({
//       fullName: '',
//       email: '',
//       phone: '',
//       password: '',
//       confirmPassword: ''
//     });
//     setAgreeToTerms(false);
//     setShowPassword(false);
//     setShowConfirmPassword(false);

//     setTimeout(() => {
//       setShowToast(false);
//       if (onSignupSuccess) {
//         onSignupSuccess();
//       }
//     }, 2000);

//     setIsLoading(false);
//   };

//   const passwordStrength = validatePassword(formData.password) ? 'strong' : 'weak';

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   const toggleConfirmPasswordVisibility = () => {
//     setShowConfirmPassword(!showConfirmPassword);
//   };

//   // Eye icon SVG components
//   const EyeIcon = () => (
//     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//       <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
//       <circle cx="12" cy="12" r="3"></circle>
//     </svg>
//   );

//   const EyeOffIcon = () => (
//     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//       <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
//       <line x1="1" y1="1" x2="23" y2="23"></line>
//     </svg>
//   );

//   return (
//     <div style={{
//       minHeight: '100vh',
//       display: 'flex',
//       justifyContent: 'center',
//       alignItems: 'center',
//       fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
//       background: 'linear-gradient(135deg, #F7D9EB 0%, #ffffff 50%, #F7D9EB 100%)',
//       padding: isMobile ? '10px' : '20px',
//       position: 'relative',
//       overflow: 'hidden'
//     }}>

//       {/* Bubble Animation Background */}
//       <div style={{
//         position: 'absolute',
//         top: 0,
//         left: 0,
//         width: '100%',
//         height: '100%',
//         pointerEvents: 'none',
//         zIndex: 1,
//       }}>
//         {floatingElements.map((element) => (
//           <div
//             key={element.id}
//             style={{
//               position: 'absolute',
//               background: 'rgba(124, 42, 98, 0.1)',
//               borderRadius: '50%',
//               animation: 'float 6s ease-in-out infinite',
//               width: element.size,
//               height: element.size,
//               left: `${element.left}%`,
//               top: `${element.top}%`,
//               animationDelay: `${element.animationDelay}s`,
//             }}
//           />
//         ))}
//       </div>

//       {/* Back to Home Button */}
//       <button
//         onClick={onBackToHome}
//         style={{
//           position: isMobile ? 'fixed' : 'absolute',
//           top: isMobile ? '16px' : '20px',
//           left: isMobile ? '16px' : '20px',
//           padding: isMobile ? '8px 16px' : '10px 20px',
//           backgroundColor: 'white',
//           color: '#7C2A62',
//           border: '2px solid #7C2A62',
//           borderRadius: '8px',
//           fontSize: isMobile ? '12px' : '14px',
//           fontWeight: '500',
//           cursor: 'pointer',
//           transition: 'all 0.3s ease',
//           boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
//           zIndex: 10,
//           opacity: isLoading ? 0.7 : 1
//         }}
//         disabled={isLoading}
//         onMouseOver={(e) => !isLoading && (e.target.style.backgroundColor = '#7C2A62', e.target.style.color = 'white')}
//         onMouseOut={(e) => !isLoading && (e.target.style.backgroundColor = 'white', e.target.style.color = '#7C2A62')}
//       >
//         ← Back to Home
//       </button>

//       {showToast && (
//         <div style={{
//           position: 'fixed',
//           top: isMobile ? '10px' : '20px',
//           right: isMobile ? '10px' : '20px',
//           left: isMobile ? '10px' : 'auto',
//           backgroundColor: toastType === 'success' ? '#10B981' : '#EF4444',
//           color: 'white',
//           padding: '12px 20px',
//           borderRadius: '8px',
//           boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
//           zIndex: 1000,
//           animation: 'slideInRight 0.3s ease-out',
//           fontSize: isMobile ? '12px' : '14px',
//           fontWeight: '500',
//           textAlign: 'center'
//         }}>
//           {toastType === 'success' ? '✅ ' : '❌ '}{toastMessage}
//         </div>
//       )}

//       {/* Main Card Container */}
//       <div style={{
//         display: 'flex',
//         width: '100%',
//         maxWidth: isMobile ? '100%' : isTablet ? '95%' : '1100px',
//         backgroundColor: 'white',
//         borderRadius: '16px',
//         boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
//         overflow: 'hidden',
//         minHeight: isMobile ? 'auto' : '650px',
//         flexDirection: isMobile ? 'column' : 'row',
//         marginTop: isMobile ? '60px' : '0',
//         position: 'relative',
//         zIndex: 2
//       }}>

//         {/* Left Side - Dynamic Content */}
//         <div style={{
//           flex: isMobile ? '0 0 auto' : 1,
//           background: `linear-gradient(135deg, #7C2A62 0%, #5a1a4a 100%)`,
//           color: 'white',
//           padding: isMobile ? '30px 20px' : isTablet ? '30px' : '40px',
//           display: 'flex',
//           flexDirection: 'column',
//           justifyContent: 'center',
//           position: 'relative',
//           overflow: 'hidden',
//           minHeight: isMobile ? '280px' : 'auto'
//         }}>
//           <div style={{
//             position: 'absolute',
//             top: 0,
//             left: 0,
//             right: 0,
//             bottom: 0,
//             backgroundImage: `url(${currentUserType.image})`,
//             backgroundSize: 'cover',
//             backgroundPosition: 'center',
//             opacity: 0.15
//           }} />

//           <div style={{
//             position: 'relative',
//             zIndex: 2,
//             textAlign: 'center'
//           }}>
//             <div style={{
//               fontSize: isMobile ? '36px' : '48px',
//               marginBottom: isMobile ? '15px' : '20px',
//               opacity: 0.9
//             }}>
//               {formData.userType === 'user'}
//               {formData.userType === 'vendor'}
//               {formData.userType === 'delivery' }
//               {formData.userType === 'doctor'}
//             </div>

//             <h2 style={{
//               fontSize: isMobile ? '20px' : isTablet ? '24px' : '28px',
//               fontWeight: '700',
//               marginBottom: isMobile ? '12px' : '16px',
//               lineHeight: '1.3'
//             }}>
//               {currentUserType.title}
//             </h2>

//             <p style={{
//               fontSize: isMobile ? '13px' : '16px',
//               lineHeight: '1.6',
//               opacity: 0.9,
//               marginBottom: isMobile ? '20px' : '30px',
//               maxWidth: isMobile ? '100%' : '400px',
//               marginLeft: 'auto',
//               marginRight: 'auto',
//               padding: isMobile ? '0 10px' : '0'
//             }}>
//               {currentUserType.quote}
//             </p>

//             <div style={{
//               display: 'flex',
//               justifyContent: 'center',
//               gap: '6px',
//               flexWrap: 'wrap',
//               flexDirection: isMobile ? 'row' : 'row'
//             }}>
//               {userTypes.map((user) => (
//                 <button
//                   key={user.type}
//                   type="button"
//                   onClick={() => handleUserTypeChange(user.type)}
//                   style={{
//                     padding: isMobile ? '8px 12px' : '10px 16px',
//                     border: `2px solid ${formData.userType === user.type ? 'white' : 'rgba(255,255,255,0.3)'}`,
//                     borderRadius: '8px',
//                     backgroundColor: formData.userType === user.type ? 'rgba(255,255,255,0.2)' : 'transparent',
//                     color: 'white',
//                     fontWeight: '500',
//                     cursor: 'pointer',
//                     fontSize: isMobile ? '11px' : '12px',
//                     display: 'flex',
//                     alignItems: 'center',
//                     gap: '6px',
//                     transition: 'all 0.3s ease',
//                     minWidth: isMobile ? '70px' : 'auto',
//                     opacity: isLoading ? 0.7 : 1
//                   }}
//                   disabled={isLoading}
//                 >
//                   <span style={{ fontSize: isMobile ? '14px' : '16px' }}>
//                     {user.type === 'user' && '👤'}
//                     {user.type === 'vendor' && '🏪'}
//                     {user.type === 'delivery' && '🚚'}
//                     {user.type === 'doctor' && '👨‍⚕️'}
//                   </span>
//                   <span>{user.label}</span>
//                 </button>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Right Side - Signup Form */}
//         <div style={{
//           flex: isMobile ? '1 1 auto' : 1,
//           padding: isMobile ? '25px 20px' : isTablet ? '35px 30px' : '40px',
//           display: 'flex',
//           flexDirection: 'column',
//           justifyContent: 'center',
//           overflowY: 'auto'
//         }}>
//           <div style={{
//             textAlign: 'center',
//             marginBottom: isMobile ? '20px' : '30px'
//           }}>
//             <h1 style={{
//               fontSize: isMobile ? '24px' : isTablet ? '28px' : '32px',
//               fontWeight: '700',
//               marginBottom: '6px',
//               color: '#7C2A62',
//               letterSpacing: '0.5px'
//             }}>
//               QUICKMED
//             </h1>
//             <h2 style={{
//               color: '#333333',
//               fontSize: isMobile ? '18px' : isTablet ? '22px' : '24px',
//               fontWeight: '600',
//               marginBottom: '4px'
//             }}>
//               Create Account
//             </h2>
//           </div>

//           <form onSubmit={handleSubmit}>
//             {/* Full Name Field */}
//             <div style={{ marginBottom: isMobile ? '14px' : '16px', textAlign: 'left' }}>
//               <label style={{
//                 display: 'block',
//                 marginBottom: '6px',
//                 fontWeight: '500',
//                 color: '#333333',
//                 fontSize: isMobile ? '12px' : '13px'
//               }}>
//                 Full Name
//               </label>
//               <input
//                 type="text"
//                 name="fullName"
//                 value={formData.fullName}
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//                 required
//                 placeholder="Enter your full name"
//                 style={{
//                   width: '100%',
//                   padding: isMobile ? '12px 14px' : '12px 14px',
//                   border: `1px solid ${formErrors.fullName ? '#EF4444' : '#D1D5DB'}`,
//                   borderRadius: '8px',
//                   fontSize: isMobile ? '14px' : '14px',
//                   boxSizing: 'border-box',
//                   outline: 'none',
//                   transition: 'border-color 0.2s ease',
//                   color: '#333333'
//                 }}
//                 onFocus={(e) => e.target.style.borderColor = '#7C2A62'}
//                 disabled={isLoading}
//               />
//               {formErrors.fullName && (
//                 <div style={{
//                   marginTop: '4px',
//                   fontSize: isMobile ? '10px' : '11px',
//                   color: '#EF4444',
//                   fontWeight: '500'
//                 }}>
//                   {formErrors.fullName}
//                 </div>
//               )}
//             </div>

//             {/* Email Field */}
//             <div style={{ marginBottom: isMobile ? '14px' : '16px', textAlign: 'left' }}>
//               <label style={{
//                 display: 'block',
//                 marginBottom: '6px',
//                 fontWeight: '500',
//                 color: '#333333',
//                 fontSize: isMobile ? '12px' : '13px'
//               }}>
//                 Email Address
//               </label>
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//                 required
//                 placeholder="Enter your email"
//                 style={{
//                   width: '100%',
//                   padding: isMobile ? '12px 14px' : '12px 14px',
//                   border: `1px solid ${formErrors.email ? '#EF4444' : '#D1D5DB'}`,
//                   borderRadius: '8px',
//                   fontSize: isMobile ? '14px' : '14px',
//                   boxSizing: 'border-box',
//                   outline: 'none',
//                   transition: 'border-color 0.2s ease',
//                   color: '#333333'
//                 }}
//                 onFocus={(e) => e.target.style.borderColor = '#7C2A62'}
//                 disabled={isLoading}
//               />
//               {formErrors.email && (
//                 <div style={{
//                   marginTop: '4px',
//                   fontSize: isMobile ? '10px' : '11px',
//                   color: '#EF4444',
//                   fontWeight: '500'
//                 }}>
//                   {formErrors.email}
//                 </div>
//               )}
//             </div>

//             {/* Phone Number Field */}
//             <div style={{ marginBottom: isMobile ? '14px' : '16px', textAlign: 'left' }}>
//               <label style={{
//                 display: 'block',
//                 marginBottom: '6px',
//                 fontWeight: '500',
//                 color: '#333333',
//                 fontSize: isMobile ? '12px' : '13px'
//               }}>
//                 Phone Number
//               </label>
//               <input
//                 type="tel"
//                 name="phone"
//                 value={formData.phone}
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//                 required
//                 placeholder="Enter your 10-digit phone number"
//                 style={{
//                   width: '100%',
//                   padding: isMobile ? '12px 14px' : '12px 14px',
//                   border: `1px solid ${formErrors.phone ? '#EF4444' : '#D1D5DB'}`,
//                   borderRadius: '8px',
//                   fontSize: isMobile ? '14px' : '14px',
//                   boxSizing: 'border-box',
//                   outline: 'none',
//                   transition: 'border-color 0.2s ease',
//                   color: '#333333'
//                 }}
//                 onFocus={(e) => e.target.style.borderColor = '#7C2A62'}
//                 disabled={isLoading}
//               />
//               {formErrors.phone && (
//                 <div style={{
//                   marginTop: '4px',
//                   fontSize: isMobile ? '10px' : '11px',
//                   color: '#EF4444',
//                   fontWeight: '500'
//                 }}>
//                   {formErrors.phone}
//                 </div>
//               )}
//             </div>

//             {/* Password Field */}
//             <div style={{ marginBottom: isMobile ? '14px' : '16px', textAlign: 'left' }}>
//               <label style={{
//                 display: 'block',
//                 marginBottom: '6px',
//                 fontWeight: '500',
//                 color: '#333333',
//                 fontSize: isMobile ? '12px' : '13px'
//               }}>
//                 Password
//               </label>
//               <div style={{ position: 'relative' }}>
//                 <input
//                   type={showPassword ? 'text' : 'password'}
//                   name="password"
//                   value={formData.password}
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                   required
//                   placeholder="Create a strong password"
//                   style={{
//                     width: '100%',
//                     padding: isMobile ? '12px 45px 12px 14px' : '12px 45px 12px 14px',
//                     border: `1px solid ${formErrors.password ? '#EF4444' : '#D1D5DB'}`,
//                     borderRadius: '8px',
//                     fontSize: isMobile ? '14px' : '14px',
//                     boxSizing: 'border-box',
//                     outline: 'none',
//                     transition: 'border-color 0.2s ease',
//                     color: '#333333'
//                   }}
//                   onFocus={(e) => e.target.style.borderColor = '#7C2A62'}
//                   disabled={isLoading}
//                 />
//                 <button
//                   type="button"
//                   onClick={togglePasswordVisibility}
//                   style={{
//                     position: 'absolute',
//                     right: '12px',
//                     top: '50%',
//                     transform: 'translateY(-50%)',
//                     background: 'none',
//                     border: 'none',
//                     cursor: 'pointer',
//                     color: '#666',
//                     padding: '4px',
//                     borderRadius: '4px',
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     width: '30px',
//                     height: '30px',
//                     opacity: isLoading ? 0.7 : 1
//                   }}
//                   disabled={isLoading}
//                 >
//                   {showPassword ? <EyeOffIcon /> : <EyeIcon />}
//                 </button>
//               </div>
//               {formData.password && !formErrors.password && (
//                 <div style={{
//                   marginTop: '4px',
//                   fontSize: isMobile ? '10px' : '11px',
//                   color: passwordStrength === 'strong' ? '#10B981' : '#EF4444',
//                   fontWeight: '500'
//                 }}>
//                   {passwordStrength === 'strong' ? '✓ Strong password' : '✗ Weak password'}
//                 </div>
//               )}
//               {formErrors.password && (
//                 <div style={{
//                   marginTop: '4px',
//                   fontSize: isMobile ? '10px' : '11px',
//                   color: '#EF4444',
//                   fontWeight: '500'
//                 }}>
//                   {formErrors.password}
//                 </div>
//               )}
//             </div>

//             {/* Confirm Password Field */}
//             <div style={{ marginBottom: isMobile ? '18px' : '20px', textAlign: 'left' }}>
//               <label style={{
//                 display: 'block',
//                 marginBottom: '6px',
//                 fontWeight: '500',
//                 color: '#333333',
//                 fontSize: isMobile ? '12px' : '13px'
//               }}>
//                 Confirm Password
//               </label>
//               <div style={{ position: 'relative' }}>
//                 <input
//                   type={showConfirmPassword ? 'text' : 'password'}
//                   name="confirmPassword"
//                   value={formData.confirmPassword}
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                   required
//                   placeholder="Confirm your password"
//                   style={{
//                     width: '100%',
//                     padding: isMobile ? '12px 45px 12px 14px' : '12px 45px 12px 14px',
//                     border: `1px solid ${formErrors.confirmPassword ? '#EF4444' : '#D1D5DB'}`,
//                     borderRadius: '8px',
//                     fontSize: isMobile ? '14px' : '14px',
//                     boxSizing: 'border-box',
//                     outline: 'none',
//                     transition: 'border-color 0.2s ease',
//                     color: '#333333'
//                   }}
//                   onFocus={(e) => e.target.style.borderColor = '#7C2A62'}
//                   disabled={isLoading}
//                 />
//                 <button
//                   type="button"
//                   onClick={toggleConfirmPasswordVisibility}
//                   style={{
//                     position: 'absolute',
//                     right: '12px',
//                     top: '50%',
//                     transform: 'translateY(-50%)',
//                     background: 'none',
//                     border: 'none',
//                     cursor: 'pointer',
//                     color: '#666',
//                     padding: '4px',
//                     borderRadius: '4px',
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     width: '30px',
//                     height: '30px',
//                     opacity: isLoading ? 0.7 : 1
//                   }}
//                   disabled={isLoading}
//                 >
//                   {showConfirmPassword ? <EyeOffIcon /> : <EyeIcon />}
//                 </button>
//               </div>
//               {formErrors.confirmPassword && (
//                 <div style={{
//                   marginTop: '4px',
//                   fontSize: isMobile ? '10px' : '11px',
//                   color: '#EF4444',
//                   fontWeight: '500'
//                 }}>
//                   {formErrors.confirmPassword}
//                 </div>
//               )}
//             </div>

//             {/* Terms and Conditions Checkbox */}
//             <div style={{ marginBottom: isMobile ? '18px' : '20px', textAlign: 'left' }}>
//               <label style={{
//                 display: 'flex',
//                 alignItems: 'flex-start',
//                 gap: '8px',
//                 cursor: 'pointer',
//                 fontSize: isMobile ? '12px' : '13px',
//                 color: '#333333'
//               }}>
//                 <input
//                   type="checkbox"
//                   checked={agreeToTerms}
//                   onChange={(e) => setAgreeToTerms(e.target.checked)}
//                   style={{
//                     marginTop: '2px',
//                     width: isMobile ? '14px' : '16px',
//                     height: isMobile ? '14px' : '16px'
//                   }}
//                   disabled={isLoading}
//                 />
//                 <span>
//                   I agree to the{' '}
//                   <a
//                     href="https://drive.google.com/file/d/1bZkQuNNdVootx27yQ0lMbIpqn83oIrYn/view?usp=sharing"
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     style={{
//                       color: '#7C2A62',
//                       fontWeight: '500',
//                       cursor: 'pointer',
//                       textDecoration: 'underline'
//                     }}
//                   >
//                     Terms of Service
//                   </a>{' '}
//                   and{' '}
//                   <a
//                     href="https://drive.google.com/file/d/1D3PHKle-WG-A9sJv2f4O2ZjBzoGaKLzo/view?usp=sharing"
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     style={{
//                       color: '#7C2A62',
//                       fontWeight: '500',
//                       cursor: 'pointer',
//                       textDecoration: 'underline'
//                     }}
//                   >
//                     Privacy Policy
//                   </a>
//                 </span>
//               </label>
//             </div>

//             <button
//               type="submit"
//               disabled={isLoading}
//               style={{
//                 width: '100%',
//                 padding: isMobile ? '12px' : '14px',
//                 backgroundColor: '#7C2A62',
//                 color: 'white',
//                 border: 'none',
//                 borderRadius: '8px',
//                 fontSize: isMobile ? '14px' : '16px',
//                 fontWeight: '600',
//                 cursor: 'pointer',
//                 transition: 'all 0.3s ease',
//                 opacity: isLoading ? 0.7 : 1,
//                 marginBottom: isMobile ? '18px' : '20px',
//                 boxShadow: '0 4px 12px rgba(124, 42, 98, 0.3)'
//               }}
//               onMouseOver={(e) => !isLoading && (e.target.style.backgroundColor = '#5a1a4a')}
//               onMouseOut={(e) => !isLoading && (e.target.style.backgroundColor = '#7C2A62')}
//             >
//               {isLoading ? 'Creating Account...' : `Join as ${currentUserType.label}`}
//             </button>
//           </form>

//           <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
//             <p style={{
//               color: '#666666',
//               fontSize: isMobile ? '12px' : '14px',
//               textAlign: 'center',
//               margin: 0
//             }}>
//               Already have an account? <span
//                 onClick={() => !isLoading && onSwitchToLogin()}
//                 style={{
//                   color: '#7C2A62',
//                   fontWeight: '600',
//                   cursor: 'pointer',
//                   padding: '2px 6px',
//                   borderRadius: '4px',
//                   transition: 'all 0.2s ease'
//                 }}
//                 onMouseOver={(e) => !isLoading && (e.target.style.color = '#5a1a4a', e.target.style.backgroundColor = '#F7D9EB')}
//                 onMouseOut={(e) => !isLoading && (e.target.style.color = '#7C2A62', e.target.style.backgroundColor = 'transparent')}
//               >
//                 Sign in
//               </span>
//             </p>
//           </div>
//         </div>
//       </div>

//       <style>
//         {`
//           @keyframes float {
//             0%, 100% {
//               transform: translateY(0) rotate(0deg);
//             }
//             33% {
//               transform: translateY(-20px) rotate(120deg);
//             }
//             66% {
//               transform: translateY(20px) rotate(240deg);
//             }
//           }

//           @keyframes slideInRight {
//             from {
//               transform: translateX(100%);
//               opacity: 0;
//             }
//             to {
//               transform: translateX(0);
//               opacity: 1;
//             }
//           }

//           @keyframes pulse {
//             0% { opacity: 1; }
//             50% { opacity: 0.7; }
//             100% { opacity: 1; }
//           }

//           button:disabled {
//             animation: pulse 1.5s ease-in-out infinite;
//             cursor: not-allowed;
//           }

//           /* Mobile-specific improvements */
//           @media (max-width: 768px) {
//             input, button {
//               font-size: 16px; /* Prevents zoom on iOS */
//             }

//             button, [role="button"] {
//               min-height: 44px;
//               min-width: 44px;
//             }
//           }

//           /* Tablet optimizations */
//           @media (min-width: 769px) and (max-width: 1024px) {
//             .signup-container {
//               max-width: 95%;
//               margin: 20px auto;
//             }
//           }

//           /* Large desktop enhancements */
//           @media (min-width: 1200px) {
//             .signup-container {
//               max-width: 1100px;
//             }
//           }
//         `}
//       </style>
//     </div>
//   );
// };

// export default Signup;

import React, { useState, useEffect } from "react";

const Signup = ({ onSwitchToLogin, onSignupSuccess, onBackToHome }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    userType: "user",
  });
  const [formErrors, setFormErrors] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");
  const [isLoading, setIsLoading] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  const userTypes = [
    {
      type: "user",
      label: "User",
      image:
        "https://media.istockphoto.com/id/1140560047/photo/customer-in-pharmacy-holding-medicine-bottle-woman-reading-the-label-text-about-medical.jpg?s=612x612&w=0&k=20&c=IeZusngtnu-o4olnwAE62nk2Xcsj7xjtA4OopAubsdc=",
      quote:
        "Access healthcare services, medicine delivery, and doctor consultations with ease.",
      title: "Patient & Customer",
    },
    {
      type: "vendor",
      label: "Vendor",
      image:
        "https://plus.unsplash.com/premium_photo-1672759453651-c6834f55c4f6?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEyfHx8ZW58MHx8fHx8&auto=format&fit=crop&q=60&w=600",
      quote:
        "Manage your medical inventory efficiently and reach more customers through our platform.",
      title: "Vendor Management",
    },
    {
      type: "delivery",
      label: "Delivery",
      image:
        "https://media.istockphoto.com/id/1325274795/photo/black-delivery-man-in-mask-giving-cardboard-box-to-woman.jpg?s=612x612&w=0&k=20&c=CpkYYHqfz0vt166SMCHXyA0CRdnyOAmyniAcp171ZXw=",
      quote:
        "Join our network of healthcare heroes delivering medicines and supplies to those in need.",
      title: "Medical Delivery",
    },
    {
      type: "doctor",
      label: "Doctor",
      image:
        "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      quote:
        "Expand your practice and provide exceptional care through our telemedicine platform.",
      title: "Healthcare Professional",
    },
  ];

  const currentUserType = userTypes.find(
    (user) => user.type === formData.userType
  );

  // Handle responsive layout and initialize userType
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width <= 768);
      setIsTablet(width > 768 && width <= 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    // Initialize userType from localStorage if available
    const lastSelected = localStorage.getItem("lastSelectedUserType");
    if (lastSelected) {
      setFormData((prev) => ({
        ...prev,
        userType: lastSelected,
      }));
    }

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Generate floating elements for bubble animation
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

  // Validation functions
  const validateName = (name) => {
    const nameRegex = /^[A-Za-z\s]{2,}$/;
    if (!name.trim()) return "Full name is required";
    if (!nameRegex.test(name))
      return "Name should contain only alphabets and spaces (min 2 characters)";
    return "";
  };

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email.trim()) return "Email is required";
    if (!emailRegex.test(email))
      return "Please enter a valid email address (e.g., example@gmail.com)";
    return "";
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phone.trim()) return "Phone number is required";
    if (!phoneRegex.test(phone)) return "Please enter a valid phone number";
    return "";
  };

  const validatePassword = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*]/.test(password);

    return (
      password.length >= minLength &&
      hasUpperCase &&
      hasLowerCase &&
      hasNumbers &&
      hasSpecialChar
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Apply input restrictions based on field type
    let processedValue = value;

    if (name === "fullName") {
      // Only allow letters and spaces
      processedValue = value.replace(/[^A-Za-z\s]/g, "");
    } else if (name === "phone") {
      // Only allow numbers and limit to 10 digits
      processedValue = value.replace(/\D/g, "").slice(0, 10);
    }

    setFormData({
      ...formData,
      [name]: processedValue,
    });

    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: "",
      });
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    let error = "";

    switch (name) {
      case "fullName":
        error = validateName(value);
        break;
      case "email":
        error = validateEmail(value);
        break;
      case "phone":
        error = validatePhone(value);
        break;
      case "password":
        if (value && !validatePassword(value)) {
          error =
            "Password must be 8+ characters with uppercase, lowercase, number & special character";
        }
        break;
      case "confirmPassword":
        if (value && value !== formData.password) {
          error = "Passwords do not match";
        }
        break;
      default:
        break;
    }

    setFormErrors({
      ...formErrors,
      [name]: error,
    });
  };

  // Handle user type change
  const handleUserTypeChange = (newUserType) => {
    setFormData({
      ...formData,
      userType: newUserType,
    });
    // Store the selected user type
    localStorage.setItem("lastSelectedUserType", newUserType);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Validate all fields before submission
    const nameError = validateName(formData.fullName);
    const emailError = validateEmail(formData.email);
    const phoneError = validatePhone(formData.phone);
    const passwordError =
      formData.password && !validatePassword(formData.password)
        ? "Password must be 8+ characters with uppercase, lowercase, number & special character"
        : "";
    const confirmPasswordError =
      formData.confirmPassword && formData.password !== formData.confirmPassword
        ? "Passwords do not match"
        : "";

    const errors = {
      fullName: nameError,
      email: emailError,
      phone: phoneError,
      password: passwordError,
      confirmPassword: confirmPasswordError,
    };

    setFormErrors(errors);

    // Check if there are any errors
    const hasErrors = Object.values(errors).some((error) => error !== "");

    if (hasErrors) {
      setToastMessage("Please fix the errors in the form");
      setToastType("error");
      setShowToast(true);
      setIsLoading(false);
      setTimeout(() => setShowToast(false), 3000);
      return;
    }

    if (!agreeToTerms) {
      setToastMessage(
        "Please agree to the Terms of Service and Privacy Policy"
      );
      setToastType("error");
      setShowToast(true);
      setIsLoading(false);
      setTimeout(() => setShowToast(false), 3000);
      return;
    }

    try {
      // Integrated fetch call to backend API
      const response = await fetch("http://127.0.0.1:8000/users/signup/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          full_name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
          user_type: formData.userType,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Signup failed");
      }

      if (data.message === "Account created successfully") {
        // Store the recent signup type for login page
        localStorage.setItem("recentSignupType", formData.userType);
        localStorage.setItem("lastSelectedUserType", formData.userType);

        setToastMessage(`Account created! Welcome ${formData.fullName}`);
        setToastType("success");
        setShowToast(true);

        // Reset form
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          password: "",
          confirmPassword: "",
          userType: formData.userType, // Keep the same user type
        });
        setFormErrors({
          fullName: "",
          email: "",
          phone: "",
          password: "",
          confirmPassword: "",
        });
        setAgreeToTerms(false);
        setShowPassword(false);
        setShowConfirmPassword(false);

        setTimeout(() => {
          setShowToast(false);
          if (onSignupSuccess) {
            onSignupSuccess();
          }
        }, 2000);
      } else {
        setToastMessage(data.message || "Signup failed. Please try again.");
        setToastType("error");
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
      }
    } catch (error) {
      console.error("Signup error:", error);
      setToastMessage(error.message || "Network error. Please try again.");
      setToastType("error");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } finally {
      setIsLoading(false);
    }
  };

  const passwordStrength = validatePassword(formData.password)
    ? "strong"
    : "weak";

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  // Eye icon SVG components
  const EyeIcon = () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
      <circle cx="12" cy="12" r="3"></circle>
    </svg>
  );

  const EyeOffIcon = () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
      <line x1="1" y1="1" x2="23" y2="23"></line>
    </svg>
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
        background:
          "linear-gradient(135deg, #F7D9EB 0%, #ffffff 50%, #F7D9EB 100%)",
        padding: isMobile ? "10px" : "20px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Bubble Animation Background */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          zIndex: 1,
        }}
      >
        {floatingElements.map((element) => (
          <div
            key={element.id}
            style={{
              position: "absolute",
              background: "rgba(124, 42, 98, 0.1)",
              borderRadius: "50%",
              animation: "float 6s ease-in-out infinite",
              width: element.size,
              height: element.size,
              left: `${element.left}%`,
              top: `${element.top}%`,
              animationDelay: `${element.animationDelay}s`,
            }}
          />
        ))}
      </div>

      {/* Back to Home Button */}
      <button
        onClick={onBackToHome}
        style={{
          position: isMobile ? "fixed" : "absolute",
          top: isMobile ? "16px" : "20px",
          left: isMobile ? "16px" : "20px",
          padding: isMobile ? "8px 16px" : "10px 20px",
          backgroundColor: "white",
          color: "#7C2A62",
          border: "2px solid #7C2A62",
          borderRadius: "8px",
          fontSize: isMobile ? "12px" : "14px",
          fontWeight: "500",
          cursor: "pointer",
          transition: "all 0.3s ease",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          zIndex: 10,
          opacity: isLoading ? 0.7 : 1,
        }}
        disabled={isLoading}
        onMouseOver={(e) =>
          !isLoading &&
          ((e.target.style.backgroundColor = "#7C2A62"),
          (e.target.style.color = "white"))
        }
        onMouseOut={(e) =>
          !isLoading &&
          ((e.target.style.backgroundColor = "white"),
          (e.target.style.color = "#7C2A62"))
        }
      >
        ← Back to Home
      </button>

      {showToast && (
        <div
          style={{
            position: "fixed",
            top: isMobile ? "10px" : "20px",
            right: isMobile ? "10px" : "20px",
            left: isMobile ? "10px" : "auto",
            backgroundColor: toastType === "success" ? "#10B981" : "#EF4444",
            color: "white",
            padding: "12px 20px",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            zIndex: 1000,
            animation: "slideInRight 0.3s ease-out",
            fontSize: isMobile ? "12px" : "14px",
            fontWeight: "500",
            textAlign: "center",
          }}
        >
          {toastType === "success" ? "✅ " : "❌ "}
          {toastMessage}
        </div>
      )}

      {/* Main Card Container */}
      <div
        style={{
          display: "flex",
          width: "100%",
          maxWidth: isMobile ? "100%" : isTablet ? "95%" : "1100px",
          backgroundColor: "white",
          borderRadius: "16px",
          boxShadow: "0 10px 40px rgba(0, 0, 0, 0.1)",
          overflow: "hidden",
          minHeight: isMobile ? "auto" : "650px",
          flexDirection: isMobile ? "column" : "row",
          marginTop: isMobile ? "60px" : "0",
          position: "relative",
          zIndex: 2,
        }}
      >
        {/* Left Side - Dynamic Content */}
        <div
          style={{
            flex: isMobile ? "0 0 auto" : 1,
            background: `linear-gradient(135deg, #7C2A62 0%, #5a1a4a 100%)`,
            color: "white",
            padding: isMobile ? "30px 20px" : isTablet ? "30px" : "40px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            position: "relative",
            overflow: "hidden",
            minHeight: isMobile ? "280px" : "auto",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: `url(${currentUserType.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              opacity: 0.15,
            }}
          />

          <div
            style={{
              position: "relative",
              zIndex: 2,
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontSize: isMobile ? "36px" : "48px",
                marginBottom: isMobile ? "15px" : "20px",
                opacity: 0.9,
              }}
            >
              {formData.userType === "user" && "👤"}
              {formData.userType === "vendor" && "🏪"}
              {formData.userType === "delivery" && "🚚"}
              {formData.userType === "doctor" && "👨‍⚕️"}
            </div>

            <h2
              style={{
                fontSize: isMobile ? "20px" : isTablet ? "24px" : "28px",
                fontWeight: "700",
                marginBottom: isMobile ? "12px" : "16px",
                lineHeight: "1.3",
              }}
            >
              {currentUserType.title}
            </h2>

            <p
              style={{
                fontSize: isMobile ? "13px" : "16px",
                lineHeight: "1.6",
                opacity: 0.9,
                marginBottom: isMobile ? "20px" : "30px",
                maxWidth: isMobile ? "100%" : "400px",
                marginLeft: "auto",
                marginRight: "auto",
                padding: isMobile ? "0 10px" : "0",
              }}
            >
              {currentUserType.quote}
            </p>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "6px",
                flexWrap: "wrap",
                flexDirection: isMobile ? "row" : "row",
              }}
            >
              {userTypes.map((user) => (
                <button
                  key={user.type}
                  type="button"
                  onClick={() => handleUserTypeChange(user.type)}
                  style={{
                    padding: isMobile ? "8px 12px" : "10px 16px",
                    border: `2px solid ${
                      formData.userType === user.type
                        ? "white"
                        : "rgba(255,255,255,0.3)"
                    }`,
                    borderRadius: "8px",
                    backgroundColor:
                      formData.userType === user.type
                        ? "rgba(255,255,255,0.2)"
                        : "transparent",
                    color: "white",
                    fontWeight: "500",
                    cursor: "pointer",
                    fontSize: isMobile ? "11px" : "12px",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    transition: "all 0.3s ease",
                    minWidth: isMobile ? "70px" : "auto",
                    opacity: isLoading ? 0.7 : 1,
                  }}
                  disabled={isLoading}
                >
                  <span style={{ fontSize: isMobile ? "14px" : "16px" }}>
                    {user.type === "user" && "👤"}
                    {user.type === "vendor" && "🏪"}
                    {user.type === "delivery" && "🚚"}
                    {user.type === "doctor" && "👨‍⚕️"}
                  </span>
                  <span>{user.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side - Signup Form */}
        <div
          style={{
            flex: isMobile ? "1 1 auto" : 1,
            padding: isMobile ? "25px 20px" : isTablet ? "35px 30px" : "40px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            overflowY: "auto",
          }}
        >
          <div
            style={{
              textAlign: "center",
              marginBottom: isMobile ? "20px" : "30px",
            }}
          >
            <h1
              style={{
                fontSize: isMobile ? "24px" : isTablet ? "28px" : "32px",
                fontWeight: "700",
                marginBottom: "6px",
                color: "#7C2A62",
                letterSpacing: "0.5px",
              }}
            >
              QUICKMED
            </h1>
            <h2
              style={{
                color: "#333333",
                fontSize: isMobile ? "18px" : isTablet ? "22px" : "24px",
                fontWeight: "600",
                marginBottom: "4px",
              }}
            >
              Create Account
            </h2>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Full Name Field */}
            <div
              style={{
                marginBottom: isMobile ? "14px" : "16px",
                textAlign: "left",
              }}
            >
              <label
                style={{
                  display: "block",
                  marginBottom: "6px",
                  fontWeight: "500",
                  color: "#333333",
                  fontSize: isMobile ? "12px" : "13px",
                }}
              >
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                placeholder="Enter your full name"
                style={{
                  width: "100%",
                  padding: isMobile ? "12px 14px" : "12px 14px",
                  border: `1px solid ${
                    formErrors.fullName ? "#EF4444" : "#D1D5DB"
                  }`,
                  borderRadius: "8px",
                  fontSize: isMobile ? "14px" : "14px",
                  boxSizing: "border-box",
                  outline: "none",
                  transition: "border-color 0.2s ease",
                  color: "#333333",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#7C2A62")}
                disabled={isLoading}
              />
              {formErrors.fullName && (
                <div
                  style={{
                    marginTop: "4px",
                    fontSize: isMobile ? "10px" : "11px",
                    color: "#EF4444",
                    fontWeight: "500",
                  }}
                >
                  {formErrors.fullName}
                </div>
              )}
            </div>

            {/* Email Field */}
            <div
              style={{
                marginBottom: isMobile ? "14px" : "16px",
                textAlign: "left",
              }}
            >
              <label
                style={{
                  display: "block",
                  marginBottom: "6px",
                  fontWeight: "500",
                  color: "#333333",
                  fontSize: isMobile ? "12px" : "13px",
                }}
              >
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                placeholder="Enter your email"
                style={{
                  width: "100%",
                  padding: isMobile ? "12px 14px" : "12px 14px",
                  border: `1px solid ${
                    formErrors.email ? "#EF4444" : "#D1D5DB"
                  }`,
                  borderRadius: "8px",
                  fontSize: isMobile ? "14px" : "14px",
                  boxSizing: "border-box",
                  outline: "none",
                  transition: "border-color 0.2s ease",
                  color: "#333333",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#7C2A62")}
                disabled={isLoading}
              />
              {formErrors.email && (
                <div
                  style={{
                    marginTop: "4px",
                    fontSize: isMobile ? "10px" : "11px",
                    color: "#EF4444",
                    fontWeight: "500",
                  }}
                >
                  {formErrors.email}
                </div>
              )}
            </div>

            {/* Phone Number Field */}
            <div
              style={{
                marginBottom: isMobile ? "14px" : "16px",
                textAlign: "left",
              }}
            >
              <label
                style={{
                  display: "block",
                  marginBottom: "6px",
                  fontWeight: "500",
                  color: "#333333",
                  fontSize: isMobile ? "12px" : "13px",
                }}
              >
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                placeholder="Enter your 10-digit phone number"
                style={{
                  width: "100%",
                  padding: isMobile ? "12px 14px" : "12px 14px",
                  border: `1px solid ${
                    formErrors.phone ? "#EF4444" : "#D1D5DB"
                  }`,
                  borderRadius: "8px",
                  fontSize: isMobile ? "14px" : "14px",
                  boxSizing: "border-box",
                  outline: "none",
                  transition: "border-color 0.2s ease",
                  color: "#333333",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#7C2A62")}
                disabled={isLoading}
              />
              {formErrors.phone && (
                <div
                  style={{
                    marginTop: "4px",
                    fontSize: isMobile ? "10px" : "11px",
                    color: "#EF4444",
                    fontWeight: "500",
                  }}
                >
                  {formErrors.phone}
                </div>
              )}
            </div>

            {/* Password Field */}
            <div
              style={{
                marginBottom: isMobile ? "14px" : "16px",
                textAlign: "left",
              }}
            >
              <label
                style={{
                  display: "block",
                  marginBottom: "6px",
                  fontWeight: "500",
                  color: "#333333",
                  fontSize: isMobile ? "12px" : "13px",
                }}
              >
                Password
              </label>
              <div style={{ position: "relative" }}>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  placeholder="Create a strong password"
                  style={{
                    width: "100%",
                    padding: isMobile
                      ? "12px 45px 12px 14px"
                      : "12px 45px 12px 14px",
                    border: `1px solid ${
                      formErrors.password ? "#EF4444" : "#D1D5DB"
                    }`,
                    borderRadius: "8px",
                    fontSize: isMobile ? "14px" : "14px",
                    boxSizing: "border-box",
                    outline: "none",
                    transition: "border-color 0.2s ease",
                    color: "#333333",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#7C2A62")}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  style={{
                    position: "absolute",
                    right: "12px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "#666",
                    padding: "4px",
                    borderRadius: "4px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "30px",
                    height: "30px",
                    opacity: isLoading ? 0.7 : 1,
                  }}
                  disabled={isLoading}
                >
                  {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
              {formData.password && !formErrors.password && (
                <div
                  style={{
                    marginTop: "4px",
                    fontSize: isMobile ? "10px" : "11px",
                    color:
                      passwordStrength === "strong" ? "#10B981" : "#EF4444",
                    fontWeight: "500",
                  }}
                >
                  {passwordStrength === "strong"
                    ? "✓ Strong password"
                    : "✗ Weak password"}
                </div>
              )}
              {formErrors.password && (
                <div
                  style={{
                    marginTop: "4px",
                    fontSize: isMobile ? "10px" : "11px",
                    color: "#EF4444",
                    fontWeight: "500",
                  }}
                >
                  {formErrors.password}
                </div>
              )}
            </div>

            {/* Confirm Password Field */}
            <div
              style={{
                marginBottom: isMobile ? "18px" : "20px",
                textAlign: "left",
              }}
            >
              <label
                style={{
                  display: "block",
                  marginBottom: "6px",
                  fontWeight: "500",
                  color: "#333333",
                  fontSize: isMobile ? "12px" : "13px",
                }}
              >
                Confirm Password
              </label>
              <div style={{ position: "relative" }}>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  placeholder="Confirm your password"
                  style={{
                    width: "100%",
                    padding: isMobile
                      ? "12px 45px 12px 14px"
                      : "12px 45px 12px 14px",
                    border: `1px solid ${
                      formErrors.confirmPassword ? "#EF4444" : "#D1D5DB"
                    }`,
                    borderRadius: "8px",
                    fontSize: isMobile ? "14px" : "14px",
                    boxSizing: "border-box",
                    outline: "none",
                    transition: "border-color 0.2s ease",
                    color: "#333333",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#7C2A62")}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={toggleConfirmPasswordVisibility}
                  style={{
                    position: "absolute",
                    right: "12px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "#666",
                    padding: "4px",
                    borderRadius: "4px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "30px",
                    height: "30px",
                    opacity: isLoading ? 0.7 : 1,
                  }}
                  disabled={isLoading}
                >
                  {showConfirmPassword ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
              {formErrors.confirmPassword && (
                <div
                  style={{
                    marginTop: "4px",
                    fontSize: isMobile ? "10px" : "11px",
                    color: "#EF4444",
                    fontWeight: "500",
                  }}
                >
                  {formErrors.confirmPassword}
                </div>
              )}
            </div>

            {/* Terms and Conditions Checkbox */}
            <div
              style={{
                marginBottom: isMobile ? "18px" : "20px",
                textAlign: "left",
              }}
            >
              <label
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "8px",
                  cursor: "pointer",
                  fontSize: isMobile ? "12px" : "13px",
                  color: "#333333",
                }}
              >
                <input
                  type="checkbox"
                  checked={agreeToTerms}
                  onChange={(e) => setAgreeToTerms(e.target.checked)}
                  style={{
                    marginTop: "2px",
                    width: isMobile ? "14px" : "16px",
                    height: isMobile ? "14px" : "16px",
                  }}
                  disabled={isLoading}
                />
                <span>
                  I agree to the{" "}
                  <a
                    href="https://drive.google.com/file/d/1bZkQuNNdVootx27yQ0lMbIpqn83oIrYn/view?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: "#7C2A62",
                      fontWeight: "500",
                      cursor: "pointer",
                      textDecoration: "underline",
                    }}
                  >
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a
                    href="https://drive.google.com/file/d/1D3PHKle-WG-A9sJv2f4O2ZjBzoGaKLzo/view?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: "#7C2A62",
                      fontWeight: "500",
                      cursor: "pointer",
                      textDecoration: "underline",
                    }}
                  >
                    Privacy Policy
                  </a>
                </span>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              style={{
                width: "100%",
                padding: isMobile ? "12px" : "14px",
                backgroundColor: "#7C2A62",
                color: "white",
                border: "none",
                borderRadius: "8px",
                fontSize: isMobile ? "14px" : "16px",
                fontWeight: "600",
                cursor: "pointer",
                transition: "all 0.3s ease",
                opacity: isLoading ? 0.7 : 1,
                marginBottom: isMobile ? "18px" : "20px",
                boxShadow: "0 4px 12px rgba(124, 42, 98, 0.3)",
              }}
              onMouseOver={(e) =>
                !isLoading && (e.target.style.backgroundColor = "#5a1a4a")
              }
              onMouseOut={(e) =>
                !isLoading && (e.target.style.backgroundColor = "#7C2A62")
              }
            >
              {isLoading
                ? "Creating Account..."
                : `Join as ${currentUserType.label}`}
            </button>
          </form>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <p
              style={{
                color: "#666666",
                fontSize: isMobile ? "12px" : "14px",
                textAlign: "center",
                margin: 0,
              }}
            >
              Already have an account?{" "}
              <span
                onClick={() => !isLoading && onSwitchToLogin()}
                style={{
                  color: "#7C2A62",
                  fontWeight: "600",
                  cursor: "pointer",
                  padding: "2px 6px",
                  borderRadius: "4px",
                  transition: "all 0.2s ease",
                }}
                onMouseOver={(e) =>
                  !isLoading &&
                  ((e.target.style.color = "#5a1a4a"),
                  (e.target.style.backgroundColor = "#F7D9EB"))
                }
                onMouseOut={(e) =>
                  !isLoading &&
                  ((e.target.style.color = "#7C2A62"),
                  (e.target.style.backgroundColor = "transparent"))
                }
              >
                Sign in
              </span>
            </p>
          </div>
        </div>
      </div>

      <style>
        {`
          @keyframes float {
            0%, 100% {
              transform: translateY(0) rotate(0deg);
            }
            33% {
              transform: translateY(-20px) rotate(120deg);
            }
            66% {
              transform: translateY(20px) rotate(240deg);
            }
          }

          @keyframes slideInRight {
            from {
              transform: translateX(100%);
              opacity: 0;
            }
            to {
              transform: translateX(0);
              opacity: 1;
            }
          }
          
          @keyframes pulse {
            0% { opacity: 1; }
            50% { opacity: 0.7; }
            100% { opacity: 1; }
          }

          button:disabled {
            animation: pulse 1.5s ease-in-out infinite;
            cursor: not-allowed;
          }

          /* Mobile-specific improvements */
          @media (max-width: 768px) {
            input, button {
              font-size: 16px; /* Prevents zoom on iOS */
            }
            
            button, [role="button"] {
              min-height: 44px;
              min-width: 44px;
            }
          }

          /* Tablet optimizations */
          @media (min-width: 769px) and (max-width: 1024px) {
            .signup-container {
              max-width: 95%;
              margin: 20px auto;
            }
          }

          /* Large desktop enhancements */
          @media (min-width: 1200px) {
            .signup-container {
              max-width: 1100px;
            }
          }
        `}
      </style>
    </div>
  );
};

export default Signup;
