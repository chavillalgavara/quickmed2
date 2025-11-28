// import React, { useState } from 'react';

// const Sidebar = ({ activePage, setActivePage, profileData, isOnline, onLogout, onToggleAIChat }) => {
//   const [showProfilePopup, setShowProfilePopup] = useState(false);

//   const styles = {
//     sidebar: {
//       width: '280px',
//       backgroundColor: '#7C2A62',
//       color: 'white',
//       display: 'flex',
//       flexDirection: 'column',
//       position: 'fixed',
//       height: '100vh',
//       left: 0,
//       top: 0,
//       overflowY: 'auto'
//     },
//     sidebarHeader: {
//       padding: '30px 24px 20px',
//       borderBottom: '1px solid rgba(255,255,255,0.1)',
//       display: 'flex',
//       alignItems: 'center',
//       gap: '12px'
//     },
//     logoContainer: {
//       display: 'flex',
//       alignItems: 'center',
//       gap: '12px'
//     },
//     logoImage: {
//       width: '40px',
//       height: '40px',
//       borderRadius: '8px',
//       objectFit: 'cover'
//     },
//     logoPlaceholder: {
//       width: '40px',
//       height: '40px',
//       borderRadius: '8px',
//       backgroundColor: 'rgba(255,255,255,0.2)',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       fontSize: '20px',
//       border: '2px solid rgba(255,255,255,0.3)'
//     },
//     logoText: {
//       fontSize: '24px',
//       fontWeight: '700',
//       margin: '0 0 4px 0',
//       color: 'white'
//     },
//     agentTitle: {
//       fontSize: '14px',
//       opacity: 0.8,
//       margin: 0
//     },
//     profileSection: {
//       padding: '20px 24px',
//       borderBottom: '1px solid rgba(255,255,255,0.1)',
//       backgroundColor: 'rgba(255,255,255,0.05)'
//     },
//     profileInfo: {
//       display: 'flex',
//       alignItems: 'center',
//       gap: '12px'
//     },
//     userAvatar: {
//       position: 'relative',
//       cursor: 'pointer'
//     },
//     sidebarProfileImage: {
//       width: '48px',
//       height: '48px',
//       borderRadius: '50%',
//       objectFit: 'cover',
//       border: '2px solid rgba(255,255,255,0.3)',
//       cursor: 'pointer'
//     },
//     sidebarAvatarPlaceholder: {
//       width: '48px',
//       height: '48px',
//       borderRadius: '50%',
//       backgroundColor: 'rgba(255,255,255,0.2)',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       fontSize: '20px',
//       border: '2px solid rgba(255,255,255,0.3)',
//       cursor: 'pointer'
//     },
//     userDetails: {
//       flex: 1
//     },
//     userName: {
//       margin: '0 0 4px 0',
//       fontWeight: '600',
//       fontSize: '16px'
//     },
//     onlineStatusSmall: {
//       display: 'flex',
//       alignItems: 'center',
//       gap: '6px',
//       fontSize: '12px',
//       opacity: 0.8
//     },
//     statusDot: {
//       width: '8px',
//       height: '8px',
//       borderRadius: '50%',
//       display: 'inline-block'
//     },
//     navigation: {
//       flex: 1,
//       padding: '20px 0'
//     },
//     navButton: {
//       display: 'flex',
//       alignItems: 'center',
//       width: '100%',
//       padding: '16px 24px',
//       backgroundColor: 'transparent',
//       border: 'none',
//       color: 'white',
//       fontSize: '16px',
//       cursor: 'pointer',
//       transition: 'all 0.3s ease',
//       opacity: 0.8
//     },
//     navButtonActive: {
//       backgroundColor: 'rgba(255,255,255,0.1)',
//       opacity: 1,
//       borderRight: '4px solid #F7D9EB'
//     },
//     navIcon: {
//       fontSize: '20px',
//       marginRight: '12px',
//       width: '24px',
//       textAlign: 'center'
//     },
//     navLabel: {
//       fontWeight: '500'
//     },
//     sidebarFooter: {
//       padding: '20px 24px',
//       borderTop: '1px solid rgba(255,255,255,0.1)'
//     },
//     sidebarActions: {
//       display: 'flex',
//       flexDirection: 'column',
//       gap: '8px'
//     },
//     logoutButton: {
//       width: '100%',
//       padding: '12px',
//       backgroundColor: 'rgba(255,255,255,0.1)',
//       color: 'white',
//       border: 'none',
//       borderRadius: '8px',
//       cursor: 'pointer',
//       fontWeight: '500',
//       transition: 'background-color 0.3s ease'
//     },
//     // Profile Popup Styles
//     profilePopup: {
//       position: 'fixed',
//       top: '50%',
//       left: '50%',
//       transform: 'translate(-50%, -50%)',
//       backgroundColor: 'white',
//       borderRadius: '12px',
//       padding: '24px',
//       width: '400px',
//       maxWidth: '90vw',
//       maxHeight: '80vh',
//       overflowY: 'auto',
//       boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
//       zIndex: 1000,
//       color: '#333'
//     },
//     overlay: {
//       position: 'fixed',
//       top: 0,
//       left: 0,
//       right: 0,
//       bottom: 0,
//       backgroundColor: 'rgba(0,0,0,0.5)',
//       zIndex: 999
//     },
//     popupHeader: {
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'space-between',
//       marginBottom: '20px',
//       paddingBottom: '16px',
//       borderBottom: '1px solid #e5e7eb'
//     },
//     popupTitle: {
//       fontSize: '20px',
//       fontWeight: '600',
//       color: '#7C2A62',
//       margin: 0
//     },
//     closeButton: {
//       background: 'none',
//       border: 'none',
//       fontSize: '24px',
//       cursor: 'pointer',
//       color: '#6B7280',
//       padding: '4px'
//     },
//     profileDetails: {
//       display: 'grid',
//       gap: '16px'
//     },
//     detailRow: {
//       display: 'flex',
//       justifyContent: 'space-between',
//       alignItems: 'center',
//       padding: '12px 0',
//       borderBottom: '1px solid #f3f4f6'
//     },
//     detailLabel: {
//       fontWeight: '500',
//       color: '#6B7280',
//       fontSize: '14px'
//     },
//     detailValue: {
//       fontWeight: '400',
//       color: '#374151',
//       fontSize: '14px',
//       textAlign: 'right'
//     },
//     notProvided: {
//       color: '#9CA3AF',
//       fontStyle: 'italic'
//     },
//     popupActions: {
//       display: 'flex',
//       gap: '12px',
//       marginTop: '24px'
//     },
//     fullProfileButton: {
//       flex: 1,
//       padding: '12px',
//       backgroundColor: '#7C2A62',
//       color: 'white',
//       border: 'none',
//       borderRadius: '8px',
//       cursor: 'pointer',
//       fontWeight: '500',
//       fontSize: '14px',
//       transition: 'background-color 0.3s ease'
//     },
//     // Scrollbar styles
//     scrollbar: {
//       scrollbarWidth: 'thin',
//       scrollbarColor: 'rgba(255,255,255,0.3) rgba(255,255,255,0.1)'
//     },
//     scrollbarWebkit: {
//       '&::-webkit-scrollbar': {
//         width: '6px'
//       },
//       '&::-webkit-scrollbar-track': {
//         background: 'rgba(255,255,255,0.1)',
//         borderRadius: '3px'
//       },
//       '&::-webkit-scrollbar-thumb': {
//         background: 'rgba(255,255,255,0.3)',
//         borderRadius: '3px'
//       },
//       '&::-webkit-scrollbar-thumb:hover': {
//         background: 'rgba(255,255,255,0.5)'
//       }
//     }
//   };

//   const navigationItems = [
//     { id: 'dashboard', label: 'Dashboard', icon: '📊' },
//     { id: 'earnings', label: 'Earnings', icon: '💰' },
//     { id: 'performance', label: 'Performance', icon: '📈' },
//     { id: 'tasks', label: 'Delivery History', icon: '📦' }
//   ];

//   const getDisplayName = () => {
//     return profileData.fullName || 'Jagan';
//   };

//   const getProfileData = () => {
//     return {
//       name: profileData.fullName || 'Jagan',
//       email: profileData.email || 'yerrajagan29@gmail.com',
//       phone: profileData.phone || '6300604470',
//       age: profileData.age || 'Not provided',
//       city: profileData.city || 'Not provided',
//       address: profileData.address || 'Not provided'
//     };
//   };

//   const handleProfileImageClick = () => {
//     setShowProfilePopup(true);
//   };

//   const handleClosePopup = () => {
//     setShowProfilePopup(false);
//   };

//   const handleViewFullProfile = () => {
//     setActivePage('profile');
//     setShowProfilePopup(false);
//   };

//   // Logo configuration - replace with your actual logo URL
//   const logoConfig = {
//     url: 'Quickmed img.png',
//     alt: 'QuickMed Logo'
//   };

//   const profileInfo = getProfileData();

//   return (
//     <>
//       <div style={{...styles.sidebar, ...styles.scrollbar, ...styles.scrollbarWebkit}}>
//         {/* Header with Logo and Title */}
//         <div style={styles.sidebarHeader}>
//           <div style={styles.logoContainer}>
//             {logoConfig.url ? (
//               <img 
//                 src={logoConfig.url} 
//                 alt={logoConfig.alt}
//                 style={styles.logoImage}
//                 onError={(e) => {
//                   e.target.style.display = 'none';
//                 }}
//               />
//             ) : (
//               <div style={styles.logoPlaceholder}></div>
//             )}
//             <div>
//               <h1 style={styles.logoText}>QUICKMED</h1>
//               <p style={styles.agentTitle}>Delivery Portal</p>
//             </div>
//           </div>
//         </div>

//         {/* Profile Section below the title */}
//         <div style={styles.profileSection}>
//           <div style={styles.profileInfo}>
//             <div style={styles.userAvatar} onClick={handleProfileImageClick}>
//               {profileData.profileImage ? (
//                 <img 
//                   src={profileData.profileImage} 
//                   alt="Profile" 
//                   style={styles.sidebarProfileImage}
//                 />
//               ) : (
//                 <div style={styles.sidebarAvatarPlaceholder}>👤</div>
//               )}
//             </div>
//             <div style={styles.userDetails}>
//               <p style={styles.userName}>{getDisplayName()}</p>
//               <div style={styles.onlineStatusSmall}>
//                 <span style={{
//                   ...styles.statusDot,
//                   backgroundColor: isOnline ? '#10B981' : '#6B7280'
//                 }}></span>
//                 <span>{isOnline ? 'Online' : 'Offline'}</span>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Navigation Menu */}
//         <nav style={styles.navigation}>
//           {navigationItems.map(item => (
//             <button
//               key={item.id}
//               style={{
//                 ...styles.navButton,
//                 ...(activePage === item.id ? styles.navButtonActive : {})
//               }}
//               onClick={() => setActivePage(item.id)}
//             >
//               <span style={styles.navIcon}>{item.icon}</span>
//               <span style={styles.navLabel}>{item.label}</span>
//             </button>
//           ))}
//         </nav>

//         {/* Footer Actions */}
//         <div style={styles.sidebarFooter}>
//           <div style={styles.sidebarActions}>
//             <button style={styles.logoutButton} onClick={onLogout}>
//               🚪 Logout
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Profile Popup */}
//       {showProfilePopup && (
//         <>
//           <div style={styles.overlay} onClick={handleClosePopup}></div>
//           <div style={styles.profilePopup}>
//             <div style={styles.popupHeader}>
//               <h2 style={styles.popupTitle}>Profile Details</h2>
//               <button style={styles.closeButton} onClick={handleClosePopup}>
//                 ×
//               </button>
//             </div>
            
//             <div style={styles.profileDetails}>
//               <div style={styles.detailRow}>
//                 <span style={styles.detailLabel}>Name:</span>
//                 <span style={styles.detailValue}>{profileInfo.name}</span>
//               </div>
//               <div style={styles.detailRow}>
//                 <span style={styles.detailLabel}>Email:</span>
//                 <span style={styles.detailValue}>{profileInfo.email}</span>
//               </div>
//               <div style={styles.detailRow}>
//                 <span style={styles.detailLabel}>Phone:</span>
//                 <span style={styles.detailValue}>{profileInfo.phone}</span>
//               </div>
//               <div style={styles.detailRow}>
//                 <span style={styles.detailLabel}>Age:</span>
//                 <span style={{...styles.detailValue, ...(profileInfo.age === 'Not provided' && styles.notProvided)}}>
//                   {profileInfo.age}
//                 </span>
//               </div>
//               <div style={styles.detailRow}>
//                 <span style={styles.detailLabel}>City:</span>
//                 <span style={{...styles.detailValue, ...(profileInfo.city === 'Not provided' && styles.notProvided)}}>
//                   {profileInfo.city}
//                 </span>
//               </div>
//               <div style={styles.detailRow}>
//                 <span style={styles.detailLabel}>Address:</span>
//                 <span style={{...styles.detailValue, ...(profileInfo.address === 'Not provided' && styles.notProvided)}}>
//                   {profileInfo.address}
//                 </span>
//               </div>
//             </div>

//             <div style={styles.popupActions}>
//               <button style={styles.fullProfileButton} onClick={handleViewFullProfile}>
//                 View Full Profile
//               </button>
//             </div>
//           </div>
//         </>
//       )}
//     </>
//   );
// };

// export default Sidebar;
import React, { useState } from 'react';

const Sidebar = ({ activePage, setActivePage, profileData, isOnline, onLogout, onToggleAIChat }) => {
  const [showProfilePopup, setShowProfilePopup] = useState(false);

  const styles = {
    sidebar: {
      width: '280px',
      backgroundColor: '#F7D9EB',
      color: '#333333',
      display: 'flex',
      flexDirection: 'column',
      position: 'fixed',
      height: '100vh',
      left: 0,
      top: 0,
      overflowY: 'auto'
    },
    sidebarHeader: {
      padding: '24px 20px 16px',
      borderBottom: '1px solid rgba(0,0,0,0.1)',
      display: 'flex',
      alignItems: 'center',
      gap: '12px'
    },
    logoContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px'
    },
    logoImage: {
      width: '40px',
      height: '40px',
      borderRadius: '8px',
      objectFit: 'cover'
    },
    logoPlaceholder: {
      width: '40px',
      height: '40px',
      borderRadius: '8px',
      backgroundColor: 'rgba(0,0,0,0.1)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '20px',
      border: '2px solid rgba(0,0,0,0.2)'
    },
    logoText: {
      fontSize: '22px',
      fontWeight: '700',
      margin: '0 0 4px 0',
      color: '#333333',
      letterSpacing: '0.5px'
    },
    agentTitle: {
      fontSize: '12px',
      opacity: 0.8,
      margin: 0,
      fontWeight: '400',
      color: '#333333'
    },
    profileSection: {
      padding: '16px 20px',
      borderBottom: '1px solid rgba(0,0,0,0.1)',
      backgroundColor: 'rgba(0,0,0,0.05)'
    },
    profileInfo: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px'
    },
    userAvatar: {
      position: 'relative',
      cursor: 'pointer'
    },
    sidebarProfileImage: {
      width: '48px',
      height: '48px',
      borderRadius: '50%',
      objectFit: 'cover',
      border: '2px solid rgba(0,0,0,0.2)',
      cursor: 'pointer'
    },
    sidebarAvatarPlaceholder: {
      width: '48px',
      height: '48px',
      borderRadius: '50%',
      backgroundColor: 'rgba(0,0,0,0.1)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '20px',
      border: '2px solid rgba(0,0,0,0.2)',
      cursor: 'pointer'
    },
    userDetails: {
      flex: 1
    },
    userName: {
      margin: '0 0 4px 0',
      fontWeight: '600',
      fontSize: '14px',
      color: '#333333'
    },
    onlineStatusSmall: {
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      fontSize: '12px',
      opacity: 0.8,
      color: '#333333'
    },
    statusDot: {
      width: '8px',
      height: '8px',
      borderRadius: '50%',
      display: 'inline-block'
    },
    navigation: {
      flex: 1,
      padding: '16px 0'
    },
    navButton: {
      display: 'flex',
      alignItems: 'center',
      width: '100%',
      padding: '14px 20px',
      backgroundColor: 'transparent',
      border: 'none',
      color: '#333333',
      fontSize: '14px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      opacity: 0.8
    },
    navButtonActive: {
      backgroundColor: 'rgba(0,0,0,0.08)',
      opacity: 1,
      borderRight: '3px solid #7C2A62',
      fontWeight: '600'
    },
    navIcon: {
      fontSize: '18px',
      marginRight: '12px',
      width: '20px',
      textAlign: 'center',
      flexShrink: 0
    },
    navLabel: {
      fontWeight: '500',
      fontSize: '14px'
    },
    sidebarFooter: {
      padding: '16px 20px',
      borderTop: '1px solid rgba(0,0,0,0.1)',
      backgroundColor: 'rgba(0,0,0,0.05)'
    },
    sidebarActions: {
      display: 'flex',
      flexDirection: 'column',
      gap: '8px'
    },
    logoutButton: {
      width: '100%',
      padding: '10px 16px',
      backgroundColor: 'rgba(0,0,0,0.08)',
      color: '#333333',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontWeight: '500',
      fontSize: '14px',
      transition: 'background-color 0.3s ease'
    },
    // Profile Popup Styles
    profilePopup: {
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: 'white',
      borderRadius: '12px',
      padding: '24px',
      width: '400px',
      maxWidth: '90vw',
      maxHeight: '80vh',
      overflowY: 'auto',
      boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
      zIndex: 1000,
      color: '#333'
    },
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      zIndex: 999
    },
    popupHeader: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: '20px',
      paddingBottom: '16px',
      borderBottom: '1px solid #e5e7eb'
    },
    popupTitle: {
      fontSize: '20px',
      fontWeight: '600',
      color: '#7C2A62',
      margin: 0
    },
    closeButton: {
      background: 'none',
      border: 'none',
      fontSize: '24px',
      cursor: 'pointer',
      color: '#6B7280',
      padding: '4px'
    },
    profileDetails: {
      display: 'grid',
      gap: '16px'
    },
    detailRow: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '12px 0',
      borderBottom: '1px solid #f3f4f6'
    },
    detailLabel: {
      fontWeight: '500',
      color: '#6B7280',
      fontSize: '14px'
    },
    detailValue: {
      fontWeight: '400',
      color: '#374151',
      fontSize: '14px',
      textAlign: 'right'
    },
    notProvided: {
      color: '#9CA3AF',
      fontStyle: 'italic'
    },
    popupActions: {
      display: 'flex',
      gap: '12px',
      marginTop: '24px'
    },
    fullProfileButton: {
      flex: 1,
      padding: '12px',
      backgroundColor: '#7C2A62',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontWeight: '500',
      fontSize: '14px',
      transition: 'background-color 0.3s ease'
    },
    // Scrollbar styles
    scrollbar: {
      scrollbarWidth: 'thin',
      scrollbarColor: 'rgba(0,0,0,0.3) rgba(0,0,0,0.1)'
    },
    scrollbarWebkit: {
      '&::-webkit-scrollbar': {
        width: '6px'
      },
      '&::-webkit-scrollbar-track': {
        background: 'rgba(0,0,0,0.1)',
        borderRadius: '3px'
      },
      '&::-webkit-scrollbar-thumb': {
        background: 'rgba(0,0,0,0.3)',
        borderRadius: '3px'
      },
      '&::-webkit-scrollbar-thumb:hover': {
        background: 'rgba(0,0,0,0.5)'
      }
    }
  };

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'earnings', label: 'Earnings', icon: '💰' },
    { id: 'performance', label: 'Performance', icon: '📈' },
    { id: 'tasks', label: 'Delivery History', icon: '📦' }
  ];

  const getDisplayName = () => {
    return profileData.fullName || 'Jagan';
  };

  const getProfileData = () => {
    return {
      name: profileData.fullName || 'Jagan',
      email: profileData.email || 'yerrajagan29@gmail.com',
      phone: profileData.phone || '6300604470',
      age: profileData.age || 'Not provided',
      city: profileData.city || 'Not provided',
      address: profileData.address || 'Not provided'
    };
  };

  const handleProfileImageClick = () => {
    setShowProfilePopup(true);
  };

  const handleClosePopup = () => {
    setShowProfilePopup(false);
  };

  const handleViewFullProfile = () => {
    setActivePage('profile');
    setShowProfilePopup(false);
  };

  // Logo configuration - replace with your actual logo URL
  const logoConfig = {
    url: 'Quickmed img.png',
    alt: 'QuickMed Logo'
  };

  const profileInfo = getProfileData();

  return (
    <>
      <div style={{...styles.sidebar, ...styles.scrollbar, ...styles.scrollbarWebkit}}>
        {/* Header with Logo and Title */}
        <div style={styles.sidebarHeader}>
          <div style={styles.logoContainer}>
            {logoConfig.url ? (
              <img 
                src={logoConfig.url} 
                alt={logoConfig.alt}
                style={styles.logoImage}
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            ) : (
              <div style={styles.logoPlaceholder}></div>
            )}
            <div>
              <h1 style={styles.logoText}>QUICKMED</h1>
              <p style={styles.agentTitle}>Delivery Portal</p>
            </div>
          </div>
        </div>

        {/* Profile Section below the title */}
        <div style={styles.profileSection}>
          <div style={styles.profileInfo}>
            <div style={styles.userAvatar} onClick={handleProfileImageClick}>
              {profileData.profileImage ? (
                <img 
                  src={profileData.profileImage} 
                  alt="Profile" 
                  style={styles.sidebarProfileImage}
                />
              ) : (
                <div style={styles.sidebarAvatarPlaceholder}>👤</div>
              )}
            </div>
            <div style={styles.userDetails}>
              <p style={styles.userName}>{getDisplayName()}</p>
              <div style={styles.onlineStatusSmall}>
                <span style={{
                  ...styles.statusDot,
                  backgroundColor: isOnline ? '#10B981' : '#6B7280'
                }}></span>
                <span>{isOnline ? 'Online' : 'Offline'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav style={styles.navigation}>
          {navigationItems.map(item => (
            <button
              key={item.id}
              style={{
                ...styles.navButton,
                ...(activePage === item.id ? styles.navButtonActive : {})
              }}
              onClick={() => setActivePage(item.id)}
            >
              <span style={styles.navIcon}>{item.icon}</span>
              <span style={styles.navLabel}>{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Footer Actions */}
        <div style={styles.sidebarFooter}>
          <div style={styles.sidebarActions}>
            <button style={styles.logoutButton} onClick={onLogout}>
              🚪 Logout
            </button>
          </div>
        </div>
      </div>

      {/* Profile Popup */}
      {showProfilePopup && (
        <>
          <div style={styles.overlay} onClick={handleClosePopup}></div>
          <div style={styles.profilePopup}>
            <div style={styles.popupHeader}>
              <h2 style={styles.popupTitle}>Profile Details</h2>
              <button style={styles.closeButton} onClick={handleClosePopup}>
                ×
              </button>
            </div>
            
            <div style={styles.profileDetails}>
              <div style={styles.detailRow}>
                <span style={styles.detailLabel}>Name:</span>
                <span style={styles.detailValue}>{profileInfo.name}</span>
              </div>
              <div style={styles.detailRow}>
                <span style={styles.detailLabel}>Email:</span>
                <span style={styles.detailValue}>{profileInfo.email}</span>
              </div>
              <div style={styles.detailRow}>
                <span style={styles.detailLabel}>Phone:</span>
                <span style={styles.detailValue}>{profileInfo.phone}</span>
              </div>
              <div style={styles.detailRow}>
                <span style={styles.detailLabel}>Age:</span>
                <span style={{...styles.detailValue, ...(profileInfo.age === 'Not provided' && styles.notProvided)}}>
                  {profileInfo.age}
                </span>
              </div>
              <div style={styles.detailRow}>
                <span style={styles.detailLabel}>City:</span>
                <span style={{...styles.detailValue, ...(profileInfo.city === 'Not provided' && styles.notProvided)}}>
                  {profileInfo.city}
                </span>
              </div>
              <div style={styles.detailRow}>
                <span style={styles.detailLabel}>Address:</span>
                <span style={{...styles.detailValue, ...(profileInfo.address === 'Not provided' && styles.notProvided)}}>
                  {profileInfo.address}
                </span>
              </div>
            </div>

            <div style={styles.popupActions}>
              <button style={styles.fullProfileButton} onClick={handleViewFullProfile}>
                View Full Profile
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Sidebar;