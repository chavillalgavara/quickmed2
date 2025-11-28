import React, { useState, useEffect } from 'react';

const Dashboard = () => {
  const [kpis, setKpis] = useState({
    totalUsers: 0,
    totalVendors: 0,
    totalDoctors: 0,
    totalDeliveryAgents: 0
  });
  
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeView, setActiveView] = useState('dashboard');
  const [currentData, setCurrentData] = useState([]);
  const [deliveryMarkers, setDeliveryMarkers] = useState([]);

  // Color variables
  const primaryColor = '#7C2A62';
  const accentColor = '#F7D9EB';
  const backgroundColor = '#f8f9fa';
  const textColor = '#2c3e50';
  const mutedTextColor = '#7f8c8d';

  // Mock data - in real app, this would come from API
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setKpis({
        totalUsers: 12543,
        totalVendors: 892,
        totalDoctors: 456,
        totalDeliveryAgents: 234
      });
      
      setAlerts([
        { id: 1, type: 'warning', message: '5 vendors need KYC verification', timestamp: '2 hours ago' },
        { id: 2, type: 'info', message: 'System performance optimal', timestamp: '1 hour ago' },
        { id: 3, type: 'error', message: '3 delivery orders delayed', timestamp: '30 minutes ago' }
      ]);
      
      setLoading(false);
    }, 1000);
  }, []);

  // Initialize delivery markers
  useEffect(() => {
    const initialMarkers = [
      { id: 1, orderId: 'Order #1240', top: '30%', left: '25%' },
      { id: 2, orderId: 'Order #1259', top: '60%', left: '45%' },
      { id: 3, orderId: 'Order #1233', top: '40%', left: '70%' }
    ];
    setDeliveryMarkers(initialMarkers);

    // Simulate real-time updates for delivery markers
    const interval = setInterval(() => {
      setDeliveryMarkers(prev => 
        prev.map(marker => ({
          ...marker,
          top: `${Math.random() * 70 + 15}%`,
          left: `${Math.random() * 70 + 15}%`
        }))
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Mock data for different entities
  const mockUsers = [
    { id: 1, name: 'John Doe', email: 'john@example.com', status: 'Active', joinDate: '2023-01-15' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'Active', joinDate: '2023-02-20' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', status: 'Inactive', joinDate: '2023-03-10' },
    { id: 4, name: 'Sarah Wilson', email: 'sarah@example.com', status: 'Active', joinDate: '2023-04-05' },
    { id: 5, name: 'David Brown', email: 'david@example.com', status: 'Active', joinDate: '2023-05-12' }
  ];

  const mockVendors = [
    { id: 1, name: 'Fresh Groceries', category: 'Food', status: 'Verified', rating: 4.5 },
    { id: 2, name: 'MediCare Supplies', category: 'Medical', status: 'Pending', rating: 4.2 },
    { id: 3, name: 'Tech Gadgets', category: 'Electronics', status: 'Verified', rating: 4.8 },
    { id: 4, name: 'Fashion Hub', category: 'Clothing', status: 'Verified', rating: 4.3 },
    { id: 5, name: 'Home Essentials', category: 'Home', status: 'Suspended', rating: 3.9 }
  ];

  const mockDoctors = [
    { id: 1, name: 'Dr. Robert Chen', specialty: 'Cardiology', hospital: 'City General', status: 'Available' },
    { id: 2, name: 'Dr. Emily Davis', specialty: 'Pediatrics', hospital: 'Childrens Hospital', status: 'Available' },
    { id: 3, name: 'Dr. Michael Wong', specialty: 'Dermatology', hospital: 'Skin Care Center', status: 'On Leave' },
    { id: 4, name: 'Dr. Lisa Patel', specialty: 'Orthopedics', hospital: 'Sports Med Center', status: 'Available' },
    { id: 5, name: 'Dr. James Wilson', specialty: 'Neurology', hospital: 'Neuro Institute', status: 'Available' }
  ];

  const mockDeliveryAgents = [
    { id: 1, name: 'Alex Thompson', vehicle: 'Motorcycle', status: 'Active', currentOrder: 'ORD-1234' },
    { id: 2, name: 'Maria Garcia', vehicle: 'Car', status: 'Active', currentOrder: 'ORD-1235' },
    { id: 3, name: 'Kevin Lee', vehicle: 'Bicycle', status: 'Offline', currentOrder: 'None' },
    { id: 4, name: 'Rachel Kim', vehicle: 'Motorcycle', status: 'Active', currentOrder: 'ORD-1236' },
    { id: 5, name: 'Tom Harris', vehicle: 'Car', status: 'Busy', currentOrder: 'ORD-1237' }
  ];

  const mockAllAlerts = [
    { id: 1, type: 'warning', message: '5 vendors need KYC verification', timestamp: '2 hours ago', priority: 'High' },
    { id: 2, type: 'info', message: 'System performance optimal', timestamp: '1 hour ago', priority: 'Low' },
    { id: 3, type: 'error', message: '3 delivery orders delayed', timestamp: '30 minutes ago', priority: 'High' },
    { id: 4, type: 'warning', message: 'Server load at 85% capacity', timestamp: '15 minutes ago', priority: 'Medium' },
    { id: 5, type: 'info', message: 'Database backup completed', timestamp: '10 minutes ago', priority: 'Low' },
    { id: 6, type: 'error', message: 'Payment gateway timeout', timestamp: '5 minutes ago', priority: 'Critical' }
  ];

  // Handle KPI card clicks
  const handleKpiClick = (type) => {
    setActiveView(type);
    
    // Set appropriate data based on type
    switch (type) {
      case 'users':
        setCurrentData(mockUsers);
        break;
      case 'vendors':
        setCurrentData(mockVendors);
        break;
      case 'doctors':
        setCurrentData(mockDoctors);
        break;
      case 'deliveryAgents':
        setCurrentData(mockDeliveryAgents);
        break;
      default:
        setCurrentData([]);
    }
  };

  const handleBackToDashboard = () => {
    setActiveView('dashboard');
    setCurrentData([]);
  };

  // Quick Actions handlers
  const handleGenerateReports = () => {
    console.log('Generate Reports clicked');
    alert('Opening Reports Generator...');
  };

  const handleManageUsers = () => {
    console.log('Manage Users clicked');
    handleKpiClick('users');
  };

  const handleVendorLookup = () => {
    console.log('Vendor Lookup clicked');
    handleKpiClick('vendors');
  };

  const handleViewAllAlerts = () => {
    console.log('View All Alerts clicked');
    setActiveView('allAlerts');
  };

  const handleViewAllAlertsInSection = () => {
    console.log('View All Alerts (section) clicked');
    setActiveView('allAlerts');
  };

  const handlePerformanceMetricClick = (metric) => {
    console.log(`${metric} clicked`);
    alert(`Showing details for ${metric}`);
  };

  const KpiCard = ({ title, value, icon, color, type }) => (
    <div 
      style={{
        background: 'white',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        border: `1px solid ${accentColor}`,
        cursor: 'pointer'
      }}
      onClick={() => handleKpiClick(type)}
    >
      <div>
        <h3 style={{
          margin: '0',
          color: mutedTextColor,
          fontSize: '14px',
          fontWeight: '600',
          textTransform: 'uppercase'
        }}>{title}</h3>
        <div style={{ 
          fontSize: '32px', 
          fontWeight: 'bold', 
          margin: '5px 0 0 0',
          color: primaryColor 
        }}>
          {loading ? 'Loading...' : value.toLocaleString()}
        </div>
      </div>
      <div style={{
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '24px',
        backgroundColor: accentColor,
        color: primaryColor
      }}>
        {icon}
      </div>
    </div>
  );

  const AlertItem = ({ alert }) => {
    const getBorderColor = () => {
      switch (alert.type) {
        case 'warning': return '#f39c12';
        case 'info': return primaryColor;
        case 'error': return '#e74c3c';
        default: return primaryColor;
      }
    };

    return (
      <div style={{
        padding: '15px',
        borderLeft: `4px solid ${getBorderColor()}`,
        marginBottom: '10px',
        borderRadius: '4px',
        background: '#f8f9fa'
      }}>
        <div style={{
          fontWeight: '500',
          marginBottom: '5px',
          color: textColor
        }}>{alert.message}</div>
        <div style={{
          fontSize: '12px',
          color: mutedTextColor
        }}>{alert.timestamp}</div>
      </div>
    );
  };

  const LiveIndicator = () => (
    <span style={{
      color: primaryColor,
      fontWeight: 'bold',
      fontSize: '12px',
      animation: 'pulse 2s infinite'
    }}>
      ● LIVE
    </span>
  );

  const MarkerPulse = () => (
    <div style={{
      width: '20px',
      height: '20px',
      backgroundColor: primaryColor,
      borderRadius: '50%',
      margin: '0 auto 5px auto',
      animation: 'markerPulse 2s infinite'
    }}></div>
  );

  // Data Table Component
  const DataTable = ({ data, columns, title }) => (
    <div style={{
      background: 'white',
      padding: '20px',
      borderRadius: '10px',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
      border: `1px solid ${accentColor}`
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px'
      }}>
        <h2 style={{
          color: primaryColor,
          margin: '0',
          fontSize: '20px',
          fontWeight: '600'
        }}>{title}</h2>
        <button 
          onClick={handleBackToDashboard}
          style={{
            background: primaryColor,
            color: 'white',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '12px',
            fontWeight: '500'
          }}
        >
          Back to Dashboard
        </button>
      </div>
      
      <div style={{ overflowX: 'auto' }}>
        <table style={{
          width: '100%',
          borderCollapse: 'collapse'
        }}>
          <thead>
            <tr style={{
              backgroundColor: accentColor,
              borderBottom: `2px solid ${primaryColor}`
            }}>
              {columns.map((column, index) => (
                <th key={index} style={{
                  padding: '12px 15px',
                  textAlign: 'left',
                  fontWeight: '600',
                  color: primaryColor,
                  textTransform: 'uppercase',
                  fontSize: '12px'
                }}>
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={item.id} style={{
                borderBottom: '1px solid #eee',
                backgroundColor: index % 2 === 0 ? '#f9f9f9' : 'white'
              }}>
                {Object.values(item).map((value, cellIndex) => (
                  <td key={cellIndex} style={{
                    padding: '12px 15px',
                    color: textColor,
                    fontSize: '14px'
                  }}>
                    {value}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div style={{
        marginTop: '15px',
        textAlign: 'center',
        color: mutedTextColor,
        fontSize: '14px'
      }}>
        Showing {data.length} of {kpis[`total${title.split(' ')[1]}`]} {title.split(' ')[1].toLowerCase()}
      </div>
    </div>
  );

  // All Alerts View
  const AllAlertsView = () => (
    <div style={{
      background: 'white',
      padding: '20px',
      borderRadius: '10px',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
      border: `1px solid ${accentColor}`
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px'
      }}>
        <h2 style={{
          color: primaryColor,
          margin: '0',
          fontSize: '20px',
          fontWeight: '600'
        }}>All System Alerts</h2>
        <button 
          onClick={handleBackToDashboard}
          style={{
            background: primaryColor,
            color: 'white',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '12px',
            fontWeight: '500'
          }}
        >
          Back to Dashboard
        </button>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table style={{
          width: '100%',
          borderCollapse: 'collapse'
        }}>
          <thead>
            <tr style={{
              backgroundColor: accentColor,
              borderBottom: `2px solid ${primaryColor}`
            }}>
              <th style={{ padding: '12px 15px', textAlign: 'left', fontWeight: '600', color: primaryColor, textTransform: 'uppercase', fontSize: '12px' }}>ID</th>
              <th style={{ padding: '12px 15px', textAlign: 'left', fontWeight: '600', color: primaryColor, textTransform: 'uppercase', fontSize: '12px' }}>Type</th>
              <th style={{ padding: '12px 15px', textAlign: 'left', fontWeight: '600', color: primaryColor, textTransform: 'uppercase', fontSize: '12px' }}>Message</th>
              <th style={{ padding: '12px 15px', textAlign: 'left', fontWeight: '600', color: primaryColor, textTransform: 'uppercase', fontSize: '12px' }}>Priority</th>
              <th style={{ padding: '12px 15px', textAlign: 'left', fontWeight: '600', color: primaryColor, textTransform: 'uppercase', fontSize: '12px' }}>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {mockAllAlerts.map((alert, index) => (
              <tr key={alert.id} style={{
                borderBottom: '1px solid #eee',
                backgroundColor: index % 2 === 0 ? '#f9f9f9' : 'white'
              }}>
                <td style={{ padding: '12px 15px', color: textColor, fontSize: '14px' }}>{alert.id}</td>
                <td style={{ padding: '12px 15px', color: textColor, fontSize: '14px' }}>
                  <span style={{
                    padding: '4px 8px',
                    borderRadius: '12px',
                    fontSize: '12px',
                    fontWeight: '500',
                    backgroundColor: 
                      alert.type === 'error' ? '#e74c3c20' : 
                      alert.type === 'warning' ? '#f39c1220' : 
                      `${primaryColor}20`,
                    color: 
                      alert.type === 'error' ? '#e74c3c' : 
                      alert.type === 'warning' ? '#f39c12' : 
                      primaryColor
                  }}>
                    {alert.type.toUpperCase()}
                  </span>
                </td>
                <td style={{ padding: '12px 15px', color: textColor, fontSize: '14px' }}>{alert.message}</td>
                <td style={{ padding: '12px 15px', color: textColor, fontSize: '14px' }}>{alert.priority}</td>
                <td style={{ padding: '12px 15px', color: textColor, fontSize: '14px' }}>{alert.timestamp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const PerformanceMetricCard = ({ title, value, change, metric }) => (
    <div 
      style={{
        textAlign: 'center',
        padding: '15px',
        background: accentColor,
        borderRadius: '8px',
        border: `1px solid ${primaryColor}20`,
        cursor: 'pointer'
      }}
      onClick={() => handlePerformanceMetricClick(metric)}
    >
      <h4 style={{
        margin: '0 0 10px 0',
        color: primaryColor,
        fontSize: '12px',
        textTransform: 'uppercase',
        fontWeight: '600'
      }}>{title}</h4>
      <div style={{
        fontSize: '24px',
        fontWeight: 'bold',
        color: primaryColor,
        marginBottom: '5px'
      }}>{value}</div>
      <div style={{
        fontSize: '12px',
        fontWeight: 'bold',
        color: change.startsWith('+') || change.startsWith('-') ? 
          (change.includes('-') ? '#27ae60' : '#e74c3c') : primaryColor
      }}>{change}</div>
    </div>
  );

  // Enhanced Flowchart Component matching the Mermaid structure
  const Flowchart = () => (
    <div style={{
      background: 'white',
      padding: '25px',
      borderRadius: '12px',
      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.08)',
      border: `1px solid ${accentColor}`,
      marginBottom: '30px'
    }}>
      <h2 style={{
        color: primaryColor,
        margin: '0 0 25px 0',
        fontSize: '22px',
        fontWeight: '700',
        textAlign: 'center'
      }}>Platform Service Flow</h2>
      
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        position: 'relative'
      }}>

        {/* Platform Overview */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative'
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            padding: '20px 30px',
            borderRadius: '12px',
            textAlign: 'center',
            minWidth: '200px',
            boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '18px'
          }}>
            Platform System
          </div>
        </div>

        {/* Down Arrow */}
        <div style={{ textAlign: 'center', fontSize: '24px', color: primaryColor }}>↓</div>

        {/* User Type Decision */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative'
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            padding: '20px',
            borderRadius: '50px',
            textAlign: 'center',
            minWidth: '150px',
            boxShadow: '0 4px 12px rgba(240, 147, 251, 0.3)',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '16px',
            border: '3px solid white'
          }}>
            User Type?
          </div>
        </div>

        {/* User Type Options */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'flex-start',
          gap: '20px',
          marginTop: '10px'
        }}>
          {/* End User Path */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ fontSize: '14px', fontWeight: 'bold', color: primaryColor, marginBottom: '10px' }}>End User</div>
            <div style={{ fontSize: '24px', color: primaryColor, marginBottom: '10px' }}>↓</div>
            <div style={{
              background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
              padding: '15px',
              borderRadius: '10px',
              textAlign: 'center',
              width: '100%',
              boxShadow: '0 4px 8px rgba(79, 172, 254, 0.3)',
              color: 'white'
            }}>
              <div style={{ fontSize: '14px', fontWeight: 'bold' }}>TOTAL USERS</div>
              <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{kpis.totalUsers.toLocaleString()}</div>
            </div>
          </div>

          {/* Service Provider Path */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ fontSize: '14px', fontWeight: 'bold', color: primaryColor, marginBottom: '10px' }}>Service Provider</div>
            <div style={{ fontSize: '24px', color: primaryColor, marginBottom: '10px' }}>↓</div>
            <div style={{
              background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
              padding: '15px',
              borderRadius: '10px',
              textAlign: 'center',
              width: '100%',
              boxShadow: '0 4px 8px rgba(67, 233, 123, 0.3)',
              color: 'white'
            }}>
              <div style={{ fontSize: '14px', fontWeight: 'bold' }}>TOTAL VENDORS</div>
              <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{kpis.totalVendors.toLocaleString()}</div>
            </div>
          </div>

          {/* Expert/Professional Path */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ fontSize: '14px', fontWeight: 'bold', color: primaryColor, marginBottom: '10px' }}>Expert/Professional</div>
            <div style={{ fontSize: '24px', color: primaryColor, marginBottom: '10px' }}>↓</div>
            <div style={{
              background: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
              padding: '15px',
              borderRadius: '10px',
              textAlign: 'center',
              width: '100%',
              boxShadow: '0 4px 8px rgba(255, 154, 158, 0.3)',
              color: 'white'
            }}>
              <div style={{ fontSize: '14px', fontWeight: 'bold' }}>TOTAL DOCTORS</div>
              <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{kpis.totalDoctors.toLocaleString()}</div>
            </div>
          </div>
        </div>

        {/* End User Service Flow */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '15px',
          marginTop: '20px'
        }}>
          <div style={{ fontSize: '24px', color: primaryColor }}>↓</div>
          
          <div style={{
            background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
            padding: '15px 25px',
            borderRadius: '10px',
            textAlign: 'center',
            width: '80%',
            boxShadow: '0 4px 8px rgba(168, 237, 234, 0.3)',
            color: textColor,
            fontWeight: '600'
          }}>
            Request a Service<br />
            <span style={{ fontSize: '12px', fontWeight: 'normal' }}>e.g., Book Appointment, Order</span>
          </div>

          <div style={{ fontSize: '24px', color: primaryColor }}>↓</div>

          {/* Service Type Decision */}
          <div style={{
            background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            padding: '15px',
            borderRadius: '50px',
            textAlign: 'center',
            minWidth: '150px',
            boxShadow: '0 4px 12px rgba(240, 147, 251, 0.3)',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '16px',
            border: '3px solid white'
          }}>
            Service Type?
          </div>

          {/* Service Type Options */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'flex-start',
            gap: '20px',
            width: '100%',
            marginTop: '15px'
          }}>
            {/* Medical Path */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ fontSize: '14px', fontWeight: 'bold', color: primaryColor, marginBottom: '10px' }}>Medical</div>
              <div style={{ fontSize: '24px', color: primaryColor, marginBottom: '10px' }}>↓</div>
              <div style={{
                background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                padding: '15px',
                borderRadius: '10px',
                textAlign: 'center',
                width: '100%',
                boxShadow: '0 4px 8px rgba(79, 172, 254, 0.3)',
                color: 'white',
                fontWeight: '600'
              }}>
                Connect to a Doctor
              </div>
              <div style={{ fontSize: '24px', color: primaryColor, marginTop: '10px' }}>↓</div>
              <div style={{
                background: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
                padding: '15px',
                borderRadius: '10px',
                textAlign: 'center',
                width: '100%',
                boxShadow: '0 4px 8px rgba(255, 154, 158, 0.3)',
                color: 'white',
                fontWeight: '600'
              }}>
                Provide Service<br />
                <span style={{ fontSize: '12px', fontWeight: 'normal' }}>e.g., Consultation</span>
              </div>
            </div>

            {/* Other/Product Path */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ fontSize: '14px', fontWeight: 'bold', color: primaryColor, marginBottom: '10px' }}>Other/Product</div>
              <div style={{ fontSize: '24px', color: primaryColor, marginBottom: '10px' }}>↓</div>
              <div style={{
                background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
                padding: '15px',
                borderRadius: '10px',
                textAlign: 'center',
                width: '100%',
                boxShadow: '0 4px 8px rgba(67, 233, 123, 0.3)',
                color: 'white',
                fontWeight: '600'
              }}>
                Connect to a Vendor
              </div>
              <div style={{ fontSize: '24px', color: primaryColor, marginTop: '10px' }}>↓</div>
              <div style={{
                background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
                padding: '15px',
                borderRadius: '10px',
                textAlign: 'center',
                width: '100%',
                boxShadow: '0 4px 8px rgba(67, 233, 123, 0.3)',
                color: 'white',
                fontWeight: '600'
              }}>
                Provide Service<br />
                <span style={{ fontSize: '12px', fontWeight: 'normal' }}>e.g., Fulfill Order</span>
              </div>
            </div>
          </div>

          {/* Service Completion */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '20px',
            width: '100%'
          }}>
            <div style={{ fontSize: '24px', color: primaryColor, margin: '0 20px' }}>→</div>
            <div style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              padding: '20px 30px',
              borderRadius: '12px',
              textAlign: 'center',
              minWidth: '180px',
              boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '18px'
            }}>
              Service Completed
            </div>
            <div style={{ fontSize: '24px', color: primaryColor, margin: '0 20px' }}>←</div>
          </div>
        </div>

      </div>
    </div>
  );

  // Render different views based on activeView state
  const renderContentView = () => {
    switch (activeView) {
      case 'users':
        return (
          <DataTable 
            data={currentData}
            columns={['ID', 'Name', 'Email', 'Status', 'Join Date']}
            title="All Users"
          />
        );
      case 'vendors':
        return (
          <DataTable 
            data={currentData}
            columns={['ID', 'Name', 'Category', 'Status', 'Rating']}
            title="All Vendors"
          />
        );
      case 'doctors':
        return (
          <DataTable 
            data={currentData}
            columns={['ID', 'Name', 'Specialty', 'Hospital', 'Status']}
            title="All Doctors"
          />
        );
      case 'deliveryAgents':
        return (
          <DataTable 
            data={currentData}
            columns={['ID', 'Name', 'Vehicle', 'Status', 'Current Order']}
            title="All Delivery Agents"
          />
        );
      case 'allAlerts':
        return <AllAlertsView />;
      default:
        return renderDashboard();
    }
  };

  const renderDashboard = () => (
    <>
      {/* KPI Section */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '20px',
        marginBottom: '30px'
      }}>
        <KpiCard 
          title="Total Users" 
          value={kpis.totalUsers} 
          icon="👥" 
          color={primaryColor}
          type="users"
        />
        <KpiCard 
          title="Total Vendors" 
          value={kpis.totalVendors} 
          icon="🏪" 
          color={primaryColor}
          type="vendors"
        />
        <KpiCard 
          title="Total Doctors" 
          value={kpis.totalDoctors} 
          icon="👨‍⚕️" 
          color={primaryColor}
          type="doctors"
        />
        <KpiCard 
          title="Delivery Agents" 
          value={kpis.totalDeliveryAgents} 
          icon="🚚" 
          color={primaryColor}
          type="deliveryAgents"
        />
      </div>

      {/* Flowchart Section */}
      <Flowchart />

      <div style={{
        display: 'grid',
        gridTemplateColumns: '2fr 1fr',
        gap: '30px',
        marginBottom: '30px'
      }}>
        {/* Live Map Section */}
        <div style={{
          background: 'white',
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
          border: `1px solid ${accentColor}`
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px'
          }}>
            <h2 style={{
              color: primaryColor,
              margin: '0',
              fontSize: '20px',
              fontWeight: '600'
            }}>Live Delivery Activity Map</h2>
            <LiveIndicator />
          </div>
          <div style={{
            position: 'relative',
            background: `linear-gradient(135deg, ${primaryColor} 0%, #9b59b6 100%)`,
            borderRadius: '8px',
            overflow: 'hidden',
            height: '400px'
          }}>
            <div style={{
              position: 'relative',
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 'bold'
            }}>
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0
              }}>
                {deliveryMarkers.map(marker => (
                  <div key={marker.id} style={{
                    position: 'absolute',
                    top: marker.top,
                    left: marker.left,
                    transform: 'translate(-50%, -50%)',
                    textAlign: 'center'
                  }}>
                    <MarkerPulse />
                    <span style={{
                      background: 'rgba(0, 0, 0, 0.7)',
                      padding: '2px 8px',
                      borderRadius: '10px',
                      fontSize: '12px',
                      whiteSpace: 'nowrap'
                    }}>{marker.orderId}</span>
                  </div>
                ))}
              </div>
              <p>Interactive map showing real-time delivery locations</p>
            </div>
          </div>
        </div>

        {/* Alerts & Performance Section */}
        <div style={{
          background: 'white',
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
          border: `1px solid ${accentColor}`
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px'
          }}>
            <h2 style={{
              color: primaryColor,
              margin: '0',
              fontSize: '20px',
              fontWeight: '600'
            }}>Alerts & Performance Snapshot</h2>
            <button 
              onClick={handleViewAllAlertsInSection}
              style={{
                background: primaryColor,
                color: 'white',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '12px',
                fontWeight: '500'
              }}
            >
              View All
            </button>
          </div>
          
          <div style={{ marginBottom: '20px' }}>
            {loading ? (
              <div style={{
                textAlign: 'center',
                padding: '20px',
                color: mutedTextColor
              }}>Loading alerts...</div>
            ) : (
              alerts.map(alert => (
                <AlertItem key={alert.id} alert={alert} />
              ))
            )}
          </div>

          {/* Performance Metrics */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
            gap: '15px'
          }}>
            <PerformanceMetricCard 
              title="System Uptime" 
              value="99.8%" 
              change="-0.2%" 
              metric="systemUptime"
            />
            
            <PerformanceMetricCard 
              title="Response Time" 
              value="128ms" 
              change="-12ms" 
              metric="responseTime"
            />
            
            <PerformanceMetricCard 
              title="Active Sessions" 
              value="342" 
              change="" 
              metric="activeSessions"
            />
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div style={{
        background: 'white',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        border: `1px solid ${accentColor}`
      }}>
        <h3 style={{
          margin: '0 0 20px 0',
          color: primaryColor,
          fontWeight: '600'
        }}>Quick Actions</h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '15px'
        }}>
          <button 
            onClick={handleGenerateReports}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '15px',
              background: accentColor,
              border: `2px solid ${primaryColor}30`,
              borderRadius: '8px',
              cursor: 'pointer',
              color: primaryColor,
              fontWeight: '500'
            }}
          >
            <span style={{ fontSize: '20px' }}>📊</span>
            <span>Generate Reports</span>
          </button>
          
          <button 
            onClick={handleManageUsers}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '15px',
              background: accentColor,
              border: `2px solid ${primaryColor}30`,
              borderRadius: '8px',
              cursor: 'pointer',
              color: primaryColor,
              fontWeight: '500'
            }}
          >
            <span style={{ fontSize: '20px' }}>👥</span>
            <span>Manage Users</span>
          </button>
          
          <button 
            onClick={handleVendorLookup}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '15px',
              background: accentColor,
              border: `2px solid ${primaryColor}30`,
              borderRadius: '8px',
              cursor: 'pointer',
              color: primaryColor,
              fontWeight: '500'
            }}
          >
            <span style={{ fontSize: '20px' }}>🏪</span>
            <span>Vendor Lookup</span>
          </button>
          
          <button 
            onClick={handleViewAllAlerts}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '15px',
              background: accentColor,
              border: `2px solid ${primaryColor}30`,
              borderRadius: '8px',
              cursor: 'pointer',
              color: primaryColor,
              fontWeight: '500'
            }}
          >
            <span style={{ fontSize: '20px' }}>🔔</span>
            <span>View All Alerts</span>
          </button>
        </div>
      </div>
    </>
  );

  return (
    <div style={{
      padding: '20px',
      backgroundColor: backgroundColor,
      minHeight: '100vh'
    }}>
      {/* Dashboard Header */}
      <div style={{ marginBottom: '30px' }}>
        <h1 style={{
          color: primaryColor,
          margin: '0',
          fontSize: '28px',
          fontWeight: 'bold'
        }}>
          {activeView === 'dashboard' 
            ? 'Admin Dashboard Overview' 
            : activeView === 'allAlerts' ? 'All System Alerts' :
            `All ${activeView.charAt(0).toUpperCase() + activeView.slice(1)}`}
        </h1>
        <p style={{
          color: mutedTextColor,
          margin: '5px 0 0 0'
        }}>
          {activeView === 'dashboard' 
            ? "Welcome back! Here's what's happening with your system today." 
            : `Managing ${currentData.length} ${activeView}`}
        </p>
      </div>

      {renderContentView()}

      {/* Add CSS animations */}
      <style>
        {`
          @keyframes pulse {
            0% { opacity: 1; }
            50% { opacity: 0.5; }
            100% { opacity: 1; }
          }
          
          @keyframes markerPulse {
            0% {
              transform: scale(0.8);
              box-shadow: 0 0 0 0 ${primaryColor}70;
            }
            70% {
              transform: scale(1);
              box-shadow: 0 0 0 10px ${primaryColor}00;
            }
            100% {
              transform: scale(0.8);
              box-shadow: 0 0 0 0 ${primaryColor}00;
            }
          }
        `}
      </style>
    </div>
  );
};

export default Dashboard;