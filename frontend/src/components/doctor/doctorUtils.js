import { useState, useEffect } from 'react';

// Complete Mock Data
export const dashboardData = {
  appointments: {
    today: 8,
    week: 42,
    month: 156
  },
  consultations: {
    today: 6,
    week: 38,
    month: 142
  },
  rescheduled: {
    today: 2,
    week: 8,
    month: 25
  },
  cancelled: {
    today: 1,
    week: 5,
    month: 18
  },
  recentConsultations: [
    {
      id: 1,
      patientName: 'Sarah Johnson',
      time: '10:30 AM',
      date: '2024-01-15',
      issue: 'Regular checkup and prescription renewal',
      age: 45,
      status: 'completed',
      prescription: 'Medication A, Medication B',
      notes: 'Patient responding well to treatment'
    },
    {
      id: 2,
      patientName: 'Michael Chen',
      time: '11:15 AM',
      date: '2024-01-15',
      issue: 'Follow-up for blood pressure medication',
      age: 62,
      status: 'completed',
      prescription: 'Blood Pressure Meds',
      notes: 'BP under control, continue medication'
    },
    {
      id: 3,
      patientName: 'Emily Rodriguez',
      time: '2:00 PM',
      date: '2024-01-15',
      issue: 'Initial consultation for chronic pain',
      age: 38,
      status: 'completed',
      prescription: 'Pain Management',
      notes: 'Referred to physiotherapy'
    },
    {
      id: 4,
      patientName: 'Robert Williams',
      time: '3:30 PM',
      date: '2024-01-15',
      issue: 'Diabetes management review',
      age: 55,
      status: 'completed',
      prescription: 'Insulin, Diet Plan',
      notes: 'Blood sugar levels improving'
    }
  ],
  upcomingAppointments: [
    {
      id: 5,
      patientName: 'Lisa Thompson',
      time: '10:00 AM',
      date: '2024-01-16',
      issue: 'Annual physical examination',
      age: 42,
      duration: '30 mins',
      type: 'Follow-up',
      priority: 'normal',
      status: 'scheduled'
    },
    {
      id: 6,
      patientName: 'David Miller',
      time: '11:00 AM',
      date: '2024-01-16',
      issue: 'Cardiac follow-up consultation',
      age: 68,
      duration: '45 mins',
      type: 'Specialist',
      priority: 'high',
      status: 'scheduled'
    },
    {
      id: 7,
      patientName: 'Priya Sharma',
      time: '2:30 PM',
      date: '2024-01-16',
      issue: 'Pregnancy checkup',
      age: 29,
      duration: '30 mins',
      type: 'Routine',
      priority: 'normal',
      status: 'scheduled'
    }
  ],
  rescheduledAppointments: [
    {
      id: 8,
      patientName: 'Amit Patel',
      time: '9:00 AM',
      date: '2024-01-15',
      issue: 'Fever and cold',
      age: 35,
      status: 'rescheduled',
      originalDate: '2024-01-14',
      newDate: '2024-01-15',
      reason: 'Patient requested change'
    }
  ],
  cancelledAppointments: [
    {
      id: 9,
      patientName: 'Rajesh Kumar',
      time: '3:00 PM',
      date: '2024-01-17',
      issue: 'General health checkup',
      age: 40,
      status: 'cancelled',
      cancelledDate: '2024-01-15',
      reason: 'Patient emergency'
    }
  ],
  pendingAppointments: [
    {
      id: 10,
      patientName: 'Rahul Verma',
      time: '3:00 PM',
      date: '2024-01-17',
      issue: 'General health checkup',
      age: 40,
      duration: '30 mins',
      type: 'New Patient',
      priority: 'normal',
      status: 'pending',
      requestedDate: '2024-01-15'
    }
  ],
  patients: [
    {
      id: 1,
      name: 'Sarah Johnson',
      lastVisit: '2024-01-15',
      totalVisits: 12,
      conditions: ['Hypertension', 'Diabetes'],
      phone: '+91 98765 43210',
      email: 'sarah.j@email.com',
      bloodGroup: 'A+',
      emergencyContact: '+91 98765 43211',
      age: 45,
      medicalHistory: [
        { date: '2024-01-15', diagnosis: 'Regular checkup', prescription: 'Medication A, Medication B' },
        { date: '2023-12-10', diagnosis: 'Diabetes follow-up', prescription: 'Insulin adjustment' }
      ]
    },
    {
      id: 2,
      name: 'Michael Chen',
      lastVisit: '2024-01-15',
      totalVisits: 8,
      conditions: ['High Blood Pressure'],
      phone: '+91 98765 43212',
      email: 'michael.c@email.com',
      bloodGroup: 'B+',
      emergencyContact: '+91 98765 43213',
      age: 62,
      medicalHistory: [
        { date: '2024-01-15', diagnosis: 'BP follow-up', prescription: 'Blood Pressure Meds' }
      ]
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      lastVisit: '2024-01-15',
      totalVisits: 3,
      conditions: ['Chronic Back Pain'],
      phone: '+91 98765 43214',
      email: 'emily.r@email.com',
      bloodGroup: 'O+',
      emergencyContact: '+91 98765 43215',
      age: 38,
      medicalHistory: [
        { date: '2024-01-15', diagnosis: 'Chronic pain consultation', prescription: 'Pain Management' }
      ]
    },
    {
      id: 4,
      name: 'Robert Williams',
      lastVisit: '2024-01-15',
      totalVisits: 5,
      conditions: ['Diabetes'],
      phone: '+91 98765 43216',
      email: 'robert.w@email.com',
      bloodGroup: 'AB+',
      emergencyContact: '+91 98765 43217',
      age: 55,
      medicalHistory: [
        { date: '2024-01-15', diagnosis: 'Diabetes review', prescription: 'Insulin, Diet Plan' }
      ]
    }
  ],
  earningsHistory: {
    daily: [
      { date: '2024-01-15', amount: 2400, consultations: 6 },
      { date: '2024-01-14', amount: 3200, consultations: 8 },
      { date: '2024-01-13', amount: 2800, consultations: 7 },
      { date: '2024-01-12', amount: 3600, consultations: 9 }
    ],
    weekly: [
      { week: 'Week 2, Jan 2024', amount: 15200, consultations: 38 },
      { week: 'Week 1, Jan 2024', amount: 16800, consultations: 42 },
      { week: 'Week 4, Dec 2023', amount: 14400, consultations: 36 }
    ],
    monthly: [
      { month: 'January 2024', amount: 56800, consultations: 142 },
      { month: 'December 2023', amount: 61200, consultations: 153 },
      { month: 'November 2023', amount: 52400, consultations: 131 }
    ]
  }
};

export const navigationItems = [
  { id: 'dashboard', label: 'Dashboard', icon: '📊' },
  { id: 'appointments', label: 'Appointments', icon: '📅' },
  { id: 'patients', label: 'Patients', icon: '👥' },
  { id: 'earnings', label: 'Earnings', icon: '💰' },
  { id: 'timeslots', label: 'Time Slots', icon: '⏰' }
];

// Custom Hook for Window Size Detection
export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 800,
  });

  useEffect(() => {
    // Only run in browser environment
    if (typeof window === 'undefined') return;

    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    
    // Call handler right away so state gets updated with initial window size
    handleResize();
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
};

// Custom Hook for State Management
export const useDoctorState = (user) => {
  const [activePage, setActivePage] = useState('dashboard');
  const [timeRange, setTimeRange] = useState('today');
  const [consultationDetails, setConsultationDetails] = useState(null);
  const [appointmentFilter, setAppointmentFilter] = useState('upcoming');
  const [patientSearch, setPatientSearch] = useState('');
  const [earningFilter, setEarningFilter] = useState('daily');
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showNotificationsModal, setShowNotificationsModal] = useState(false);
  const [showMessagesModal, setShowMessagesModal] = useState(false);
  const [showChatbotModal, setShowChatbotModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [timeslots, setTimeslots] = useState([]);

  const windowSize = useWindowSize();

  // Auto-close sidebar when switching to mobile
  useEffect(() => {
    if (windowSize.width > 768 && !isSidebarOpen) {
      setIsSidebarOpen(false);
    }
  }, [windowSize.width, isSidebarOpen]);

  const [userProfile, setUserProfile] = useState({
    fullName: user?.fullName || 'Dr. John Doe',
    email: user?.email || 'doctor@example.com',
    phone: user?.phone || '+91 98765 43210',
    specialization: user?.specialization || 'General Physician',
    licenseNumber: user?.licenseNumber || 'MED-2024-12345',
    experience: user?.experience || '12 years',
    hospital: user?.hospital || 'City General Hospital',
    address: user?.address || 'Medical Complex, Sector 15, Noida',
    city: user?.city || 'Noida',
    state: user?.state || 'Uttar Pradesh',
    pincode: user?.pincode || '201301'
  });

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'appointment',
      title: 'New Appointment Request',
      message: 'Rahul Verma requested an appointment for general health checkup',
      time: '10 minutes ago',
      read: false,
      priority: 'high'
    },
    {
      id: 2,
      type: 'message',
      title: 'New Message from Patient',
      message: 'Sarah Johnson sent a message about prescription follow-up',
      time: '25 minutes ago',
      read: false,
      priority: 'medium'
    },
    {
      id: 3,
      type: 'reminder',
      title: 'Upcoming Appointment',
      message: 'You have an appointment with Lisa Thompson in 30 minutes',
      time: '1 hour ago',
      read: true,
      priority: 'high'
    }
  ]);

  const [appointments, setAppointments] = useState({
    upcoming: [],
    rescheduled: [],
    cancelled: [],
    pending: []
  });

  const [patientNotes, setPatientNotes] = useState({});
  const [patientMessages, setPatientMessages] = useState({});
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    // Initialize appointments
    setAppointments({
      upcoming: dashboardData.upcomingAppointments,
      rescheduled: dashboardData.rescheduledAppointments,
      cancelled: dashboardData.cancelledAppointments,
      pending: dashboardData.pendingAppointments
    });

    // Initialize messages
    const initialMessages = {
      'Sarah Johnson': [
        {
          id: 1,
          from: 'patient',
          message: 'Hello Doctor, I wanted to follow up on my prescription.',
          timestamp: '2024-01-15T14:30:00',
          read: true
        },
        {
          id: 2,
          from: 'doctor',
          message: 'Hello Sarah, your prescription has been updated. You can collect it from the pharmacy.',
          timestamp: '2024-01-15T14:35:00',
          read: true
        }
      ],
      'Michael Chen': [
        {
          id: 1,
          from: 'patient',
          message: 'Dr. John, my blood pressure readings have been normal this week.',
          timestamp: '2024-01-15T10:15:00',
          read: true
        }
      ],
      'Emily Rodriguez': [
        {
          id: 1,
          from: 'patient',
          message: 'When should I schedule my next physiotherapy session?',
          timestamp: '2024-01-14T16:20:00',
          read: false
        }
      ]
    };

    setPatientMessages(initialMessages);
  }, []);

  return {
    activePage,
    setActivePage,
    timeRange,
    setTimeRange,
    consultationDetails,
    setConsultationDetails,
    appointmentFilter,
    setAppointmentFilter,
    patientSearch,
    setPatientSearch,
    earningFilter,
    setEarningFilter,
    showProfileModal,
    setShowProfileModal,
    showNotificationsModal,
    setShowNotificationsModal,
    showMessagesModal,
    setShowMessagesModal,
    showChatbotModal,
    setShowChatbotModal,
    selectedPatient,
    setSelectedPatient,
    showLogoutConfirm,
    setShowLogoutConfirm,
    userProfile,
    setUserProfile,
    notifications,
    setNotifications,
    appointments,
    setAppointments,
    patientNotes,
    setPatientNotes,
    patientMessages,
    setPatientMessages,
    formErrors,
    setFormErrors,
    isSidebarOpen,
    setIsSidebarOpen,
    windowSize,
    timeslots,
    setTimeslots
  };
};

// Custom Hook for Actions
export const useDoctorActions = (state) => {
  const {
    userProfile,
    setUserProfile,
    appointments,
    setAppointments,
    patientMessages,
    setPatientMessages,
    patientNotes,
    setPatientNotes,
    notifications,
    setNotifications,
    setConsultationDetails,
    setFormErrors,
    setShowMessagesModal,
    setSelectedPatient,
    setShowProfileModal,
    setShowNotificationsModal,
    setShowLogoutConfirm,
    setIsSidebarOpen,
    windowSize,
    setActivePage,
    timeslots,
    setTimeslots
  } = state;

  const getUnreadMessagesCount = () => {
    let count = 0;
    if (patientMessages && typeof patientMessages === 'object') {
      Object.values(patientMessages).forEach(messages => {
        if (Array.isArray(messages)) {
          messages.forEach(msg => {
            if (msg.from === 'patient' && !msg.read) {
              count++;
            }
          });
        }
      });
    }
    return count;
  };

  const getUnreadNotificationsCount = () => {
    return notifications.filter(notification => !notification.read).length;
  };

  const handleStartConversation = (patient) => {
    if (!patient || !patient.name) return;
    setSelectedPatient(patient);
    setShowMessagesModal(true);
    
    // Auto-close sidebar on mobile when opening messages
    if (windowSize && windowSize.width <= 768) {
      setIsSidebarOpen(false);
    }
  };

  const handleMarkAsRead = (patientName) => {
    setPatientMessages(prev => {
      const updated = { ...prev };
      if (updated[patientName]) {
        updated[patientName] = updated[patientName].map(msg => ({
          ...msg,
          read: true
        }));
      }
      return updated;
    });
  };

  const handleSendMessage = (patientName, message) => {
    if (!message.trim()) return;

    const newMessage = {
      id: Date.now(),
      from: 'doctor',
      message: message,
      timestamp: new Date().toISOString(),
      read: true
    };

    setPatientMessages(prev => ({
      ...prev,
      [patientName]: [...(prev[patientName] || []), newMessage]
    }));
  };

  const handleStartConsultation = (appointmentId) => {
    const appointment = appointments.upcoming.find(apt => apt.id === appointmentId);
    if (appointment) {
      setAppointments(prev => ({
        ...prev,
        upcoming: prev.upcoming.filter(apt => apt.id !== appointmentId)
      }));
      
      // Show mobile-friendly notification
      if (windowSize && windowSize.width <= 768) {
        showNotification('Consultation Started', `Started consultation with ${appointment.patientName}`);
      }
      
      // Return the appointment for the current consultation state
      return appointment;
    }
    return null;
  };

  const handleCancelAppointment = (appointmentId) => {
    const appointment = appointments.upcoming.find(apt => apt.id === appointmentId);
    if (appointment) {
      // Mobile-friendly confirmation
      const confirmMessage = `Are you sure you want to cancel the appointment with ${appointment.patientName}?`;
      if (window.confirm(confirmMessage)) {
        const cancelledAppointment = {
          ...appointment,
          status: 'cancelled',
          cancelledDate: new Date().toISOString().split('T')[0],
          reason: 'Doctor cancelled'
        };

        setAppointments(prev => ({
          ...prev,
          upcoming: prev.upcoming.filter(apt => apt.id !== appointmentId),
          cancelled: [...prev.cancelled, cancelledAppointment]
        }));

        // Mobile notification
        if (windowSize && windowSize.width <= 768) {
          showNotification('Appointment Cancelled', `Cancelled appointment with ${appointment.patientName}`);
        }
      }
    }
  };

  const handleApproveAppointment = (appointmentId) => {
    const appointment = appointments.pending.find(apt => apt.id === appointmentId);
    if (appointment) {
      setAppointments(prev => ({
        ...prev,
        pending: prev.pending.filter(apt => apt.id !== appointmentId),
        upcoming: [...prev.upcoming, { ...appointment, status: 'scheduled' }]
      }));

      // Mobile notification
      if (windowSize && windowSize.width <= 768) {
        showNotification('Appointment Approved', `Approved appointment with ${appointment.patientName}`);
      }
    }
  };

  const handleRejectAppointment = (appointmentId) => {
    const appointment = appointments.pending.find(apt => apt.id === appointmentId);
    if (appointment) {
      // Mobile-friendly confirmation
      const confirmMessage = `Are you sure you want to reject the appointment request from ${appointment.patientName}?`;
      if (window.confirm(confirmMessage)) {
        setAppointments(prev => ({
          ...prev,
          pending: prev.pending.filter(apt => apt.id !== appointmentId)
        }));

        // Mobile notification
        if (windowSize && windowSize.width <= 768) {
          showNotification('Appointment Rejected', `Rejected appointment with ${appointment.patientName}`);
        }
      }
    }
  };

  const handleAddNotes = (patientName) => {
    const currentNotes = patientNotes[patientName] || '';
    const notes = prompt(`Add notes for ${patientName}:`, currentNotes);
    if (notes !== null) {
      setPatientNotes(prev => ({
        ...prev,
        [patientName]: notes
      }));

      // Mobile notification
      if (windowSize && windowSize.width <= 768) {
        showNotification('Notes Added', `Added notes for ${patientName}`);
      }
    }
  };

  const handleViewFullHistory = (patientName) => {
    const patient = dashboardData.patients.find(p => p.name === patientName);
    if (patient) {
      // Use windowSize safely with fallback
      const isMobileView = windowSize ? windowSize.width <= 768 : window.innerWidth <= 768;
      
      // Mobile-friendly history view
      if (isMobileView) {
        // For mobile, open in same window with responsive design
        const historyHTML = `
          <html>
            <head>
              <title>Medical History - ${patientName}</title>
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <style>
                body { 
                  font-family: Arial, sans-serif; 
                  margin: 15px; 
                  line-height: 1.4;
                  color: #333;
                }
                .header { 
                  border-bottom: 2px solid #7C2A62; 
                  padding-bottom: 10px; 
                  margin-bottom: 20px; 
                }
                .history-item { 
                  border: 1px solid #ddd; 
                  padding: 12px; 
                  margin-bottom: 10px; 
                  border-radius: 8px;
                  background: #f9f9f9;
                }
                .diagnosis { 
                  font-weight: bold; 
                  color: #7C2A62; 
                  margin: 5px 0;
                }
                .prescription { 
                  color: #2d5016; 
                  margin: 5px 0;
                }
                .back-button {
                  background: #7C2A62;
                  color: white;
                  border: none;
                  padding: 10px 15px;
                  border-radius: 5px;
                  cursor: pointer;
                  margin-bottom: 15px;
                }
                @media (max-width: 768px) {
                  body { margin: 10px; }
                  .history-item { padding: 10px; }
                }
              </style>
            </head>
            <body>
              <button class="back-button" onclick="window.history.back()">← Back</button>
              <div class="header">
                <h1>Medical History - ${patientName}</h1>
                <p><strong>Age:</strong> ${patient.age} | <strong>Blood Group:</strong> ${patient.bloodGroup}</p>
                <p><strong>Conditions:</strong> ${patient.conditions.join(', ')}</p>
              </div>
              <h2>Medical Records</h2>
              ${patient.medicalHistory.map(record => `
                <div class="history-item">
                  <p><strong>Date:</strong> ${record.date}</p>
                  <p class="diagnosis">Diagnosis: ${record.diagnosis}</p>
                  <p class="prescription">Prescription: ${record.prescription}</p>
                </div>
              `).join('')}
            </body>
          </html>
        `;
        
        const historyWindow = window.open('', '_blank');
        if (historyWindow) {
          historyWindow.document.write(historyHTML);
          historyWindow.document.close();
        }
      } else {
        // For desktop, use the original design
        const historyWindow = window.open('', '_blank');
        if (historyWindow) {
          historyWindow.document.write(`
            <html>
              <head>
                <title>Medical History - ${patientName}</title>
                <style>
                  body { font-family: Arial, sans-serif; margin: 20px; }
                  .header { border-bottom: 2px solid #7C2A62; padding-bottom: 10px; margin-bottom: 20px; }
                  .history-item { border: 1px solid #ddd; padding: 15px; margin-bottom: 10px; border-radius: 5px; }
                  .diagnosis { font-weight: bold; color: #7C2A62; }
                  .prescription { color: #2d5016; }
                </style>
              </head>
              <body>
                <div class="header">
                  <h1>Medical History - ${patientName}</h1>
                  <p><strong>Age:</strong> ${patient.age} | <strong>Blood Group:</strong> ${patient.bloodGroup}</p>
                  <p><strong>Conditions:</strong> ${patient.conditions.join(', ')}</p>
                </div>
                <h2>Medical Records</h2>
                ${patient.medicalHistory.map(record => `
                  <div class="history-item">
                    <p><strong>Date:</strong> ${record.date}</p>
                    <p class="diagnosis">Diagnosis: ${record.diagnosis}</p>
                    <p class="prescription">Prescription: ${record.prescription}</p>
                  </div>
                `).join('')}
              </body>
            </html>
          `);
          historyWindow.document.close();
        }
      }
    }
  };

  const handleProfileUpdate = (updatedProfile) => {
    if (validateForm(updatedProfile)) {
      setUserProfile(updatedProfile);
      setShowProfileModal(false);
      setFormErrors({});
      
      // Mobile notification
      if (windowSize && windowSize.width <= 768) {
        showNotification('Profile Updated', 'Your profile has been updated successfully');
      }
    }
  };

  const handleMarkNotificationAsRead = (notificationId) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === notificationId
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const handleMarkAllNotificationsAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, read: true }))
    );
    
    // Mobile notification
    if (windowSize && windowSize.width <= 768) {
      showNotification('Notifications', 'All notifications marked as read');
    }
  };

  const handleClearAllNotifications = () => {
    setNotifications([]);
    
    // Mobile notification
    if (windowSize && windowSize.width <= 768) {
      showNotification('Notifications', 'All notifications cleared');
    }
  };

  const showNotification = (title, message) => {
    // Use browser notification API if available, otherwise fallback to alert
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(title, { body: message });
    } else if ('Notification' in window && Notification.permission !== 'denied') {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          new Notification(title, { body: message });
        } else {
          // Fallback to alert for mobile
          alert(`${title}: ${message}`);
        }
      });
    } else {
      // Fallback for browsers that don't support notifications
      alert(`${title}: ${message}`);
    }
  };

  // Timeslot Management Actions
  const addTimeslot = (slot) => {
    setTimeslots(prev => [...prev, slot]);
    showNotification('Time Slot Added', `Added slot for ${slot.date} at ${slot.startTime}`);
  };

  const updateTimeslot = (updatedSlot) => {
    setTimeslots(prev => 
      prev.map(slot => 
        slot.id === updatedSlot.id ? updatedSlot : slot
      )
    );
    showNotification('Time Slot Updated', `Updated slot for ${updatedSlot.date}`);
  };

  const deleteTimeslot = (slotId) => {
    setTimeslots(prev => prev.filter(slot => slot.id !== slotId));
    showNotification('Time Slot Deleted', 'Time slot has been removed');
  };

  const toggleTimeslotAvailability = (slotId) => {
    setTimeslots(prev =>
      prev.map(slot =>
        slot.id === slotId 
          ? { ...slot, isAvailable: !slot.isAvailable }
          : slot
      )
    );
  };

  // Complete form validation
  const validateForm = (formData) => {
    const errors = {};

    const validateEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };

    const validatePhone = (phone) => {
      const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
      return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
    };

    const validateName = (name) => {
      const nameRegex = /^[a-zA-Z\s]*$/;
      return nameRegex.test(name) && name.trim().length > 0;
    };

    const validatePincode = (pincode) => {
      if (!pincode) return true; // Optional field
      const pincodeRegex = /^[1-9][0-9]{5}$/;
      return pincodeRegex.test(pincode);
    };

    const validateLicenseNumber = (license) => {
      const licenseRegex = /^[A-Za-z0-9\-]+$/;
      return licenseRegex.test(license) && license.trim().length > 0;
    };

    const validateExperience = (experience) => {
      const experienceRegex = /^[0-9]+\s*(years|yrs)?$/i;
      return experienceRegex.test(experience) && experience.trim().length > 0;
    };

    if (!validateName(formData.fullName)) {
      errors.fullName = 'Please enter a valid name (letters and spaces only)';
    }

    if (!validateEmail(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!validatePhone(formData.phone)) {
      errors.phone = 'Please enter a valid phone number';
    }

    if (!formData.specialization.trim()) {
      errors.specialization = 'Specialization is required';
    }

    if (!validateLicenseNumber(formData.licenseNumber)) {
      errors.licenseNumber = 'Please enter a valid license number';
    }

    if (!validateExperience(formData.experience)) {
      errors.experience = 'Please enter valid experience (e.g., "12 years")';
    }

    if (formData.pincode && !validatePincode(formData.pincode)) {
      errors.pincode = 'Please enter a valid 6-digit pincode';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  return {
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
  };
};