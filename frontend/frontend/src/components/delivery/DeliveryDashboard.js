import React, { useState, useEffect, useRef } from 'react';
import Toast from './Toast';
import LogoutConfirmation from './LogoutConfirmation';
import AIChatBoard from './AIChatBoard';
import ProfileImageUpload from './ProfileImageUpload';
import Sidebar from './Sidebar';
import NotificationsPanel from './NotificationsPanel';
import TaskDetailsModal from './TaskDetailsModal';
import Dashboard from './Dashboard';
import DeliveryHistory from './DeliveryHistory';
import Earnings from './Earnings';
import Performance from './Performance';
import Profile from './Profile';

// Notification sound
const playNotificationSound = () => {
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  
  oscillator.frequency.value = 800;
  oscillator.type = 'sine';
  
  gainNode.gain.setValueAtTime(0, audioContext.currentTime);
  gainNode.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 0.1);
  gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.3);
  
  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + 0.3);
};

const DeliveryDashboard = ({ user, onLogout }) => {
  const [activePage, setActivePage] = useState('dashboard');
  const [selectedTask, setSelectedTask] = useState(null);
  const [isOnline, setIsOnline] = useState(true);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showAIChat, setShowAIChat] = useState(false);
  const [showProfileImageUpload, setShowProfileImageUpload] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [toast, setToast] = useState(null);
  
  // Refs for click outside detection
  const notificationsRef = useRef(null);

  // Show toast function
  const showToast = (message, type = 'info') => {
    setToast({ message, type });
  };

  // Generate unique ID for delivery agent
  const generateAgentId = () => {
    const timestamp = new Date().getTime().toString(36);
    const randomStr = Math.random().toString(36).substr(2, 5);
    return `DA-${timestamp}-${randomStr}`.toUpperCase();
  };

  // Initialize profile data
  const [profileData, setProfileData] = useState({
    agentId: generateAgentId(),
    fullName: user?.fullName || 'Saketi Adarsh',
    email: user?.email || 'saketiadarsh79@gmail.com',
    phone: user?.phone || '+91 73829 70467',
    address: 'A Square buildings',
    city: 'Vishakapatanam',
    pincode: '532458',
    dateOfBirth: '',
    age: '45',
    gender: '',
    currentLocation: 'Sector 18, Noida',
    vehicleType: 'Motorcycle',
    vehicleNumber: 'DL01AB1234',
    joinedDate: '2023-05-24',
    totalDeliveries: 1245,
    rating: 5.0,
    completionRate: '99%',
    averageRating: 4.9,
    responseTime: '9 mins',
    profileImage: null
  });

  // Enhanced delivery data with pending orders
  const [deliveryData, setDeliveryData] = useState({
    stats: {
      totalToday: 0,
      inProgress: 0,
      completed: 0,
      cancelled: 0,
      todayEarnings: 0,
      pending: 0
    },
    pendingTasks: [
      {
        id: 3,
        orderId: 'ORD-003',
        customerName: 'Anita Desai',
        customerPhone: '+91 98765 43212',
        pickupLocation: 'MedPlus Pharmacy, Sector 18',
        deliveryLocation: 'C-12, Sector 12, Noida',
        items: ['Pain Relief Spray', 'Bandages'],
        priority: 'Medium',
        status: 'pending',
        estimatedTime: '20 mins',
        distance: '2.5 km',
        amount: 30,
        assignedTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        specialInstructions: 'Ring bell twice',
        currentLocation: 'Sector 18, Noida',
        routeProgress: 0
      }
    ],
    assignedTasks: [
      {
        id: 1,
        orderId: 'ORD-001',
        customerName: 'Rajesh Kumar',
        customerPhone: '+91 98765 43210',
        pickupLocation: 'MedPlus Pharmacy, MG Road',
        deliveryLocation: 'H-12, Sector 15, Noida',
        items: ['Paracetamol', 'Vitamin C', 'Cough Syrup'],
        priority: 'High',
        status: 'assigned',
        estimatedTime: '30 mins',
        distance: '4.2 km',
        amount: 45,
        assignedTime: '09:00 AM',
        specialInstructions: 'Call before delivery',
        currentLocation: 'Sector 18, Noida',
        routeProgress: 0
      },
      {
        id: 2,
        orderId: 'ORD-002',
        customerName: 'Priya Sharma',
        customerPhone: '+91 98765 43211',
        pickupLocation: 'Apollo Pharmacy, Connaught Place',
        deliveryLocation: 'B-5, Preet Vihar, Delhi',
        items: ['Insulin', 'Blood Pressure Monitor'],
        priority: 'Medium',
        status: 'in-progress',
        estimatedTime: '25 mins',
        distance: '3.8 km',
        amount: 35,
        assignedTime: '09:15 AM',
        specialInstructions: 'Handle with care - medical equipment',
        currentLocation: 'Connaught Place, Delhi',
        routeProgress: 45
      }
    ],
    completedTasks: [
      {
        id: 101,
        orderId: 'ORD-101',
        customerName: 'Arun Sharma',
        customerPhone: '+91 98765 43218',
        pickupLocation: 'City Medical Store, Sector 18',
        deliveryLocation: 'A-12, Sector 15, Noida',
        items: ['Blood Pressure Medicine', 'Vitamin D3'],
        completedTime: '10:45 AM',
        amount: 65,
        rating: 5,
        feedback: 'Very prompt delivery, excellent service',
        deliveryDate: new Date().toISOString().split('T')[0]
      }
    ],
    cancelledTasks: [],
    notifications: [
      {
        id: 1,
        type: 'order',
        title: 'New Delivery Assignment',
        message: 'You have been assigned a new delivery order ORD-006',
        time: '10 minutes ago',
        read: false,
        action: 'view'
      }
    ]
  });

  const [notifications, setNotifications] = useState(deliveryData.notifications);

  // Simulate new orders coming in
  useEffect(() => {
    if (!isOnline) return;

    const orderInterval = setInterval(() => {
      // 20% chance of new order every 30 seconds
      if (Math.random() < 0.2) {
        const newOrderId = `ORD-${Math.floor(1000 + Math.random() * 9000)}`;
        const newOrder = {
          id: Date.now(),
          orderId: newOrderId,
          customerName: ['Amit Patel', 'Sneha Reddy', 'Rohan Singh', 'Priya Iyer'][Math.floor(Math.random() * 4)],
          customerPhone: `+91 ${Math.floor(7000000000 + Math.random() * 3000000000)}`,
          pickupLocation: ['MedPlus Pharmacy', 'Apollo Pharmacy', 'City Medical', 'Wellness Store'][Math.floor(Math.random() * 4)],
          deliveryLocation: `Sector ${Math.floor(10 + Math.random() * 20)}, Noida`,
          items: [['Paracetamol', 'Vitamin C'], ['Cold Medicine', 'Cough Syrup'], ['Pain Relief', 'Bandages']][Math.floor(Math.random() * 3)],
          priority: ['Low', 'Medium', 'High'][Math.floor(Math.random() * 3)],
          status: 'pending',
          estimatedTime: `${Math.floor(15 + Math.random() * 30)} mins`,
          distance: `${(2 + Math.random() * 5).toFixed(1)} km`,
          amount: Math.floor(30 + Math.random() * 50),
          assignedTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          specialInstructions: Math.random() > 0.7 ? 'Call before delivery' : '',
          currentLocation: 'Sector 18, Noida',
          routeProgress: 0
        };

        setDeliveryData(prev => ({
          ...prev,
          pendingTasks: [...prev.pendingTasks, newOrder],
          notifications: [
            {
              id: Date.now(),
              type: 'order',
              title: 'New Delivery Available',
              message: `New order ${newOrderId} is available for acceptance`,
              time: 'Just now',
              read: false,
              action: 'view'
            },
            ...prev.notifications
          ]
        }));

        setNotifications(prev => [
          {
            id: Date.now(),
            type: 'order',
            title: 'New Delivery Available',
            message: `New order ${newOrderId} is available for acceptance`,
            time: 'Just now',
            read: false,
            action: 'view'
          },
          ...prev
        ]);

        // Play notification sound
        playNotificationSound();
        showToast(`New delivery order ${newOrderId} available!`, 'info');
      }
    }, 30000); // Check every 30 seconds

    return () => clearInterval(orderInterval);
  }, [isOnline]);

  // Update real-time stats
  useEffect(() => {
    const realTimeStats = {
      totalToday: deliveryData.assignedTasks.length + deliveryData.pendingTasks.length,
      inProgress: deliveryData.assignedTasks.filter(task => task.status === 'in-progress').length,
      completed: deliveryData.completedTasks.filter(task => 
        task.deliveryDate === new Date().toISOString().split('T')[0]
      ).length,
      cancelled: deliveryData.cancelledTasks.filter(task =>
        task.cancelledDate === new Date().toISOString().split('T')[0]
      ).length,
      todayEarnings: deliveryData.completedTasks
        .filter(task => task.deliveryDate === new Date().toISOString().split('T')[0])
        .reduce((sum, task) => sum + task.amount, 0),
      pending: deliveryData.pendingTasks.length
    };

    setDeliveryData(prev => ({
      ...prev,
      stats: realTimeStats
    }));
  }, [deliveryData.assignedTasks, deliveryData.pendingTasks, deliveryData.completedTasks, deliveryData.cancelledTasks]);

  // Click outside handler for notifications
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Task Management Functions
  const acceptDelivery = (taskId) => {
    const task = deliveryData.pendingTasks.find(t => t.id === taskId);
    if (task) {
      const acceptedTask = {
        ...task,
        status: 'assigned'
      };

      setDeliveryData(prev => ({
        ...prev,
        pendingTasks: prev.pendingTasks.filter(t => t.id !== taskId),
        assignedTasks: [acceptedTask, ...prev.assignedTasks],
        notifications: [
          {
            id: Date.now(),
            type: 'order',
            title: 'Delivery Accepted',
            message: `You have accepted order ${task.orderId}`,
            time: 'Just now',
            read: false,
            action: 'view'
          },
          ...prev.notifications
        ]
      }));

      setNotifications(prev => [
        {
          id: Date.now(),
          type: 'order',
          title: 'Delivery Accepted',
          message: `You have accepted order ${task.orderId}`,
          time: 'Just now',
          read: false,
          action: 'view'
        },
        ...prev
      ]);

      showToast(`Delivery ${task.orderId} accepted successfully!`, 'success');
      setSelectedTask(null);
    }
  };

  const startDelivery = (taskId) => {
    setDeliveryData(prev => ({
      ...prev,
      assignedTasks: prev.assignedTasks.map(task =>
        task.id === taskId ? { ...task, status: 'in-progress' } : task
      )
    }));
    setSelectedTask(null);
    showToast('Delivery started!', 'success');
  };

  const markDelivered = (taskId) => {
    const task = deliveryData.assignedTasks.find(t => t.id === taskId);
    if (task) {
      const completedTask = {
        ...task,
        status: 'delivered',
        completedTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        rating: Math.floor(Math.random() * 2) + 4,
        deliveryDate: new Date().toISOString().split('T')[0],
        feedback: 'Delivery completed successfully'
      };

      setDeliveryData(prev => ({
        ...prev,
        assignedTasks: prev.assignedTasks.filter(t => t.id !== taskId),
        completedTasks: [completedTask, ...prev.completedTasks],
        notifications: [
          {
            id: Date.now(),
            type: 'order',
            title: 'Delivery Completed',
            message: `Order ${task.orderId} delivered successfully`,
            time: 'Just now',
            read: false,
            action: 'view'
          },
          ...prev.notifications
        ]
      }));

      setNotifications(prev => [
        {
          id: Date.now(),
          type: 'order',
          title: 'Delivery Completed',
          message: `Order ${task.orderId} delivered successfully`,
          time: 'Just now',
          read: false,
          action: 'view'
        },
        ...prev
      ]);

      showToast(`Delivery ${task.orderId} completed!`, 'success');
    }
  };

  const cancelDelivery = (taskId) => {
    let task;
    let sourceArray = 'assignedTasks';
    
    task = deliveryData.assignedTasks.find(t => t.id === taskId);
    if (!task) {
      task = deliveryData.pendingTasks.find(t => t.id === taskId);
      sourceArray = 'pendingTasks';
    }

    if (task) {
      const cancelledTask = {
        ...task,
        status: 'cancelled',
        cancelledTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        reason: 'Delivery cancelled by agent',
        cancelledDate: new Date().toISOString().split('T')[0]
      };

      setDeliveryData(prev => ({
        ...prev,
        [sourceArray]: prev[sourceArray].filter(t => t.id !== taskId),
        cancelledTasks: [cancelledTask, ...prev.cancelledTasks],
        notifications: [
          {
            id: Date.now(),
            type: 'order',
            title: 'Delivery Cancelled',
            message: `Order ${task.orderId} has been cancelled`,
            time: 'Just now',
            read: false,
            action: 'view'
          },
          ...prev.notifications
        ]
      }));

      showToast(`Delivery ${task.orderId} cancelled`, 'warning');
      setSelectedTask(null);
    }
  };

  const getDirections = (task) => {
    const directionsUrl = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(profileData.currentLocation)}&destination=${encodeURIComponent(task.deliveryLocation)}&travelmode=driving`;
    window.open(directionsUrl, '_blank');
  };

  const contactCustomer = (task) => {
    window.open(`tel:${task.customerPhone}`);
  };

  // Notification functions
  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    if (!showNotifications) {
      setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
    }
  };

  const getUnreadCount = () => {
    return notifications.filter(notif => !notif.read).length;
  };

  const handleViewAllNotifications = () => {
    setShowNotifications(false);
    alert('View All Notifications - This would open a full notifications page in a real application');
  };

  // AI Chat functions
  const toggleAIChat = () => {
    setShowAIChat(!showAIChat);
  };

  // Profile Image functions
  const handleProfileImageChange = (newImage) => {
    setProfileData(prev => ({
      ...prev,
      profileImage: newImage
    }));
    showToast('Profile image updated successfully!', 'success');
  };

  // Online status toggle
  const toggleOnlineStatus = () => {
    setIsOnline(!isOnline);
    showToast(
      isOnline ? 'You are now offline' : 'You are now online',
      isOnline ? 'warning' : 'success'
    );
  };

  // Logout handlers
  const handleLogout = () => {
    setShowLogoutConfirm(true);
  };

  const confirmLogout = () => {
    setShowLogoutConfirm(false);
    setTimeout(() => {
      onLogout();
    }, 500);
  };

  const cancelLogout = () => {
    setShowLogoutConfirm(false);
  };

  // Render main content based on active page
  const renderMainContent = () => {
    const commonProps = {
      profileData,
      deliveryData,
      isOnline,
      toggleOnlineStatus,
      showToast,
      setSelectedTask,
      toggleNotifications,
      getUnreadCount,
      toggleAIChat,
      setShowProfileImageUpload,
      handleProfileImageChange
    };

    switch (activePage) {
      case 'dashboard':
        return <Dashboard {...commonProps} />;
      case 'tasks':
        return <DeliveryHistory {...commonProps} />;
      case 'earnings':
        return <Earnings {...commonProps} />;
      case 'performance':
        return <Performance {...commonProps} />;
      case 'profile':
        return <Profile {...commonProps} />;
      default:
        return <Dashboard {...commonProps} />;
    }
  };

  const styles = {
    container: {
      display: 'flex',
      minHeight: '100vh',
      backgroundColor: '#f8fafc',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
    },
    content: {
      flex: 1,
      marginLeft: '280px',
      padding: '0'
    },
    modalOverlay: {
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
    }
  };

  return (
    <div style={styles.container}>
      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <LogoutConfirmation
          onConfirm={confirmLogout}
          onCancel={cancelLogout}
        />
      )}

      {/* AI Chat Board */}
      <AIChatBoard 
        isOpen={showAIChat}
        onClose={() => setShowAIChat(false)}
        user={user}
      />

      {/* Profile Image Upload Modal */}
      {showProfileImageUpload && (
        <div style={styles.modalOverlay}>
          <ProfileImageUpload
            currentImage={profileData.profileImage}
            onImageChange={handleProfileImageChange}
            onCancel={() => setShowProfileImageUpload(false)}
          />
        </div>
      )}

      {/* Sidebar Navigation */}
      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
        profileData={profileData}
        isOnline={isOnline}
        onLogout={handleLogout}
        onToggleAIChat={toggleAIChat}
      />

      <div style={styles.content}>
        {renderMainContent()}
      </div>

      {/* Notifications Panel */}
      <div ref={notificationsRef}>
        <NotificationsPanel
          showNotifications={showNotifications}
          notifications={notifications}
          onClose={toggleNotifications}
          onViewAll={handleViewAllNotifications}
        />
      </div>

      {/* Task Details Modal */}
      {selectedTask && (
        <TaskDetailsModal
          selectedTask={selectedTask}
          onClose={() => setSelectedTask(null)}
          onGetDirections={getDirections}
          onContactCustomer={contactCustomer}
          onStartDelivery={startDelivery}
          onMarkDelivered={markDelivered}
          onCancelDelivery={cancelDelivery}
          onAcceptDelivery={acceptDelivery}
        />
      )}
    </div>
  );
};

export default DeliveryDashboard;