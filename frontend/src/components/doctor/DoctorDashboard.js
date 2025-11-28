import React from 'react';
import DoctorSidebar from './DoctorSidebar';
import DoctorHeader from './DoctorHeader';
import DashboardContent from './DashboardContent';
import AppointmentsContent from './AppointmentsContent';
import PatientsContent from './PatientsContent';
import EarningsContent from './EarningsContent';
import MessagesContent from './MessagesContent';
import TimeSlotsContent from './TimeSlotsContent';
import DoctorModals from './DoctorModals';
import { 
  useDoctorState, 
  useDoctorActions,
  dashboardData,
  navigationItems 
} from './doctorUtils';

const DoctorDashboard = ({ user, onLogout }) => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  // Get state and state setters
  const state = useDoctorState(user);
  const {
    activePage,
    timeRange,
    appointmentFilter,
    patientSearch,
    earningFilter,
    showProfileModal,
    showNotificationsModal,
    showMessagesModal,
    showChatbotModal,
    showLogoutConfirm,
    consultationDetails,
    userProfile,
    notifications,
    appointments,
    patientMessages,
    selectedPatient,
    formErrors,
    windowSize,
    timeslots
  } = state;

  // Get actions
  const actions = useDoctorActions({
    ...state,
    setActivePage: state.setActivePage,
    setTimeRange: state.setTimeRange,
    setAppointmentFilter: state.setAppointmentFilter,
    setPatientSearch: state.setPatientSearch,
    setEarningFilter: state.setEarningFilter,
    setShowProfileModal: state.setShowProfileModal,
    setShowNotificationsModal: state.setShowNotificationsModal,
    setShowMessagesModal: state.setShowMessagesModal,
    setShowChatbotModal: state.setShowChatbotModal,
    setShowLogoutConfirm: state.setShowLogoutConfirm,
    setConsultationDetails: state.setConsultationDetails,
    setUserProfile: state.setUserProfile,
    setNotifications: state.setNotifications,
    setAppointments: state.setAppointments,
    setPatientNotes: state.setPatientNotes,
    setPatientMessages: state.setPatientMessages,
    setFormErrors: state.setFormErrors,
    setSelectedPatient: state.setSelectedPatient,
    setIsSidebarOpen: state.setIsSidebarOpen,
    setTimeslots: state.setTimeslots
  });

  const {
    getUnreadMessagesCount,
    getUnreadNotificationsCount,
    handleStartConversation,
    handleMarkAsRead,
    handleSendMessage,
    handleStartConsultation,
    handleCancelAppointment,
    handleApproveAppointment,
    handleRejectAppointment,
    handleAddNotes,
    handleViewFullHistory,
    handleProfileUpdate,
    handleMarkNotificationAsRead,
    handleMarkAllNotificationsAsRead,
    handleClearAllNotifications,
    showNotification,
    validateForm,
    addTimeslot,
    updateTimeslot,
    deleteTimeslot,
    toggleTimeslotAvailability
  } = actions;

  const renderMainContent = () => {
    const commonActions = {
      handleStartConversation,
      handleViewFullHistory,
      handleAddNotes,
      handleStartConsultation,
      handleCancelAppointment,
      handleApproveAppointment,
      handleRejectAppointment,
      setConsultationDetails: state.setConsultationDetails
    };

    const timeslotActions = {
      addTimeslot,
      updateTimeslot,
      deleteTimeslot,
      toggleTimeslotAvailability,
      setTimeslots: state.setTimeslots
    };

    const contentProps = {
      dashboardData,
      state: {
        activePage,
        timeRange,
        appointmentFilter,
        patientSearch,
        earningFilter,
        appointments,
        patientMessages,
        userProfile,
        timeslots
      },
      actions: {
        setActivePage: state.setActivePage,
        setTimeRange: state.setTimeRange,
        setAppointmentFilter: state.setAppointmentFilter,
        setPatientSearch: state.setPatientSearch,
        setEarningFilter: state.setEarningFilter,
        setConsultationDetails: state.setConsultationDetails,
        getUnreadMessagesCount,
        getUnreadNotificationsCount,
        ...commonActions,
        ...timeslotActions
      }
    };

    switch (activePage) {
      case 'dashboard':
        return <DashboardContent {...contentProps} />;
      case 'appointments':
        return <AppointmentsContent {...contentProps} />;
      case 'patients':
        return <PatientsContent {...contentProps} />;
      case 'earnings':
        return <EarningsContent {...contentProps} />;
      case 'messages':
        return <MessagesContent {...contentProps} />;
      case 'timeslots':
        return <TimeSlotsContent {...contentProps} />;
      default:
        return <DashboardContent {...contentProps} />;
    }
  };

  return (
    <div style={styles.container}>
      {activePage !== 'messages' && (
        <DoctorSidebar
          activePage={activePage}
          setActivePage={state.setActivePage}
          userProfile={userProfile}
          getUnreadMessagesCount={getUnreadMessagesCount}
          setShowProfileModal={state.setShowProfileModal}
          setShowLogoutConfirm={state.setShowLogoutConfirm}
          navigationItems={navigationItems}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={state.setIsSidebarOpen}
        />
      )}

      <div style={{
        ...styles.content,
        marginLeft: activePage !== 'messages' && window.innerWidth > 768 ? '280px' : '0',
        width: activePage !== 'messages' && window.innerWidth > 768 ? 'calc(100% - 280px)' : '100%'
      }}>
        <DoctorHeader
          activePage={activePage}
          userProfile={userProfile}
          getUnreadNotificationsCount={getUnreadNotificationsCount}
          setShowNotificationsModal={state.setShowNotificationsModal}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={state.setIsSidebarOpen}
        />
        
        {renderMainContent()}
      </div>

      {/* Floating Chatbot Button */}
      <button 
        style={styles.chatbotButton}
        onClick={() => state.setShowChatbotModal(true)}
        title="Medical AI Assistant"
      >
        <span style={styles.chatbotIcon}>🩺</span>
        <span style={styles.chatbotTooltip}>AI Assistant</span>
      </button>

      <DoctorModals
        state={{
          showProfileModal,
          showNotificationsModal,
          showMessagesModal,
          showChatbotModal,
          showLogoutConfirm,
          consultationDetails,
          userProfile,
          notifications,
          patientMessages,
          selectedPatient,
          formErrors,
          windowSize
        }}
        actions={{
          setShowProfileModal: state.setShowProfileModal,
          setShowNotificationsModal: state.setShowNotificationsModal,
          setShowMessagesModal: state.setShowMessagesModal,
          setShowChatbotModal: state.setShowChatbotModal,
          setShowLogoutConfirm: state.setShowLogoutConfirm,
          setConsultationDetails: state.setConsultationDetails,
          setUserProfile: state.setUserProfile,
          setFormErrors: state.setFormErrors,
          handleProfileUpdate,
          handleMarkNotificationAsRead,
          handleMarkAllNotificationsAsRead,
          handleClearAllNotifications,
          handleSendMessage,
          handleMarkAsRead,
          handleViewFullHistory,
          handleAddNotes,
          validateForm,
          handleStartConversation
        }}
        onLogout={onLogout}
        dashboardData={dashboardData}
      />
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: '#f8fafc',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    position: 'relative'
  },
  content: {
    flex: 1,
    transition: 'all 0.3s ease'
  },
  chatbotButton: {
    position: 'fixed',
    bottom: '30px',
    right: '30px',
    backgroundColor: '#7C2A62',
    color: 'white',
    border: 'none',
    borderRadius: '50%',
    width: '70px',
    height: '70px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '24px',
    cursor: 'pointer',
    boxShadow: '0 4px 20px rgba(124, 42, 98, 0.3)',
    zIndex: 100,
    transition: 'all 0.3s ease',
    animation: 'pulse 2s infinite',
    overflow: 'visible'
  },
  chatbotIcon: {
    fontSize: '28px',
    marginBottom: '2px'
  },
  chatbotTooltip: {
    position: 'absolute',
    top: '-35px',
    backgroundColor: '#7C2A62',
    color: 'white',
    padding: '6px 12px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '600',
    whiteSpace: 'nowrap',
    opacity: 0,
    transform: 'translateY(10px)',
    transition: 'all 0.3s ease',
    pointerEvents: 'none'
  }
};

// Add CSS for pulse animation and hover effects
const style = document.createElement('style');
style.textContent = `
  @keyframes pulse {
    0% {
      transform: scale(1);
      box-shadow: 0 4px 20px rgba(124, 42, 98, 0.3);
    }
    50% {
      transform: scale(1.05);
      box-shadow: 0 6px 25px rgba(124, 42, 98, 0.4);
    }
    100% {
      transform: scale(1);
      boxShadow: 0 4px 20px rgba(124, 42, 98, 0.3);
    }
  }

  button:hover .chatbot-tooltip {
    opacity: 1;
    transform: translateY(0);
  }

  button:hover {
    transform: scale(1.1);
    box-shadow: 0 8px 30px rgba(124, 42, 98, 0.5);
  }
`;
document.head.appendChild(style);

export default DoctorDashboard;