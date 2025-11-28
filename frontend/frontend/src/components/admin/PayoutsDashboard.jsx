import React, { useState } from 'react';

const PayoutsDashboard = () => {
  const primaryColor = '#7C2A62';
  const accentColor = '#F7D9EB';
  
  const [activeTab, setActiveTab] = useState('summary');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [showAgentProfile, setShowAgentProfile] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [showVendorLedger, setShowVendorLedger] = useState(false);
  const [showPaymentRelease, setShowPaymentRelease] = useState(false);
  const [vendorSearchTerm, setVendorSearchTerm] = useState('');
  const [refundSearchTerm, setRefundSearchTerm] = useState('');
  const [selectedRefund, setSelectedRefund] = useState(null);
  const [showRefundDetails, setShowRefundDetails] = useState(false);
  const [showRefundTracking, setShowRefundTracking] = useState(false);

  // Mock data
  const payoutSummary = {
    pendingPayouts: '₹1,45,670',
    processedThisWeek: '₹2,89,123',
    nextSettlement: '2024-01-15',
    paymentMethods: [
      { name: 'UPI', status: 'Active' },
      { name: 'Bank Transfer', status: 'Active' },
      { name: 'Wallet', status: 'Inactive' }
    ]
  };

  // Enhanced Vendors Data
  const vendors = [
    {
      id: 'V001',
      vendorId: 'V001',
      name: 'MedPlus Pharmacy',
      phone: '+91-9876543201',
      gstin: '29AABCU9603R1ZM',
      license: 'PHARM123456',
      address: '123 MG Road, Bangalore - 560001',
      earnings: '₹45,670',
      pendingAmount: '₹45,670',
      lastSettlement: '2024-01-08',
      status: 'Pending',
      bankDetails: {
        accountNumber: 'XXXXXX1234',
        bankName: 'HDFC Bank',
        ifsc: 'HDFC0000123',
        upi: 'medplus.pharmacy@hdfc'
      },
      ledger: [
        {
          orderId: 'ORD-1001',
          date: '2024-01-14',
          product: 'Paracetamol 500mg',
          orderAmount: '₹450',
          platformCommission: '₹45 (10%)',
          refundDeduction: '₹0',
          promotionalDiscount: '₹0',
          tds: '₹22.5 (5%)',
          gst: '₹40.5 (9%)',
          vendorEarning: '₹342',
          status: 'Delivered'
        },
        {
          orderId: 'ORD-1002',
          date: '2024-01-14',
          product: 'Vitamin C tablets',
          orderAmount: '₹320',
          platformCommission: '₹32 (10%)',
          refundDeduction: '₹0',
          promotionalDiscount: '₹20',
          tds: '₹16 (5%)',
          gst: '₹28.8 (9%)',
          vendorEarning: '₹223.2',
          status: 'Delivered'
        },
        {
          orderId: 'ORD-1003',
          date: '2024-01-13',
          product: 'Amoxicillin 250mg',
          orderAmount: '₹280',
          platformCommission: '₹28 (10%)',
          refundDeduction: '₹280',
          promotionalDiscount: '₹0',
          tds: '₹0',
          gst: '₹0',
          vendorEarning: '₹-280',
          status: 'Refunded'
        }
      ],
      auditLogs: [
        {
          action: 'Payment Released',
          user: 'Finance Admin',
          timestamp: '2024-01-08 14:30:00',
          reference: 'TXN-789012',
          amount: '₹38,450'
        },
        {
          action: 'Payment Released',
          user: 'Finance Admin',
          timestamp: '2024-01-01 11:15:00',
          reference: 'TXN-789011',
          amount: '₹42,180'
        }
      ]
    },
    {
      id: 'V002',
      vendorId: 'V002',
      name: 'Apollo Pharmacy',
      phone: '+91-9876543202',
      gstin: '29AABCU9603R1ZN',
      license: 'PHARM123457',
      address: '456 Koramangala, Bangalore - 560034',
      earnings: '₹38,920',
      pendingAmount: '₹0',
      lastSettlement: '2024-01-08',
      status: 'Settled',
      bankDetails: {
        accountNumber: 'XXXXXX5678',
        bankName: 'ICICI Bank',
        ifsc: 'ICIC0000456',
        upi: 'apollo.pharmacy@icici'
      },
      ledger: [
        {
          orderId: 'ORD-2001',
          date: '2024-01-14',
          product: 'Aspirin 75mg',
          orderAmount: '₹180',
          platformCommission: '₹18 (10%)',
          refundDeduction: '₹0',
          promotionalDiscount: '₹0',
          tds: '₹9 (5%)',
          gst: '₹16.2 (9%)',
          vendorEarning: '₹136.8',
          status: 'Delivered'
        }
      ],
      auditLogs: [
        {
          action: 'Payment Released',
          user: 'Finance Admin',
          timestamp: '2024-01-08 15:45:00',
          reference: 'TXN-789013',
          amount: '₹38,920'
        }
      ]
    },
    {
      id: 'V003',
      vendorId: 'V003',
      name: 'Wellness Forever',
      phone: '+91-9876543203',
      gstin: '29AABCU9603R1ZO',
      license: 'PHARM123458',
      address: '789 Indiranagar, Bangalore - 560038',
      earnings: '₹29,450',
      pendingAmount: '₹29,450',
      lastSettlement: '2024-01-07',
      status: 'In Process',
      bankDetails: {
        accountNumber: 'XXXXXX9012',
        bankName: 'Axis Bank',
        ifsc: 'UTIB0000789',
        upi: 'wellness.forever@axis'
      },
      ledger: [
        {
          orderId: 'ORD-3001',
          date: '2024-01-14',
          product: 'Multivitamin Capsules',
          orderAmount: '₹650',
          platformCommission: '₹65 (10%)',
          refundDeduction: '₹0',
          promotionalDiscount: '₹50',
          tds: '₹32.5 (5%)',
          gst: '₹58.5 (9%)',
          vendorEarning: '₹494',
          status: 'Delivered'
        }
      ],
      auditLogs: [
        {
          action: 'Payment Initiated',
          user: 'System',
          timestamp: '2024-01-07 16:20:00',
          reference: 'TXN-789014',
          amount: '₹29,450'
        }
      ]
    }
  ];

  // Delivery Agents Data
  const deliveryAgents = [
    {
      id: 'DA-001',
      agentId: 'DA-001',
      name: 'Raj Kumar',
      phone: '+91-9876543210',
      email: 'raj.kumar@quickmed.com',
      address: '123 MG Road, Bangalore',
      deliveriesCompleted: 245,
      onTimeRate: 92,
      averageDuration: '28 mins',
      complaints: 3,
      status: 'Active',
      kyc: {
        aadhaar: 'verified',
        license: 'verified',
        vehicle: 'verified'
      },
      performance: {
        currentWeek: 94,
        lastWeek: 89,
        lastMonth: 91
      },
      incentives: 1250,
      penalties: 200,
      earnings: '₹45,820',
      joinDate: '2023-06-15',
      vehicle: {
        type: 'Bike',
        number: 'KA01AB1234'
      }
    },
    {
      id: 'DA-002',
      agentId: 'DA-002',
      name: 'Suresh Patel',
      phone: '+91-9876543211',
      email: 'suresh.patel@quickmed.com',
      address: '456 Koramangala, Bangalore',
      deliveriesCompleted: 189,
      onTimeRate: 78,
      averageDuration: '35 mins',
      complaints: 8,
      status: 'Suspended',
      kyc: {
        aadhaar: 'verified',
        license: 'verified',
        vehicle: 'expired'
      },
      performance: {
        currentWeek: 76,
        lastWeek: 82,
        lastMonth: 79
      },
      incentives: 850,
      penalties: 500,
      earnings: '₹32,150',
      joinDate: '2023-08-22',
      vehicle: {
        type: 'Bike',
        number: 'KA01CD5678'
      }
    }
  ];

  // Refunds & Chargebacks Data
  const refunds = [
    {
      id: 'REF-001',
      refundId: 'REF-001',
      orderId: 'ORD-1003',
      affectedParty: {
        type: 'Vendor',
        id: 'V001',
        name: 'MedPlus Pharmacy'
      },
      amount: '₹280',
      reason: 'Damaged Medicine - Broken seal and crushed tablets',
      status: 'Completed',
      createdAt: '2024-01-13',
      completedAt: '2024-01-14',
      customer: {
        name: 'John Wilson',
        phone: '+91-987650001',
        email: 'john.wilson@email.com'
      },
      evidence: [
        'damaged_medicine_1.jpg',
        'damaged_medicine_2.jpg'
      ],
      auditLogs: [
        {
          action: 'Refund Approved',
          user: 'Finance Admin',
          timestamp: '2024-01-13 14:30:00',
          note: 'Verified evidence - approved refund',
          reference: 'TXN-REF-789001'
        },
        {
          action: 'Refund Processed',
          user: 'System',
          timestamp: '2024-01-14 10:15:00',
          note: 'Refund completed via UPI',
          reference: 'PG-REF-456123'
        }
      ],
      payoutAdjustment: {
        type: 'Vendor',
        partyId: 'V001',
        amount: '₹280',
        status: 'Deducted'
      }
    },
    {
      id: 'REF-002',
      refundId: 'REF-002',
      orderId: 'ORD-2002',
      affectedParty: {
        type: 'Delivery Agent',
        id: 'DA-002',
        name: 'Suresh Patel'
      },
      amount: '₹150',
      reason: 'Late Delivery - Order delivered 3 hours late',
      status: 'Processing',
      createdAt: '2024-01-14',
      customer: {
        name: 'Kaha Rao',
        phone: '+91-987650002',
        email: 'kaha.rao@email.com'
      },
      evidence: [
        'delivery_timestamp.jpg'
      ],
      auditLogs: [
        {
          action: 'Refund Approved',
          user: 'Finance Admin',
          timestamp: '2024-01-14 16:20:00',
          note: 'Confirmed delivery delay - approved refund',
          reference: 'TXN-REF-789002'
        }
      ],
      payoutAdjustment: {
        type: 'Delivery Agent',
        partyId: 'DA-002',
        amount: '₹150',
        status: 'Pending'
      }
    },
    {
      id: 'REF-003',
      refundId: 'REF-003',
      orderId: 'ORD-3002',
      affectedParty: {
        type: 'Vendor',
        id: 'V003',
        name: 'Wellness Forever'
      },
      amount: '₹320',
      reason: 'Incorrect Item - Wrong medication received',
      status: 'Pending',
      createdAt: '2024-01-15',
      customer: {
        name: 'Ali Khan',
        phone: '+91-987650003',
        email: 'ali.khan@email.com'
      },
      evidence: [
        'prescription_copy.jpg',
        'received_item.jpg'
      ],
      auditLogs: [
        {
          action: 'Refund Requested',
          user: 'Support Agent',
          timestamp: '2024-01-15 09:15:00',
          note: 'Customer reported wrong item - needs review',
          reference: null
        }
      ],
      payoutAdjustment: {
        type: 'Vendor',
        partyId: 'V003',
        amount: '₹320',
        status: 'Pending'
      }
    },
    {
      id: 'REF-004',
      refundId: 'REF-004',
      orderId: 'ORD-4001',
      affectedParty: {
        type: 'Delivery Agent',
        id: 'DA-001',
        name: 'Raj Kumar'
      },
      amount: '₹200',
      reason: 'Missing Item - Package was tampered with',
      status: 'Completed',
      createdAt: '2024-01-12',
      completedAt: '2024-01-13',
      customer: {
        name: 'Priya Singh',
        phone: '+91-987650004',
        email: 'priya.singh@email.com'
      },
      evidence: [
        'tampered_package.jpg'
      ],
      auditLogs: [
        {
          action: 'Refund Approved',
          user: 'Finance Admin',
          timestamp: '2024-01-12 15:45:00',
          note: 'Package tampering confirmed - approved refund',
          reference: 'TXN-REF-789003'
        },
        {
          action: 'Refund Processed',
          user: 'System',
          timestamp: '2024-01-13 11:30:00',
          note: 'Refund completed via Bank Transfer',
          reference: 'PG-REF-456124'
        }
      ],
      payoutAdjustment: {
        type: 'Delivery Agent',
        partyId: 'DA-001',
        amount: '₹200',
        status: 'Deducted'
      }
    }
  ];

  // KPI Calculations
  const deliveryKPIs = {
    activeAgents: deliveryAgents.filter(agent => agent.status === 'Active').length,
    onTimeDeliveryRate: Math.round(deliveryAgents.reduce((sum, agent) => sum + agent.onTimeRate, 0) / deliveryAgents.length),
    averageDeliveryDuration: '30 mins',
    complaintsLast7Days: deliveryAgents.reduce((sum, agent) => sum + agent.complaints, 0)
  };

  // Refund KPIs
  const refundKPIs = {
    totalRefunds: refunds.length,
    pendingRefunds: refunds.filter(refund => refund.status === 'Pending').length,
    totalRefundAmount: '₹950',
    avgProcessingTime: '1.5 days'
  };

  const filteredAgents = deliveryAgents.filter(agent =>
    agent.agentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agent.phone.includes(searchTerm)
  );

  const filteredVendors = vendors.filter(vendor =>
    vendor.vendorId.toLowerCase().includes(vendorSearchTerm.toLowerCase()) ||
    vendor.name.toLowerCase().includes(vendorSearchTerm.toLowerCase()) ||
    vendor.phone.includes(vendorSearchTerm) ||
    vendor.gstin.toLowerCase().includes(vendorSearchTerm.toLowerCase()) ||
    vendor.license.toLowerCase().includes(vendorSearchTerm.toLowerCase()) ||
    vendor.address.toLowerCase().includes(vendorSearchTerm.toLowerCase())
  );

  const filteredRefunds = refunds.filter(refund =>
    refund.refundId.toLowerCase().includes(refundSearchTerm.toLowerCase()) ||
    refund.orderId.toLowerCase().includes(refundSearchTerm.toLowerCase()) ||
    refund.affectedParty.name.toLowerCase().includes(refundSearchTerm.toLowerCase()) ||
    refund.customer.name.toLowerCase().includes(refundSearchTerm.toLowerCase())
  );

  // Vendor Actions
  const handleReleasePayment = (vendor) => {
    setSelectedVendor(vendor);
    setShowPaymentRelease(true);
  };

  const handleViewLedger = (vendor) => {
    setSelectedVendor(vendor);
    setShowVendorLedger(true);
  };

  const handleDownloadReceipt = (vendor) => {
    alert(`Downloading receipt for ${vendor.name} - Amount: ${vendor.earnings}`);
  };

  const confirmPaymentRelease = () => {
    if (selectedVendor) {
      alert(`Payment of ${selectedVendor.earnings} released to ${selectedVendor.name}\nTransaction Reference: TXN-${Date.now()}`);
      setShowPaymentRelease(false);
    }
  };

  // Refund Actions
  const handleReviewRefund = (refund) => {
    setSelectedRefund(refund);
    setShowRefundDetails(true);
  };

  const handleTrackRefund = (refund) => {
    setSelectedRefund(refund);
    setShowRefundTracking(true);
  };

  const handleDownloadRefundReceipt = (refund) => {
    alert(`Downloading refund receipt for ${refund.refundId} - Amount: ${refund.amount}`);
  };

  const handleApproveRefund = (refundId) => {
    alert(`Refund ${refundId} approved and queued for processing`);
    setShowRefundDetails(false);
  };

  const handleRejectRefund = (refundId) => {
    alert(`Refund ${refundId} rejected`);
    setShowRefundDetails(false);
  };

  const exportRefundData = () => {
    alert('Exporting refund data to Excel/CSV format');
  };

  // Status Color Functions
  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return '#28a745';
      case 'Suspended': return '#dc3545';
      case 'Inactive': return '#6c757d';
      default: return '#6c757d';
    }
  };

  const getVendorStatusColor = (status) => {
    switch (status) {
      case 'Pending': return '#ffc107';
      case 'In Process': return '#17a2b8';
      case 'Settled': return '#28a745';
      default: return '#6c757d';
    }
  };

  const getRefundStatusColor = (status) => {
    switch (status) {
      case 'Pending': return '#ffc107';
      case 'Processing': return '#17a2b8';
      case 'Completed': return '#28a745';
      default: return '#6c757d';
    }
  };

  const getPerformanceColor = (percentage) => {
    if (percentage >= 90) return '#28a745';
    if (percentage >= 80) return '#ffc107';
    return '#dc3545';
  };

  // Button hover styles
  const buttonStyle = {
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '14px',
    transition: 'all 0.3s ease',
    ':hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
    }
  };

  const primaryButtonStyle = {
    ...buttonStyle,
    backgroundColor: primaryColor,
    color: 'white',
  };

  const secondaryButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#6c757d',
    color: 'white',
  };

  const successButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#28a745',
    color: 'white',
  };

  const dangerButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#dc3545',
    color: 'white',
  };

  const infoButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#17a2b8',
    color: 'white',
  };

  const warningButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#ffc107',
    color: '#212529',
  };

  // Table row hover style
  const tableRowStyle = {
    transition: 'all 0.3s ease',
    ':hover': {
      backgroundColor: '#f8f9fa',
      transform: 'translateY(-1px)',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }
  };

  // Card hover style
  const cardHoverStyle = {
    transition: 'all 0.3s ease',
    ':hover': {
      transform: 'translateY(-3px)',
      boxShadow: '0 6px 12px rgba(0,0,0,0.15)'
    }
  };

  // Refund Details Component
  const RefundDetails = ({ refund, onClose, onApprove, onReject }) => {
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
        zIndex: 1000
      }}>
        <div style={{
          backgroundColor: 'white',
          borderRadius: '10px',
          padding: '30px',
          width: '95%',
          maxWidth: '1000px',
          maxHeight: '90vh',
          overflowY: 'auto'
        }}>
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <div>
              <h2 style={{ color: primaryColor, margin: 0 }}>Refund Details - {refund.refundId}</h2>
              <p style={{ margin: '5px 0 0', color: '#666' }}>Order ID: {refund.orderId}</p>
            </div>
            <button
              onClick={onClose}
              style={{
                backgroundColor: 'transparent',
                border: 'none',
                fontSize: '24px',
                cursor: 'pointer',
                color: '#666',
                transition: 'color 0.3s ease',
                ':hover': { color: primaryColor }
              }}
            >
              ×
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
            {/* Left Column - Refund Information */}
            <div>
              <h3 style={{ color: primaryColor, marginBottom: '15px' }}>Refund Information</h3>
              <div style={{ display: 'grid', gap: '10px' }}>
                <div><strong>Refund ID:</strong> {refund.refundId}</div>
                <div><strong>Order ID:</strong> {refund.orderId}</div>
                <div><strong>Amount:</strong> <span style={{ fontWeight: 'bold', color: '#dc3545' }}>{refund.amount}</span></div>
                <div><strong>Status:</strong> 
                  <span style={{
                    marginLeft: '10px',
                    padding: '4px 8px',
                    borderRadius: '12px',
                    fontSize: '12px',
                    backgroundColor: getRefundStatusColor(refund.status),
                    color: 'white'
                  }}>
                    {refund.status}
                  </span>
                </div>
                <div><strong>Created:</strong> {refund.createdAt}</div>
                {refund.completedAt && <div><strong>Completed:</strong> {refund.completedAt}</div>}
              </div>

              <h4 style={{ color: primaryColor, margin: '20px 0 10px' }}>Customer Details</h4>
              <div style={{ backgroundColor: '#f8f9fa', padding: '15px', borderRadius: '5px' }}>
                <div><strong>Name:</strong> {refund.customer.name}</div>
                <div><strong>Phone:</strong> {refund.customer.phone}</div>
                <div><strong>Email:</strong> {refund.customer.email}</div>
              </div>

              <h4 style={{ color: primaryColor, margin: '20px 0 10px' }}>Affected Party</h4>
              <div style={{ backgroundColor: '#f8f9fa', padding: '15px', borderRadius: '5px' }}>
                <div><strong>Type:</strong> {refund.affectedParty.type}</div>
                <div><strong>Name:</strong> {refund.affectedParty.name}</div>
                <div><strong>ID:</strong> {refund.affectedParty.id}</div>
                <div><strong>Payout Adjustment:</strong> 
                  <span style={{ 
                    marginLeft: '10px',
                    color: refund.payoutAdjustment.status === 'Deducted' ? '#dc3545' : '#ffc107',
                    fontWeight: 'bold'
                  }}>
                    {refund.payoutAdjustment.amount} ({refund.payoutAdjustment.status})
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column - Evidence & Actions */}
            <div>
              <h3 style={{ color: primaryColor, marginBottom: '15px' }}>Refund Reason & Evidence</h3>
              <div style={{ backgroundColor: '#f8f9fa', padding: '15px', borderRadius: '5px', marginBottom: '20px' }}>
                <p><strong>Reason:</strong> {refund.reason}</p>
              </div>

              {refund.evidence.length > 0 && (
                <div style={{ marginBottom: '20px' }}>
                  <h4 style={{ color: primaryColor, marginBottom: '10px' }}>Evidence Files</h4>
                  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    {refund.evidence.map((file, index) => (
                      <div key={index} style={{
                        padding: '8px 12px',
                        backgroundColor: accentColor,
                        borderRadius: '5px',
                        fontSize: '12px',
                        transition: 'all 0.3s ease',
                        cursor: 'pointer',
                        ':hover': {
                          backgroundColor: primaryColor,
                          color: 'white',
                          transform: 'translateY(-2px)'
                        }
                      }}>
                        📎 {file}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              {refund.status === 'Pending' && (
                <div style={{ marginBottom: '20px' }}>
                  <h4 style={{ color: primaryColor, marginBottom: '10px' }}>Refund Actions</h4>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button
                      onClick={() => onApprove(refund.refundId)}
                      style={{
                        ...successButtonStyle,
                        padding: '10px 20px'
                      }}
                    >
                      Approve Refund
                    </button>
                    <button
                      onClick={() => onReject(refund.refundId)}
                      style={{
                        ...dangerButtonStyle,
                        padding: '10px 20px'
                      }}
                    >
                      Reject Refund
                    </button>
                  </div>
                </div>
              )}

              {/* Audit Logs */}
              <h4 style={{ color: primaryColor, marginBottom: '10px' }}>Audit Logs</h4>
              <div style={{ backgroundColor: '#f8f9fa', padding: '15px', borderRadius: '5px', maxHeight: '200px', overflowY: 'auto' }}>
                {refund.auditLogs.map((log, index) => (
                  <div key={index} style={{ 
                    padding: '8px 0',
                    borderBottom: index < refund.auditLogs.length - 1 ? '1px solid #ddd' : 'none',
                    transition: 'background-color 0.3s ease',
                    ':hover': {
                      backgroundColor: '#e9ecef'
                    }
                  }}>
                    <div style={{ fontSize: '12px', fontWeight: 'bold' }}>{log.action}</div>
                    <div style={{ fontSize: '11px', color: '#666' }}>
                      By {log.user} at {log.timestamp}
                    </div>
                    {log.note && <div style={{ fontSize: '11px', color: '#666' }}>Note: {log.note}</div>}
                    {log.reference && <div style={{ fontSize: '11px', color: '#666' }}>Reference: {log.reference}</div>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Refund Tracking Component
  const RefundTracking = ({ refund, onClose }) => {
    const trackingSteps = [
      { step: 'Refund Requested', status: 'completed', time: refund.createdAt },
      { step: 'Under Review', status: refund.status === 'Pending' ? 'current' : 'completed', time: refund.auditLogs[0]?.timestamp },
      { step: 'Approval', status: refund.status === 'Processing' || refund.status === 'Completed' ? 'completed' : 'pending', time: refund.auditLogs.find(log => log.action === 'Refund Approved')?.timestamp },
      { step: 'Processing', status: refund.status === 'Processing' ? 'current' : refund.status === 'Completed' ? 'completed' : 'pending', time: null },
      { step: 'Completed', status: refund.status === 'Completed' ? 'completed' : 'pending', time: refund.completedAt }
    ];

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
        zIndex: 1000
      }}>
        <div style={{
          backgroundColor: 'white',
          borderRadius: '10px',
          padding: '30px',
          width: '90%',
          maxWidth: '600px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2 style={{ color: primaryColor, margin: 0 }}>Refund Tracking - {refund.refundId}</h2>
            <button
              onClick={onClose}
              style={{
                backgroundColor: 'transparent',
                border: 'none',
                fontSize: '24px',
                cursor: 'pointer',
                color: '#666',
                transition: 'color 0.3s ease',
                ':hover': { color: primaryColor }
              }}
            >
              ×
            </button>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <span><strong>Order ID:</strong> {refund.orderId}</span>
              <span><strong>Amount:</strong> {refund.amount}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span><strong>Customer:</strong> {refund.customer.name}</span>
              <span style={{
                padding: '4px 8px',
                borderRadius: '12px',
                fontSize: '12px',
                backgroundColor: getRefundStatusColor(refund.status),
                color: 'white'
              }}>
                {refund.status}
              </span>
            </div>
          </div>

          {/* Tracking Timeline */}
          <div style={{ borderLeft: '2px solid #e9ecef', paddingLeft: '20px', marginLeft: '10px' }}>
            {trackingSteps.map((step, index) => (
              <div key={index} style={{ marginBottom: '25px', position: 'relative' }}>
                <div style={{
                  position: 'absolute',
                  left: '-26px',
                  top: '0',
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  backgroundColor: 
                    step.status === 'completed' ? '#28a745' :
                    step.status === 'current' ? '#17a2b8' : '#6c757d',
                  transition: 'all 0.3s ease'
                }} />
                <div style={{ fontWeight: 'bold', color: step.status === 'pending' ? '#6c757d' : '#212529' }}>
                  {step.step}
                </div>
                {step.time && (
                  <div style={{ fontSize: '12px', color: '#666', marginTop: '5px' }}>
                    {step.time}
                  </div>
                )}
              </div>
            ))}
          </div>

          {refund.status === 'Processing' && (
            <div style={{
              backgroundColor: '#e7f3ff',
              padding: '15px',
              borderRadius: '5px',
              marginTop: '20px',
              textAlign: 'center',
              transition: 'all 0.3s ease',
              ':hover': {
                backgroundColor: '#d1e7ff'
              }
            }}>
              <div style={{ fontWeight: 'bold', color: primaryColor }}>Refund is being processed</div>
              <div style={{ fontSize: '12px', color: '#666', marginTop: '5px' }}>
                Expected completion within 24-48 hours
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  // Delivery Agent Profile Component
  const DeliveryAgentProfile = ({ agent, onClose }) => {
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
        zIndex: 1000
      }}>
        <div style={{
          backgroundColor: 'white',
          borderRadius: '10px',
          padding: '30px',
          width: '90%',
          maxWidth: '800px',
          maxHeight: '90vh',
          overflowY: 'auto'
        }}>
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2 style={{ color: primaryColor, margin: 0 }}>Delivery Agent Profile</h2>
            <button
              onClick={onClose}
              style={{
                backgroundColor: 'transparent',
                border: 'none',
                fontSize: '24px',
                cursor: 'pointer',
                color: '#666',
                transition: 'color 0.3s ease',
                ':hover': { color: primaryColor }
              }}
            >
              ×
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
            {/* Left Column - Personal Details */}
            <div>
              <h3 style={{ color: primaryColor, marginBottom: '15px' }}>Personal Details</h3>
              <div style={{ display: 'grid', gap: '10px' }}>
                <div><strong>Name:</strong> {agent.name}</div>
                <div><strong>Agent ID:</strong> {agent.agentId}</div>
                <div><strong>Phone:</strong> {agent.phone}</div>
                <div><strong>Email:</strong> {agent.email}</div>
                <div><strong>Address:</strong> {agent.address}</div>
                <div><strong>Join Date:</strong> {agent.joinDate}</div>
                <div><strong>Vehicle:</strong> {agent.vehicle.type} ({agent.vehicle.number})</div>
              </div>

              <h4 style={{ color: primaryColor, margin: '20px 0 10px' }}>KYC & Verification</h4>
              <div style={{ display: 'grid', gap: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Aadhaar:</span>
                  <span style={{
                    color: agent.kyc.aadhaar === 'verified' ? '#28a745' : '#dc3545',
                    fontWeight: 'bold'
                  }}>
                    {agent.kyc.aadhaar.toUpperCase()}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>License:</span>
                  <span style={{
                    color: agent.kyc.license === 'verified' ? '#28a745' : '#dc3545',
                    fontWeight: 'bold'
                  }}>
                    {agent.kyc.license.toUpperCase()}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Vehicle:</span>
                  <span style={{
                    color: agent.kyc.vehicle === 'verified' ? '#28a745' : '#dc3545',
                    fontWeight: 'bold'
                  }}>
                    {agent.kyc.vehicle.toUpperCase()}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column - Performance & Actions */}
            <div>
              <h3 style={{ color: primaryColor, marginBottom: '15px' }}>Performance Metrics</h3>
              <div style={{ display: 'grid', gap: '15px' }}>
                <div style={{
                  padding: '15px',
                  backgroundColor: '#f8f9fa',
                  borderRadius: '8px',
                  textAlign: 'center',
                  transition: 'all 0.3s ease',
                  ':hover': {
                    transform: 'translateY(-3px)',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                  }
                }}>
                  <div style={{ fontSize: '12px', color: '#666' }}>On-Time Delivery Rate</div>
                  <div style={{ fontSize: '24px', fontWeight: 'bold', color: getPerformanceColor(agent.onTimeRate) }}>
                    {agent.onTimeRate}%
                  </div>
                </div>

                <div style={{
                  padding: '15px',
                  backgroundColor: '#f8f9fa',
                  borderRadius: '8px',
                  transition: 'all 0.3s ease',
                  ':hover': {
                    transform: 'translateY(-3px)',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                  }
                }}>
                  <div style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '10px' }}>Performance Trend</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                    <div>Current Week: <strong>{agent.performance.currentWeek}%</strong></div>
                    <div>Last Week: <strong>{agent.performance.lastWeek}%</strong></div>
                    <div>Last Month: <strong>{agent.performance.lastMonth}%</strong></div>
                  </div>
                </div>

                <div style={{
                  padding: '15px',
                  backgroundColor: '#f8f9fa',
                  borderRadius: '8px',
                  transition: 'all 0.3s ease',
                  ':hover': {
                    transform: 'translateY(-3px)',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                  }
                }}>
                  <div style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '10px' }}>Financial Summary</div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '12px' }}>
                    <div>Total Earnings: <strong>{agent.earnings}</strong></div>
                    <div>Incentives: <strong style={{ color: '#28a745' }}>₹{agent.incentives}</strong></div>
                    <div>Penalties: <strong style={{ color: '#dc3545' }}>₹{agent.penalties}</strong></div>
                    <div>Net Payout: <strong>₹{parseInt(agent.earnings.replace('₹', '').replace(',', '')) + agent.incentives - agent.penalties}</strong></div>
                  </div>
                </div>
              </div>

              <h4 style={{ color: primaryColor, margin: '20px 0 10px' }}>Agent Actions</h4>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {agent.status !== 'Suspended' && (
                  <button
                    onClick={() => handleSuspendAgent(agent.agentId)}
                    style={{
                      ...dangerButtonStyle,
                      padding: '8px 16px',
                      fontSize: '12px'
                    }}
                  >
                    Suspend Agent
                  </button>
                )}
                {agent.status === 'Suspended' && (
                  <button
                    onClick={() => handleReinstateAgent(agent.agentId)}
                    style={{
                      ...successButtonStyle,
                      padding: '8px 16px',
                      fontSize: '12px'
                    }}
                  >
                    Reinstate Agent
                  </button>
                )}
                <button
                  onClick={() => handleAdjustIncentives(agent.agentId)}
                  style={{
                    ...primaryButtonStyle,
                    padding: '8px 16px',
                    fontSize: '12px'
                  }}
                >
                  Adjust Incentives
                </button>
                <button
                  style={{
                    ...infoButtonStyle,
                    padding: '8px 16px',
                    fontSize: '12px'
                  }}
                >
                  View Earnings
                </button>
              </div>
            </div>
          </div>

          {/* Delivery History & Complaints */}
          <div style={{ marginTop: '30px' }}>
            <h3 style={{ color: primaryColor, marginBottom: '15px' }}>Delivery Statistics</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '15px', textAlign: 'center' }}>
              <div style={{ 
                padding: '15px', 
                backgroundColor: '#e7f3ff', 
                borderRadius: '8px',
                transition: 'all 0.3s ease',
                ':hover': {
                  transform: 'translateY(-3px)',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                }
              }}>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: primaryColor }}>{agent.deliveriesCompleted}</div>
                <div style={{ fontSize: '12px', color: '#666' }}>Total Deliveries</div>
              </div>
              <div style={{ 
                padding: '15px', 
                backgroundColor: '#e7f3ff', 
                borderRadius: '8px',
                transition: 'all 0.3s ease',
                ':hover': {
                  transform: 'translateY(-3px)',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                }
              }}>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: primaryColor }}>{agent.onTimeRate}%</div>
                <div style={{ fontSize: '12px', color: '#666' }}>On-Time Rate</div>
              </div>
              <div style={{ 
                padding: '15px', 
                backgroundColor: '#e7f3ff', 
                borderRadius: '8px',
                transition: 'all 0.3s ease',
                ':hover': {
                  transform: 'translateY(-3px)',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                }
              }}>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: primaryColor }}>{agent.averageDuration}</div>
                <div style={{ fontSize: '12px', color: '#666' }}>Avg. Duration</div>
              </div>
              <div style={{ 
                padding: '15px', 
                backgroundColor: '#e7f3ff', 
                borderRadius: '8px',
                transition: 'all 0.3s ease',
                ':hover': {
                  transform: 'translateY(-3px)',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                }
              }}>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: primaryColor }}>{agent.complaints}</div>
                <div style={{ fontSize: '12px', color: '#666' }}>Complaints</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Vendor Ledger Component
  const VendorLedger = ({ vendor, onClose }) => {
    const totalEarnings = vendor.ledger.reduce((sum, item) => sum + parseFloat(item.vendorEarning.replace('₹', '').replace('-', '')), 0);
    
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
        zIndex: 1000
      }}>
        <div style={{
          backgroundColor: 'white',
          borderRadius: '10px',
          padding: '30px',
          width: '95%',
          maxWidth: '1200px',
          maxHeight: '90vh',
          overflowY: 'auto'
        }}>
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <div>
              <h2 style={{ color: primaryColor, margin: 0 }}>Vendor Ledger - {vendor.name}</h2>
              <p style={{ margin: '5px 0 0', color: '#666' }}>Vendor ID: {vendor.vendorId} | GSTIN: {vendor.gstin}</p>
            </div>
            <button
              onClick={onClose}
              style={{
                backgroundColor: 'transparent',
                border: 'none',
                fontSize: '24px',
                cursor: 'pointer',
                color: '#666',
                transition: 'color 0.3s ease',
                ':hover': { color: primaryColor }
              }}
            >
              ×
            </button>
          </div>

          {/* Summary Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', marginBottom: '20px' }}>
            <div style={{ 
              padding: '15px', 
              backgroundColor: '#e7f3ff', 
              borderRadius: '8px', 
              textAlign: 'center',
              transition: 'all 0.3s ease',
              ':hover': {
                transform: 'translateY(-3px)',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
              }
            }}>
              <div style={{ fontSize: '12px', color: '#666' }}>Total Earnings</div>
              <div style={{ fontSize: '20px', fontWeight: 'bold', color: primaryColor }}>{vendor.earnings}</div>
            </div>
            <div style={{ 
              padding: '15px', 
              backgroundColor: '#e7f3ff', 
              borderRadius: '8px', 
              textAlign: 'center',
              transition: 'all 0.3s ease',
              ':hover': {
                transform: 'translateY(-3px)',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
              }
            }}>
              <div style={{ fontSize: '12px', color: '#666' }}>Pending Amount</div>
              <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#ffc107' }}>{vendor.pendingAmount}</div>
            </div>
            <div style={{ 
              padding: '15px', 
              backgroundColor: '#e7f3ff', 
              borderRadius: '8px', 
              textAlign: 'center',
              transition: 'all 0.3s ease',
              ':hover': {
                transform: 'translateY(-3px)',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
              }
            }}>
              <div style={{ fontSize: '12px', color: '#666' }}>Last Settlement</div>
              <div style={{ fontSize: '20px', fontWeight: 'bold', color: primaryColor }}>{vendor.lastSettlement}</div>
            </div>
          </div>

          {/* Ledger Table */}
          <h3 style={{ color: primaryColor, marginBottom: '15px' }}>Order-wise Earning Breakdown</h3>
          <div style={{ marginBottom: '30px', overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: 'white' }}>
              <thead>
                <tr style={{ backgroundColor: primaryColor, color: 'white' }}>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Order ID</th>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Date</th>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Product</th>
                  <th style={{ padding: '12px', textAlign: 'right' }}>Order Amount</th>
                  <th style={{ padding: '12px', textAlign: 'right' }}>Platform Commission</th>
                  <th style={{ padding: '12px', textAlign: 'right' }}>Refund Deduction</th>
                  <th style={{ padding: '12px', textAlign: 'right' }}>Promo Discount</th>
                  <th style={{ padding: '12px', textAlign: 'right' }}>TDS</th>
                  <th style={{ padding: '12px', textAlign: 'right' }}>GST</th>
                  <th style={{ padding: '12px', textAlign: 'right' }}>Vendor Earning</th>
                  <th style={{ padding: '12px', textAlign: 'center' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {vendor.ledger.map((item, index) => (
                  <tr key={index} style={{ 
                    borderBottom: '1px solid #ddd',
                    transition: 'all 0.3s ease',
                    ':hover': {
                      backgroundColor: '#f8f9fa',
                      transform: 'translateY(-1px)',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }
                  }}>
                    <td style={{ padding: '12px' }}>{item.orderId}</td>
                    <td style={{ padding: '12px' }}>{item.date}</td>
                    <td style={{ padding: '12px' }}>{item.product}</td>
                    <td style={{ padding: '12px', textAlign: 'right' }}>{item.orderAmount}</td>
                    <td style={{ padding: '12px', textAlign: 'right' }}>{item.platformCommission}</td>
                    <td style={{ padding: '12px', textAlign: 'right' }}>{item.refundDeduction}</td>
                    <td style={{ padding: '12px', textAlign: 'right' }}>{item.promotionalDiscount}</td>
                    <td style={{ padding: '12px', textAlign: 'right' }}>{item.tds}</td>
                    <td style={{ padding: '12px', textAlign: 'right' }}>{item.gst}</td>
                    <td style={{ 
                      padding: '12px', 
                      textAlign: 'right', 
                      fontWeight: 'bold',
                      color: item.vendorEarning.startsWith('₹-') ? '#dc3545' : '#28a745'
                    }}>
                      {item.vendorEarning}
                    </td>
                    <td style={{ padding: '12px', textAlign: 'center' }}>
                      <span style={{
                        padding: '4px 8px',
                        borderRadius: '12px',
                        fontSize: '12px',
                        backgroundColor: item.status === 'Delivered' ? '#d4edda' : '#f8d7da',
                        color: item.status === 'Delivered' ? '#155724' : '#721c24'
                      }}>
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Audit Logs */}
          <h3 style={{ color: primaryColor, marginBottom: '15px' }}>Payment Audit Logs</h3>
          <div style={{ backgroundColor: '#f8f9fa', padding: '15px', borderRadius: '8px' }}>
            {vendor.auditLogs.map((log, index) => (
              <div key={index} style={{ 
                padding: '10px', 
                borderBottom: index < vendor.auditLogs.length - 1 ? '1px solid #ddd' : 'none',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr 1fr',
                gap: '10px',
                fontSize: '14px',
                transition: 'background-color 0.3s ease',
                ':hover': {
                  backgroundColor: '#e9ecef'
                }
              }}>
                <div><strong>Action:</strong> {log.action}</div>
                <div><strong>By:</strong> {log.user}</div>
                <div><strong>Time:</strong> {log.timestamp}</div>
                <div><strong>Reference:</strong> {log.reference}</div>
                {log.amount && <div style={{ gridColumn: '1 / -1', marginTop: '5px' }}>
                  <strong>Amount:</strong> {log.amount}
                </div>}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Payment Release Confirmation Component
  const PaymentReleaseConfirmation = ({ vendor, onClose, onConfirm }) => {
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
        zIndex: 1000
      }}>
        <div style={{
          backgroundColor: 'white',
          borderRadius: '10px',
          padding: '30px',
          width: '90%',
          maxWidth: '500px'
        }}>
          <h2 style={{ color: primaryColor, marginBottom: '15px' }}>Confirm Payment Release</h2>
          
          <div style={{ marginBottom: '20px' }}>
            <p><strong>Vendor:</strong> {vendor.name}</p>
            <p><strong>Vendor ID:</strong> {vendor.vendorId}</p>
            <p><strong>Amount to Release:</strong> {vendor.earnings}</p>
            <p><strong>Bank Details:</strong></p>
            <div style={{ backgroundColor: '#f8f9fa', padding: '10px', borderRadius: '5px', marginLeft: '10px' }}>
              <div>Bank: {vendor.bankDetails.bankName}</div>
              <div>Account: {vendor.bankDetails.accountNumber}</div>
              <div>IFSC: {vendor.bankDetails.ifsc}</div>
              <div>UPI: {vendor.bankDetails.upi}</div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
            <button
              onClick={onClose}
              style={{
                ...secondaryButtonStyle,
                padding: '10px 20px'
              }}
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              style={{
                ...successButtonStyle,
                padding: '10px 20px'
              }}
            >
              Confirm Release
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Delivery Agent Functions
  const handleViewProfile = (agent) => {
    setSelectedAgent(agent);
    setShowAgentProfile(true);
  };

  const handleSuspendAgent = (agentId) => {
    alert(`Agent ${agentId} has been suspended`);
    setShowAgentProfile(false);
  };

  const handleReinstateAgent = (agentId) => {
    alert(`Agent ${agentId} has been reinstated`);
    setShowAgentProfile(false);
  };

  const handleAdjustIncentives = (agentId) => {
    alert(`Adjust incentives for agent ${agentId}`);
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      <h2 style={{ color: primaryColor, marginBottom: '20px' }}>Payouts Dashboard</h2>
      
      {/* Tabs */}
      <div style={{ marginBottom: '20px', borderBottom: `1px solid ${accentColor}` }}>
        <button
          onClick={() => setActiveTab('summary')}
          style={{
            padding: '10px 20px',
            backgroundColor: activeTab === 'summary' ? primaryColor : 'transparent',
            color: activeTab === 'summary' ? 'white' : primaryColor,
            border: 'none',
            borderBottom: activeTab === 'summary' ? `3px solid ${primaryColor}` : 'none',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            ':hover': {
              backgroundColor: activeTab === 'summary' ? primaryColor : accentColor,
              color: activeTab === 'summary' ? 'white' : primaryColor
            }
          }}
        >
          Payout Summary
        </button>
        <button
          onClick={() => setActiveTab('vendors')}
          style={{
            padding: '10px 20px',
            backgroundColor: activeTab === 'vendors' ? primaryColor : 'transparent',
            color: activeTab === 'vendors' ? 'white' : primaryColor,
            border: 'none',
            borderBottom: activeTab === 'vendors' ? `3px solid ${primaryColor}` : 'none',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            ':hover': {
              backgroundColor: activeTab === 'vendors' ? primaryColor : accentColor,
              color: activeTab === 'vendors' ? 'white' : primaryColor
            }
          }}
        >
          Vendor Earnings
        </button>
        <button
          onClick={() => setActiveTab('delivery')}
          style={{
            padding: '10px 20px',
            backgroundColor: activeTab === 'delivery' ? primaryColor : 'transparent',
            color: activeTab === 'delivery' ? 'white' : primaryColor,
            border: 'none',
            borderBottom: activeTab === 'delivery' ? `3px solid ${primaryColor}` : 'none',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            ':hover': {
              backgroundColor: activeTab === 'delivery' ? primaryColor : accentColor,
              color: activeTab === 'delivery' ? 'white' : primaryColor
            }
          }}
        >
          Delivery Agents
        </button>
        <button
          onClick={() => setActiveTab('refunds')}
          style={{
            padding: '10px 20px',
            backgroundColor: activeTab === 'refunds' ? primaryColor : 'transparent',
            color: activeTab === 'refunds' ? 'white' : primaryColor,
            border: 'none',
            borderBottom: activeTab === 'refunds' ? `3px solid ${primaryColor}` : 'none',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            ':hover': {
              backgroundColor: activeTab === 'refunds' ? primaryColor : accentColor,
              color: activeTab === 'refunds' ? 'white' : primaryColor
            }
          }}
        >
          Refunds & Chargebacks
        </button>
      </div>

      {activeTab === 'summary' && (
        <div style={{ display: 'grid', gap: '20px' }}>
          {/* Payout Overview */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px' }}>
            <div style={{
              backgroundColor: 'white',
              padding: '20px',
              borderRadius: '8px',
              border: `1px solid ${accentColor}`,
              textAlign: 'center',
              transition: 'all 0.3s ease',
              ':hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
              }
            }}>
              <h3 style={{ color: primaryColor, margin: '0 0 10px' }}>Pending Payouts</h3>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: primaryColor }}>{payoutSummary.pendingPayouts}</div>
              <div style={{ fontSize: '12px', color: '#666' }}>Amount yet to be paid</div>
            </div>
            
            <div style={{
              backgroundColor: 'white',
              padding: '20px',
              borderRadius: '8px',
              border: `1px solid ${accentColor}`,
              textAlign: 'center',
              transition: 'all 0.3s ease',
              ':hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
              }
            }}>
              <h3 style={{ color: primaryColor, margin: '0 0 10px' }}>Processed This Week</h3>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: primaryColor }}>{payoutSummary.processedThisWeek}</div>
              <div style={{ fontSize: '12px', color: '#666' }}>Successfully processed</div>
            </div>
            
            <div style={{
              backgroundColor: 'white',
              padding: '20px',
              borderRadius: '8px',
              border: `1px solid ${accentColor}`,
              textAlign: 'center',
              transition: 'all 0.3s ease',
              ':hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
              }
            }}>
              <h3 style={{ color: primaryColor, margin: '0 0 10px' }}>Next Settlement</h3>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: primaryColor }}>{payoutSummary.nextSettlement}</div>
              <div style={{ fontSize: '12px', color: '#666' }}>Scheduled date</div>
            </div>
          </div>

          {/* Payment Methods */}
          <div style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            border: `1px solid ${accentColor}`,
            transition: 'all 0.3s ease',
            ':hover': {
              transform: 'translateY(-3px)',
              boxShadow: '0 6px 12px rgba(0,0,0,0.1)'
            }
          }}>
            <h3 style={{ color: primaryColor, marginBottom: '15px' }}>Payment Method Status</h3>
            <div style={{ display: 'grid', gap: '10px' }}>
              {payoutSummary.paymentMethods.map(method => (
                <div key={method.name} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '10px',
                  backgroundColor: accentColor,
                  borderRadius: '5px',
                  transition: 'all 0.3s ease',
                  ':hover': {
                    backgroundColor: primaryColor,
                    color: 'white',
                    transform: 'translateY(-2px)'
                  }
                }}>
                  <span>{method.name}</span>
                  <span style={{
                    padding: '4px 8px',
                    borderRadius: '12px',
                    fontSize: '12px',
                    backgroundColor: method.status === 'Active' ? '#d4edda' : '#f8d7da',
                    color: method.status === 'Active' ? '#155724' : '#721c24'
                  }}>
                    {method.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'vendors' && (
        <div>
          {/* Search Bar */}
          <div style={{ marginBottom: '20px' }}>
            <input
              type="text"
              placeholder="Search vendor by name, ID, phone, GSTIN, license, address..."
              value={vendorSearchTerm}
              onChange={(e) => setVendorSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '12px',
                border: `1px solid ${accentColor}`,
                borderRadius: '5px',
                fontSize: '14px',
                transition: 'all 0.3s ease',
                ':focus': {
                  outline: 'none',
                  borderColor: primaryColor,
                  boxShadow: `0 0 0 2px ${accentColor}`
                }
              }}
            />
          </div>

          {/* Vendors Table */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            overflow: 'hidden',
            border: `1px solid ${accentColor}`,
            transition: 'all 0.3s ease',
            ':hover': {
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
            }
          }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: primaryColor, color: 'white' }}>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Vendor</th>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Contact</th>
                  <th style={{ padding: '12px', textAlign: 'right' }}>Earnings</th>
                  <th style={{ padding: '12px', textAlign: 'center' }}>Last Settlement</th>
                  <th style={{ padding: '12px', textAlign: 'center' }}>Status</th>
                  <th style={{ padding: '12px', textAlign: 'center' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredVendors.map(vendor => (
                  <tr key={vendor.id} style={{ 
                    borderBottom: `1px solid ${accentColor}`,
                    transition: 'all 0.3s ease',
                    ':hover': {
                      backgroundColor: '#f8f9fa',
                      transform: 'translateY(-1px)',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }
                  }}>
                    <td style={{ padding: '12px' }}>
                      <div><strong>{vendor.name}</strong></div>
                      <div style={{ fontSize: '12px', color: '#666' }}>ID: {vendor.vendorId}</div>
                      <div style={{ fontSize: '12px', color: '#666' }}>GSTIN: {vendor.gstin}</div>
                    </td>
                    <td style={{ padding: '12px' }}>
                      <div>{vendor.phone}</div>
                      <div style={{ fontSize: '12px', color: '#666' }}>{vendor.address}</div>
                    </td>
                    <td style={{ padding: '12px', fontWeight: 'bold', color: primaryColor, textAlign: 'right' }}>
                      {vendor.earnings}
                    </td>
                    <td style={{ padding: '12px', textAlign: 'center' }}>{vendor.lastSettlement}</td>
                    <td style={{ padding: '12px', textAlign: 'center' }}>
                      <span style={{
                        padding: '6px 12px',
                        borderRadius: '12px',
                        fontSize: '12px',
                        fontWeight: 'bold',
                        backgroundColor: getVendorStatusColor(vendor.status),
                        color: 'white'
                      }}>
                        {vendor.status}
                      </span>
                    </td>
                    <td style={{ padding: '12px', textAlign: 'center' }}>
                      <div style={{ display: 'flex', gap: '5px', justifyContent: 'center', flexWrap: 'wrap' }}>
                        {vendor.status === 'Pending' && (
                          <button
                            onClick={() => handleReleasePayment(vendor)}
                            style={{
                              ...successButtonStyle,
                              padding: '6px 12px',
                              fontSize: '12px'
                            }}
                          >
                            Release Payment
                          </button>
                        )}
                        <button
                          onClick={() => handleViewLedger(vendor)}
                          style={{
                            ...primaryButtonStyle,
                            padding: '6px 12px',
                            fontSize: '12px'
                          }}
                        >
                          View Ledger
                        </button>
                        <button
                          onClick={() => handleDownloadReceipt(vendor)}
                          style={{
                            ...infoButtonStyle,
                            padding: '6px 12px',
                            fontSize: '12px'
                          }}
                        >
                          Receipt
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {filteredVendors.length === 0 && (
              <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
                No vendors found matching your search criteria.
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'delivery' && (
        <div>
          {/* KPI Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', marginBottom: '20px' }}>
            <div style={{
              backgroundColor: 'white',
              padding: '20px',
              borderRadius: '8px',
              border: `1px solid ${accentColor}`,
              textAlign: 'center',
              transition: 'all 0.3s ease',
              ':hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
              }
            }}>
              <h3 style={{ color: primaryColor, margin: '0 0 10px', fontSize: '14px' }}>Active Agents</h3>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: primaryColor }}>{deliveryKPIs.activeAgents}</div>
              <div style={{ fontSize: '12px', color: '#666' }}>Currently available</div>
            </div>
            
            <div style={{
              backgroundColor: 'white',
              padding: '20px',
              borderRadius: '8px',
              border: `1px solid ${accentColor}`,
              textAlign: 'center',
              transition: 'all 0.3s ease',
              ':hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
              }
            }}>
              <h3 style={{ color: primaryColor, margin: '0 0 10px', fontSize: '14px' }}>On-Time Delivery</h3>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: primaryColor }}>{deliveryKPIs.onTimeDeliveryRate}%</div>
              <div style={{ fontSize: '12px', color: '#666' }}>Within SLA time</div>
            </div>
            
            <div style={{
              backgroundColor: 'white',
              padding: '20px',
              borderRadius: '8px',
              border: `1px solid ${accentColor}`,
              textAlign: 'center',
              transition: 'all 0.3s ease',
              ':hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
              }
            }}>
              <h3 style={{ color: primaryColor, margin: '0 0 10px', fontSize: '14px' }}>Avg. Duration</h3>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: primaryColor }}>{deliveryKPIs.averageDeliveryDuration}</div>
              <div style={{ fontSize: '12px', color: '#666' }}>Pickup to delivery</div>
            </div>
            
            <div style={{
              backgroundColor: 'white',
              padding: '20px',
              borderRadius: '8px',
              border: `1px solid ${accentColor}`,
              textAlign: 'center',
              transition: 'all 0.3s ease',
              ':hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
              }
            }}>
              <h3 style={{ color: primaryColor, margin: '0 0 10px', fontSize: '14px' }}>Complaints (7 Days)</h3>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: primaryColor }}>{deliveryKPIs.complaintsLast7Days}</div>
              <div style={{ fontSize: '12px', color: '#666' }}>Delivery issues</div>
            </div>
          </div>

          {/* Search Bar */}
          <div style={{ marginBottom: '20px' }}>
            <input
              type="text"
              placeholder="Search by Agent ID, Name, or Phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '12px',
                border: `1px solid ${accentColor}`,
                borderRadius: '5px',
                fontSize: '14px',
                transition: 'all 0.3s ease',
                ':focus': {
                  outline: 'none',
                  borderColor: primaryColor,
                  boxShadow: `0 0 0 2px ${accentColor}`
                }
              }}
            />
          </div>

          {/* Delivery Agents Table */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            overflow: 'hidden',
            border: `1px solid ${accentColor}`,
            transition: 'all 0.3s ease',
            ':hover': {
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
            }
          }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: primaryColor, color: 'white' }}>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Agent ID</th>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Name</th>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Phone</th>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Deliveries Completed</th>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Performance</th>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Status</th>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAgents.map(agent => (
                  <tr key={agent.id} style={{ 
                    borderBottom: `1px solid ${accentColor}`,
                    transition: 'all 0.3s ease',
                    ':hover': {
                      backgroundColor: '#f8f9fa',
                      transform: 'translateY(-1px)',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }
                  }}>
                    <td style={{ padding: '12px', fontWeight: 'bold' }}>{agent.agentId}</td>
                    <td style={{ padding: '12px' }}>{agent.name}</td>
                    <td style={{ padding: '12px' }}>{agent.phone}</td>
                    <td style={{ padding: '12px', textAlign: 'center' }}>{agent.deliveriesCompleted}</td>
                    <td style={{ padding: '12px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{
                          width: '60px',
                          height: '8px',
                          backgroundColor: '#e9ecef',
                          borderRadius: '4px',
                          overflow: 'hidden'
                        }}>
                          <div style={{
                            width: `${agent.onTimeRate}%`,
                            height: '100%',
                            backgroundColor: getPerformanceColor(agent.onTimeRate),
                            borderRadius: '4px'
                          }} />
                        </div>
                        <span style={{ fontSize: '12px', fontWeight: 'bold' }}>{agent.onTimeRate}%</span>
                      </div>
                    </td>
                    <td style={{ padding: '12px' }}>
                      <span style={{
                        padding: '4px 8px',
                        borderRadius: '12px',
                        fontSize: '12px',
                        backgroundColor: getStatusColor(agent.status),
                        color: 'white'
                      }}>
                        {agent.status}
                      </span>
                    </td>
                    <td style={{ padding: '12px' }}>
                      <button
                        onClick={() => handleViewProfile(agent)}
                        style={{
                          ...primaryButtonStyle,
                          padding: '6px 12px',
                          fontSize: '12px'
                        }}
                      >
                        View Profile
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {filteredAgents.length === 0 && (
              <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
                No delivery agents found matching your search criteria.
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'refunds' && (
        <div>
          {/* Refund KPIs */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', marginBottom: '20px' }}>
            <div style={{
              backgroundColor: 'white',
              padding: '20px',
              borderRadius: '8px',
              border: `1px solid ${accentColor}`,
              textAlign: 'center',
              transition: 'all 0.3s ease',
              ':hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
              }
            }}>
              <h3 style={{ color: primaryColor, margin: '0 0 10px', fontSize: '14px' }}>Total Refunds</h3>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: primaryColor }}>{refundKPIs.totalRefunds}</div>
              <div style={{ fontSize: '12px', color: '#666' }}>All time</div>
            </div>
            
            <div style={{
              backgroundColor: 'white',
              padding: '20px',
              borderRadius: '8px',
              border: `1px solid ${accentColor}`,
              textAlign: 'center',
              transition: 'all 0.3s ease',
              ':hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
              }
            }}>
              <h3 style={{ color: primaryColor, margin: '0 0 10px', fontSize: '14px' }}>Pending Refunds</h3>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#ffc107' }}>{refundKPIs.pendingRefunds}</div>
              <div style={{ fontSize: '12px', color: '#666' }}>Awaiting action</div>
            </div>
            
            <div style={{
              backgroundColor: 'white',
              padding: '20px',
              borderRadius: '8px',
              border: `1px solid ${accentColor}`,
              textAlign: 'center',
              transition: 'all 0.3s ease',
              ':hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
              }
            }}>
              <h3 style={{ color: primaryColor, margin: '0 0 10px', fontSize: '14px' }}>Total Amount</h3>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#dc3545' }}>{refundKPIs.totalRefundAmount}</div>
              <div style={{ fontSize: '12px', color: '#666' }}>Refunded to customers</div>
            </div>
            
            <div style={{
              backgroundColor: 'white',
              padding: '20px',
              borderRadius: '8px',
              border: `1px solid ${accentColor}`,
              textAlign: 'center',
              transition: 'all 0.3s ease',
              ':hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
              }
            }}>
              <h3 style={{ color: primaryColor, margin: '0 0 10px', fontSize: '14px' }}>Avg. Processing</h3>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: primaryColor }}>{refundKPIs.avgProcessingTime}</div>
              <div style={{ fontSize: '12px', color: '#666' }}>From request to completion</div>
            </div>
          </div>

          {/* Search and Export Bar */}
          <div style={{ display: 'flex', gap: '15px', marginBottom: '20px' }}>
            <input
              type="text"
              placeholder="Search by Refund ID, Order ID, Vendor/Rider, or Customer..."
              value={refundSearchTerm}
              onChange={(e) => setRefundSearchTerm(e.target.value)}
              style={{
                flex: 1,
                padding: '12px',
                border: `1px solid ${accentColor}`,
                borderRadius: '5px',
                fontSize: '14px',
                transition: 'all 0.3s ease',
                ':focus': {
                  outline: 'none',
                  borderColor: primaryColor,
                  boxShadow: `0 0 0 2px ${accentColor}`
                }
              }}
            />
            <button
              onClick={exportRefundData}
              style={{
                ...primaryButtonStyle,
                padding: '12px 20px',
                fontSize: '14px',
                whiteSpace: 'nowrap'
              }}
            >
              Export Data
            </button>
          </div>

          {/* Refunds Table */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            overflow: 'hidden',
            border: `1px solid ${accentColor}`,
            transition: 'all 0.3s ease',
            ':hover': {
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
            }
          }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: primaryColor, color: 'white' }}>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Refund ID</th>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Order ID</th>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Vendor / Rider</th>
                  <th style={{ padding: '12px', textAlign: 'right' }}>Amount</th>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Reason</th>
                  <th style={{ padding: '12px', textAlign: 'center' }}>Status</th>
                  <th style={{ padding: '12px', textAlign: 'center' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredRefunds.map(refund => (
                  <tr key={refund.id} style={{ 
                    borderBottom: `1px solid ${accentColor}`,
                    transition: 'all 0.3s ease',
                    ':hover': {
                      backgroundColor: '#f8f9fa',
                      transform: 'translateY(-1px)',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }
                  }}>
                    <td style={{ padding: '12px', fontWeight: 'bold' }}>{refund.refundId}</td>
                    <td style={{ padding: '12px' }}>{refund.orderId}</td>
                    <td style={{ padding: '12px' }}>
                      <div><strong>{refund.affectedParty.name}</strong></div>
                      <div style={{ fontSize: '12px', color: '#666' }}>
                        {refund.affectedParty.type} • {refund.affectedParty.id}
                      </div>
                    </td>
                    <td style={{ padding: '12px', fontWeight: 'bold', color: '#dc3545', textAlign: 'right' }}>
                      {refund.amount}
                    </td>
                    <td style={{ padding: '12px', maxWidth: '200px' }}>
                      <div style={{ 
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                      }}>
                        {refund.reason}
                      </div>
                    </td>
                    <td style={{ padding: '12px', textAlign: 'center' }}>
                      <span style={{
                        padding: '6px 12px',
                        borderRadius: '12px',
                        fontSize: '12px',
                        fontWeight: 'bold',
                        backgroundColor: getRefundStatusColor(refund.status),
                        color: 'white'
                      }}>
                        {refund.status}
                      </span>
                    </td>
                    <td style={{ padding: '12px', textAlign: 'center' }}>
                      <div style={{ display: 'flex', gap: '5px', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <button
                          onClick={() => handleReviewRefund(refund)}
                          style={{
                            ...primaryButtonStyle,
                            padding: '6px 12px',
                            fontSize: '12px'
                          }}
                        >
                          Review
                        </button>
                        {(refund.status === 'Processing' || refund.status === 'Completed') && (
                          <button
                            onClick={() => handleTrackRefund(refund)}
                            style={{
                              ...infoButtonStyle,
                              padding: '6px 12px',
                              fontSize: '12px'
                            }}
                          >
                            Track
                          </button>
                        )}
                        {refund.status === 'Completed' && (
                          <button
                            onClick={() => handleDownloadRefundReceipt(refund)}
                            style={{
                              ...successButtonStyle,
                              padding: '6px 12px',
                              fontSize: '12px'
                            }}
                          >
                            Receipt
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {filteredRefunds.length === 0 && (
              <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
                No refunds found matching your search criteria.
              </div>
            )}
          </div>
        </div>
      )}

      {/* Delivery Agent Profile Modal */}
      {showAgentProfile && selectedAgent && (
        <DeliveryAgentProfile 
          agent={selectedAgent} 
          onClose={() => setShowAgentProfile(false)} 
        />
      )}

      {/* Vendor Ledger Modal */}
      {showVendorLedger && selectedVendor && (
        <VendorLedger 
          vendor={selectedVendor} 
          onClose={() => setShowVendorLedger(false)} 
        />
      )}

      {/* Payment Release Confirmation Modal */}
      {showPaymentRelease && selectedVendor && (
        <PaymentReleaseConfirmation 
          vendor={selectedVendor} 
          onClose={() => setShowPaymentRelease(false)}
          onConfirm={confirmPaymentRelease}
        />
      )}

      {/* Refund Details Modal */}
      {showRefundDetails && selectedRefund && (
        <RefundDetails 
          refund={selectedRefund} 
          onClose={() => setShowRefundDetails(false)}
          onApprove={handleApproveRefund}
          onReject={handleRejectRefund}
        />
      )}

      {/* Refund Tracking Modal */}
      {showRefundTracking && selectedRefund && (
        <RefundTracking 
          refund={selectedRefund} 
          onClose={() => setShowRefundTracking(false)}
        />
      )}
    </div>
  );
};

export default PayoutsDashboard;