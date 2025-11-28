// import React from 'react';

// const DoctorSidebar = ({
//   activePage,
//   setActivePage,
//   userProfile,
//   setShowProfileModal,
//   setShowLogoutConfirm,
//   navigationItems,
//   isSidebarOpen,
//   setIsSidebarOpen
// }) => {
//   const isMobile = window.innerWidth <= 768;

//   return (
//     <>
//       {/* Mobile Overlay */}
//       {isMobile && isSidebarOpen && (
//         <div 
//           style={styles.overlay}
//           onClick={() => setIsSidebarOpen(false)}
//         />
//       )}
      
//       <div style={{
//         ...styles.sidebar,
//         transform: isMobile ? (isSidebarOpen ? 'translateX(0)' : 'translateX(-100%)') : 'translateX(0)',
//         width: isMobile ? '280px' : '280px'
//       }}>
//         <div style={styles.sidebarHeader}>
//           <h1 style={styles.logo}>QUICKMED</h1>
//           <p style={styles.doctorTitle}>Doctor Portal</p>
//           {isMobile && (
//             <button 
//               style={styles.closeButton}
//               onClick={() => setIsSidebarOpen(false)}
//             >
//               ✕
//             </button>
//           )}
//         </div>

//         {/* Doctor Profile Section - Moved to top */}
//         <div style={styles.profileSection}>
//           <button 
//             style={styles.profileButton}
//             onClick={() => setShowProfileModal(true)}
//           >
//             <div style={styles.userInfo}>
//               <div style={styles.userAvatar}>👨‍⚕️</div>
//               <div style={styles.userDetails}>
//                 <p style={styles.userName}>Dr. {userProfile.fullName?.split(' ')[0] || 'User'}</p>
//                 <p style={styles.userSpecialization}>{userProfile.specialization || 'General Physician'}</p>
//               </div>
//             </div>
//           </button>
//         </div>
        
//         <nav style={styles.navigation}>
//           {navigationItems.map(item => (
//             <button
//               key={item.id}
//               style={{
//                 ...styles.navButton,
//                 ...(activePage === item.id && styles.navButtonActive)
//               }}
//               onClick={() => {
//                 setActivePage(item.id);
//                 if (isMobile) setIsSidebarOpen(false);
//               }}
//             >
//               <span style={styles.navIcon}>{item.icon}</span>
//               <span style={styles.navLabel}>{item.label}</span>
//             </button>
//           ))}
//         </nav>

//         {/* Fixed Bottom Section with only Logout */}
//         <div style={styles.bottomSection}>
//           <div style={styles.sidebarFooter}>
//             <button 
//               style={styles.logoutButton} 
//               onClick={() => setShowLogoutConfirm(true)}
//             >
//               Logout
//             </button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// const styles = {
//   sidebar: {
//     backgroundColor: '#7C2A62',
//     color: 'white',
//     display: 'flex',
//     flexDirection: 'column',
//     position: 'fixed',
//     height: '100vh',
//     left: 0,
//     top: 0,
//     zIndex: 1000,
//     transition: 'transform 0.3s ease',
//     overflow: 'hidden',
//     justifyContent: 'space-between'
//   },
//   overlay: {
//     position: 'fixed',
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     backgroundColor: 'rgba(0,0,0,0.5)',
//     zIndex: 999
//   },
//   sidebarHeader: {
//     padding: '30px 24px 20px',
//     borderBottom: '1px solid rgba(255,255,255,0.1)',
//     position: 'relative',
//     flexShrink: 0
//   },
//   closeButton: {
//     position: 'absolute',
//     top: '20px',
//     right: '20px',
//     background: 'none',
//     border: 'none',
//     color: 'white',
//     fontSize: '20px',
//     cursor: 'pointer'
//   },
//   logo: {
//     fontSize: '24px',
//     fontWeight: '700',
//     margin: '0 0 4px 0'
//   },
//   doctorTitle: {
//     fontSize: '14px',
//     opacity: 0.8,
//     margin: 0
//   },
//   profileSection: {
//     padding: '16px 24px',
//     borderBottom: '1px solid rgba(255,255,255,0.1)',
//     flexShrink: 0
//   },
//   profileButton: {
//     width: '100%',
//     padding: '0',
//     backgroundColor: 'transparent',
//     color: 'white',
//     border: 'none',
//     borderRadius: '8px',
//     cursor: 'pointer',
//     textAlign: 'left',
//     transition: 'background-color 0.3s ease'
//   },
//   userInfo: {
//     display: 'flex',
//     alignItems: 'center',
//     gap: '12px',
//     padding: '12px',
//     borderRadius: '6px',
//     transition: 'background-color 0.3s ease'
//   },
//   userAvatar: {
//     fontSize: '32px',
//     flexShrink: 0,
//     width: '40px',
//     height: '40px',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center'
//   },
//   userDetails: {
//     flex: 1,
//     minWidth: 0
//   },
//   userName: {
//     margin: '0 0 4px 0',
//     fontWeight: '600',
//     fontSize: '14px',
//     whiteSpace: 'nowrap',
//     overflow: 'hidden',
//     textOverflow: 'ellipsis'
//   },
//   userSpecialization: {
//     margin: 0,
//     fontSize: '12px',
//     opacity: 0.8,
//     whiteSpace: 'nowrap',
//     overflow: 'hidden',
//     textOverflow: 'ellipsis'
//   },
//   navigation: {
//     flex: 1,
//     padding: '20px 0',
//     overflow: 'hidden',
//     flexShrink: 1
//   },
//   navButton: {
//     display: 'flex',
//     alignItems: 'center',
//     width: '100%',
//     padding: '16px 24px',
//     backgroundColor: 'transparent',
//     border: 'none',
//     color: 'white',
//     fontSize: '16px',
//     cursor: 'pointer',
//     transition: 'all 0.3s ease',
//     opacity: 0.8,
//     position: 'relative'
//   },
//   navButtonActive: {
//     backgroundColor: 'rgba(255,255,255,0.1)',
//     opacity: 1,
//     borderRight: '4px solid #F7D9EB'
//   },
//   navIcon: {
//     fontSize: '20px',
//     marginRight: '12px',
//     width: '24px'
//   },
//   navLabel: {
//     fontWeight: '500'
//   },
//   bottomSection: {
//     flexShrink: 0,
//     borderTop: '1px solid rgba(255,255,255,0.1)'
//   },
//   sidebarFooter: {
//     padding: '20px 24px'
//   },
//   logoutButton: {
//     width: '100%',
//     padding: '12px',
//     backgroundColor: 'rgba(255,255,255,0.1)',
//     color: 'white',
//     border: 'none',
//     borderRadius: '8px',
//     cursor: 'pointer',
//     fontWeight: '500',
//     transition: 'background-color 0.3s ease'
//   }
// };

// export default DoctorSidebar;
import React from 'react';

const DoctorSidebar = ({
  activePage,
  setActivePage,
  userProfile,
  setShowProfileModal,
  setShowLogoutConfirm,
  navigationItems,
  isSidebarOpen,
  setIsSidebarOpen
}) => {
  const isMobile = window.innerWidth <= 768;

  return (
    <>
      {/* Mobile Overlay */}
      {isMobile && isSidebarOpen && (
        <div 
          style={styles.overlay}
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      
      <div style={{
        ...styles.sidebar,
        transform: isMobile ? (isSidebarOpen ? 'translateX(0)' : 'translateX(-100%)') : 'translateX(0)',
        width: isMobile ? '280px' : '280px'
      }}>
        <div style={styles.sidebarHeader}>
          <div style={styles.logoContainer}>
            <img 
              src="/Quickmed img.png" 
              alt="QuickMed Logo" 
              style={styles.logoImage}
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'block';
              }}
            />
            <div style={styles.logoFallback}></div>
            <div style={styles.logoTextContainer}>
              <h1 style={styles.logo}>QUICKMED</h1>
              <p style={styles.doctorTitle}>Doctor Portal</p>
            </div>
          </div>
          {isMobile && (
            <button 
              style={styles.closeButton}
              onClick={() => setIsSidebarOpen(false)}
            >
              ✕
            </button>
          )}
        </div>

        {/* Doctor Profile Section - Moved to top */}
        <div style={styles.profileSection}>
          <button 
            style={styles.profileButton}
            onClick={() => setShowProfileModal(true)}
          >
            <div style={styles.userInfo}>
              <div style={styles.userAvatar}>👨‍⚕️</div>
              <div style={styles.userDetails}>
                <p style={styles.userName}>Dr. {userProfile.fullName?.split(' ')[0] || 'User'}</p>
                <p style={styles.userSpecialization}>{userProfile.specialization || 'General Physician'}</p>
              </div>
            </div>
          </button>
        </div>
        
        <nav style={styles.navigation}>
          {navigationItems.map(item => (
            <button
              key={item.id}
              style={{
                ...styles.navButton,
                ...(activePage === item.id && styles.navButtonActive)
              }}
              onClick={() => {
                setActivePage(item.id);
                if (isMobile) setIsSidebarOpen(false);
              }}
            >
              <span style={styles.navIcon}>{item.icon}</span>
              <span style={styles.navLabel}>{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Fixed Bottom Section with only Logout */}
        <div style={styles.bottomSection}>
          <div style={styles.sidebarFooter}>
            <button 
              style={styles.logoutButton} 
              onClick={() => setShowLogoutConfirm(true)}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

const styles = {
  sidebar: {
    backgroundColor: '#F7D9EB',
    color: '#333333',
    display: 'flex',
    flexDirection: 'column',
    position: 'fixed',
    height: '100vh',
    left: 0,
    top: 0,
    zIndex: 1000,
    transition: 'transform 0.3s ease',
    overflow: 'hidden',
    justifyContent: 'space-between'
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
  sidebarHeader: {
    padding: '24px 20px 16px',
    borderBottom: '1px solid rgba(0,0,0,0.1)',
    position: 'relative',
    flexShrink: 0
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
  logoFallback: {
    fontSize: '24px',
    width: '40px',
    height: '40px',
    display: 'none',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderRadius: '8px'
  },
  logoTextContainer: {
    display: 'flex',
    flexDirection: 'column'
  },
  logo: {
    fontSize: '22px',
    fontWeight: '700',
    margin: '0 0 4px 0',
    color: '#333333',
    letterSpacing: '0.5px'
  },
  doctorTitle: {
    fontSize: '12px',
    opacity: 0.8,
    margin: 0,
    fontWeight: '400',
    color: '#333333'
  },
  closeButton: {
    position: 'absolute',
    top: '20px',
    right: '20px',
    background: 'none',
    border: 'none',
    color: '#333333',
    fontSize: '20px',
    cursor: 'pointer'
  },
  profileSection: {
    padding: '16px 20px',
    borderBottom: '1px solid rgba(0,0,0,0.1)',
    flexShrink: 0,
    backgroundColor: 'rgba(0,0,0,0.05)'
  },
  profileButton: {
    width: '100%',
    padding: '0',
    backgroundColor: 'transparent',
    color: '#333333',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    textAlign: 'left',
    transition: 'background-color 0.3s ease'
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px',
    borderRadius: '6px',
    transition: 'background-color 0.3s ease',
    backgroundColor: 'rgba(0,0,0,0.05)'
  },
  userAvatar: {
    fontSize: '32px',
    flexShrink: 0,
    width: '44px',
    height: '44px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderRadius: '10px',
    border: '2px solid rgba(0,0,0,0.2)'
  },
  userDetails: {
    flex: 1,
    minWidth: 0
  },
  userName: {
    margin: '0 0 4px 0',
    fontWeight: '600',
    fontSize: '14px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    color: '#333333'
  },
  userSpecialization: {
    margin: 0,
    fontSize: '12px',
    opacity: 0.8,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    color: '#333333'
  },
  navigation: {
    flex: 1,
    padding: '16px 0',
    overflow: 'hidden',
    flexShrink: 1
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
    opacity: 0.8,
    position: 'relative'
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
  bottomSection: {
    flexShrink: 0,
    borderTop: '1px solid rgba(0,0,0,0.1)',
    backgroundColor: 'rgba(0,0,0,0.05)'
  },
  sidebarFooter: {
    padding: '16px 20px'
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
    transition: 'all 0.3s ease'
  }
};

export default DoctorSidebar;