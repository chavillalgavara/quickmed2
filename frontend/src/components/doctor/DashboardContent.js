import React, { useState } from 'react';

const DashboardContent = ({ dashboardData, state, actions }) => {
  const { timeRange, appointments } = state;
  const { 
    setTimeRange, 
    setConsultationDetails, 
    handleStartConversation, 
    handleStartConsultation, 
    handleCancelAppointment,
    handleAddNotes
  } = actions;

  const isMobile = window.innerWidth <= 768;
  const isTablet = window.innerWidth <= 1024;

  // State for current consultation with enhanced functionality
  const [currentConsultation, setCurrentConsultation] = useState(null);
  const [activeTool, setActiveTool] = useState('prescription');
  const [consultationNotes, setConsultationNotes] = useState('');
  const [prescriptionData, setPrescriptionData] = useState({
    medications: [],
    dosage: '',
    instructions: ''
  });

  // State for video consultation
  const [videoCallActive, setVideoCallActive] = useState(false);
  const [callStatus, setCallStatus] = useState('connecting');

  const AnalyticsCard = ({ icon, number, label, color }) => (
    <div style={styles.analyticsCard}>
      <div style={{...styles.analyticsIcon, backgroundColor: color}}>{icon}</div>
      <div style={styles.analyticsContent}>
        <h3 style={styles.analyticsNumber}>{number}</h3>
        <p style={styles.analyticsLabel}>{label}</p>
      </div>
    </div>
  );

  const ConsultationCard = ({ consultation }) => (
    <div style={styles.consultationCard}>
      <div style={styles.consultationHeader}>
        <div style={styles.patientInfo}>
          <div style={styles.profileIcon}>👤</div>
          <div>
            <h4 style={styles.patientName}>{consultation.patientName}</h4>
            <p style={styles.consultationTime}>
              {consultation.time} • {consultation.date}
            </p>
          </div>
        </div>
        <span style={styles.statusBadge}>{consultation.status}</span>
      </div>
      <p style={styles.consultationIssue}>{consultation.issue}</p>
      <div style={styles.consultationActions}>
        <button
          style={styles.viewDetailsButton}
          onClick={() => setConsultationDetails(consultation)}
        >
          View Details
        </button>
        <button
          style={styles.secondaryButton}
          onClick={() => handleAddNotes(consultation.patientName)}
        >
          Add Notes
        </button>
      </div>
    </div>
  );

  const UpcomingAppointmentCard = ({ appointment }) => (
    <div style={styles.upcomingCard}>
      <div style={styles.upcomingHeader}>
        <div style={styles.profileIconLarge}>👤</div>
        <div style={styles.upcomingPatientInfo}>
          <h3 style={styles.upcomingPatientName}>{appointment.patientName}</h3>
          <p style={styles.upcomingPatientAge}>Age: {appointment.age}</p>
        </div>
      </div>
      <div style={styles.upcomingDetails}>
        <div style={styles.detailItem}>
          <span style={styles.detailLabel}>Time:</span>
          <span style={styles.detailValue}>{appointment.time}</span>
        </div>
        <div style={styles.detailItem}>
          <span style={styles.detailLabel}>Date:</span>
          <span style={styles.detailValue}>{appointment.date}</span>
        </div>
        <div style={styles.detailItem}>
          <span style={styles.detailLabel}>Duration:</span>
          <span style={styles.detailValue}>{appointment.duration}</span>
        </div>
        <div style={styles.detailItem}>
          <span style={styles.detailLabel}>Reason:</span>
          <span style={styles.detailValue}>{appointment.issue}</span>
        </div>
      </div>
      <div style={styles.upcomingActions}>
        <button 
          style={styles.primaryButton}
          onClick={() => {
            const consultation = handleStartConsultation(appointment.id);
            if (consultation) {
              setCurrentConsultation(consultation);
              setVideoCallActive(true);
              setCallStatus('connecting');
              
              // Simulate call connection
              setTimeout(() => {
                setCallStatus('connected');
              }, 2000);
            }
          }}
        >
          Start Consultation
        </button>
        <button 
          style={styles.dangerButton}
          onClick={() => handleCancelAppointment(appointment.id)}
        >
          Cancel
        </button>
      </div>
    </div>
  );

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

  // Enhanced Current Consultation with functional tools
  const CurrentConsultationCard = () => {
    if (!currentConsultation || videoCallActive) return null;

    const handleAddMedication = () => {
      const medName = prompt('Enter medication name:');
      if (medName) {
        const dosage = prompt('Enter dosage:');
        const instructions = prompt('Enter instructions:');
        
        setPrescriptionData(prev => ({
          ...prev,
          medications: [...prev.medications, {
            name: medName,
            dosage: dosage,
            instructions: instructions,
            id: Date.now()
          }]
        }));
      }
    };

    const handleRemoveMedication = (medId) => {
      setPrescriptionData(prev => ({
        ...prev,
        medications: prev.medications.filter(med => med.id !== medId)
      }));
    };

    const handleSavePrescription = () => {
      alert('Prescription saved successfully!');
    };

    const handleSaveNotes = () => {
      alert('Consultation notes saved!');
    };

    const handleEndConsultation = () => {
      if (window.confirm('Are you sure you want to end this consultation?')) {
        setCurrentConsultation(null);
        setActiveTool('prescription');
        setConsultationNotes('');
        setPrescriptionData({ medications: [], dosage: '', instructions: '' });
        alert('Consultation ended successfully!');
      }
    };

    const renderToolContent = () => {
      switch (activeTool) {
        case 'prescription':
          return (
            <div style={styles.toolContent}>
              <div style={styles.toolHeader}>
                <h4>Prescription Management</h4>
                <button style={styles.smallButton} onClick={handleAddMedication}>
                  + Add Medication
                </button>
              </div>
              
              {prescriptionData.medications.length > 0 ? (
                <div style={styles.medicationsList}>
                  {prescriptionData.medications.map(med => (
                    <div key={med.id} style={styles.medicationItem}>
                      <div style={styles.medicationInfo}>
                        <strong>{med.name}</strong>
                        <span>Dosage: {med.dosage}</span>
                        <span>Instructions: {med.instructions}</span>
                      </div>
                      <button 
                        style={styles.deleteButton}
                        onClick={() => handleRemoveMedication(med.id)}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p style={styles.noData}>No medications added yet.</p>
              )}
              
              <button style={styles.primaryButton} onClick={handleSavePrescription}>
                Save Prescription
              </button>
            </div>
          );

        case 'medicalHistory':
          const patient = dashboardData.patients.find(p => p.name === currentConsultation.patientName);
          return (
            <div style={styles.toolContent}>
              <h4>Medical History - {currentConsultation.patientName}</h4>
              {patient ? (
                <div style={styles.medicalHistory}>
                  <div style={styles.historySection}>
                    <h5>Basic Information</h5>
                    <p>Age: {patient.age}</p>
                    <p>Blood Group: {patient.bloodGroup}</p>
                    <p>Conditions: {patient.conditions.join(', ')}</p>
                  </div>
                  
                  <div style={styles.historySection}>
                    <h5>Previous Consultations</h5>
                    {patient.medicalHistory.map((record, index) => (
                      <div key={index} style={styles.historyRecord}>
                        <strong>{record.date}</strong>
                        <p>Diagnosis: {record.diagnosis}</p>
                        <p>Prescription: {record.prescription}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <p>No medical history available.</p>
              )}
            </div>
          );

        case 'examination':
          return (
            <div style={styles.toolContent}>
              <h4>Examination Notes</h4>
              <textarea
                style={styles.notesTextarea}
                placeholder="Enter examination findings, vital signs, observations..."
                rows="8"
                value={consultationNotes}
                onChange={(e) => setConsultationNotes(e.target.value)}
              />
              <button style={styles.primaryButton} onClick={handleSaveNotes}>
                Save Examination Notes
              </button>
            </div>
          );

        default:
          return null;
      }
    };

    return (
      <div style={styles.currentConsultationCard}>
        <div style={styles.currentConsultationHeader}>
          <div style={styles.currentConsultationIcon}>🩺</div>
          <div style={styles.currentConsultationInfo}>
            <h3 style={styles.currentConsultationTitle}>Ongoing Consultation</h3>
            <p style={styles.currentConsultationPatient}>
              With {currentConsultation.patientName} • Age: {currentConsultation.age}
            </p>
            <p style={styles.consultationReason}>Reason: {currentConsultation.issue}</p>
          </div>
          <button 
            style={styles.endConsultationButton}
            onClick={handleEndConsultation}
          >
            End Consultation
          </button>
        </div>
        
        <div style={styles.consultationTimer}>
          <span style={styles.timerText}>Consultation in progress...</span>
          <div style={styles.timerControls}>
            <button style={styles.timerButton}>⏸️ Pause</button>
            <button style={styles.timerButton}>⏹️ Stop</button>
            <button style={styles.timerButton}>📝 Quick Notes</button>
          </div>
        </div>

        <div style={styles.consultationTools}>
          <h4 style={styles.toolsTitle}>Consultation Tools</h4>
          <div style={styles.toolsGrid}>
            <button 
              style={{
                ...styles.toolButton,
                ...(activeTool === 'prescription' && styles.activeToolButton)
              }}
              onClick={() => setActiveTool('prescription')}
            >
              <span style={styles.toolIcon}>💊</span>
              <span style={styles.toolLabel}>Prescription</span>
            </button>
            <button 
              style={{
                ...styles.toolButton,
                ...(activeTool === 'medicalHistory' && styles.activeToolButton)
              }}
              onClick={() => setActiveTool('medicalHistory')}
            >
              <span style={styles.toolIcon}>📋</span>
              <span style={styles.toolLabel}>Medical History</span>
            </button>
            <button 
              style={{
                ...styles.toolButton,
                ...(activeTool === 'examination' && styles.activeToolButton)
              }}
              onClick={() => setActiveTool('examination')}
            >
              <span style={styles.toolIcon}>🩺</span>
              <span style={styles.toolLabel}>Examination</span>
            </button>
          </div>

          {/* Tool Content Area */}
          <div style={styles.toolContentArea}>
            {renderToolContent()}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div style={styles.mainContent}>
      {/* Video Consultation Overlay */}
      <VideoConsultation />

      {/* Analytics Grid */}
      <div style={{
        ...styles.analyticsGrid,
        gridTemplateColumns: isMobile ? '1fr' : isTablet ? '1fr 1fr' : '1fr 1fr 1fr 1fr',
        gap: isMobile ? '15px' : '20px'
      }}>
        <AnalyticsCard
          icon="📅"
          number={dashboardData.appointments[timeRange]}
          label="Total Appointments"
          color="#F7D9EB"
        />
        <AnalyticsCard
          icon="🩺"
          number={dashboardData.consultations[timeRange]}
          label="Consultations Completed"
          color="#E8F4FD"
        />
        <AnalyticsCard
          icon="❌"
          number={dashboardData.cancelled[timeRange]}
          label="Cancelled"
          color="#FFE6E6"
        />
        
        {!isMobile && (
          <div style={styles.timeRangeSelector}>
            <button
              style={{
                ...styles.timeRangeButton,
                ...(timeRange === 'today' && styles.timeRangeButtonActive)
              }}
              onClick={() => setTimeRange('today')}
            >
              Today
            </button>
            <button
              style={{
                ...styles.timeRangeButton,
                ...(timeRange === 'week' && styles.timeRangeButtonActive)
              }}
              onClick={() => setTimeRange('week')}
            >
              This Week
            </button>
            <button
              style={{
                ...styles.timeRangeButton,
                ...(timeRange === 'month' && styles.timeRangeButtonActive)
              }}
              onClick={() => setTimeRange('month')}
            >
              This Month
            </button>
          </div>
        )}
      </div>

      {/* Mobile Time Range Selector */}
      {isMobile && (
        <div style={styles.mobileTimeRange}>
          <button
            style={{
              ...styles.timeRangeButton,
              ...(timeRange === 'today' && styles.timeRangeButtonActive)
            }}
            onClick={() => setTimeRange('today')}
          >
            Today
          </button>
          <button
            style={{
              ...styles.timeRangeButton,
              ...(timeRange === 'week' && styles.timeRangeButtonActive)
            }}
            onClick={() => setTimeRange('week')}
          >
            This Week
          </button>
          <button
            style={{
              ...styles.timeRangeButton,
              ...(timeRange === 'month' && styles.timeRangeButtonActive)
            }}
            onClick={() => setTimeRange('month')}
            >
            This Month
          </button>
        </div>
      )}

      {/* Current Consultation Section */}
      {currentConsultation && !videoCallActive && <CurrentConsultationCard />}

      <div style={{
        ...styles.contentGrid,
        gridTemplateColumns: isMobile ? '1fr' : isTablet ? '1fr' : '2fr 1fr',
        gap: isMobile ? '20px' : '30px'
      }}>
        {/* Recent Consultations */}
        <div style={styles.section}>
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>Recent Patient Consultations</h2>
            <span style={styles.viewAll}>View All</span>
          </div>
          <div style={styles.consultationsList}>
            {dashboardData.recentConsultations.map(consultation => (
              <ConsultationCard key={consultation.id} consultation={consultation} />
            ))}
          </div>
        </div>

        {/* Upcoming Appointments Sidebar */}
        <div style={styles.sidebarSection}>
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>Upcoming Appointment</h2>
          </div>
          {appointments.upcoming.slice(0, 1).map(appointment => (
            <UpcomingAppointmentCard key={appointment.id} appointment={appointment} />
          ))}

          <div style={styles.moreAppointments}>
            <h4 style={styles.moreAppointmentsTitle}>More Appointments Today</h4>
            {appointments.upcoming.slice(1, 3).map(appointment => (
              <div key={appointment.id} style={styles.smallAppointmentCard}>
                <div style={styles.smallAppointmentInfo}>
                  <span style={styles.smallAppointmentTime}>{appointment.time}</span>
                  <span style={styles.smallAppointmentName}>{appointment.patientName}</span>
                </div>
                <span style={styles.smallAppointmentDuration}>
                  {appointment.duration}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  mainContent: {
    padding: 'clamp(15px, 3vw, 30px)'
  },
  analyticsGrid: {
    display: 'grid',
    marginBottom: '30px'
  },
  mobileTimeRange: {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px',
    justifyContent: 'center'
  },
  analyticsCard: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    display: 'flex',
    alignItems: 'center',
    border: '1px solid #e5e7eb'
  },
  analyticsIcon: {
    fontSize: 'clamp(24px, 3vw, 32px)',
    marginRight: '16px',
    width: 'clamp(50px, 8vw, 60px)',
    height: 'clamp(50px, 8vw, 60px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '12px'
  },
  analyticsContent: {
    flex: 1
  },
  analyticsNumber: {
    fontSize: 'clamp(20px, 3vw, 28px)',
    fontWeight: '700',
    color: '#1f2937',
    margin: '0 0 4px 0'
  },
  analyticsLabel: {
    fontSize: 'clamp(12px, 1.5vw, 14px)',
    color: '#6b7280',
    margin: 0
  },
  timeRangeSelector: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  timeRangeButton: {
    padding: '12px 16px',
    backgroundColor: 'white',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    flex: 1
  },
  timeRangeButtonActive: {
    backgroundColor: '#7C2A62',
    color: 'white',
    borderColor: '#7C2A62'
  },
  contentGrid: {
    display: 'grid'
  },
  section: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '20px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    border: '1px solid #e5e7eb'
  },
  sidebarSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
    flexWrap: 'wrap',
    gap: '10px'
  },
  sectionTitle: {
    fontSize: 'clamp(18px, 2.5vw, 20px)',
    fontWeight: '600',
    color: '#1f2937',
    margin: 0
  },
  viewAll: {
    fontSize: '14px',
    color: '#7C2A62',
    fontWeight: '500',
    cursor: 'pointer'
  },
  consultationsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  consultationCard: {
    padding: '16px',
    border: '1px solid #e5e7eb',
    borderRadius: '10px'
  },
  consultationHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '12px',
    flexWrap: 'wrap',
    gap: '10px'
  },
  patientInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  profileIcon: {
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
  patientName: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#1f2937',
    margin: '0 0 4px 0'
  },
  consultationTime: {
    fontSize: '14px',
    color: '#6b7280',
    margin: 0
  },
  statusBadge: {
    backgroundColor: '#10B981',
    color: 'white',
    padding: '4px 12px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '500',
    flexShrink: 0
  },
  consultationIssue: {
    fontSize: '14px',
    color: '#6b7280',
    margin: '0 0 16px 0',
    lineHeight: '1.5'
  },
  consultationActions: {
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap'
  },
  viewDetailsButton: {
    backgroundColor: '#7C2A62',
    color: 'white',
    border: 'none',
    padding: '8px 12px',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    minWidth: '100px'
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    color: '#7C2A62',
    border: '2px solid #7C2A62',
    padding: '8px 12px',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    minWidth: '90px'
  },
  primaryButton: {
    backgroundColor: '#7C2A62',
    color: 'white',
    border: 'none',
    padding: '10px 16px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    flex: 1,
    minWidth: '140px'
  },
  dangerButton: {
    backgroundColor: '#EF4444',
    color: 'white',
    border: 'none',
    padding: '10px 16px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    flex: 1,
    minWidth: '100px'
  },
  upcomingCard: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    border: '1px solid #e5e7eb'
  },
  upcomingHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    marginBottom: '20px'
  },
  profileIconLarge: {
    width: '60px',
    height: '60px',
    backgroundColor: '#F7D9EB',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '20px',
    flexShrink: 0
  },
  upcomingPatientInfo: {
    flex: 1
  },
  upcomingPatientName: {
    fontSize: 'clamp(18px, 2.5vw, 20px)',
    fontWeight: '600',
    color: '#1f2937',
    margin: '0 0 4px 0'
  },
  upcomingPatientAge: {
    fontSize: '14px',
    color: '#6b7280',
    margin: 0
  },
  upcomingDetails: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    marginBottom: '20px'
  },
  detailItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  detailLabel: {
    fontSize: '14px',
    color: '#6b7280',
    fontWeight: '500'
  },
  detailValue: {
    fontSize: '14px',
    color: '#1f2937',
    fontWeight: '600'
  },
  upcomingActions: {
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap'
  },
  moreAppointments: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    border: '1px solid #e5e7eb'
  },
  moreAppointmentsTitle: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#1f2937',
    margin: '0 0 16px 0'
  },
  smallAppointmentCard: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 0',
    borderBottom: '1px solid #e5e7eb'
  },
  smallAppointmentInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px'
  },
  smallAppointmentTime: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#1f2937'
  },
  smallAppointmentName: {
    fontSize: '12px',
    color: '#6b7280'
  },
  smallAppointmentDuration: {
    fontSize: '12px',
    color: '#7C2A62',
    fontWeight: '500'
  },
  // Enhanced Current Consultation Styles
  currentConsultationCard: {
    backgroundColor: '#7C2A62',
    color: 'white',
    padding: '24px',
    borderRadius: '12px',
    marginBottom: '24px',
    boxShadow: '0 4px 12px rgba(124, 42, 98, 0.3)'
  },
  currentConsultationHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    marginBottom: '20px',
    flexWrap: 'wrap'
  },
  currentConsultationIcon: {
    fontSize: '32px',
    flexShrink: 0
  },
  currentConsultationInfo: {
    flex: 1
  },
  currentConsultationTitle: {
    fontSize: '20px',
    fontWeight: '700',
    margin: '0 0 4px 0',
    color: 'white'
  },
  currentConsultationPatient: {
    fontSize: '16px',
    margin: '0 0 4px 0',
    opacity: 0.9
  },
  consultationReason: {
    fontSize: '14px',
    margin: 0,
    opacity: 0.8
  },
  endConsultationButton: {
    backgroundColor: '#EF4444',
    color: 'white',
    border: 'none',
    padding: '10px 16px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    flexShrink: 0
  },
  consultationTimer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
    padding: '16px',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: '8px',
    flexWrap: 'wrap',
    gap: '12px'
  },
  timerText: {
    fontSize: '16px',
    fontWeight: '600'
  },
  timerControls: {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap'
  },
  timerButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    color: 'white',
    border: 'none',
    padding: '8px 12px',
    borderRadius: '6px',
    fontSize: '12px',
    cursor: 'pointer',
    backdropFilter: 'blur(10px)'
  },
  consultationTools: {
    borderTop: '1px solid rgba(255,255,255,0.2)',
    paddingTop: '20px'
  },
  toolsTitle: {
    fontSize: '16px',
    fontWeight: '600',
    margin: '0 0 16px 0',
    color: 'white'
  },
  toolsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
    gap: '12px',
    marginBottom: '20px'
  },
  toolButton: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    color: 'white',
    border: 'none',
    padding: '16px 12px',
    borderRadius: '8px',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px',
    transition: 'background-color 0.3s ease'
  },
  activeToolButton: {
    backgroundColor: 'rgba(255,255,255,0.3)',
    border: '2px solid white'
  },
  toolIcon: {
    fontSize: '20px'
  },
  toolLabel: {
    fontSize: '12px',
    fontWeight: '500'
  },
  toolContentArea: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: '8px',
    padding: '20px',
    minHeight: '200px'
  },
  toolContent: {
    color: 'white'
  },
  toolHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px',
    flexWrap: 'wrap',
    gap: '10px'
  },
  smallButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    color: 'white',
    border: 'none',
    padding: '8px 12px',
    borderRadius: '6px',
    fontSize: '12px',
    cursor: 'pointer'
  },
  medicationsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    marginBottom: '16px'
  },
  medicationItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: '6px',
    flexWrap: 'wrap',
    gap: '10px'
  },
  medicationInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    flex: 1
  },
  deleteButton: {
    backgroundColor: '#EF4444',
    color: 'white',
    border: 'none',
    padding: '6px 10px',
    borderRadius: '4px',
    fontSize: '11px',
    cursor: 'pointer'
  },
  noData: {
    textAlign: 'center',
    opacity: 0.7,
    marginBottom: '16px'
  },
  medicalHistory: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  historySection: {
    padding: '12px',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: '6px'
  },
  historyRecord: {
    padding: '8px',
    borderBottom: '1px solid rgba(255,255,255,0.1)',
    marginBottom: '8px'
  },
  notesTextarea: {
    width: '100%',
    padding: '12px',
    borderRadius: '6px',
    border: '1px solid rgba(255,255,255,0.3)',
    backgroundColor: 'rgba(255,255,255,0.1)',
    color: 'white',
    fontSize: '14px',
    marginBottom: '12px',
    resize: 'vertical'
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

export default DashboardContent;