import React, { useState, useEffect } from 'react';

const UsersManagement = () => {
  const primaryColor = '#7C2A62';
  const accentColor = '#F7D9EB';
  
  const [searchTerm, setSearchTerm] = useState('');
  const [userType, setUserType] = useState('all');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserHistory, setShowUserHistory] = useState(false);
  const [actionLoading, setActionLoading] = useState(null);

  // Simulate API call to fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock data - in real app, this would come from an API
      const mockUsers = [
        { 
          id: 1, 
          name: 'John Doe', 
          type: 'customer', 
          email: 'john@email.com', 
          status: 'active',
          lastLogin: '2023-10-15',
          registrationDate: '2023-01-10',
          phone: '+1234567890',
          address: '123 Main St, City, State',
          orders: 15,
          totalSpent: 1250.75
        },
        { 
          id: 2, 
          name: 'MedPlus Pharmacy', 
          type: 'vendor', 
          email: 'medplus@pharmacy.com', 
          status: 'active',
          lastLogin: '2023-10-14',
          registrationDate: '2023-02-15',
          phone: '+1234567891',
          address: '456 Pharmacy Ave, City, State',
          products: 245,
          rating: 4.8
        },
        { 
          id: 3, 
          name: 'Dr. Sharma', 
          type: 'doctor', 
          email: 'sharma@clinic.com', 
          status: 'active',
          lastLogin: '2023-10-10',
          registrationDate: '2023-10-10',
          phone: '+1234567892',
          address: '789 Medical Center, City, State',
          specialization: 'Cardiology',
          experience: '10 years'
        },
        { 
          id: 4, 
          name: 'Raj Kumar', 
          type: 'delivery', 
          email: 'raj@delivery.com', 
          status: 'inactive',
          lastLogin: '2023-09-20',
          registrationDate: '2023-03-05',
          phone: '+1234567893',
          address: '321 Delivery Lane, City, State',
          deliveries: 342,
          rating: 4.9
        },
        { 
          id: 5, 
          name: 'Alice Johnson', 
          type: 'customer', 
          email: 'alice@email.com', 
          status: 'active',
          lastLogin: '2023-10-16',
          registrationDate: '2023-04-20',
          phone: '+1234567894',
          address: '654 Customer Rd, City, State',
          orders: 8,
          totalSpent: 650.25
        }
      ];
      
      setUsers(mockUsers);
      setLoading(false);
    };

    fetchUsers();
  }, []);

  // Real-time search and filter functionality
  const filteredUsers = users.filter(user => {
    const matchesSearch = searchTerm === '' || 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = userType === 'all' || user.type === userType;
    
    return matchesSearch && matchesType;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return { bg: '#d4edda', text: '#155724' };
      case 'pending':
        return { bg: '#fff3cd', text: '#856404' };
      case 'inactive':
        return { bg: '#f8d7da', text: '#721c24' };
      default:
        return { bg: '#e2e3e5', text: '#383d41' };
    }
  };

  // Enhanced action handlers with better loading states
  const handleActivateUser = async (userId) => {
    setActionLoading(userId);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    setUsers(users.map(user => 
      user.id === userId 
        ? { 
            ...user, 
            status: 'active',
            lastLogin: new Date().toISOString().split('T')[0] // Update last login on activation
          }
        : user
    ));
    setActionLoading(null);
  };

  const handleInactivateUser = async (userId) => {
    setActionLoading(userId);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    setUsers(users.map(user => 
      user.id === userId 
        ? { 
            ...user, 
            status: 'inactive'
            // Don't update last login when inactivating
          }
        : user
    ));
    setActionLoading(null);
  };

  const handleViewHistory = async (userId) => {
    setActionLoading(userId);
    // Simulate API call to fetch user history
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const user = users.find(u => u.id === userId);
    setSelectedUser(user);
    setShowUserHistory(true);
    setActionLoading(null);
  };

  const handleCloseHistory = () => {
    setShowUserHistory(false);
    setSelectedUser(null);
  };

  const getUserTypeCounts = () => {
    const counts = {
      all: users.length,
      customer: users.filter(u => u.type === 'customer').length,
      vendor: users.filter(u => u.type === 'vendor').length,
      doctor: users.filter(u => u.type === 'doctor').length,
      delivery: users.filter(u => u.type === 'delivery').length
    };
    return counts;
  };

  // Enhanced action buttons with proper alignment
  const getActionButtons = (user) => {
    const isActionLoading = actionLoading === user.id;

    const baseButtonStyle = {
      padding: '8px 16px',
      border: 'none',
      borderRadius: '6px',
      cursor: isActionLoading ? 'not-allowed' : 'pointer',
      fontSize: '13px',
      fontWeight: '500',
      transition: 'all 0.3s ease',
      minWidth: '120px',
      opacity: isActionLoading ? 0.7 : 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '6px',
      height: '36px'
    };

    const inactivateButton = (
      <button 
        onClick={() => !isActionLoading && handleInactivateUser(user.id)}
        disabled={isActionLoading}
        style={{
          ...baseButtonStyle,
          backgroundColor: '#dc3545',
          color: 'white',
        }}
        onMouseOver={(e) => !isActionLoading && (e.target.style.backgroundColor = '#c82333')}
        onMouseOut={(e) => !isActionLoading && (e.target.style.backgroundColor = '#dc3545')}
      >
        {isActionLoading ? '⏳' : ''} Inactivate
      </button>
    );

    const activateButton = (
      <button 
        onClick={() => !isActionLoading && handleActivateUser(user.id)}
        disabled={isActionLoading}
        style={{
          ...baseButtonStyle,
          backgroundColor: '#28a745',
          color: 'white',
        }}
        onMouseOver={(e) => !isActionLoading && (e.target.style.backgroundColor = '#218838')}
        onMouseOut={(e) => !isActionLoading && (e.target.style.backgroundColor = '#28a745')}
      >
        {isActionLoading ? '⏳' : ''} Activate
      </button>
    );

    const viewHistoryButton = (
      <button 
        onClick={() => !isActionLoading && handleViewHistory(user.id)}
        disabled={isActionLoading}
        style={{
          ...baseButtonStyle,
          backgroundColor: primaryColor,
          color: 'white',
        }}
        onMouseOver={(e) => !isActionLoading && (e.target.style.backgroundColor = '#6a2452')}
        onMouseOut={(e) => !isActionLoading && (e.target.style.backgroundColor = primaryColor)}
      >
        {isActionLoading ? '⏳' : ''} View History
      </button>
    );

    switch (user.status) {
      case 'active':
        return (
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '10px',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            width: '100%'
          }}>
            {inactivateButton}
            {viewHistoryButton}
          </div>
        );
      case 'inactive':
        return (
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '10px',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            width: '100%'
          }}>
            {activateButton}
            {viewHistoryButton}
          </div>
        );
      case 'pending':
        return (
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '10px',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            width: '100%'
          }}>
            {inactivateButton}
            {viewHistoryButton}
          </div>
        );
      default:
        return (
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '10px',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            width: '100%'
          }}>
            {viewHistoryButton}
          </div>
        );
    }
  };

  const typeCounts = getUserTypeCounts();

  return (
    <div style={{ 
      padding: '24px', 
      fontFamily: 'Arial, sans-serif',
      minHeight: '100vh',
      backgroundColor: '#f8f9fa',
      boxSizing: 'border-box'
    }}>
      <h2 style={{ 
        color: primaryColor, 
        marginBottom: '24px', 
        borderBottom: `2px solid ${accentColor}`, 
        paddingBottom: '12px',
        fontSize: '28px',
        fontWeight: '600'
      }}>
        Users Management
      </h2>
      
      {/* Search and Filter */}
      <div style={{ 
        display: 'flex', 
        gap: '16px', 
        marginBottom: '24px', 
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ 
          display: 'flex', 
          gap: '16px', 
          flexWrap: 'wrap',
          alignItems: 'center',
          flex: 1
        }}>
          <input
            type="text"
            placeholder="Search users by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              padding: '12px 16px',
              border: `1px solid ${accentColor}`,
              borderRadius: '8px',
              flex: '1',
              minWidth: '280px',
              fontSize: '14px',
              outline: 'none',
              transition: 'border-color 0.3s ease',
              boxSizing: 'border-box'
            }}
            onFocus={(e) => e.target.style.borderColor = primaryColor}
            onBlur={(e) => e.target.style.borderColor = accentColor}
          />
          <select
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
            style={{
              padding: '12px 16px',
              border: `1px solid ${accentColor}`,
              borderRadius: '8px',
              backgroundColor: 'white',
              minWidth: '180px',
              fontSize: '14px',
              outline: 'none',
              cursor: 'pointer',
              transition: 'border-color 0.3s ease',
              boxSizing: 'border-box'
            }}
            onFocus={(e) => e.target.style.borderColor = primaryColor}
            onBlur={(e) => e.target.style.borderColor = accentColor}
          >
            <option value="all">All Users ({typeCounts.all})</option>
            <option value="customer">Customers ({typeCounts.customer})</option>
            <option value="vendor">Vendors ({typeCounts.vendor})</option>
            <option value="doctor">Doctors ({typeCounts.doctor})</option>
            <option value="delivery">Delivery Agents ({typeCounts.delivery})</option>
          </select>
        </div>
        
        {/* Results counter */}
        <div style={{ 
          color: '#666', 
          fontSize: '14px',
          backgroundColor: '#ffffff',
          padding: '10px 16px',
          borderRadius: '8px',
          border: `1px solid ${accentColor}`,
          whiteSpace: 'nowrap',
          fontWeight: '500',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>
          {filteredUsers.length} user(s) found
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div style={{ 
          textAlign: 'center', 
          padding: '48px', 
          color: primaryColor,
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          marginBottom: '24px',
          border: `1px solid ${accentColor}`,
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <div style={{ fontSize: '18px', marginBottom: '12px', fontWeight: '500' }}>Loading users...</div>
          <div style={{ fontSize: '14px', color: '#666' }}>Please wait while we fetch user data</div>
        </div>
      )}

      {/* Users Table */}
      {!loading && (
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          overflow: 'hidden',
          border: `1px solid ${accentColor}`,
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
        }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ 
              width: '100%', 
              borderCollapse: 'collapse', 
              minWidth: '900px',
              fontSize: '14px',
              tableLayout: 'fixed'
            }}>
              <thead>
                <tr style={{ 
                  backgroundColor: primaryColor, 
                  color: 'white',
                  fontSize: '14px',
                  height: '56px'
                }}>
                  <th style={{ 
                    padding: '16px', 
                    textAlign: 'left', 
                    fontWeight: '600', 
                    width: '100px'
                  }}>
                    User ID
                  </th>
                  <th style={{ 
                    padding: '16px', 
                    textAlign: 'left', 
                    fontWeight: '600', 
                    width: '180px'
                  }}>
                    Name
                  </th>
                  <th style={{ 
                    padding: '16px', 
                    textAlign: 'left', 
                    fontWeight: '600', 
                    width: '120px'
                  }}>
                    Type
                  </th>
                  <th style={{ 
                    padding: '16px', 
                    textAlign: 'left', 
                    fontWeight: '600', 
                    width: '220px'
                  }}>
                    Email
                  </th>
                  <th style={{ 
                    padding: '16px', 
                    textAlign: 'left', 
                    fontWeight: '600', 
                    width: '120px'
                  }}>
                    Status
                  </th>
                  <th style={{ 
                    padding: '16px', 
                    textAlign: 'left', 
                    fontWeight: '600', 
                    width: '130px'
                  }}>
                    Last Login
                  </th>
                  <th style={{ 
                    padding: '16px', 
                    textAlign: 'left', 
                    fontWeight: '600', 
                    width: '150px'
                  }}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user, index) => {
                  const statusColors = getStatusColor(user.status);
                  return (
                    <tr key={user.id} style={{ 
                      borderBottom: `1px solid ${accentColor}`,
                      transition: 'background-color 0.2s',
                      backgroundColor: actionLoading === user.id ? '#f8f9fa' : 'white',
                      height: '72px'
                    }}
                    onMouseEnter={(e) => {
                      if (actionLoading !== user.id) {
                        e.currentTarget.style.backgroundColor = '#f8f9fa';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (actionLoading !== user.id) {
                        e.currentTarget.style.backgroundColor = 'white';
                      }
                    }}>
                      {/* User ID */}
                      <td style={{ 
                        padding: '16px', 
                        fontWeight: '600', 
                        color: primaryColor,
                        verticalAlign: 'middle'
                      }}>
                        #{user.id}
                      </td>
                      
                      {/* Name */}
                      <td style={{ 
                        padding: '16px', 
                        fontWeight: '500',
                        verticalAlign: 'middle',
                        lineHeight: '1.4'
                      }}>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          height: '100%',
                          minHeight: '40px'
                        }}>
                          {user.name}
                        </div>
                      </td>
                      
                      {/* Type */}
                      <td style={{ 
                        padding: '16px', 
                        textTransform: 'capitalize',
                        color: primaryColor,
                        fontWeight: '500',
                        verticalAlign: 'middle'
                      }}>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          height: '100%',
                          minHeight: '40px'
                        }}>
                          {user.type}
                        </div>
                      </td>
                      
                      {/* Email */}
                      <td style={{ 
                        padding: '16px', 
                        color: '#555',
                        verticalAlign: 'middle'
                      }}>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          height: '100%',
                          minHeight: '40px'
                        }}>
                          {user.email}
                        </div>
                      </td>
                      
                      {/* Status */}
                      <td style={{ 
                        padding: '16px',
                        verticalAlign: 'middle'
                      }}>
                        <div style={{ 
                          display: 'flex', 
                          justifyContent: 'flex-start',
                          alignItems: 'center',
                          height: '100%'
                        }}>
                          <span style={{
                            padding: '8px 16px',
                            borderRadius: '20px',
                            fontSize: '12px',
                            backgroundColor: statusColors.bg,
                            color: statusColors.text,
                            fontWeight: '600',
                            border: `1px solid ${statusColors.text}20`,
                            textAlign: 'center',
                            minWidth: '80px',
                            display: 'inline-block'
                          }}>
                            {user.status.toUpperCase()}
                          </span>
                        </div>
                      </td>
                      
                      {/* Last Login */}
                      <td style={{ 
                        padding: '16px', 
                        fontSize: '13px',
                        color: user.lastLogin ? '#333' : '#999',
                        fontStyle: user.lastLogin ? 'normal' : 'italic',
                        textAlign: 'left',
                        verticalAlign: 'middle'
                      }}>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          height: '100%',
                          minHeight: '40px'
                        }}>
                          {user.lastLogin || 'Never logged in'}
                        </div>
                      </td>
                      
                      {/* Actions */}
                      <td style={{ 
                        padding: '16px',
                        verticalAlign: 'middle'
                      }}>
                        <div style={{ 
                          display: 'flex', 
                          justifyContent: 'flex-start',
                          alignItems: 'flex-start',
                          height: '100%'
                        }}>
                          {getActionButtons(user)}
                        </div>
                        {actionLoading === user.id && (
                          <div style={{
                            fontSize: '11px',
                            color: primaryColor,
                            fontStyle: 'italic',
                            textAlign: 'left',
                            marginTop: '8px',
                            marginLeft: '4px'
                          }}>
                            Processing...
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {!loading && filteredUsers.length === 0 && (
        <div style={{ 
          textAlign: 'center', 
          padding: '48px', 
          color: '#666',
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          marginTop: '24px',
          border: `1px solid ${accentColor}`,
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <div style={{ fontSize: '18px', marginBottom: '12px', fontWeight: '500' }}>No users found</div>
          <div style={{ fontSize: '14px' }}>Try adjusting your search criteria or filters</div>
        </div>
      )}

      {/* User History Modal */}
      {showUserHistory && selectedUser && (
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
          zIndex: 1000,
          padding: '20px',
          boxSizing: 'border-box'
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '32px',
            borderRadius: '12px',
            width: '100%',
            maxWidth: '800px',
            maxHeight: '90vh',
            overflowY: 'auto',
            boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
            border: `3px solid ${primaryColor}`,
            boxSizing: 'border-box'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '24px',
              borderBottom: `2px solid ${accentColor}`,
              paddingBottom: '16px'
            }}>
              <h3 style={{ 
                color: primaryColor, 
                margin: 0,
                fontSize: '22px',
                fontWeight: '600'
              }}>
                📊 User History - {selectedUser.name}
              </h3>
              <button 
                onClick={handleCloseHistory}
                style={{
                  backgroundColor: 'transparent',
                  border: 'none',
                  fontSize: '24px',
                  cursor: 'pointer',
                  color: primaryColor,
                  padding: '8px',
                  borderRadius: '50%',
                  width: '40px',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'background-color 0.2s',
                  flexShrink: 0
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = accentColor}
                onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
              >
                ✕
              </button>
            </div>
            
            {/* User Details Section - Compact side-by-side alignment */}
            <div style={{ 
              marginBottom: '24px',
              backgroundColor: '#f8f9fa',
              padding: '20px',
              borderRadius: '8px',
              border: `1px solid ${accentColor}`
            }}>
              <h4 style={{ 
                color: primaryColor, 
                marginBottom: '16px',
                fontSize: '18px',
                fontWeight: '600'
              }}>
                👤 User Details
              </h4>
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: '1fr 1fr', 
                gap: '12px',
                fontSize: '14px'
              }}>
                {/* Left Column */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <strong style={{ minWidth: '80px' }}>Name:</strong>
                    <span style={{ marginLeft: '8px' }}>{selectedUser.name}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <strong style={{ minWidth: '80px' }}>Email:</strong>
                    <span style={{ marginLeft: '8px' }}>{selectedUser.email}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <strong style={{ minWidth: '80px' }}>Type:</strong>
                    <span style={{ 
                      marginLeft: '8px',
                      textTransform: 'capitalize',
                      color: primaryColor,
                      fontWeight: '600'
                    }}>
                      {selectedUser.type}
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <strong style={{ minWidth: '80px' }}>Status:</strong>
                    <span style={{ marginLeft: '8px' }}>
                      <span style={{
                        padding: '4px 8px',
                        borderRadius: '8px',
                        fontSize: '11px',
                        backgroundColor: getStatusColor(selectedUser.status).bg,
                        color: getStatusColor(selectedUser.status).text,
                        fontWeight: '600'
                      }}>
                        {selectedUser.status.toUpperCase()}
                      </span>
                    </span>
                  </div>
                </div>
                
                {/* Right Column */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <strong style={{ minWidth: '100px' }}>Phone:</strong>
                    <span style={{ marginLeft: '8px' }}>{selectedUser.phone}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <strong style={{ minWidth: '100px' }}>Registration:</strong>
                    <span style={{ marginLeft: '8px' }}>{selectedUser.registrationDate}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <strong style={{ minWidth: '100px' }}>Last Login:</strong>
                    <span style={{ marginLeft: '8px' }}>{selectedUser.lastLogin || 'Never'}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <strong style={{ minWidth: '100px' }}>User ID:</strong>
                    <span style={{ marginLeft: '8px', color: primaryColor, fontWeight: '600' }}>#{selectedUser.id}</span>
                  </div>
                </div>
                
                {/* Full width row for address */}
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'flex-start',
                  gridColumn: '1 / -1',
                  marginTop: '8px',
                  paddingTop: '12px',
                  borderTop: `1px solid ${accentColor}`
                }}>
                  <strong style={{ minWidth: '80px' }}>Address:</strong>
                  <span style={{ marginLeft: '8px' }}>{selectedUser.address}</span>
                </div>
              </div>
            </div>

            {/* Activity History Section - Compact side-by-side alignment */}
            <div style={{ 
              marginBottom: '24px',
              backgroundColor: '#f8f9fa',
              padding: '20px',
              borderRadius: '8px',
              border: `1px solid ${accentColor}`
            }}>
              <h4 style={{ 
                color: primaryColor, 
                marginBottom: '16px',
                fontSize: '18px',
                fontWeight: '600'
              }}>
                📈 Activity History
              </h4>
              <div style={{ 
                backgroundColor: 'white', 
                padding: '20px', 
                borderRadius: '8px',
                fontSize: '14px',
                border: `1px solid ${accentColor}`
              }}>
                {/* Customer Activity */}
                {selectedUser.type === 'customer' && (
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <strong style={{ minWidth: '120px' }}>Total Orders:</strong>
                        <span style={{ marginLeft: '8px', color: primaryColor, fontWeight: '600', fontSize: '15px' }}>{selectedUser.orders}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <strong style={{ minWidth: '120px' }}>Total Spent:</strong>
                        <span style={{ marginLeft: '8px', color: '#28a745', fontWeight: '600', fontSize: '15px' }}>${selectedUser.totalSpent}</span>
                      </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <strong style={{ minWidth: '120px' }}>Recent Activity:</strong>
                        <span style={{ marginLeft: '8px' }}>Last purchase on 2023-10-15</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <strong style={{ minWidth: '120px' }}>Account Status:</strong>
                        <span style={{ marginLeft: '8px' }}>
                          <span style={{ 
                            padding: '4px 8px',
                            borderRadius: '8px',
                            fontSize: '11px',
                            backgroundColor: getStatusColor(selectedUser.status).bg,
                            color: getStatusColor(selectedUser.status).text,
                            fontWeight: '600'
                          }}>
                            {selectedUser.status.toUpperCase()}
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Vendor Activity */}
                {selectedUser.type === 'vendor' && (
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <strong style={{ minWidth: '120px' }}>Products Listed:</strong>
                        <span style={{ marginLeft: '8px', color: primaryColor, fontWeight: '600', fontSize: '15px' }}>{selectedUser.products}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <strong style={{ minWidth: '120px' }}>Rating:</strong>
                        <span style={{ marginLeft: '8px', color: '#FFA500', fontWeight: '600', fontSize: '15px' }}>{selectedUser.rating}/5 ⭐</span>
                      </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <strong style={{ minWidth: '120px' }}>Recent Activity:</strong>
                        <span style={{ marginLeft: '8px' }}>Added 5 new products</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <strong style={{ minWidth: '120px' }}>Account Status:</strong>
                        <span style={{ marginLeft: '8px' }}>
                          <span style={{ 
                            padding: '4px 8px',
                            borderRadius: '8px',
                            fontSize: '11px',
                            backgroundColor: getStatusColor(selectedUser.status).bg,
                            color: getStatusColor(selectedUser.status).text,
                            fontWeight: '600'
                          }}>
                            {selectedUser.status.toUpperCase()}
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Doctor Activity */}
                {selectedUser.type === 'doctor' && (
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <strong style={{ minWidth: '120px' }}>Specialization:</strong>
                        <span style={{ marginLeft: '8px', color: primaryColor, fontWeight: '600', fontSize: '15px' }}>{selectedUser.specialization}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <strong style={{ minWidth: '120px' }}>Experience:</strong>
                        <span style={{ marginLeft: '8px', color: primaryColor, fontWeight: '600', fontSize: '15px' }}>{selectedUser.experience}</span>
                      </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <strong style={{ minWidth: '120px' }}>Recent Activity:</strong>
                        <span style={{ marginLeft: '8px' }}>Completed 3 consultations</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <strong style={{ minWidth: '120px' }}>Account Status:</strong>
                        <span style={{ marginLeft: '8px' }}>
                          <span style={{ 
                            padding: '4px 8px',
                            borderRadius: '8px',
                            fontSize: '11px',
                            backgroundColor: getStatusColor(selectedUser.status).bg,
                            color: getStatusColor(selectedUser.status).text,
                            fontWeight: '600'
                          }}>
                            {selectedUser.status.toUpperCase()}
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Delivery Activity */}
                {selectedUser.type === 'delivery' && (
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <strong style={{ minWidth: '120px' }}>Total Deliveries:</strong>
                        <span style={{ marginLeft: '8px', color: primaryColor, fontWeight: '600', fontSize: '15px' }}>{selectedUser.deliveries}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <strong style={{ minWidth: '120px' }}>Rating:</strong>
                        <span style={{ marginLeft: '8px', color: '#FFA500', fontWeight: '600', fontSize: '15px' }}>{selectedUser.rating}/5 ⭐</span>
                      </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <strong style={{ minWidth: '120px' }}>Recent Activity:</strong>
                        <span style={{ marginLeft: '8px' }}>2 deliveries today</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <strong style={{ minWidth: '120px' }}>Account Status:</strong>
                        <span style={{ marginLeft: '8px' }}>
                          <span style={{ 
                            padding: '4px 8px',
                            borderRadius: '8px',
                            fontSize: '11px',
                            backgroundColor: getStatusColor(selectedUser.status).bg,
                            color: getStatusColor(selectedUser.status).text,
                            fontWeight: '600'
                          }}>
                            {selectedUser.status.toUpperCase()}
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons in Modal */}
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              paddingTop: '20px',
              borderTop: `1px solid ${accentColor}`,
              gap: '12px',
              flexWrap: 'wrap'
            }}>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {selectedUser.status === 'active' ? (
                  <button 
                    onClick={() => {
                      handleInactivateUser(selectedUser.id);
                      handleCloseHistory();
                    }}
                    style={{
                      padding: '10px 20px',
                      backgroundColor: '#dc3545',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: '600',
                      transition: 'all 0.3s ease',
                      minWidth: '130px'
                    }}
                    onMouseOver={(e) => e.target.style.backgroundColor = '#c82333'}
                    onMouseOut={(e) => e.target.style.backgroundColor = '#dc3545'}
                  >
                    Inactivate User
                  </button>
                ) : selectedUser.status === 'inactive' ? (
                  <button 
                    onClick={() => {
                      handleActivateUser(selectedUser.id);
                      handleCloseHistory();
                    }}
                    style={{
                      padding: '10px 20px',
                      backgroundColor: '#28a745',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: '600',
                      transition: 'all 0.3s ease',
                      minWidth: '130px'
                    }}
                    onMouseOver={(e) => e.target.style.backgroundColor = '#218838'}
                    onMouseOut={(e) => e.target.style.backgroundColor = '#28a745'}
                  >
                    Activate User
                  </button>
                ) : (
                  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    <button 
                      onClick={() => {
                        handleActivateUser(selectedUser.id);
                        handleCloseHistory();
                      }}
                      style={{
                        padding: '10px 20px',
                        backgroundColor: '#28a745',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '14px',
                        fontWeight: '600',
                        transition: 'all 0.3s ease',
                        minWidth: '110px'
                      }}
                      onMouseOver={(e) => e.target.style.backgroundColor = '#218838'}
                      onMouseOut={(e) => e.target.style.backgroundColor = '#28a745'}
                    >
                      Activate User
                    </button>
                    <button 
                      onClick={() => {
                        handleInactivateUser(selectedUser.id);
                        handleCloseHistory();
                      }}
                      style={{
                        padding: '10px 20px',
                        backgroundColor: '#dc3545',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '14px',
                        fontWeight: '600',
                        transition: 'all 0.3s ease',
                        minWidth: '110px'
                      }}
                      onMouseOver={(e) => e.target.style.backgroundColor = '#c82333'}
                      onMouseOut={(e) => e.target.style.backgroundColor = '#dc3545'}
                    >
                      Inactivate User
                    </button>
                  </div>
                )}
              </div>
              <button 
                onClick={handleCloseHistory}
                style={{
                  padding: '10px 24px',
                  backgroundColor: primaryColor,
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '600',
                  transition: 'all 0.3s ease',
                  minWidth: '100px'
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#6a2452'}
                onMouseOut={(e) => e.target.style.backgroundColor = primaryColor}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersManagement;