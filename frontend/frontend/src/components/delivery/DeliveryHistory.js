import React, { useState, useEffect } from 'react';

const DeliveryHistory = ({ deliveryData, completedOrders = [] }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [taskFilter, setTaskFilter] = useState('all');
  const [allCompletedOrders, setAllCompletedOrders] = useState([]);

  // Combine delivered orders from props and completed orders from dashboard
  useEffect(() => {
    const combinedOrders = [
      ...(deliveryData?.completedTasks || []),
      ...completedOrders.map(order => ({
        id: order.id,
        orderId: order.orderId,
        customerName: order.customerName,
        customerPhone: order.customerPhone,
        pickupLocation: order.pharmacyLocation,
        deliveryLocation: order.deliveryLocation,
        amount: order.amount,
        tip: order.tip || 0,
        deliveryDate: order.deliveryDate || new Date().toISOString().split('T')[0],
        completedTime: order.completedTime || new Date().toLocaleTimeString(),
        rating: order.rating || Math.floor(Math.random() * 2) + 4,
        feedback: order.feedback || (Math.random() > 0.5 ? 'Great service! Very professional and on time.' : 'Excellent delivery service!'),
        status: 'delivered'
      }))
    ];
    
    // Remove duplicates based on orderId
    const uniqueOrders = combinedOrders.filter((order, index, self) =>
      index === self.findIndex(o => o.orderId === order.orderId)
    );
    
    setAllCompletedOrders(uniqueOrders);
  }, [deliveryData, completedOrders]);

  const styles = {
    mainContent: {
      padding: '30px',
      minHeight: '100vh',
      backgroundColor: '#f8f9fa'
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: '30px'
    },
    greeting: {
      fontSize: '28px',
      fontWeight: '700',
      color: '#1f2937',
      margin: '0 0 8px 0'
    },
    subtitle: {
      fontSize: '16px',
      color: '#6b7280',
      margin: 0
    },
    taskHeaderActions: {
      display: 'flex',
      gap: '16px',
      alignItems: 'center'
    },
    searchBox: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center'
    },
    searchInput: {
      padding: '8px 12px 8px 35px',
      border: '1px solid #d1d5db',
      borderRadius: '8px',
      fontSize: '14px',
      width: '250px',
      outline: 'none'
    },
    searchIcon: {
      position: 'absolute',
      left: '10px',
      color: '#6b7280'
    },
    taskFilters: {
      display: 'flex',
      gap: '8px'
    },
    filterButton: {
      padding: '8px 16px',
      backgroundColor: 'white',
      border: '1px solid #e5e7eb',
      borderRadius: '6px',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: '500',
      transition: 'all 0.3s ease'
    },
    filterButtonActive: {
      backgroundColor: '#7C2A62',
      color: 'white',
      borderColor: '#7C2A62'
    },
    tasksContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: '16px'
    },
    detailedTaskCard: {
      backgroundColor: 'white',
      padding: '20px',
      borderRadius: '12px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      border: '1px solid #e5e7eb',
      transition: 'all 0.3s ease'
    },
    taskHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: '16px'
    },
    taskMainInfo: {
      flex: 1
    },
    orderHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '8px'
    },
    orderId: {
      fontSize: '18px',
      fontWeight: '600',
      color: '#1f2937',
      margin: 0
    },
    ratingDisplay: {
      display: 'flex',
      alignItems: 'center',
      gap: '4px'
    },
    ratingText: {
      fontSize: '12px',
      color: '#6b7280'
    },
    customerInfo: {
      fontSize: '14px',
      color: '#6b7280',
      margin: '4px 0 0 0'
    },
    deliveryDate: {
      fontSize: '12px',
      color: '#9ca3af',
      margin: '4px 0 0 0'
    },
    taskStatus: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
      gap: '8px'
    },
    statusBadge: {
      color: 'white',
      padding: '4px 8px',
      borderRadius: '12px',
      fontSize: '12px',
      fontWeight: '500'
    },
    amountBadge: {
      fontSize: '16px',
      fontWeight: '600',
      color: '#7C2A62'
    },
    taskDetails: {
      marginTop: '16px'
    },
    locationRow: {
      display: 'flex',
      gap: '20px',
      marginBottom: '12px'
    },
    locationColumn: {
      flex: 1
    },
    detailLabel: {
      fontSize: '14px',
      color: '#6b7280',
      fontWeight: '500'
    },
    detailText: {
      fontSize: '14px',
      color: '#1f2937',
      margin: '4px 0 0 0'
    },
    detailSection: {
      marginBottom: '12px'
    },
    feedbackText: {
      fontSize: '14px',
      color: '#1f2937',
      fontStyle: 'italic',
      margin: '4px 0 0 0'
    },
    noTasks: {
      textAlign: 'center',
      padding: '60px 20px',
      backgroundColor: 'white',
      borderRadius: '12px',
      border: '2px dashed #e5e7eb'
    },
    noTasksIcon: {
      fontSize: '48px',
      marginBottom: '16px'
    },
    noTasksText: {
      fontSize: '18px',
      fontWeight: '600',
      color: '#374151',
      margin: '0 0 8px 0'
    },
    noTasksSubtext: {
      fontSize: '14px',
      color: '#6b7280',
      margin: 0
    },
    statsSummary: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: '16px',
      marginBottom: '24px'
    },
    statCard: {
      backgroundColor: 'white',
      padding: '20px',
      borderRadius: '12px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
      border: '1px solid #e5e7eb',
      textAlign: 'center'
    },
    statNumber: {
      fontSize: '24px',
      fontWeight: '700',
      color: '#7C2A62',
      margin: '0 0 4px 0'
    },
    statLabel: {
      fontSize: '12px',
      color: '#6b7280',
      margin: 0,
      fontWeight: '500'
    }
  };

  const formatIndianCurrency = (amount) => {
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  // Filter tasks based on search and filter
  const getFilteredTasks = () => {
    let filtered = allCompletedOrders;

    if (taskFilter !== 'all') {
      const now = new Date();
      if (taskFilter === 'today') {
        const today = now.toISOString().split('T')[0];
        filtered = filtered.filter(task => task.deliveryDate === today);
      } else if (taskFilter === 'week') {
        const oneWeekAgo = new Date(now);
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        filtered = filtered.filter(task => new Date(task.deliveryDate) >= oneWeekAgo);
      } else if (taskFilter === 'month') {
        const oneMonthAgo = new Date(now);
        oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
        filtered = filtered.filter(task => new Date(task.deliveryDate) >= oneMonthAgo);
      }
    }

    if (searchTerm) {
      filtered = filtered.filter(task =>
        task.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.pickupLocation.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.deliveryLocation.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered.sort((a, b) => new Date(b.deliveryDate) - new Date(a.deliveryDate));
  };

  const filteredTasks = getFilteredTasks();

  // Calculate statistics
  const totalEarnings = filteredTasks.reduce((sum, task) => sum + task.amount + (task.tip || 0), 0);
  const totalTips = filteredTasks.reduce((sum, task) => sum + (task.tip || 0), 0);
  const averageRating = filteredTasks.length > 0 
    ? (filteredTasks.reduce((sum, task) => sum + (task.rating || 0), 0) / filteredTasks.length).toFixed(1)
    : 0;

  return (
    <div style={styles.mainContent}>
      <div style={styles.header}>
        <div>
          <h1 style={styles.greeting}>Delivery History</h1>
          <p style={styles.subtitle}>View your delivered orders and earnings</p>
        </div>
        <div style={styles.taskHeaderActions}>
          <div style={styles.searchBox}>
            <input
              type="text"
              placeholder="Search delivery history..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={styles.searchInput}
            />
            <span style={styles.searchIcon}>🔍</span>
          </div>
          <div style={styles.taskFilters}>
            <button
              style={{
                ...styles.filterButton,
                ...(taskFilter === 'today' ? styles.filterButtonActive : {})
              }}
              onClick={() => setTaskFilter('today')}
            >
              Today
            </button> 
            <button
              style={{
                ...styles.filterButton,
                ...(taskFilter === 'week' ? styles.filterButtonActive : {})
              }}
              onClick={() => setTaskFilter('week')}
            >
              This Week
            </button>
            <button
              style={{
                ...styles.filterButton,
                ...(taskFilter === 'month' ? styles.filterButtonActive : {})
              }}
              onClick={() => setTaskFilter('month')}
            >
              This Month
            </button>
            <button
              style={{
                ...styles.filterButton,
                ...(taskFilter === 'all' ? styles.filterButtonActive : {})
              }}
              onClick={() => setTaskFilter('all')}
            >
              All Time
            </button>
          </div>
        </div>
      </div>

      {/* Statistics Summary */}
      {filteredTasks.length > 0 && (
        <div style={styles.statsSummary}>
          <div style={styles.statCard}>
            <h3 style={styles.statNumber}>{filteredTasks.length}</h3>
            <p style={styles.statLabel}>Total Deliveries</p>
          </div>
          <div style={styles.statCard}>
            <h3 style={styles.statNumber}>{formatIndianCurrency(totalEarnings)}</h3>
            <p style={styles.statLabel}>Total Earnings</p>
          </div>
          <div style={styles.statCard}>
            <h3 style={styles.statNumber}>{formatIndianCurrency(totalTips)}</h3>
            <p style={styles.statLabel}>Total Tips</p>
          </div>
          <div style={styles.statCard}>
            <h3 style={styles.statNumber}>{averageRating} ⭐</h3>
            <p style={styles.statLabel}>Average Rating</p>
          </div>
        </div>
      )}

      <div style={styles.tasksContainer}>
        {filteredTasks.length === 0 ? (
          <div style={styles.noTasks}>
            <div style={styles.noTasksIcon}>📦</div>
            <h3 style={styles.noTasksText}>No delivery history found</h3>
            <p style={styles.noTasksSubtext}>
              {searchTerm ? 'Try adjusting your search terms' : 'Complete some deliveries to see your history here!'}
            </p>
          </div>
        ) : (
          filteredTasks.map(task => (
            <div key={task.id} style={styles.detailedTaskCard}>
              <div style={styles.taskHeader}>
                <div style={styles.taskMainInfo}>
                  <div style={styles.orderHeader}>
                    <h3 style={styles.orderId}>{task.orderId}</h3>
                    <div style={styles.ratingDisplay}>
                      {'⭐'.repeat(task.rating || 0)}
                      <span style={styles.ratingText}>{task.rating || 0}/5</span>
                    </div>
                  </div>
                  <p style={styles.customerInfo}>
                    {task.customerName} • {task.customerPhone}
                  </p>
                  <p style={styles.deliveryDate}>
                    Delivered on {new Date(task.deliveryDate).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })} at {task.completedTime}
                  </p>
                </div>
                <div style={styles.taskStatus}>
                  <span style={{
                    ...styles.statusBadge,
                    backgroundColor: '#10B981'
                  }}>
                    Delivered
                  </span>
                  <div style={styles.amountBadge}>
                    {formatIndianCurrency(task.amount)}
                    {task.tip > 0 && (
                      <div style={{ fontSize: '12px', color: '#10B981', marginTop: '2px' }}>
                        +{formatIndianCurrency(task.tip)} tip
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div style={styles.taskDetails}>
                <div style={styles.locationRow}>
                  <div style={styles.locationColumn}>
                    <strong style={styles.detailLabel}>🏥 Pickup Location:</strong>
                    <p style={styles.detailText}>{task.pickupLocation}</p>
                  </div>
                  <div style={styles.locationColumn}>
                    <strong style={styles.detailLabel}>🏠 Delivery Location:</strong>
                    <p style={styles.detailText}>{task.deliveryLocation}</p>
                  </div>
                </div>
                {task.feedback && (
                  <div style={styles.detailSection}>
                    <strong style={styles.detailLabel}>💬 Customer Feedback:</strong>
                    <p style={styles.feedbackText}>"{task.feedback}"</p>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

// Add default props
DeliveryHistory.defaultProps = {
  deliveryData: {
    completedTasks: []
  },
  completedOrders: []
};

export default DeliveryHistory;