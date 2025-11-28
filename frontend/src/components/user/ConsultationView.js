import React, { useState, useEffect, useRef } from 'react';

const ConsultationView = ({
  doctorSearchQuery,
  setDoctorSearchQuery,
  selectedSpecialty,
  setSelectedSpecialty,
  selectedTimeSlot,
  setSelectedTimeSlot,
  selectedExperience,
  setSelectedExperience,
  selectedLanguage,
  setSelectedLanguage,
  filteredDoctors,
  specialties,
  allTimeSlots,
  setActiveView,
  handleBookAppointment,
  startDoctorChat,
  userAppointments // Add this prop to check existing appointments
}) => {
  const [showFilters, setShowFilters] = useState(false);
  const [showTimeSlotsModal, setShowTimeSlotsModal] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedAppointmentTime, setSelectedAppointmentTime] = useState('');
  const [selectedAppointmentDate, setSelectedAppointmentDate] = useState('');
  const [videoCallStatus, setVideoCallStatus] = useState('idle');
  const [showVideoCallModal, setShowVideoCallModal] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  
  // Screen Recording States
  const [isRecording, setIsRecording] = useState(false);
  const [isRecordingPaused, setIsRecordingPaused] = useState(false);
  const [recordedTime, setRecordedTime] = useState(0);
  const [recordingPermission, setRecordingPermission] = useState(false);
  const [showRecordingControls, setShowRecordingControls] = useState(false);
  
  // New state for appointment booking flow
  const [showAppointmentMessage, setShowAppointmentMessage] = useState(false);
  const [doctorForVideoConsult, setDoctorForVideoConsult] = useState(null);
  const [bookedAppointments, setBookedAppointments] = useState([]);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  // Refs - Fixed the empty const declaration
  const streamRef = useRef(null);
  const recordingIntervalRef = useRef(null);

  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  // Initialize with existing appointments
  useEffect(() => {
    if (userAppointments) {
      setBookedAppointments(userAppointments);
    }
  }, [userAppointments]);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Timer for call duration
  useEffect(() => {
    let interval;
    if (videoCallStatus === 'connected') {
      interval = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [videoCallStatus]);

  // Timer for recording duration
  useEffect(() => {
    let interval;
    if (isRecording && !isRecordingPaused) {
      interval = setInterval(() => {
        setRecordedTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording, isRecordingPaused]);

  // Cleanup on unmount - Fixed ref dependency issues
  useEffect(() => {
    const currentRecordingInterval = recordingIntervalRef.current;
    const currentStream = streamRef.current;

    return () => {
      if (currentRecordingInterval) {
        clearInterval(currentRecordingInterval);
      }
      if (currentStream) {
        currentStream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  // Get appointment details for a doctor
  const getAppointmentDetails = (doctorId) => {
    return bookedAppointments.find(appt => 
      appt.doctorId === doctorId && 
      appt.status === 'confirmed'
    );
  };

  // Enhanced navigation handler that scrolls to top
  const handleBackToAppointments = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      setActiveView('appointments');
    }, 100);
  };

  const BackButton = ({ onClick, text = 'Back' }) => (
    <button 
      style={{
        padding: '0.5rem 1rem',
        backgroundColor: 'transparent',
        color: '#7C2A62',
        border: '1px solid #7C2A62',
        borderRadius: '6px',
        cursor: 'pointer',
        fontSize: '0.9rem'
      }}
      onClick={onClick}
      type="button"
    >
      ← {text}
    </button>
  );

  const handleClearFilters = () => {
    setSelectedSpecialty('');
    setSelectedTimeSlot('');
    if (setSelectedExperience) setSelectedExperience('');
    if (setSelectedLanguage) setSelectedLanguage('');
  };

  // Handle Book Appointment Click
  const handleBookAppointmentClick = (doctor) => {
    setSelectedDoctor(doctor);
    setSelectedAppointmentDate('');
    setSelectedAppointmentTime('');
    setShowTimeSlotsModal(true);
  };

  // Handle Video Consultation Click - UPDATED with time validation
  const handleVideoConsultationClick = (doctor) => {
    const appointment = getAppointmentDetails(doctor.id);
    
    if (!appointment) {
      // Show appointment message and store doctor for later
      setDoctorForVideoConsult(doctor);
      setShowAppointmentMessage(true);
      return;
    }

    // Check if it's the correct date and time for the consultation
    const appointmentDate = new Date(appointment.date);
    const today = new Date();
    const isToday = appointmentDate.toDateString() === today.toDateString();
    
    if (!isToday) {
      alert(`Your video consultation with Dr. ${doctor.name} is scheduled for ${appointmentDate.toLocaleDateString()}. Please join on that date.`);
      return;
    }

    // Check if current time is within the allowed window
    const appointmentTime = appointment.time;
    const [time, period] = appointmentTime.split(' ');
    let [hours, minutes] = time.split(':').map(Number);
    
    // Convert to 24-hour format
    if (period === 'PM' && hours !== 12) hours += 12;
    if (period === 'AM' && hours === 12) hours = 0;

    const appointmentDateTime = new Date(appointmentDate);
    appointmentDateTime.setHours(hours, minutes, 0, 0);

    const currentTime = currentDateTime.getTime();
    const appointmentStartTime = appointmentDateTime.getTime() - (15 * 60 * 1000); // 15 minutes before
    const appointmentEndTime = appointmentDateTime.getTime() + (15 * 60 * 1000); // 15 minutes after

    if (currentTime < appointmentStartTime) {
      const timeUntil = Math.ceil((appointmentStartTime - currentTime) / (1000 * 60));
      alert(`Your video consultation with Dr. ${doctor.name} will be available in ${timeUntil} minutes. Please join at your scheduled time: ${appointmentTime} on ${appointmentDate.toLocaleDateString()}`);
      return;
    }

    if (currentTime > appointmentEndTime) {
      alert(`Your video consultation time with Dr. ${doctor.name} has ended. The consultation window was from 15 minutes before to 15 minutes after your scheduled time: ${appointmentTime} on ${appointmentDate.toLocaleDateString()}`);
      return;
    }

    // If all checks pass, proceed with video call
    setSelectedDoctor(doctor);
    setVideoCallStatus('connecting');
    setShowVideoCallModal(true);
    setCallDuration(0);
    setIsMuted(false);
    setIsVideoOff(false);
    setRecordedTime(0);
    setIsRecording(false);
    setIsRecordingPaused(false);
    setShowRecordingControls(false);
    
    // Request recording permission
    requestRecordingPermission();
    
    // Simulate connection process
    setTimeout(() => {
      setVideoCallStatus('connected');
      setShowRecordingControls(true);
    }, 3000);
  };

  // Handle booking appointment from the message modal
  const handleBookFromMessage = () => {
    if (doctorForVideoConsult) {
      setSelectedDoctor(doctorForVideoConsult);
      setSelectedAppointmentDate('');
      setSelectedAppointmentTime('');
      setShowAppointmentMessage(false);
      setShowTimeSlotsModal(true);
    }
  };

  // Request screen recording permission
  const requestRecordingPermission = async () => {
    try {
      setRecordingPermission(true);
      console.log('Screen recording permission granted');
    } catch (error) {
      console.error('Error requesting recording permission:', error);
      setRecordingPermission(false);
    }
  };

  // Start Screen Recording
  const startRecording = async () => {
    if (!recordingPermission) {
      alert('Recording permission not granted');
      return;
    }

    try {
      setIsRecording(true);
      setIsRecordingPaused(false);
      setRecordedTime(0);
      
      console.log('Screen recording started');
      
    } catch (error) {
      console.error('Error starting recording:', error);
      alert('Failed to start recording. Please check permissions.');
    }
  };

  // Pause Recording
  const pauseRecording = () => {
    if (isRecording && !isRecordingPaused) {
      setIsRecordingPaused(true);
      console.log('Recording paused');
    }
  };

  // Resume Recording
  const resumeRecording = () => {
    if (isRecording && isRecordingPaused) {
      setIsRecordingPaused(false);
      console.log('Recording resumed');
    }
  };

  // Stop Recording
  const stopRecording = () => {
    setIsRecording(false);
    setIsRecordingPaused(false);
    
    console.log('Recording stopped. Total duration:', formatTime(recordedTime));
    
    setTimeout(() => {
      alert(`Recording saved successfully!\nDuration: ${formatTime(recordedTime)}\nThe recording has been stored in your consultations history.`);
    }, 500);
  };

  // Toggle Recording (start/pause/resume)
  const toggleRecording = () => {
    if (!isRecording) {
      startRecording();
    } else if (isRecordingPaused) {
      resumeRecording();
    } else {
      pauseRecording();
    }
  };

  // Handle End Video Call
  const handleEndVideoCall = () => {
    if (isRecording) {
      stopRecording();
    }
    
    setVideoCallStatus('ended');
    setTimeout(() => {
      setShowVideoCallModal(false);
      setVideoCallStatus('idle');
      setSelectedDoctor(null);
      setShowRecordingControls(false);
      
      alert(`Video consultation ended with Dr. ${selectedDoctor.name}\nDuration: ${formatTime(callDuration)}\nThank you for using our service!`);
    }, 2000);
  };

  // Format time for display
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Toggle audio mute
  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  // Toggle video
  const toggleVideo = () => {
    setIsVideoOff(!isVideoOff);
  };

  // Handle Date Selection
  const handleDateSelect = (date) => {
    setSelectedAppointmentDate(date);
    setSelectedAppointmentTime('');
  };

  // Handle Time Slot Selection
  const handleTimeSlotSelect = (timeSlot) => {
    setSelectedAppointmentTime(timeSlot);
  };

  // Generate available dates (next 7 days)
  const getAvailableDates = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      const formattedDate = date.toISOString().split('T')[0];
      const displayDate = date.toLocaleDateString('en-US', { 
        weekday: 'short', 
        month: 'short', 
        day: 'numeric' 
      });
      
      dates.push({
        value: formattedDate,
        display: displayDate,
        isToday: i === 0
      });
    }
    
    return dates;
  };

  // Confirm Appointment Booking - UPDATED to enable video consult
  const handleConfirmAppointment = () => {
    if (!selectedDoctor || !selectedAppointmentDate || !selectedAppointmentTime) {
      return;
    }

    // Book the appointment
    handleBookAppointment(selectedDoctor, selectedAppointmentDate, selectedAppointmentTime);
    
    // Add to local booked appointments
    const newAppointment = {
      doctorId: selectedDoctor.id,
      doctorName: selectedDoctor.name,
      date: selectedAppointmentDate,
      time: selectedAppointmentTime,
      status: 'confirmed',
      id: Date.now().toString()
    };
    
    setBookedAppointments(prev => [...prev, newAppointment]);
    
    // Close modal and reset states
    setShowTimeSlotsModal(false);
    setSelectedDoctor(null);
    setSelectedAppointmentDate('');
    setSelectedAppointmentTime('');
    
    // Show success message with video consult details
    const appointmentDate = new Date(newAppointment.date);
    const isToday = appointmentDate.toDateString() === new Date().toDateString();
    
    if (isToday) {
      setTimeout(() => {
        alert(`Appointment booked successfully with Dr. ${newAppointment.doctorName}!\n\nDate: ${newAppointment.date}\nTime: ${newAppointment.time}\n\nVideo consultation will be available 15 minutes before your scheduled time until 15 minutes after.`);
      }, 100);
    } else {
      setTimeout(() => {
        alert(`Appointment booked successfully with Dr. ${newAppointment.doctorName}!\n\nDate: ${newAppointment.date}\nTime: ${newAppointment.time}\n\nVideo consultation will be available on ${appointmentDate.toLocaleDateString()} from 15 minutes before your scheduled time until 15 minutes after.`);
      }, 100);
    }
  };

  // Get consultation status for a doctor
  const getConsultationStatus = (doctorId) => {
    const appointment = getAppointmentDetails(doctorId);
    
    if (!appointment) {
      return { status: 'no-appointment', message: 'Book Appointment First' };
    }

    const appointmentDate = new Date(appointment.date);
    const today = new Date();
    const isToday = appointmentDate.toDateString() === today.toDateString();
    
    if (!isToday) {
      return { 
        status: 'scheduled-future', 
        message: `Scheduled for ${appointmentDate.toLocaleDateString()} at ${appointment.time}` 
      };
    }

    // Check if current time is within the allowed window
    const appointmentTime = appointment.time;
    const [time, period] = appointmentTime.split(' ');
    let [hours, minutes] = time.split(':').map(Number);
    
    // Convert to 24-hour format
    if (period === 'PM' && hours !== 12) hours += 12;
    if (period === 'AM' && hours === 12) hours = 0;

    const appointmentDateTime = new Date(appointmentDate);
    appointmentDateTime.setHours(hours, minutes, 0, 0);

    const currentTime = currentDateTime.getTime();
    const appointmentStartTime = appointmentDateTime.getTime() - (15 * 60 * 1000); // 15 minutes before
    const appointmentEndTime = appointmentDateTime.getTime() + (15 * 60 * 1000); // 15 minutes after

    if (currentTime < appointmentStartTime) {
      const timeUntil = Math.ceil((appointmentStartTime - currentTime) / (1000 * 60));
      return { 
        status: 'waiting', 
        message: `Available in ${timeUntil} min` 
      };
    }

    if (currentTime > appointmentEndTime) {
      return { 
        status: 'expired', 
        message: 'Consultation Time Ended' 
      };
    }

    return { 
      status: 'available', 
      message: 'Video Consult Ready' 
    };
  };

  // Appointment Required Modal
  const AppointmentRequiredModal = () => {
    if (!showAppointmentMessage || !doctorForVideoConsult) return null;

    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000
      }}>
        <div style={{
          backgroundColor: 'white',
          padding: '2.5rem',
          borderRadius: '20px',
          boxShadow: '0 15px 40px rgba(0,0,0,0.3)',
          maxWidth: '500px',
          width: '90%',
          textAlign: 'center',
          border: '3px solid #7C2A62'
        }}>
          <div style={{
            fontSize: '4rem',
            marginBottom: '1.5rem',
            color: '#7C2A62'
          }}>
            📅
          </div>
          
          <h3 style={{
            color: '#7C2A62',
            marginBottom: '1rem',
            fontSize: '1.5rem',
            fontWeight: '600'
          }}>
            Appointment Required
          </h3>
          
          <p style={{
            color: '#666',
            marginBottom: '1.5rem',
            fontSize: '1rem',
            lineHeight: '1.6'
          }}>
            To start a video consultation with <strong>Dr. {doctorForVideoConsult.name}</strong>, 
            you need to book an appointment first.
          </p>
          
          <p style={{
            color: '#7C2A62',
            marginBottom: '2rem',
            fontSize: '0.95rem',
            fontStyle: 'italic',
            fontWeight: '500',
            backgroundColor: '#F7D9EB',
            padding: '1rem',
            borderRadius: '8px',
            border: '1px solid #7C2A62'
          }}>
            💡 Video consultation will be available only on your booked date and time!
          </p>
          
          <div style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center'
          }}>
            <button
              onClick={() => setShowAppointmentMessage(false)}
              style={{
                padding: '0.75rem 2rem',
                backgroundColor: 'transparent',
                color: '#7C2A62',
                border: '2px solid #7C2A62',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '1rem',
                transition: 'all 0.3s ease'
              }}
              type="button"
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#F7D9EB';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
              }}
            >
              Cancel
            </button>
            
            <button
              onClick={handleBookFromMessage}
              style={{
                padding: '0.75rem 2rem',
                backgroundColor: '#7C2A62',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '1rem',
                transition: 'all 0.3s ease'
              }}
              type="button"
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#6a2352';
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#7C2A62';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              Book Appointment Now
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Recording Controls Component
  const RecordingControls = () => (
    <div style={{
      position: 'absolute',
      top: '1rem',
      right: '1rem',
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      padding: '0.75rem 1rem',
      borderRadius: '10px',
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      zIndex: 1001
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem'
      }}>
        <div style={{
          width: '12px',
          height: '12px',
          borderRadius: '50%',
          backgroundColor: isRecording ? 
            (isRecordingPaused ? '#FFA500' : '#ff4444') : '#666',
          animation: isRecording && !isRecordingPaused ? 'pulse 1s infinite' : 'none'
        }}></div>
        <span style={{
          color: 'white',
          fontSize: '0.9rem',
          fontWeight: '500'
        }}>
          {isRecording ? 
            (isRecordingPaused ? 'Recording Paused' : 'Recording') : 
            'Ready to Record'}
        </span>
      </div>

      {isRecording && (
        <div style={{
          color: 'white',
          fontSize: '0.9rem',
          fontWeight: '600',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          padding: '0.25rem 0.5rem',
          borderRadius: '4px'
        }}>
          {formatTime(recordedTime)}
        </div>
      )}

      <div style={{
        display: 'flex',
        gap: '0.5rem',
        alignItems: 'center'
      }}>
        <button
          onClick={toggleRecording}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: !isRecording ? '#4CAF50' : 
              isRecordingPaused ? '#4CAF50' : '#FFA500',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '0.8rem',
            fontWeight: '500',
            display: 'flex',
            alignItems: 'center',
            gap: '0.25rem',
            minWidth: '80px',
            justifyContent: 'center'
          }}
          type="button"
        >
          <span style={{ fontSize: '0.9rem' }}>
            {!isRecording ? '⏺️' : isRecordingPaused ? '▶️' : '⏸️'}
          </span>
          {!isRecording ? 'Record' : isRecordingPaused ? 'Resume' : 'Pause'}
        </button>

        {isRecording && (
          <button
            onClick={stopRecording}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#ff4444',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '0.8rem',
              fontWeight: '500',
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem',
              minWidth: '80px',
              justifyContent: 'center'
            }}
            type="button"
          >
            <span style={{ fontSize: '0.9rem' }}>⏹️</span>
            Stop
          </button>
        )}
      </div>
    </div>
  );

  // Video Call Modal Component
  const VideoCallModal = () => {
    if (!showVideoCallModal || !selectedDoctor) return null;

    const appointment = getAppointmentDetails(selectedDoctor.id);

    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: videoCallStatus === 'connected' ? '#1a1a1a' : 'rgba(0, 0, 0, 0.9)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
        color: 'white',
        fontFamily: 'Arial, sans-serif'
      }}>
        {showRecordingControls && videoCallStatus === 'connected' && (
          <RecordingControls />
        )}

        <div style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem'
        }}>
          {/* Header */}
          <div style={{
            position: 'absolute',
            top: '2rem',
            left: '2rem',
            right: '2rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div>
              <h3 style={{
                color: 'white',
                margin: 0,
                fontSize: '1.5rem',
                fontWeight: '600'
              }}>
                Dr. {selectedDoctor.name}
              </h3>
              <p style={{
                color: '#ccc',
                margin: 0,
                fontSize: '1rem'
              }}>
                {selectedDoctor.specialty}
              </p>
              {appointment && (
                <p style={{
                  color: '#4CAF50',
                  margin: '0.25rem 0 0 0',
                  fontSize: '0.9rem',
                  fontWeight: '500'
                }}>
                  Scheduled: {new Date(appointment.date).toLocaleDateString()} at {appointment.time}
                </p>
              )}
            </div>
            
            {videoCallStatus === 'connected' && (
              <div style={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                padding: '0.5rem 1rem',
                borderRadius: '20px',
                fontSize: '1.1rem',
                fontWeight: '600',
                backdropFilter: 'blur(10px)'
              }}>
                {formatTime(callDuration)}
              </div>
            )}
          </div>

          {/* Main Content */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '2rem',
            textAlign: 'center',
            maxWidth: '500px'
          }}>
            {videoCallStatus === 'connecting' && (
              <>
                <div style={{
                  width: '120px',
                  height: '120px',
                  borderRadius: '50%',
                  backgroundColor: '#7C2A62',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  animation: 'pulse 2s infinite',
                  boxShadow: '0 0 30px rgba(124, 42, 98, 0.5)'
                }}>
                  <span style={{ fontSize: '3rem' }}>📞</span>
                </div>
                <div>
                  <h3 style={{ color: 'white', marginBottom: '1rem', fontSize: '1.4rem' }}>
                    Connecting to Dr. {selectedDoctor.name}...
                  </h3>
                  <p style={{ color: '#ccc', fontSize: '1rem' }}>
                    Please wait while we establish a secure connection
                  </p>
                </div>
                <div style={{
                  display: 'flex',
                  gap: '0.5rem'
                }}>
                  <div style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    backgroundColor: '#7C2A62',
                    animation: 'bounce 1.4s infinite ease-in-out both'
                  }}></div>
                  <div style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    backgroundColor: '#7C2A62',
                    animation: 'bounce 1.4s infinite ease-in-out both 0.2s'
                  }}></div>
                  <div style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    backgroundColor: '#7C2A62',
                    animation: 'bounce 1.4s infinite ease-in-out both 0.4s'
                  }}></div>
                </div>
              </>
            )}

            {videoCallStatus === 'connected' && (
              <>
                <div style={{
                  width: '280px',
                  height: '280px',
                  borderRadius: '20px',
                  backgroundColor: isVideoOff ? '#333' : '#7C2A62',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '4px solid #7C2A62',
                  position: 'relative',
                  overflow: 'hidden',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
                }}>
                  {isVideoOff ? (
                    <span style={{ fontSize: '4rem' }}>📹</span>
                  ) : (
                    <div style={{
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: '#7C2A62'
                    }}>
                      <span style={{ fontSize: '4rem' }}>👨‍⚕️</span>
                    </div>
                  )}
                  <div style={{
                    position: 'absolute',
                    bottom: '15px',
                    right: '15px',
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    backgroundColor: '#4CAF50',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '3px solid white',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.3)'
                  }}>
                    <span style={{ fontSize: '1.5rem' }}>👤</span>
                  </div>
                </div>
                <div>
                  <h3 style={{ color: 'white', marginBottom: '0.5rem', fontSize: '1.4rem' }}>
                    Video Call Connected
                  </h3>
                  <p style={{ color: '#ccc', fontSize: '1rem' }}>
                    You are now connected with Dr. {selectedDoctor.name}
                  </p>
                  {isRecording && (
                    <p style={{ 
                      color: isRecordingPaused ? '#FFA500' : '#ff4444', 
                      fontSize: '0.9rem',
                      marginTop: '0.5rem',
                      fontWeight: '500'
                    }}>
                      ● {isRecordingPaused ? 'Recording Paused' : 'Recording Active'} - {formatTime(recordedTime)}
                    </p>
                  )}
                </div>
              </>
            )}

            {videoCallStatus === 'ended' && (
              <>
                <div style={{
                  width: '120px',
                  height: '120px',
                  borderRadius: '50%',
                  backgroundColor: '#666',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 0 30px rgba(102, 102, 102, 0.5)'
                }}>
                  <span style={{ fontSize: '3rem' }}>📵</span>
                </div>
                <div>
                  <h3 style={{ color: 'white', marginBottom: '1rem', fontSize: '1.4rem' }}>
                    Call Ended
                  </h3>
                  <p style={{ color: '#ccc', fontSize: '1rem' }}>
                    Video consultation has been completed
                  </p>
                  <p style={{ color: '#7C2A62', fontSize: '1rem', marginTop: '0.5rem' }}>
                    Duration: {formatTime(callDuration)}
                  </p>
                  {recordedTime > 0 && (
                    <p style={{ color: '#4CAF50', fontSize: '1rem', marginTop: '0.5rem' }}>
                      Recording: {formatTime(recordedTime)} saved
                    </p>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Call Controls */}
          <div style={{
            position: 'absolute',
            bottom: '3rem',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: '1rem',
            alignItems: 'center'
          }}>
            {videoCallStatus === 'connected' && (
              <>
                <button
                  onClick={toggleMute}
                  style={{
                    padding: '1rem',
                    backgroundColor: isMuted ? '#ff4444' : 'rgba(255, 255, 255, 0.2)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '50%',
                    cursor: 'pointer',
                    width: '60px',
                    height: '60px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backdropFilter: 'blur(10px)',
                    transition: 'all 0.3s ease'
                  }}
                  type="button"
                >
                  <span style={{ fontSize: '1.5rem' }}>
                    {isMuted ? '🎤❌' : '🎤'}
                  </span>
                </button>

                <button
                  onClick={toggleVideo}
                  style={{
                    padding: '1rem',
                    backgroundColor: isVideoOff ? '#ff4444' : 'rgba(255, 255, 255, 0.2)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '50%',
                    cursor: 'pointer',
                    width: '60px',
                    height: '60px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backdropFilter: 'blur(10px)',
                    transition: 'all 0.3s ease'
                  }}
                  type="button"
                >
                  <span style={{ fontSize: '1.5rem' }}>
                    {isVideoOff ? '📷❌' : '📷'}
                  </span>
                </button>

                <button
                  onClick={handleEndVideoCall}
                  style={{
                    padding: '1rem 2rem',
                    backgroundColor: '#ff4444',
                    color: 'white',
                    border: 'none',
                    borderRadius: '50px',
                    cursor: 'pointer',
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    minWidth: '160px',
                    justifyContent: 'center',
                    height: '60px',
                    boxShadow: '0 4px 15px rgba(255, 68, 68, 0.3)'
                  }}
                  type="button"
                >
                  <span style={{ fontSize: '1.3rem' }}>📞</span>
                  End Call
                </button>
              </>
            )}

            {(videoCallStatus === 'connecting' || videoCallStatus === 'ended') && (
              <button
                onClick={() => {
                  setShowVideoCallModal(false);
                  setVideoCallStatus('idle');
                  setSelectedDoctor(null);
                  setShowRecordingControls(false);
                }}
                style={{
                  padding: '1rem 2rem',
                  backgroundColor: '#666',
                  color: 'white',
                  border: 'none',
                  borderRadius: '50px',
                  cursor: 'pointer',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  minWidth: '160px',
                  height: '60px'
                }}
                type="button"
              >
                {videoCallStatus === 'connecting' ? 'Cancel' : 'Close'}
              </button>
            )}
          </div>

          {/* Connection Quality Indicator */}
          {videoCallStatus === 'connected' && (
            <div style={{
              position: 'absolute',
              top: '2rem',
              right: '2rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              padding: '0.5rem 1rem',
              borderRadius: '20px',
              backdropFilter: 'blur(10px)'
            }}>
              <div style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                backgroundColor: '#4CAF50'
              }}></div>
              <span style={{ fontSize: '0.9rem' }}>Excellent</span>
            </div>
          )}
        </div>

        {/* CSS Animations */}
        <style>
          {`
            @keyframes pulse {
              0% { transform: scale(1); opacity: 1; }
              50% { transform: scale(1.1); opacity: 0.8; }
              100% { transform: scale(1); opacity: 1; }
            }
            @keyframes bounce {
              0%, 80%, 100% { 
                transform: scale(0);
                opacity: 0.5;
              }
              40% { 
                transform: scale(1);
                opacity: 1;
              }
            }
            @keyframes recording-pulse {
              0% { opacity: 1; }
              50% { opacity: 0.5; }
              100% { opacity: 1; }
            }
          `}
        </style>
      </div>
    );
  };

  // Time Slots Modal Component
  const TimeSlotsModal = () => {
    if (!showTimeSlotsModal || !selectedDoctor) return null;

    const availableDates = getAvailableDates();

    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000
      }}>
        <div style={{
          backgroundColor: 'white',
          padding: '2rem',
          borderRadius: '15px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
          maxWidth: '600px',
          width: '90%',
          maxHeight: '80vh',
          overflowY: 'auto'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1.5rem',
            borderBottom: '2px solid #F7D9EB',
            paddingBottom: '1rem'
          }}>
            <h3 style={{
              color: '#7C2A62',
              margin: 0,
              fontSize: '1.3rem'
            }}>
              Book Appointment with {selectedDoctor.name}
            </h3>
            <button
              onClick={() => {
                setShowTimeSlotsModal(false);
                setSelectedDoctor(null);
                setSelectedAppointmentDate('');
                setSelectedAppointmentTime('');
              }}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '1.5rem',
                cursor: 'pointer',
                color: '#666'
              }}
              type="button"
            >
              ×
            </button>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <p style={{ 
              color: '#666', 
              marginBottom: '0.5rem',
              fontWeight: '500'
            }}>
              Specialty: <span style={{ color: '#7C2A62' }}>{selectedDoctor.specialty}</span>
            </p>
            <p style={{ 
              color: '#666', 
              marginBottom: '1rem',
              fontWeight: '500'
            }}>
              Consultation Fee: <span style={{ color: '#7C2A62', fontWeight: 'bold' }}>₹{selectedDoctor.consultationFee || selectedDoctor.fee}</span>
            </p>
            <p style={{ 
              color: '#7C2A62', 
              marginBottom: '0.5rem',
              fontWeight: '500',
              fontSize: '0.9rem',
              fontStyle: 'italic'
            }}>
              💡 Video consultation will be available only on your booked date and time
            </p>
          </div>

          {/* Date Selection */}
          <div style={{ marginBottom: '1.5rem' }}>
            <h4 style={{
              color: '#7C2A62',
              marginBottom: '1rem',
              fontSize: '1.1rem'
            }}>
              Select Date
            </h4>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '0.75rem',
              marginBottom: '1.5rem'
            }}>
              {availableDates.map((date, index) => (
                <button
                  key={index}
                  onClick={() => handleDateSelect(date.value)}
                  style={{
                    padding: '0.75rem 0.5rem',
                    backgroundColor: selectedAppointmentDate === date.value ? '#7C2A62' : 'white',
                    color: selectedAppointmentDate === date.value ? 'white' : '#7C2A62',
                    border: `2px solid ${selectedAppointmentDate === date.value ? '#7C2A62' : '#F7D9EB'}`,
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: '600',
                    fontSize: '0.85rem',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                  }}
                  type="button"
                >
                  <span style={{ 
                    fontSize: '0.75rem',
                    opacity: 0.8,
                    marginBottom: '0.25rem'
                  }}>
                    {date.display.split(' ')[0]}
                  </span>
                  <span>
                    {date.display.split(' ').slice(1).join(' ')}
                  </span>
                  {date.isToday && (
                    <span style={{
                      fontSize: '0.7rem',
                      marginTop: '0.25rem',
                      color: selectedAppointmentDate === date.value ? 'white' : '#7C2A62',
                      opacity: 0.8
                    }}>
                      Today
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Time Slots Selection */}
          {selectedAppointmentDate && (
            <div style={{ marginBottom: '1.5rem' }}>
              <h4 style={{
                color: '#7C2A62',
                marginBottom: '1rem',
                fontSize: '1.1rem'
              }}>
                Select Time Slot for {new Date(selectedAppointmentDate).toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </h4>
              
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '0.75rem',
                marginBottom: '1.5rem'
              }}>
                {selectedDoctor.availableSlots && selectedDoctor.availableSlots.map((slot, index) => (
                  <button
                    key={index}
                    onClick={() => handleTimeSlotSelect(slot)}
                    style={{
                      padding: '0.75rem 0.5rem',
                      backgroundColor: selectedAppointmentTime === slot ? '#7C2A62' : 'white',
                      color: selectedAppointmentTime === slot ? 'white' : '#7C2A62',
                      border: `2px solid ${selectedAppointmentTime === slot ? '#7C2A62' : '#F7D9EB'}`,
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontWeight: '600',
                      fontSize: '0.85rem',
                      transition: 'all 0.3s ease'
                    }}
                    type="button"
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'flex-end'
          }}>
            <button
              onClick={() => {
                setShowTimeSlotsModal(false);
                setSelectedDoctor(null);
                setSelectedAppointmentDate('');
                setSelectedAppointmentTime('');
              }}
              style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: 'transparent',
                color: '#7C2A62',
                border: '2px solid #7C2A62',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '600'
              }}
              type="button"
            >
              Cancel
            </button>
            
            <button
              onClick={handleConfirmAppointment}
              disabled={!selectedAppointmentDate || !selectedAppointmentTime}
              style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: (selectedAppointmentDate && selectedAppointmentTime) ? '#7C2A62' : '#ccc',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: (selectedAppointmentDate && selectedAppointmentTime) ? 'pointer' : 'not-allowed',
                fontWeight: '600'
              }}
              type="button"
            >
              Confirm Appointment
            </button>
          </div>
        </div>
      </div>
    );
  };

  const FiltersDropdown = () => (
    <div style={{
      position: 'absolute',
      top: '100%',
      right: 0,
      marginTop: '0.5rem',
      backgroundColor: 'white',
      padding: '1.5rem',
      borderRadius: '15px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
      width: '300px',
      zIndex: 1000,
      border: '1px solid #F7D9EB'
    }}>
      <h3 style={{
        color: '#7C2A62',
        marginBottom: '1.5rem',
        fontSize: '1.2rem',
        fontWeight: '600'
      }}>Filters</h3>
      
      <div style={{
        marginBottom: '1.5rem'
      }}>
        <label style={{
          display: 'block',
          marginBottom: '0.5rem',
          color: '#7C2A62',
          fontWeight: '500',
          fontSize: '0.9rem'
        }}>Specialty</label>
        <select 
          value={selectedSpecialty}
          onChange={(e) => setSelectedSpecialty(e.target.value)}
          style={{
            width: '100%',
            padding: '0.75rem',
            border: '2px solid #F7D9EB',
            borderRadius: '8px',
            backgroundColor: 'white',
            fontSize: '0.9rem'
          }}
        >
          <option value="">All Specialties</option>
          {specialties.map(specialty => (
            <option key={specialty} value={specialty}>{specialty}</option>
          ))}
        </select>
      </div>

      <div style={{
        marginBottom: '1.5rem'
      }}>
        <label style={{
          display: 'block',
          marginBottom: '0.5rem',
          color: '#7C2A62',
          fontWeight: '500',
          fontSize: '0.9rem'
        }}>Time Slot</label>
        <select 
          value={selectedTimeSlot}
          onChange={(e) => setSelectedTimeSlot(e.target.value)}
          style={{
            width: '100%',
            padding: '0.75rem',
            border: '2px solid #F7D9EB',
            borderRadius: '8px',
            backgroundColor: 'white',
            fontSize: '0.9rem'
          }}
        >
          <option value="">All Time Slots</option>
          {allTimeSlots.map(slot => (
            <option key={slot} value={slot}>{slot}</option>
          ))}
        </select>
      </div>

      {setSelectedExperience && (
        <div style={{
          marginBottom: '1.5rem'
        }}>
          <label style={{
            display: 'block',
            marginBottom: '0.5rem',
            color: '#7C2A62',
            fontWeight: '500',
            fontSize: '0.9rem'
          }}>Experience</label>
          <select 
            value={selectedExperience}
            onChange={(e) => setSelectedExperience(e.target.value)}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '2px solid #F7D9EB',
              borderRadius: '8px',
              backgroundColor: 'white',
              fontSize: '0.9rem'
            }}
          >
            <option value="">Any Experience</option>
            <option value="0-5">0-5 years</option>
            <option value="5-10">5-10 years</option>
            <option value="10+">10+ years</option>
          </select>
        </div>
      )}

      {setSelectedLanguage && (
        <div style={{
          marginBottom: '1.5rem'
        }}>
          <label style={{
            display: 'block',
            marginBottom: '0.5rem',
            color: '#7C2A62',
            fontWeight: '500',
            fontSize: '0.9rem'
          }}>Language</label>
          <select 
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '2px solid #F7D9EB',
              borderRadius: '8px',
              backgroundColor: 'white',
              fontSize: '0.9rem'
            }}
          >
            <option value="">Any Language</option>
            <option value="English">English</option>
            <option value="Spanish">Spanish</option>
            <option value="French">French</option>
            <option value="German">German</option>
          </select>
        </div>
      )}

      <button 
        style={{
          width: '100%',
          padding: '0.75rem',
          backgroundColor: 'transparent',
          color: '#7C2A62',
          border: '2px solid #7C2A62',
          borderRadius: '8px',
          cursor: 'pointer',
          fontWeight: '600',
          marginTop: '1rem'
        }}
        onClick={handleClearFilters}
        type="button"
      >
        Clear Filters
      </button>
    </div>
  );

  // Custom Doctor Card Component with Updated Video Consultation button
  const CustomDoctorCard = ({ doctor, handleBookAppointmentClick, handleVideoConsultationClick }) => {
    const consultationStatus = getConsultationStatus(doctor.id);
    const appointment = getAppointmentDetails(doctor.id);
    
    const getButtonConfig = () => {
      switch (consultationStatus.status) {
        case 'available':
          return {
            backgroundColor: '#4CAF50',
            text: 'Video Consult',
            icon: '📹',
            enabled: true
          };
        case 'waiting':
          return {
            backgroundColor: '#FFA500',
            text: consultationStatus.message,
            icon: '⏰',
            enabled: false
          };
        case 'scheduled-future':
          return {
            backgroundColor: '#2196F3',
            text: 'Scheduled',
            icon: '📅',
            enabled: false
          };
        case 'expired':
          return {
            backgroundColor: '#666',
            text: 'Time Ended',
            icon: '❌',
            enabled: false
          };
        default:
          return {
            backgroundColor: '#ccc',
            text: 'Book First',
            icon: '🔒',
            enabled: false
          };
      }
    };

    const buttonConfig = getButtonConfig();

    return (
      <div style={{
        backgroundColor: 'white',
        border: '1px solid #F7D9EB',
        borderRadius: '12px',
        padding: '1.25rem',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        display: 'flex',
        gap: '1.5rem',
        alignItems: 'flex-start',
        justifyContent: 'space-between'
      }}>
        {/* Doctor Info Section */}
        <div style={{
          display: 'flex',
          gap: '1.5rem',
          alignItems: 'flex-start',
          flex: 1
        }}>
          <div style={{
            flex: '0 0 200px',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem'
          }}>
            <h4 style={{
              color: '#7C2A62',
              margin: '0 0 0.25rem 0',
              fontSize: '1.1rem',
              fontWeight: '600'
            }}>
              {doctor.name}
            </h4>
            
            <p style={{
              color: '#666',
              margin: '0 0 0.5rem 0',
              fontSize: '0.9rem'
            }}>
              {doctor.specialty}
            </p>
            
            {/* Star Rating */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem',
              marginBottom: '0.5rem'
            }}>
              <span style={{ 
                color: '#FFD700', 
                fontSize: '1rem',
                letterSpacing: '1px'
              }}>
                {'★'.repeat(5)}
              </span>
              <span style={{
                color: '#666',
                fontSize: '0.85rem',
                marginLeft: '0.25rem'
              }}>
                (5)
              </span>
            </div>

            {/* Appointment Status Badge */}
            {appointment && (
              <div style={{
                backgroundColor: consultationStatus.status === 'available' ? '#4CAF50' : 
                                 consultationStatus.status === 'waiting' ? '#FFA500' : 
                                 consultationStatus.status === 'scheduled-future' ? '#2196F3' : '#666',
                color: 'white',
                padding: '0.25rem 0.75rem',
                borderRadius: '12px',
                fontSize: '0.75rem',
                fontWeight: '600',
                display: 'inline-block',
                marginTop: '0.5rem'
              }}>
                {consultationStatus.status === 'available' ? '✅ Available Now' :
                 consultationStatus.status === 'waiting' ? '⏰ ' + consultationStatus.message :
                 consultationStatus.status === 'scheduled-future' ? '📅 ' + consultationStatus.message :
                 '❌ ' + consultationStatus.message}
              </div>
            )}
          </div>

          {/* Doctor Details Section */}
          <div style={{
            flex: '1',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem'
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '0.75rem',
              fontSize: '0.9rem'
            }}>
              <div>
                <strong style={{ color: '#7C2A62' }}>Experience:</strong>
                <span style={{ marginLeft: '0.5rem', color: '#333' }}>
                  {doctor.experience || '15 years'}
                </span>
              </div>
              
              <div>
                <strong style={{ color: '#7C2A62' }}>Languages:</strong>
                <span style={{ marginLeft: '0.5rem', color: '#333' }}>
                  {doctor.languages || 'English, Telugu'}
                </span>
              </div>
              
              <div>
                <strong style={{ color: '#7C2A62' }}>Video Consult Fee:</strong>
                <span style={{ marginLeft: '0.5rem', color: '#333' }}>
                  ₹{doctor.videoConsultFee || '500'}
                </span>
              </div>
              
              <div>
                <strong style={{ color: '#7C2A62' }}>Availability:</strong>
                <span style={{ 
                  marginLeft: '0.5rem', 
                  color: consultationStatus.status === 'available' ? '#4CAF50' : '#666',
                  fontWeight: '600' 
                }}>
                  {consultationStatus.message}
                </span>
              </div>
            </div>

            {/* Appointment Details */}
            {appointment && (
              <div style={{
                backgroundColor: '#F7D9EB',
                padding: '0.75rem',
                borderRadius: '8px',
                fontSize: '0.85rem',
                color: '#7C2A62'
              }}>
                <strong>Appointment: </strong>
                {new Date(appointment.date).toLocaleDateString()} at {appointment.time}
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
          alignItems: 'flex-end'
        }}>
          {/* Book Appointment Button */}
          <button
            onClick={() => handleBookAppointmentClick(doctor)}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#7C2A62',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '0.85rem',
              fontWeight: '500',
              minWidth: '140px',
              whiteSpace: 'nowrap',
              transition: 'all 0.3s ease'
            }}
            type="button"
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#6a2352';
              e.target.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#7C2A62';
              e.target.style.transform = 'translateY(0)';
            }}
          >
            Book Appointment
          </button>

          {/* Video Consultation Button - UPDATED */}
          <button
            onClick={() => handleVideoConsultationClick(doctor)}
            disabled={!buttonConfig.enabled}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: buttonConfig.backgroundColor,
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: buttonConfig.enabled ? 'pointer' : 'not-allowed',
              fontSize: '0.85rem',
              fontWeight: '500',
              minWidth: '140px',
              whiteSpace: 'nowrap',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.25rem',
              opacity: buttonConfig.enabled ? 1 : 0.7
            }}
            type="button"
            onMouseEnter={(e) => {
              if (buttonConfig.enabled) {
                e.target.style.backgroundColor = '#45a049';
                e.target.style.transform = 'translateY(-1px)';
              }
            }}
            onMouseLeave={(e) => {
              if (buttonConfig.enabled) {
                e.target.style.backgroundColor = buttonConfig.backgroundColor;
                e.target.style.transform = 'translateY(0)';
              }
            }}
          >
            <span style={{ fontSize: '1rem' }}>
              {buttonConfig.icon}
            </span>
            {buttonConfig.text}
          </button>
        </div>
      </div>
    );
  };

  return (
    <div style={{
      marginTop: '140px',
      padding: '2rem',
      maxWidth: '1400px',
      marginLeft: 'auto',
      marginRight: 'auto'
    }}>
      {/* Appointment Required Modal */}
      <AppointmentRequiredModal />

      {/* Time Slots Modal */}
      <TimeSlotsModal />

      {/* Video Call Modal */}
      <VideoCallModal />

      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        marginBottom: '2rem'
      }}>
        <BackButton onClick={handleBackToAppointments} text="Back to Appointments" />
        <div style={{
          textAlign: 'center',
          marginBottom: '2rem',
          flex: 1
        }}>
          <h2 style={{
            color: '#7C2A62',
            fontSize: '1.5rem',
            margin: 0
          }}>Doctor Consultation</h2>
          <p style={{
            fontSize: '1.1rem',
            color: '#666',
            marginTop: '0.5rem'
          }}>
            Connect with certified doctors for online consultations
          </p>
        </div>
      </div>

      <div style={{
        backgroundColor: 'white',
        padding: '1.5rem',
        borderRadius: '15px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        marginBottom: '1.5rem'
      }}>
        <div style={{
          marginBottom: '1rem',
          textAlign: 'center'
        }}>
          <p style={{
            fontSize: '0.95rem',
            color: '#7C2A62',
            margin: 0,
            fontStyle: 'italic',
            fontWeight: '500'
          }}>
            Get expert medical advice from qualified doctors - Video consultation available only on your booked date and time
          </p>
        </div>

        <div style={{
          display: 'flex',
          gap: '0.75rem',
          marginBottom: '0',
          position: 'relative',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{
            display: 'flex',
            gap: '0.5rem',
            alignItems: 'center',
            flex: '0 1 auto'
          }}>
            <input
              type="text"
              placeholder="Search by specialty, doctor name, or condition"
              value={doctorSearchQuery}
              onChange={(e) => setDoctorSearchQuery(e.target.value)}
              style={{
                width: '700px',
                padding: '0.5rem 0.75rem',
                border: '2px solid #F7D9EB',
                borderRadius: '8px',
                fontSize: '0.9rem',
                transition: 'border-color 0.3s ease',
                height: '38px'
              }}
            />
          </div>
          
          <div style={{ position: 'relative' }}>
            <button 
              style={{
                padding: '0.5rem 1.25rem',
                backgroundColor: 'white',
                color: '#7C2A62',
                border: '2px solid #7C2A62',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.9rem',
                height: '38px',
                whiteSpace: 'nowrap'
              }}
              onClick={() => setShowFilters(!showFilters)}
              type="button"
            >
              <span>Filters</span>
              <span style={{ 
                transform: showFilters ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.3s ease',
                fontSize: '0.8rem'
              }}>
                ▼
              </span>
            </button>
            
            {showFilters && <FiltersDropdown />}
          </div>
        </div>
      </div>

      {showFilters && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 999
          }}
          onClick={() => setShowFilters(false)}
        />
      )}

      <div style={{
        backgroundColor: 'white',
        padding: '2rem',
        borderRadius: '15px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}>
        <h3 style={{
          color: '#7C2A62',
          marginBottom: '1.5rem',
          fontSize: '1.3rem'
        }}>Available Doctors</h3>
        
        {filteredDoctors.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '3rem',
            color: '#666'
          }}>
            <p>No doctors found matching your criteria</p>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gap: '1.25rem'
          }}>
            {filteredDoctors.map(doctor => (
              <CustomDoctorCard 
                key={doctor.id} 
                doctor={doctor}
                handleBookAppointmentClick={handleBookAppointmentClick}
                handleVideoConsultationClick={handleVideoConsultationClick}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ConsultationView;