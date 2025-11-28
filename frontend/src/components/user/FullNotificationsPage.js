import React, { useState, useEffect } from 'react';

const FullNotificationsPage = ({ 
  notifications = [],
  onBack,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  deleteAllNotifications,
  loadMoreNotifications 
}) => {
  const [localNotifications, setLocalNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (notifications && Array.isArray(notifications)) {
      setLocalNotifications(notifications);
    }
  }, [notifications]);

  const handleLoadMore = async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    try {
      if (loadMoreNotifications) {
        const nextPage = currentPage + 1;
        const newNotifications = await loadMoreNotifications(nextPage);
        
        if (newNotifications && newNotifications.length > 0) {
          setLocalNotifications(prev => [...prev, ...newNotifications]);
          setCurrentPage(nextPage);
        } else {
          setHasMore(false);
        }
      } else {
        await new Promise(resolve => setTimeout(resolve, 1000));
        const mockNotifications = generateMockNotifications(currentPage * 10, 10);
        setLocalNotifications(prev => [...prev, ...mockNotifications]);
        setCurrentPage(prev => prev + 1);
        
        if (currentPage >= 5) {
          setHasMore(false);
        }
      }
    } catch (error) {
      console.error('Error loading more notifications:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMarkAsRead = (notificationId) => {
    if (markAsRead) {
      markAsRead(notificationId);
    } else {
      setLocalNotifications(prev =>
        prev.map(notif =>
          notif.id === notificationId ? { ...notif, read: true } : notif
        )
      );
    }
  };

  const handleMarkAllAsRead = () => {
    if (markAllAsRead) {
      markAllAsRead();
    } else {
      setLocalNotifications(prev =>
        prev.map(notif => ({ ...notif, read: true }))
      );
    }
  };

  const handleDeleteNotification = (notificationId) => {
    if (deleteNotification) {
      deleteNotification(notificationId);
    } else {
      setLocalNotifications(prev =>
        prev.filter(notif => notif.id !== notificationId)
      );
    }
  };

  const handleDeleteAll = () => {
    if (deleteAllNotifications) {
      deleteAllNotifications();
    } else {
      setLocalNotifications([]);
    }
  };

  const getNotificationIcon = (type) => {
    const icons = {
      order: '📦',
      system: '⚙️',
      customer: '👤',
      payment: '💳',
      security: '🔒',
      promotion: '🎁',
      default: '🔔'
    };
    return icons[type] || icons.default;
  };

  const formatTime = (timestamp) => {
    if (!timestamp) return 'Just now';
    
    const now = new Date();
    const notificationTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - notificationTime) / (1000 * 60));
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInDays < 7) return `${diffInDays}d ago`;
    
    return notificationTime.toLocaleDateString();
  };

  const unreadCount = localNotifications.filter(notif => !notif.read).length;

  const styles = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      zIndex: 1000,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start',
      padding: '20px'
    },
    container: {
      backgroundColor: 'white',
      borderRadius: '12px',
      width: '90%',
      maxWidth: '800px',
      maxHeight: '90vh',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '24px',
      borderBottom: '1px solid #e5e7eb',
      backgroundColor: '#f8fafc'
    },
    headerActions: {
      display: 'flex',
      alignItems: 'center',
      gap: '16px'
    },
    backButton: {
      backgroundColor: 'transparent',
      border: 'none',
      fontSize: '20px',
      cursor: 'pointer',
      color: '#6b7280',
      padding: '8px'
    },
    actionButton: {
      backgroundColor: 'transparent',
      border: 'none',
      color: '#7C2A62',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: '500',
      padding: '8px 16px',
      borderRadius: '6px',
    },
    deleteAllButton: {
      backgroundColor: 'transparent',
      border: 'none',
      color: '#ef4444',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: '500',
      padding: '8px 16px',
      borderRadius: '6px',

    },
    notificationsList: {
      flex: 1,
      overflowY: 'auto',
      padding: '0'
    },
    notificationItem: {
      display: 'flex',
      padding: '20px 24px',
      borderBottom: '1px solid #f3f4f6',
      transition: 'background-color 0.3s ease',
      position: 'relative',
      backgroundColor: 'transparent',
      cursor: 'pointer'
    },
    unreadNotification: {
      backgroundColor: '#f0f9ff'
    },
    notificationIcon: {
      fontSize: '24px',
      marginRight: '16px',
      marginTop: '2px',
      flexShrink: 0
    },
    notificationContent: {
      flex: 1,
      minWidth: 0
    },
    notificationTitle: {
      fontSize: '16px',
      fontWeight: '600',
      color: '#1f2937',
      margin: '0 0 8px 0',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start'
    },
    notificationMessage: {
      fontSize: '14px',
      color: '#6b7280',
      margin: '0 0 8px 0',
      lineHeight: '1.5'
    },
    notificationTime: {
      fontSize: '12px',
      color: '#9ca3af'
    },
    deleteButton: {
      backgroundColor: 'transparent',
      border: 'none',
      color: '#ef4444',
      cursor: 'pointer',
      fontSize: '14px',
      padding: '4px 8px',
      borderRadius: '4px'
    },
    emptyState: {
      padding: '60px 20px',
      textAlign: 'center',
      color: '#6b7280',
      fontSize: '16px'
    },
    loadingState: {
      padding: '40px 20px',
      textAlign: 'center',
      color: '#6b7280'
    },
    loadMoreButton: {
      width: '100%',
      padding: '16px',
      backgroundColor: 'transparent',
      color: '#7C2A62',
      border: '1px solid #7C2A62',
      borderRadius: '8px',
      cursor: 'pointer',
      fontWeight: '500',
      fontSize: '16px',
      margin: '20px',
      maxWidth: '200px',
      alignSelf: 'center'
    },
    loadMoreButtonDisabled: {
      opacity: 0.6,
      cursor: 'not-allowed'
    }
  };

  const generateMockNotifications = (startId, count) => {
    const types = ['order', 'system', 'customer', 'payment', 'promotion'];
    const messages = [
      'Your order #ORD-12345 has been shipped',
      'System maintenance scheduled for tonight',
      'New customer registration completed',
      'Payment of $149.99 received successfully',
      'Special promotion: 20% off all items this weekend',
      'Your account password was changed',
      'New review received for your product',
      'Inventory low for product "Wireless Earbuds"',
      'Weekly sales report is ready',
      'Security alert: New login from unknown device'
    ];

    return Array.from({ length: count }, (_, i) => ({
      id: `notification-${startId + i}`,
      title: `Notification ${startId + i + 1}`,
      message: messages[Math.floor(Math.random() * messages.length)],
      type: types[Math.floor(Math.random() * types.length)],
      time: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
      read: Math.random() > 0.7
    }));
  };

  return (
    <div style={styles.overlay} onClick={onBack}>
      <div style={styles.container} onClick={(e) => e.stopPropagation()}>
        <div style={styles.header}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button
              style={styles.backButton}
              onClick={onBack}
              aria-label="Go back"
            >
              ←
            </button>
            <h2 style={{ margin: 0 }}>All Notifications</h2>
            {unreadCount > 0 && (
              <span style={{
                backgroundColor: '#ef4444',
                color: 'white',
                borderRadius: '10px',
                padding: '4px 12px',
                fontSize: '14px',
                fontWeight: '600'
              }}>
                {unreadCount} unread
              </span>
            )}
          </div>
          
          <div style={styles.headerActions}>
            {unreadCount > 0 && (
              <button
                style={styles.actionButton}
                onClick={handleMarkAllAsRead}
              >
                Mark all as read
              </button>
            )}
            {localNotifications.length > 0 && (
              <button
                style={styles.deleteAllButton}
                onClick={handleDeleteAll}
              >
                Delete all
              </button>
            )}
          </div>
        </div>
        
        <div style={styles.notificationsList}>
          {localNotifications.length > 0 ? (
            <>
              {localNotifications.map(notification => (
                <div 
                  key={notification.id} 
                  style={{
                    ...styles.notificationItem,
                    ...(!notification.read ? styles.unreadNotification : {})
                  }}
                  onClick={() => handleMarkAsRead(notification.id)}
                >
                  <div style={styles.notificationIcon}>
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div style={styles.notificationContent}>
                    <div style={styles.notificationTitle}>
                      <span>{notification.title || 'Notification'}</span>
                      <button
                        style={styles.deleteButton}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteNotification(notification.id);
                        }}
                        aria-label="Delete notification"
                      >
                        Delete
                      </button>
                    </div>
                    <p style={styles.notificationMessage}>
                      {notification.message || 'No message'}
                    </p>
                    <span style={styles.notificationTime}>
                      {formatTime(notification.time)}
                    </span>
                  </div>
                </div>
              ))}
              
              {hasMore && (
                <button
                  style={{
                    ...styles.loadMoreButton,
                    ...(isLoading ? styles.loadMoreButtonDisabled : {})
                  }}
                  onClick={handleLoadMore}
                  disabled={isLoading}
                >
                  {isLoading ? 'Loading...' : 'Load More Notifications'}
                </button>
              )}
            </>
          ) : (
            <div style={styles.emptyState}>
              No notifications available
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FullNotificationsPage;