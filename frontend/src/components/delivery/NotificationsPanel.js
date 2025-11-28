import React, { useState, useEffect, useRef } from 'react';

const NotificationPanel = ({ 
  showNotifications, 
  notifications = [],
  onClose, 
  onViewAll,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  deleteAllNotifications,
  loadMoreNotifications,
  isFullPage = false
}) => {
  const [localNotifications, setLocalNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const notificationsRef = useRef(null);

  useEffect(() => {
    if (notifications && Array.isArray(notifications)) {
      setLocalNotifications(notifications);
    }
  }, [notifications]);

  useEffect(() => {
    if (!showNotifications || isFullPage) return;

    const handleClickOutside = (event) => {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        onClose();
      }
    };

    const timer = setTimeout(() => {
      document.addEventListener('mousedown', handleClickOutside);
    }, 100);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showNotifications, onClose, isFullPage]);

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
      appointment: '👨‍⚕️',
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
      backgroundColor: 'transparent',
      zIndex: 1000,
    },
    popupContainer: {
      position: 'fixed',
      top: '20px',
      right: '20px',
      width: '420px',
      backgroundColor: 'white',
      borderRadius: '12px',
      boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
      zIndex: 1001,
      maxHeight: '80vh',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column'
    },
    fullPageOverlay: {
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
    fullPageContainer: {
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
      padding: isFullPage ? '24px' : '20px',
      borderBottom: '1px solid #e5e7eb',
      backgroundColor: '#f8fafc'
    },
    headerActions: {
      display: 'flex',
      alignItems: 'center',
      gap: isFullPage ? '16px' : '10px'
    },
    unreadBadge: {
      backgroundColor: '#ef4444',
      color: 'white',
      borderRadius: '10px',
      padding: isFullPage ? '4px 12px' : '2px 8px',
      fontSize: isFullPage ? '14px' : '12px',
      fontWeight: '600'
    },
    closeButton: {
      backgroundColor: 'transparent',
      border: 'none',
      fontSize: '20px',
      cursor: 'pointer',
      color: '#6b7280',
      padding: isFullPage ? '8px' : '4px'
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
      fontSize: isFullPage ? '14px' : '12px',
      fontWeight: '500',
      padding: isFullPage ? '8px 16px' : '4px 8px',
      borderRadius: isFullPage ? '6px' : '4px'
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
      maxHeight: isFullPage ? 'none' : '400px',
      padding: '0'
    },
    notificationItem: {
      display: 'flex',
      padding: isFullPage ? '20px 24px' : '16px 20px',
      borderBottom: '1px solid #f3f4f6',
      backgroundColor: 'transparent',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease'
    },
    unreadNotification: {
      backgroundColor: '#f0f9ff'
    },
    notificationIcon: {
      fontSize: isFullPage ? '24px' : '20px',
      marginRight: isFullPage ? '16px' : '12px',
      marginTop: '2px',
      flexShrink: 0
    },
    notificationContent: {
      flex: 1,
      minWidth: 0
    },
    notificationTitle: {
      fontSize: isFullPage ? '16px' : '14px',
      fontWeight: '600',
      color: '#1f2937',
      margin: '0 0 4px 0',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start'
    },
    notificationMessage: {
      fontSize: isFullPage ? '14px' : '13px',
      color: '#6b7280',
      margin: '0 0 4px 0',
      lineHeight: isFullPage ? '1.5' : '1.4',
      wordWrap: 'break-word'
    },
    notificationTime: {
      fontSize: isFullPage ? '12px' : '11px',
      color: '#9ca3af'
    },
    deleteButton: {
      backgroundColor: 'transparent',
      border: 'none',
      color: '#ef4444',
      cursor: 'pointer',
      fontSize: isFullPage ? '14px' : '12px',
      padding: isFullPage ? '4px 8px' : '2px 6px',
      borderRadius: isFullPage ? '4px' : '3px',
      marginLeft: '8px'
    },
    emptyState: {
      padding: isFullPage ? '60px 20px' : '40px 20px',
      textAlign: 'center',
      color: '#6b7280',
      fontSize: isFullPage ? '16px' : '14px'
    },
    footer: {
      padding: isFullPage ? '16px 24px' : '16px 20px',
      borderTop: '1px solid #e5e7eb',
      backgroundColor: '#f8fafc'
    },
    viewAllButton: {
      width: '100%',
      padding: '12px',
      backgroundColor: '#7C2A62',
      color: 'white',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      fontWeight: '500',
      fontSize: '14px'
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

  if (!showNotifications && !isFullPage) {
    return null;
  }

  if (!localNotifications || !Array.isArray(localNotifications)) {
    return null;
  }

  if (isFullPage) {
    return (
      <div style={styles.fullPageOverlay} onClick={onClose}>
        <div style={styles.fullPageContainer} onClick={(e) => e.stopPropagation()}>
          <div style={styles.header}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <button
                style={styles.backButton}
                onClick={onClose}
                aria-label="Go back"
              >
                ←
              </button>
              <h2 style={{ margin: 0 }}>All Notifications</h2>
              {unreadCount > 0 && (
                <span style={styles.unreadBadge}>
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
                        {formatTime(notification.timestamp || notification.time)}
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
  }

  return (
    <>
      <div style={styles.overlay} />
      
      <div ref={notificationsRef} style={styles.popupContainer}>
        <div style={styles.header}>
          <div>
            <h3 style={{ margin: 0 }}>Notifications</h3>
            {unreadCount > 0 && (
              <span style={styles.unreadBadge}>
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
                Mark all read
              </button>
            )}
            <button
              style={styles.closeButton}
              onClick={onClose}
              aria-label="Close notifications"
            >
              ✕
            </button>
          </div>
        </div>
        
        <div style={styles.notificationsList}>
          {localNotifications.length > 0 ? (
            <>
              {localNotifications.slice(0, 5).map(notification => (
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
                        ×
                      </button>
                    </div>
                    <p style={styles.notificationMessage}>
                      {notification.message || 'No message'}
                    </p>
                    <span style={styles.notificationTime}>
                      {formatTime(notification.timestamp || notification.time)}
                    </span>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <div style={styles.emptyState}>
              No notifications available
            </div>
          )}
        </div>
        
        <div style={styles.footer}>
          <button
            style={styles.viewAllButton}
            onClick={onViewAll}
          >
            View All Notifications
          </button>
        </div>
      </div>
    </>
  );
};

export default NotificationPanel;