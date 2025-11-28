import React, { useState } from 'react';

const OrdersManagement = () => {
  const primaryColor = '#7C2A62';
  const accentColor = '#F7D9EB';
  
  const [searchOrderId, setSearchOrderId] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [vendorFilter, setVendorFilter] = useState('all');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [showClarificationModal, setShowClarificationModal] = useState(false);
  const [rejectReason, setRejectReason] = useState('');
  const [clarificationMessage, setClarificationMessage] = useState('');
  const [substitutionSuggestions, setSubstitutionSuggestions] = useState({});
  const [pharmacistNotes, setPharmacistNotes] = useState('');

  // Mock data with enhanced prescription details
  const orders = [
    {
      id: 'ORD001',
      patient: 'John Wilson',
      patientAge: 45,
      patientGender: 'Male',
      vendor: 'MedPlus Pharmacy',
      vendorId: 'V001',
      status: 'Needs Review',
      rxStatus: 'Needs Review',
      orderDate: '2024-01-15',
      prescriptionImage: 'prescription_001.jpg',
      doctor: {
        name: 'Dr. Rajesh Kumar',
        license: 'MED123456',
        verified: true,
        specialization: 'General Physician'
      },
      medicines: [
        { 
          id: 'MED001', 
          name: 'Paracetamol', 
          dosage: '500mg', 
          quantity: 10, 
          frequency: 'Twice daily',
          duration: '5 days',
          substitution: {
            available: true,
            suggestions: ['Crocin', 'Calpol'],
            selected: null
          }
        },
        { 
          id: 'MED002', 
          name: 'Amoxicillin', 
          dosage: '250mg', 
          quantity: 5, 
          frequency: 'Thrice daily',
          duration: '7 days',
          substitution: {
            available: false,
            suggestions: [],
            selected: null
          }
        }
      ],
      auditLogs: [
        {
          action: 'Order Created',
          user: 'System',
          timestamp: '2024-01-15 10:30:00',
          note: 'Order placed with prescription upload'
        }
      ]
    },
    {
      id: 'ORD002',
      patient: 'Priya Sharma',
      patientAge: 32,
      patientGender: 'Female',
      vendor: 'Apollo Pharmacy',
      vendorId: 'V002',
      status: 'Needs Review',
      rxStatus: 'View Image',
      orderDate: '2024-01-14',
      prescriptionImage: 'prescription_002.jpg',
      doctor: {
        name: 'Dr. Anjali Mehta',
        license: 'MED789012',
        verified: false,
        specialization: 'Cardiologist'
      },
      medicines: [
        { 
          id: 'MED003', 
          name: 'Atorvastatin', 
          dosage: '20mg', 
          quantity: 30, 
          frequency: 'Once daily',
          duration: '30 days',
          substitution: {
            available: true,
            suggestions: ['Lipitor', 'Storvas'],
            selected: null
          }
        }
      ],
      auditLogs: [
        {
          action: 'Order Created',
          user: 'System',
          timestamp: '2024-01-14 14:20:00',
          note: 'Order placed with prescription upload'
        }
      ]
    },
    {
      id: 'ORD003',
      patient: 'Rahul Verma',
      patientAge: 58,
      patientGender: 'Male',
      vendor: 'Wellness Forever',
      vendorId: 'V003',
      status: 'Approved',
      rxStatus: 'Approved',
      orderDate: '2024-01-13',
      prescriptionImage: 'prescription_003.jpg',
      doctor: {
        name: 'Dr. Sanjay Patel',
        license: 'MED345678',
        verified: true,
        specialization: 'Orthopedic'
      },
      medicines: [
        { 
          id: 'MED004', 
          name: 'Ibuprofen', 
          dosage: '400mg', 
          quantity: 20, 
          frequency: 'As needed',
          duration: '10 days',
          substitution: {
            available: true,
            suggestions: ['Brufen', 'Ibugesic'],
            selected: 'Brufen'
          }
        }
      ],
      auditLogs: [
        {
          action: 'Order Created',
          user: 'System',
          timestamp: '2024-01-13 09:15:00',
          note: 'Order placed with prescription upload'
        },
        {
          action: 'Prescription Approved',
          user: 'Pharmacist Admin',
          timestamp: '2024-01-13 11:30:00',
          note: 'Prescription verified and approved'
        }
      ]
    },
    {
      id: 'ORD004',
      patient: 'Sneha Reddy',
      patientAge: 28,
      patientGender: 'Female',
      vendor: 'MedPlus Pharmacy',
      vendorId: 'V001',
      status: 'Rejected',
      rxStatus: 'Rejected',
      orderDate: '2024-01-12',
      prescriptionImage: 'prescription_004.jpg',
      doctor: {
        name: 'Dr. Arjun Singh',
        license: 'MED901234',
        verified: true,
        specialization: 'Dermatologist'
      },
      medicines: [
        { 
          id: 'MED005', 
          name: 'Cetirizine', 
          dosage: '10mg', 
          quantity: 15, 
          frequency: 'Once daily',
          duration: '15 days',
          substitution: {
            available: false,
            suggestions: [],
            selected: null
          }
        }
      ],
      auditLogs: [
        {
          action: 'Order Created',
          user: 'System',
          timestamp: '2024-01-12 16:45:00',
          note: 'Order placed with prescription upload'
        },
        {
          action: 'Prescription Rejected',
          user: 'Pharmacist Admin',
          timestamp: '2024-01-12 17:20:00',
          note: 'Prescription unclear - unable to read dosage instructions'
        }
      ]
    }
  ];

  const vendors = [...new Set(orders.map(order => order.vendor))];

  // Filter orders based on search and filters
  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchOrderId.toLowerCase()) ||
                         order.patient.toLowerCase().includes(searchOrderId.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    const matchesVendor = vendorFilter === 'all' || order.vendor === vendorFilter;
    const matchesDate = !selectedDate || order.orderDate === selectedDate;
    
    return matchesSearch && matchesStatus && matchesVendor && matchesDate;
  });

  // Action handlers
  const handleApproveOrder = (orderId) => {
    const order = orders.find(o => o.id === orderId);
    if (order) {
      alert(`Order ${orderId} approved successfully!`);
      // In real implementation, update order status via API
    }
  };

  const handleRejectOrder = (orderId) => {
    if (!rejectReason.trim()) {
      alert('Please provide a reason for rejection');
      return;
    }
    
    const order = orders.find(o => o.id === orderId);
    if (order) {
      alert(`Order ${orderId} rejected. Reason: ${rejectReason}`);
      setShowRejectModal(false);
      setRejectReason('');
      // In real implementation, update order status via API
    }
  };

  const handleRequestClarification = (orderId) => {
    if (!clarificationMessage.trim()) {
      alert('Please provide clarification details');
      return;
    }
    
    const order = orders.find(o => o.id === orderId);
    if (order) {
      alert(`Clarification requested for order ${orderId}. Message: ${clarificationMessage}`);
      setShowClarificationModal(false);
      setClarificationMessage('');
      // In real implementation, send clarification request via API
    }
  };

  const handleSubstitutionChange = (orderId, medicineId, substitution) => {
    setSubstitutionSuggestions(prev => ({
      ...prev,
      [`${orderId}-${medicineId}`]: substitution
    }));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Needs Review': return { bg: '#fff3cd', text: '#856404' };
      case 'Approved': return { bg: '#d4edda', text: '#155724' };
      case 'Rejected': return { bg: '#f8d7da', text: '#721c24' };
      case 'Refunded': return { bg: '#e2e3e5', text: '#383d41' };
      default: return { bg: '#e2e3e5', text: '#383d41' };
    }
  };

  const getRxStatusColor = (rxStatus) => {
    switch (rxStatus) {
      case 'Needs Review': return { bg: '#fff3cd', text: '#856404' };
      case 'View Image': return { bg: '#cce7ff', text: '#004085' };
      case 'Approved': return { bg: '#d4edda', text: '#155724' };
      case 'Rejected': return { bg: '#f8d7da', text: '#721c24' };
      default: return { bg: '#e2e3e5', text: '#383d41' };
    }
  };

  // Reject Modal Component
  const RejectModal = ({ order, onClose, onConfirm }) => {
    const [localRejectReason, setLocalRejectReason] = useState(rejectReason);
    
    const handleConfirm = () => {
      setRejectReason(localRejectReason);
      onConfirm(order.id);
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
        zIndex: 1000
      }}>
        <div style={{
          backgroundColor: 'white',
          borderRadius: '10px',
          padding: '30px',
          width: '90%',
          maxWidth: '500px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.15)'
        }}>
          <h2 style={{ 
            color: primaryColor, 
            marginBottom: '15px', 
            borderBottom: `2px solid ${accentColor}`, 
            paddingBottom: '10px',
            textAlign: 'left'
          }}>
            Reject Prescription
          </h2>
          <p style={{ marginBottom: '5px', textAlign: 'left' }}><strong>Order ID:</strong> {order.id}</p>
          <p style={{ marginBottom: '20px', textAlign: 'left' }}><strong>Patient:</strong> {order.patient}</p>
          
          <div style={{ marginBottom: '25px', textAlign: 'left' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: primaryColor }}>
              Reason for Rejection *
            </label>
            <textarea
              value={localRejectReason}
              onChange={(e) => setLocalRejectReason(e.target.value)}
              placeholder="Please specify the reason for rejecting this prescription..."
              style={{
                width: '100%',
                height: '120px',
                padding: '12px',
                border: `1px solid ${accentColor}`,
                borderRadius: '5px',
                fontSize: '14px',
                resize: 'vertical',
                transition: 'border-color 0.3s, box-shadow 0.3s',
                fontFamily: 'inherit',
                textAlign: 'left'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = primaryColor;
                e.target.style.boxShadow = `0 0 0 2px ${accentColor}`;
              }}
              onBlur={(e) => {
                e.target.style.borderColor = accentColor;
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>

          <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
            <button
              onClick={onClose}
              style={{
                padding: '10px 20px',
                backgroundColor: '#6c757d',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '14px',
                transition: 'background-color 0.3s, transform 0.2s',
                fontWeight: 'bold'
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
              onClick={handleConfirm}
              style={{
                padding: '10px 20px',
                backgroundColor: '#dc3545',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '14px',
                transition: 'background-color 0.3s, transform 0.2s',
                fontWeight: 'bold'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#c82333';
                e.target.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#dc3545';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              Confirm Rejection
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Clarification Modal Component
  const ClarificationModal = ({ order, onClose, onConfirm }) => {
    const [localClarificationMessage, setLocalClarificationMessage] = useState(clarificationMessage);
    
    const handleConfirm = () => {
      setClarificationMessage(localClarificationMessage);
      onConfirm(order.id);
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
        zIndex: 1000
      }}>
        <div style={{
          backgroundColor: 'white',
          borderRadius: '10px',
          padding: '30px',
          width: '90%',
          maxWidth: '500px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.15)'
        }}>
          <h2 style={{ 
            color: primaryColor, 
            marginBottom: '15px', 
            borderBottom: `2px solid ${accentColor}`, 
            paddingBottom: '10px',
            textAlign: 'left'
          }}>
            Request Clarification
          </h2>
          <p style={{ marginBottom: '5px', textAlign: 'left' }}><strong>Order ID:</strong> {order.id}</p>
          <p style={{ marginBottom: '20px', textAlign: 'left' }}><strong>Patient:</strong> {order.patient}</p>
          
          <div style={{ marginBottom: '25px', textAlign: 'left' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: primaryColor }}>
              Clarification Details *
            </label>
            <textarea
              value={localClarificationMessage}
              onChange={(e) => setLocalClarificationMessage(e.target.value)}
              placeholder="What specific information do you need from the patient or doctor?..."
              style={{
                width: '100%',
                height: '140px',
                padding: '12px',
                border: `1px solid ${accentColor}`,
                borderRadius: '5px',
                fontSize: '14px',
                resize: 'vertical',
                transition: 'border-color 0.3s, box-shadow 0.3s',
                fontFamily: 'inherit',
                textAlign: 'left'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = primaryColor;
                e.target.style.boxShadow = `0 0 0 2px ${accentColor}`;
              }}
              onBlur={(e) => {
                e.target.style.borderColor = accentColor;
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>

          <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
            <button
              onClick={onClose}
              style={{
                padding: '10px 20px',
                backgroundColor: '#6c757d',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '14px',
                transition: 'background-color 0.3s, transform 0.2s',
                fontWeight: 'bold'
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
              onClick={handleConfirm}
              style={{
                padding: '10px 20px',
                backgroundColor: '#ffc107',
                color: 'black',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '14px',
                transition: 'background-color 0.3s, transform 0.2s',
                fontWeight: 'bold'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#e0a800';
                e.target.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#ffc107';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              Send Request
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div style={{ textAlign: 'left', padding: '20px' }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '20px',
        borderBottom: `2px solid ${accentColor}`,
        paddingBottom: '15px'
      }}>
        <h2 style={{ color: primaryColor, margin: 0 }}>Orders - Prescription Review & Fulfillment</h2>
        
        {/* Calendar Filter */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <label style={{ fontSize: '14px', fontWeight: 'bold', color: primaryColor }}>
            Filter by Date:
          </label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            style={{
              padding: '8px 12px',
              border: `1px solid ${accentColor}`,
              borderRadius: '5px',
              backgroundColor: 'white',
              fontSize: '14px',
              transition: 'border-color 0.3s, box-shadow 0.3s'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = primaryColor;
              e.target.style.boxShadow = `0 0 0 2px ${accentColor}`;
            }}
            onBlur={(e) => {
              e.target.style.borderColor = accentColor;
              e.target.style.boxShadow = 'none';
            }}
          />
          {selectedDate && (
            <button
              onClick={() => setSelectedDate('')}
              style={{
                padding: '8px 12px',
                backgroundColor: '#6c757d',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '12px',
                transition: 'background-color 0.3s, transform 0.2s'
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
              Clear
            </button>
          )}
        </div>
      </div>
      
      {/* Search and Filters - Completely Fixed Horizontal Layout */}
      <div style={{ 
        display: 'flex', 
        gap: '15px', 
        marginBottom: '20px',
        padding: '15px',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px',
        border: `1px solid ${accentColor}`,
        alignItems: 'flex-end'
      }}>
        {/* Search Order ID or Patient */}
        <div style={{ flex: '2', minWidth: '350px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: primaryColor, fontSize: '14px' }}>
            Search Order ID or Patient
          </label>
          <input
            type="text"
            placeholder="Enter Order ID or Patient Name"
            value={searchOrderId}
            onChange={(e) => setSearchOrderId(e.target.value)}
            style={{
              padding: '10px',
              border: `1px solid ${accentColor}`,
              borderRadius: '5px',
              width: '100%',
              transition: 'border-color 0.3s, box-shadow 0.3s'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = primaryColor;
              e.target.style.boxShadow = `0 0 0 2px ${accentColor}`;
            }}
            onBlur={(e) => {
              e.target.style.borderColor = accentColor;
              e.target.style.boxShadow = 'none';
            }}
          />
        </div>
        
        {/* Status Filter */}
        <div style={{ flex: '1', minWidth: '200px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: primaryColor, fontSize: '14px' }}>
            Status Filter
          </label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{
              padding: '10px',
              border: `1px solid ${accentColor}`,
              borderRadius: '5px',
              backgroundColor: 'white',
              width: '100%',
              transition: 'border-color 0.3s, box-shadow 0.3s'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = primaryColor;
              e.target.style.boxShadow = `0 0 0 2px ${accentColor}`;
            }}
            onBlur={(e) => {
              e.target.style.borderColor = accentColor;
              e.target.style.boxShadow = 'none';
            }}
          >
            <option value="all">All Status</option>
            <option value="Needs Review">Needs Review</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
            <option value="Refunded">Refunded</option>
          </select>
        </div>
        
        {/* Vendor Filter */}
        <div style={{ flex: '1', minWidth: '200px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: primaryColor, fontSize: '14px' }}>
            Vendor Filter
          </label>
          <select
            value={vendorFilter}
            onChange={(e) => setVendorFilter(e.target.value)}
            style={{
              padding: '10px',
              border: `1px solid ${accentColor}`,
              borderRadius: '5px',
              backgroundColor: 'white',
              width: '100%',
              transition: 'border-color 0.3s, box-shadow 0.3s'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = primaryColor;
              e.target.style.boxShadow = `0 0 0 2px ${accentColor}`;
            }}
            onBlur={(e) => {
              e.target.style.borderColor = accentColor;
              e.target.style.boxShadow = 'none';
            }}
          >
            <option value="all">All Vendors</option>
            {vendors.map(vendor => (
              <option key={vendor} value={vendor}>{vendor}</option>
            ))}
          </select>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: selectedOrder ? '2fr 1fr' : '1fr', gap: '20px' }}>
        {/* Orders Table */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          border: `1px solid ${accentColor}`,
          overflow: 'hidden',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: primaryColor, color: 'white' }}>
                <th style={{ padding: '12px', textAlign: 'left', borderRight: `1px solid ${accentColor}` }}>Order ID</th>
                <th style={{ padding: '12px', textAlign: 'left', borderRight: `1px solid ${accentColor}` }}>Patient</th>
                <th style={{ padding: '12px', textAlign: 'left', borderRight: `1px solid ${accentColor}` }}>Vendor</th>
                <th style={{ padding: '12px', textAlign: 'left', borderRight: `1px solid ${accentColor}` }}>Status</th>
                <th style={{ padding: '12px', textAlign: 'left', borderRight: `1px solid ${accentColor}` }}>Rx Status</th>
                <th style={{ padding: '12px', textAlign: 'left', borderRight: `1px solid ${accentColor}` }}>Date</th>
                <th style={{ padding: '12px', textAlign: 'left' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map(order => {
                const statusColor = getStatusColor(order.status);
                const rxStatusColor = getRxStatusColor(order.rxStatus);
                
                return (
                  <tr 
                    key={order.id} 
                    style={{ 
                      borderBottom: `1px solid ${accentColor}`,
                      backgroundColor: order.status === 'Needs Review' ? '#fffaf0' : 'white',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                    onClick={() => setSelectedOrder(order)}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#f8f0f5';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(124, 42, 98, 0.15)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = order.status === 'Needs Review' ? '#fffaf0' : 'white';
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <td style={{ 
                      padding: '12px', 
                      fontWeight: 'bold', 
                      borderRight: `1px solid ${accentColor}`,
                      transition: 'all 0.3s ease'
                    }}>
                      {order.id}
                    </td>
                    <td style={{ 
                      padding: '12px', 
                      borderRight: `1px solid ${accentColor}`,
                      transition: 'all 0.3s ease'
                    }}>
                      <div style={{ fontWeight: 'bold' }}>{order.patient}</div>
                      <div style={{ fontSize: '12px', color: '#666' }}>
                        {order.patientAge} yrs, {order.patientGender}
                      </div>
                    </td>
                    <td style={{ 
                      padding: '12px', 
                      borderRight: `1px solid ${accentColor}`,
                      transition: 'all 0.3s ease'
                    }}>
                      {order.vendor}
                    </td>
                    <td style={{ 
                      padding: '12px', 
                      borderRight: `1px solid ${accentColor}`,
                      transition: 'all 0.3s ease'
                    }}>
                      <span style={{
                        padding: '6px 12px',
                        borderRadius: '12px',
                        fontSize: '12px',
                        fontWeight: 'bold',
                        backgroundColor: statusColor.bg,
                        color: statusColor.text,
                        display: 'inline-block',
                        transition: 'all 0.3s ease'
                      }}>
                        {order.status}
                      </span>
                    </td>
                    <td style={{ 
                      padding: '12px', 
                      borderRight: `1px solid ${accentColor}`,
                      transition: 'all 0.3s ease'
                    }}>
                      <span style={{
                        padding: '6px 12px',
                        borderRadius: '12px',
                        fontSize: '12px',
                        fontWeight: 'bold',
                        backgroundColor: rxStatusColor.bg,
                        color: rxStatusColor.text,
                        display: 'inline-block',
                        transition: 'all 0.3s ease'
                      }}>
                        {order.rxStatus}
                      </span>
                    </td>
                    <td style={{ 
                      padding: '12px', 
                      fontSize: '14px', 
                      color: '#666', 
                      borderRight: `1px solid ${accentColor}`,
                      transition: 'all 0.3s ease'
                    }}>
                      {order.orderDate}
                    </td>
                    <td style={{ 
                      padding: '12px',
                      transition: 'all 0.3s ease'
                    }}>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedOrder(order);
                        }}
                        style={{
                          padding: '6px 12px',
                          backgroundColor: primaryColor,
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          fontSize: '12px',
                          transition: 'all 0.3s ease',
                          fontWeight: 'bold'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor = '#6a1b4d';
                          e.target.style.transform = 'scale(1.05)';
                          e.target.style.boxShadow = '0 2px 8px rgba(124, 42, 98, 0.3)';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor = primaryColor;
                          e.target.style.transform = 'scale(1)';
                          e.target.style.boxShadow = 'none';
                        }}
                      >
                        Review
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          
          {filteredOrders.length === 0 && (
            <div style={{ textAlign: 'center', padding: '40px', color: '#666', borderTop: `1px solid ${accentColor}` }}>
              No orders found matching your search criteria.
            </div>
          )}
        </div>

        {/* Prescription Detail Panel */}
        {selectedOrder && (
          <div style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            border: `1px solid ${accentColor}`,
            height: 'fit-content',
            position: 'sticky',
            top: '20px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              marginBottom: '15px',
              borderBottom: `2px solid ${accentColor}`,
              paddingBottom: '10px'
            }}>
              <h3 style={{ color: primaryColor, margin: 0 }}>Prescription Details</h3>
              <button 
                onClick={() => setSelectedOrder(null)}
                style={{
                  backgroundColor: 'transparent',
                  border: 'none',
                  fontSize: '18px',
                  cursor: 'pointer',
                  color: '#666',
                  transition: 'color 0.3s, transform 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = primaryColor;
                  e.target.style.transform = 'scale(1.2)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = '#666';
                  e.target.style.transform = 'scale(1)';
                }}
              >
                ×
              </button>
            </div>
            
            {/* Patient Information */}
            <div style={{ 
              marginBottom: '20px', 
              padding: '15px', 
              backgroundColor: '#f8f9fa', 
              borderRadius: '5px',
              border: `1px solid ${accentColor}`
            }}>
              <h4 style={{ color: primaryColor, marginBottom: '10px', borderBottom: `1px solid ${accentColor}`, paddingBottom: '5px' }}>Patient Information</h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '14px' }}>
                <div><strong>Name:</strong> {selectedOrder.patient}</div>
                <div><strong>Age:</strong> {selectedOrder.patientAge} years</div>
                <div><strong>Gender:</strong> {selectedOrder.patientGender}</div>
                <div><strong>Order Date:</strong> {selectedOrder.orderDate}</div>
              </div>
            </div>

            {/* Prescription Image */}
            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ 
                color: primaryColor, 
                marginBottom: '10px',
                borderBottom: `1px solid ${accentColor}`,
                paddingBottom: '5px'
              }}>
                Prescription Image
              </h4>
              <div style={{
                height: '250px',
                backgroundColor: '#f8f9fa',
                border: `2px dashed ${accentColor}`,
                borderRadius: '5px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#666',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundSize: '50px',
                cursor: 'pointer',
                transition: 'border-color 0.3s, background-color 0.3s, transform 0.2s'
              }}
              onMouseEnter={(e) => {
                e.target.style.borderColor = primaryColor;
                e.target.style.backgroundColor = '#f0f0f0';
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.borderColor = accentColor;
                e.target.style.backgroundColor = '#f8f9fa';
                e.target.style.transform = 'translateY(0)';
              }}
              >
                <div style={{ textAlign: 'center', marginTop: '60px' }}>
                  <div>Prescription Image Viewer</div>
                  <div style={{ fontSize: '12px', marginTop: '5px' }}>Click to zoom/enlarge</div>
                </div>
              </div>
            </div>

            {/* Doctor Verification */}
            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ 
                color: primaryColor, 
                marginBottom: '10px',
                borderBottom: `1px solid ${accentColor}`,
                paddingBottom: '5px'
              }}>
                Doctor Verification
              </h4>
              <div style={{
                padding: '15px',
                backgroundColor: selectedOrder.doctor.verified ? '#d4edda' : '#fff3cd',
                borderRadius: '5px',
                border: `1px solid ${selectedOrder.doctor.verified ? '#c3e6cb' : '#ffeaa7'}`,
                transition: 'transform 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
              }}
              >
                <div style={{ fontWeight: 'bold' }}>{selectedOrder.doctor.name}</div>
                <div style={{ fontSize: '14px', color: '#666' }}>{selectedOrder.doctor.specialization}</div>
                <div style={{ fontSize: '14px', marginTop: '5px' }}>
                  <strong>License:</strong> {selectedOrder.doctor.license}
                </div>
                <div style={{ 
                  marginTop: '8px',
                  padding: '4px 8px',
                  borderRadius: '12px',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  backgroundColor: selectedOrder.doctor.verified ? '#28a745' : '#ffc107',
                  color: 'white',
                  display: 'inline-block'
                }}>
                  {selectedOrder.doctor.verified ? 'Verified' : 'Pending Verification'}
                </div>
              </div>
            </div>

            {/* Medicines List */}
            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ 
                color: primaryColor, 
                marginBottom: '10px',
                borderBottom: `1px solid ${accentColor}`,
                paddingBottom: '5px'
              }}>
                Prescribed Medicines
              </h4>
              <div style={{ display: 'grid', gap: '10px' }}>
                {selectedOrder.medicines.map((medicine, index) => (
                  <div key={medicine.id} style={{
                    padding: '15px',
                    backgroundColor: accentColor,
                    borderRadius: '5px',
                    border: `1px solid ${primaryColor}20`,
                    transition: 'transform 0.2s, box-shadow 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '8px' }}>
                      <div>
                        <strong style={{ fontSize: '16px' }}>{medicine.name}</strong>
                        <div style={{ fontSize: '14px', color: primaryColor }}>{medicine.dosage}</div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontWeight: 'bold' }}>Qty: {medicine.quantity}</div>
                        <div style={{ fontSize: '12px', color: '#666' }}>{medicine.duration}</div>
                      </div>
                    </div>
                    <div style={{ fontSize: '13px', color: '#666', marginBottom: '8px' }}>
                      <strong>Frequency:</strong> {medicine.frequency}
                    </div>
                    
                    {/* Substitution Suggestions */}
                    {medicine.substitution.available && (
                      <div style={{ marginTop: '10px' }}>
                        <label style={{ fontSize: '13px', fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>
                          Substitution Suggestions:
                        </label>
                        <select
                          value={substitutionSuggestions[`${selectedOrder.id}-${medicine.id}`] || medicine.substitution.selected || ''}
                          onChange={(e) => handleSubstitutionChange(selectedOrder.id, medicine.id, e.target.value)}
                          style={{
                            width: '100%',
                            padding: '6px',
                            border: `1px solid ${accentColor}`,
                            borderRadius: '4px',
                            fontSize: '12px',
                            backgroundColor: 'white',
                            transition: 'border-color 0.3s, box-shadow 0.3s'
                          }}
                          onFocus={(e) => {
                            e.target.style.borderColor = primaryColor;
                            e.target.style.boxShadow = `0 0 0 2px ${accentColor}`;
                          }}
                          onBlur={(e) => {
                            e.target.style.borderColor = accentColor;
                            e.target.style.boxShadow = 'none';
                          }}
                        >
                          <option value="">Keep original: {medicine.name}</option>
                          {medicine.substitution.suggestions.map(suggestion => (
                            <option key={suggestion} value={suggestion}>{suggestion}</option>
                          ))}
                        </select>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Pharmacist Notes */}
            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ 
                color: primaryColor, 
                marginBottom: '10px',
                borderBottom: `1px solid ${accentColor}`,
                paddingBottom: '5px'
              }}>
                Pharmacist Notes
              </h4>
              <textarea
                value={pharmacistNotes}
                onChange={(e) => setPharmacistNotes(e.target.value)}
                placeholder="Add observations or notes about this prescription..."
                style={{
                  width: '100%',
                  height: '80px',
                  padding: '10px',
                  border: `1px solid ${accentColor}`,
                  borderRadius: '5px',
                  fontSize: '14px',
                  resize: 'vertical',
                  transition: 'border-color 0.3s, box-shadow 0.3s',
                  fontFamily: 'inherit'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = primaryColor;
                  e.target.style.boxShadow = `0 0 0 2px ${accentColor}`;
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = accentColor;
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>

            {/* Action Buttons */}
            <div style={{ 
              display: 'flex', 
              gap: '10px', 
              flexDirection: 'column',
              borderTop: `1px solid ${accentColor}`,
              paddingTop: '15px'
            }}>
              <button 
                onClick={() => handleApproveOrder(selectedOrder.id)}
                style={{
                  padding: '12px',
                  backgroundColor: '#28a745',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  fontSize: '14px',
                  transition: 'background-color 0.3s, transform 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#218838';
                  e.target.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#28a745';
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                ✓ Approve Prescription
              </button>
              <button 
                onClick={() => setShowRejectModal(true)}
                style={{
                  padding: '12px',
                  backgroundColor: '#dc3545',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  transition: 'background-color 0.3s, transform 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#c82333';
                  e.target.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#dc3545';
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                ✗ Reject with Reason
              </button>
              <button 
                onClick={() => setShowClarificationModal(true)}
                style={{
                  padding: '12px',
                  backgroundColor: '#ffc107',
                  color: 'black',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  transition: 'background-color 0.3s, transform 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#e0a800';
                  e.target.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#ffc107';
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                ⁇ Request Clarification
              </button>
            </div>

            {/* Audit Logs */}
            {selectedOrder.auditLogs.length > 0 && (
              <div style={{ 
                marginTop: '20px', 
                paddingTop: '15px', 
                borderTop: `1px solid ${accentColor}` 
              }}>
                <h4 style={{ 
                  color: primaryColor, 
                  marginBottom: '10px',
                  borderBottom: `1px solid ${accentColor}`,
                  paddingBottom: '5px'
                }}>
                  Audit Log
                </h4>
                <div style={{ maxHeight: '150px', overflowY: 'auto' }}>
                  {selectedOrder.auditLogs.map((log, index) => (
                    <div key={index} style={{ 
                      padding: '8px 0',
                      borderBottom: index < selectedOrder.auditLogs.length - 1 ? '1px solid #eee' : 'none',
                      transition: 'background-color 0.3s'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#f8f9fa';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                    >
                      <div style={{ fontSize: '12px', fontWeight: 'bold' }}>{log.action}</div>
                      <div style={{ fontSize: '11px', color: '#666' }}>
                        By {log.user} at {log.timestamp}
                      </div>
                      {log.note && <div style={{ fontSize: '11px', color: '#666' }}>Note: {log.note}</div>}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Reject Modal */}
      {showRejectModal && selectedOrder && (
        <RejectModal 
          order={selectedOrder}
          onClose={() => setShowRejectModal(false)}
          onConfirm={handleRejectOrder}
        />
      )}

      {/* Clarification Modal */}
      {showClarificationModal && selectedOrder && (
        <ClarificationModal 
          order={selectedOrder}
          onClose={() => setShowClarificationModal(false)}
          onConfirm={handleRequestClarification}
        />
      )}
    </div>
  );
};
 
export default OrdersManagement;