import React from 'react';

const DoctorHeader = ({
  activePage,
  userProfile,
  getUnreadNotificationsCount,
  setShowNotificationsModal,
  isSidebarOpen,
  setIsSidebarOpen
}) => {
  const isMobile = window.innerWidth <= 768;

  const getCurrentGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  const getPageTitle = () => {
    const titles = {
      dashboard: 'Dashboard',
      appointments: 'Appointments',
      patients: 'Patients',
      earnings: 'Earnings',
      messages: 'Messages'
    };
    return titles[activePage] || '';
  };

  const getPageSubtitle = () => {
    const subtitles = {
      dashboard: 'Overview of your practice',
      appointments: '', // Removed subtitle
      patients: '', // Removed subtitle
      earnings: '', // Removed subtitle
      messages: 'Communicate with patients'
    };
    return subtitles[activePage] || '';
  };

  return (
    <div style={styles.header}>
      <div style={styles.headerLeft}>
        {isMobile && activePage !== 'messages' && (
          <button 
            style={styles.menuButton}
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            ☰
          </button>
        )}
        <div>
          <h1 style={styles.greeting}>
            {activePage === 'dashboard' 
              ? `${getCurrentGreeting()}, Dr. ${userProfile.fullName?.split(' ')[0] || 'User'}`
              : `Good Afternoon, Dr. ${userProfile.fullName?.split(' ')[0] || 'User'}`
            }
          </h1>
          <p style={styles.subtitle}>{getPageSubtitle()}</p>
        </div>
      </div>
      <div style={styles.headerActions}>
        <div style={styles.dateDisplay}>
          {new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </div>
        
        {/* Notifications Button */}
        <button 
          style={styles.notificationBell}
          onClick={() => setShowNotificationsModal(true)}
        >
          🔔
          {getUnreadNotificationsCount() > 0 && (
            <span style={styles.notificationBadge}>
              {getUnreadNotificationsCount()}
            </span>
          )}
        </button>
      </div>
    </div>
  );
};

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: '20px',
    marginBottom: '20px',
    flexWrap: 'wrap',
    gap: '15px'
  },
  headerLeft: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '15px',
    flex: 1
  },
  menuButton: {
    background: 'none',
    border: 'none',
    fontSize: '24px',
    cursor: 'pointer',
    padding: '5px',
    borderRadius: '5px',
    backgroundColor: 'white',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  },
  headerActions: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    flexWrap: 'wrap'
  },
  notificationBell: {
    position: 'relative',
    backgroundColor: 'white',
    border: 'none',
    borderRadius: '50%',
    width: '44px',
    height: '44px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '20px',
    cursor: 'pointer',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    flexShrink: 0
  },
  notificationBadge: {
    position: 'absolute',
    top: '-2px',
    right: '-2px',
    backgroundColor: '#EF4444',
    color: 'white',
    borderRadius: '50%',
    width: '18px',
    height: '18px',
    fontSize: '10px',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  greeting: {
    fontSize: 'clamp(20px, 4vw, 28px)',
    fontWeight: '700',
    color: '#1f2937',
    margin: '0 0 8px 0'
  },
  subtitle: {
    fontSize: 'clamp(14px, 2vw, 16px)',
    color: '#6b7280',
    margin: 0
  },
  dateDisplay: {
    fontSize: '14px',
    color: '#6b7280',
    fontWeight: '500'
  }
};

export default DoctorHeader;