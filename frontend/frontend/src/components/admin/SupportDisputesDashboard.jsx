import React, { useState, useEffect } from 'react';

const SupportDisputesDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [cases, setCases] = useState([]);
  const [filteredCases, setFilteredCases] = useState([]);
  const [selectedCase, setSelectedCase] = useState(null);
  const [showCaseDetail, setShowCaseDetail] = useState(false);
  const [newNote, setNewNote] = useState('');
  const [hoveredRow, setHoveredRow] = useState(null);
  const [hoveredButton, setHoveredButton] = useState(null);

  // Mock data - replace with actual API calls
  const mockCases = [
    {
      id: 'C-4823',
      caseId: 'C-4823',
      user: 'John Wilson',
      userId: 'U12345',
      orderId: '10052',
      phone: '+1-555-0123',
      issue: 'Damaged Medicine',
      description: 'Customer received damaged medicine package. The seal was broken and some tablets were crushed.',
      status: 'Pending Review',
      createdAt: '2024-01-15T10:30:00Z',
      evidence: ['image1.jpg', 'image2.jpg'],
      orderDetails: {
        products: ['Paracetamol 500mg', 'Vitamin C tablets'],
        pharmacy: 'MedPlus',
        deliveryAgent: 'Rider-456',
        amount: '$24.99'
      },
      timeline: [
        { event: 'Order Placed', time: '2024-01-14T09:00:00Z' },
        { event: 'Packed', time: '2024-01-14T10:15:00Z' },
        { event: 'Dispatched', time: '2024-01-14T11:30:00Z' },
        { event: 'Delivered', time: '2024-01-14T14:45:00Z' }
      ],
      contactLogs: [
        { type: 'Chat', time: '2024-01-15T10:35:00Z', summary: 'Customer reported issue' }
      ],
      internalNotes: [
        { staff: 'Admin User', time: '2024-01-15T11:00:00Z', note: 'Initial review pending' }
      ]
    },
    {
      id: 'C-4835',
      caseId: 'C-4835',
      user: 'Kaha Rao',
      userId: 'U12346',
      orderId: '10050',
      phone: '+1-555-0124',
      issue: 'Late Delivery',
      description: 'Order delivered 3 hours later than promised delivery time.',
      status: 'Refund Requested',
      createdAt: '2024-01-14T16:20:00Z',
      evidence: [],
      orderDetails: {
        products: ['Aspirin 75mg'],
        pharmacy: 'PharmaEasy',
        deliveryAgent: 'Rider-789',
        amount: '$12.50'
      },
      timeline: [
        { event: 'Order Placed', time: '2024-01-14T13:00:00Z' },
        { event: 'Packed', time: '2024-01-14T13:45:00Z' },
        { event: 'Dispatched', time: '2024-01-14T14:30:00Z' },
        { event: 'Delivered', time: '2024-01-14T18:15:00Z' }
      ],
      contactLogs: [
        { type: 'Call', time: '2024-01-14T17:30:00Z', summary: 'Customer complained about delay' }
      ],
      internalNotes: [
        { staff: 'Support Agent', time: '2024-01-14T17:45:00Z', note: 'Verified delivery timestamp - confirmed delay' }
      ]
    },
    {
      id: 'C-4821',
      caseId: 'C-4821',
      user: 'Ali Khan',
      userId: 'U12347',
      orderId: '10059',
      phone: '+1-555-0125',
      issue: 'Incorrect Item',
      description: 'Received wrong medication. Ordered Amoxicillin but received Azithromycin.',
      status: 'In Review',
      createdAt: '2024-01-13T09:15:00Z',
      evidence: ['prescription.jpg', 'received_item.jpg'],
      orderDetails: {
        products: ['Amoxicillin 250mg'],
        pharmacy: 'HealthMart',
        deliveryAgent: 'Rider-123',
        amount: '$18.75'
      },
      timeline: [
        { event: 'Order Placed', time: '2024-01-12T15:30:00Z' },
        { event: 'Packed', time: '2024-01-12T16:15:00Z' },
        { event: 'Dispatched', time: '2024-01-12T17:00:00Z' },
        { event: 'Delivered', time: '2024-01-12T19:30:00Z' }
      ],
      contactLogs: [
        { type: 'Chat', time: '2024-01-13T09:20:00Z', summary: 'Customer reported wrong item received' },
        { type: 'Call', time: '2024-01-13T14:00:00Z', summary: 'Follow-up call with pharmacy' }
      ],
      internalNotes: [
        { staff: 'Support Manager', time: '2024-01-13T10:00:00Z', note: 'Contacted pharmacy for verification' },
        { staff: 'Pharmacy Manager', time: '2024-01-13T14:30:00Z', note: 'Confirmed packing error from our end' }
      ]
    }
  ];

  useEffect(() => {
    // Simulate API call
    setCases(mockCases);
    setFilteredCases(mockCases);
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = cases.filter(caseItem =>
        caseItem.caseId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        caseItem.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
        caseItem.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        caseItem.phone.includes(searchTerm)
      );
      setFilteredCases(filtered);
    } else {
      setFilteredCases(cases);
    }
  }, [searchTerm, cases]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleViewCase = (caseItem) => {
    setSelectedCase(caseItem);
    setShowCaseDetail(true);
  };

  const handleOpenRefund = (caseItem) => {
    // Simulate moving case to refunds dashboard
    const updatedCases = cases.map(c =>
      c.id === caseItem.id ? { ...c, status: 'Refund Requested' } : c
    );
    setCases(updatedCases);
    alert(`Case ${caseItem.caseId} moved to Refunds Dashboard`);
  };

  const handleAddNote = (caseItem) => {
    if (newNote.trim()) {
      const updatedCases = cases.map(c =>
        c.id === caseItem.id ? {
          ...c,
          internalNotes: [
            ...c.internalNotes,
            {
              staff: 'Current Admin',
              time: new Date().toISOString(),
              note: newNote
            }
          ]
        } : c
      );
      setCases(updatedCases);
      setNewNote('');
      alert('Note added successfully');
    }
  };

  const handleRequestRefund = () => {
    if (selectedCase) {
      handleOpenRefund(selectedCase);
      setShowCaseDetail(false);
    }
  };

  const handleRequestReplacement = () => {
    if (selectedCase) {
      // Implement replacement logic
      alert(`Replacement requested for order ${selectedCase.orderId}`);
    }
  };

  const handleCloseCase = () => {
    if (selectedCase) {
      const updatedCases = cases.map(c =>
        c.id === selectedCase.id ? { ...c, status: 'Resolved' } : c
      );
      setCases(updatedCases);
      setShowCaseDetail(false);
      alert(`Case ${selectedCase.caseId} closed`);
    }
  };

  const maskPhoneNumber = (phone) => {
    return phone.replace(/(\d{3})-(\d{3})-(\d{2})/, 'XXX-XXX-$3');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending Review': return '#FFA500';
      case 'Refund Requested': return '#FF6B6B';
      case 'In Review': return '#4ECDC4';
      case 'Resolved': return '#45B7D1';
      default: return '#95A5A6';
    }
  };

  // Button styles with hover effects
  const getButtonStyle = (baseColor, buttonType, caseId = null) => {
    const isHovered = hoveredButton === `${buttonType}-${caseId || selectedCase?.id}`;
    return {
      padding: '8px 12px',
      backgroundColor: isHovered ? darkenColor(baseColor, 20) : baseColor,
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '12px',
      transition: 'all 0.2s ease-in-out',
      transform: isHovered ? 'translateY(-1px)' : 'none',
      boxShadow: isHovered ? '0 2px 4px rgba(0,0,0,0.2)' : 'none',
      minWidth: '85px'
    };
  };

  const darkenColor = (color, percent) => {
    const num = parseInt(color.replace("#", ""), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) - amt;
    const G = (num >> 8 & 0x00FF) - amt;
    const B = (num & 0x0000FF) - amt;
    return "#" + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
            (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
            (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
  };

  if (showCaseDetail && selectedCase) {
    return (
      <div style={{ padding: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2>Case Details: {selectedCase.caseId}</h2>
          <button
            onClick={() => setShowCaseDetail(false)}
            style={getButtonStyle('#7C2A62', 'back')}
            onMouseEnter={() => setHoveredButton('back')}
            onMouseLeave={() => setHoveredButton(null)}
          >
            ← Back to Cases
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
          {/* Left Column - Main Content */}
          <div>
            {/* Customer Message */}
            <div style={{ 
              backgroundColor: '#f8f9fa', 
              padding: '15px', 
              borderRadius: '5px', 
              marginBottom: '20px',
              borderLeft: '4px solid #7C2A62'
            }}>
              <h4>Customer Message</h4>
              <p>{selectedCase.description}</p>
            </div>

            {/* Evidence */}
            {selectedCase.evidence.length > 0 && (
              <div style={{ marginBottom: '20px' }}>
                <h4>Uploaded Evidence</h4>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  {selectedCase.evidence.map((evidence, index) => (
                    <div 
                      key={index} 
                      style={{
                        padding: '10px',
                        border: '1px solid #ddd',
                        borderRadius: '5px',
                        backgroundColor: '#f8f9fa',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#e9ecef';
                        e.currentTarget.style.borderColor = '#7C2A62';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#f8f9fa';
                        e.currentTarget.style.borderColor = '#ddd';
                      }}
                    >
                      📎 {evidence}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Order Information */}
            <div style={{ 
              marginBottom: '20px',
              padding: '15px',
              border: '1px solid #e0e0e0',
              borderRadius: '5px'
            }}>
              <h4>Order Information</h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div><strong>Order ID:</strong> {selectedCase.orderId}</div>
                <div><strong>Amount:</strong> {selectedCase.orderDetails.amount}</div>
                <div><strong>Pharmacy:</strong> {selectedCase.orderDetails.pharmacy}</div>
                <div><strong>Delivery Agent:</strong> {selectedCase.orderDetails.deliveryAgent}</div>
              </div>
              <div style={{ marginTop: '10px' }}>
                <strong>Products:</strong>
                <ul style={{ margin: '5px 0', paddingLeft: '20px' }}>
                  {selectedCase.orderDetails.products.map((product, index) => (
                    <li key={index}>{product}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Timeline */}
            <div style={{ 
              marginBottom: '20px',
              padding: '15px',
              border: '1px solid #e0e0e0',
              borderRadius: '5px'
            }}>
              <h4>Order Timeline</h4>
              <div style={{ borderLeft: '2px solid #7C2A62', paddingLeft: '15px' }}>
                {selectedCase.timeline.map((event, index) => (
                  <div 
                    key={index} 
                    style={{ 
                      marginBottom: '15px',
                      position: 'relative'
                    }}
                  >
                    <div style={{
                      position: 'absolute',
                      left: '-20px',
                      top: '0',
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      backgroundColor: '#7C2A62'
                    }}></div>
                    <strong>{event.event}</strong>
                    <div style={{ fontSize: '12px', color: '#666' }}>
                      {new Date(event.time).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Actions and Logs */}
          <div>
            {/* Actions */}
            <div style={{ 
              backgroundColor: '#F7D9EB', 
              padding: '15px', 
              borderRadius: '5px', 
              marginBottom: '20px',
              border: '1px solid #e0e0e0'
            }}>
              <h4>Case Actions</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <button
                  onClick={handleRequestRefund}
                  style={getButtonStyle('#7C2A62', 'refund')}
                  onMouseEnter={() => setHoveredButton('refund')}
                  onMouseLeave={() => setHoveredButton(null)}
                >
                  Request Refund
                </button>
                <button
                  onClick={handleRequestReplacement}
                  style={getButtonStyle('#45B7D1', 'replacement')}
                  onMouseEnter={() => setHoveredButton('replacement')}
                  onMouseLeave={() => setHoveredButton(null)}
                >
                  Request Replacement
                </button>
                <button
                  onClick={handleCloseCase}
                  style={getButtonStyle('#95A5A6', 'close')}
                  onMouseEnter={() => setHoveredButton('close')}
                  onMouseLeave={() => setHoveredButton(null)}
                >
                  Close Case
                </button>
              </div>
            </div>

            {/* Contact Logs */}
            <div style={{ 
              marginBottom: '20px',
              padding: '15px',
              border: '1px solid #e0e0e0',
              borderRadius: '5px'
            }}>
              <h4>Contact Logs</h4>
              {selectedCase.contactLogs.map((log, index) => (
                <div 
                  key={index} 
                  style={{
                    padding: '10px',
                    border: '1px solid #ddd',
                    borderRadius: '5px',
                    marginBottom: '8px',
                    fontSize: '14px',
                    backgroundColor: '#f8f9fa',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#e9ecef';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#f8f9fa';
                  }}
                >
                  <strong>{log.type}:</strong> {log.summary}
                  <div style={{ fontSize: '12px', color: '#666' }}>
                    {new Date(log.time).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>

            {/* Internal Notes */}
            <div style={{
              padding: '15px',
              border: '1px solid #e0e0e0',
              borderRadius: '5px'
            }}>
              <h4>Internal Notes</h4>
              <div style={{ marginBottom: '10px' }}>
                <textarea
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="Add internal note..."
                  style={{
                    width: '100%',
                    height: '60px',
                    padding: '8px',
                    border: '1px solid #ddd',
                    borderRadius: '5px',
                    fontSize: '14px',
                    resize: 'vertical'
                  }}
                />
                <button
                  onClick={() => handleAddNote(selectedCase)}
                  style={getButtonStyle('#7C2A62', 'add-note')}
                  onMouseEnter={() => setHoveredButton('add-note')}
                  onMouseLeave={() => setHoveredButton(null)}
                >
                  Add Note
                </button>
              </div>
              {selectedCase.internalNotes.map((note, index) => (
                <div 
                  key={index} 
                  style={{
                    padding: '10px',
                    border: '1px solid #ddd',
                    borderRadius: '5px',
                    marginBottom: '8px',
                    fontSize: '14px',
                    backgroundColor: '#f8f9fa',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#e9ecef';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#f8f9fa';
                  }}
                >
                  <div><strong>{note.staff}:</strong> {note.note}</div>
                  <div style={{ fontSize: '12px', color: '#666' }}>
                    {new Date(note.time).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <div style={{ 
        backgroundColor: 'white', 
        borderRadius: '8px', 
        padding: '20px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{ color: '#7C2A62', marginBottom: '20px' }}>Support & Disputes</h2>
        
        {/* Search Bar */}
        <div style={{ marginBottom: '20px' }}>
          <input
            type="text"
            placeholder="Search Case ID / User / Order ID / Phone"
            value={searchTerm}
            onChange={handleSearch}
            style={{
              width: '100%',
              padding: '12px',
              border: '1px solid #ddd',
              borderRadius: '8px',
              fontSize: '16px',
              transition: 'all 0.2s ease',
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#7C2A62';
              e.target.style.boxShadow = '0 0 0 2px rgba(124, 42, 98, 0.2)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#ddd';
              e.target.style.boxShadow = 'none';
            }}
          />
        </div>

        {/* Cases Table */}
        <div style={{ overflowX: 'auto', borderRadius: '8px', border: '1px solid #e0e0e0' }}>
          <table style={{ 
            width: '100%', 
            borderCollapse: 'collapse', 
            backgroundColor: 'white',
            tableLayout: 'fixed'
          }}>
            <thead>
              <tr style={{ backgroundColor: '#7C2A62', color: 'white' }}>
                <th style={{ 
                  padding: '15px 12px', 
                  textAlign: 'left', 
                  fontWeight: '600',
                  width: '12%',
                  borderBottom: '2px solid #5a1f4a'
                }}>Case ID</th>
                <th style={{ 
                  padding: '15px 12px', 
                  textAlign: 'left', 
                  fontWeight: '600',
                  width: '20%',
                  borderBottom: '2px solid #5a1f4a'
                }}>User</th>
                <th style={{ 
                  padding: '15px 12px', 
                  textAlign: 'left', 
                  fontWeight: '600',
                  width: '12%',
                  borderBottom: '2px solid #5a1f4a'
                }}>Order ID</th>
                <th style={{ 
                  padding: '15px 12px', 
                  textAlign: 'left', 
                  fontWeight: '600',
                  width: '18%',
                  borderBottom: '2px solid #5a1f4a'
                }}>Issue</th>
                <th style={{ 
                  padding: '15px 12px', 
                  textAlign: 'left', 
                  fontWeight: '600',
                  width: '15%',
                  borderBottom: '2px solid #5a1f4a'
                }}>Status</th>
                <th style={{ 
                  padding: '15px 12px', 
                  textAlign: 'left', 
                  fontWeight: '600',
                  width: '23%',
                  borderBottom: '2px solid #5a1f4a'
                }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredCases.map((caseItem) => (
                <tr 
                  key={caseItem.id} 
                  style={{ 
                    borderBottom: '1px solid #e0e0e0',
                    backgroundColor: hoveredRow === caseItem.id ? '#f8f9fa' : 'white',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={() => setHoveredRow(caseItem.id)}
                  onMouseLeave={() => setHoveredRow(null)}
                >
                  {/* Case ID */}
                  <td style={{ 
                    padding: '15px 12px', 
                    fontWeight: '500',
                    verticalAlign: 'middle',
                    borderBottom: '1px solid #e0e0e0',
                    textAlign: 'left'
                  }}>{caseItem.caseId}</td>
                  
                  {/* User */}
                  <td style={{ 
                    padding: '15px 12px',
                    verticalAlign: 'middle',
                    borderBottom: '1px solid #e0e0e0',
                    textAlign: 'left'
                  }}>
                    <div style={{ 
                      fontWeight: '500', 
                      marginBottom: '4px',
                      lineHeight: '1.4'
                    }}>{caseItem.user}</div>
                    <div style={{ 
                      fontSize: '12px', 
                      color: '#666',
                      lineHeight: '1.3'
                    }}>
                      {caseItem.phone}
                    </div>
                  </td>
                  
                  {/* Order ID */}
                  <td style={{ 
                    padding: '15px 12px', 
                    verticalAlign: 'middle',
                    borderBottom: '1px solid #e0e0e0',
                    textAlign: 'left'
                  }}>{caseItem.orderId}</td>
                  
                  {/* Issue */}
                  <td style={{ 
                    padding: '15px 12px', 
                    verticalAlign: 'middle',
                    borderBottom: '1px solid #e0e0e0',
                    textAlign: 'left'
                  }}>{caseItem.issue}</td>
                  
                  {/* Status */}
                  <td style={{ 
                    padding: '15px 12px', 
                    verticalAlign: 'middle',
                    borderBottom: '1px solid #e0e0e0',
                    textAlign: 'left'
                  }}>
                    <span style={{
                      padding: '6px 12px',
                      borderRadius: '15px',
                      backgroundColor: getStatusColor(caseItem.status),
                      color: 'white',
                      fontSize: '12px',
                      fontWeight: '500',
                      display: 'inline-block',
                      minWidth: '120px',
                      textAlign: 'center'
                    }}>
                      {caseItem.status}
                    </span>
                  </td>
                  
                  {/* Action */}
                  <td style={{ 
                    padding: '15px 12px', 
                    verticalAlign: 'middle',
                    borderBottom: '1px solid #e0e0e0',
                    textAlign: 'left'
                  }}>
                    <div style={{ 
                      display: 'flex', 
                      gap: '6px', 
                      flexWrap: 'wrap',
                      alignItems: 'center'
                    }}>
                      <button
                        onClick={() => handleViewCase(caseItem)}
                        style={getButtonStyle('#7C2A62', 'view', caseItem.id)}
                        onMouseEnter={() => setHoveredButton(`view-${caseItem.id}`)}
                        onMouseLeave={() => setHoveredButton(null)}
                      >
                        View Case
                      </button>
                      {caseItem.status === 'Pending Review' && (
                        <button
                          onClick={() => handleOpenRefund(caseItem)}
                          style={getButtonStyle('#FF6B6B', 'open-refund', caseItem.id)}
                          onMouseEnter={() => setHoveredButton(`open-refund-${caseItem.id}`)}
                          onMouseLeave={() => setHoveredButton(null)}
                        >
                          Open Refund
                        </button>
                      )}
                      <button
                        onClick={() => {
                          setSelectedCase(caseItem);
                          setShowCaseDetail(true);
                        }}
                        style={getButtonStyle('#45B7D1', 'add-notes', caseItem.id)}
                        onMouseEnter={() => setHoveredButton(`add-notes-${caseItem.id}`)}
                        onMouseLeave={() => setHoveredButton(null)}
                      >
                        Add Notes
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredCases.length === 0 && (
            <div style={{ 
              textAlign: 'center', 
              padding: '40px', 
              color: '#666',
              backgroundColor: 'white',
              borderBottom: '1px solid #e0e0e0'
            }}>
              No cases found matching your search criteria.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SupportDisputesDashboard;