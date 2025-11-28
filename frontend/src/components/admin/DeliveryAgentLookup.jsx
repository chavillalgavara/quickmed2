import React, { useState, useEffect, useRef } from 'react';

const DeliveryAgentLookup = () => {
  const primaryColor = '#7C2A62';
  const accentColor = '#F7D9EB';
  const hoverColor = '#8C3A72';
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [agents, setAgents] = useState([]);
  const [showAllAgents, setShowAllAgents] = useState(true);
  const [showSuspendModal, setShowSuspendModal] = useState(false);
  const [suspendReason, setSuspendReason] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);
  const [editedAgent, setEditedAgent] = useState(null);
  const [showIncentiveModal, setShowIncentiveModal] = useState(false);
  const [incentiveData, setIncentiveData] = useState({ amount: '', reason: '' });
  const [showEarnings, setShowEarnings] = useState(false);
  const [earningsData, setEarningsData] = useState([]);

  // Create ref for earnings section
  const earningsRef = useRef(null);

  // Mock data with Indian phone numbers only
  const mockAgents = [
    {
      id: 'DA001',
      name: 'Raj Kumar',
      region: 'Central Bangalore',
      phone: '+91 98765 43210',
      email: 'raj.kumar@quickmed.com',
      vehicleType: 'Bike',
      vehicleNumber: 'KA01AB1234',
      status: 'Active',
      licenseNumber: 'DL12345678901234',
      verificationStatus: 'Verified',
      totalDeliveries: 345,
      onTimePercentage: 92,
      averageDeliveryTime: '25 mins',
      averageRating: 4.7,
      joinDate: '2023-06-15',
      address: '123 MG Road, Bangalore',
      
      // Performance Trends
      performanceTrend: {
        weekly: [88, 92, 90, 94, 91, 93, 92],
        monthly: [89, 91, 90, 92, 93, 94, 92, 91, 93, 92, 94, 92]
      },
      
      // Customer Feedback
      recentReviews: [
        {
          id: 1,
          customer: 'Priya Sharma',
          rating: 5,
          comment: 'Very professional and on-time delivery. Medicine was handled carefully.',
          date: '2024-01-14',
          orderId: 'ORD1001'
        },
        {
          id: 2,
          customer: 'Arun Patel',
          rating: 4,
          comment: 'Good service but delivery was slightly delayed due to traffic.',
          date: '2024-01-13',
          orderId: 'ORD1002'
        },
        {
          id: 3,
          customer: 'Sneha Reddy',
          rating: 5,
          comment: 'Excellent service! Very polite and careful with the package.',
          date: '2024-01-12',
          orderId: 'ORD1003'
        }
      ],
      
      // Delivery History
      deliveryHistory: [
        {
          date: '2024-01-15',
          orderId: 'ORD1015',
          customer: 'John Wilson',
          address: '456 Koramangala, Bangalore',
          status: 'Delivered',
          deliveryTime: '24 mins',
          rating: 5
        },
        {
          date: '2024-01-15',
          orderId: 'ORD1014',
          customer: 'Meera Iyer',
          address: '789 Indiranagar, Bangalore',
          status: 'Delivered',
          deliveryTime: '28 mins',
          rating: 4
        },
        {
          date: '2024-01-14',
          orderId: 'ORD1013',
          customer: 'Rahul Verma',
          address: '321 Jayanagar, Bangalore',
          status: 'Delivered',
          deliveryTime: '22 mins',
          rating: 5
        },
        {
          date: '2024-01-14',
          orderId: 'ORD1012',
          customer: 'Anita Desai',
          address: '654 Whitefield, Bangalore',
          status: 'Delivered',
          deliveryTime: '35 mins',
          rating: 4
        },
        {
          date: '2024-01-13',
          orderId: 'ORD1011',
          customer: 'Karan Singh',
          address: '987 HSR Layout, Bangalore',
          status: 'Delivered',
          deliveryTime: '26 mins',
          rating: 5
        }
      ]
    },
    {
      id: 'DA002',
      name: 'Priya Singh',
      region: 'South Bangalore',
      phone: '+91 87654 32109',
      email: 'priya.singh@quickmed.com',
      vehicleType: 'Scooter',
      vehicleNumber: 'KA01CD5678',
      status: 'Active',
      licenseNumber: 'DL12345678901235',
      verificationStatus: 'Verified',
      totalDeliveries: 289,
      onTimePercentage: 95,
      averageDeliveryTime: '23 mins',
      averageRating: 4.8,
      joinDate: '2023-08-22',
      address: '456 Koramangala, Bangalore',
      
      performanceTrend: {
        weekly: [92, 94, 93, 95, 94, 96, 95],
        monthly: [91, 93, 94, 95, 94, 95, 96, 95, 94, 95, 96, 95]
      },
      
      recentReviews: [
        {
          id: 1,
          customer: 'Rohan Mehta',
          rating: 5,
          comment: 'Fastest delivery ever! Very satisfied with the service.',
          date: '2024-01-14',
          orderId: 'ORD1004'
        },
        {
          id: 2,
          customer: 'Anjali Rao',
          rating: 5,
          comment: 'Courteous and efficient service. Highly recommended!',
          date: '2024-01-13',
          orderId: 'ORD1005'
        }
      ],
      
      deliveryHistory: [
        {
          date: '2024-01-15',
          orderId: 'ORD1016',
          customer: 'Sanjay Kumar',
          address: '123 Bannerghatta Road, Bangalore',
          status: 'Delivered',
          deliveryTime: '21 mins',
          rating: 5
        },
        {
          date: '2024-01-14',
          orderId: 'ORD1017',
          customer: 'Lakshmi Nair',
          address: '789 JP Nagar, Bangalore',
          status: 'Delivered',
          deliveryTime: '19 mins',
          rating: 5
        }
      ]
    },
    {
      id: 'DA003',
      name: 'Amit Sharma',
      region: 'North Bangalore',
      phone: '+91 76543 21098',
      email: 'amit.sharma@quickmed.com',
      vehicleType: 'Bike',
      vehicleNumber: 'KA01EF9012',
      status: 'Inactive',
      licenseNumber: 'DL12345678901236',
      verificationStatus: 'Pending',
      totalDeliveries: 156,
      onTimePercentage: 85,
      averageDeliveryTime: '32 mins',
      averageRating: 4.2,
      joinDate: '2023-11-05',
      address: '789 Hebbal, Bangalore',
      
      performanceTrend: {
        weekly: [82, 85, 83, 86, 84, 85, 85],
        monthly: [80, 82, 83, 84, 85, 86, 85, 84, 85, 86, 85, 85]
      },
      
      recentReviews: [
        {
          id: 1,
          customer: 'Neha Gupta',
          rating: 4,
          comment: 'Good service but could improve communication.',
          date: '2024-01-10',
          orderId: 'ORD1006'
        },
        {
          id: 2,
          customer: 'Vikram Joshi',
          rating: 3,
          comment: 'Delivery was late but agent was apologetic.',
          date: '2024-01-09',
          orderId: 'ORD1007'
        }
      ],
      
      deliveryHistory: [
        {
          date: '2024-01-10',
          orderId: 'ORD1010',
          customer: 'Vikram Joshi',
          address: '456 Yeshwanthpur, Bangalore',
          status: 'Delivered',
          deliveryTime: '30 mins',
          rating: 4
        },
        {
          date: '2024-01-09',
          orderId: 'ORD1009',
          customer: 'Priya Menon',
          address: '321 Malleshwaram, Bangalore',
          status: 'Delivered',
          deliveryTime: '35 mins',
          rating: 3
        }
      ]
    },
    {
      id: 'DA004',
      name: 'Suresh Reddy',
      region: 'East Bangalore',
      phone: '+91 65432 10987',
      email: 'suresh.reddy@quickmed.com',
      vehicleType: 'Bike',
      vehicleNumber: 'KA01GH3456',
      status: 'Active',
      licenseNumber: 'DL12345678901237',
      verificationStatus: 'Verified',
      totalDeliveries: 412,
      onTimePercentage: 94,
      averageDeliveryTime: '26 mins',
      averageRating: 4.6,
      joinDate: '2023-04-18',
      address: '234 KR Puram, Bangalore',
      
      performanceTrend: {
        weekly: [91, 93, 92, 94, 93, 95, 94],
        monthly: [90, 92, 93, 94, 93, 94, 95, 94, 93, 94, 95, 94]
      },
      
      recentReviews: [
        {
          id: 1,
          customer: 'Ramesh Kumar',
          rating: 5,
          comment: 'Excellent service! Always on time.',
          date: '2024-01-15',
          orderId: 'ORD1008'
        }
      ],
      
      deliveryHistory: [
        {
          date: '2024-01-15',
          orderId: 'ORD1018',
          customer: 'Geeta Sharma',
          address: '567 Marathahalli, Bangalore',
          status: 'Delivered',
          deliveryTime: '27 mins',
          rating: 5
        }
      ]
    },
    {
      id: 'DA005',
      name: 'Anjali Patel',
      region: 'West Bangalore',
      phone: '+91 94321 09876',
      email: 'anjali.patel@quickmed.com',
      vehicleType: 'Scooter',
      vehicleNumber: 'KA01IJ7890',
      status: 'Active',
      licenseNumber: 'DL12345678901238',
      verificationStatus: 'Verified',
      totalDeliveries: 278,
      onTimePercentage: 96,
      averageDeliveryTime: '22 mins',
      averageRating: 4.9,
      joinDate: '2023-09-12',
      address: '876 Vijayanagar, Bangalore',
      
      performanceTrend: {
        weekly: [94, 95, 95, 96, 95, 97, 96],
        monthly: [93, 94, 95, 96, 95, 96, 97, 96, 95, 96, 97, 96]
      },
      
      recentReviews: [
        {
          id: 1,
          customer: 'Deepak Verma',
          rating: 5,
          comment: 'Best delivery agent! Very professional.',
          date: '2024-01-14',
          orderId: 'ORD1009'
        }
      ],
      
      deliveryHistory: [
        {
          date: '2024-01-14',
          orderId: 'ORD1019',
          customer: 'Mohan Das',
          address: '654 Rajajinagar, Bangalore',
          status: 'Delivered',
          deliveryTime: '20 mins',
          rating: 5
        }
      ]
    }
  ];

  // Mock earnings data
  const mockEarningsData = [
    { date: '2024-01-15', deliveries: 12, earnings: 840, incentives: 100, total: 940 },
    { date: '2024-01-14', deliveries: 10, earnings: 700, incentives: 50, total: 750 },
    { date: '2024-01-13', deliveries: 8, earnings: 560, incentives: 0, total: 560 },
    { date: '2024-01-12', deliveries: 11, earnings: 770, incentives: 75, total: 845 },
    { date: '2024-01-11', deliveries: 9, earnings: 630, incentives: 25, total: 655 },
  ];

  useEffect(() => {
    // Load all agents initially
    setAgents(mockAgents);
    setSelectedAgent(mockAgents[0]); // Select first agent by default
    setShowAllAgents(true);
    setEarningsData(mockEarningsData);
  }, []);

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setSelectedAgent(agents[0]);
      setShowAllAgents(true);
      return;
    }

    const foundAgent = agents.find(a => 
      a.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
      a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.phone.includes(searchQuery) ||
      a.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    setSelectedAgent(foundAgent || null);
    setShowAllAgents(!foundAgent);
  };

  const handleAdminAction = (action, agentId) => {
    const agent = agents.find(a => a.id === agentId);
    switch (action) {
      case 'activate':
        handleActivateAgent(agentId);
        break;
      case 'suspend':
        setShowSuspendModal(true);
        break;
      case 'edit':
        setEditedAgent({...agent});
        setShowEditModal(true);
        break;
      case 'incentive':
        setShowIncentiveModal(true);
        break;
      case 'earnings':
        handleViewEarnings();
        break;
      default:
        break;
    }
  };

  const handleActivateAgent = (agentId) => {
    const updatedAgents = agents.map(agent => 
      agent.id === agentId ? { ...agent, status: 'Active' } : agent
    );
    setAgents(updatedAgents);
    setSelectedAgent(updatedAgents.find(a => a.id === agentId));
    alert(`Agent ${agentId} has been activated successfully!`);
  };

  const handleSuspendAgent = () => {
    if (!suspendReason.trim()) {
      alert('Please provide a reason for suspension');
      return;
    }

    const updatedAgents = agents.map(agent => 
      agent.id === selectedAgent.id ? { ...agent, status: 'Suspended' } : agent
    );
    setAgents(updatedAgents);
    setSelectedAgent(updatedAgents.find(a => a.id === selectedAgent.id));
    setShowSuspendModal(false);
    setSuspendReason('');
    alert(`Agent ${selectedAgent.id} has been suspended. Reason: ${suspendReason}`);
  };

  const handleEditAgent = () => {
    const updatedAgents = agents.map(agent => 
      agent.id === editedAgent.id ? editedAgent : agent
    );
    setAgents(updatedAgents);
    setSelectedAgent(editedAgent);
    setShowEditModal(false);
    alert('Agent profile updated successfully!');
  };

  const handleAddIncentive = () => {
    if (!incentiveData.amount || !incentiveData.reason) {
      alert('Please fill all incentive fields');
      return;
    }

    // In a real app, you would send this to your backend
    alert(`Incentive of ₹${incentiveData.amount} added to agent ${selectedAgent.id}. Reason: ${incentiveData.reason}`);
    setShowIncentiveModal(false);
    setIncentiveData({ amount: '', reason: '' });
  };

  const handleViewEarnings = () => {
    setShowEarnings(true);
    // Scroll to earnings section after a small delay to ensure it's rendered
    setTimeout(() => {
      if (earningsRef.current) {
        earningsRef.current.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        });
      }
    }, 100);
  };

  // Performance Trend Chart Component
  const PerformanceChart = ({ trend, title, timeFrame }) => {
    const data = timeFrame === 'weekly' ? trend.weekly : trend.monthly;
    const labels = timeFrame === 'weekly' 
      ? ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      : Array.from({ length: 12 }, (_, i) => `Week ${i + 1}`);
    
    const maxValue = Math.max(...data);
    const minValue = Math.min(...data);

    return (
      <div style={{ marginBottom: '20px' }}>
        <h4 style={{ color: primaryColor, marginBottom: '15px', textAlign: 'center' }}>{title}</h4>
        <div style={{ 
          display: 'flex', 
          alignItems: 'end', 
          height: '120px', 
          gap: '8px',
          padding: '15px',
          backgroundColor: '#f8f9fa',
          borderRadius: '5px',
          border: `1px solid ${accentColor}`,
          transition: 'all 0.3s ease'
        }}>
          {data.map((value, index) => {
            const height = ((value - minValue) / (maxValue - minValue)) * 80 + 20;
            return (
              <div key={index} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div
                  style={{
                    height: `${height}px`,
                    width: '20px',
                    backgroundColor: primaryColor,
                    borderRadius: '3px 3px 0 0',
                    marginBottom: '5px',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = hoverColor;
                    e.target.style.transform = 'scale(1.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = primaryColor;
                    e.target.style.transform = 'scale(1)';
                  }}
                />
                <div style={{ fontSize: '10px', color: '#666', textAlign: 'center' }}>
                  {labels[index]}
                </div>
                <div style={{ fontSize: '10px', fontWeight: 'bold', color: primaryColor, textAlign: 'center' }}>
                  {value}%
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // Modal Component
  const Modal = ({ isOpen, onClose, title, children }) => {
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
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000
      }}>
        <div style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          width: '90%',
          maxWidth: '500px',
          maxHeight: '90vh',
          overflowY: 'auto',
          boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
          transition: 'all 0.3s ease'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ color: primaryColor, margin: 0 }}>{title}</h3>
            <button 
              onClick={onClose}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '24px',
                cursor: 'pointer',
                color: '#666',
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
                e.target.style.backgroundColor = '#f0f0f0';
                e.target.style.color = primaryColor;
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.color = '#666';
              }}
            >
              ×
            </button>
          </div>
          {children}
        </div>
      </div>
    );
  };

  // Create separate components for modals to prevent re-renders
  const SuspendModal = () => {
    const [localReason, setLocalReason] = useState(suspendReason);

    const handleLocalSuspend = () => {
      if (!localReason.trim()) {
        alert('Please provide a reason for suspension');
        return;
      }
      setSuspendReason(localReason);
      handleSuspendAgent();
    };

    return (
      <Modal 
        isOpen={showSuspendModal} 
        onClose={() => setShowSuspendModal(false)}
        title="Suspend Delivery Agent"
      >
        <div>
          <p style={{ textAlign: 'center', marginBottom: '20px' }}>Are you sure you want to suspend agent <strong>{selectedAgent?.name}</strong> (ID: {selectedAgent?.id})?</p>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
              Reason for Suspension:
            </label>
            <textarea
              value={localReason}
              onChange={(e) => setLocalReason(e.target.value)}
              placeholder="Enter reason for suspension..."
              style={{
                width: '100%',
                padding: '12px',
                border: `1px solid ${accentColor}`,
                borderRadius: '5px',
                minHeight: '80px',
                resize: 'vertical',
                transition: 'all 0.3s ease',
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
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
            <button
              onClick={() => setShowSuspendModal(false)}
              style={{
                padding: '10px 20px',
                backgroundColor: '#6c757d',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500',
                transition: 'all 0.3s ease',
                minWidth: '120px'
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
              onClick={handleLocalSuspend}
              style={{
                padding: '10px 20px',
                backgroundColor: '#dc3545',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500',
                transition: 'all 0.3s ease',
                minWidth: '120px'
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
              Confirm Suspend
            </button>
          </div>
        </div>
      </Modal>
    );
  };

  const EditModal = () => {
    const [localAgent, setLocalAgent] = useState(editedAgent);

    const handleLocalSave = () => {
      setEditedAgent(localAgent);
      handleEditAgent();
    };

    const handleFieldChange = (field, value) => {
      setLocalAgent(prev => ({
        ...prev,
        [field]: value
      }));
    };

    if (!localAgent) return null;

    return (
      <Modal 
        isOpen={showEditModal} 
        onClose={() => setShowEditModal(false)}
        title="Edit Agent Profile"
      >
        <div>
          <div style={{ display: 'grid', gap: '15px' }}>
            {[
              { label: 'Name:', field: 'name', type: 'text' },
              { label: 'Phone:', field: 'phone', type: 'text' },
              { label: 'Email:', field: 'email', type: 'email' },
              { label: 'Region:', field: 'region', type: 'text' },
            ].map(({ label, field, type }) => (
              <div key={field}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>{label}</label>
                <input
                  type={type}
                  value={localAgent[field]}
                  onChange={(e) => handleFieldChange(field, e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: `1px solid ${accentColor}`,
                    borderRadius: '5px',
                    transition: 'all 0.3s ease',
                    fontSize: '14px'
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
            ))}
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Address:</label>
              <textarea
                value={localAgent.address}
                onChange={(e) => handleFieldChange('address', e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: `1px solid ${accentColor}`,
                  borderRadius: '5px',
                  minHeight: '60px',
                  resize: 'vertical',
                  transition: 'all 0.3s ease',
                  fontSize: '14px',
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
          </div>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '20px' }}>
            <button
              onClick={() => setShowEditModal(false)}
              style={{
                padding: '10px 20px',
                backgroundColor: '#6c757d',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500',
                transition: 'all 0.3s ease',
                minWidth: '120px'
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
              onClick={handleLocalSave}
              style={{
                padding: '10px 20px',
                backgroundColor: primaryColor,
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500',
                transition: 'all 0.3s ease',
                minWidth: '120px'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = hoverColor;
                e.target.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = primaryColor;
                e.target.style.transform = 'translateY(0)';
              }}
            >
              Save Changes
            </button>
          </div>
        </div>
      </Modal>
    );
  };

  const IncentiveModal = () => {
    const [localIncentive, setLocalIncentive] = useState(incentiveData);

    const handleLocalAdd = () => {
      if (!localIncentive.amount || !localIncentive.reason) {
        alert('Please fill all incentive fields');
        return;
      }
      setIncentiveData(localIncentive);
      handleAddIncentive();
    };

    const handleFieldChange = (field, value) => {
      setLocalIncentive(prev => ({
        ...prev,
        [field]: value
      }));
    };

    return (
      <Modal 
        isOpen={showIncentiveModal} 
        onClose={() => setShowIncentiveModal(false)}
        title="Add Incentive"
      >
        <div>
          <p style={{ textAlign: 'center', marginBottom: '20px' }}>Add incentive for agent <strong>{selectedAgent?.name}</strong> (ID: {selectedAgent?.id})</p>
          <div style={{ display: 'grid', gap: '15px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Amount (₹):</label>
              <input
                type="number"
                value={localIncentive.amount}
                onChange={(e) => handleFieldChange('amount', e.target.value)}
                placeholder="Enter amount"
                style={{
                  width: '100%',
                  padding: '10px',
                  border: `1px solid ${accentColor}`,
                  borderRadius: '5px',
                  transition: 'all 0.3s ease',
                  fontSize: '14px'
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
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Reason:</label>
              <textarea
                value={localIncentive.reason}
                onChange={(e) => handleFieldChange('reason', e.target.value)}
                placeholder="Enter reason for incentive..."
                style={{
                  width: '100%',
                  padding: '10px',
                  border: `1px solid ${accentColor}`,
                  borderRadius: '5px',
                  minHeight: '80px',
                  resize: 'vertical',
                  transition: 'all 0.3s ease',
                  fontSize: '14px',
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
          </div>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '20px' }}>
            <button
              onClick={() => setShowIncentiveModal(false)}
              style={{
                padding: '10px 20px',
                backgroundColor: '#6c757d',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500',
                transition: 'all 0.3s ease',
                minWidth: '120px'
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
              onClick={handleLocalAdd}
              style={{
                padding: '10px 20px',
                backgroundColor: '#ffc107',
                color: 'black',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500',
                transition: 'all 0.3s ease',
                minWidth: '120px'
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
              Add Incentive
            </button>
          </div>
        </div>
      </Modal>
    );
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h2 style={{ 
        color: primaryColor, 
        marginBottom: '20px',
        paddingBottom: '10px',
        borderBottom: `2px solid ${accentColor}`,
        textAlign: 'center'
      }}>
        Delivery Agent Lookup & Profile
      </h2>
      
      {/* Search Section */}
      <div style={{ marginBottom: '30px' }}>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', justifyContent: 'center' }}>
          <input
            type="text"
            placeholder="Enter Agent ID, Name, Phone, or Email"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            style={{
              flex: 1,
              maxWidth: '400px',
              padding: '12px 15px',
              border: `1px solid ${accentColor}`,
              borderRadius: '8px',
              fontSize: '14px',
              transition: 'all 0.3s ease'
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
          <button
            onClick={handleSearch}
            style={{
              padding: '12px 24px',
              backgroundColor: primaryColor,
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = hoverColor;
              e.target.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = primaryColor;
              e.target.style.transform = 'translateY(0)';
            }}
          >
            Search
          </button>
        </div>
      </div>

      {/* Quick Agent Selection */}
      {showAllAgents && (
        <section style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          border: `1px solid ${accentColor}`,
          marginBottom: '20px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ color: primaryColor, marginBottom: '15px', textAlign: 'center' }}>Available Delivery Agents</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '15px' }}>
            {agents.map(agent => (
              <div 
                key={agent.id}
                style={{
                  padding: '15px',
                  border: `2px solid ${selectedAgent?.id === agent.id ? primaryColor : accentColor}`,
                  borderRadius: '8px',
                  cursor: 'pointer',
                  backgroundColor: selectedAgent?.id === agent.id ? `${accentColor}40` : 'white',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
                }}
                onClick={() => setSelectedAgent(agent)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.15)';
                  if (selectedAgent?.id !== agent.id) {
                    e.currentTarget.style.borderColor = hoverColor;
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
                  if (selectedAgent?.id !== agent.id) {
                    e.currentTarget.style.borderColor = accentColor;
                  }
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <div style={{ fontWeight: 'bold', fontSize: '16px' }}>{agent.name}</div>
                  <span style={{
                    padding: '4px 8px',
                    borderRadius: '12px',
                    fontSize: '12px',
                    backgroundColor: agent.status === 'Active' ? '#d4edda' : '#f8d7da',
                    color: agent.status === 'Active' ? '#155724' : '#721c24',
                    transition: 'all 0.3s ease'
                  }}>
                    {agent.status}
                  </span>
                </div>
                <div style={{ fontSize: '14px', color: '#666', marginBottom: '4px' }}>ID: {agent.id}</div>
                <div style={{ fontSize: '14px', color: '#666', marginBottom: '4px' }}>Region: {agent.region}</div>
                <div style={{ fontSize: '14px', color: '#666' }}>Phone: {agent.phone}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {selectedAgent && (
        <div style={{ display: 'grid', gap: '20px' }}>
          {/* Agent Information */}
          <section style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            border: `1px solid ${accentColor}`,
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            transition: 'all 0.3s ease'
          }}>
            <h3 style={{ color: primaryColor, marginBottom: '15px', textAlign: 'center' }}>A. Agent Information</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px' }}>
              {[
                { label: 'Agent ID:', value: selectedAgent.id },
                { label: 'Name:', value: selectedAgent.name },
                { label: 'Assigned Region:', value: selectedAgent.region },
                { label: 'Phone:', value: selectedAgent.phone },
                { label: 'Email:', value: selectedAgent.email },
                { label: 'Vehicle Type:', value: selectedAgent.vehicleType },
                { label: 'Vehicle Number:', value: selectedAgent.vehicleNumber },
                { label: 'Join Date:', value: selectedAgent.joinDate },
                { label: 'Address:', value: selectedAgent.address },
              ].map((item, index) => (
                <div key={index} style={{ 
                  padding: '10px',
                  borderRadius: '5px',
                  transition: 'all 0.3s ease',
                  border: '1px solid transparent'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = `${accentColor}20`;
                  e.currentTarget.style.borderColor = accentColor;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.borderColor = 'transparent';
                }}
                >
                  <strong>{item.label}</strong> {item.value}
                </div>
              ))}
              <div style={{ 
                padding: '10px',
                borderRadius: '5px',
                transition: 'all 0.3s ease',
                border: '1px solid transparent'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = `${accentColor}20`;
                e.currentTarget.style.borderColor = accentColor;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.borderColor = 'transparent';
              }}
              >
                <strong>Status:</strong> 
                <span style={{
                  padding: '4px 8px',
                  borderRadius: '12px',
                  fontSize: '12px',
                  marginLeft: '8px',
                  backgroundColor: selectedAgent.status === 'Active' ? '#d4edda' : '#f8d7da',
                  color: selectedAgent.status === 'Active' ? '#155724' : '#721c24',
                  transition: 'all 0.3s ease'
                }}>
                  {selectedAgent.status}
                </span>
              </div>
            </div>
          </section>

          {/* Verification & Documents */}
          <section style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            border: `1px solid ${accentColor}`,
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            transition: 'all 0.3s ease'
          }}>
            <h3 style={{ color: primaryColor, marginBottom: '15px', textAlign: 'center' }}>B. Verification & Documents</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px' }}>
              {[
                { label: 'Driver License:', value: selectedAgent.licenseNumber },
                { 
                  label: 'Background Check:', 
                  value: selectedAgent.verificationStatus,
                  isStatus: true
                }
              ].map((item, index) => (
                <div key={index} style={{ 
                  padding: '10px',
                  borderRadius: '5px',
                  transition: 'all 0.3s ease',
                  border: '1px solid transparent'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = `${accentColor}20`;
                  e.currentTarget.style.borderColor = accentColor;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.borderColor = 'transparent';
                }}
                >
                  <strong>{item.label}</strong> 
                  {item.isStatus ? (
                    <span style={{
                      padding: '4px 8px',
                      borderRadius: '12px',
                      fontSize: '12px',
                      marginLeft: '8px',
                      backgroundColor: selectedAgent.verificationStatus === 'Verified' ? '#d4edda' : '#fff3cd',
                      color: selectedAgent.verificationStatus === 'Verified' ? '#155724' : '#856404',
                      transition: 'all 0.3s ease'
                    }}>
                      {item.value}
                    </span>
                  ) : (
                    item.value
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Performance Metrics */}
          <section style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            border: `1px solid ${accentColor}`,
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            transition: 'all 0.3s ease'
          }}>
            <h3 style={{ color: primaryColor, marginBottom: '15px', textAlign: 'center' }}>C. Delivery Performance Metrics</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
              {[
                { value: selectedAgent.totalDeliveries, label: 'Total Deliveries', bgColor: accentColor, color: primaryColor },
                { value: `${selectedAgent.onTimePercentage}%`, label: 'On-Time Delivery', bgColor: '#d4edda', color: '#155724' },
                { value: selectedAgent.averageDeliveryTime, label: 'Avg. Delivery Time', bgColor: '#cce7ff', color: '#004085' },
                { value: `${selectedAgent.averageRating}/5`, label: 'Customer Rating', bgColor: '#fff3cd', color: '#856404' },
              ].map((metric, index) => (
                <div 
                  key={index}
                  style={{ 
                    textAlign: 'center', 
                    padding: '20px', 
                    backgroundColor: metric.bgColor, 
                    borderRadius: '8px',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    border: '2px solid transparent'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-5px)';
                    e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.15)';
                    e.currentTarget.style.borderColor = primaryColor;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.borderColor = 'transparent';
                  }}
                >
                  <div style={{ fontSize: '24px', fontWeight: 'bold', color: metric.color, marginBottom: '8px' }}>
                    {metric.value}
                  </div>
                  <div style={{ color: metric.color, opacity: 0.9, fontSize: '14px' }}>{metric.label}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Performance Summary */}
          <section style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            border: `1px solid ${accentColor}`,
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            transition: 'all 0.3s ease'
          }}>
            <h3 style={{ color: primaryColor, marginBottom: '15px', textAlign: 'center' }}>D. Performance Summary</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <PerformanceChart trend={selectedAgent.performanceTrend} title="Weekly Performance Trend" timeFrame="weekly" />
              <PerformanceChart trend={selectedAgent.performanceTrend} title="Monthly Performance Trend" timeFrame="monthly" />
            </div>
          </section>

          {/* Customer Feedback & Ratings */}
          <section style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            border: `1px solid ${accentColor}`,
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            transition: 'all 0.3s ease'
          }}>
            <h3 style={{ color: primaryColor, marginBottom: '15px', textAlign: 'center' }}>E. Customer Feedback & Ratings</h3>
            <div style={{ marginBottom: '20px', textAlign: 'center' }}>
              <div style={{ fontSize: '32px', fontWeight: 'bold', color: primaryColor }}>
                {selectedAgent.averageRating}/5
              </div>
              <div style={{ fontSize: '14px', color: '#666' }}>Average Rating from {selectedAgent.totalDeliveries} deliveries</div>
            </div>
            
            <div style={{ maxHeight: '300px', overflowY: 'auto', padding: '10px' }}>
              {selectedAgent.recentReviews.map(review => (
                <div key={review.id} style={{
                  padding: '15px',
                  border: `1px solid ${accentColor}`,
                  borderRadius: '8px',
                  marginBottom: '10px',
                  backgroundColor: '#f8f9fa',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateX(5px)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
                  e.currentTarget.style.borderColor = primaryColor;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateX(0)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.borderColor = accentColor;
                }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <div style={{ fontWeight: 'bold' }}>{review.customer}</div>
                    <div style={{ 
                      padding: '4px 8px',
                      backgroundColor: review.rating >= 4 ? '#d4edda' : review.rating >= 3 ? '#fff3cd' : '#f8d7da',
                      color: review.rating >= 4 ? '#155724' : review.rating >= 3 ? '#856404' : '#721c24',
                      borderRadius: '12px',
                      fontSize: '12px',
                      fontWeight: 'bold',
                      transition: 'all 0.3s ease'
                    }}>
                      {review.rating} ★
                    </div>
                  </div>
                  <div style={{ fontSize: '14px', color: '#666', marginBottom: '5px' }}>
                    Order: {review.orderId} • {review.date}
                  </div>
                  <div style={{ fontSize: '14px' }}>{review.comment}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Delivery History */}
          <section style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            border: `1px solid ${accentColor}`,
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            transition: 'all 0.3s ease'
          }}>
            <h3 style={{ color: primaryColor, marginBottom: '15px', textAlign: 'center' }}>F. Recent Delivery History</h3>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ backgroundColor: primaryColor, color: 'white' }}>
                    {['Date', 'Order ID', 'Customer', 'Address', 'Status', 'Delivery Time', 'Rating'].map((header, index) => (
                      <th 
                        key={index}
                        style={{ 
                          padding: '12px', 
                          textAlign: 'center',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          borderRight: index < 6 ? '1px solid rgba(255,255,255,0.2)' : 'none'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor = hoverColor;
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor = primaryColor;
                        }}
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {selectedAgent.deliveryHistory.map((delivery, index) => (
                    <tr 
                      key={index} 
                      style={{ 
                        borderBottom: `1px solid ${accentColor}`,
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = `${accentColor}15`;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }}
                    >
                      <td style={{ padding: '12px', textAlign: 'center' }}>{delivery.date}</td>
                      <td style={{ padding: '12px', fontWeight: 'bold', textAlign: 'center' }}>{delivery.orderId}</td>
                      <td style={{ padding: '12px', textAlign: 'center' }}>{delivery.customer}</td>
                      <td style={{ padding: '12px', maxWidth: '200px', textAlign: 'center' }}>
                        <div style={{ 
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap'
                        }}>
                          {delivery.address}
                        </div>
                      </td>
                      <td style={{ padding: '12px', textAlign: 'center' }}>
                        <span style={{
                          padding: '6px 12px',
                          borderRadius: '12px',
                          fontSize: '12px',
                          backgroundColor: delivery.status === 'Delivered' ? '#d4edda' : '#fff3cd',
                          color: delivery.status === 'Delivered' ? '#155724' : '#856404',
                          transition: 'all 0.3s ease'
                        }}>
                          {delivery.status}
                        </span>
                      </td>
                      <td style={{ padding: '12px', textAlign: 'center' }}>{delivery.deliveryTime}</td>
                      <td style={{ padding: '12px', textAlign: 'center' }}>
                        <span style={{
                          padding: '6px 12px',
                          borderRadius: '12px',
                          fontSize: '12px',
                          backgroundColor: delivery.rating >= 4 ? '#d4edda' : delivery.rating >= 3 ? '#fff3cd' : '#f8d7da',
                          color: delivery.rating >= 4 ? '#155724' : delivery.rating >= 3 ? '#856404' : '#721c24',
                          fontWeight: 'bold',
                          transition: 'all 0.3s ease'
                        }}>
                          {delivery.rating} ★
                        </span>
                      </td>
                    </tr>
                  ))}
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
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            transition: 'all 0.3s ease'
          }}>
            <h3 style={{ color: primaryColor, marginBottom: '15px', textAlign: 'center' }}>Admin Actions</h3>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
              {[
                { label: 'Activate', action: 'activate', bgColor: '#28a745', hoverColor: '#218838' },
                { label: 'Suspend', action: 'suspend', bgColor: '#dc3545', hoverColor: '#c82333' },
                { label: 'Edit Profile', action: 'edit', bgColor: primaryColor, hoverColor: hoverColor },
                { label: 'Add Incentive', action: 'incentive', bgColor: '#ffc107', hoverColor: '#e0a800', textColor: 'black' },
                { label: 'View Earnings', action: 'earnings', bgColor: '#17a2b8', hoverColor: '#138496' },
              ].map((button, index) => (
                <button 
                  key={index}
                  onClick={() => handleAdminAction(button.action, selectedAgent.id)}
                  style={{ 
                    padding: '12px 20px', 
                    backgroundColor: button.bgColor, 
                    color: button.textColor || 'white', 
                    border: 'none', 
                    borderRadius: '5px', 
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '500',
                    transition: 'all 0.3s ease',
                    minWidth: '140px'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = button.hoverColor;
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = button.bgColor;
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = 'none';
                  }}
                >
                  {button.label}
                </button>
              ))}
            </div>
          </section>
        </div>
      )}

      {!selectedAgent && searchQuery && (
        <div style={{ 
          textAlign: 'center', 
          padding: '40px', 
          color: '#666',
          backgroundColor: 'white',
          borderRadius: '8px',
          border: `1px solid ${accentColor}`,
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
        }}>
          No delivery agent found with the search criteria
        </div>
      )}

      {/* Earnings Display */}
      {showEarnings && (
        <section 
          ref={earningsRef}
          style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            border: `2px solid ${primaryColor}`,
            marginTop: '20px',
            boxShadow: '0 4px 12px rgba(124, 42, 98, 0.2)',
            transition: 'all 0.3s ease'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
            <h3 style={{ color: primaryColor, margin: 0 }}>Earnings Report - {selectedAgent?.name}</h3>
            <button 
              onClick={() => setShowEarnings(false)}
              style={{
                padding: '8px 16px',
                backgroundColor: '#6c757d',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500',
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
              Close Earnings
            </button>
          </div>
          
          {/* Summary Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', marginBottom: '20px' }}>
            {[
              { value: earningsData.reduce((sum, earning) => sum + earning.deliveries, 0), label: 'Total Deliveries', bgColor: accentColor, color: primaryColor },
              { value: `₹${earningsData.reduce((sum, earning) => sum + earning.earnings, 0)}`, label: 'Base Earnings', bgColor: '#d4edda', color: '#155724' },
              { value: `₹${earningsData.reduce((sum, earning) => sum + earning.incentives, 0)}`, label: 'Total Incentives', bgColor: '#fff3cd', color: '#856404' },
              { value: `₹${earningsData.reduce((sum, earning) => sum + earning.total, 0)}`, label: 'Total Earnings', bgColor: '#cce7ff', color: '#004085' },
            ].map((metric, index) => (
              <div 
                key={index}
                style={{ 
                  textAlign: 'center', 
                  padding: '20px', 
                  backgroundColor: metric.bgColor, 
                  borderRadius: '8px',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  border: '2px solid transparent'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.15)';
                  e.currentTarget.style.borderColor = primaryColor;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.borderColor = 'transparent';
                }}
              >
                <div style={{ fontSize: '20px', fontWeight: 'bold', color: metric.color, marginBottom: '8px' }}>
                  {metric.value}
                </div>
                <div style={{ color: metric.color, opacity: 0.9, fontSize: '14px' }}>{metric.label}</div>
              </div>
            ))}
          </div>
          
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: primaryColor, color: 'white' }}>
                  {['Date', 'Deliveries', 'Base Earnings (₹)', 'Incentives (₹)', 'Total (₹)'].map((header, index) => (
                    <th 
                      key={index}
                      style={{ 
                        padding: '12px', 
                        textAlign: 'center',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        borderRight: index < 4 ? '1px solid rgba(255,255,255,0.2)' : 'none'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = hoverColor;
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = primaryColor;
                      }}
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {earningsData.map((earning, index) => (
                  <tr 
                    key={index} 
                    style={{ 
                      borderBottom: `1px solid ${accentColor}`,
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = `${accentColor}10`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    <td style={{ padding: '12px', fontWeight: 'bold', textAlign: 'center' }}>{earning.date}</td>
                    <td style={{ padding: '12px', textAlign: 'center' }}>{earning.deliveries}</td>
                    <td style={{ padding: '12px', textAlign: 'center' }}>₹{earning.earnings}</td>
                    <td style={{ padding: '12px', textAlign: 'center' }}>₹{earning.incentives}</td>
                    <td style={{ padding: '12px', textAlign: 'center', fontWeight: 'bold', color: primaryColor }}>₹{earning.total}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr style={{ backgroundColor: accentColor, fontWeight: 'bold' }}>
                  <td style={{ padding: '12px', textAlign: 'center' }}>Total</td>
                  <td style={{ padding: '12px', textAlign: 'center' }}>
                    {earningsData.reduce((sum, earning) => sum + earning.deliveries, 0)}
                  </td>
                  <td style={{ padding: '12px', textAlign: 'center' }}>
                    ₹{earningsData.reduce((sum, earning) => sum + earning.earnings, 0)}
                  </td>
                  <td style={{ padding: '12px', textAlign: 'center' }}>
                    ₹{earningsData.reduce((sum, earning) => sum + earning.incentives, 0)}
                  </td>
                  <td style={{ padding: '12px', textAlign: 'center', color: primaryColor }}>
                    ₹{earningsData.reduce((sum, earning) => sum + earning.total, 0)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Additional Earnings Information */}
          <div style={{ 
            marginTop: '20px', 
            padding: '15px', 
            backgroundColor: '#f8f9fa', 
            borderRadius: '5px',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = `${accentColor}10`;
            e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#f8f9fa';
            e.currentTarget.style.boxShadow = 'none';
          }}
          >
            <h4 style={{ color: primaryColor, marginBottom: '10px', textAlign: 'center' }}>Earnings Summary</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '10px' }}>
              <div style={{ textAlign: 'center' }}><strong>Average Daily Earnings:</strong> ₹{(earningsData.reduce((sum, earning) => sum + earning.total, 0) / earningsData.length).toFixed(2)}</div>
              <div style={{ textAlign: 'center' }}><strong>Average Deliveries per Day:</strong> {(earningsData.reduce((sum, earning) => sum + earning.deliveries, 0) / earningsData.length).toFixed(1)}</div>
              <div style={{ textAlign: 'center' }}><strong>Incentive Percentage:</strong> {((earningsData.reduce((sum, earning) => sum + earning.incentives, 0) / earningsData.reduce((sum, earning) => sum + earning.total, 0)) * 100).toFixed(1)}%</div>
              <div style={{ textAlign: 'center' }}><strong>Period Covered:</strong> {earningsData.length} days</div>
            </div>
          </div>
        </section>
      )}

      {/* Render Modals */}
      <SuspendModal />
      <EditModal />
      <IncentiveModal />
    </div>
  );
};

export default DeliveryAgentLookup;