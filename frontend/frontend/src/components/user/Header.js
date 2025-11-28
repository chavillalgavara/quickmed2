
// import React, { useRef, useEffect } from 'react';
// import { useProfile } from './ProfileContext';

// const Header = ({
//   activeView,
//   setActiveView,
//   cart,
//   notifications,
//   markAsRead,
//   markAllAsRead,
//   getUnreadCount,
//   handleNotificationsClick,
//   toggleProfileDropdown,
//   showProfileDropdown,
//   setShowProfileDropdown,
//   handleLogoutClick,
//   toggleChatbot,
//   profilePhotoInputRef,
//   handleProfilePhotoUpload,
//   triggerProfilePhotoUpload
// }) => {
//   const { profile } = useProfile();
//   const profileRef = useRef(null);
//   const notificationRef = useRef(null);

//   // Debug: Log profile changes
//   useEffect(() => {
//     console.log('Header - Current profile:', profile);
//   }, [profile]);

//   // Enhanced navigation handler that scrolls to top
//   const handleNavigation = (view) => {
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//     setTimeout(() => {
//       setActiveView(view);
//     }, 100);
//   };

//   // Enhanced profile click handler with event prevention
//   const handleProfileClick = (e) => {
//     e.stopPropagation();
//     console.log('Profile clicked, calling toggleProfileDropdown');
//     toggleProfileDropdown();
//   };

//   // Enhanced profile navigation handler
//   const handleProfileNavigation = (view) => {
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//     setTimeout(() => {
//       setActiveView(view);
//       setShowProfileDropdown(false);
//     }, 100);
//   };

//   // Enhanced cart navigation handler
//   const handleCartNavigation = () => {
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//     setTimeout(() => {
//       setActiveView('cart');
//     }, 100);
//   };

//   // Handle clicks outside profile dropdown and notifications
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (profileRef.current && !profileRef.current.contains(event.target)) {
//         setShowProfileDropdown(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
    
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, [setShowProfileDropdown]);

//   // Navigation items configuration for better maintainability
//   const navItems = [
//     { key: 'dashboard', label: 'Home' },
//     { key: 'products', label: 'Products' },
//     { key: 'appointments', label: 'Appointments' },
//     { key: 'orders', label: 'Orders' }
//   ];

//   // Header styles
//   const headerStyles = {
//     header: {
//       backgroundColor: '#F7D9EB',
//       color: '#333333',
//       boxShadow: '0 4px 20px rgba(247, 217, 235, 0.3)',
//       position: 'fixed',
//       top: 0,
//       left: 0,
//       right: 0,
//       zIndex: 1000,
//     },
//     topSection: {
//       display: 'flex',
//       justifyContent: 'space-between',
//       alignItems: 'center',
//       padding: '0.8rem 1rem',
//       borderBottom: '1px solid rgba(0,0,0,0.1)',
//       flexWrap: 'wrap',
//     },
//     logoContainer: {
//       display: 'flex',
//       alignItems: 'center',
//       gap: '0.75rem',
//       marginLeft: '-25px',
//     },
//     logoImage: {
//       width: '80px',
//       height: '40px',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'flex-start',
//       borderRadius: '8px',
//       overflow: 'hidden',
//       flexShrink: 0,
//       marginLeft: '0',
//       paddingLeft: '0',
//     },
//     logoText: {
//       display: 'flex',
//       flexDirection: 'column',
//     },
//     appName: {
//       fontSize: '1.4rem',
//       margin: 0,
//       fontWeight: 'bold',
//       background: 'linear-gradient(135deg, #333, #7C2A62)',
//       WebkitBackgroundClip: 'text',
//       WebkitTextFillColor: 'transparent',
//       backgroundClip: 'text',
//     },
//     taglineContainer: {
//       display: 'flex',
//       alignItems: 'center',
//       gap: '0.75rem',
//       marginTop: '0.25rem',
//     },
//     tagline: {
//       fontSize: '0.85rem',
//       opacity: 0.9,
//       fontWeight: '500',
//       color: '#333333',
//     },
//     userInfo: {
//       display: 'flex',
//       alignItems: 'center',
//       gap: '0.5rem',
//       flexShrink: 0,
//     },
//     userText: {
//       display: 'flex',
//       flexDirection: 'column',
//       alignItems: 'flex-end',
//     },
//     welcomeText: {
//       fontSize: '0.8rem',
//       opacity: 0.8,
//       color: '#333333',
//     },
//     userName: {
//       fontSize: '0.85rem',
//       fontWeight: '500',
//       color: '#333333',
//     },
//     profileContainer: {
//       position: 'relative',
//       cursor: 'pointer',
//     },
//     profileAvatar: {
//       width: '34px',
//       height: '34px',
//       fontSize: '1rem',
//       borderRadius: '50%',
//       backgroundColor: '#7C2A62',
//       color: '#F7D9EB',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       fontWeight: 'bold',
//       border: '2px solid rgba(0, 0, 0, 0.2)',
//       transition: 'all 0.3s ease',
//       overflow: 'hidden',
//     },
//     dropdown: {
//       position: 'absolute',
//       top: '100%',
//       right: 0,
//       width: '320px',
//       backgroundColor: 'white',
//       borderRadius: '12px',
//       boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
//       zIndex: 2000,
//       marginTop: '0.5rem',
//       overflow: 'hidden',
//       border: '1px solid rgba(124, 42, 98, 0.1)',
//     },
//     dropdownHeader: {
//       padding: '1.2rem 1.5rem',
//       backgroundColor: '#7C2A62',
//       color: 'white',
//       display: 'flex',
//       alignItems: 'center',
//       gap: '0.75rem',
//     },
//     dropdownAvatar: {
//       width: '50px',
//       height: '50px',
//       borderRadius: '50%',
//       backgroundColor: '#F7D9EB',
//       color: '#7C2A62',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       fontWeight: 'bold',
//       fontSize: '1.2rem',
//       border: '2px solid rgba(255, 255, 255, 0.3)',
//       overflow: 'hidden',
//     },
//     dropdownUserInfo: {
//       flex: 1,
//     },
//     dropdownUserName: {
//       margin: 0,
//       fontSize: '1.1rem',
//       fontWeight: '600',
//     },
//     dropdownUserEmail: {
//       margin: '0.25rem 0 0 0',
//       fontSize: '0.85rem',
//       opacity: 0.9,
//     },
//     dropdownContent: {
//       padding: '1rem 1.5rem',
//     },
//     profileGrid: {
//       display: 'grid',
//       gridTemplateColumns: '1fr 1fr',
//       gap: '0.75rem',
//       marginBottom: '1rem',
//     },
//     profileField: {
//       display: 'flex',
//       flexDirection: 'column',
//       gap: '0.25rem',
//     },
//     profileLabel: {
//       color: '#666',
//       fontSize: '0.75rem',
//       fontWeight: '500',
//       textTransform: 'uppercase',
//       letterSpacing: '0.5px',
//     },
//     profileValue: {
//       color: '#333',
//       fontSize: '0.85rem',
//       fontWeight: '600',
//     },
//     emptyValue: {
//       color: '#999',
//       fontStyle: 'italic',
//       fontSize: '0.85rem',
//     },
//     dropdownActions: {
//       padding: '1rem 1.5rem',
//       display: 'flex',
//       flexDirection: 'column',
//       gap: '0.75rem',
//       borderTop: '1px solid #f0f0f0',
//     },
//     profileButton: {
//       padding: '0.75rem 1rem',
//       backgroundColor: '#7C2A62',
//       color: 'white',
//       border: 'none',
//       borderRadius: '8px',
//       cursor: 'pointer',
//       fontWeight: '600',
//       fontSize: '0.9rem',
//       transition: 'all 0.3s ease',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       gap: '0.5rem',
//     },
//     secondaryButton: {
//       padding: '0.75rem 1rem',
//       backgroundColor: 'transparent',
//       color: '#7C2A62',
//       border: '1px solid #7C2A62',
//       borderRadius: '8px',
//       cursor: 'pointer',
//       fontWeight: '600',
//       fontSize: '0.9rem',
//       transition: 'all 0.3s ease',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       gap: '0.5rem',
//     },
//     bottomSection: {
//       display: 'flex',
//       justifyContent: 'space-between',
//       alignItems: 'center',
//       padding: '0.5rem 1rem',
//       backgroundColor: 'rgba(0,0,0,0.05)',
//       overflowX: 'auto',
//     },
//     nav: {
//       display: 'flex',
//       alignItems: 'center',
//     },
//     navItems: {
//       display: 'flex',
//       gap: '0.3rem',
//       flexWrap: 'nowrap',
//     },
//     navButtonActive: {
//       padding: '0.45rem 0.75rem',
//       fontSize: '0.78rem',
//       borderRadius: '6px',
//       whiteSpace: 'nowrap',
//       border: 'none',
//       backgroundColor: 'rgba(0, 0, 0, 0.1)',
//       color: '#333333',
//       cursor: 'pointer',
//       transition: 'all 0.3s ease',
//       display: 'flex',
//       alignItems: 'center',
//       gap: '0.5rem',
//       boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
//     },
//     navButtonInactive: {
//       padding: '0.45rem 0.75rem',
//       fontSize: '0.78rem',
//       borderRadius: '6px',
//       whiteSpace: 'nowrap',
//       border: 'none',
//       backgroundColor: 'transparent',
//       color: 'rgba(51, 51, 51, 0.7)',
//       cursor: 'pointer',
//       transition: 'all 0.3s ease',
//       display: 'flex',
//       alignItems: 'center',
//       gap: '0.5rem',
//     },
//     actionsContainer: {
//       display: 'flex',
//       alignItems: 'center',
//       gap: '1rem',
//     },
//     iconContainer: {
//       position: 'relative',
//       display: 'inline-block'
//     },
//     iconWrapper: {
//       display: 'flex',
//       alignItems: 'center',
//       padding: '0.5rem',
//       backgroundColor: 'rgba(0, 0, 0, 0.08)',
//       borderRadius: '8px',
//       cursor: 'pointer',
//       transition: 'all 0.3s ease',
//       border: '1px solid rgba(0, 0, 0, 0.15)',
//     },
//     icon: {
//       position: 'relative',
//       fontSize: '1.5rem',
//     },
//     notificationBadge: {
//       position: 'absolute',
//       top: '-8px',
//       right: '-8px',
//       backgroundColor: '#ef4444',
//       color: 'white',
//       borderRadius: '50%',
//       width: '20px',
//       height: '20px',
//       fontSize: '0.75rem',
//       fontWeight: 'bold',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       border: '2px solid #F7D9EB'
//     },
//     cartBadge: {
//       position: 'absolute',
//       top: '-8px',
//       right: '-8px',
//       backgroundColor: '#FF6B6B',
//       color: 'white',
//       borderRadius: '50%',
//       width: '20px',
//       height: '20px',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       fontSize: '0.75rem',
//       fontWeight: 'bold',
//       border: '2px solid #F7D9EB',
//     },
//     logoutButton: {
//       padding: '0.75rem 1.5rem',
//       backgroundColor: 'rgba(0, 0, 0, 0.08)',
//       color: '#333333',
//       border: '1px solid rgba(0, 0, 0, 0.2)',
//       borderRadius: '8px',
//       cursor: 'pointer',
//       fontWeight: '600',
//       fontSize: '0.95rem',
//       display: 'flex',
//       alignItems: 'center',
//       gap: '0.5rem',
//       transition: 'all 0.3s ease',
//     }
//   };

//   const unreadCount = getUnreadCount();

//   return (
//     <header style={headerStyles.header}>
//       {/* Top Section: Logo and User Info */}
//       <div style={headerStyles.topSection}>
//         <div style={headerStyles.logoContainer}>
//           {/* Logo Image - Positioned at left edge */}
//           <div style={headerStyles.logoImage}>
//             <img 
//               src="/Quickmed img.png"
//               alt="QuickMed Logo"
//               style={{
//                 width: '100%',
//                 height: '100%',
//                 objectFit: 'contain',
//                 display: 'block',
//               }}
//               onError={(e) => {
//                 // Fallback if image fails to load
//                 e.target.style.display = 'none';
//               }}
//             />
//           </div>
          
//           <div style={headerStyles.logoText}>
//             <h1 style={headerStyles.appName}>QUICKMED</h1>
//             <div style={headerStyles.taglineContainer}>
//               <span style={headerStyles.tagline}>Quick Care, Smarter Health</span>
//             </div>
//           </div>
//         </div>
        
//         <div style={headerStyles.userInfo}>
//           <div style={headerStyles.userText}>
//             <span style={headerStyles.welcomeText}>Welcome,</span>
//             <span style={headerStyles.userName}>{profile.fullName || 'User'}</span>
//           </div>
//           <div 
//             ref={profileRef}
//             style={headerStyles.profileContainer}
//             onClick={handleProfileClick}
//           >
//             <div style={headerStyles.profileAvatar}>
//               {profile.profilePhoto ? (
//                 <img
//                   src={profile.profilePhoto}
//                   alt="Profile"
//                   style={{
//                     width: '100%',
//                     height: '100%',
//                     objectFit: 'cover',
//                   }}
//                 />
//               ) : (
//                 profile.fullName?.charAt(0)?.toUpperCase() || 'U'
//               )}
//             </div>
            
//             {/* Enhanced Profile Dropdown */}
//             {showProfileDropdown && (
//               <div style={headerStyles.dropdown}>
//                 {/* Dropdown Header with User Avatar */}
//                 <div style={headerStyles.dropdownHeader}>
//                   <div style={headerStyles.dropdownAvatar}>
//                     {profile.profilePhoto ? (
//                       <img
//                         src={profile.profilePhoto}
//                         alt="Profile"
//                         style={{
//                           width: '100%',
//                           height: '100%',
//                           objectFit: 'cover',
//                         }}
//                       />
//                     ) : (
//                       profile.fullName?.charAt(0)?.toUpperCase() || 'U'
//                     )}
//                   </div>
//                   <div style={headerStyles.dropdownUserInfo}>
//                     <h4 style={headerStyles.dropdownUserName}>
//                       {profile.fullName || 'User'}
//                     </h4>
//                     <p style={headerStyles.dropdownUserEmail}>
//                       {profile.email || 'No email provided'}
//                     </p>
//                   </div>
//                 </div>

//                 {/* Profile Information Grid */}
//                 <div style={headerStyles.dropdownContent}>
//                   <div style={headerStyles.profileGrid}>
//                     <div style={headerStyles.profileField}>
//                       <span style={headerStyles.profileLabel}>Phone</span>
//                       <span style={profile.phone ? headerStyles.profileValue : headerStyles.emptyValue}>
//                         {profile.phone || 'Not provided'}
//                       </span>
//                     </div>
//                     <div style={headerStyles.profileField}>
//                       <span style={headerStyles.profileLabel}>Age</span>
//                       <span style={profile.age ? headerStyles.profileValue : headerStyles.emptyValue}>
//                         {profile.age ? `${profile.age} years` : 'Not provided'}
//                       </span>
//                     </div>
//                     <div style={headerStyles.profileField}>
//                       <span style={headerStyles.profileLabel}>Gender</span>
//                       <span style={profile.gender ? headerStyles.profileValue : headerStyles.emptyValue}>
//                         {profile.gender ? 
//                           profile.gender.charAt(0).toUpperCase() + profile.gender.slice(1) 
//                           : 'Not specified'
//                         }
//                       </span>
//                     </div>
//                     <div style={headerStyles.profileField}>
//                       <span style={headerStyles.profileLabel}>City</span>
//                       <span style={profile.city ? headerStyles.profileValue : headerStyles.emptyValue}>
//                         {profile.city || 'Not provided'}
//                       </span>
//                     </div>
//                   </div>
                  
//                   {/* Address Field (Full Width) */}
//                   <div style={headerStyles.profileField}>
//                     <span style={headerStyles.profileLabel}>Address</span>
//                     <span style={profile.address ? headerStyles.profileValue : headerStyles.emptyValue}>
//                       {profile.address || 'Not provided'}
//                     </span>
//                   </div>
//                 </div>

//                 {/* Dropdown Actions */}
//                 <div style={headerStyles.dropdownActions}>
//                   <button 
//                     style={headerStyles.profileButton}
//                     onClick={() => handleProfileNavigation('profile')}
//                     type="button"
//                   >
//                     📋 View Full Profile
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Bottom Section: Navigation and Actions */}
//       <div style={headerStyles.bottomSection}>
//         <div style={headerStyles.nav}>
//           <nav style={headerStyles.navItems}>
//             {navItems.map(item => (
//               <button 
//                 key={item.key}
//                 style={activeView === item.key ? headerStyles.navButtonActive : headerStyles.navButtonInactive}
//                 onClick={() => handleNavigation(item.key)}
//                 type="button"
//               >
//                 <span>{item.icon}</span>
//                 {item.label}
//               </button>
//             ))}
//           </nav>
//         </div>

//         <div style={headerStyles.actionsContainer}>
//           {/* Cart Icon */}
//           <div 
//             style={headerStyles.iconWrapper}
//             onClick={handleCartNavigation}
//           >
//             <div style={headerStyles.iconContainer}>
//               <div style={headerStyles.icon}>
//                 🛒
//                 {cart.length > 0 && (
//                   <span style={headerStyles.cartBadge}>{cart.length}</span>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Notification Bell */}
//           <div 
//             ref={notificationRef}
//             style={headerStyles.iconWrapper}
//           >
//             <div style={headerStyles.iconContainer}>
//               <button
//                 style={{
//                   background: 'none',
//                   border: 'none',
//                   cursor: 'pointer',
//                   padding: 0,
//                   display: 'flex',
//                   alignItems: 'center',
//                   justifyContent: 'center'
//                 }}
//                 onClick={handleNotificationsClick}
//                 aria-label="Notifications"
//               >
//                 <div style={headerStyles.icon}>
//                   🔔
//                   {unreadCount > 0 && (
//                     <span style={headerStyles.notificationBadge}>
//                       {unreadCount}
//                     </span>
//                   )}
//                 </div>
//               </button>
//             </div>
//           </div>

//           {/* Logout Button */}
//           <button 
//             style={headerStyles.logoutButton}
//             onClick={handleLogoutClick}
//             type="button"
//           >
//             Logout
//           </button>
//         </div>
//       </div>

//       {/* Hidden Profile Photo Input */}
//       <input
//         type="file"
//         ref={profilePhotoInputRef}
//         onChange={handleProfilePhotoUpload}
//         accept="image/*"
//         style={{ display: 'none' }}
//       />
//     </header>
//   );
// };

// export default Header;
import React, { useRef, useEffect, useState } from 'react';
import { useProfile } from './ProfileContext';

const Header = ({
  activeView,
  setActiveView,
  cart,
  notifications,
  markAsRead,
  markAllAsRead,
  getUnreadCount,
  handleNotificationsClick,
  toggleProfileDropdown,
  showProfileDropdown,
  setShowProfileDropdown,
  handleLogoutClick,
  toggleChatbot,
  profilePhotoInputRef,
  handleProfilePhotoUpload,
  triggerProfilePhotoUpload
}) => {
  const { profile } = useProfile();
  const profileRef = useRef(null);
  const notificationRef = useRef(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Debug: Log profile changes
  useEffect(() => {
    console.log('Header - Current profile:', profile);
  }, [profile]);

  // Enhanced navigation handler that scrolls to top
  const handleNavigation = (view) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      setActiveView(view);
      setIsMobileMenuOpen(false);
    }, 100);
  };

  // Enhanced profile click handler with event prevention
  const handleProfileClick = (e) => {
    e.stopPropagation();
    console.log('Profile clicked, calling toggleProfileDropdown');
    toggleProfileDropdown();
  };

  // Enhanced profile navigation handler
  const handleProfileNavigation = (view) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      setActiveView(view);
      setShowProfileDropdown(false);
    }, 100);
  };

  // Enhanced cart navigation handler
  const handleCartNavigation = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      setActiveView('cart');
      setIsMobileMenuOpen(false);
    }, 100);
  };

  // Handle clicks outside profile dropdown and notifications
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileDropdown(false);
      }
      if (isMobileMenuOpen && !event.target.closest('.mobile-menu') && !event.target.closest('.hamburger-icon')) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setShowProfileDropdown, isMobileMenuOpen]);

  // Navigation items configuration for better maintainability
  const navItems = [
    { key: 'dashboard', label: 'Home' },
    { key: 'products', label: 'Products' },
    { key: 'appointments', label: 'Appointments' },
    { key: 'orders', label: 'Orders' }
  ];

  // Header styles
  const headerStyles = {
    header: {
      backgroundColor: '#F7D9EB',
      color: '#333333',
      boxShadow: '0 4px 20px rgba(247, 217, 235, 0.3)',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
    },
    topSection: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0.8rem 1rem',
      borderBottom: '1px solid rgba(0,0,0,0.1)',
      flexWrap: 'wrap',
    },
    logoContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      marginLeft: isMobile ? '0' : '-25px',
      flex: 1,
    },
    logoImage: {
      width: isMobile ? '60px' : '80px',
      height: isMobile ? '30px' : '40px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      borderRadius: '8px',
      overflow: 'hidden',
      flexShrink: 0,
      marginLeft: '0',
      paddingLeft: '0',
    },
    logoText: {
      display: 'flex',
      flexDirection: 'column',
    },
    appName: {
      fontSize: isMobile ? '1.1rem' : '1.4rem',
      margin: 0,
      fontWeight: 'bold',
      background: 'linear-gradient(135deg, #333, #7C2A62)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
    },
    taglineContainer: {
      display: isMobile ? 'none' : 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      marginTop: '0.25rem',
    },
    tagline: {
      fontSize: '0.85rem',
      opacity: 0.9,
      fontWeight: '500',
      color: '#333333',
    },
    userInfo: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      flexShrink: 0,
    },
    userText: {
      display: isMobile ? 'none' : 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
    },
    welcomeText: {
      fontSize: '0.8rem',
      opacity: 0.8,
      color: '#333333',
    },
    userName: {
      fontSize: '0.85rem',
      fontWeight: '500',
      color: '#333333',
    },
    profileContainer: {
      position: 'relative',
      cursor: 'pointer',
    },
    profileAvatar: {
      width: isMobile ? '30px' : '34px',
      height: isMobile ? '30px' : '34px',
      fontSize: isMobile ? '0.9rem' : '1rem',
      borderRadius: '50%',
      backgroundColor: '#7C2A62',
      color: '#F7D9EB',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 'bold',
      border: '2px solid rgba(0, 0, 0, 0.2)',
      transition: 'all 0.3s ease',
      overflow: 'hidden',
    },
    hamburgerButton: {
      display: isMobile ? 'flex' : 'none',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      width: '40px',
      height: '40px',
      backgroundColor: 'rgba(0, 0, 0, 0.08)',
      border: '1px solid rgba(0, 0, 0, 0.15)',
      borderRadius: '8px',
      cursor: 'pointer',
      padding: '8px',
      marginLeft: '10px',
    },
    hamburgerLine: {
      width: '20px',
      height: '2px',
      backgroundColor: '#333333',
      margin: '2px 0',
      transition: 'all 0.3s ease',
      borderRadius: '2px',
    },
    hamburgerLineActive: {
      width: '20px',
      height: '2px',
      backgroundColor: '#333333',
      margin: '2px 0',
      transition: 'all 0.3s ease',
      borderRadius: '2px',
    },
    dropdown: {
      position: 'absolute',
      top: '100%',
      right: 0,
      width: isMobile ? '280px' : '320px',
      backgroundColor: 'white',
      borderRadius: '12px',
      boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
      zIndex: 2000,
      marginTop: '0.5rem',
      overflow: 'hidden',
      border: '1px solid rgba(124, 42, 98, 0.1)',
    },
    dropdownHeader: {
      padding: isMobile ? '1rem' : '1.2rem 1.5rem',
      backgroundColor: '#7C2A62',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
    },
    dropdownAvatar: {
      width: isMobile ? '40px' : '50px',
      height: isMobile ? '40px' : '50px',
      borderRadius: '50%',
      backgroundColor: '#F7D9EB',
      color: '#7C2A62',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 'bold',
      fontSize: isMobile ? '1rem' : '1.2rem',
      border: '2px solid rgba(255, 255, 255, 0.3)',
      overflow: 'hidden',
    },
    dropdownUserInfo: {
      flex: 1,
    },
    dropdownUserName: {
      margin: 0,
      fontSize: isMobile ? '1rem' : '1.1rem',
      fontWeight: '600',
    },
    dropdownUserEmail: {
      margin: '0.25rem 0 0 0',
      fontSize: isMobile ? '0.8rem' : '0.85rem',
      opacity: 0.9,
    },
    dropdownContent: {
      padding: isMobile ? '0.8rem 1rem' : '1rem 1.5rem',
    },
    profileGrid: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
      gap: '0.75rem',
      marginBottom: '1rem',
    },
    profileField: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.25rem',
    },
    profileLabel: {
      color: '#666',
      fontSize: isMobile ? '0.7rem' : '0.75rem',
      fontWeight: '500',
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
    },
    profileValue: {
      color: '#333',
      fontSize: isMobile ? '0.8rem' : '0.85rem',
      fontWeight: '600',
    },
    emptyValue: {
      color: '#999',
      fontStyle: 'italic',
      fontSize: isMobile ? '0.8rem' : '0.85rem',
    },
    dropdownActions: {
      padding: isMobile ? '0.8rem 1rem' : '1rem 1.5rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '0.75rem',
      borderTop: '1px solid #f0f0f0',
    },
    profileButton: {
      padding: isMobile ? '0.6rem 0.8rem' : '0.75rem 1rem',
      backgroundColor: '#7C2A62',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontWeight: '600',
      fontSize: isMobile ? '0.8rem' : '0.9rem',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.5rem',
    },
    bottomSection: {
      display: isMobile ? 'none' : 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0.5rem 1rem',
      backgroundColor: 'rgba(0,0,0,0.05)',
      overflowX: 'auto',
    },
    nav: {
      display: 'flex',
      alignItems: 'center',
    },
    navItems: {
      display: 'flex',
      gap: '0.3rem',
      flexWrap: 'nowrap',
    },
    navButtonActive: {
      padding: '0.45rem 0.75rem',
      fontSize: '0.78rem',
      borderRadius: '6px',
      whiteSpace: 'nowrap',
      border: 'none',
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
      color: '#333333',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    },
    navButtonInactive: {
      padding: '0.45rem 0.75rem',
      fontSize: '0.78rem',
      borderRadius: '6px',
      whiteSpace: 'nowrap',
      border: 'none',
      backgroundColor: 'transparent',
      color: 'rgba(51, 51, 51, 0.7)',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
    },
    actionsContainer: {
      display: isMobile ? 'none' : 'flex',
      alignItems: 'center',
      gap: '1rem',
    },
    iconContainer: {
      position: 'relative',
      display: 'inline-block'
    },
    iconWrapper: {
      display: 'flex',
      alignItems: 'center',
      padding: '0.5rem',
      backgroundColor: 'rgba(0, 0, 0, 0.08)',
      borderRadius: '8px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      border: '1px solid rgba(0, 0, 0, 0.15)',
    },
    icon: {
      position: 'relative',
      fontSize: '1.5rem',
    },
    notificationBadge: {
      position: 'absolute',
      top: '-8px',
      right: '-8px',
      backgroundColor: '#ef4444',
      color: 'white',
      borderRadius: '50%',
      width: '20px',
      height: '20px',
      fontSize: '0.75rem',
      fontWeight: 'bold',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: '2px solid #F7D9EB'
    },
    cartBadge: {
      position: 'absolute',
      top: '-8px',
      right: '-8px',
      backgroundColor: '#FF6B6B',
      color: 'white',
      borderRadius: '50%',
      width: '20px',
      height: '20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '0.75rem',
      fontWeight: 'bold',
      border: '2px solid #F7D9EB',
    },
    logoutButton: {
      padding: '0.75rem 1.5rem',
      backgroundColor: 'rgba(0, 0, 0, 0.08)',
      color: '#333333',
      border: '1px solid rgba(0, 0, 0, 0.2)',
      borderRadius: '8px',
      cursor: 'pointer',
      fontWeight: '600',
      fontSize: '0.95rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      transition: 'all 0.3s ease',
    },
    // Mobile Menu Styles
    mobileMenuOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      zIndex: 999,
      display: isMobileMenuOpen ? 'block' : 'none',
    },
    mobileMenu: {
      position: 'fixed',
      top: '80px',
      right: '1rem',
      backgroundColor: 'white',
      borderRadius: '12px',
      boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
      zIndex: 1000,
      width: '280px',
      padding: '1rem',
      display: isMobileMenuOpen ? 'block' : 'none',
    },
    mobileNavItems: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem',
      marginBottom: '1rem',
    },
    mobileNavButton: {
      padding: '0.75rem 1rem',
      backgroundColor: 'transparent',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '0.9rem',
      textAlign: 'left',
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      transition: 'all 0.3s ease',
      color: '#333333',
    },
    mobileNavButtonActive: {
      padding: '0.75rem 1rem',
      backgroundColor: 'rgba(124, 42, 98, 0.1)',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '0.9rem',
      textAlign: 'left',
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      transition: 'all 0.3s ease',
      color: '#7C2A62',
      fontWeight: '600',
    },
    mobileActions: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem',
      borderTop: '1px solid #f0f0f0',
      paddingTop: '1rem',
    },
    mobileIconButton: {
      padding: '0.75rem 1rem',
      backgroundColor: 'transparent',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '0.9rem',
      textAlign: 'left',
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      transition: 'all 0.3s ease',
      color: '#333333',
    },
    mobileIconButtonWithBadge: {
      padding: '0.75rem 1rem',
      backgroundColor: 'transparent',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '0.9rem',
      textAlign: 'left',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      transition: 'all 0.3s ease',
      color: '#333333',
    },
    mobileBadge: {
      backgroundColor: '#ef4444',
      color: 'white',
      borderRadius: '50%',
      width: '20px',
      height: '20px',
      fontSize: '0.7rem',
      fontWeight: 'bold',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    mobileCartBadge: {
      backgroundColor: '#FF6B6B',
      color: 'white',
      borderRadius: '50%',
      width: '20px',
      height: '20px',
      fontSize: '0.7rem',
      fontWeight: 'bold',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }
  };

  const unreadCount = getUnreadCount();

  return (
    <header style={headerStyles.header}>
      {/* Top Section: Logo and User Info */}
      <div style={headerStyles.topSection}>
        <div style={headerStyles.logoContainer}>
          {/* Logo Image - Positioned at left edge */}
          <div style={headerStyles.logoImage}>
            <img 
              src="/Quickmed img.png"
              alt="QuickMed Logo"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                display: 'block',
              }}
              onError={(e) => {
                // Fallback if image fails to load
                e.target.style.display = 'none';
              }}
            />
          </div>
          
          <div style={headerStyles.logoText}>
            <h1 style={headerStyles.appName}>QUICKMED</h1>
            <div style={headerStyles.taglineContainer}>
              <span style={headerStyles.tagline}>Quick Care, Smarter Health</span>
            </div>
          </div>
        </div>
        
        <div style={headerStyles.userInfo}>
          <div style={headerStyles.userText}>
            <span style={headerStyles.welcomeText}>Welcome,</span>
            <span style={headerStyles.userName}>{profile.fullName || 'User'}</span>
          </div>
          
          {/* Hamburger Menu Button for Mobile */}
          <button 
            className="hamburger-icon"
            style={headerStyles.hamburgerButton}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <div style={{
              ...headerStyles.hamburgerLine,
              transform: isMobileMenuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none'
            }}></div>
            <div style={{
              ...headerStyles.hamburgerLine,
              opacity: isMobileMenuOpen ? 0 : 1
            }}></div>
            <div style={{
              ...headerStyles.hamburgerLine,
              transform: isMobileMenuOpen ? 'rotate(-45deg) translate(7px, -6px)' : 'none'
            }}></div>
          </button>

          <div 
            ref={profileRef}
            style={headerStyles.profileContainer}
            onClick={handleProfileClick}
          >
            <div style={headerStyles.profileAvatar}>
              {profile.profilePhoto ? (
                <img
                  src={profile.profilePhoto}
                  alt="Profile"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              ) : (
                profile.fullName?.charAt(0)?.toUpperCase() || 'U'
              )}
            </div>
            
            {/* Enhanced Profile Dropdown */}
            {showProfileDropdown && (
              <div style={headerStyles.dropdown}>
                {/* Dropdown Header with User Avatar */}
                <div style={headerStyles.dropdownHeader}>
                  <div style={headerStyles.dropdownAvatar}>
                    {profile.profilePhoto ? (
                      <img
                        src={profile.profilePhoto}
                        alt="Profile"
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                        }}
                      />
                    ) : (
                      profile.fullName?.charAt(0)?.toUpperCase() || 'U'
                    )}
                  </div>
                  <div style={headerStyles.dropdownUserInfo}>
                    <h4 style={headerStyles.dropdownUserName}>
                      {profile.fullName || 'User'}
                    </h4>
                    <p style={headerStyles.dropdownUserEmail}>
                      {profile.email || 'No email provided'}
                    </p>
                  </div>
                </div>

                {/* Profile Information Grid */}
                <div style={headerStyles.dropdownContent}>
                  <div style={headerStyles.profileGrid}>
                    <div style={headerStyles.profileField}>
                      <span style={headerStyles.profileLabel}>Phone</span>
                      <span style={profile.phone ? headerStyles.profileValue : headerStyles.emptyValue}>
                        {profile.phone || 'Not provided'}
                      </span>
                    </div>
                    <div style={headerStyles.profileField}>
                      <span style={headerStyles.profileLabel}>Age</span>
                      <span style={profile.age ? headerStyles.profileValue : headerStyles.emptyValue}>
                        {profile.age ? `${profile.age} years` : 'Not provided'}
                      </span>
                    </div>
                    <div style={headerStyles.profileField}>
                      <span style={headerStyles.profileLabel}>Gender</span>
                      <span style={profile.gender ? headerStyles.profileValue : headerStyles.emptyValue}>
                        {profile.gender ? 
                          profile.gender.charAt(0).toUpperCase() + profile.gender.slice(1) 
                          : 'Not specified'
                        }
                      </span>
                    </div>
                    <div style={headerStyles.profileField}>
                      <span style={headerStyles.profileLabel}>City</span>
                      <span style={profile.city ? headerStyles.profileValue : headerStyles.emptyValue}>
                        {profile.city || 'Not provided'}
                      </span>
                    </div>
                  </div>
                  
                  {/* Address Field (Full Width) */}
                  <div style={headerStyles.profileField}>
                    <span style={headerStyles.profileLabel}>Address</span>
                    <span style={profile.address ? headerStyles.profileValue : headerStyles.emptyValue}>
                      {profile.address || 'Not provided'}
                    </span>
                  </div>
                </div>

                {/* Dropdown Actions */}
                <div style={headerStyles.dropdownActions}>
                  <button 
                    style={headerStyles.profileButton}
                    onClick={() => handleProfileNavigation('profile')}
                    type="button"
                  >
                    📋 View Full Profile
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Section: Navigation and Actions (Desktop Only) */}
      <div style={headerStyles.bottomSection}>
        <div style={headerStyles.nav}>
          <nav style={headerStyles.navItems}>
            {navItems.map(item => (
              <button 
                key={item.key}
                style={activeView === item.key ? headerStyles.navButtonActive : headerStyles.navButtonInactive}
                onClick={() => handleNavigation(item.key)}
                type="button"
              >
                <span>{item.icon}</span>
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        <div style={headerStyles.actionsContainer}>
          {/* Cart Icon */}
          <div 
            style={headerStyles.iconWrapper}
            onClick={handleCartNavigation}
          >
            <div style={headerStyles.iconContainer}>
              <div style={headerStyles.icon}>
                🛒
                {cart.length > 0 && (
                  <span style={headerStyles.cartBadge}>{cart.length}</span>
                )}
              </div>
            </div>
          </div>

          {/* Notification Bell */}
          <div 
            ref={notificationRef}
            style={headerStyles.iconWrapper}
          >
            <div style={headerStyles.iconContainer}>
              <button
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                onClick={handleNotificationsClick}
                aria-label="Notifications"
              >
                <div style={headerStyles.icon}>
                  🔔
                  {unreadCount > 0 && (
                    <span style={headerStyles.notificationBadge}>
                      {unreadCount}
                    </span>
                  )}
                </div>
              </button>
            </div>
          </div>

          {/* Logout Button */}
          <button 
            style={headerStyles.logoutButton}
            onClick={handleLogoutClick}
            type="button"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        style={headerStyles.mobileMenuOverlay}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Mobile Menu */}
      <div className="mobile-menu" style={headerStyles.mobileMenu}>
        {/* Navigation Items */}
        <nav style={headerStyles.mobileNavItems}>
          {navItems.map(item => (
            <button
              key={item.key}
              style={activeView === item.key ? headerStyles.mobileNavButtonActive : headerStyles.mobileNavButton}
              onClick={() => handleNavigation(item.key)}
              type="button"
            >
              <span>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        {/* Mobile Actions */}
        <div style={headerStyles.mobileActions}>
          {/* Cart */}
          <button
            style={headerStyles.mobileIconButtonWithBadge}
            onClick={handleCartNavigation}
            type="button"
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              🛒 Cart
            </span>
            {cart.length > 0 && (
              <span style={headerStyles.mobileCartBadge}>{cart.length}</span>
            )}
          </button>

          {/* Notifications */}
          <button
            style={headerStyles.mobileIconButtonWithBadge}
            onClick={handleNotificationsClick}
            type="button"
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              🔔 Notifications
            </span>
            {unreadCount > 0 && (
              <span style={headerStyles.mobileBadge}>{unreadCount}</span>
            )}
          </button>

          {/* Logout */}
          <button
            style={headerStyles.mobileIconButton}
            onClick={handleLogoutClick}
            type="button"
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              🚪 Logout
            </span>
          </button>
        </div>
      </div>

      {/* Hidden Profile Photo Input */}
      <input
        type="file"
        ref={profilePhotoInputRef}
        onChange={handleProfilePhotoUpload}
        accept="image/*"
        style={{ display: 'none' }}
      />
    </header>
  );
};

export default Header;