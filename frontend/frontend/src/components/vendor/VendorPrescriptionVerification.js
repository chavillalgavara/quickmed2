import React from 'react';

const VendorPrescriptionVerification = ({
  selectedPrescription,
  prescriptions,
  setShowNotificationsBellModal,
  notifications,
  setSelectedPrescription,
  approvePrescription,
  rejectPrescription,
  messageDoctor
}) => {
  const mainContentStyle = {
    padding: '24px',
    minHeight: '100vh',
    '@media (max-width: 768px)': {
      padding: '16px'
    }
  };

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '30px',
    '@media (max-width: 768px)': {
      flexDirection: 'column',
      gap: '15px'
    }
  };

  const headerActionsStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    '@media (max-width: 768px)': {
      width: '100%',
      justifyContent: 'space-between'
    }
  };

  const notificationBellStyle = {
    position: 'relative',
    backgroundColor: 'white',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    padding: '10px 12px',
    fontSize: '18px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  };

  const notificationBadgeStyle = {
    position: 'absolute',
    top: '-5px',
    right: '-5px',
    backgroundColor: '#EF4444',
    color: 'white',
    borderRadius: '50%',
    width: '18px',
    height: '18px',
    fontSize: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '600'
  };

  const greetingStyle = {
    fontSize: '28px',
    fontWeight: '700',
    color: '#1f2937',
    margin: '0 0 8px 0',
    '@media (max-width: 768px)': {
      fontSize: '24px'
    }
  };

  const subtitleStyle = {
    fontSize: '16px',
    color: '#6b7280',
    margin: 0,
    '@media (max-width: 768px)': {
      fontSize: '14px'
    }
  };

  const realtimeIndicatorStyle = {
    color: '#10B981',
    fontWeight: '600'
  };

  const prescriptionStatsStyle = {
    display: 'flex',
    alignItems: 'center'
  };

  const pendingCountStyle = {
    backgroundColor: '#FEF3C7',
    color: '#D97706',
    padding: '8px 16px',
    borderRadius: '20px',
    fontSize: '14px',
    fontWeight: '600'
  };

  const contentGridStyle = {
    display: 'grid',
    gridTemplateColumns: selectedPrescription ? '1fr 1fr' : '1fr',
    gap: '24px',
    transition: 'grid-template-columns 0.3s ease',
    '@media (max-width: 1024px)': {
      gridTemplateColumns: '1fr'
    }
  };

  const sectionStyle = {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '24px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    border: '1px solid #e5e7eb'
  };

  const sectionHeaderStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px'
  };

  const sectionTitleStyle = {
    fontSize: '20px',
    fontWeight: '600',
    color: '#1f2937',
    margin: 0
  };

  const viewAllStyle = {
    fontSize: '14px',
    color: '#7C2A62',
    fontWeight: '500',
    cursor: 'pointer'
  };

  const prescriptionsListStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  };

  const prescriptionCardStyle = {
    padding: '16px',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    flexDirection: 'column'
  };

  const prescriptionCardSelectedStyle = {
    borderColor: '#7C2A62',
    backgroundColor: '#F7D9EB'
  };

  const prescriptionApprovedStyle = {
    borderColor: '#10B981',
    backgroundColor: '#F0FDF4'
  };

  const prescriptionRejectedStyle = {
    borderColor: '#EF4444',
    backgroundColor: '#FEF2F2'
  };

  const prescriptionHeaderStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '12px'
  };

  const prescriptionInfoStyle = {
    flex: 1
  };

  const orderIdStyle = {
    fontSize: '14px',
    fontWeight: '600',
    color: '#1f2937',
    margin: '0 0 4px 0'
  };

  const customerNameStyle = {
    fontSize: '14px',
    color: '#6b7280',
    margin: '0 0 2px 0'
  };

  const doctorNameStyle = {
    fontSize: '12px',
    color: '#6b7280',
    margin: '2px 0 0 0'
  };

  const prescriptionMetaStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: '4px'
  };

  const uploadTimeStyle = {
    fontSize: '12px',
    color: '#6b7280'
  };

  const statusTimeStyle = {
    fontSize: '11px',
    color: '#6b7280',
    fontStyle: 'italic'
  };

  const medicinesListStyle = {
    marginBottom: '12px'
  };

  const medicineTagsStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '6px',
    marginTop: '4px',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: '100%'
  };

  const medicineTagStyle = {
    backgroundColor: '#F7D9EB',
    color: '#7C2A62',
    padding: '4px 8px',
    borderRadius: '6px',
    fontSize: '11px',
    fontWeight: '500',
    whiteSpace: 'nowrap',
    display: 'inline-block',
    margin: '0',
    lineHeight: '1.2'
  };

  const prescriptionStatusStyle = {
    textAlign: 'left',
    marginTop: '8px'
  };

  const statusBadgeStyle = {
    backgroundColor: '#F59E0B',
    color: 'white',
    padding: '4px 8px',
    borderRadius: '8px',
    fontSize: '10px',
    fontWeight: '500'
  };

  const statusApprovedStyle = {
    backgroundColor: '#10B981',
    color: 'white'
  };

  const statusRejectedStyle = {
    backgroundColor: '#EF4444',
    color: 'white'
  };

  const prescriptionViewerStyle = {
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    border: '1px solid #e5e7eb',
    height: 'fit-content'
  };

  const viewerHeaderStyle = {
    padding: '20px',
    borderBottom: '1px solid #e5e7eb'
  };

  const viewerTitleStyle = {
    fontSize: '18px',
    fontWeight: '600',
    color: '#1f2937',
    margin: '0 0 12px 0'
  };

  const prescriptionInfoDetailedStyle = {
    fontSize: '14px',
    color: '#6b7280'
  };

  const statusTextStyle = {
    padding: '4px 8px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: '500',
    marginLeft: '8px'
  };

  const viewerContentStyle = {
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  };

  const prescriptionImageStyle = {
    flex: 1
  };

  const prescriptionImgStyle = {
    width: '100%',
    height: '300px',
    objectFit: 'contain',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    backgroundColor: '#f8fafc'
  };

  const imageControlsStyle = {
    display: 'flex',
    gap: '8px',
    marginTop: '8px',
    flexWrap: 'wrap'
  };

  const smallButtonStyle = {
    backgroundColor: '#7C2A62',
    color: 'white',
    border: 'none',
    padding: '6px 12px',
    borderRadius: '4px',
    fontSize: '12px',
    fontWeight: '500',
    cursor: 'pointer',
    marginRight: '8px'
  };

  const extractedMedicinesStyle = {
    flex: 1
  };

  const medicinesTitleStyle = {
    fontSize: '16px',
    fontWeight: '600',
    margin: '0 0 12px 0'
  };

  const medicineListStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  };

  const medicineItemStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  };

  const checkboxStyle = {
    margin: 0
  };

  const verificationActionsStyle = {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap'
  };

  const successButtonStyle = {
    backgroundColor: '#10B981',
    color: 'white',
    border: 'none',
    padding: '12px 20px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer'
  };

  const dangerButtonStyle = {
    backgroundColor: '#EF4444',
    color: 'white',
    border: 'none',
    padding: '12px 20px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer'
  };

  const secondaryButtonStyle = {
    backgroundColor: 'transparent',
    color: '#7C2A62',
    border: '2px solid #7C2A62',
    padding: '10px 18px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  };

  const verificationResultStyle = {
    textAlign: 'center',
    padding: '20px'
  };

  const resultTextStyle = {
    marginBottom: '16px',
    color: '#6b7280',
    fontSize: '14px'
  };

  return (
    <div style={mainContentStyle}>
      <div style={headerStyle}>
        <div>
          <h1 style={greetingStyle}>Prescription Verification</h1>
          <p style={subtitleStyle}>
            Validate prescription-required medicines • Real-time updates active
            {prescriptions.filter(p => p.status === 'pending').length > 0 && (
              <span style={realtimeIndicatorStyle}> • Live</span>
            )}
          </p>
        </div>
        <div style={headerActionsStyle}>
          <button 
            style={notificationBellStyle}
            onClick={() => setShowNotificationsBellModal(true)}
          >
            🔔
            {notifications.length > 0 && (
              <span style={notificationBadgeStyle}>
                {notifications.length}
              </span>
            )}
          </button>
          <div style={prescriptionStatsStyle}>
            <span style={pendingCountStyle}>
              {prescriptions.filter(p => p.status === 'pending').length} Pending
            </span>
          </div>
        </div>
      </div>

      <div style={contentGridStyle}>
        <div style={sectionStyle}>
          <div style={sectionHeaderStyle}>
            <h2 style={sectionTitleStyle}>Pending Verifications</h2>
            <span style={viewAllStyle}>
              {prescriptions.length} prescriptions
            </span>
          </div>

          <div style={prescriptionsListStyle}>
            {prescriptions.map(prescription => (
              <div 
                key={prescription.id}
                style={{
                  ...prescriptionCardStyle,
                  ...(selectedPrescription?.id === prescription.id ? prescriptionCardSelectedStyle : {}),
                  ...(prescription.status === 'approved' ? prescriptionApprovedStyle : {}),
                  ...(prescription.status === 'rejected' ? prescriptionRejectedStyle : {})
                }}
                onClick={() => setSelectedPrescription(prescription)}
              >
                <div style={prescriptionHeaderStyle}>
                  <div style={prescriptionInfoStyle}>
                    <h4 style={orderIdStyle}>{prescription.orderId}</h4>
                    <p style={customerNameStyle}>{prescription.customerName}</p>
                    <p style={doctorNameStyle}>Dr. {prescription.doctorName}</p>
                  </div>
                  <div style={prescriptionMetaStyle}>
                    <span style={uploadTimeStyle}>{prescription.uploadedTime}</span>
                    {prescription.status !== 'pending' && (
                      <span style={statusTimeStyle}>
                        {prescription.status === 'approved' ? 'Approved' : 'Rejected'}
                      </span>
                    )}
                  </div>
                </div>
                
                <div style={medicinesListStyle}>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }}>
                    <strong style={{ marginRight: '8px' }}>Medicines:</strong>
                    <span style={{ fontSize: '11px', color: '#6b7280' }}>
                      {prescription.medicines.length} items
                    </span>
                  </div>
                  <div style={medicineTagsStyle}>
                    {prescription.medicines.map((medicine, index) => (
                      <span key={index} style={medicineTagStyle}>
                        {medicine}
                      </span>
                    ))}
                  </div>
                </div>

                <div style={prescriptionStatusStyle}>
                  <span style={{
                    ...statusBadgeStyle,
                    ...(prescription.status === 'approved' ? statusApprovedStyle : {}),
                    ...(prescription.status === 'rejected' ? statusRejectedStyle : {})
                  }}>
                    {prescription.status === 'pending' ? 'Pending' : 
                     prescription.status === 'approved' ? 'Approved' : 'Rejected'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {selectedPrescription && (
          <div style={prescriptionViewerStyle}>
            <div style={viewerHeaderStyle}>
              <h3 style={viewerTitleStyle}>Prescription Verification</h3>
              <div style={prescriptionInfoDetailedStyle}>
                <p><strong>Order:</strong> {selectedPrescription.orderId}</p>
                <p><strong>Customer:</strong> {selectedPrescription.customerName}</p>
                <p><strong>Doctor:</strong> Dr. {selectedPrescription.doctorName}</p>
                <p><strong>Status:</strong> 
                  <span style={{
                    ...statusTextStyle,
                    ...(selectedPrescription.status === 'approved' ? statusApprovedStyle : {}),
                    ...(selectedPrescription.status === 'rejected' ? statusRejectedStyle : {})
                  }}>
                    {selectedPrescription.status.charAt(0).toUpperCase() + selectedPrescription.status.slice(1)}
                  </span>
                </p>
              </div>
            </div>

            <div style={viewerContentStyle}>
              <div style={prescriptionImageStyle}>
                <img 
                  src={selectedPrescription.imageUrl} 
                  alt="Prescription" 
                  style={prescriptionImgStyle}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/400x500?text=Prescription+Image';
                  }}
                />
                <div style={imageControlsStyle}>
                  <button style={smallButtonStyle}>Zoom In</button>
                  <button style={smallButtonStyle}>Zoom Out</button>
                  <button style={smallButtonStyle}>Rotate</button>
                </div>
              </div>

              <div style={extractedMedicinesStyle}>
                <h4 style={medicinesTitleStyle}>Extracted Medicines</h4>
                <div style={medicineListStyle}>
                  {selectedPrescription.medicines.map((medicine, index) => (
                    <div key={index} style={medicineItemStyle}>
                      <input type="checkbox" defaultChecked style={checkboxStyle} />
                      <span>{medicine}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={verificationActionsStyle}>
                {selectedPrescription.status === 'pending' && (
                  <>
                    <button 
                      style={successButtonStyle}
                      onClick={() => approvePrescription(selectedPrescription.id)}
                    >
                      ✅ Approve
                    </button>
                    <button 
                      style={dangerButtonStyle}
                      onClick={() => rejectPrescription(selectedPrescription.id)}
                    >
                      ❌ Reject
                    </button>
                    <button 
                      style={secondaryButtonStyle}
                      onClick={() => messageDoctor(selectedPrescription.id)}
                    >
                      📞 Message Doctor
                    </button>
                  </>
                )}
                {selectedPrescription.status !== 'pending' && (
                  <div style={verificationResultStyle}>
                    <p style={resultTextStyle}>
                      This prescription has been {selectedPrescription.status}.
                      {selectedPrescription.status === 'approved' ? ' Order has been processed.' : ' Order has been cancelled.'}
                    </p>
                    <button 
                      style={secondaryButtonStyle}
                      onClick={() => setSelectedPrescription(null)}
                    >
                      Close
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VendorPrescriptionVerification;