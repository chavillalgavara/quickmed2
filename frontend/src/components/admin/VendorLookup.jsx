import React, { useState, useEffect, useCallback } from 'react';

// Move initial vendors data outside component to prevent recreation
const initialVendors = [
  {
    id: 'V001',
    name: 'MedPlus Pharmacy',
    owner: 'Rajesh Kumar',
    phone: '+91 9876543210',
    email: 'medplus@pharmacy.com',
    address: '123 MG Road, Bangalore, Karnataka - 560001',
    status: 'Active',
    registrationDate: '2020-03-15',
    licenseNumber: 'PHARM123456',
    licenseExpiry: '2025-12-31',
    drugPermitNumber: 'DP789012',
    gstNumber: '29AABCU9603R1ZM',
    kycStatus: 'Verified',
    totalMedicines: 1250,
    lowStock: 15,
    expiredItems: 3,
    outOfStock: 8,
    averageRating: 4.5,
    totalReviews: 234,
    totalOrders: 1250,
    completedOrders: 1200,
    cancelledOrders: 25,
    refundedOrders: 15,
    averageOrderValue: 850,
    monthlyRevenue: 425000,
    documents: {
      drugPermit: 'drug_permit_V001.pdf',
      gstCertificate: 'gst_cert_V001.pdf',
      licenseCopy: 'license_V001.pdf'
    },
    recentReviews: [
      { id: 1, customer: 'Rahul Sharma', rating: 5, comment: 'Excellent service and fast delivery. Medicines were genuine and properly packed.', date: '2024-01-15' },
      { id: 2, customer: 'Priya Patel', rating: 4, comment: 'Good quality medicines, slightly delayed delivery but overall satisfied.', date: '2024-01-14' },
      { id: 3, customer: 'Anil Kumar', rating: 3, comment: 'Average experience. Some medicines were not available as expected.', date: '2024-01-12' },
      { id: 4, customer: 'Sneha Reddy', rating: 5, comment: 'Best pharmacy in town! Always have what I need and great customer service.', date: '2024-01-10' }
    ],
    products: [
      { id: 1, name: 'Paracetamol 500mg', brand: 'Cipla', quantity: 150, price: 25, sku: 'SKU001', expiry: '2025-06-30', category: 'Pain Relief' },
      { id: 2, name: 'Amoxicillin 250mg', brand: 'Sun Pharma', quantity: 80, price: 45, sku: 'SKU002', expiry: '2024-11-30', category: 'Antibiotic' },
      { id: 3, name: 'Vitamin C 1000mg', brand: 'Himalaya', quantity: 200, price: 120, sku: 'SKU003', expiry: '2025-12-31', category: 'Supplement' },
      { id: 4, name: 'Metformin 500mg', brand: 'Dr. Reddy\'s', quantity: 5, price: 35, sku: 'SKU004', expiry: '2024-09-30', category: 'Diabetes' },
      { id: 5, name: 'Atorvastatin 20mg', brand: 'Lupin', quantity: 12, price: 85, sku: 'SKU005', expiry: '2025-03-31', category: 'Cholesterol' },
      { id: 6, name: 'Omeprazole 20mg', brand: 'Mankind', quantity: 0, price: 55, sku: 'SKU006', expiry: '2025-01-31', category: 'Acidity' },
      { id: 7, name: 'Cetirizine 10mg', brand: 'Cipla', quantity: 45, price: 18, sku: 'SKU007', expiry: '2024-12-31', category: 'Allergy' },
      { id: 8, name: 'Aspirin 75mg', brand: 'GSK', quantity: 90, price: 30, sku: 'SKU008', expiry: '2025-08-31', category: 'Blood Thinner' }
    ],
    salesData: {
      daily: 42,
      weekly: 285,
      monthly: 1250,
      trend: 'up'
    },
    compliance: {
      lastAudit: '2024-01-10',
      auditScore: 92,
      violations: 0,
      warnings: 1,
      warningReasons: [],
      suspensionReasons: [],
      blacklistReasons: []
    }
  },
  {
    id: 'V002',
    name: 'Apollo Pharmacy',
    owner: 'Priya Singh',
    phone: '+91 9876543211',
    email: 'apollo.delhi@pharmacy.com',
    address: '45 Connaught Place, New Delhi - 110001',
    status: 'Active',
    registrationDate: '2019-08-22',
    licenseNumber: 'PHARM789012',
    licenseExpiry: '2024-11-30',
    drugPermitNumber: 'DP345678',
    gstNumber: '07AABCU9603R1ZN',
    kycStatus: 'Pending',
    totalMedicines: 890,
    lowStock: 8,
    expiredItems: 1,
    outOfStock: 3,
    averageRating: 4.2,
    totalReviews: 156,
    totalOrders: 890,
    completedOrders: 865,
    cancelledOrders: 15,
    refundedOrders: 8,
    averageOrderValue: 720,
    monthlyRevenue: 312000,
    documents: {
      drugPermit: 'drug_permit_V002.pdf',
      gstCertificate: 'gst_cert_V002.pdf',
      licenseCopy: 'license_V002.pdf'
    },
    recentReviews: [
      { id: 1, customer: 'Amit Verma', rating: 4, comment: 'Good service and reasonable prices.', date: '2024-01-14' },
      { id: 2, customer: 'Neha Gupta', rating: 5, comment: 'Very professional staff and quick service.', date: '2024-01-13' }
    ],
    products: [
      { id: 1, name: 'Ibuprofen 400mg', brand: 'Cipla', quantity: 75, price: 32, sku: 'SKU101', expiry: '2025-04-30', category: 'Pain Relief' },
      { id: 2, name: 'Azithromycin 250mg', brand: 'Sun Pharma', quantity: 40, price: 68, sku: 'SKU102', expiry: '2024-10-31', category: 'Antibiotic' }
    ],
    salesData: {
      daily: 28,
      weekly: 195,
      monthly: 890,
      trend: 'stable'
    },
    compliance: {
      lastAudit: '2024-01-05',
      auditScore: 88,
      violations: 1,
      warnings: 0,
      warningReasons: [],
      suspensionReasons: [],
      blacklistReasons: []
    }
  },
  {
    id: 'V003',
    name: 'Wellness Forever',
    owner: 'Arun Mehta',
    phone: '+91 9876543212',
    email: 'wellness.mumbai@pharmacy.com',
    address: '78 Linking Road, Mumbai, Maharashtra - 400052',
    status: 'Suspended',
    registrationDate: '2021-01-10',
    licenseNumber: 'PHARM345678',
    licenseExpiry: '2024-08-15',
    drugPermitNumber: 'DP901234',
    gstNumber: '27AABCU9603R1ZO',
    kycStatus: 'Rejected',
    totalMedicines: 0,
    lowStock: 0,
    expiredItems: 12,
    outOfStock: 0,
    averageRating: 3.8,
    totalReviews: 89,
    totalOrders: 0,
    completedOrders: 0,
    cancelledOrders: 0,
    refundedOrders: 0,
    averageOrderValue: 0,
    monthlyRevenue: 0,
    documents: {
      drugPermit: 'drug_permit_V003.pdf',
      gstCertificate: 'gst_cert_V003.pdf',
      licenseCopy: 'license_V003.pdf'
    },
    recentReviews: [],
    products: [],
    salesData: {
      daily: 0,
      weekly: 0,
      monthly: 0,
      trend: 'down'
    },
    compliance: {
      lastAudit: '2023-12-20',
      auditScore: 65,
      violations: 3,
      warnings: 2,
      warningReasons: [
        { date: '2023-11-15', reason: 'Multiple customer complaints about expired medicines' },
        { date: '2023-12-20', reason: 'Failure to maintain proper inventory records' }
      ],
      suspensionReasons: [
        { date: '2024-01-01', reason: 'Repeated violations of pharmaceutical regulations' }
      ],
      blacklistReasons: []
    }
  }
];

// Separate Modal Components to prevent re-renders
const ActionConfirmationModal = React.memo(({ actionConfirmation, onConfirm, onCancel, primaryColor, reason, onReasonChange }) => {
  if (!actionConfirmation) return null;

  const showReasonInput = ['suspend', 'blacklist', 'send-warning'].includes(actionConfirmation.action);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1001
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '30px',
        borderRadius: '10px',
        width: '90%',
        maxWidth: '500px',
        textAlign: 'center'
      }}>
        <h3 style={{ color: primaryColor, marginBottom: '15px' }}>Confirm Action</h3>
        <p style={{ marginBottom: '25px', lineHeight: '1.5' }}>
          {actionConfirmation.message}
        </p>
        
        {showReasonInput && (
          <div style={{ marginBottom: '20px', textAlign: 'left' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#333' }}>
              Reason for {actionConfirmation.action.replace('-', ' ')}:
            </label>
            <textarea
              value={reason}
              onChange={onReasonChange}
              placeholder={`Enter reason for ${actionConfirmation.action.replace('-', ' ')}...`}
              rows="3"
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '5px',
                resize: 'vertical',
                fontSize: '14px',
                fontFamily: 'inherit'
              }}
              required
            />
          </div>
        )}
        
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
          <button
            onClick={onCancel}
            style={{
              padding: '10px 20px',
              backgroundColor: '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              minWidth: '80px'
            }}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={showReasonInput && !reason.trim()}
            style={{
              padding: '10px 20px',
              backgroundColor: showReasonInput && !reason.trim() ? '#ccc' : primaryColor,
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: showReasonInput && !reason.trim() ? 'not-allowed' : 'pointer',
              minWidth: '80px'
            }}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
});

const EditProfileModal = React.memo(({ 
  isOpen, 
  onClose, 
  onSubmit, 
  formData, 
  onInputChange, 
  primaryColor, 
  accentColor,
  phoneError 
}) => {
  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!phoneError) {
      onSubmit();
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1001
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '30px',
        borderRadius: '10px',
        width: '90%',
        maxWidth: '500px',
        maxHeight: '90vh',
        overflow: 'auto'
      }}>
        <h3 style={{ color: primaryColor, marginBottom: '20px', textAlign: 'center' }}>Edit Vendor Profile</h3>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#333' }}>Store Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={onInputChange}
              style={{
                width: '100%',
                padding: '12px',
                border: `1px solid ${accentColor}`,
                borderRadius: '5px',
                fontSize: '14px',
                fontFamily: 'inherit',
                boxSizing: 'border-box'
              }}
              required
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#333' }}>Owner Name:</label>
            <input
              type="text"
              name="owner"
              value={formData.owner}
              onChange={onInputChange}
              style={{
                width: '100%',
                padding: '12px',
                border: `1px solid ${accentColor}`,
                borderRadius: '5px',
                fontSize: '14px',
                fontFamily: 'inherit',
                boxSizing: 'border-box'
              }}
              required
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#333' }}>Phone:</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={onInputChange}
              placeholder="+91 9876543210"
              style={{
                width: '100%',
                padding: '12px',
                border: `1px solid ${phoneError ? '#dc3545' : accentColor}`,
                borderRadius: '5px',
                fontSize: '14px',
                fontFamily: 'inherit',
                boxSizing: 'border-box',
                backgroundColor: phoneError ? '#fff5f5' : 'white'
              }}
              required
            />
            {phoneError && (
              <div style={{ 
                color: '#dc3545', 
                fontSize: '12px', 
                marginTop: '5px',
                display: 'flex',
                alignItems: 'center',
                gap: '5px'
              }}>
                ⚠️ {phoneError}
              </div>
            )}
            <div style={{ 
              color: '#666', 
              fontSize: '12px', 
              marginTop: '5px'
            }}>
              Format: +91 followed by 10-digit mobile number
            </div>
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#333' }}>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={onInputChange}
              style={{
                width: '100%',
                padding: '12px',
                border: `1px solid ${accentColor}`,
                borderRadius: '5px',
                fontSize: '14px',
                fontFamily: 'inherit',
                boxSizing: 'border-box'
              }}
              required
            />
          </div>
          <div style={{ marginBottom: '25px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#333' }}>Address:</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={onInputChange}
              rows="3"
              style={{
                width: '100%',
                padding: '12px',
                border: `1px solid ${accentColor}`,
                borderRadius: '5px',
                resize: 'vertical',
                fontSize: '14px',
                fontFamily: 'inherit',
                boxSizing: 'border-box'
              }}
              required
            />
          </div>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: '12px 24px',
                backgroundColor: '#6c757d',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 'bold',
                minWidth: '100px'
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={phoneError}
              style={{
                padding: '12px 24px',
                backgroundColor: phoneError ? '#ccc' : primaryColor,
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: phoneError ? 'not-allowed' : 'pointer',
                fontSize: '14px',
                fontWeight: 'bold',
                minWidth: '100px'
              }}
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
});

const SupportModal = React.memo(({ isOpen, onClose, selectedVendor, primaryColor, accentColor }) => {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1001
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '30px',
        borderRadius: '10px',
        width: '90%',
        maxWidth: '500px',
        maxHeight: '90vh',
        overflow: 'auto'
      }}>
        <h3 style={{ color: primaryColor, marginBottom: '20px', textAlign: 'center' }}>Open Support Ticket</h3>
        <div style={{ marginBottom: '25px', textAlign: 'center' }}>
          <p style={{ marginBottom: '8px' }}><strong>Vendor:</strong> {selectedVendor?.name}</p>
          <p><strong>Vendor ID:</strong> {selectedVendor?.id}</p>
        </div>
        <div style={{ marginBottom: '25px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#333' }}>
            Briefly describe the support issue:
          </label>
          <textarea
            rows="4"
            placeholder="Describe the issue here..."
            style={{
              width: '100%',
              padding: '12px',
              border: `1px solid ${accentColor}`,
              borderRadius: '5px',
              resize: 'vertical',
              fontSize: '14px',
              fontFamily: 'inherit',
              boxSizing: 'border-box'
            }}
          />
        </div>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
          <button
            onClick={onClose}
            style={{
              padding: '12px 24px',
              backgroundColor: '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 'bold',
              minWidth: '100px'
            }}
          >
            Cancel
          </button>
          <button
            onClick={onClose}
            style={{
              padding: '12px 24px',
              backgroundColor: primaryColor,
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 'bold',
              minWidth: '100px'
            }}
          >
            Submit Ticket
          </button>
        </div>
      </div>
    </div>
  );
});

// Enhanced Document Preview Component
const DocumentPreview = React.memo(({ documentType, vendor, primaryColor }) => {
  const getDocumentContent = (type, vendorData) => {
    const baseContent = {
      drugPermit: {
        title: 'DRUG LICENSE PERMIT',
        subtitle: 'Government of India - Ministry of Health & Family Welfare',
        sections: [
          { title: 'License Holder', value: vendorData.name },
          { title: 'Proprietor/Owner', value: vendorData.owner },
          { title: 'License Number', value: vendorData.drugPermitNumber },
          { title: 'Business Address', value: vendorData.address },
          { title: 'License Type', value: 'Retail Drug License' },
          { title: 'Validity Period', value: `From ${vendorData.registrationDate} to ${vendorData.licenseExpiry}` },
          { title: 'Issuing Authority', value: 'Drugs Control Department' },
          { title: 'Date of Issue', value: vendorData.registrationDate }
        ]
      },
      gstCertificate: {
        title: 'GOODS AND SERVICES TAX CERTIFICATE',
        subtitle: 'Government of India - Ministry of Finance',
        sections: [
          { title: 'Legal Name', value: vendorData.name },
          { title: 'Trade Name', value: vendorData.name },
          { title: 'GSTIN/UIN', value: vendorData.gstNumber },
          { title: 'Business Constitution', value: 'Proprietorship' },
          { title: 'Date of Registration', value: vendorData.registrationDate },
          { title: 'Period of Validity', value: 'From date of registration' },
          { title: 'Type of Registration', value: 'Regular' },
          { title: 'Business Address', value: vendorData.address }
        ]
      },
      licenseCopy: {
        title: 'BUSINESS OPERATING LICENSE',
        subtitle: 'Municipal Corporation - Trade License Department',
        sections: [
          { title: 'Business Name', value: vendorData.name },
          { title: 'License Number', value: vendorData.licenseNumber },
          { title: 'Owner Name', value: vendorData.owner },
          { title: 'Business Address', value: vendorData.address },
          { title: 'Business Type', value: 'Pharmacy & Medical Store' },
          { title: 'License Valid Until', value: vendorData.licenseExpiry },
          { title: 'Issued Date', value: vendorData.registrationDate },
          { title: 'Issuing Authority', value: 'Local Municipal Corporation' }
        ]
      }
    };
    
    return baseContent[type] || baseContent.licenseCopy;
  };

  const content = getDocumentContent(documentType, vendor);

  return (
    <div style={{
      width: '100%',
      maxWidth: '600px',
      margin: '0 auto',
      backgroundColor: 'white',
      border: '2px solid #333',
      borderRadius: '8px',
      overflow: 'hidden',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
    }}>
      {/* Document Header */}
      <div style={{
        backgroundColor: primaryColor,
        color: 'white',
        padding: '20px',
        textAlign: 'center',
        borderBottom: '3px solid #333'
      }}>
        <h2 style={{ margin: '0 0 5px 0', fontSize: '24px', fontWeight: 'bold' }}>
          {content.title}
        </h2>
        <p style={{ margin: 0, fontSize: '14px', opacity: 0.9 }}>
          {content.subtitle}
        </p>
      </div>

      {/* Document Body */}
      <div style={{ padding: '25px' }}>
        {/* Official Seal */}
        <div style={{
          position: 'absolute',
          right: '30px',
          top: '120px',
          width: '100px',
          height: '100px',
          border: '2px solid #333',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '12px',
          fontWeight: 'bold',
          textAlign: 'center',
          backgroundColor: '#f8f9fa',
          transform: 'rotate(-15deg)',
          opacity: 0.8
        }}>
          OFFICIAL SEAL
        </div>

        {/* Document Content */}
        <div style={{ marginBottom: '20px' }}>
          {content.sections.map((section, index) => (
            <div key={index} style={{
              display: 'flex',
              marginBottom: '12px',
              paddingBottom: '8px',
              borderBottom: '1px solid #eee'
            }}>
              <div style={{
                flex: '0 0 200px',
                fontWeight: 'bold',
                color: '#333',
                fontSize: '14px'
              }}>
                {section.title}:
              </div>
              <div style={{
                flex: 1,
                color: '#666',
                fontSize: '14px'
              }}>
                {section.value}
              </div>
            </div>
          ))}
        </div>

        {/* Signature Section */}
        <div style={{
          marginTop: '30px',
          paddingTop: '20px',
          borderTop: '2px solid #333',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <div style={{
              borderBottom: '1px solid #333',
              width: '200px',
              marginBottom: '5px'
            }}></div>
            <div style={{ fontSize: '12px', color: '#666' }}>
              Authorized Signatory
            </div>
          </div>
          <div style={{
            fontSize: '12px',
            color: '#666',
            textAlign: 'right'
          }}>
            <div>Date: {new Date().toLocaleDateString()}</div>
            <div>Document ID: {vendor.id}-{documentType.toUpperCase()}</div>
          </div>
        </div>

        {/* Watermark */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%) rotate(-45deg)',
          fontSize: '60px',
          fontWeight: 'bold',
          color: 'rgba(0,0,0,0.1)',
          zIndex: 0,
          pointerEvents: 'none',
          whiteSpace: 'nowrap'
        }}>
          OFFICIAL DOCUMENT
        </div>
      </div>
    </div>
  );
});

// Document Viewer Modal
const DocumentViewerModal = React.memo(({ isOpen, onClose, documentType, vendor, primaryColor }) => {
  if (!isOpen) return null;

  const getDocumentTitle = (type) => {
    switch(type) {
      case 'drugPermit': return 'Drug Permit Certificate';
      case 'gstCertificate': return 'GST Certificate';
      case 'licenseCopy': return 'Business License';
      default: return 'Document';
    }
  };

  const getDocumentIcon = (type) => {
    switch(type) {
      case 'drugPermit': return '💊';
      case 'gstCertificate': return '📋';
      case 'licenseCopy': return '🏢';
      default: return '📄';
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.9)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1002,
      padding: '20px'
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '10px',
        width: '100%',
        maxWidth: '900px',
        maxHeight: '95vh',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '20px',
          borderBottom: `2px solid ${primaryColor}`,
          paddingBottom: '15px'
        }}>
          <h3 style={{ 
            color: primaryColor, 
            margin: 0, 
            display: 'flex', 
            alignItems: 'center', 
            gap: '10px',
            fontSize: '24px'
          }}>
            <span style={{ fontSize: '28px' }}>{getDocumentIcon(documentType)}</span>
            {getDocumentTitle(documentType)}
          </h3>
          <button
            onClick={onClose}
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              fontSize: '28px',
              cursor: 'pointer',
              color: '#666',
              padding: '8px',
              borderRadius: '50%',
              width: '45px',
              height: '45px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#f0f0f0';
              e.target.style.color = primaryColor;
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'transparent';
              e.target.style.color = '#666';
            }}
          >
            ✕
          </button>
        </div>
        
        {/* Document Preview Container */}
        <div style={{ 
          flex: 1, 
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          padding: '20px',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px',
          border: '2px dashed #ddd',
          overflow: 'auto',
          minHeight: '500px'
        }}>
          <DocumentPreview 
            documentType={documentType} 
            vendor={vendor} 
            primaryColor={primaryColor} 
          />
        </div>
        
        {/* Action Buttons */}
        <div style={{ 
          marginTop: '25px',
          display: 'flex',
          gap: '15px',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          <button
            style={{
              padding: '14px 28px',
              backgroundColor: primaryColor,
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '15px',
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              transition: 'all 0.3s ease',
              minWidth: '200px'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#6a2458';
              e.target.style.transform = 'translateY(-3px)';
              e.target.style.boxShadow = '0 6px 12px rgba(0,0,0,0.2)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = primaryColor;
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = 'none';
            }}
          >
            <span style={{ fontSize: '18px' }}>📥</span>
            Download Document
          </button>
          <button
            style={{
              padding: '14px 28px',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '15px',
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              transition: 'all 0.3s ease',
              minWidth: '180px'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#218838';
              e.target.style.transform = 'translateY(-3px)';
              e.target.style.boxShadow = '0 6px 12px rgba(0,0,0,0.2)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#28a745';
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = 'none';
            }}
          >
            <span style={{ fontSize: '18px' }}>🖨️</span>
            Print Document
          </button>
          <button
            style={{
              padding: '14px 28px',
              backgroundColor: '#17a2b8',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '15px',
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              transition: 'all 0.3s ease',
              minWidth: '180px'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#138496';
              e.target.style.transform = 'translateY(-3px)';
              e.target.style.boxShadow = '0 6px 12px rgba(0,0,0,0.2)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#17a2b8';
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = 'none';
            }}
          >
            <span style={{ fontSize: '18px' }}>📧</span>
            Email Document
          </button>
        </div>

        {/* Document Information */}
        <div style={{ 
          marginTop: '25px',
          padding: '20px',
          backgroundColor: '#e8f4fd',
          borderRadius: '8px',
          borderLeft: `5px solid ${primaryColor}`
        }}>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: '15px',
            fontSize: '14px'
          }}>
            <div>
              <strong>Document Type:</strong> {getDocumentTitle(documentType)}
            </div>
            <div>
              <strong>Vendor:</strong> {vendor.name}
            </div>
            <div>
              <strong>Document ID:</strong> {vendor.id}-{documentType.toUpperCase()}
            </div>
            <div>
              <strong>Issue Date:</strong> {vendor.registrationDate}
            </div>
            <div>
              <strong>Expiry Date:</strong> {vendor.licenseExpiry}
            </div>
            <div>
              <strong>File Size:</strong> 2.4 MB
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

// Sales Chart Component
const SalesBarChart = React.memo(({ data, primaryColor }) => {
  const maxSales = Math.max(...data.map(item => item.sales));
  
  return (
    <div style={{ display: 'flex', alignItems: 'end', gap: '12px', height: '150px', padding: '20px 0', justifyContent: 'center' }}>
      {data.map((item, index) => (
        <div key={index} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, maxWidth: '60px' }}>
          <div
            style={{
              height: `${(item.sales / maxSales) * 100}px`,
              backgroundColor: primaryColor,
              width: '35px',
              borderRadius: '5px 5px 0 0',
              transition: 'height 0.3s ease'
            }}
          />
          <div style={{ marginTop: '10px', fontSize: '12px', fontWeight: 'bold', textAlign: 'center' }}>
            {item.sales}
          </div>
          <div style={{ fontSize: '11px', color: '#666', textAlign: 'center' }}>
            {item.day}
          </div>
        </div>
      ))}
    </div>
  );
});

// Main Component
const VendorLookup = () => {
  const primaryColor = '#7C2A62';
  const accentColor = '#F7D9EB';
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [showAllVendors, setShowAllVendors] = useState(false);
  const [dailySalesData, setDailySalesData] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [editProfileOpen, setEditProfileOpen] = useState(false);
  const [supportOpen, setSupportOpen] = useState(false);
  const [documentViewerOpen, setDocumentViewerOpen] = useState(false);
  const [currentDocumentType, setCurrentDocumentType] = useState('');
  const [editFormData, setEditFormData] = useState({
    name: '',
    owner: '',
    phone: '',
    email: '',
    address: ''
  });
  const [actionConfirmation, setActionConfirmation] = useState(null);
  const [actionReason, setActionReason] = useState('');
  const [phoneError, setPhoneError] = useState('');

  // Initialize vendors state
  useEffect(() => {
    setVendors(initialVendors);
    setSelectedVendor(initialVendors[0]);
    setDailySalesData(generateDailySalesData());
  }, []);

  // Generate daily sales data for chart
  const generateDailySalesData = useCallback(() => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    return days.map(day => ({
      day,
      sales: Math.floor(Math.random() * 50) + 20,
      revenue: Math.floor(Math.random() * 40000) + 10000
    }));
  }, []);

  // Validate Indian mobile number
  const validateIndianMobile = useCallback((phone) => {
    const indianMobileRegex = /^\+91\s[6-9]\d{9}$/;
    if (!indianMobileRegex.test(phone)) {
      return 'Please enter a valid Indian mobile number in format: +91 9876543210';
    }
    return '';
  }, []);

  // Enhanced search function
  const handleSearch = useCallback(() => {
    if (!searchQuery.trim()) {
      setSelectedVendor(vendors[0]);
      setShowAllVendors(false);
      return;
    }

    const query = searchQuery.toLowerCase().trim();
    const foundVendor = vendors.find(v => 
      v.id.toLowerCase() === query || 
      v.name.toLowerCase().includes(query) ||
      v.phone.includes(query) ||
      v.owner.toLowerCase().includes(query) ||
      v.licenseNumber.toLowerCase().includes(query)
    );
    
    if (foundVendor) {
      setSelectedVendor(foundVendor);
      setShowAllVendors(false);
      setDailySalesData(generateDailySalesData());
    } else {
      setSelectedVendor(null);
    }
  }, [searchQuery, vendors, generateDailySalesData]);

  const handleShowAllVendors = useCallback(() => {
    setShowAllVendors(true);
    setSelectedVendor(null);
  }, []);

  const handleVendorSelect = useCallback((vendor) => {
    setSelectedVendor(vendor);
    setShowAllVendors(false);
    setSearchQuery('');
    setDailySalesData(generateDailySalesData());
  }, [generateDailySalesData]);

  // Document viewing functions with enhanced functionality
  const handleViewDocument = useCallback((documentType, vendor) => {
    setCurrentDocumentType(documentType);
    setDocumentViewerOpen(true);
  }, []);

  const handleCloseDocumentViewer = useCallback(() => {
    setDocumentViewerOpen(false);
    setCurrentDocumentType('');
  }, []);

  // Update vendor in state
  const updateVendor = useCallback((vendorId, updates) => {
    setVendors(prevVendors => 
      prevVendors.map(vendor => 
        vendor.id === vendorId ? { ...vendor, ...updates } : vendor
      )
    );
    
    if (selectedVendor && selectedVendor.id === vendorId) {
      setSelectedVendor(prev => ({ ...prev, ...updates }));
    }
  }, [selectedVendor]);

  // Show action confirmation
  const showActionConfirmation = useCallback((action, vendor) => {
    const actionMessages = {
      'approve': `Are you sure you want to approve ${vendor.name}? This will activate their account.`,
      'reject': `Are you sure you want to reject ${vendor.name}? This will deactivate their account.`,
      'request-resubmit': `Request document re-submission from ${vendor.name}?`,
      'suspend': `Are you sure you want to suspend ${vendor.name}? They will not be able to operate.`,
      'blacklist': `WARNING: This will permanently blacklist ${vendor.name}. This action cannot be undone.`,
      'send-warning': `Send a formal warning to ${vendor.name}?`,
    };

    setActionConfirmation({
      action,
      vendor,
      message: actionMessages[action] || `Perform ${action} on ${vendor.name}?`
    });
    setActionReason(''); // Reset reason when opening new confirmation
  }, []);

  // Handle direct admin actions (without confirmation)
  const handleDirectAdminAction = useCallback((action, vendor) => {
    switch (action) {
      case 'edit-profile':
        setEditFormData({
          name: vendor.name,
          owner: vendor.owner,
          phone: vendor.phone,
          email: vendor.email,
          address: vendor.address
        });
        // Validate existing phone number
        setPhoneError(validateIndianMobile(vendor.phone));
        setEditProfileOpen(true);
        break;
        
      case 'open-support':
        setSupportOpen(true);
        break;
        
      default:
        break;
    }
  }, [validateIndianMobile]);

  // Handle confirmed admin action
  const handleConfirmedAction = useCallback(() => {
    if (!actionConfirmation) return;
    
    const { action, vendor } = actionConfirmation;
    const currentDate = new Date().toISOString().split('T')[0];
    
    switch (action) {
      case 'approve':
        updateVendor(vendor.id, { 
          status: 'Active',
          kycStatus: 'Verified'
        });
        break;
        
      case 'reject':
        updateVendor(vendor.id, { 
          status: 'Inactive',
          kycStatus: 'Rejected'
        });
        break;
        
      case 'request-resubmit':
        updateVendor(vendor.id, { 
          kycStatus: 'Pending'
        });
        break;
        
      case 'suspend':
        updateVendor(vendor.id, { 
          status: 'Suspended',
          compliance: {
            ...vendor.compliance,
            suspensionReasons: [
              ...(vendor.compliance.suspensionReasons || []),
              { date: currentDate, reason: actionReason }
            ]
          }
        });
        break;
        
      case 'blacklist':
        updateVendor(vendor.id, { 
          status: 'Blacklisted',
          compliance: {
            ...vendor.compliance,
            blacklistReasons: [
              ...(vendor.compliance.blacklistReasons || []),
              { date: currentDate, reason: actionReason }
            ]
          }
        });
        break;
        
      case 'send-warning':
        updateVendor(vendor.id, { 
          compliance: {
            ...vendor.compliance,
            warnings: (vendor.compliance.warnings || 0) + 1,
            warningReasons: [
              ...(vendor.compliance.warningReasons || []),
              { date: currentDate, reason: actionReason }
            ]
          }
        });
        break;
        
      default:
        break;
    }
    
    setActionConfirmation(null);
    setActionReason('');
  }, [actionConfirmation, actionReason, updateVendor]);

  // Handle form input changes with phone validation
  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Validate phone number in real-time
    if (name === 'phone') {
      setPhoneError(validateIndianMobile(value));
    }
  }, [validateIndianMobile]);

  // Handle edit form submission
  const handleEditSubmit = useCallback(() => {
    if (selectedVendor && !phoneError) {
      updateVendor(selectedVendor.id, editFormData);
      setEditProfileOpen(false);
      setPhoneError('');
    }
  }, [selectedVendor, editFormData, updateVendor, phoneError]);

  // Handle reason input change
  const handleReasonChange = useCallback((e) => {
    setActionReason(e.target.value);
  }, []);

  // Reset form when modal closes
  const handleCloseEditModal = useCallback(() => {
    setEditProfileOpen(false);
    setPhoneError('');
  }, []);

  const handleCloseSupportModal = useCallback(() => {
    setSupportOpen(false);
  }, []);

  const handleCancelAction = useCallback(() => {
    setActionConfirmation(null);
    setActionReason('');
  }, []);

  const getStatusColor = useCallback((status) => {
    switch(status) {
      case 'Active': return { bg: '#d4edda', text: '#155724' };
      case 'Inactive': return { bg: '#f8d7da', text: '#721c24' };
      case 'Suspended': return { bg: '#fff3cd', text: '#856404' };
      case 'Blacklisted': return { bg: '#000', text: '#fff' };
      default: return { bg: '#e2e3e5', text: '#383d41' };
    }
  }, []);

  const getKYCStatusColor = useCallback((status) => {
    switch(status) {
      case 'Verified': return { bg: '#d4edda', text: '#155724' };
      case 'Pending': return { bg: '#fff3cd', text: '#856404' };
      case 'Rejected': return { bg: '#f8d7da', text: '#721c24' };
      default: return { bg: '#e2e3e5', text: '#383d41' };
    }
  }, []);

  const getTrendIcon = useCallback((trend) => {
    switch(trend) {
      case 'up': return '↗️';
      case 'down': return '↘️';
      case 'stable': return '→';
      default: return '→';
    }
  }, []);

  // Enhanced document button styles with hover effects
  const getDocumentButtonStyles = useCallback((primaryColor) => ({
    base: {
      padding: '10px 20px', 
      backgroundColor: primaryColor, 
      color: 'white', 
      border: 'none', 
      borderRadius: '5px', 
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: 'bold',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      transition: 'all 0.3s ease',
      transform: 'translateY(0)',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      width: '100%',
      maxWidth: '200px',
      margin: '10px auto 0 auto'
    },
    hover: {
      backgroundColor: '#6a2458',
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
    }
  }), []);

  // Render compliance history section
  const renderComplianceHistory = useCallback((vendor) => {
    const hasHistory = (vendor.compliance.warningReasons?.length > 0) || 
                      (vendor.compliance.suspensionReasons?.length > 0) || 
                      (vendor.compliance.blacklistReasons?.length > 0);

    if (!hasHistory) return null;

    return (
      <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '5px' }}>
        <h4 style={{ color: primaryColor, marginBottom: '15px', textAlign: 'center' }}>Compliance History</h4>
        
        {vendor.compliance.warningReasons?.length > 0 && (
          <div style={{ marginBottom: '15px' }}>
            <h5 style={{ color: '#856404', marginBottom: '8px', textAlign: 'center' }}>Warning History:</h5>
            {vendor.compliance.warningReasons.map((warning, index) => (
              <div key={index} style={{ 
                padding: '8px', 
                marginBottom: '5px', 
                backgroundColor: '#fff3cd',
                borderLeft: '3px solid #ffc107',
                borderRadius: '3px'
              }}>
                <strong>{warning.date}:</strong> {warning.reason}
              </div>
            ))}
          </div>
        )}
        
        {vendor.compliance.suspensionReasons?.length > 0 && (
          <div style={{ marginBottom: '15px' }}>
            <h5 style={{ color: '#856404', marginBottom: '8px', textAlign: 'center' }}>Suspension History:</h5>
            {vendor.compliance.suspensionReasons.map((suspension, index) => (
              <div key={index} style={{ 
                padding: '8px', 
                marginBottom: '5px', 
                backgroundColor: '#fff3cd',
                borderLeft: '3px solid #fd7e14',
                borderRadius: '3px'
              }}>
                <strong>{suspension.date}:</strong> {suspension.reason}
              </div>
            ))}
          </div>
        )}
        
        {vendor.compliance.blacklistReasons?.length > 0 && (
          <div>
            <h5 style={{ color: '#721c24', marginBottom: '8px', textAlign: 'center' }}>Blacklist History:</h5>
            {vendor.compliance.blacklistReasons.map((blacklist, index) => (
              <div key={index} style={{ 
                padding: '8px', 
                marginBottom: '5px', 
                backgroundColor: '#f8d7da',
                borderLeft: '3px solid #dc3545',
                borderRadius: '3px'
              }}>
                <strong>{blacklist.date}:</strong> {blacklist.reason}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }, [primaryColor]);

  return (
    <div style={{ padding: '20px', backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      {/* Modals */}
      <ActionConfirmationModal 
        actionConfirmation={actionConfirmation}
        onConfirm={handleConfirmedAction}
        onCancel={handleCancelAction}
        primaryColor={primaryColor}
        reason={actionReason}
        onReasonChange={handleReasonChange}
      />
      
      <EditProfileModal 
        isOpen={editProfileOpen}
        onClose={handleCloseEditModal}
        onSubmit={handleEditSubmit}
        formData={editFormData}
        onInputChange={handleInputChange}
        primaryColor={primaryColor}
        accentColor={accentColor}
        phoneError={phoneError}
      />
      
      <SupportModal 
        isOpen={supportOpen}
        onClose={handleCloseSupportModal}
        selectedVendor={selectedVendor}
        primaryColor={primaryColor}
        accentColor={accentColor}
      />

      <DocumentViewerModal 
        isOpen={documentViewerOpen}
        onClose={handleCloseDocumentViewer}
        documentType={currentDocumentType}
        vendor={selectedVendor}
        primaryColor={primaryColor}
      />

      <h2 style={{ color: primaryColor, marginBottom: '20px', textAlign: 'center' }}>Vendor Lookup & Profile</h2>
      
      {/* Search Section */}
      <div style={{ marginBottom: '30px', textAlign: 'center' }}>
        <div style={{ display: 'flex', gap: '12px', marginBottom: '15px', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
          <input
            type="text"
            placeholder="Enter Pharmacy ID, Name, Phone, or Owner"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            style={{
              width: '400px',
              maxWidth: '100%',
              padding: '12px 16px',
              border: `1px solid ${accentColor}`,
              borderRadius: '5px',
              fontSize: '14px',
              fontFamily: 'inherit',
              boxSizing: 'border-box'
            }}
          />
          <button
            onClick={handleSearch}
            style={{
              padding: '12px 24px',
              backgroundColor: primaryColor,
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 'bold',
              transition: 'all 0.3s ease',
              minWidth: '100px'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#6a2458';
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = primaryColor;
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = 'none';
            }}
          >
            Search
          </button>
          <button
            onClick={handleShowAllVendors}
            style={{
              padding: '12px 24px',
              backgroundColor: '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 'bold',
              transition: 'all 0.3s ease',
              minWidth: '140px'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#5a6268';
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#6c757d';
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = 'none';
            }}
          >
            View All Vendors
          </button>
        </div>
        <div style={{ fontSize: '12px', color: '#666', textAlign: 'center' }}>
          Tip: Search by ID (V001), Name (MedPlus), Phone, or Owner name. Default vendor is displayed automatically.
        </div>
      </div>

      {/* All Vendors List */}
      {showAllVendors && (
        <section style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          border: `1px solid ${accentColor}`,
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          marginBottom: '20px'
        }}>
          <h3 style={{ color: primaryColor, marginBottom: '15px', textAlign: 'center' }}>All Registered Vendors</h3>
          <div style={{ display: 'grid', gap: '12px' }}>
            {vendors.map(vendor => (
              <div 
                key={vendor.id}
                onClick={() => handleVendorSelect(vendor)}
                style={{
                  padding: '15px',
                  border: `1px solid ${accentColor}`,
                  borderRadius: '5px',
                  cursor: 'pointer',
                  backgroundColor: '#fafafa',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#F7E8F3';
                  e.currentTarget.style.borderColor = primaryColor;
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#fafafa';
                  e.currentTarget.style.borderColor = accentColor;
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
                  <div>
                    <strong style={{ color: primaryColor, fontSize: '16px' }}>{vendor.name}</strong> 
                    <span style={{ color: '#666', marginLeft: '8px' }}>({vendor.id})</span>
                  </div>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap', marginTop: '8px' }}>
                    <span style={{
                      padding: '4px 12px',
                      borderRadius: '12px',
                      fontSize: '12px',
                      fontWeight: 'bold',
                      ...getStatusColor(vendor.status)
                    }}>
                      {vendor.status}
                    </span>
                    <span style={{
                      padding: '4px 12px',
                      borderRadius: '12px',
                      fontSize: '12px',
                      fontWeight: 'bold',
                      ...getKYCStatusColor(vendor.kycStatus)
                    }}>
                      KYC: {vendor.kycStatus}
                    </span>
                  </div>
                </div>
                <div style={{ color: '#666', fontSize: '14px', marginTop: '8px' }}>
                  <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', justifyContent: 'center' }}>
                    <span>👤 {vendor.owner}</span>
                    <span>📞 {vendor.phone}</span>
                    <span>📍 {vendor.address.split(',')[0]}</span>
                  </div>
                </div>
                <div style={{ marginTop: '10px', fontSize: '13px', color: '#888', textAlign: 'center' }}>
                  Registered: {vendor.registrationDate} • Medicines: {vendor.totalMedicines} • Rating: {vendor.averageRating}/5
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Vendor Profile */}
      {selectedVendor && (
        <div style={{ display: 'grid', gap: '20px' }}>
          {/* Store Information */}
          <section style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            border: `1px solid ${accentColor}`,
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ color: primaryColor, marginBottom: '15px', borderBottom: `2px solid ${accentColor}`, paddingBottom: '10px', textAlign: 'center' }}>A. Store Information</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '15px', textAlign: 'center' }}>
              <div><strong>Store Name:</strong> {selectedVendor.name}</div>
              <div><strong>Owner Name:</strong> {selectedVendor.owner}</div>
              <div><strong>Phone:</strong> {selectedVendor.phone}</div>
              <div><strong>Email:</strong> {selectedVendor.email}</div>
              <div><strong>Address:</strong> {selectedVendor.address}</div>
              <div><strong>Registration Date:</strong> {selectedVendor.registrationDate}</div>
              <div>
                <strong>Status:</strong> 
                <span style={{
                  padding: '4px 12px',
                  borderRadius: '12px',
                  fontSize: '12px',
                  marginLeft: '8px',
                  fontWeight: 'bold',
                  ...getStatusColor(selectedVendor.status)
                }}>
                  {selectedVendor.status}
                </span>
              </div>
            </div>
          </section>

          {/* Registration & Compliance - FIXED COMPACT LAYOUT */}
          <section style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            border: `1px solid ${accentColor}`,
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ color: primaryColor, marginBottom: '15px', borderBottom: `2px solid ${accentColor}`, paddingBottom: '10px', textAlign: 'center' }}>B. Registration & Compliance</h3>
            
            {/* Main Compliance Grid - Compact Side by Side Layout */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
              gap: '15px',
              marginBottom: '20px'
            }}>
              {/* Left Column - Basic Information */}
              <div>
                <h4 style={{ color: primaryColor, marginBottom: '12px', textAlign: 'center', borderBottom: `1px solid ${accentColor}`, paddingBottom: '6px', fontSize: '16px' }}>Basic Information</h4>
                <div style={{ display: 'grid', gap: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 0', borderBottom: '1px solid #f0f0f0' }}>
                    <strong style={{ fontSize: '14px', minWidth: '140px' }}>License Number:</strong>
                    <span style={{ fontSize: '14px' }}>{selectedVendor.licenseNumber}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 0', borderBottom: '1px solid #f0f0f0' }}>
                    <strong style={{ fontSize: '14px', minWidth: '140px' }}>License Expiry:</strong>
                    <span style={{ fontSize: '14px' }}>{selectedVendor.licenseExpiry}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 0', borderBottom: '1px solid #f0f0f0' }}>
                    <strong style={{ fontSize: '14px', minWidth: '140px' }}>Drug Permit Number:</strong>
                    <span style={{ fontSize: '14px' }}>{selectedVendor.drugPermitNumber}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 0', borderBottom: '1px solid #f0f0f0' }}>
                    <strong style={{ fontSize: '14px', minWidth: '140px' }}>GST Number:</strong>
                    <span style={{ fontSize: '14px' }}>{selectedVendor.gstNumber}</span>
                  </div>
                </div>
              </div>

              {/* Right Column - Status & Audit */}
              <div>
                <h4 style={{ color: primaryColor, marginBottom: '12px', textAlign: 'center', borderBottom: `1px solid ${accentColor}`, paddingBottom: '6px', fontSize: '16px' }}>Status & Audit</h4>
                <div style={{ display: 'grid', gap: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 0', borderBottom: '1px solid #f0f0f0' }}>
                    <strong style={{ fontSize: '14px', minWidth: '100px' }}>KYC Status:</strong>
                    <span style={{
                      padding: '3px 10px',
                      borderRadius: '10px',
                      fontSize: '12px',
                      fontWeight: 'bold',
                      ...getKYCStatusColor(selectedVendor.kycStatus)
                    }}>
                      {selectedVendor.kycStatus}
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 0', borderBottom: '1px solid #f0f0f0' }}>
                    <strong style={{ fontSize: '14px', minWidth: '100px' }}>Last Audit:</strong>
                    <span style={{ fontSize: '14px' }}>{selectedVendor.compliance.lastAudit}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 0', borderBottom: '1px solid #f0f0f0' }}>
                    <strong style={{ fontSize: '14px', minWidth: '100px' }}>Audit Score:</strong>
                    <span style={{ 
                      fontSize: '14px',
                      fontWeight: 'bold', 
                      color: selectedVendor.compliance.auditScore >= 90 ? '#28a745' : 
                             selectedVendor.compliance.auditScore >= 70 ? '#ffc107' : '#dc3545'
                    }}>
                      {selectedVendor.compliance.auditScore}%
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 0', borderBottom: '1px solid #f0f0f0' }}>
                    <strong style={{ fontSize: '14px', minWidth: '100px' }}>Violations:</strong>
                    <span style={{ 
                      fontSize: '14px',
                      fontWeight: 'bold', 
                      color: selectedVendor.compliance.violations === 0 ? '#28a745' : '#dc3545'
                    }}>
                      {selectedVendor.compliance.violations}
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 0', borderBottom: '1px solid #f0f0f0' }}>
                    <strong style={{ fontSize: '14px', minWidth: '100px' }}>Warnings:</strong>
                    <span style={{ 
                      fontSize: '14px',
                      fontWeight: 'bold', 
                      color: selectedVendor.compliance.warnings === 0 ? '#28a745' : '#ffc107'
                    }}>
                      {selectedVendor.compliance.warnings}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Documents Section - Compact Layout */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
              gap: '15px',
              marginTop: '20px'
            }}>
              {/* Drug Permit Card */}
              <div style={{ 
                padding: '15px', 
                backgroundColor: '#f8f9fa', 
                borderRadius: '8px',
                border: `2px solid ${accentColor}`,
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-between',
                minHeight: '150px'
              }}>
                <div style={{ marginBottom: '12px' }}>
                  <div style={{ fontSize: '28px', marginBottom: '8px' }}>💊</div>
                  <strong style={{ fontSize: '15px', color: primaryColor, display: 'block', marginBottom: '4px' }}>
                    Drug Permit Certificate
                  </strong>
                  <div style={{ fontSize: '12px', color: '#666' }}>
                    License: {selectedVendor.drugPermitNumber}
                  </div>
                </div>
                <button 
                  onClick={() => handleViewDocument('drugPermit', selectedVendor)}
                  style={getDocumentButtonStyles(primaryColor).base}
                  onMouseEnter={(e) => {
                    Object.assign(e.target.style, getDocumentButtonStyles(primaryColor).hover);
                  }}
                  onMouseLeave={(e) => {
                    Object.assign(e.target.style, getDocumentButtonStyles(primaryColor).base);
                  }}
                >
                  📄 View Document
                </button>
              </div>

              {/* GST Certificate Card */}
              <div style={{ 
                padding: '15px', 
                backgroundColor: '#f8f9fa', 
                borderRadius: '8px',
                border: `2px solid ${accentColor}`,
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-between',
                minHeight: '150px'
              }}>
                <div style={{ marginBottom: '12px' }}>
                  <div style={{ fontSize: '28px', marginBottom: '8px' }}>📋</div>
                  <strong style={{ fontSize: '15px', color: primaryColor, display: 'block', marginBottom: '4px' }}>
                    GST Certificate
                  </strong>
                  <div style={{ fontSize: '12px', color: '#666' }}>
                    GSTIN: {selectedVendor.gstNumber}
                  </div>
                </div>
                <button 
                  onClick={() => handleViewDocument('gstCertificate', selectedVendor)}
                  style={getDocumentButtonStyles(primaryColor).base}
                  onMouseEnter={(e) => {
                    Object.assign(e.target.style, getDocumentButtonStyles(primaryColor).hover);
                  }}
                  onMouseLeave={(e) => {
                    Object.assign(e.target.style, getDocumentButtonStyles(primaryColor).base);
                  }}
                >
                  📄 View Document
                </button>
              </div>

              {/* Business License Card */}
              <div style={{ 
                padding: '15px', 
                backgroundColor: '#f8f9fa', 
                borderRadius: '8px',
                border: `2px solid ${accentColor}`,
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-between',
                minHeight: '150px'
              }}>
                <div style={{ marginBottom: '12px' }}>
                  <div style={{ fontSize: '28px', marginBottom: '8px' }}>🏢</div>
                  <strong style={{ fontSize: '15px', color: primaryColor, display: 'block', marginBottom: '4px' }}>
                    Business License
                  </strong>
                  <div style={{ fontSize: '12px', color: '#666' }}>
                    License: {selectedVendor.licenseNumber}
                  </div>
                </div>
                <button 
                  onClick={() => handleViewDocument('licenseCopy', selectedVendor)}
                  style={getDocumentButtonStyles(primaryColor).base}
                  onMouseEnter={(e) => {
                    Object.assign(e.target.style, getDocumentButtonStyles(primaryColor).hover);
                  }}
                  onMouseLeave={(e) => {
                    Object.assign(e.target.style, getDocumentButtonStyles(primaryColor).base);
                  }}
                >
                  📄 View Document
                </button>
              </div>
            </div>
            
            {/* Compliance History */}
            {renderComplianceHistory(selectedVendor)}
          </section>

          {/* Stock & Inventory */}
          <section style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            border: `1px solid ${accentColor}`,
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ color: primaryColor, marginBottom: '15px', borderBottom: `2px solid ${accentColor}`, paddingBottom: '10px', textAlign: 'center' }}>C. Stock & Inventory Snapshot</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
              <div style={{ textAlign: 'center', padding: '20px', backgroundColor: accentColor, borderRadius: '8px' }}>
                <div style={{ fontSize: '28px', fontWeight: 'bold', color: primaryColor }}>{selectedVendor.totalMedicines}</div>
                <div style={{ color: primaryColor, fontWeight: '500' }}>Total Medicines</div>
              </div>
              <div style={{ textAlign: 'center', padding: '20px', backgroundColor: '#fff3cd', borderRadius: '8px' }}>
                <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#856404' }}>{selectedVendor.lowStock}</div>
                <div style={{ color: '#856404', fontWeight: '500' }}>Low Stock Alerts</div>
              </div>
              <div style={{ textAlign: 'center', padding: '20px', backgroundColor: '#f8d7da', borderRadius: '8px' }}>
                <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#721c24' }}>{selectedVendor.expiredItems}</div>
                <div style={{ color: '#721c24', fontWeight: '500' }}>Expired Items</div>
              </div>
              <div style={{ textAlign: 'center', padding: '20px', backgroundColor: '#ffeaa7', borderRadius: '8px' }}>
                <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#e17055' }}>{selectedVendor.outOfStock}</div>
                <div style={{ color: '#e17055', fontWeight: '500' }}>Out of Stock</div>
              </div>
            </div>
          </section>

          {/* Sales Summary */}
          <section style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            border: `1px solid ${accentColor}`,
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ color: primaryColor, marginBottom: '15px', borderBottom: `2px solid ${accentColor}`, paddingBottom: '10px', textAlign: 'center' }}>D. Sales Summary</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', marginBottom: '20px' }}>
              <div style={{ textAlign: 'center', padding: '15px', backgroundColor: '#e8f5e8', borderRadius: '8px' }}>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#27ae60' }}>{selectedVendor.totalOrders}</div>
                <div>Total Orders</div>
              </div>
              <div style={{ textAlign: 'center', padding: '15px', backgroundColor: '#fdebd0', borderRadius: '8px' }}>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#e67e22' }}>{selectedVendor.cancelledOrders}</div>
                <div>Cancelled Orders</div>
              </div>
              <div style={{ textAlign: 'center', padding: '15px', backgroundColor: '#e8f4fd', borderRadius: '8px' }}>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#2980b9' }}>₹{selectedVendor.averageOrderValue}</div>
                <div>Avg Order Value</div>
              </div>
              <div style={{ textAlign: 'center', padding: '15px', backgroundColor: '#e8f5e8', borderRadius: '8px' }}>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#27ae60' }}>₹{selectedVendor.monthlyRevenue.toLocaleString()}</div>
                <div>Monthly Revenue</div>
              </div>
              <div style={{ textAlign: 'center', padding: '15px', backgroundColor: '#f0e6ff', borderRadius: '8px' }}>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#6f42c1' }}>
                  {selectedVendor.salesData.daily} {getTrendIcon(selectedVendor.salesData.trend)}
                </div>
                <div>Daily Sales</div>
              </div>
            </div>
            
            {/* Daily Sales Chart */}
            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ color: primaryColor, marginBottom: '15px', textAlign: 'center' }}>Daily Sales Overview</h4>
              <SalesBarChart data={dailySalesData} primaryColor={primaryColor} />
            </div>
          </section>

          {/* Customer Feedback & Ratings */}
          <section style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            border: `1px solid ${accentColor}`,
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ color: primaryColor, marginBottom: '15px', borderBottom: `2px solid ${accentColor}`, paddingBottom: '10px', textAlign: 'center' }}>E. Customer Feedback & Ratings</h3>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <div style={{ fontSize: '32px', fontWeight: 'bold', color: primaryColor }}>
                {selectedVendor.averageRating}/5
              </div>
              <div style={{ fontSize: '24px', color: '#ffc107' }}>
                {'★'.repeat(Math.floor(selectedVendor.averageRating))}{'☆'.repeat(5-Math.floor(selectedVendor.averageRating))}
              </div>
              <div style={{ color: '#666' }}>
                ({selectedVendor.totalReviews} reviews)
              </div>
            </div>
            <div>
              <h4 style={{ color: primaryColor, marginBottom: '10px', textAlign: 'center' }}>Recent Reviews</h4>
              {selectedVendor.recentReviews.length > 0 ? (
                selectedVendor.recentReviews.map(review => (
                  <div key={review.id} style={{ 
                    padding: '15px', 
                    border: '1px solid #eee', 
                    borderRadius: '5px', 
                    marginBottom: '10px',
                    backgroundColor: '#fafafa'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px', flexWrap: 'wrap' }}>
                      <strong>{review.customer}</strong>
                      <span style={{ color: '#666', fontSize: '12px' }}>{review.date}</span>
                    </div>
                    <div style={{ color: '#ffc107', marginBottom: '5px' }}>
                      {'★'.repeat(review.rating)}{'☆'.repeat(5-review.rating)}
                    </div>
                    <div>{review.comment}</div>
                  </div>
                ))
              ) : (
                <div style={{ textAlign: 'center', padding: '20px', color: '#666' }}>
                  No reviews available
                </div>
              )}
            </div>
          </section>

          {/* Products / Medicine Catalog */}
          <section style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            border: `1px solid ${accentColor}`,
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ color: primaryColor, marginBottom: '15px', borderBottom: `2px solid ${accentColor}`, paddingBottom: '10px', textAlign: 'center' }}>F. Products / Medicine Catalog</h3>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ backgroundColor: accentColor }}>
                    <th style={{ padding: '12px', textAlign: 'center', borderBottom: `2px solid ${primaryColor}` }}>Medicine Name</th>
                    <th style={{ padding: '12px', textAlign: 'center', borderBottom: `2px solid ${primaryColor}` }}>Brand</th>
                    <th style={{ padding: '12px', textAlign: 'center', borderBottom: `2px solid ${primaryColor}` }}>Category</th>
                    <th style={{ padding: '12px', textAlign: 'center', borderBottom: `2px solid ${primaryColor}` }}>Quantity</th>
                    <th style={{ padding: '12px', textAlign: 'center', borderBottom: `2px solid ${primaryColor}` }}>Price</th>
                    <th style={{ padding: '12px', textAlign: 'center', borderBottom: `2px solid ${primaryColor}` }}>SKU</th>
                    <th style={{ padding: '12px', textAlign: 'center', borderBottom: `2px solid ${primaryColor}` }}>Expiry</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedVendor.products.length > 0 ? (
                    selectedVendor.products.map(product => (
                      <tr key={product.id} style={{ borderBottom: '1px solid #eee' }}>
                        <td style={{ padding: '12px', textAlign: 'center' }}>{product.name}</td>
                        <td style={{ padding: '12px', textAlign: 'center' }}>{product.brand}</td>
                        <td style={{ padding: '12px', textAlign: 'center' }}>{product.category}</td>
                        <td style={{ padding: '12px', textAlign: 'center' }}>
                          <span style={{
                            padding: '4px 8px',
                            borderRadius: '10px',
                            fontSize: '12px',
                            fontWeight: 'bold',
                            backgroundColor: product.quantity === 0 ? '#f8d7da' : product.quantity < 10 ? '#fff3cd' : '#d4edda',
                            color: product.quantity === 0 ? '#721c24' : product.quantity < 10 ? '#856404' : '#155724'
                          }}>
                            {product.quantity === 0 ? 'Out of Stock' : product.quantity}
                          </span>
                        </td>
                        <td style={{ padding: '12px', textAlign: 'center' }}>₹{product.price}</td>
                        <td style={{ padding: '12px', textAlign: 'center' }}>{product.sku}</td>
                        <td style={{ padding: '12px', textAlign: 'center' }}>{product.expiry}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" style={{ padding: '20px', textAlign: 'center', color: '#666' }}>
                        No products available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>

          {/* Admin Actions */}
          <section style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            border: `1px solid ${accentColor}`,
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ color: primaryColor, marginBottom: '15px', borderBottom: `2px solid ${accentColor}`, paddingBottom: '10px', textAlign: 'center' }}>G. Admin Actions</h3>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
              <button 
                onClick={() => showActionConfirmation('approve', selectedVendor)}
                style={{ 
                  padding: '12px 18px', 
                  backgroundColor: '#28a745', 
                  color: 'white', 
                  border: 'none', 
                  borderRadius: '5px', 
                  cursor: 'pointer', 
                  fontWeight: 'bold',
                  transition: 'all 0.3s ease',
                  minWidth: '120px'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#218838';
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#28a745';
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = 'none';
                }}
              >
                Approve
              </button>
              <button 
                onClick={() => showActionConfirmation('reject', selectedVendor)}
                style={{ 
                  padding: '12px 18px', 
                  backgroundColor: '#dc3545', 
                  color: 'white', 
                  border: 'none', 
                  borderRadius: '5px', 
                  cursor: 'pointer', 
                  fontWeight: 'bold',
                  transition: 'all 0.3s ease',
                  minWidth: '120px'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#c82333';
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#dc3545';
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = 'none';
                }}
              >
                Reject
              </button>
              <button 
                onClick={() => showActionConfirmation('request-resubmit', selectedVendor)}
                style={{ 
                  padding: '12px 18px', 
                  backgroundColor: '#ffc107', 
                  color: 'black', 
                  border: 'none', 
                  borderRadius: '5px', 
                  cursor: 'pointer', 
                  fontWeight: 'bold',
                  transition: 'all 0.3s ease',
                  minWidth: '120px'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#e0a800';
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#ffc107';
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = 'none';
                }}
              >
                Request Re-submit
              </button>
              <button 
                onClick={() => handleDirectAdminAction('edit-profile', selectedVendor)}
                style={{ 
                  padding: '12px 18px', 
                  backgroundColor: primaryColor, 
                  color: 'white', 
                  border: 'none', 
                  borderRadius: '5px', 
                  cursor: 'pointer', 
                  fontWeight: 'bold',
                  transition: 'all 0.3s ease',
                  minWidth: '120px'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#6a2458';
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
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
                onClick={() => showActionConfirmation('suspend', selectedVendor)}
                style={{ 
                  padding: '12px 18px', 
                  backgroundColor: '#6c757d', 
                  color: 'white', 
                  border: 'none', 
                  borderRadius: '5px', 
                  cursor: 'pointer', 
                  fontWeight: 'bold',
                  transition: 'all 0.3s ease',
                  minWidth: '120px'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#5a6268';
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#6c757d';
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = 'none';
                }}
              >
                Suspend Vendor
              </button>
              <button 
                onClick={() => showActionConfirmation('blacklist', selectedVendor)}
                style={{ 
                  padding: '12px 18px', 
                  backgroundColor: '#343a40', 
                  color: 'white', 
                  border: 'none', 
                  borderRadius: '5px', 
                  cursor: 'pointer', 
                  fontWeight: 'bold',
                  transition: 'all 0.3s ease',
                  minWidth: '120px'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#23272b';
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#343a40';
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = 'none';
                }}
              >
                Blacklist Vendor
              </button>
              <button 
                onClick={() => showActionConfirmation('send-warning', selectedVendor)}
                style={{ 
                  padding: '12px 18px', 
                  backgroundColor: '#17a2b8', 
                  color: 'white', 
                  border: 'none', 
                  borderRadius: '5px', 
                  cursor: 'pointer', 
                  fontWeight: 'bold',
                  transition: 'all 0.3s ease',
                  minWidth: '120px'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#138496';
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#17a2b8';
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = 'none';
                }}
              >
                Send Warning
              </button>
              <button 
                onClick={() => handleDirectAdminAction('open-support', selectedVendor)}
                style={{ 
                  padding: '12px 18px', 
                  backgroundColor: '#6610f2', 
                  color: 'white', 
                  border: 'none', 
                  borderRadius: '5px', 
                  cursor: 'pointer', 
                  fontWeight: 'bold',
                  transition: 'all 0.3s ease',
                  minWidth: '120px'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#560bd0';
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#6610f2';
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = 'none';
                }}
              >
                Open Support
              </button>
            </div>
          </section>
        </div>
      )}

      {!selectedVendor && !showAllVendors && searchQuery && (
        <div style={{ textAlign: 'center', padding: '40px', color: '#666', backgroundColor: 'white', borderRadius: '8px' }}>
          <h3 style={{ color: '#999' }}>No vendor found</h3>
          <p>No vendor found with the search criteria "{searchQuery}"</p>
          <button 
            onClick={handleShowAllVendors}
            style={{
              marginTop: '15px',
              padding: '12px 24px',
              backgroundColor: primaryColor,
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              minWidth: '140px'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#6a2458';
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = primaryColor;
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = 'none';
            }}
          >
            View All Vendors
          </button>
        </div>
      )}
    </div>
  );
};

export default VendorLookup;