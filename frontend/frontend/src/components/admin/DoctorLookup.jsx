import React, { useState, useEffect } from 'react';

const DoctorLookup = () => {
  const primaryColor = '#7C2A62';
  const accentColor = '#F7D9EB';
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({});
  const [loading, setLoading] = useState(false);
  const [showAllPrescriptions, setShowAllPrescriptions] = useState(false);
  const [showAllFeedback, setShowAllFeedback] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);
  const [actionMessage, setActionMessage] = useState('');
  const [actionReason, setActionReason] = useState('');

  // Comprehensive mock data with more doctors and detailed information
  const initialDoctors = [
    {
      id: 'DO01',
      name: 'Dr. Rajesh Sharma',
      specialization: 'Cardiologist',
      phone: '+91 9876543210',
      email: 'r.sharma@cardiaccare.com',
      alternateEmail: 'rajesh.sharma@healthmail.com',
      address: '456 Health Street, Koramangala, Bangalore - 560034',
      clinicName: 'Cardiac Care Center',
      yearsOfExperience: 12,
      dateOfBirth: '1980-05-15',
      gender: 'Male',
      status: 'Active',
      registrationDate: '2015-03-20',
      lastActive: '2024-01-20',
      
      // Professional Details
      licenseNumber: 'MED123456',
      licenseExpiry: '2025-12-31',
      professionalCertification: 'MBBS, MD Cardiology, DM Cardiology',
      govtHealthId: 'GHID123456789',
      kycStatus: 'Verified',
      verificationDate: '2023-06-15',
      
      // Practice Information
      consultationFee: 1500,
      followUpFee: 800,
      availableSlots: ['09:00-11:00', '14:00-16:00', '17:00-19:00'],
      workingDays: ['Monday', 'Wednesday', 'Friday', 'Saturday'],
      
      // Metrics
      totalAppointments: 1250,
      cancelledAppointments: 45,
      noShowAppointments: 23,
      avgConsultationDuration: '18 mins',
      satisfactionRating: 4.8,
      responseTime: '2 hours',
      
      // Trends
      weeklyTrend: [45, 52, 48, 55, 50, 58, 53],
      monthlyTrend: [210, 225, 218, 230, 245, 240, 235, 250, 242, 255, 260, 248],
      yearlyTrend: [1250, 1340, 1420, 1560],
      
      // Feedback & Reviews
      feedback: [
        { 
          id: 'F001', 
          patient: 'Mrs. Anjali Mehta', 
          rating: 5, 
          comment: 'Excellent doctor with great bedside manner. Explained everything clearly.', 
          date: '2024-01-15',
          appointmentType: 'Follow-up'
        },
        { 
          id: 'F002', 
          patient: 'Mr. Vikram Singh', 
          rating: 4, 
          comment: 'Very professional and knowledgeable. Waiting time was a bit long.', 
          date: '2024-01-10',
          appointmentType: 'First Visit'
        },
        { 
          id: 'F003', 
          patient: 'Ms. Priya Reddy', 
          rating: 5, 
          comment: 'Great diagnosis and treatment plan. Highly recommended!', 
          date: '2024-01-05',
          appointmentType: 'Consultation'
        },
        { 
          id: 'F004', 
          patient: 'Mr. Arun Kumar', 
          rating: 5, 
          comment: 'Patient and caring. Took time to understand all concerns.', 
          date: '2024-01-02',
          appointmentType: 'Follow-up'
        },
        { 
          id: 'F005', 
          patient: 'Mrs. Sunita Patel', 
          rating: 4, 
          comment: 'Good consultation but clinic was crowded.', 
          date: '2023-12-28',
          appointmentType: 'First Visit'
        }
      ],
      
      // Prescription Records
      prescriptions: [
        { 
          id: 'P001',
          date: '2024-01-15', 
          patient: 'Mrs. Anjali Mehta', 
          patientAge: 58,
          diagnosis: 'Hypertension Stage 2', 
          prescription: 'Amlodipine 5mg once daily, Lifestyle modifications, Regular BP monitoring',
          followUpDate: '2024-02-15',
          status: 'Active'
        },
        { 
          id: 'P002',
          date: '2024-01-10', 
          patient: 'Mr. Vikram Singh', 
          patientAge: 45,
          diagnosis: 'Arrhythmia - Atrial Fibrillation', 
          prescription: 'Metoprolol 25mg twice daily, Blood thinners as prescribed, ECG monthly',
          followUpDate: '2024-02-10',
          status: 'Active'
        },
        { 
          id: 'P003',
          date: '2024-01-05', 
          patient: 'Ms. Priya Reddy', 
          patientAge: 35,
          diagnosis: 'Heart Murmur - Mitral Valve Prolapse', 
          prescription: 'Regular echocardiogram, Symptomatic treatment, Avoid strenuous exercise',
          followUpDate: '2024-04-05',
          status: 'Monitoring'
        },
        { 
          id: 'P004',
          date: '2023-12-20', 
          patient: 'Mr. Sanjay Verma', 
          patientAge: 52,
          diagnosis: 'Coronary Artery Disease', 
          prescription: 'Aspirin 75mg, Statins, Cardiac rehabilitation program',
          followUpDate: '2024-01-20',
          status: 'Completed'
        }
      ],
      
      // Additional Information
      languages: ['English', 'Hindi', 'Kannada'],
      awards: ['Best Cardiologist 2022 - State Medical Board', 'Excellence in Patient Care 2021'],
      publications: ['3 research papers in International Cardiology Journal'],
      insuranceProviders: ['ABC Insurance', 'HealthGuard', 'MediCare Plus']
    },
    {
      id: 'DO02',
      name: 'Dr. Priya Patel',
      specialization: 'Neurologist',
      phone: '+91 9876543211',
      email: 'priya.patel@neurocare.com',
      alternateEmail: 'drpriya@neuroinstitute.org',
      address: '789 Neuro Street, HSR Layout, Mumbai - 400001',
      clinicName: 'Neuro Care Institute',
      yearsOfExperience: 8,
      dateOfBirth: '1985-08-22',
      gender: 'Female',
      status: 'Pending',
      registrationDate: '2018-07-10',
      lastActive: '2024-01-18',
      
      // Professional Details
      licenseNumber: 'MED123457',
      licenseExpiry: '2024-06-30',
      professionalCertification: 'MBBS, MD Medicine, DM Neurology',
      govtHealthId: 'GHID123456790',
      kycStatus: 'Pending',
      verificationDate: '2024-01-10',
      
      // Practice Information
      consultationFee: 1200,
      followUpFee: 600,
      availableSlots: ['10:00-13:00', '15:00-18:00'],
      workingDays: ['Tuesday', 'Thursday', 'Saturday'],
      
      // Metrics
      totalAppointments: 890,
      cancelledAppointments: 32,
      noShowAppointments: 15,
      avgConsultationDuration: '25 mins',
      satisfactionRating: 4.6,
      responseTime: '4 hours',
      
      // Trends
      weeklyTrend: [38, 42, 40, 45, 43, 47, 44],
      monthlyTrend: [165, 172, 168, 180, 175, 185, 178, 190, 182, 195, 200, 188],
      yearlyTrend: [890, 920, 950, 1020],
      
      // Feedback & Reviews
      feedback: [
        { 
          id: 'F101', 
          patient: 'Mr. Rohan Desai', 
          rating: 4, 
          comment: 'Good consultation and thorough examination.', 
          date: '2024-01-12',
          appointmentType: 'First Visit'
        },
        { 
          id: 'F102', 
          patient: 'Mrs. Lata Menon', 
          rating: 5, 
          comment: 'Very detailed and patient. Explained complex issues simply.', 
          date: '2024-01-08',
          appointmentType: 'Follow-up'
        },
        { 
          id: 'F103', 
          patient: 'Mr. Amit Joshi', 
          rating: 4, 
          comment: 'Professional approach, good treatment plan.', 
          date: '2024-01-05',
          appointmentType: 'Consultation'
        }
      ],
      
      // Prescription Records
      prescriptions: [
        { 
          id: 'P101',
          date: '2024-01-12', 
          patient: 'Mr. Rohan Desai', 
          patientAge: 40,
          diagnosis: 'Chronic Migraine', 
          prescription: 'Topiramate 25mg, Pain management, Stress reduction techniques',
          followUpDate: '2024-02-12',
          status: 'Active'
        },
        { 
          id: 'P102',
          date: '2024-01-08', 
          patient: 'Mrs. Lata Menon', 
          patientAge: 65,
          diagnosis: 'Epilepsy - Complex Partial Seizures', 
          prescription: 'Levetiracetam 500mg twice daily, Regular monitoring, Seizure diary',
          followUpDate: '2024-03-08',
          status: 'Active'
        }
      ],
      
      // Additional Information
      languages: ['English', 'Hindi', 'Marathi', 'Gujarati'],
      awards: ['Young Neurologist Award 2023'],
      publications: ['2 papers in National Neurology Conference'],
      insuranceProviders: ['XYZ Insurance', 'HealthFirst', 'MediCover']
    },
    {
      id: 'DO03',
      name: 'Dr. Arjun Reddy',
      specialization: 'Orthopedic Surgeon',
      phone: '+91 9876543212',
      email: 'arjun.reddy@bonecare.com',
      address: '123 Bone Care Center, Whitefield, Bangalore - 560066',
      clinicName: 'Advanced Ortho Care',
      yearsOfExperience: 15,
      dateOfBirth: '1978-12-10',
      gender: 'Male',
      status: 'Active',
      registrationDate: '2010-05-15',
      lastActive: '2024-01-22',
      
      // Professional Details
      licenseNumber: 'MED123458',
      licenseExpiry: '2026-03-31',
      professionalCertification: 'MBBS, MS Orthopedics, MCh Orthopedics',
      govtHealthId: 'GHID123456791',
      kycStatus: 'Verified',
      verificationDate: '2023-08-20',
      
      // Practice Information
      consultationFee: 2000,
      followUpFee: 1000,
      availableSlots: ['08:00-12:00', '14:00-17:00'],
      workingDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      
      // Metrics
      totalAppointments: 2100,
      cancelledAppointments: 78,
      noShowAppointments: 34,
      avgConsultationDuration: '20 mins',
      satisfactionRating: 4.9,
      responseTime: '1 hour',
      
      // Trends
      weeklyTrend: [55, 60, 58, 62, 65, 63, 61],
      monthlyTrend: [240, 250, 245, 260, 255, 265, 262, 270, 268, 275, 280, 272],
      yearlyTrend: [2100, 2250, 2400, 2600],
      
      // Feedback & Reviews (sample)
      feedback: [
        { 
          id: 'F201', 
          patient: 'Mr. Suresh Kumar', 
          rating: 5, 
          comment: 'Excellent surgeon! Knee replacement was successful.', 
          date: '2024-01-20',
          appointmentType: 'Post-op'
        }
      ],
      
      // Prescription Records (sample)
      prescriptions: [
        { 
          id: 'P201',
          date: '2024-01-20', 
          patient: 'Mr. Suresh Kumar', 
          patientAge: 62,
          diagnosis: 'Osteoarthritis - Total Knee Replacement', 
          prescription: 'Pain management, Physiotherapy, Regular follow-up',
          followUpDate: '2024-02-20',
          status: 'Active'
        }
      ],
      
      // Additional Information
      languages: ['English', 'Hindi', 'Kannada', 'Telugu'],
      awards: ['Best Orthopedic Surgeon 2023', 'Excellence in Joint Replacement 2022'],
      publications: ['5 research papers in International Orthopedics Journal'],
      insuranceProviders: ['ABC Insurance', 'HealthGuard', 'MediCare Plus', 'SurgicalCare']
    }
  ];

  useEffect(() => {
    // Simulate API call to fetch doctors
    setLoading(true);
    setTimeout(() => {
      setDoctors(initialDoctors);
      setLoading(false);
      
      // Set default doctor on component load
      const defaultDoctor = initialDoctors.find(doc => doc.id === 'DO01');
      if (defaultDoctor) {
        setSelectedDoctor(defaultDoctor);
        setSearchQuery(defaultDoctor.id);
      }
    }, 1000);
  }, []);

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const foundDoctor = doctors.find(d => 
        d.id.toLowerCase() === searchQuery.toLowerCase() || 
        d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.phone.includes(searchQuery) ||
        d.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
      
      setSelectedDoctor(foundDoctor || null);
      setIsEditing(false);
      setLoading(false);
    }, 500);
  };

  const handleViewAllDoctors = () => {
    setLoading(true);
    setTimeout(() => {
      setSelectedDoctor(null);
      setSearchQuery('');
      setLoading(false);
    }, 500);
  };

  const handleActionConfirmation = (action) => {
    const actionMessages = {
      approve: { 
        message: 'Are you sure you want to approve this doctor? This will activate their account.', 
        status: 'Active',
        requireReason: false
      },
      suspend: { 
        message: 'Are you sure you want to suspend this doctor? They will not be able to access the platform.', 
        status: 'Suspended',
        requireReason: true
      },
      reset: { 
        message: 'Are you sure you want to reset this doctor to pending status?', 
        status: 'Pending',
        requireReason: false
      },
      reject: { 
        message: 'Are you sure you want to reject this doctor? This action cannot be undone.', 
        status: 'Rejected',
        requireReason: true
      }
    };

    setPendingAction(action);
    setActionMessage(actionMessages[action]?.message || 'Are you sure you want to perform this action?');
    setActionReason('');
    setShowConfirmation(true);
  };

  const handleAction = () => {
    if (!selectedDoctor || !pendingAction) return;

    // Check if reason is required but not provided
    const actionsRequiringReason = ['suspend', 'reject'];
    if (actionsRequiringReason.includes(pendingAction) && !actionReason.trim()) {
      alert(`Please provide a reason for ${pendingAction}ing this doctor.`);
      return;
    }

    const actionMessages = {
      approve: { status: 'Active' },
      suspend: { status: 'Suspended' },
      reset: { status: 'Pending' },
      reject: { status: 'Rejected' }
    };

    const updatedDoctors = doctors.map(doc => 
      doc.id === selectedDoctor.id 
        ? { 
            ...doc, 
            status: actionMessages[pendingAction]?.status || doc.status,
            lastActive: new Date().toISOString().split('T')[0],
            // Store the reason for suspend/reject actions
            ...(actionsRequiringReason.includes(pendingAction) && {
              actionReason: actionReason,
              actionDate: new Date().toISOString().split('T')[0],
              actionType: pendingAction
            })
          } 
        : doc
    );

    setDoctors(updatedDoctors);
    setSelectedDoctor(updatedDoctors.find(d => d.id === selectedDoctor.id));
    
    // Show success message with reason if applicable
    const successMessage = actionsRequiringReason.includes(pendingAction) 
      ? `Doctor ${pendingAction}ed successfully. Reason: ${actionReason}`
      : `Doctor ${pendingAction === 'approve' ? 'approved' : 'reset'} successfully.`;
    
    alert(successMessage);
    
    // Close confirmation modal
    setShowConfirmation(false);
    setPendingAction(null);
    setActionMessage('');
    setActionReason('');
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditForm({ ...selectedDoctor });
  };

  const handleSave = () => {
    if (!editForm.name || !editForm.email || !editForm.phone) {
      alert('Please fill in all required fields (Name, Email, Phone)');
      return;
    }

    const updatedDoctors = doctors.map(doc => 
      doc.id === selectedDoctor.id ? { 
        ...editForm,
        lastActive: new Date().toISOString().split('T')[0]
      } : doc
    );
    
    setDoctors(updatedDoctors);
    setSelectedDoctor(editForm);
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditForm({});
  };

  const handleInputChange = (field, value) => {
    setEditForm(prev => ({ ...prev, [field]: value }));
  };

  // Enhanced chart component with labels
  const TrendChart = ({ data, title, color = primaryColor, labels }) => {
    const maxValue = Math.max(...data);
    return (
      <div style={{ marginTop: '10px' }}>
        <div style={{ fontSize: '14px', marginBottom: '8px', fontWeight: 'bold' }}>{title}</div>
        <div style={{ display: 'flex', alignItems: 'end', gap: '4px', height: '80px', marginBottom: '5px' }}>
          {data.map((value, index) => (
            <div key={index} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
              <div
                style={{
                  height: `${(value / maxValue) * 60}px`,
                  backgroundColor: color,
                  width: '20px',
                  borderRadius: '2px',
                  minHeight: '2px',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                title={`${value}`}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#5A1F4A';
                  e.target.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = color;
                  e.target.style.transform = 'scale(1)';
                }}
              />
              {labels && (
                <div style={{ fontSize: '10px', marginTop: '4px', transform: 'rotate(-45deg)', whiteSpace: 'nowrap' }}>
                  {labels[index]}
                </div>
              )}
            </div>
          ))}
        </div>
        <div style={{ fontSize: '11px', color: '#666', textAlign: 'center' }}>
          Max: {maxValue} appointments
        </div>
      </div>
    );
  };

  // Calculate additional metrics
  const calculateMetrics = (doctor) => {
    const completionRate = ((doctor.totalAppointments - doctor.cancelledAppointments - doctor.noShowAppointments) / doctor.totalAppointments * 100).toFixed(1);
    const revenue = doctor.totalAppointments * doctor.consultationFee;
    
    return { completionRate, revenue };
  };

  const displayedPrescriptions = showAllPrescriptions 
    ? selectedDoctor?.prescriptions 
    : selectedDoctor?.prescriptions?.slice(0, 3);

  const displayedFeedback = showAllFeedback 
    ? selectedDoctor?.feedback 
    : selectedDoctor?.feedback?.slice(0, 3);

  const metrics = selectedDoctor ? calculateMetrics(selectedDoctor) : null;

  // Edit Form Fields Configuration
  const editFormFields = [
    { label: 'Doctor ID', field: 'id', type: 'text', required: true, disabled: true },
    { label: 'Name', field: 'name', type: 'text', required: true },
    { label: 'Specialization', field: 'specialization', type: 'text', required: true },
    { label: 'Phone', field: 'phone', type: 'tel', required: true },
    { label: 'Email', field: 'email', type: 'email', required: true },
    { label: 'Alternate Email', field: 'alternateEmail', type: 'email' },
    { label: 'Address', field: 'address', type: 'text', required: true },
    { label: 'Clinic Name', field: 'clinicName', type: 'text' },
    { label: 'Years of Experience', field: 'yearsOfExperience', type: 'number' },
    { label: 'Date of Birth', field: 'dateOfBirth', type: 'date' },
    { label: 'Gender', field: 'gender', type: 'select', options: ['Male', 'Female', 'Other'] },
    { label: 'Status', field: 'status', type: 'select', options: ['Active', 'Pending', 'Suspended', 'Rejected'] },
    { label: 'Consultation Fee (₹)', field: 'consultationFee', type: 'number' },
    { label: 'Follow-up Fee (₹)', field: 'followUpFee', type: 'number' },
    { label: 'License Number', field: 'licenseNumber', type: 'text' },
    { label: 'License Expiry', field: 'licenseExpiry', type: 'date' },
    { label: 'Professional Certification', field: 'professionalCertification', type: 'text' },
    { label: 'Government Health ID', field: 'govtHealthId', type: 'text' },
    { label: 'KYC Status', field: 'kycStatus', type: 'select', options: ['Verified', 'Pending', 'Rejected'] },
    { label: 'Satisfaction Rating', field: 'satisfactionRating', type: 'number', step: '0.1', min: '0', max: '5' },
    { label: 'Response Time', field: 'responseTime', type: 'text' },
  ];

  // Check if action requires reason
  const requiresReason = pendingAction === 'suspend' || pendingAction === 'reject';

  return (
    <div style={{ padding: '20px', maxWidth: '1400px', margin: '0 auto', minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      
      {/* Confirmation Modal */}
      {showConfirmation && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '30px',
            borderRadius: '10px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
            maxWidth: '500px',
            width: '90%',
            textAlign: 'center'
          }}>
            <h3 style={{ color: primaryColor, marginBottom: '15px', fontSize: '20px' }}>
              Confirm Action
            </h3>
            <p style={{ marginBottom: '20px', lineHeight: '1.5', color: '#666', textAlign: 'left' }}>
              {actionMessage}
            </p>

            {/* Reason Input for Suspend/Reject Actions */}
            {requiresReason && (
              <div style={{ marginBottom: '20px', textAlign: 'left' }}>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '8px', 
                  fontWeight: '600', 
                  color: '#333',
                  fontSize: '14px'
                }}>
                  Reason for {pendingAction === 'suspend' ? 'Suspension' : 'Rejection'}:
                  <span style={{ color: 'red', marginLeft: '4px' }}>*</span>
                </label>
                <textarea
                  value={actionReason}
                  onChange={(e) => setActionReason(e.target.value)}
                  placeholder={`Enter reason for ${pendingAction}ing this doctor...`}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: `1px solid ${!actionReason.trim() ? 'red' : '#ddd'}`,
                    borderRadius: '6px',
                    fontSize: '14px',
                    minHeight: '80px',
                    resize: 'vertical',
                    boxSizing: 'border-box',
                    fontFamily: 'inherit',
                    transition: 'all 0.3s ease'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = primaryColor;
                    e.target.style.boxShadow = `0 0 0 2px ${accentColor}`;
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = !actionReason.trim() ? 'red' : '#ddd';
                    e.target.style.boxShadow = 'none';
                  }}
                  required
                />
                {!actionReason.trim() && (
                  <div style={{ color: 'red', fontSize: '12px', marginTop: '5px', textAlign: 'left' }}>
                    Please provide a reason for this action
                  </div>
                )}
              </div>
            )}

            <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
              <button
                onClick={() => {
                  setShowConfirmation(false);
                  setPendingAction(null);
                  setActionMessage('');
                  setActionReason('');
                }}
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#6c757d',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '600',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#5a6268';
                  e.target.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#6c757d';
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleAction}
                disabled={requiresReason && !actionReason.trim()}
                style={{
                  padding: '10px 20px',
                  backgroundColor: pendingAction === 'suspend' || pendingAction === 'reject' ? '#dc3545' : '#28a745',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: (requiresReason && !actionReason.trim()) ? 'not-allowed' : 'pointer',
                  fontSize: '14px',
                  fontWeight: '600',
                  opacity: (requiresReason && !actionReason.trim()) ? 0.6 : 1,
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  if (!(requiresReason && !actionReason.trim())) {
                    e.target.style.backgroundColor = pendingAction === 'suspend' || pendingAction === 'reject' ? '#c82333' : '#218838';
                    e.target.style.transform = 'translateY(-1px)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!(requiresReason && !actionReason.trim())) {
                    e.target.style.backgroundColor = pendingAction === 'suspend' || pendingAction === 'reject' ? '#dc3545' : '#28a745';
                    e.target.style.transform = 'translateY(0)';
                  }
                }}
              >
                Confirm {pendingAction === 'suspend' ? 'Suspension' : pendingAction === 'reject' ? 'Rejection' : ''}
              </button>
            </div>
          </div>
        </div>
      )}
      
      <div style={{ 
        backgroundColor: 'white', 
        padding: '25px', 
        borderRadius: '10px', 
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        marginBottom: '25px'
      }}>
        <h2 style={{ 
          color: primaryColor, 
          marginBottom: '10px',
          fontSize: '28px',
          fontWeight: '600'
        }}>
          Doctor Lookup & Profile Management
        </h2>
        <p style={{ color: '#666', marginBottom: '25px' }}>
          Search and manage doctor profiles with comprehensive details and analytics
        </p>
        
        {/* Search Section */}
        <div style={{ marginBottom: '10px' }}>
          <div style={{ 
            display: 'flex', 
            gap: '12px', 
            alignItems: 'stretch',
            flexWrap: 'nowrap'
          }}>
            <div style={{ 
              flex: 1, 
              minWidth: '300px',
              display: 'flex',
              alignItems: 'center'
            }}>
              <input
                type="text"
                placeholder="Enter Doctor ID, Name, Phone, or Email"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  border: `2px solid ${accentColor}`,
                  borderRadius: '8px',
                  fontSize: '15px',
                  transition: 'all 0.3s ease',
                  height: '100%',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = primaryColor;
                  e.target.style.boxShadow = `0 0 0 3px ${accentColor}`;
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = accentColor;
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>
            <button
              onClick={handleSearch}
              disabled={loading}
              style={{
                padding: '0 28px',
                backgroundColor: primaryColor,
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: loading ? 'not-allowed' : 'pointer',
                fontSize: '15px',
                fontWeight: '600',
                opacity: loading ? 0.7 : 1,
                transition: 'all 0.3s ease',
                minWidth: '140px',
                height: 'auto',
                whiteSpace: 'nowrap'
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.target.style.backgroundColor = '#5A1F4A';
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 4px 12px rgba(124, 42, 98, 0.3)';
                }
              }}
              onMouseLeave={(e) => {
                if (!loading) {
                  e.target.style.backgroundColor = primaryColor;
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = 'none';
                }
              }}
            >
              {loading ? (
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  <span>Searching...</span>
                </span>
              ) : (
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  <span>Search</span>
                </span>
              )}
            </button>
            <button
              onClick={handleViewAllDoctors}
              disabled={loading}
              style={{
                padding: '0 20px',
                backgroundColor: '#6c757d',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: loading ? 'not-allowed' : 'pointer',
                fontSize: '15px',
                fontWeight: '600',
                opacity: loading ? 0.7 : 1,
                transition: 'all 0.3s ease',
                minWidth: '160px',
                height: 'auto',
                whiteSpace: 'nowrap'
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.target.style.backgroundColor = '#5a6268';
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 4px 12px rgba(108, 117, 125, 0.3)';
                }
              }}
              onMouseLeave={(e) => {
                if (!loading) {
                  e.target.style.backgroundColor = '#6c757d';
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = 'none';
                }
              }}
            >
              {loading ? 'Loading...' : 'View All Doctors'}
            </button>
          </div>
          <div style={{ fontSize: '12px', color: '#666', marginTop: '8px', paddingLeft: '2px' }}>
            Try: DO01, Dr. Sharma, +91 9876543210, or r.sharma@cardiaccare.com
          </div>
        </div>
      </div>

      {loading && !selectedDoctor && (
        <div style={{ textAlign: 'center', padding: '60px', color: primaryColor }}>
          <div style={{ fontSize: '18px', marginBottom: '10px' }}>Loading doctor information...</div>
          <div>Please wait while we fetch the data</div>
        </div>
      )}

      {!selectedDoctor && !loading && (
        <div style={{ 
          backgroundColor: 'white',
          padding: '25px',
          borderRadius: '10px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ color: primaryColor, marginBottom: '20px', fontSize: '20px' }}>All Doctors ({doctors.length})</h3>
          <div style={{ display: 'grid', gap: '15px' }}>
            {doctors.map((doctor, index) => (
              <div 
                key={doctor.id}
                onClick={() => {
                  setSelectedDoctor(doctor);
                  setSearchQuery(doctor.id);
                }}
                style={{
                  padding: '15px',
                  border: `2px solid ${accentColor}`,
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  backgroundColor: '#f8f9fa',
                  transform: 'translateY(0)',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = accentColor;
                  e.currentTarget.style.borderColor = primaryColor;
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(124, 42, 98, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#f8f9fa';
                  e.currentTarget.style.borderColor = accentColor;
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.05)';
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <strong style={{ fontSize: '16px', color: primaryColor }}>{doctor.name}</strong>
                    <div style={{ fontSize: '14px', color: '#666' }}>{doctor.specialization} • {doctor.id}</div>
                  </div>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <span style={{
                      padding: '4px 8px',
                      borderRadius: '12px',
                      fontSize: '12px',
                      fontWeight: '600',
                      backgroundColor: doctor.status === 'Active' ? '#d4edda' : 
                                      doctor.status === 'Suspended' ? '#f8d7da' : 
                                      doctor.status === 'Pending' ? '#fff3cd' : '#e2e3e5',
                      color: doctor.status === 'Active' ? '#155724' : 
                            doctor.status === 'Suspended' ? '#721c24' : 
                            doctor.status === 'Pending' ? '#856404' : '#383d41',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'scale(1.05)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'scale(1)';
                    }}
                    >
                      {doctor.status}
                    </span>
                    <span style={{ 
                      fontSize: '16px', 
                      color: primaryColor,
                      fontWeight: 'bold',
                      transition: 'transform 0.3s ease'
                    }}
                    className="hover-arrow"
                    >→</span>
                  </div>
                </div>
                <style jsx>{`
                  .hover-arrow {
                    transition: transform 0.3s ease;
                  }
                  div:hover .hover-arrow {
                    transform: translateX(3px);
                  }
                `}</style>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedDoctor && (
        <div style={{ display: 'grid', gap: '25px' }}>
          {/* Edit Profile Modal */}
          {isEditing && (
            <div style={{
              position: 'fixed',
              top: '0',
              left: '0',
              right: '0',
              bottom: '0',
              backgroundColor: 'rgba(0,0,0,0.7)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 1000,
              padding: '20px'
            }}>
              <div style={{
                backgroundColor: 'white',
                borderRadius: '12px',
                width: '90%',
                maxWidth: '800px',
                maxHeight: '90vh',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '0 10px 40px rgba(0,0,0,0.3)'
              }}>
                {/* Header */}
                <div style={{
                  padding: '20px 25px',
                  backgroundColor: primaryColor,
                  color: 'white',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <h3 style={{ margin: 0, fontSize: '20px' }}>Edit Doctor Profile</h3>
                  <button
                    onClick={handleCancel}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'white',
                      fontSize: '20px',
                      cursor: 'pointer',
                      padding: '5px',
                      borderRadius: '50%',
                      width: '32px',
                      height: '32px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = 'rgba(255,255,255,0.2)';
                      e.target.style.transform = 'scale(1.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = 'transparent';
                      e.target.style.transform = 'scale(1)';
                    }}
                  >
                    ✕
                  </button>
                </div>

                {/* Scrollable Form Content */}
                <div style={{
                  flex: 1,
                  overflowY: 'auto',
                  padding: '25px'
                }}>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '20px'
                  }}>
                    {editFormFields.map(({ label, field, type, required, disabled, options, step, min, max }) => (
                      <div key={field} style={{ marginBottom: '15px' }}>
                        <label style={{
                          display: 'block',
                          marginBottom: '8px',
                          fontWeight: '600',
                          color: '#333',
                          fontSize: '14px'
                        }}>
                          {label}
                          {required && <span style={{ color: 'red', marginLeft: '4px' }}>*</span>}
                        </label>
                        
                        {type === 'select' ? (
                          <select
                            value={editForm[field] || ''}
                            onChange={(e) => handleInputChange(field, e.target.value)}
                            disabled={disabled}
                            style={{
                              width: '100%',
                              padding: '12px',
                              border: `1px solid ${required && !editForm[field] ? 'red' : '#ddd'}`,
                              borderRadius: '6px',
                              fontSize: '14px',
                              backgroundColor: disabled ? '#f5f5f5' : 'white',
                              boxSizing: 'border-box',
                              transition: 'all 0.3s ease',
                              cursor: disabled ? 'not-allowed' : 'pointer'
                            }}
                            onFocus={(e) => {
                              if (!disabled) {
                                e.target.style.borderColor = primaryColor;
                                e.target.style.boxShadow = `0 0 0 2px ${accentColor}`;
                              }
                            }}
                            onBlur={(e) => {
                              if (!disabled) {
                                e.target.style.borderColor = required && !editForm[field] ? 'red' : '#ddd';
                                e.target.style.boxShadow = 'none';
                              }
                            }}
                            onMouseEnter={(e) => {
                              if (!disabled) {
                                e.target.style.borderColor = primaryColor;
                              }
                            }}
                            onMouseLeave={(e) => {
                              if (!disabled) {
                                e.target.style.borderColor = required && !editForm[field] ? 'red' : '#ddd';
                              }
                            }}
                          >
                            <option value="">Select {label}</option>
                            {options.map(option => (
                              <option key={option} value={option}>{option}</option>
                            ))}
                          </select>
                        ) : (
                          <input
                            type={type}
                            value={editForm[field] || ''}
                            onChange={(e) => handleInputChange(field, e.target.value)}
                            disabled={disabled}
                            required={required}
                            step={step}
                            min={min}
                            max={max}
                            style={{
                              width: '100%',
                              padding: '12px',
                              border: `1px solid ${required && !editForm[field] ? 'red' : '#ddd'}`,
                              borderRadius: '6px',
                              fontSize: '14px',
                              backgroundColor: disabled ? '#f5f5f5' : 'white',
                              boxSizing: 'border-box',
                              transition: 'all 0.3s ease',
                              cursor: disabled ? 'not-allowed' : 'text'
                            }}
                            onFocus={(e) => {
                              if (!disabled) {
                                e.target.style.borderColor = primaryColor;
                                e.target.style.boxShadow = `0 0 0 2px ${accentColor}`;
                              }
                            }}
                            onBlur={(e) => {
                              if (!disabled) {
                                e.target.style.borderColor = required && !editForm[field] ? 'red' : '#ddd';
                                e.target.style.boxShadow = 'none';
                              }
                            }}
                            onMouseEnter={(e) => {
                              if (!disabled) {
                                e.target.style.borderColor = primaryColor;
                              }
                            }}
                            onMouseLeave={(e) => {
                              if (!disabled) {
                                e.target.style.borderColor = required && !editForm[field] ? 'red' : '#ddd';
                              }
                            }}
                          />
                        )}
                        
                        {required && !editForm[field] && (
                          <div style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>
                            This field is required
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Actions */}
                <div style={{
                  padding: '20px 25px',
                  backgroundColor: '#f8f9fa',
                  borderTop: '1px solid #dee2e6',
                  display: 'flex',
                  justifyContent: 'flex-end',
                  gap: '12px'
                }}>
                  <button
                    onClick={handleCancel}
                    style={{
                      padding: '12px 24px',
                      backgroundColor: '#6c757d',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: '600',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = '#5a6268';
                      e.target.style.transform = 'translateY(-1px)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = '#6c757d';
                      e.target.style.transform = 'translateY(0)';
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    style={{
                      padding: '12px 24px',
                      backgroundColor: '#28a745',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: '600',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = '#218838';
                      e.target.style.transform = 'translateY(-1px)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = '#28a745';
                      e.target.style.transform = 'translateY(0)';
                    }}
                  >
                    Update Profile
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Doctor Information */}
          <section style={{
            backgroundColor: 'white',
            padding: '25px',
            borderRadius: '10px',
            border: `1px solid ${accentColor}`,
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ color: primaryColor, margin: 0, fontSize: '20px' }}>A. Doctor Information</h3>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <span style={{
                  padding: '6px 12px',
                  borderRadius: '20px',
                  fontSize: '12px',
                  fontWeight: '600',
                  backgroundColor: selectedDoctor.status === 'Active' ? '#d4edda' : 
                                  selectedDoctor.status === 'Suspended' ? '#f8d7da' : 
                                  selectedDoctor.status === 'Pending' ? '#fff3cd' : '#e2e3e5',
                  color: selectedDoctor.status === 'Active' ? '#155724' : 
                        selectedDoctor.status === 'Suspended' ? '#721c24' : 
                        selectedDoctor.status === 'Pending' ? '#856404' : '#383d41'
                }}>
                  {selectedDoctor.status}
                </span>
                <span style={{
                  padding: '6px 12px',
                  borderRadius: '20px',
                  fontSize: '12px',
                  fontWeight: '600',
                  backgroundColor: selectedDoctor.kycStatus === 'Verified' ? '#d4edda' : '#fff3cd',
                  color: selectedDoctor.kycStatus === 'Verified' ? '#155724' : '#856404'
                }}>
                  KYC: {selectedDoctor.kycStatus}
                </span>
              </div>
            </div>

            {/* Show action reason if doctor is suspended or rejected */}
            {(selectedDoctor.status === 'Suspended' || selectedDoctor.status === 'Rejected') && selectedDoctor.actionReason && (
              <div style={{
                padding: '15px',
                backgroundColor: '#fff3cd',
                border: '1px solid #ffeaa7',
                borderRadius: '6px',
                marginBottom: '20px'
              }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <span style={{ fontSize: '16px', color: '#856404' }}>⚠️</span>
                  <div>
                    <strong style={{ color: '#856404', fontSize: '14px' }}>
                      {selectedDoctor.status} Reason:
                    </strong>
                    <div style={{ color: '#856404', fontSize: '14px', marginTop: '5px' }}>
                      {selectedDoctor.actionReason}
                    </div>
                    {selectedDoctor.actionDate && (
                      <div style={{ color: '#856404', fontSize: '12px', marginTop: '5px', fontStyle: 'italic' }}>
                        Action taken on: {selectedDoctor.actionDate}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
              <div><strong>Name:</strong> {selectedDoctor.name}</div>
              <div><strong>Specialization:</strong> {selectedDoctor.specialization}</div>
              <div><strong>Phone:</strong> {selectedDoctor.phone}</div>
              <div><strong>Email:</strong> {selectedDoctor.email}</div>
              <div><strong>Alternate Email:</strong> {selectedDoctor.alternateEmail || 'N/A'}</div>
              <div><strong>Address:</strong> {selectedDoctor.address}</div>
              <div><strong>Clinic Name:</strong> {selectedDoctor.clinicName}</div>
              <div><strong>Years of Experience:</strong> {selectedDoctor.yearsOfExperience}</div>
              <div><strong>Gender:</strong> {selectedDoctor.gender}</div>
              <div><strong>Date of Birth:</strong> {selectedDoctor.dateOfBirth}</div>
              <div><strong>Registration Date:</strong> {selectedDoctor.registrationDate}</div>
              <div><strong>Last Active:</strong> {selectedDoctor.lastActive}</div>
              <div><strong>Consultation Fee:</strong> ₹{selectedDoctor.consultationFee}</div>
              <div><strong>Follow-up Fee:</strong> ₹{selectedDoctor.followUpFee}</div>
              <div>
                <strong>Available Slots:</strong>
                <div style={{ marginTop: '5px' }}>
                  {selectedDoctor.availableSlots.map((slot, index) => (
                    <span key={index} style={{
                      display: 'inline-block',
                      padding: '4px 8px',
                      backgroundColor: accentColor,
                      borderRadius: '4px',
                      fontSize: '12px',
                      margin: '2px',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = primaryColor;
                      e.target.style.color = 'white';
                      e.target.style.transform = 'scale(1.05)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = accentColor;
                      e.target.style.color = 'inherit';
                      e.target.style.transform = 'scale(1)';
                    }}
                    >
                      {slot}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <strong>Working Days:</strong>
                <div style={{ marginTop: '5px' }}>
                  {selectedDoctor.workingDays.map((day, index) => (
                    <span key={index} style={{
                      display: 'inline-block',
                      padding: '4px 8px',
                      backgroundColor: '#e9ecef',
                      borderRadius: '4px',
                      fontSize: '12px',
                      margin: '2px',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = primaryColor;
                      e.target.style.color = 'white';
                      e.target.style.transform = 'scale(1.05)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = '#e9ecef';
                      e.target.style.color = 'inherit';
                      e.target.style.transform = 'scale(1)';
                    }}
                    >
                      {day}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <strong>Languages:</strong>
                <div style={{ marginTop: '5px' }}>
                  {selectedDoctor.languages.map((lang, index) => (
                    <span key={index} style={{
                      display: 'inline-block',
                      padding: '4px 8px',
                      backgroundColor: '#d1ecf1',
                      borderRadius: '4px',
                      fontSize: '12px',
                      margin: '2px',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = '#17a2b8';
                      e.target.style.color = 'white';
                      e.target.style.transform = 'scale(1.05)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = '#d1ecf1';
                      e.target.style.color = 'inherit';
                      e.target.style.transform = 'scale(1)';
                    }}
                    >
                      {lang}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Registration & Compliance */}
          <section style={{
            backgroundColor: 'white',
            padding: '25px',
            borderRadius: '10px',
            border: `1px solid ${accentColor}`,
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ color: primaryColor, marginBottom: '20px', fontSize: '20px' }}>B. Registration & Compliance</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
              <div><strong>Medical License:</strong> {selectedDoctor.licenseNumber}</div>
              <div><strong>License Expiry:</strong> {selectedDoctor.licenseExpiry}</div>
              <div><strong>Professional Certification:</strong> {selectedDoctor.professionalCertification}</div>
              <div><strong>Government Health ID:</strong> {selectedDoctor.govtHealthId}</div>
              <div><strong>KYC Status:</strong> 
                <span style={{
                  padding: '6px 12px',
                  borderRadius: '15px',
                  fontSize: '12px',
                  fontWeight: '600',
                  marginLeft: '8px',
                  backgroundColor: selectedDoctor.kycStatus === 'Verified' ? '#d4edda' : '#fff3cd',
                  color: selectedDoctor.kycStatus === 'Verified' ? '#155724' : '#856404',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'scale(1)';
                }}
                >
                  {selectedDoctor.kycStatus}
                </span>
              </div>
              <div><strong>Verification Date:</strong> {selectedDoctor.verificationDate}</div>
              <div>
                <strong>Insurance Providers:</strong>
                <div style={{ marginTop: '5px' }}>
                  {selectedDoctor.insuranceProviders.map((provider, index) => (
                    <span key={index} style={{
                      display: 'inline-block',
                      padding: '4px 8px',
                      backgroundColor: '#e7f3ff',
                      borderRadius: '4px',
                      fontSize: '12px',
                      margin: '2px',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = '#0d6efd';
                      e.target.style.color = 'white';
                      e.target.style.transform = 'scale(1.05)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = '#e7f3ff';
                      e.target.style.color = 'inherit';
                      e.target.style.transform = 'scale(1)';
                    }}
                    >
                      {provider}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Enhanced Consultation Metrics */}
          <section style={{
            backgroundColor: 'white',
            padding: '25px',
            borderRadius: '10px',
            border: `1px solid ${accentColor}`,
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ color: primaryColor, marginBottom: '20px', fontSize: '20px' }}>C. Consultation & Practice Metrics</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '15px' }}>
              <div style={{ textAlign: 'center', padding: '20px', backgroundColor: accentColor, borderRadius: '8px', transition: 'all 0.3s ease', cursor: 'pointer' }}
                   onMouseEnter={(e) => {
                     e.currentTarget.style.backgroundColor = primaryColor;
                     e.currentTarget.style.transform = 'translateY(-5px)';
                     e.currentTarget.style.boxShadow = '0 8px 20px rgba(124, 42, 98, 0.3)';
                   }}
                   onMouseLeave={(e) => {
                     e.currentTarget.style.backgroundColor = accentColor;
                     e.currentTarget.style.transform = 'translateY(0)';
                     e.currentTarget.style.boxShadow = 'none';
                   }}>
                <div style={{ fontSize: '28px', fontWeight: 'bold', color: primaryColor, transition: 'all 0.3s ease' }}>{selectedDoctor.totalAppointments}</div>
                <div style={{ fontSize: '14px', color: '#666', transition: 'all 0.3s ease' }}>Total Appointments</div>
              </div>
              <div style={{ textAlign: 'center', padding: '20px', backgroundColor: '#fff3cd', borderRadius: '8px', transition: 'all 0.3s ease', cursor: 'pointer' }}
                   onMouseEnter={(e) => {
                     e.currentTarget.style.backgroundColor = '#ffc107';
                     e.currentTarget.style.transform = 'translateY(-5px)';
                     e.currentTarget.style.boxShadow = '0 8px 20px rgba(255, 193, 7, 0.3)';
                   }}
                   onMouseLeave={(e) => {
                     e.currentTarget.style.backgroundColor = '#fff3cd';
                     e.currentTarget.style.transform = 'translateY(0)';
                     e.currentTarget.style.boxShadow = 'none';
                   }}>
                <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#856404', transition: 'all 0.3s ease' }}>{selectedDoctor.cancelledAppointments}</div>
                <div style={{ fontSize: '14px', color: '#666', transition: 'all 0.3s ease' }}>Cancelled</div>
              </div>
              <div style={{ textAlign: 'center', padding: '20px', backgroundColor: '#f8d7da', borderRadius: '8px', transition: 'all 0.3s ease', cursor: 'pointer' }}
                   onMouseEnter={(e) => {
                     e.currentTarget.style.backgroundColor = '#dc3545';
                     e.currentTarget.style.transform = 'translateY(-5px)';
                     e.currentTarget.style.boxShadow = '0 8px 20px rgba(220, 53, 69, 0.3)';
                   }}
                   onMouseLeave={(e) => {
                     e.currentTarget.style.backgroundColor = '#f8d7da';
                     e.currentTarget.style.transform = 'translateY(0)';
                     e.currentTarget.style.boxShadow = 'none';
                   }}>
                <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#721c24', transition: 'all 0.3s ease' }}>{selectedDoctor.noShowAppointments}</div>
                <div style={{ fontSize: '14px', color: '#666', transition: 'all 0.3s ease' }}>No Shows</div>
              </div>
              <div style={{ textAlign: 'center', padding: '20px', backgroundColor: '#e2f0fb', borderRadius: '8px', transition: 'all 0.3s ease', cursor: 'pointer' }}
                   onMouseEnter={(e) => {
                     e.currentTarget.style.backgroundColor = '#0d6efd';
                     e.currentTarget.style.transform = 'translateY(-5px)';
                     e.currentTarget.style.boxShadow = '0 8px 20px rgba(13, 110, 253, 0.3)';
                   }}
                   onMouseLeave={(e) => {
                     e.currentTarget.style.backgroundColor = '#e2f0fb';
                     e.currentTarget.style.transform = 'translateY(0)';
                     e.currentTarget.style.boxShadow = 'none';
                   }}>
                <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#0d6efd', transition: 'all 0.3s ease' }}>{selectedDoctor.avgConsultationDuration}</div>
                <div style={{ fontSize: '14px', color: '#666', transition: 'all 0.3s ease' }}>Avg. Duration</div>
              </div>
              <div style={{ textAlign: 'center', padding: '20px', backgroundColor: '#d4edda', borderRadius: '8px', transition: 'all 0.3s ease', cursor: 'pointer' }}
                   onMouseEnter={(e) => {
                     e.currentTarget.style.backgroundColor = '#28a745';
                     e.currentTarget.style.transform = 'translateY(-5px)';
                     e.currentTarget.style.boxShadow = '0 8px 20px rgba(40, 167, 69, 0.3)';
                   }}
                   onMouseLeave={(e) => {
                     e.currentTarget.style.backgroundColor = '#d4edda';
                     e.currentTarget.style.transform = 'translateY(0)';
                     e.currentTarget.style.boxShadow = 'none';
                   }}>
                <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#155724', transition: 'all 0.3s ease' }}>{selectedDoctor.satisfactionRating}/5</div>
                <div style={{ fontSize: '14px', color: '#666', transition: 'all 0.3s ease' }}>Satisfaction Rating</div>
              </div>
              {metrics && (
                <>
                  <div style={{ textAlign: 'center', padding: '20px', backgroundColor: '#e2e3e5', borderRadius: '8px', transition: 'all 0.3s ease', cursor: 'pointer' }}
                       onMouseEnter={(e) => {
                         e.currentTarget.style.backgroundColor = '#6c757d';
                         e.currentTarget.style.transform = 'translateY(-5px)';
                         e.currentTarget.style.boxShadow = '0 8px 20px rgba(108, 117, 125, 0.3)';
                       }}
                       onMouseLeave={(e) => {
                         e.currentTarget.style.backgroundColor = '#e2e3e5';
                         e.currentTarget.style.transform = 'translateY(0)';
                         e.currentTarget.style.boxShadow = 'none';
                       }}>
                    <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#383d41', transition: 'all 0.3s ease' }}>{metrics.completionRate}%</div>
                    <div style={{ fontSize: '14px', color: '#666', transition: 'all 0.3s ease' }}>Completion Rate</div>
                  </div>
                  <div style={{ textAlign: 'center', padding: '20px', backgroundColor: '#d1ecf1', borderRadius: '8px', transition: 'all 0.3s ease', cursor: 'pointer' }}
                       onMouseEnter={(e) => {
                         e.currentTarget.style.backgroundColor = '#17a2b8';
                         e.currentTarget.style.transform = 'translateY(-5px)';
                         e.currentTarget.style.boxShadow = '0 8px 20px rgba(23, 162, 184, 0.3)';
                       }}
                       onMouseLeave={(e) => {
                         e.currentTarget.style.backgroundColor = '#d1ecf1';
                         e.currentTarget.style.transform = 'translateY(0)';
                         e.currentTarget.style.boxShadow = 'none';
                       }}>
                    <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#0c5460', transition: 'all 0.3s ease' }}>₹{(metrics.revenue / 100000).toFixed(1)}L</div>
                    <div style={{ fontSize: '14px', color: '#666', transition: 'all 0.3s ease' }}>Estimated Revenue</div>
                  </div>
                </>
              )}
            </div>
          </section>

          {/* Enhanced Practice Summary */}
          <section style={{
            backgroundColor: 'white',
            padding: '25px',
            borderRadius: '10px',
            border: `1px solid ${accentColor}`,
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ color: primaryColor, marginBottom: '20px', fontSize: '20px' }}>D. Practice Summary & Trends</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '25px' }}>
              <div>
                <TrendChart 
                  data={selectedDoctor.weeklyTrend} 
                  title="Weekly Appointments Trend" 
                  labels={['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']}
                />
              </div>
              <div>
                <TrendChart 
                  data={selectedDoctor.monthlyTrend.slice(0, 6)} 
                  title="Monthly Appointments Trend (Last 6 Months)" 
                  color="#28a745"
                  labels={['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']}
                />
              </div>
              <div>
                <TrendChart 
                  data={selectedDoctor.yearlyTrend} 
                  title="Yearly Growth Trend" 
                  color="#17a2b8"
                  labels={['2020', '2021', '2022', '2023']}
                />
              </div>
            </div>
          </section>

          {/* Enhanced Patient Feedback & Reviews */}
          <section style={{
            backgroundColor: 'white',
            padding: '25px',
            borderRadius: '10px',
            border: `1px solid ${accentColor}`,
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ color: primaryColor, margin: 0, fontSize: '20px' }}>E. Patient Feedback & Reviews</h3>
              <div style={{ fontSize: '16px', fontWeight: '600', color: primaryColor }}>
                Average Rating: {selectedDoctor.satisfactionRating}/5 ({selectedDoctor.feedback.length} reviews)
              </div>
            </div>
            
            <div style={{ maxHeight: showAllFeedback ? 'none' : '400px', overflow: 'hidden' }}>
              {displayedFeedback.map((review, index) => (
                <div key={review.id} style={{ 
                  padding: '15px', 
                  borderBottom: '1px solid #eee',
                  backgroundColor: index % 2 === 0 ? '#f8f9fa' : 'white',
                  borderRadius: '5px',
                  marginBottom: '10px',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = accentColor;
                  e.currentTarget.style.transform = 'translateX(5px)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = index % 2 === 0 ? '#f8f9fa' : 'white';
                  e.currentTarget.style.transform = 'translateX(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                    <strong style={{ fontSize: '15px' }}>{review.patient}</strong>
                    <div style={{ textAlign: 'right' }}>
                      <span style={{ color: '#666', fontSize: '13px' }}>{review.date}</span>
                      <div style={{ 
                        fontSize: '11px', 
                        padding: '2px 6px', 
                        backgroundColor: '#e9ecef', 
                        borderRadius: '10px',
                        marginTop: '2px',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = primaryColor;
                        e.target.style.color = 'white';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = '#e9ecef';
                        e.target.style.color = 'inherit';
                      }}
                      >
                        {review.appointmentType}
                      </div>
                    </div>
                  </div>
                  <div style={{ color: '#ffc107', fontSize: '16px', marginBottom: '8px' }}>
                    {'★'.repeat(review.rating)}{'☆'.repeat(5-review.rating)}
                    <span style={{ color: '#666', fontSize: '14px', marginLeft: '8px' }}>({review.rating}.0)</span>
                  </div>
                  <div style={{ fontSize: '14px', lineHeight: '1.5' }}>{review.comment}</div>
                </div>
              ))}
            </div>
            
            {selectedDoctor.feedback.length > 3 && (
              <button
                onClick={() => setShowAllFeedback(!showAllFeedback)}
                style={{
                  marginTop: '15px',
                  padding: '8px 16px',
                  backgroundColor: 'transparent',
                  color: primaryColor,
                  border: `1px solid ${primaryColor}`,
                  borderRadius: '5px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = primaryColor;
                  e.target.style.color = 'white';
                  e.target.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.color = primaryColor;
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                {showAllFeedback ? 'Show Less' : `Show All ${selectedDoctor.feedback.length} Reviews`}
              </button>
            )}
          </section>

          {/* Enhanced Prescription Records */}
          <section style={{
            backgroundColor: 'white',
            padding: '25px',
            borderRadius: '10px',
            border: `1px solid ${accentColor}`,
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ color: primaryColor, margin: 0, fontSize: '20px' }}>F. Prescription Records</h3>
              <div style={{ fontSize: '14px', color: '#666' }}>
                Total: {selectedDoctor.prescriptions.length} prescriptions
              </div>
            </div>
            
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ backgroundColor: accentColor }}>
                    <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #ddd', fontWeight: '600' }}>Date</th>
                    <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #ddd', fontWeight: '600' }}>Patient</th>
                    <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #ddd', fontWeight: '600' }}>Age</th>
                    <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #ddd', fontWeight: '600' }}>Diagnosis</th>
                    <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #ddd', fontWeight: '600' }}>Prescription</th>
                    <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #ddd', fontWeight: '600' }}>Follow-up</th>
                    <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #ddd', fontWeight: '600' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {displayedPrescriptions.map((prescription, index) => (
                    <tr key={prescription.id} style={{ 
                      backgroundColor: index % 2 === 0 ? '#f8f9fa' : 'white',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = accentColor;
                      e.currentTarget.style.transform = 'scale(1.01)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = index % 2 === 0 ? '#f8f9fa' : 'white';
                      e.currentTarget.style.transform = 'scale(1)';
                    }}
                    >
                      <td style={{ padding: '12px', border: '1px solid #ddd', fontSize: '14px' }}>{prescription.date}</td>
                      <td style={{ padding: '12px', border: '1px solid #ddd', fontSize: '14px', fontWeight: '500' }}>{prescription.patient}</td>
                      <td style={{ padding: '12px', border: '1px solid #ddd', fontSize: '14px' }}>{prescription.patientAge}</td>
                      <td style={{ padding: '12px', border: '1px solid #ddd', fontSize: '14px' }}>{prescription.diagnosis}</td>
                      <td style={{ padding: '12px', border: '1px solid #ddd', fontSize: '14px' }}>
                        <div style={{ maxWidth: '200px' }}>
                          {prescription.prescription}
                        </div>
                      </td>
                      <td style={{ padding: '12px', border: '1px solid #ddd', fontSize: '14px' }}>{prescription.followUpDate}</td>
                      <td style={{ padding: '12px', border: '1px solid #ddd' }}>
                        <span style={{
                          padding: '4px 8px',
                          borderRadius: '12px',
                          fontSize: '12px',
                          fontWeight: '600',
                          backgroundColor: prescription.status === 'Active' ? '#d4edda' : 
                                          prescription.status === 'Completed' ? '#e2e3e5' : '#fff3cd',
                          color: prescription.status === 'Active' ? '#155724' : 
                                prescription.status === 'Completed' ? '#383d41' : '#856404',
                          transition: 'all 0.3s ease',
                          cursor: 'pointer'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.transform = 'scale(1.1)';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.transform = 'scale(1)';
                        }}
                        >
                          {prescription.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {selectedDoctor.prescriptions.length > 3 && (
              <button
                onClick={() => setShowAllPrescriptions(!showAllPrescriptions)}
                style={{
                  marginTop: '15px',
                  padding: '8px 16px',
                  backgroundColor: 'transparent',
                  color: primaryColor,
                  border: `1px solid ${primaryColor}`,
                  borderRadius: '5px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = primaryColor;
                  e.target.style.color = 'white';
                  e.target.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.color = primaryColor;
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                {showAllPrescriptions ? 'Show Less' : `Show All ${selectedDoctor.prescriptions.length} Prescriptions`}
              </button>
            )}
          </section>

          {/* Additional Information */}
          <section style={{
            backgroundColor: 'white',
            padding: '25px',
            borderRadius: '10px',
            border: `1px solid ${accentColor}`,
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ color: primaryColor, marginBottom: '20px', fontSize: '20px' }}>G. Additional Information</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
              <div>
                <h4 style={{ color: primaryColor, marginBottom: '10px', fontSize: '16px' }}>Awards & Recognition</h4>
                <ul style={{ paddingLeft: '20px', margin: 0 }}>
                  {selectedDoctor.awards.map((award, index) => (
                    <li key={index} style={{ 
                      marginBottom: '8px', 
                      fontSize: '14px',
                      padding: '8px',
                      backgroundColor: '#f8f9fa',
                      borderRadius: '4px',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = accentColor;
                      e.target.style.transform = 'translateX(5px)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = '#f8f9fa';
                      e.target.style.transform = 'translateX(0)';
                    }}
                    >
                      {award}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 style={{ color: primaryColor, marginBottom: '10px', fontSize: '16px' }}>Publications & Research</h4>
                <div style={{ 
                  fontSize: '14px', 
                  lineHeight: '1.5',
                  padding: '15px',
                  backgroundColor: '#f8f9fa',
                  borderRadius: '6px',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = accentColor;
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#f8f9fa';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
                >
                  {selectedDoctor.publications}
                </div>
              </div>
            </div>
          </section>

          {/* Admin Actions */}
          <section style={{
            backgroundColor: 'white',
            padding: '25px',
            borderRadius: '10px',
            border: `1px solid ${accentColor}`,
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ color: primaryColor, marginBottom: '20px', fontSize: '20px' }}>Admin Actions</h3>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <button 
                onClick={() => handleActionConfirmation('approve')}
                disabled={selectedDoctor.status === 'Active'}
                style={{ 
                  padding: '12px 20px', 
                  backgroundColor: selectedDoctor.status === 'Active' ? '#6c757d' : '#28a745', 
                  color: 'white', 
                  border: 'none', 
                  borderRadius: '6px', 
                  cursor: selectedDoctor.status === 'Active' ? 'not-allowed' : 'pointer',
                  fontSize: '14px',
                  fontWeight: '600',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  if (selectedDoctor.status !== 'Active') {
                    e.target.style.backgroundColor = '#218838';
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 4px 12px rgba(40, 167, 69, 0.3)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedDoctor.status !== 'Active') {
                    e.target.style.backgroundColor = '#28a745';
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = 'none';
                  }
                }}
              >
                 Approve Doctor
              </button>
              <button 
                onClick={() => handleActionConfirmation('reset')}
                style={{ 
                  padding: '12px 20px', 
                  backgroundColor: '#ffc107', 
                  color: 'black', 
                  border: 'none', 
                  borderRadius: '6px', 
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '600',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#e0a800';
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 4px 12px rgba(255, 193, 7, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#ffc107';
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = 'none';
                }}
              >
                 Reset Doctor
              </button>
              <button 
                onClick={handleEdit}
                style={{ 
                  padding: '12px 20px', 
                  backgroundColor: primaryColor, 
                  color: 'white', 
                  border: 'none', 
                  borderRadius: '6px', 
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '600',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#5A1F4A';
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 4px 12px rgba(124, 42, 98, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = primaryColor;
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = 'none';
                }}
              >
                 Edit Profile
              </button>
              <button 
                onClick={() => handleActionConfirmation('suspend')}
                disabled={selectedDoctor.status === 'Suspended'}
                style={{ 
                  padding: '12px 20px', 
                  backgroundColor: selectedDoctor.status === 'Suspended' ? '#6c757d' : '#dc3545', 
                  color: 'white', 
                  border: 'none', 
                  borderRadius: '6px', 
                  cursor: selectedDoctor.status === 'Suspended' ? 'not-allowed' : 'pointer',
                  fontSize: '14px',
                  fontWeight: '600',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  if (selectedDoctor.status !== 'Suspended') {
                    e.target.style.backgroundColor = '#c82333';
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 4px 12px rgba(220, 53, 69, 0.3)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedDoctor.status !== 'Suspended') {
                    e.target.style.backgroundColor = '#dc3545';
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = 'none';
                  }
                }}
              >
                 Suspend Doctor
              </button>
              <button 
                onClick={() => handleActionConfirmation('reject')}
                style={{ 
                  padding: '12px 20px', 
                  backgroundColor: '#fd7e14', 
                  color: 'white', 
                  border: 'none', 
                  borderRadius: '6px', 
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '600',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#e96a10';
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 4px 12px rgba(253, 126, 20, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#fd7e14';
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = 'none';
                }}
              >
                 Reject Doctor
              </button>
            </div>
          </section>
        </div>
      )}

      {!selectedDoctor && searchQuery && !loading && (
        <div style={{ 
          textAlign: 'center', 
          padding: '60px', 
          color: '#666',
          backgroundColor: 'white',
          borderRadius: '10px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          transition: 'all 0.3s ease',
          cursor: 'pointer'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.02)';
          e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
        }}
        >
          <div style={{ fontSize: '48px', marginBottom: '20px', transition: 'all 0.3s ease' }}>🔍</div>
          <div style={{ fontSize: '18px', marginBottom: '10px' }}>No doctor found</div>
          <div>Please check your search criteria and try again</div>
        </div>
      )}
    </div>
  );
};

export default DoctorLookup;