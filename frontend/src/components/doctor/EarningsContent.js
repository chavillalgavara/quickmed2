import React, { useState } from 'react';

const EarningsContent = ({ dashboardData, state, actions }) => {
  const { earningFilter } = state;
  const { setEarningFilter } = actions;

  const isMobile = window.innerWidth <= 768;

  // Enhanced earnings data with patient-wise breakdown
  const [detailedEarnings, setDetailedEarnings] = useState({
    '2024-01-15': [
      { patientName: 'Sarah Johnson', amount: 400, service: 'Regular Checkup', time: '10:30 AM' },
      { patientName: 'Michael Chen', amount: 400, service: 'BP Follow-up', time: '11:15 AM' },
      { patientName: 'Emily Rodriguez', amount: 400, service: 'Chronic Pain Consultation', time: '2:00 PM' },
      { patientName: 'Robert Williams', amount: 400, service: 'Diabetes Review', time: '3:30 PM' },
      { patientName: 'Amit Patel', amount: 400, service: 'Fever Consultation', time: '4:15 PM' },
      { patientName: 'Priya Sharma', amount: 400, service: 'Pregnancy Checkup', time: '5:00 PM' }
    ],
    '2024-01-14': [
      { patientName: 'Lisa Thompson', amount: 400, service: 'Physical Examination', time: '9:30 AM' },
      { patientName: 'David Miller', amount: 600, service: 'Cardiac Consultation', time: '10:45 AM' },
      { patientName: 'Rahul Verma', amount: 400, service: 'General Checkup', time: '11:30 AM' },
      { patientName: 'Sunita Reddy', amount: 400, service: 'Thyroid Review', time: '2:15 PM' },
      { patientName: 'Ankit Joshi', amount: 400, service: 'Skin Allergy', time: '3:30 PM' },
      { patientName: 'Neha Kapoor', amount: 500, service: 'Gynecology Consultation', time: '4:45 PM' },
      { patientName: 'Vikram Singh', amount: 400, service: 'Fever & Cold', time: '5:30 PM' },
      { patientName: 'Pooja Mehta', amount: 400, service: 'Child Vaccination', time: '6:15 PM' }
    ],
    '2024-01-13': [
      { patientName: 'Rajesh Kumar', amount: 400, service: 'Health Checkup', time: '10:00 AM' },
      { patientName: 'Sneha Gupta', amount: 400, service: 'ENT Consultation', time: '11:00 AM' },
      { patientName: 'Arun Mishra', amount: 400, service: 'Joint Pain', time: '2:30 PM' },
      { patientName: 'Meera Nair', amount: 400, service: 'Pregnancy Follow-up', time: '3:45 PM' },
      { patientName: 'Karan Malhotra', amount: 600, service: 'Surgical Follow-up', time: '4:30 PM' },
      { patientName: 'Anjali Desai', amount: 400, service: 'Migraine Treatment', time: '5:15 PM' },
      { patientName: 'Sanjay Rao', amount: 400, service: 'Diabetes Management', time: '6:00 PM' }
    ],
    '2024-01-12': [
      { patientName: 'Rohit Sharma', amount: 400, service: 'Sports Injury', time: '9:00 AM' },
      { patientName: 'Nisha Patel', amount: 400, service: 'Asthma Review', time: '10:15 AM' },
      { patientName: 'Deepak Jain', amount: 400, service: 'Hypertension', time: '11:30 AM' },
      { patientName: 'Swati Menon', amount: 500, service: 'Women\'s Health', time: '2:00 PM' },
      { patientName: 'Vishal Reddy', amount: 400, service: 'Gastric Issues', time: '3:15 PM' },
      { patientName: 'Madhuri Iyer', amount: 400, service: 'Arthritis Pain', time: '4:30 PM' },
      { patientName: 'Gaurav Saxena', amount: 400, service: 'ENT Checkup', time: '5:15 PM' },
      { patientName: 'Kavita Choudhary', amount: 400, service: 'Thyroid Test Review', time: '6:00 PM' },
      { patientName: 'Ramesh Nair', amount: 600, service: 'Cardiac Review', time: '6:45 PM' }
    ]
  });

  const [selectedDate, setSelectedDate] = useState(null);

  const formatIndianCurrency = (amount) => {
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  const getEarningsData = () => {
    switch (earningFilter) {
      case 'daily':
        return {
          total: 2400,
          consultations: 6,
          average: 400,
          history: dashboardData.earningsHistory.daily
        };
      case 'weekly':
        return {
          total: 15200,
          consultations: 38,
          average: 400,
          history: dashboardData.earningsHistory.weekly
        };
      case 'monthly':
        return {
          total: 56800,
          consultations: 142,
          average: 400,
          history: dashboardData.earningsHistory.monthly
        };
      default:
        return {
          total: 2400,
          consultations: 6,
          average: 400,
          history: dashboardData.earningsHistory.daily
        };
    }
  };

  const earningsData = getEarningsData();

  const handleDateClick = (date) => {
    setSelectedDate(selectedDate === date ? null : date);
  };

  const EarningsDetailModal = ({ date, onClose }) => {
    if (!date) return null;

    const dayEarnings = detailedEarnings[date] || [];
    const totalForDay = dayEarnings.reduce((sum, item) => sum + item.amount, 0);

    return (
      <div style={styles.modalOverlay}>
        <div style={styles.modal}>
          <div style={styles.modalHeader}>
            <h3 style={styles.modalTitle}>
              Earnings Details - {new Date(date).toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </h3>
            <button style={styles.closeButton} onClick={onClose}>✕</button>
          </div>
          <div style={styles.modalContent}>
            <div style={styles.daySummary}>
              <div style={styles.summaryCard}>
                <span style={styles.summaryAmount}>{formatIndianCurrency(totalForDay)}</span>
                <span style={styles.summaryLabel}>Total Earnings</span>
              </div>
              <div style={styles.summaryCard}>
                <span style={styles.summaryAmount}>{dayEarnings.length}</span>
                <span style={styles.summaryLabel}>Consultations</span>
              </div>
              <div style={styles.summaryCard}>
                <span style={styles.summaryAmount}>{formatIndianCurrency(totalForDay / dayEarnings.length)}</span>
                <span style={styles.summaryLabel}>Average per Consultation</span>
              </div>
            </div>

            <div style={styles.patientsList}>
              <h4 style={styles.listTitle}>Patient-wise Breakdown</h4>
              {dayEarnings.map((item, index) => (
                <div key={index} style={styles.patientEarningItem}>
                  <div style={styles.patientInfo}>
                    <div style={styles.patientAvatar}>👤</div>
                    <div style={styles.patientDetails}>
                      <strong style={styles.patientName}>{item.patientName}</strong>
                      <span style={styles.serviceType}>{item.service}</span>
                      <span style={styles.consultationTime}>{item.time}</span>
                    </div>
                  </div>
                  <div style={styles.earningAmount}>
                    {formatIndianCurrency(item.amount)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div style={styles.mainContent}>
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <h1 style={styles.greeting}>Earnings</h1>
          <p style={styles.subtitle}>Consultation fee logs and payouts overview</p>
        </div>
        {!isMobile && (
          <div style={styles.earningFilters}>
            <button
              style={{
                ...styles.earningFilter,
                ...(earningFilter === 'daily' && styles.earningFilterActive)
              }}
              onClick={() => setEarningFilter('daily')}
            >
              Daily
            </button>
            <button
              style={{
                ...styles.earningFilter,
                ...(earningFilter === 'weekly' && styles.earningFilterActive)
              }}
              onClick={() => setEarningFilter('weekly')}
            >
              Weekly
            </button>
            <button
              style={{
                ...styles.earningFilter,
                ...(earningFilter === 'monthly' && styles.earningFilterActive)
              }}
              onClick={() => setEarningFilter('monthly')}
            >
              Monthly
            </button>
          </div>
        )}
      </div>

      {/* Mobile Filter */}
      {isMobile && (
        <div style={styles.mobileFilter}>
          <select 
            value={earningFilter}
            onChange={(e) => setEarningFilter(e.target.value)}
            style={styles.mobileFilterSelect}
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>
      )}

      <div style={styles.earningsSummary}>
        <div style={{
          ...styles.earningStats,
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
          gap: isMobile ? '15px' : '20px'
        }}>
          <div style={styles.earningStat}>
            <h3 style={styles.earningAmount}>
              {formatIndianCurrency(earningsData.total)}
            </h3>
            <p style={styles.earningLabel}>Total Earnings</p>
          </div>
          <div style={styles.earningStat}>
            <h3 style={styles.earningAmount}>
              {earningsData.consultations}
            </h3>
            <p style={styles.earningLabel}>Consultations</p>
          </div>
          <div style={styles.earningStat}>
            <h3 style={styles.earningAmount}>
              {formatIndianCurrency(earningsData.average)}
            </h3>
            <p style={styles.earningLabel}>Average per Consultation</p>
          </div>
        </div>
      </div>

      <div style={styles.earningsHistory}>
        <h3 style={styles.sectionTitle}>Earnings History</h3>
        <p style={styles.sectionSubtitle}>Click on any date to view detailed patient-wise earnings</p>
        <div style={styles.earningsList}>
          {earningsData.history.map((earning, index) => (
            <div key={index} style={styles.earningItem}>
              <div 
                style={styles.earningDate}
                onClick={() => handleDateClick(earning.date)}
              >
                <strong style={styles.earningDateText}>{earning.date || earning.week || earning.month}</strong>
                <span style={styles.earningConsultations}>{earning.consultations} consultations</span>
                <span style={styles.clickHint}>Click to view details →</span>
              </div>
              <div style={styles.earningAmountItem}>
                {formatIndianCurrency(earning.amount)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Earnings Detail Modal */}
      <EarningsDetailModal 
        date={selectedDate} 
        onClose={() => setSelectedDate(null)} 
      />
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
  earningFilters: {
    display: 'flex',
    gap: '8px',
    backgroundColor: 'white',
    padding: '4px',
    borderRadius: '8px',
    border: '1px solid #e5e7eb'
  },
  mobileFilter: {
    marginBottom: '20px'
  },
  mobileFilterSelect: {
    width: '100%',
    padding: '12px',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    fontSize: '16px'
  },
  earningFilter: {
    padding: '8px 16px',
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500'
  },
  earningFilterActive: {
    backgroundColor: '#7C2A62',
    color: 'white'
  },
  earningsSummary: {
    backgroundColor: 'white',
    padding: '24px',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    marginBottom: '24px',
    textAlign: 'left'
  },
  earningStats: {
    display: 'grid',
    textAlign: 'left'
  },
  earningStat: {
    textAlign: 'left'
  },
  earningAmount: {
    fontSize: 'clamp(20px, 3vw, 24px)',
    fontWeight: '700',
    color: '#7C2A62',
    margin: '0 0 8px 0',
    textAlign: 'left'
  },
  earningLabel: {
    fontSize: '14px',
    color: '#6b7280',
    margin: 0,
    textAlign: 'left'
  },
  earningsHistory: {
    backgroundColor: 'white',
    padding: '24px',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    textAlign: 'left'
  },
  sectionTitle: {
    fontSize: 'clamp(18px, 2.5vw, 20px)',
    fontWeight: '600',
    color: '#1f2937',
    margin: '0 0 8px 0',
    textAlign: 'left'
  },
  sectionSubtitle: {
    fontSize: '14px',
    color: '#6b7280',
    margin: '0 0 20px 0',
    textAlign: 'left'
  },
  earningsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    textAlign: 'left'
  },
  earningItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    textAlign: 'left',
    flexWrap: 'wrap',
    gap: '10px',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  },
  earningDate: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    textAlign: 'left',
    flex: 1,
    cursor: 'pointer'
  },
  earningDateText: {
    textAlign: 'left',
    fontSize: '16px',
    color: '#1f2937'
  },
  earningConsultations: {
    textAlign: 'left',
    fontSize: '14px',
    color: '#6b7280'
  },
  clickHint: {
    textAlign: 'left',
    fontSize: '12px',
    color: '#7C2A62',
    fontWeight: '500'
  },
  earningAmountItem: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#7C2A62',
    textAlign: 'right'
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
    maxWidth: '600px',
    width: '100%',
    maxHeight: '80vh',
    overflow: 'auto',
    boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)'
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
  daySummary: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: '15px',
    marginBottom: '24px'
  },
  summaryCard: {
    backgroundColor: '#f8fafc',
    padding: '16px',
    borderRadius: '8px',
    textAlign: 'center',
    border: '1px solid #e5e7eb'
  },
  summaryAmount: {
    fontSize: '18px',
    fontWeight: '700',
    color: '#7C2A62',
    display: 'block',
    marginBottom: '4px'
  },
  summaryLabel: {
    fontSize: '12px',
    color: '#6b7280'
  },
  patientsList: {
    marginTop: '20px'
  },
  listTitle: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#1f2937',
    margin: '0 0 16px 0'
  },
  patientEarningItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    marginBottom: '8px'
  },
  patientInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    flex: 1
  },
  patientAvatar: {
    fontSize: '20px',
    flexShrink: 0
  },
  patientDetails: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px'
  },
  patientName: {
    fontSize: '14px',
    color: '#1f2937'
  },
  serviceType: {
    fontSize: '12px',
    color: '#6b7280'
  },
  consultationTime: {
    fontSize: '11px',
    color: '#9CA3AF'
  },
  earningAmount: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#7C2A62',
    flexShrink: 0
  }
};

export default EarningsContent;