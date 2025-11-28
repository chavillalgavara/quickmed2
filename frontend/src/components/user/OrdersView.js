import React, { useState, useMemo, useEffect } from 'react';

const OrdersView = ({
  orders,
  orderFilter,
  setOrderFilter,
  setActiveView,
  startLiveTracking
}) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [dateFilter, setDateFilter] = useState('recent');
  const [statusFilter, setStatusFilter] = useState('all');

  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleBackToDashboard = () => {
    setActiveView('dashboard');
  };

  const handleShopMedicines = () => {
    setActiveView('medicine');
  };

  // Filter orders based on selected filters
  const filteredOrders = useMemo(() => {
    if (!orders || orders.length === 0) return [];
    
    let filtered = orders;

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(order => {
        switch (statusFilter) {
          case 'delivered':
            return order.status === 'Delivered';
          case 'cancelled':
            return order.status === 'Cancelled';
          case 'returned':
            return order.status === 'Returned';
          default:
            return true;
        }
      });
    }

    // Date filter
    const now = new Date();
    filtered = filtered.filter(order => {
      const orderDate = new Date(order.date);
      const timeDiff = now.getTime() - orderDate.getTime();
      
      switch (dateFilter) {
        case 'recent':
          return timeDiff <= 7 * 24 * 60 * 60 * 1000; // Last 7 days
        case '30days':
          return timeDiff <= 30 * 24 * 60 * 60 * 1000; // Last 30 days
        case '6months':
          return timeDiff <= 6 * 30 * 24 * 60 * 60 * 1000; // Last 6 months
        default:
          return true;
      }
    });

    // Sort by date (newest first)
    return filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [orders, statusFilter, dateFilter]);

  // Get filter display text
  const getFilterDisplayText = () => {
    const statusText = statusFilter === 'all' ? 'All Status' : 
                      statusFilter === 'delivered' ? 'Delivered' :
                      statusFilter === 'cancelled' ? 'Cancelled' : 'Returned';
    
    const dateText = dateFilter === 'recent' ? 'Recent (7 days)' :
                    dateFilter === '30days' ? 'Last 30 days' : 'Last 6 months';
    
    return `${statusText} • ${dateText}`;
  };

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered': return '#4CAF50';
      case 'Cancelled': return '#F44336';
      case 'Returned': return '#FF9800';
      case 'Confirmed': return '#9C27B0';
      default: return '#9E9E9E';
    }
  };

  // Get status icon
  const getStatusIcon = (status) => {
    switch (status) {
      case 'Delivered': return '✅';
      case 'Cancelled': return '❌';
      case 'Returned': return '🔄';
      case 'Confirmed': return '📦';
      default: return '📋';
    }
  };

  // Get vendor information
  const getVendorInfo = (vendorId) => {
    const vendors = {
      'MEDSTORE_001': {
        name: 'MedPlus Mart',
        address: '123 Healthcare Street, Medical Complex',
        rating: '4.5',
        deliveryTime: '30-45 mins',
        contact: '+91-9876543210',
        license: 'DL-12345-MUM'
      },
      'APOLLO_002': {
        name: 'Apollo Pharmacy',
        address: '456 Wellness Road, Health District',
        rating: '4.7',
        deliveryTime: '25-40 mins',
        contact: '+91-9876543211',
        license: 'DL-12346-MUM'
      },
      'PHARMACY_003': {
        name: 'Wellness Forever',
        address: '789 Cure Lane, Treatment Area',
        rating: '4.3',
        deliveryTime: '35-50 mins',
        contact: '+91-9876543212',
        license: 'DL-12347-MUM'
      },
      'QUICKMED_004': {
        name: 'QuickMed Express',
        address: '321 Fast Track, Delivery Zone',
        rating: '4.8',
        deliveryTime: '15-30 mins',
        contact: '+91-9876543213',
        license: 'DL-12348-MUM'
      }
    };
    return vendors[vendorId] || {
      name: 'Local Pharmacy',
      address: 'Nearby location',
      rating: '4.0',
      deliveryTime: '40-60 mins',
    };
  };

  // Get order timeline
  const getOrderTimeline = (order) => {
    const timeline = [
      {
        status: 'Order Placed',
        timestamp: new Date(order.date),
        icon: '🛒',
        completed: true
      },
      {
        status: 'Vendor Confirmed',
        timestamp: new Date(new Date(order.date).getTime() + 5 * 60000),
        icon: '',
        completed: order.status !== ''
      },
      {
        status: 'Medicine Packed',
        timestamp: new Date(new Date(order.date).getTime() + 10 * 60000),
        icon: '',
        completed: order.status === '' ||  order.status === 'Delivered'
      },
      {
        status: 'Out for Delivery',
        timestamp: new Date(new Date(order.date).getTime() + 15 * 60000),
        icon: '',
        completed:  order.status === 'Delivered'
      },
      {
        status: 'Delivered',
        timestamp: order.status === 'Delivered' ? new Date(new Date(order.date).getTime() + 45 * 60000) : null,
        icon: '✅',
        completed: order.status === 'Delivered'
      }
    ];
    return timeline;
  };

  // Filter option styles
  const getFilterOptionStyle = (isSelected) => ({
    padding: '0.6rem 0.8rem',
    backgroundColor: isSelected ? '#7C2A62' : 'white',
    color: isSelected ? 'white' : '#7C2A62',
    border: `2px solid ${isSelected ? '#7C2A62' : '#F7D9EB'}`,
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '0.8rem',
    fontWeight: '600',
    transition: 'all 0.3s ease',
    width: '100%',
    textAlign: 'left',
    marginBottom: '0.4rem',
  });

  const BackButton = ({ onClick, text = 'Back' }) => (
    <button 
      style={{
        padding: '0.5rem 1rem',
        backgroundColor: 'transparent',
        color: '#7C2A62',
        border: '1px solid #7C2A62',
        borderRadius: '6px',
        cursor: 'pointer',
        fontSize: '0.9rem',
        fontWeight: '600',
        transition: 'all 0.3s ease',
        marginBottom: '1rem',
      }}
      onClick={onClick}
      type="button"
      onMouseEnter={(e) => {
        e.target.style.backgroundColor = '#7C2A62';
        e.target.style.color = 'white';
      }}
      onMouseLeave={(e) => {
        e.target.style.backgroundColor = 'transparent';
        e.target.style.color = '#7C2A62';
      }}
    >
      ← {text}
    </button>
  );

  // Common section container style
  const sectionContainerStyle = {
    backgroundColor: '#f8f5ff',
    borderRadius: '15px',
    padding: '1.5rem',
    border: '2px solid #F7D9EB',
    marginBottom: '2rem',
    boxShadow: '0 4px 15px rgba(124, 42, 98, 0.1)',
  };

  // Common section header style
  const sectionHeaderStyle = {
    color: '#7C2A62',
    margin: '0 0 1rem 0',
    fontSize: '1.3rem',
    fontWeight: '800',
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
  };

  // Common content box style
  const contentBoxStyle = {
    backgroundColor: 'white',
    padding: '1.2rem',
    borderRadius: '10px',
    border: '1px solid #F7D9EB',
  };

  // Common subheader style
  const subheaderStyle = {
    color: '#7C2A62',
    margin: '0 0 0.8rem 0',
    fontSize: '1rem',
    fontWeight: '700',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  };

  // Get empty state message based on filters
  const getEmptyStateMessage = () => {
    if (statusFilter !== 'all') {
      return `No ${statusFilter} orders found in the selected time period`;
    }
    
    switch (dateFilter) {
      case 'recent':
        return 'No recent orders found in the last 7 days';
      case '30days':
        return 'No orders found in the last 30 days';
      case '6months':
        return 'No orders found in the last 6 months';
      default:
        return 'No orders found';
    }
  };

  return (
    <div style={{
      marginTop: '120px',
      padding: '1.5rem',
      maxWidth: '1400px',
      marginLeft: 'auto',
      marginRight: 'auto',
      minHeight: '80vh',
    }}>
      {/* Header Section with Back Button on Left */}
      <div style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '2rem',
        marginBottom: '1.5rem', // Reduced margin bottom for proper spacing
      }}>
        {/* Back Button - Left Side with proper spacing */}
        <div style={{
          flexShrink: 0,
          marginTop: '1.5rem',
        }}>
          <BackButton onClick={handleBackToDashboard} text="Dashboard" />
        </div>

        {/* Main Header Content */}
        <div style={{
          flex: 1,
          textAlign: 'center',
          marginTop: '1rem',
        }}>
          <h2 style={{
            color: '#7C2A62',
            fontSize: '2.2rem',
            margin: '0 0 0.5rem 0',
            fontWeight: '800',
            background: 'linear-gradient(135deg, #7C2A62, #E91E63)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>Order History</h2>
          <p style={{
            color: '#666',
            fontSize: '1rem',
            textAlign: 'center',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: '1.5',
          }}>
            Track your medicine orders from vendors and view your complete purchase history
          </p>
        </div>

        {/* Empty div for balance */}
        <div style={{ width: '100px' }}></div>
      </div>

      {/* Gap between Header and Welcome Back Section */}
      <div style={{ marginBottom: '2rem' }}></div>
      {/* Gap between Safety Precautions and Main Orders Section */}
      <div style={{ marginBottom: '2.5rem' }}></div>

      {/* Main Content Section */}
      <div style={sectionContainerStyle}>
        <h3 style={sectionHeaderStyle}>
          📋 Your Orders
        </h3>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: '280px 1fr',
          gap: '2rem',
        }}>
          
          {/* Filters Sidebar - Compact Version */}
          <div style={{
            ...contentBoxStyle,
            padding: '1rem',
            height: 'fit-content',
          }}>
            <h4 style={{
              ...subheaderStyle,
              fontSize: '0.95rem',
              marginBottom: '1rem',
            }}>
               Filters
            </h4>

            {/* Order Status Filter */}
            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{
                color: '#7C2A62',
                margin: '0 0 0.8rem 0',
                fontSize: '0.9rem',
                fontWeight: '700',
              }}>
                Order Status
              </h5>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                {[
                  { key: 'all', label: 'All Status', count: orders?.length || 0 },
                  { key: 'delivered', label: 'Delivered', count: orders?.filter(o => o.status === 'Delivered').length || 0 },
                  { key: 'cancelled', label: 'Cancelled', count: orders?.filter(o => o.status === 'Cancelled').length || 0 },
                  { key: 'returned', label: 'Returned', count: orders?.filter(o => o.status === 'Returned').length || 0 }
                ].map((filter) => (
                  <button
                    key={filter.key}
                    style={getFilterOptionStyle(statusFilter === filter.key)}
                    onClick={() => setStatusFilter(filter.key)}
                    type="button"
                  >
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      width: '100%',
                    }}>
                      <span style={{ fontSize: '0.8rem' }}>{filter.label}</span>
                      <span style={{
                        backgroundColor: statusFilter === filter.key ? 'rgba(255,255,255,0.3)' : '#F7D9EB',
                        color: statusFilter === filter.key ? 'white' : '#7C2A62',
                        padding: '0.15rem 0.5rem',
                        borderRadius: '10px',
                        fontSize: '0.7rem',
                        fontWeight: '600',
                        minWidth: '25px',
                        textAlign: 'center',
                      }}>
                        {filter.count}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Order Date Filter */}
            <div>
              <h5 style={{
                color: '#7C2A62',
                margin: '0 0 0.8rem 0',
                fontSize: '0.9rem',
                fontWeight: '700',
              }}>
                Order Date
              </h5>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                {[
                  { key: 'recent', label: 'Recent (7 days)' },
                  { key: '30days', label: 'Last 30 days' },
                  { key: '6months', label: 'Last 6 months' }
                ].map((filter) => (
                  <button
                    key={filter.key}
                    style={getFilterOptionStyle(dateFilter === filter.key)}
                    onClick={() => setDateFilter(filter.key)}
                    type="button"
                  >
                    <span style={{ fontSize: '0.8rem' }}>{filter.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Clear Filters Button */}
            {(statusFilter !== 'all' || dateFilter !== 'recent') && (
              <button
                style={{
                  padding: '0.6rem 0.8rem',
                  backgroundColor: 'transparent',
                  color: '#7C2A62',
                  border: '2px solid #7C2A62',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '0.8rem',
                  fontWeight: '600',
                  transition: 'all 0.3s ease',
                  width: '100%',
                  marginTop: '1rem',
                }}
                onClick={() => {
                  setStatusFilter('all');
                  setDateFilter('recent');
                }}
                type="button"
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#7C2A62';
                  e.target.style.color = 'white';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.color = '#7C2A62';
                }}
              >
                Clear All Filters
              </button>
            )}
          </div>

          {/* Orders Content */}
          <div>
            {/* Orders Count and Filter Info */}
            <div style={{
              ...contentBoxStyle,
              marginBottom: '1.5rem',
              padding: '1rem',
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
                <div>
                  <h4 style={{
                    color: '#7C2A62',
                    margin: '0 0 0.3rem 0',
                    fontSize: '1.1rem',
                    fontWeight: '700',
                  }}>
                    {filteredOrders.length} Order{filteredOrders.length !== 1 ? 's' : ''} Found
                  </h4>
                  <p style={{
                    margin: 0,
                    fontSize: '0.8rem',
                    color: '#666',
                  }}>
                    {getFilterDisplayText()}
                  </p>
                </div>
                <div style={{
                  fontSize: '0.8rem',
                  color: '#666',
                  backgroundColor: '#f8f5ff',
                  padding: '0.3rem 0.7rem',
                  borderRadius: '6px',
                  border: '1px solid #F7D9EB',
                }}>
                  Updated: {currentTime.toLocaleTimeString()}
                </div>
              </div>
            </div>

            {/* Orders List or Empty State */}
            {filteredOrders.length === 0 ? (
              <div style={{
                ...contentBoxStyle,
                textAlign: 'center',
                padding: '3rem 1.5rem',
              }}>
                <div style={{
                  fontSize: '4rem',
                  marginBottom: '1.5rem',
                  opacity: 0.7,
                }}>
                  📦
                </div>
                <h4 style={{
                  fontSize: '1.4rem',
                  color: '#7C2A62',
                  marginBottom: '1rem',
                  fontWeight: '700',
                }}>
                  No Orders Found
                </h4>
                <p style={{
                  fontSize: '1rem',
                  color: '#888',
                  marginBottom: '2rem',
                  lineHeight: '1.6',
                  maxWidth: '400px',
                  margin: '0 auto 2rem auto',
                }}>
                  {getEmptyStateMessage()}
                </p>
                <div style={{
                  display: 'flex',
                  gap: '1rem',
                  justifyContent: 'center',
                  flexWrap: 'wrap',
                }}>
                  <button 
                    style={{
                      padding: '0.8rem 1.5rem',
                      backgroundColor: '#7C2A62',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontSize: '0.9rem',
                      fontWeight: '700',
                      transition: 'all 0.3s ease',
                      boxShadow: '0 4px 15px rgba(124, 42, 98, 0.3)',
                    }}
                    onClick={handleShopMedicines}
                    type="button"
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = '#6a2460';
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.boxShadow = '0 6px 20px rgba(124, 42, 98, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = '#7C2A62';
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = '0 4px 15px rgba(124, 42, 98, 0.3)';
                    }}
                  >
                    🛍️ Shop Medicines
                  </button>
                  {(statusFilter !== 'all' || dateFilter !== 'recent') && (
                    <button 
                      style={{
                        padding: '0.8rem 1.5rem',
                        backgroundColor: 'transparent',
                        color: '#7C2A62',
                        border: '2px solid #7C2A62',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontSize: '0.9rem',
                        fontWeight: '700',
                        transition: 'all 0.3s ease',
                      }}
                      onClick={() => {
                        setStatusFilter('all');
                        setDateFilter('recent');
                      }}
                      type="button"
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = '#7C2A62';
                        e.target.style.color = 'white';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = 'transparent';
                        e.target.style.color = '#7C2A62';
                      }}
                    >
                      🔄 Clear Filters
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1.2rem',
              }}>
                {filteredOrders.map(order => {
                  const vendor = getVendorInfo(order.vendorId);
                  const timeline = getOrderTimeline(order);
                  
                  return (
                    <div key={order.id} style={{
                      ...contentBoxStyle,
                      transition: 'all 0.3s ease',
                      padding: '1rem',
                    }}>
                      {/* Order Header with Vendor Info */}
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        marginBottom: '1.2rem',
                      }}>
                        <div style={{ flex: 1 }}>
                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.8rem',
                            marginBottom: '0.6rem',
                          }}>
                            <h4 style={{
                              margin: 0,
                              color: '#7C2A62',
                              fontSize: '1rem',
                              fontWeight: '800',
                            }}>Order #{order.id}</h4>
                            <span style={{
                              padding: '0.3rem 0.8rem',
                              borderRadius: '15px',
                              color: 'white',
                              fontSize: '0.7rem',
                              fontWeight: '700',
                              backgroundColor: getStatusColor(order.status),
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.3rem',
                            }}>
                              {getStatusIcon(order.status)} {order.status}
                            </span>
                          </div>
                          
                          {/* Vendor Information */}
                          <div style={{
                            backgroundColor: '#f8f5ff',
                            padding: '0.8rem',
                            borderRadius: '6px',
                            border: '1px solid #F7D9EB',
                            marginBottom: '0.8rem',
                          }}>
                            <div style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'flex-start',
                            }}>
                              <div>
                                <h5 style={{
                                  margin: '0 0 0.4rem 0',
                                  color: '#7C2A62',
                                  fontSize: '0.9rem',
                                  fontWeight: '700',
                                }}>
                                   {vendor.name}
                                </h5>
                                <div style={{
                                  fontSize: '0.75rem',
                                  color: '#666',
                                  marginBottom: '0.2rem',
                                }}>
                                  📍 {vendor.address}
                                </div>
                                <div style={{
                                  fontSize: '0.75rem',
                                  color: '#666',
                                }}>
                                  ⭐ {vendor.rating} • 🕒 {vendor.deliveryTime}
                                </div>
                              </div>
                            </div>
                          </div>

                          <div style={{
                            display: 'flex',
                            gap: '1.2rem',
                            fontSize: '0.75rem',
                            color: '#666',
                            flexWrap: 'wrap',
                          }}>
                            <span>📅 {order.date}</span>
                            <span>💰 ₹{order.total}</span>
                            <span>💊 {order.items.length} item{order.items.length !== 1 ? 's' : ''}</span>
                          </div>
                        </div>
                      </div>

                      {/* Order Timeline */}
                      <div style={{
                        marginBottom: '1.2rem',
                        padding: '0.8rem',
                        backgroundColor: '#f8f5ff',
                        borderRadius: '6px',
                        border: '1px solid #F7D9EB',
                      }}>
                        <h5 style={{
                          margin: '0 0 0.8rem 0',
                          color: '#7C2A62',
                          fontSize: '0.9rem',
                          fontWeight: '700',
                        }}>
                          Order Journey
                        </h5>
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}>
                          {timeline.map((step, index) => (
                            <div key={index} style={{
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                              flex: 1,
                              textAlign: 'center',
                            }}>
                              <div style={{
                                width: '30px',
                                height: '30px',
                                borderRadius: '50%',
                                backgroundColor: step.completed ? '#7C2A62' : '#E0E0E0',
                                color: step.completed ? 'white' : '#999',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '0.9rem',
                                marginBottom: '0.4rem',
                                position: 'relative',
                              }}>
                                {step.icon}
                                {index < timeline.length - 1 && (
                                  <div style={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '100%',
                                    width: 'calc(100% - 30px)',
                                    height: '2px',
                                    backgroundColor: step.completed ? '#7C2A62' : '#E0E0E0',
                                    transform: 'translateY(-50%)',
                                  }} />
                                )}
                              </div>
                              <div style={{
                                fontSize: '0.65rem',
                                color: step.completed ? '#7C2A62' : '#999',
                                fontWeight: '600',
                              }}>
                                {step.status}
                              </div>
                              {step.timestamp && (
                                <div style={{
                                  fontSize: '0.6rem',
                                  color: '#888',
                                  marginTop: '0.2rem',
                                }}>
                                  {step.timestamp.toLocaleTimeString('en-IN', { 
                                    hour: '2-digit', 
                                    minute: '2-digit' 
                                  })}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {/* Order Items */}
                      <div style={{
                        marginBottom: '1rem',
                      }}>
                        <h5 style={{
                          margin: '0 0 0.8rem 0',
                          color: '#7C2A62',
                          fontSize: '0.9rem',
                          fontWeight: '700',
                        }}>
                          Medicines Ordered
                        </h5>
                        {order.items.map((item, index) => (
                          <div key={index} style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '0.6rem',
                            borderBottom: '1px solid #F7D9EB',
                            backgroundColor: index % 2 === 0 ? 'white' : '#fafafa',
                            borderRadius: '5px',
                          }}>
                            <div style={{ flex: 2 }}>
                              <div style={{
                                color: '#333',
                                fontSize: '0.8rem',
                                fontWeight: '600',
                                marginBottom: '0.2rem',
                              }}>
                                💊 {item.name}
                              </div>
                              {item.prescriptionRequired && (
                                <div style={{
                                  fontSize: '0.65rem',
                                  color: '#7C2A62',
                                  backgroundColor: '#F7D9EB',
                                  padding: '0.15rem 0.4rem',
                                  borderRadius: '3px',
                                  display: 'inline-block',
                                }}>
                                   Prescription Required
                                </div>
                              )}
                            </div>
                            <div style={{
                              display: 'flex',
                              gap: '0.6rem',
                              alignItems: 'center',
                              flex: 1,
                              justifyContent: 'flex-end',
                            }}>
                              <span style={{
                                color: '#666',
                                fontSize: '0.75rem',
                                backgroundColor: '#f8f5ff',
                                padding: '0.25rem 0.6rem',
                                borderRadius: '5px',
                              }}>
                                Qty: {item.quantity}
                              </span>
                              <span style={{
                                color: '#7C2A62',
                                fontWeight: '700',
                                fontSize: '0.8rem',
                              }}>
                                ₹{item.price * item.quantity}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      {/* Order Footer */}
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        paddingTop: '0.8rem',
                        borderTop: '2px solid #F7D9EB',
                      }}>
                        <div style={{
                          color: '#666',
                          fontSize: '0.75rem',
                          flex: 2,
                          fontWeight: '500',
                        }}>
                          <strong> Delivery Address:</strong> {order.deliveryAddress}
                        </div>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.6rem',
                        }}>
                          {(
                            <button 
                              style={{
                                padding: '0.4rem 0.8rem',
                                backgroundColor: '#7C2A62',
                                color: 'white',
                                border: 'none',
                                borderRadius: '5px',
                                cursor: 'pointer',
                                fontSize: '0.75rem',
                                fontWeight: '600',
                                transition: 'all 0.3s ease',
                              }}
                              onClick={() => startLiveTracking(order)}
                              type="button"
                              onMouseEnter={(e) => {
                                e.target.style.backgroundColor = '#6a2460';
                                e.target.style.transform = 'translateY(-2px)';
                              }}
                              onMouseLeave={(e) => {
                                e.target.style.backgroundColor = '#7C2A62';
                                e.target.style.transform = 'translateY(0)';
                              }}
                            >
                               Track
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersView;