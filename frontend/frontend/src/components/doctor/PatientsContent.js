import React, { useState } from 'react';

const PatientsContent = ({ dashboardData, state, actions }) => {
  const { patientSearch } = state;
  const { setPatientSearch, handleViewFullHistory, handleAddNotes } = actions;

  const isMobile = window.innerWidth <= 768;
  const isTablet = window.innerWidth <= 1024;

  // State for showing patient history in modal
  const [selectedPatientHistory, setSelectedPatientHistory] = useState(null);
  const [showHistoryModal, setShowHistoryModal] = useState(false);

  // Enhanced patient history data
  const getEnhancedPatientHistory = (patientName) => {
    const historyData = {
      'Sarah Johnson': [
        { 
          date: '2024-01-15', 
          diagnosis: 'Hypertension & Diabetes Management', 
          status: 'Completed', 
          prescription: 'Metformin 500mg, Lisinopril 10mg, Regular exercise',
          symptoms: 'Elevated BP (140/90), High blood sugar levels',
          tests: 'Blood Test, HbA1c - 7.2%',
          notes: 'Patient advised to reduce salt intake and monitor BP daily'
        },
        { 
          date: '2023-12-10', 
          diagnosis: 'Diabetes Follow-up', 
          status: 'Completed', 
          prescription: 'Metformin 500mg twice daily, Dietary modifications',
          symptoms: 'Stable blood sugar levels',
          tests: 'HbA1c - 6.8%',
          notes: 'Good progress with medication adherence'
        },
        { 
          date: '2023-11-05', 
          diagnosis: 'Hypertension Review', 
          status: 'Completed', 
          prescription: 'Lisinopril 10mg daily, Lifestyle changes',
          symptoms: 'Mild headaches, BP 135/85',
          tests: 'Complete Blood Count - Normal',
          notes: 'Recommended stress management techniques'
        },
        { 
          date: '2023-10-15', 
          diagnosis: 'Annual Physical Examination', 
          status: 'Completed', 
          prescription: 'Multivitamins, Calcium supplements',
          symptoms: 'General wellness check',
          tests: 'Lipid Profile, Liver Function Tests - All normal',
          notes: 'Patient in good overall health'
        }
      ],
      'Michael Chen': [
        { 
          date: '2024-01-15', 
          diagnosis: 'High Blood Pressure Management', 
          status: 'Completed', 
          prescription: 'Amlodipine 5mg, Regular monitoring',
          symptoms: 'BP readings 142/88, Occasional dizziness',
          tests: 'ECG - Normal, Kidney Function - Normal',
          notes: 'Advise to reduce caffeine intake'
        },
        { 
          date: '2023-12-12', 
          diagnosis: 'Routine Checkup', 
          status: 'Completed', 
          prescription: 'Continue current medication',
          symptoms: 'Stable condition',
          tests: 'Blood Pressure - 130/80',
          notes: 'Good response to medication'
        },
        { 
          date: '2023-11-08', 
          diagnosis: 'Cholesterol Management', 
          status: 'Completed', 
          prescription: 'Atorvastatin 20mg, Dietary changes',
          symptoms: 'High cholesterol levels',
          tests: 'Lipid Panel - Total Cholesterol 240 mg/dL',
          notes: 'Recommended Mediterranean diet'
        }
      ],
      'Emily Rodriguez': [
        { 
          date: '2024-01-15', 
          diagnosis: 'Chronic Back Pain Management', 
          status: 'Completed', 
          prescription: 'Ibuprofen 400mg as needed, Physical therapy',
          symptoms: 'Lower back pain radiating to legs',
          tests: 'X-Ray - Mild disc degeneration',
          notes: 'Referred to physiotherapy, advised core strengthening exercises'
        },
        { 
          date: '2023-12-20', 
          diagnosis: 'Back Pain Follow-up', 
          status: 'Completed', 
          prescription: 'Muscle relaxants, Continue physical therapy',
          symptoms: 'Improved mobility, reduced pain',
          tests: 'MRI - No significant changes',
          notes: 'Good progress with physical therapy'
        },
        { 
          date: '2023-11-25', 
          diagnosis: 'Initial Back Pain Consultation', 
          status: 'Completed', 
          prescription: 'Pain management, Rest advised',
          symptoms: 'Severe lower back pain',
          tests: 'X-Ray conducted',
          notes: 'Patient advised to avoid heavy lifting'
        }
      ],
      'Robert Williams': [
        { 
          date: '2024-01-15', 
          diagnosis: 'Diabetes Management Review', 
          status: 'Completed', 
          prescription: 'Insulin adjustment, Metformin 1000mg',
          symptoms: 'Blood sugar fluctuations',
          tests: 'HbA1c - 7.8%, Fasting Blood Sugar - 150 mg/dL',
          notes: 'Insulin dosage adjusted, dietary counseling provided'
        },
        { 
          date: '2023-12-18', 
          diagnosis: 'Diabetes Complications Screening', 
          status: 'Completed', 
          prescription: 'Continue current treatment',
          symptoms: 'Numbness in feet',
          tests: 'Diabetic Neuropathy Screening - Mild symptoms',
          notes: 'Referred to podiatrist for foot care'
        },
        { 
          date: '2023-11-12', 
          diagnosis: 'Regular Diabetes Checkup', 
          status: 'Completed', 
          prescription: 'Insulin, Oral medications',
          symptoms: 'Stable condition',
          tests: 'Blood Glucose Levels - Within target range',
          notes: 'Good diabetes control maintained'
        }
      ]
    };
    return historyData[patientName] || [];
  };

  const handleViewHistory = (patient) => {
    const history = getEnhancedPatientHistory(patient.name);
    setSelectedPatientHistory({ patient, history });
    setShowHistoryModal(true);
  };

  const PatientHistoryModal = () => {
    if (!showHistoryModal || !selectedPatientHistory) return null;

    const { patient, history } = selectedPatientHistory;

    return (
      <div style={styles.modalOverlay}>
        <div style={{
          ...styles.modal,
          width: isMobile ? '95%' : '90%',
          maxWidth: '800px',
          maxHeight: '90vh'
        }}>
          <div style={styles.modalHeader}>
            <h3 style={styles.modalTitle}>
              Medical History - {patient.name}
            </h3>
            <button 
              style={styles.closeButton}
              onClick={() => setShowHistoryModal(false)}
            >
              ✕
            </button>
          </div>

          <div style={styles.modalContent}>
            <div style={styles.patientOverview}>
              <div style={styles.profileIconLarge}>👤</div>
              <div style={styles.patientBasicInfo}>
                <h4 style={styles.patientName}>{patient.name}</h4>
                <div style={styles.patientDetailsGrid}>
                  <div style={styles.detailItem}>
                    <span style={styles.detailLabel}>Age:</span>
                    <span style={styles.detailValue}>{patient.age}</span>
                  </div>
                  <div style={styles.detailItem}>
                    <span style={styles.detailLabel}>Blood Group:</span>
                    <span style={styles.detailValue}>{patient.bloodGroup}</span>
                  </div>
                  <div style={styles.detailItem}>
                    <span style={styles.detailLabel}>Last Visit:</span>
                    <span style={styles.detailValue}>{patient.lastVisit}</span>
                  </div>
                  <div style={styles.detailItem}>
                    <span style={styles.detailLabel}>Total Visits:</span>
                    <span style={styles.detailValue}>{patient.totalVisits}</span>
                  </div>
                </div>
              </div>
            </div>

            <div style={styles.medicalConditions}>
              <h4 style={styles.sectionTitle}>Medical Conditions</h4>
              <div style={styles.conditionsList}>
                {patient.conditions.map((condition, index) => (
                  <span key={index} style={styles.conditionTag}>
                    {condition}
                  </span>
                ))}
              </div>
            </div>

            <div style={styles.medicalHistory}>
              <h4 style={styles.sectionTitle}>Consultation History ({history.length} records)</h4>
              <div style={styles.historyList}>
                {history.map((record, index) => (
                  <div key={index} style={styles.historyItem}>
                    <div style={styles.historyHeader}>
                      <strong style={styles.historyDate}>{record.date}</strong>
                      <span style={styles.historyStatus}>Completed</span>
                    </div>
                    <div style={styles.historyDetails}>
                      <p style={styles.historyDiagnosis}>
                        <strong>Diagnosis:</strong> {record.diagnosis}
                      </p>
                      <p style={styles.historySymptoms}>
                        <strong>Symptoms:</strong> {record.symptoms}
                      </p>
                      <p style={styles.historyTests}>
                        <strong>Tests:</strong> {record.tests}
                      </p>
                      <p style={styles.historyPrescription}>
                        <strong>Prescription:</strong> {record.prescription}
                      </p>
                      <p style={styles.historyNotes}>
                        <strong>Doctor Notes:</strong> {record.notes}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {history.length === 0 && (
              <div style={styles.noHistory}>
                <p>No medical history records found for this patient.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const filteredPatients = dashboardData.patients.filter(patient =>
    patient.name.toLowerCase().includes(patientSearch.toLowerCase()) ||
    patient.conditions.some(condition => 
      condition.toLowerCase().includes(patientSearch.toLowerCase())
    )
  );

  const PatientCard = ({ patient }) => (
    <div style={styles.patientCard}>
      <div style={styles.patientHeader}>
        <div style={styles.profileIconLarge}>👤</div>
        <div style={styles.patientBasicInfo}>
          <h3 style={styles.patientName}>{patient.name}</h3>
          <p style={styles.patientContact}>{patient.phone}</p>
          <p style={styles.patientEmail}>{patient.email}</p>
        </div>
      </div>

      <div style={styles.patientDetails}>
        <div style={styles.detailRow}>
          <span style={styles.detailLabel}>Last Visit:</span>
          <span style={styles.detailValue}>{patient.lastVisit}</span>
        </div>
        <div style={styles.detailRow}>
          <span style={styles.detailLabel}>Total Visits:</span>
          <span style={styles.detailValue}>{patient.totalVisits}</span>
        </div>
        <div style={styles.detailRow}>
          <span style={styles.detailLabel}>Blood Group:</span>
          <span style={styles.detailValue}>{patient.bloodGroup}</span>
        </div>
      </div>

      <div style={styles.conditionsSection}>
        <strong style={styles.conditionsLabel}>Medical Conditions:</strong>
        <div style={styles.conditionsList}>
          {patient.conditions.map((condition, index) => (
            <span key={index} style={styles.conditionTag}>
              {condition}
            </span>
          ))}
        </div>
      </div>

      <div style={styles.patientActions}>
        <button 
          style={styles.viewHistoryButton}
          onClick={() => handleViewHistory(patient)}
        >
          View History
        </button>
        <button 
          style={styles.addNotesButton}
          onClick={() => handleAddNotes(patient.name)}
        >
          Add Notes
        </button>
      </div>
    </div>
  );

  return (
    <div style={styles.mainContent}>
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <h1 style={styles.greeting}>Patients</h1>
          <p style={styles.subtitle}>Access patient history and medical records</p>
        </div>
        <div style={styles.searchBox}>
          <input
            type="text"
            placeholder="Search patients by name or condition..."
            value={patientSearch}
            onChange={(e) => setPatientSearch(e.target.value)}
            style={styles.searchInput}
          />
        </div>
      </div>

      <div style={{
        ...styles.patientsGrid,
        gridTemplateColumns: isMobile ? '1fr' : isTablet ? '1fr 1fr' : 'repeat(auto-fill, minmax(350px, 1fr))'
      }}>
        {filteredPatients.map(patient => (
          <PatientCard key={patient.id} patient={patient} />
        ))}
      </div>

      <PatientHistoryModal />
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
    flexWrap: 'nowrap',
    gap: '20px'
  },
  headerLeft: {
    textAlign: 'left',
    flex: '1 1 auto',
    minWidth: '200px'
  },
  greeting: {
    fontSize: 'clamp(20px, 4vw, 28px)',
    fontWeight: '700',
    color: '#1f2937',
    margin: '0 0 8px 0',
    textAlign: 'left',
    lineHeight: '1.2'
  },
  subtitle: {
    fontSize: 'clamp(14px, 2vw, 16px)',
    color: '#6b7280',
    margin: 0,
    textAlign: 'left',
    lineHeight: '1.4'
  },
  searchBox: {
    flex: '0 0 auto',
    alignSelf: 'flex-start',
    marginBottom: '0'
  },
  searchInput: {
    padding: '12px 16px',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    fontSize: '14px',
    width: 'clamp(250px, 100%, 300px)',
    outline: 'none',
    minWidth: '250px'
  },
  patientsGrid: {
    display: 'grid',
    gap: '20px',
    textAlign: 'left'
  },
  patientCard: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    border: '1px solid #e5e7eb',
    textAlign: 'left'
  },
  patientHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    marginBottom: '16px',
    textAlign: 'left'
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
  patientBasicInfo: {
    flex: 1,
    textAlign: 'left'
  },
  patientName: {
    fontSize: 'clamp(16px, 2.5vw, 18px)',
    fontWeight: '600',
    color: '#1f2937',
    margin: '0 0 4px 0',
    textAlign: 'left'
  },
  patientContact: {
    fontSize: '14px',
    color: '#6b7280',
    margin: '4px 0',
    textAlign: 'left'
  },
  patientEmail: {
    fontSize: '12px',
    color: '#9CA3AF',
    margin: 0,
    textAlign: 'left'
  },
  patientDetails: {
    marginBottom: '16px',
    textAlign: 'left'
  },
  detailRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '8px',
    textAlign: 'left'
  },
  detailLabel: {
    fontSize: '14px',
    color: '#6b7280',
    fontWeight: '500',
    textAlign: 'left'
  },
  detailValue: {
    fontSize: '14px',
    color: '#1f2937',
    fontWeight: '600',
    textAlign: 'right'
  },
  conditionsSection: {
    marginBottom: '16px',
    textAlign: 'left'
  },
  conditionsLabel: {
    fontSize: '14px',
    color: '#6b7280',
    marginBottom: '8px',
    display: 'block',
    textAlign: 'left'
  },
  conditionsList: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '6px',
    textAlign: 'left'
  },
  conditionTag: {
    backgroundColor: '#F7D9EB',
    color: '#7C2A62',
    padding: '4px 8px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: '500'
  },
  patientActions: {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap',
    textAlign: 'left'
  },
  viewHistoryButton: {
    backgroundColor: '#7C2A62',
    color: 'white',
    border: 'none',
    padding: '8px 12px',
    borderRadius: '8px',
    fontSize: '13px',
    fontWeight: '600',
    cursor: 'pointer',
    flex: 1,
    minWidth: '90px'
  },
  addNotesButton: {
    backgroundColor: 'transparent',
    color: '#7C2A62',
    border: '2px solid #7C2A62',
    padding: '8px 12px',
    borderRadius: '8px',
    fontSize: '13px',
    fontWeight: '600',
    cursor: 'pointer',
    flex: 1,
    minWidth: '80px'
  },
  // Modal Styles
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: '20px'
  },
  modal: {
    backgroundColor: 'white',
    borderRadius: '12px',
    maxHeight: '90vh',
    overflow: 'auto',
    boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)'
  },
  modalHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px',
    borderBottom: '1px solid #e5e7eb',
    position: 'sticky',
    top: 0,
    backgroundColor: 'white',
    zIndex: 10
  },
  modalTitle: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#1f2937',
    margin: 0
  },
  closeButton: {
    background: 'none',
    border: 'none',
    fontSize: '20px',
    cursor: 'pointer',
    color: '#6b7280'
  },
  modalContent: {
    padding: '20px'
  },
  patientOverview: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '20px',
    marginBottom: '24px',
    padding: '16px',
    backgroundColor: '#f8fafc',
    borderRadius: '8px'
  },
  patientDetailsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '12px'
  },
  medicalConditions: {
    marginBottom: '24px'
  },
  sectionTitle: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#1f2937',
    margin: '0 0 12px 0'
  },
  medicalHistory: {
    marginBottom: '24px'
  },
  historyList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  historyItem: {
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    padding: '16px'
  },
  historyHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '8px',
    flexWrap: 'wrap',
    gap: '8px'
  },
  historyDate: {
    fontSize: '14px',
    color: '#1f2937'
  },
  historyStatus: {
    backgroundColor: '#10B981',
    color: 'white',
    padding: '4px 8px',
    borderRadius: '12px',
    fontSize: '11px',
    fontWeight: '500'
  },
  historyDetails: {
    fontSize: '14px',
    color: '#6b7280'
  },
  historyDiagnosis: {
    margin: '0 0 4px 0'
  },
  historySymptoms: {
    margin: '0 0 4px 0'
  },
  historyTests: {
    margin: '0 0 4px 0'
  },
  historyPrescription: {
    margin: '0 0 4px 0'
  },
  historyNotes: {
    margin: 0,
    fontStyle: 'italic'
  },
  noHistory: {
    textAlign: 'center',
    padding: '40px',
    color: '#6b7280'
  }
};

export default PatientsContent;