import React, { useState, useEffect } from 'react';

const AppointmentsContent = ({ dashboardData, state, actions }) => {
  const { appointmentFilter, appointments } = state;
  const { 
    setAppointmentFilter, 
    handleStartConsultation, 
    handleCancelAppointment,
    handleApproveAppointment,
    handleRejectAppointment,
    handleViewFullHistory,
    handleAddNotes
  } = actions;

  const isMobile = window.innerWidth <= 768;

  // State for time slots management
  const [showTimeSlots, setShowTimeSlots] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [doctorTimeSlots, setDoctorTimeSlots] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');

  // State for video consultation
  const [videoCallActive, setVideoCallActive] = useState(false);
  const [currentConsultation, setCurrentConsultation] = useState(null);
  const [callStatus, setCallStatus] = useState('connecting');

  // Initialize doctor time slots with date-wise structure
  useEffect(() => {
    const initialTimeSlots = generateDateWiseTimeSlots();
    setDoctorTimeSlots(initialTimeSlots);
    // Set default selected date to today
    setSelectedDate(new Date().toISOString().split('T')[0]);
  }, []);

  // Generate date-wise time slots for the next 7 days
  const generateDateWiseTimeSlots = () => {
    const timeSlots = [];
    const today = new Date();
    
    // Generate slots for next 7 days
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const dateString = date.toISOString().split('T')[0];
      const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
      
      // Skip Sundays
      if (dayName === 'Sunday') continue;
      
      // Morning slots (9 AM - 12 PM)
      for (let hour = 9; hour <= 12; hour++) {
        timeSlots.push({
          id: `${dateString}-morning-${hour}-00`,
          date: dateString,
          day: dayName,
          time: `${hour}:00 - ${hour}:30`,
          period: 'Morning',
          available: Math.random() > 0.3,
          booked: Math.random() > 0.7
        });
        timeSlots.push({
          id: `${dateString}-morning-${hour}-30`,
          date: dateString,
          day: dayName,
          time: `${hour}:30 - ${hour + 1}:00`,
          period: 'Morning',
          available: Math.random() > 0.3,
          booked: Math.random() > 0.7
        });
      }
      
      // Evening slots (4 PM - 7 PM)
      for (let hour = 16; hour <= 19; hour++) {
        timeSlots.push({
          id: `${dateString}-evening-${hour}-00`,
          date: dateString,
          day: dayName,
          time: `${hour}:00 - ${hour}:30`,
          period: 'Evening',
          available: Math.random() > 0.4,
          booked: Math.random() > 0.6
        });
        timeSlots.push({
          id: `${dateString}-evening-${hour}-30`,
          date: dateString,
          day: dayName,
          time: `${hour}:30 - ${hour + 1}:00`,
          period: 'Evening',
          available: Math.random() > 0.4,
          booked: Math.random() > 0.6
        });
      }
    }
    
    return timeSlots;
  };

  // Video Consultation Component
  const VideoConsultation = () => {
    if (!videoCallActive) return null;

    const handleEndCall = () => {
      setVideoCallActive(false);
      setCurrentConsultation(null);
      setCallStatus('disconnected');
    };

    const handleToggleVideo = () => {
      // Toggle video functionality
      alert('Video toggled');
    };

    const handleToggleAudio = () => {
      // Toggle audio functionality
      alert('Audio toggled');
    };

    return (
      <div style={styles.videoCallOverlay}>
        <div style={styles.videoCallContainer}>
          <div style={styles.videoCallHeader}>
            <div style={styles.callInfo}>
              <h3 style={styles.callTitle}>
                Video Consultation with {currentConsultation?.patientName}
              </h3>
              <p style={styles.callStatus}>
                Status: <span style={{
                  color: callStatus === 'connected' ? '#10B981' : 
                         callStatus === 'connecting' ? '#F59E0B' : '#EF4444'
                }}>{callStatus}</span>
              </p>
            </div>
            <button style={styles.endCallButton} onClick={handleEndCall}>
              📞 End Call
            </button>
          </div>

          <div style={styles.videoGrid}>
            {/* Patient Video */}
            <div style={styles.videoFeed}>
              <div style={styles.videoPlaceholder}>
                <div style={styles.videoIcon}>👤</div>
                <p style={styles.videoLabel}>{currentConsultation?.patientName}</p>
                <p style={styles.videoStatus}>Live Video Feed</p>
              </div>
            </div>

            {/* Doctor Video (Self View) */}
            <div style={styles.selfView}>
              <div style={styles.selfViewPlaceholder}>
                <div style={styles.videoIcon}>👨‍⚕️</div>
                <p style={styles.videoLabel}>You</p>
                <p style={styles.videoStatus}>Self View</p>
              </div>
            </div>
          </div>

          <div style={styles.callControls}>
            <button style={styles.controlButton} onClick={handleToggleVideo}>
              🎥 Video
            </button>
            <button style={styles.controlButton} onClick={handleToggleAudio}>
              🎤 Audio
            </button>
            <button style={styles.controlButton}>
              📺 Share Screen
            </button>
            <button style={styles.controlButton}>
              💬 Chat
            </button>
            <button style={styles.recordButton}>
              🔴 Record
            </button>
          </div>

          {/* Consultation Tools during call */}
          <div style={styles.callTools}>
            <h4 style={styles.toolsTitle}>Quick Tools</h4>
            <div style={styles.quickTools}>
              <button style={styles.toolButton}>
                💊 Prescription
              </button>
              <button style={styles.toolButton}>
                📋 Medical History
              </button>
              <button style={styles.toolButton}>
                🩺 Examination
              </button>
              <button style={styles.toolButton}>
                📝 Notes
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const handleStartVideoConsultation = (appointment) => {
    setCurrentConsultation(appointment);
    setVideoCallActive(true);
    setCallStatus('connecting');
    
    // Simulate call connection
    setTimeout(() => {
      setCallStatus('connected');
    }, 2000);
  };

  const getFilteredAppointments = () => {
    switch (appointmentFilter) {
      case 'pending': return appointments.pending;
      case 'upcoming': return appointments.upcoming;
      case 'cancelled': return appointments.cancelled;
      default: return appointments.upcoming;
    }
  };

  const getPatientFromAppointment = (appointment) => {
    return dashboardData.patients?.find(p => 
      p.name === appointment.patientName || p.id === appointment.patientId
    );
  };

  const handleTimeSlotsClick = (appointment) => {
    setSelectedAppointment(appointment);
    setShowTimeSlots(true);
  };

  const AppointmentCard = ({ appointment }) => {
    const patient = getPatientFromAppointment(appointment);

    return (
      <div style={styles.appointmentCard}>
        <div style={styles.appointmentHeader}>
          <div style={styles.appointmentPatient}>
            <div style={styles.profileIcon}>
              <span>👤</span>
            </div>
            <div style={styles.patientInfo}>
              <h3 style={styles.appointmentName}>
                {appointment.patientName}
              </h3>
              <p style={styles.appointmentMeta}>Age: {appointment.age} • {appointment.type || 'Consultation'}</p>
            </div>
          </div>
          <div style={styles.appointmentTime}>
            <strong>{appointment.time}</strong>
            <span>{appointment.date}</span>
            {appointmentFilter === 'pending' && appointment.requestedDate && (
              <span style={styles.requestedDate}>Requested: {appointment.requestedDate}</span>
            )}
            {appointmentFilter === 'cancelled' && appointment.cancelledDate && (
              <span style={styles.cancelledInfo}>Cancelled: {appointment.cancelledDate}</span>
            )}
          </div>
        </div>
        
        <div style={styles.appointmentDetails}>
          <p style={styles.appointmentIssue}><strong>Reason:</strong> {appointment.issue}</p>
          <p style={styles.appointmentDuration}><strong>Duration:</strong> {appointment.duration}</p>
          {appointment.priority && (
            <span style={{
              ...styles.priorityBadge,
              ...(appointment.priority === 'high' && styles.highPriorityBadge)
            }}>
              {appointment.priority}
            </span>
          )}
          {appointmentFilter === 'cancelled' && appointment.reason && (
            <p style={styles.cancelledReason}><strong>Cancellation Reason:</strong> {appointment.reason}</p>
          )}
        </div>

        <div style={styles.appointmentActions}>
          {appointmentFilter === 'pending' ? (
            <>
              <button 
                style={styles.successButton}
                onClick={() => handleApproveAppointment(appointment.id)}
              >
                Approve
              </button>
              <button 
                style={styles.timeSlotsButton}
                onClick={() => handleTimeSlotsClick(appointment)}
              >
                🕒 Time Slots
              </button>
              <button 
                style={styles.dangerButton}
                onClick={() => handleRejectAppointment(appointment.id)}
              >
                Reject
              </button>
              <button 
                style={styles.secondaryButton}
                onClick={() => handleAddNotes(appointment.patientName)}
              >
                Add Notes
              </button>
            </>
          ) : appointmentFilter === 'upcoming' ? (
            <>
              <button 
                style={styles.primaryButton}
                onClick={() => handleStartVideoConsultation(appointment)}
              >
                Start Consultation
              </button>
              <button 
                style={styles.dangerButton}
                onClick={() => handleCancelAppointment(appointment.id)}
              >
                Cancel
              </button>
              <button 
                style={styles.secondaryButton}
                onClick={() => handleAddNotes(appointment.patientName)}
              >
                Add Notes
              </button>
            </>
          ) : (
            <>
              <button 
                style={styles.viewHistoryButton}
                onClick={() => handleViewFullHistory(appointment.patientName)}
              >
                View History
              </button>
              <button 
                style={styles.secondaryButton}
                onClick={() => handleAddNotes(appointment.patientName)}
              >
                Add Notes
              </button>
            </>
          )}
        </div>
      </div>
    );
  };

  return (
    <div style={styles.mainContent}>
      <VideoConsultation />
      
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <h1 style={styles.greeting}>Appointments</h1>
          <p style={styles.subtitle}>Manage your upcoming and cancelled consultations</p>
        </div>
        {!isMobile && (
          <div style={styles.filterTabs}>
            <button
              style={{
                ...styles.filterTab,
                ...(appointmentFilter === 'pending' && styles.filterTabActive)
              }}
              onClick={() => setAppointmentFilter('pending')}
            >
              Pending ({appointments.pending.length})
            </button>
            <button
              style={{
                ...styles.filterTab,
                ...(appointmentFilter === 'upcoming' && styles.filterTabActive)
              }}
              onClick={() => setAppointmentFilter('upcoming')}
            >
              Upcoming ({appointments.upcoming.length})
            </button>
            <button
              style={{
                ...styles.filterTab,
                ...(appointmentFilter === 'cancelled' && styles.filterTabActive)
              }}
              onClick={() => setAppointmentFilter('cancelled')}
            >
              Cancelled ({appointments.cancelled.length})
            </button>
          </div>
        )}
      </div>

      {/* Mobile Filter Tabs */}
      {isMobile && (
        <div style={styles.mobileFilterTabs}>
          <select 
            value={appointmentFilter}
            onChange={(e) => setAppointmentFilter(e.target.value)}
            style={styles.mobileFilterSelect}
          >
            <option value="pending">Pending ({appointments.pending.length})</option>
            <option value="upcoming">Upcoming ({appointments.upcoming.length})</option>
            <option value="cancelled">Cancelled ({appointments.cancelled.length})</option>
          </select>
        </div>
      )}

      <div style={styles.appointmentsContainer}>
        {getFilteredAppointments().map(appointment => (
          <AppointmentCard key={appointment.id} appointment={appointment} />
        ))}
      </div>
    </div>
  );
};

const styles = {
  mainContent: {
    padding: 'clamp(15px, 3vw, 30px)',
    textAlign: 'left'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '30px',
    textAlign: 'left',
    flexWrap: 'wrap',
    gap: '20px'
  },
  headerLeft: {
    textAlign: 'left',
    flex: 1
  },
  greeting: {
    fontSize: 'clamp(20px, 4vw, 28px)',
    fontWeight: '700',
    color: '#1f2937',
    margin: '0 0 8px 0',
    textAlign: 'left'
  },
  subtitle: {
    fontSize: 'clamp(14px, 2vw, 16px)',
    color: '#6b7280',
    margin: 0,
    textAlign: 'left'
  },
  filterTabs: {
    display: 'flex',
    gap: '8px',
    backgroundColor: 'white',
    padding: '4px',
    borderRadius: '8px',
    border: '1px solid #e5e7eb',
    flexWrap: 'wrap'
  },
  mobileFilterTabs: {
    marginBottom: '20px'
  },
  mobileFilterSelect: {
    width: '100%',
    padding: '12px',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    fontSize: '16px'
  },
  filterTab: {
    padding: '8px 16px',
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    whiteSpace: 'nowrap'
  },
  filterTabActive: {
    backgroundColor: '#7C2A62',
    color: 'white'
  },
  appointmentsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    textAlign: 'left'
  },
  appointmentCard: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    border: '1px solid #e5e7eb',
    textAlign: 'left'
  },
  appointmentHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '16px',
    textAlign: 'left',
    flexWrap: 'wrap',
    gap: '15px'
  },
  appointmentPatient: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    textAlign: 'left',
    flex: 1
  },
  patientInfo: {
    textAlign: 'left',
    flex: 1
  },
  profileIcon: {
    position: 'relative',
    width: '40px',
    height: '40px',
    backgroundColor: '#F7D9EB',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '16px',
    flexShrink: 0
  },
  appointmentName: {
    fontSize: 'clamp(16px, 2.5vw, 18px)',
    fontWeight: '600',
    color: '#1f2937',
    margin: '0 0 4px 0',
    textAlign: 'left',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    flexWrap: 'wrap'
  },
  appointmentMeta: {
    fontSize: '14px',
    color: '#6b7280',
    margin: 0,
    textAlign: 'left'
  },
  appointmentTime: {
    textAlign: 'right',
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    flexShrink: 0
  },
  requestedDate: {
    fontSize: '12px',
    color: '#6b7280',
    fontStyle: 'italic'
  },
  cancelledInfo: {
    fontSize: '12px',
    color: '#EF4444',
    fontStyle: 'italic'
  },
  appointmentDetails: {
    marginBottom: '16px',
    textAlign: 'left'
  },
  appointmentIssue: {
    fontSize: '14px',
    color: '#6b7280',
    margin: '0 0 8px 0',
    textAlign: 'left'
  },
  appointmentDuration: {
    fontSize: '14px',
    color: '#6b7280',
    margin: '0 0 8px 0',
    textAlign: 'left'
  },
  cancelledReason: {
    fontSize: '14px',
    color: '#EF4444',
    margin: '0 0 8px 0',
    fontStyle: 'italic',
    textAlign: 'left'
  },
  priorityBadge: {
    backgroundColor: '#F59E0B',
    color: 'white',
    padding: '4px 8px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: '500',
    display: 'inline-block'
  },
  highPriorityBadge: {
    backgroundColor: '#EF4444'
  },
  appointmentActions: {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap',
    textAlign: 'left'
  },
  primaryButton: {
    backgroundColor: '#7C2A62',
    color: 'white',
    border: 'none',
    padding: '8px 12px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    minWidth: '120px'
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    color: '#7C2A62',
    border: '2px solid #7C2A62',
    padding: '6px 10px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    minWidth: '90px'
  },
  timeSlotsButton: {
    backgroundColor: '#F59E0B',
    color: 'white',
    border: 'none',
    padding: '8px 12px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    minWidth: '100px'
  },
  viewHistoryButton: {
    backgroundColor: '#7C2A62',
    color: 'white',
    border: 'none',
    padding: '6px 10px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    minWidth: '100px'
  },
  successButton: {
    backgroundColor: '#10B981',
    color: 'white',
    border: 'none',
    padding: '8px 12px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    minWidth: '80px'
  },
  dangerButton: {
    backgroundColor: '#EF4444',
    color: 'white',
    border: 'none',
    padding: '8px 12px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    minWidth: '80px'
  },
  // Video Consultation Styles
  videoCallOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.9)',
    zIndex: 10000,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  videoCallContainer: {
    backgroundColor: '#1f2937',
    color: 'white',
    borderRadius: '12px',
    padding: '20px',
    width: '95%',
    height: '95%',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '0 20px 25px -5px rgba(0,0,0,0.5)'
  },
  videoCallHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
    paddingBottom: '15px',
    borderBottom: '1px solid #374151'
  },
  callInfo: {
    flex: 1
  },
  callTitle: {
    fontSize: '20px',
    fontWeight: '600',
    margin: '0 0 8px 0'
  },
  callStatus: {
    fontSize: '14px',
    color: '#9CA3AF',
    margin: 0
  },
  endCallButton: {
    backgroundColor: '#EF4444',
    color: 'white',
    border: 'none',
    padding: '12px 20px',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer'
  },
  videoGrid: {
    flex: 1,
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    gap: '20px',
    marginBottom: '20px'
  },
  videoFeed: {
    backgroundColor: '#374151',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative'
  },
  selfView: {
    backgroundColor: '#374151',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  videoPlaceholder: {
    textAlign: 'center',
    padding: '40px'
  },
  selfViewPlaceholder: {
    textAlign: 'center',
    padding: '20px'
  },
  videoIcon: {
    fontSize: '64px',
    marginBottom: '16px'
  },
  videoLabel: {
    fontSize: '18px',
    fontWeight: '600',
    marginBottom: '8px'
  },
  videoStatus: {
    fontSize: '14px',
    color: '#9CA3AF'
  },
  callControls: {
    display: 'flex',
    justifyContent: 'center',
    gap: '15px',
    padding: '20px 0',
    borderTop: '1px solid #374151'
  },
  controlButton: {
    backgroundColor: '#374151',
    color: 'white',
    border: 'none',
    padding: '12px 20px',
    borderRadius: '8px',
    fontSize: '14px',
    cursor: 'pointer',
    minWidth: '100px'
  },
  recordButton: {
    backgroundColor: '#EF4444',
    color: 'white',
    border: 'none',
    padding: '12px 20px',
    borderRadius: '8px',
    fontSize: '14px',
    cursor: 'pointer',
    minWidth: '100px'
  },
  callTools: {
    padding: '20px',
    backgroundColor: '#374151',
    borderRadius: '8px',
    marginTop: '10px'
  },
  quickTools: {
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap'
  }
};

export default AppointmentsContent;