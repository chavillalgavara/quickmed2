import React, { useState, useEffect, useRef } from 'react';
import LiveRouteTracker from './LiveRouteTracker';

const Dashboard = ({ 
  profileData, 
  deliveryData, 
  isOnline: propIsOnline, 
  toggleOnlineStatus, 
  setSelectedTask, 
  toggleNotifications, 
  getUnreadCount, 
  toggleAIChat,
  setActivePage 
}) => {
  const [selectedStat, setSelectedStat] = useState(null);
  const [isOnline, setIsOnline] = useState(false); // Default to offline on login
  const [acceptedOrders, setAcceptedOrders] = useState([]);
  const [completedOrders, setCompletedOrders] = useState([]);
  const [availableOrders, setAvailableOrders] = useState([]);
  const [currentStep, setCurrentStep] = useState('available');
  const [incentives, setIncentives] = useState({
    today: 65,
    weekly: 420,
    monthly: 1800,
    completedDeliveries: 1,
    bonusEligible: true,
    customerTips: 25,
    joiningBonus: 500,
    referralBonus: 200,
    dailyTarget: 300,
    dailyOrdersCompleted: 1,
    dailyTargetAchieved: false
  });
  const audioRef = useRef(null);
  const notificationIntervalRef = useRef(null);

  // Safe function calls
  const safeSetActivePage = (page) => {
    if (typeof setActivePage === 'function') {
      setActivePage(page);
    } else {
      console.warn('setActivePage is not available');
    }
  };

  const safeToggleOnlineStatus = (status) => {
    if (typeof toggleOnlineStatus === 'function') {
      toggleOnlineStatus(status);
    }
  };

  const safeSetSelectedTask = (task) => {
    if (typeof setSelectedTask === 'function') {
      setSelectedTask(task);
    }
  };

  const safeToggleNotifications = () => {
    if (typeof toggleNotifications === 'function') {
      toggleNotifications();
    }
  };

  const safeGetUnreadCount = () => {
    if (typeof getUnreadCount === 'function') {
      return getUnreadCount();
    }
    return 0;
  };

  const safeToggleAIChat = () => {
    if (typeof toggleAIChat === 'function') {
      toggleAIChat();
    }
  };

  // Sync with prop isOnline
  useEffect(() => {
    if (propIsOnline !== undefined) {
      setIsOnline(propIsOnline);
    }
  }, [propIsOnline]);

  const getCurrentGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  const styles = {
    mainContent: {
      padding: '30px',
      minHeight: '100vh',
      backgroundColor: isOnline ? '#f8f9fa' : '#000000',
      background: isOnline ? '#f8f9fa' : 'linear-gradient(135deg, #000000 0%, #1a0f1a 50%, #000000 100%)',
      transition: 'all 0.5s ease'
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: '30px'
    },
    headerActions: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px'
    },
    actionButtons: {
      display: 'flex',
      gap: '8px'
    },
    onlineStatus: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      backgroundColor: isOnline ? 'white' : '#1a0f1a',
      padding: '8px 12px',
      borderRadius: '8px',
      border: isOnline ? '1px solid #e5e7eb' : '1px solid #F7D9EB40',
      color: isOnline ? '#374151' : '#F7D9EB',
      transition: 'all 0.3s ease'
    },
    statusDot: {
      width: '8px',
      height: '8px',
      borderRadius: '50%',
      display: 'inline-block'
    },
    statusText: {
      fontSize: '14px',
      fontWeight: '500',
      color: isOnline ? '#374151' : '#F7D9EB',
      transition: 'color 0.3s ease'
    },
    statusToggle: {
      backgroundColor: isOnline ? '#EF4444' : '#F7D9EB',
      color: isOnline ? 'white' : '#7C2A62',
      border: 'none',
      padding: '6px 12px',
      borderRadius: '6px',
      fontSize: '12px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease'
    },
    aiChatButton: {
      backgroundColor: '#7C2A62',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      padding: '8px 16px',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: '500',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      zIndex: 1000,
      boxShadow: '0 4px 12px rgba(124, 42, 98, 0.3)'
    },
    notificationButton: {
      backgroundColor: isOnline ? 'white' : '#1a0f1a',
      border: isOnline ? '1px solid #e5e7eb' : '1px solid #F7D9EB40',
      borderRadius: '8px',
      padding: '8px 12px',
      cursor: 'pointer',
      fontSize: '16px',
      position: 'relative',
      transition: 'all 0.3s ease',
      color: isOnline ? '#374151' : '#F7D9EB'
    },
    notificationBadge: {
      position: 'absolute',
      top: '-4px',
      right: '-4px',
      backgroundColor: '#EF4444',
      color: 'white',
      borderRadius: '50%',
      width: '16px',
      height: '16px',
      fontSize: '10px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 'bold'
    },
    greeting: {
      fontSize: '28px',
      fontWeight: '700',
      color: isOnline ? '#1f2937' : '#F7D9EB',
      margin: '0 0 8px 0',
      transition: 'color 0.3s ease'
    },
    subtitle: {
      fontSize: '16px',
      color: isOnline ? '#6b7280' : '#F7D9EBB0',
      margin: 0,
      transition: 'color 0.3s ease'
    },
    dateDisplay: {
      fontSize: '14px',
      color: isOnline ? '#6b7280' : '#F7D9EBB0',
      fontWeight: '500',
      transition: 'color 0.3s ease'
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(6, 1fr)',
      gap: '20px',
      marginBottom: '30px'
    },
    statCard: {
      backgroundColor: isOnline ? 'white' : '#1a0f1a',
      padding: '20px',
      borderRadius: '12px',
      boxShadow: isOnline ? '0 2px 4px rgba(0,0,0,0.05)' : '0 4px 15px rgba(247, 217, 235, 0.1)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      border: isOnline ? '2px solid transparent' : '1px solid #F7D9EB20',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      minHeight: '120px'
    },
    statCardActive: {
      borderColor: '#7C2A62',
      boxShadow: '0 4px 12px rgba(124, 42, 98, 0.2)',
      transform: 'translateY(-2px)'
    },
    statIcon: {
      fontSize: '24px',
      marginBottom: '12px',
      width: '50px',
      height: '50px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '12px',
      backgroundColor: isOnline ? '#F7D9EB' : '#F7D9EB20',
      color: isOnline ? '#1f2937' : '#F7D9EB',
      transition: 'all 0.3s ease'
    },
    statContent: {
      textAlign: 'center'
    },
    statNumber: {
      fontSize: '24px',
      fontWeight: '700',
      color: isOnline ? '#1f2937' : '#F7D9EB',
      margin: '0 0 4px 0',
      transition: 'color 0.3s ease'
    },
    statLabel: {
      fontSize: '12px',
      color: isOnline ? '#6b7280' : '#F7D9EBB0',
      margin: 0,
      fontWeight: '500',
      transition: 'color 0.3s ease'
    },
    contentGrid: {
      display: 'grid',
      gridTemplateColumns: '2fr 1fr',
      gap: '30px'
    },
    section: {
      backgroundColor: isOnline ? 'white' : '#1a0f1a',
      borderRadius: '12px',
      padding: '24px',
      boxShadow: isOnline ? '0 2px 4px rgba(0,0,0,0.05)' : '0 4px 15px rgba(247, 217, 235, 0.1)',
      border: isOnline ? '1px solid #e5e7eb' : '1px solid #F7D9EB20',
      transition: 'all 0.3s ease'
    },
    sidebarSection: {
      display: 'flex',
      flexDirection: 'column',
      gap: '20px'
    },
    sectionHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '20px'
    },
    sectionTitle: {
      fontSize: '20px',
      fontWeight: '600',
      color: isOnline ? '#1f2937' : '#F7D9EB',
      margin: 0,
      transition: 'color 0.3s ease'
    },
    viewAll: {
      fontSize: '14px',
      color: '#7C2A62',
      fontWeight: '500',
      cursor: 'pointer'
    },
    tasksList: {
      display: 'flex',
      flexDirection: 'column',
      gap: '16px'
    },
    taskCard: {
      padding: '20px',
      border: isOnline ? '1px solid #e5e7eb' : '1px solid #F7D9EB20',
      borderRadius: '10px',
      transition: 'all 0.3s ease',
      backgroundColor: isOnline ? 'white' : '#1a0f1a'
    },
    taskHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: '12px'
    },
    taskInfo: {
      flex: 1
    },
    orderId: {
      fontSize: '16px',
      fontWeight: '600',
      color: isOnline ? '#1f2937' : '#F7D9EB',
      margin: '0 0 4px 0',
      transition: 'color 0.3s ease'
    },
    customerName: {
      fontSize: '14px',
      color: isOnline ? '#6b7280' : '#F7D9EBB0',
      margin: 0,
      transition: 'color 0.3s ease'
    },
    taskStatus: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
      gap: '4px'
    },
    statusBadge: {
      color: 'white',
      padding: '4px 8px',
      borderRadius: '12px',
      fontSize: '12px',
      fontWeight: '500'
    },
    priorityBadge: {
      fontSize: '12px',
      fontWeight: '500'
    },
    taskDetails: {
      marginBottom: '12px'
    },
    locationRow: {
      display: 'flex',
      alignItems: 'flex-start',
      marginBottom: '8px'
    },
    locationLabel: {
      fontSize: '12px',
      color: isOnline ? '#6b7280' : '#F7D9EBB0',
      fontWeight: '500',
      minWidth: '80px',
      transition: 'color 0.3s ease'
    },
    locationText: {
      fontSize: '14px',
      color: isOnline ? '#1f2937' : '#F7D9EB',
      flex: 1,
      transition: 'color 0.3s ease'
    },
    contactInfo: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      marginTop: '4px'
    },
    contactButton: {
      backgroundColor: 'transparent',
      border: isOnline ? '1px solid #d1d5db' : '1px solid #F7D9EB40',
      padding: '4px 8px',
      borderRadius: '4px',
      fontSize: '12px',
      cursor: 'pointer',
      color: isOnline ? '#374151' : '#F7D9EB',
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
      transition: 'all 0.3s ease'
    },
    taskMeta: {
      display: 'flex',
      gap: '12px',
      marginBottom: '16px'
    },
    metaItem: {
      fontSize: '12px',
      color: isOnline ? '#6b7280' : '#F7D9EBB0',
      fontWeight: '500',
      transition: 'color 0.3s ease'
    },
    taskActions: {
      display: 'flex',
      gap: '8px',
      flexWrap: 'wrap'
    },
    primaryButton: {
      backgroundColor: '#7C2A62',
      color: 'white',
      border: 'none',
      padding: '10px 16px',
      borderRadius: '6px',
      fontSize: '14px',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '6px'
    },
    secondaryButton: {
      backgroundColor: 'transparent',
      color: '#7C2A62',
      border: '1px solid #7C2A62',
      padding: '9px 15px',
      borderRadius: '6px',
      fontSize: '14px',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '6px'
    },
    successButton: {
      backgroundColor: '#10B981',
      color: 'white',
      border: 'none',
      padding: '10px 16px',
      borderRadius: '6px',
      fontSize: '14px',
      fontWeight: '500',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '6px'
    },
    dangerButton: {
      backgroundColor: '#EF4444',
      color: 'white',
      border: 'none',
      padding: '10px 16px',
      borderRadius: '6px',
      fontSize: '14px',
      fontWeight: '500',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '6px'
    },
    acceptButton: {
      backgroundColor: '#3B82F6',
      color: 'white',
      border: 'none',
      padding: '10px 16px',
      borderRadius: '6px',
      fontSize: '14px',
      fontWeight: '500',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '6px'
    },
    directionButton: {
      backgroundColor: '#8B5CF6',
      color: 'white',
      border: 'none',
      padding: '10px 16px',
      borderRadius: '6px',
      fontSize: '14px',
      fontWeight: '500',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '6px'
    },
    offlineMessage: {
      backgroundColor: isOnline ? '#FEF3C7' : '#1a0f1a',
      border: isOnline ? '1px solid #F59E0B' : '1px solid #F7D9EB40',
      borderRadius: '8px',
      padding: '20px',
      textAlign: 'center',
      marginBottom: '20px',
      transition: 'all 0.3s ease',
      boxShadow: isOnline ? 'none' : '0 2px 10px rgba(247, 217, 235, 0.1)'
    },
    offlineText: {
      color: isOnline ? '#92400E' : '#F7D9EB',
      fontSize: '16px',
      fontWeight: '500',
      margin: 0,
      transition: 'color 0.3s ease'
    },
    incentivesSection: {
      backgroundColor: isOnline ? 'white' : '#1a0f1a',
      borderRadius: '12px',
      padding: '24px',
      boxShadow: isOnline ? '0 2px 4px rgba(0,0,0,0.05)' : '0 4px 15px rgba(247, 217, 235, 0.1)',
      border: isOnline ? '1px solid #e5e7eb' : '1px solid #F7D9EB20',
      marginBottom: '20px',
      transition: 'all 0.3s ease'
    },
    incentivesHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '20px'
    },
    incentivesTitle: {
      fontSize: '20px',
      fontWeight: '600',
      color: isOnline ? '#1f2937' : '#F7D9EB',
      margin: 0,
      transition: 'color 0.3s ease'
    },
    incentivesGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '16px'
    },
    incentiveCard: {
      backgroundColor: isOnline ? '#F0F7FF' : '#1a0f1a',
      padding: '16px',
      borderRadius: '8px',
      border: isOnline ? '1px solid #E1E8F0' : '1px solid #F7D9EB20',
      transition: 'all 0.3s ease'
    },
    incentiveAmount: {
      fontSize: '24px',
      fontWeight: '700',
      color: isOnline ? '#1f2937' : '#F7D9EB',
      margin: '0 0 4px 0',
      transition: 'color 0.3s ease'
    },
    incentiveLabel: {
      fontSize: '14px',
      color: isOnline ? '#6b7280' : '#F7D9EBB0',
      margin: 0,
      transition: 'color 0.3s ease'
    },
    bonusBadge: {
      backgroundColor: '#10B981',
      color: 'white',
      padding: '4px 8px',
      borderRadius: '12px',
      fontSize: '12px',
      fontWeight: '500',
      marginTop: '8px',
      display: 'inline-block'
    },
    specialIncentivesSection: {
      background: isOnline 
        ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
        : 'linear-gradient(135deg, #1a0f1a 0%, #2d1a2d 50%, #1a0f1a 100%)',
      borderRadius: '12px',
      padding: '24px',
      marginBottom: '20px',
      color: 'white',
      border: isOnline ? 'none' : '1px solid #F7D9EB40',
      boxShadow: isOnline ? 'none' : '0 4px 20px rgba(247, 217, 235, 0.1)',
      transition: 'all 0.3s ease'
    },
    specialIncentiveCard: {
      backgroundColor: isOnline ? 'rgba(255, 255, 255, 0.1)' : 'rgba(247, 217, 235, 0.1)',
      padding: '16px',
      borderRadius: '8px',
      marginBottom: '12px',
      backdropFilter: 'blur(10px)',
      border: isOnline ? '1px solid rgba(255,255,255,0.2)' : '1px solid rgba(247, 217, 235, 0.3)',
      transition: 'all 0.3s ease'
    },
    specialIncentiveTitle: {
      fontSize: '16px',
      fontWeight: '600',
      margin: '0 0 8px 0',
      color: 'white'
    },
    specialIncentiveDesc: {
      fontSize: '12px',
      margin: 0,
      opacity: 0.9,
      color: 'white'
    },
    targetAchievedMessage: {
      backgroundColor: '#F7D9EB',
      color: '#7C2A62',
      padding: '16px',
      borderRadius: '8px',
      textAlign: 'center',
      marginBottom: '20px',
      fontWeight: '600',
      border: '1px solid #F7D9EB',
      boxShadow: '0 4px 15px rgba(247, 217, 235, 0.3)'
    },
    progressBar: {
      width: '100%',
      height: '8px',
      backgroundColor: isOnline ? '#E5E7EB' : '#2a1a2a',
      borderRadius: '4px',
      overflow: 'hidden',
      marginTop: '8px',
      transition: 'background-color 0.3s ease'
    },
    progressFill: {
      height: '100%',
      backgroundColor: '#10B981',
      transition: 'width 0.3s ease'
    },
    deliveryProgress: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '20px',
      padding: '16px',
      backgroundColor: isOnline ? '#F8FAFC' : '#1a0f1a',
      borderRadius: '8px',
      border: isOnline ? '1px solid #E2E8F0' : '1px solid #F7D9EB20',
      transition: 'all 0.3s ease'
    },
    progressStep: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '8px',
      flex: 1
    },
    progressDot: {
      width: '12px',
      height: '12px',
      borderRadius: '50%',
      backgroundColor: isOnline ? '#CBD5E1' : '#2a1a2a',
      position: 'relative',
      transition: 'background-color 0.3s ease'
    },
    progressDotActive: {
      backgroundColor: '#7C2A62'
    },
    progressDotCompleted: {
      backgroundColor: '#10B981'
    },
    progressLabel: {
      fontSize: '12px',
      color: isOnline ? '#64748B' : '#F7D9EBB0',
      textAlign: 'center',
      transition: 'color 0.3s ease'
    },
    progressLabelActive: {
      color: '#7C2A62',
      fontWeight: '600'
    },
    progressLine: {
      flex: 1,
      height: '2px',
      backgroundColor: isOnline ? '#CBD5E1' : '#2a1a2a',
      margin: '0 8px',
      transition: 'background-color 0.3s ease'
    },
    progressLineActive: {
      backgroundColor: '#7C2A62'
    },
    progressLineCompleted: {
      backgroundColor: '#10B981'
    },
    medicineDetails: {
      backgroundColor: isOnline ? '#F0FDF4' : '#1a2a1a',
      padding: '12px',
      borderRadius: '8px',
      marginBottom: '16px',
      border: isOnline ? '1px solid #BBF7D0' : '1px solid #2a4a2a',
      transition: 'all 0.3s ease'
    },
    medicineTitle: {
      fontSize: '14px',
      fontWeight: '600',
      color: isOnline ? '#065F46' : '#4ade80',
      margin: '0 0 8px 0',
      transition: 'color 0.3s ease'
    },
    medicineList: {
      fontSize: '12px',
      color: isOnline ? '#047857' : '#86efac',
      margin: 0,
      lineHeight: '1.4',
      transition: 'color 0.3s ease'
    },
    goOnlineLargeButton: {
      backgroundColor: '#F7D9EB',
      color: '#7C2A62',
      border: 'none',
      padding: '16px 32px',
      borderRadius: '12px',
      fontSize: '18px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      margin: '20px auto',
      boxShadow: '0 4px 20px rgba(247, 217, 235, 0.3)'
    },
    deliveryHistorySection: {
      backgroundColor: isOnline ? 'white' : '#1a0f1a',
      borderRadius: '12px',
      padding: '24px',
      boxShadow: isOnline ? '0 2px 4px rgba(0,0,0,0.05)' : '0 4px 15px rgba(247, 217, 235, 0.1)',
      border: isOnline ? '1px solid #e5e7eb' : '1px solid #F7D9EB20',
      marginBottom: '20px',
      transition: 'all 0.3s ease'
    },
    historyItem: {
      padding: '16px',
      border: isOnline ? '1px solid #e5e7eb' : '1px solid #F7D9EB20',
      borderRadius: '8px',
      marginBottom: '12px',
      backgroundColor: isOnline ? '#f8f9fa' : '#1a0f1a',
      transition: 'all 0.3s ease'
    },
    historyOrderId: {
      fontSize: '14px',
      fontWeight: '600',
      color: isOnline ? '#1f2937' : '#F7D9EB',
      margin: '0 0 4px 0'
    },
    historyDetails: {
      fontSize: '12px',
      color: isOnline ? '#6b7280' : '#F7D9EBB0',
      margin: '0 0 4px 0'
    },
    historyTime: {
      fontSize: '11px',
      color: isOnline ? '#9ca3af' : '#F7D9EB80',
      margin: 0
    }
  };

  // Check for daily target achievement
  useEffect(() => {
    if (completedOrders.length >= 12 && !incentives.dailyTargetAchieved) {
      setIncentives(prev => ({
        ...prev,
        dailyTargetAchieved: true,
        today: prev.today + prev.dailyTarget
      }));
    }
  }, [completedOrders.length, incentives.dailyTargetAchieved]);

  // Initialize available orders with pharmacy details
  useEffect(() => {
    const initialOrders = [
      {
        id: 'ORD001',
        orderId: 'MED001',
        customerName: 'Rajesh Kumar',
        customerPhone: '+91 98765 43210',
        pharmacyName: 'Apollo Pharmacy',
        pharmacyPhone: '+91 98765 43211',
        pharmacyLocation: 'Apollo Pharmacy, Sector 18, Noida',
        deliveryLocation: 'H-Block, Sector 62, Noida',
        estimatedTime: '25 mins',
        distance: '3.2 km',
        amount: 45,
        tip: 10,
        status: 'pending',
        priority: 'High',
        instructions: 'Handle with care. Keep medicines in original packaging.'
      }
    ];
    setAvailableOrders(initialOrders);
  }, []);

  // Simulate new pharmacy orders coming in real-time ONLY when no active orders AND no available orders
  useEffect(() => {
    if (!isOnline || acceptedOrders.length > 0 || availableOrders.length > 0 || incentives.dailyTargetAchieved) return;

    const orderInterval = setInterval(() => {
      setAvailableOrders(prev => {
        if (prev.length >= 1) return prev; // Only allow one order at a time
        
        const pharmacies = [
          { name: 'Apollo Pharmacy', phone: '+91 98765 43211' },
          { name: 'MedPlus Pharmacy', phone: '+91 98765 43213' },
          { name: 'Fortis Pharmacy', phone: '+91 98765 43215' },
          { name: 'Max Healthcare Pharmacy', phone: '+91 98765 43217' }
        ];
        
        const pharmacy = pharmacies[Math.floor(Math.random() * pharmacies.length)];
        const tipAmount = Math.random() > 0.3 ? Math.floor(Math.random() * 30) + 5 : 0;
        const newOrder = {
          id: `ORD${Date.now()}`,
          orderId: `MED${Date.now().toString().slice(-4)}`,
          customerName: ['Amit Sharma', 'Neha Gupta', 'Rohit Verma', 'Sneha Patel'][Math.floor(Math.random() * 4)],
          customerPhone: `+91 9${Math.floor(10000000 + Math.random() * 90000000)}`,
          pharmacyName: pharmacy.name,
          pharmacyPhone: pharmacy.phone,
          pharmacyLocation: `${pharmacy.name}, Sector ${15 + Math.floor(Math.random() * 10)}, Noida`,
          deliveryLocation: `Sector ${30 + Math.floor(Math.random() * 50)}, Noida`,
          estimatedTime: `${20 + Math.floor(Math.random() * 20)} mins`,
          distance: `${(2 + Math.random() * 4).toFixed(1)} km`,
          amount: 30 + Math.floor(Math.random() * 50),
          tip: tipAmount,
          status: 'pending',
          priority: ['Low', 'Medium', 'High'][Math.floor(Math.random() * 3)],
          instructions: 'Handle with care. Keep medicines in original packaging.'
        };
        
        return [newOrder]; // Only return one order
      });
    }, 30000); // Check every 30 seconds for new orders

    return () => clearInterval(orderInterval);
  }, [isOnline, acceptedOrders.length, availableOrders.length, incentives.dailyTargetAchieved]);

  // Notification sound system - only when online and has available orders but no active orders
  useEffect(() => {
    if (isOnline && availableOrders.length > 0 && acceptedOrders.length === 0 && !incentives.dailyTargetAchieved) {
      notificationIntervalRef.current = setInterval(() => {
        if (audioRef.current) {
          audioRef.current.play().catch(e => console.log('Audio play failed:', e));
        }
      }, 5000);

      return () => {
        if (notificationIntervalRef.current) {
          clearInterval(notificationIntervalRef.current);
        }
      };
    } else {
      if (notificationIntervalRef.current) {
        clearInterval(notificationIntervalRef.current);
      }
    }
  }, [isOnline, availableOrders.length, acceptedOrders.length, incentives.dailyTargetAchieved]);

  const formatIndianCurrency = (amount) => {
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  const getDisplayName = () => {
    return profileData?.fullName?.split(' ')[0] || 'User';
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return '#EF4444';
      case 'Medium': return '#F59E0B';
      case 'Low': return '#10B981';
      default: return '#6B7280';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return '#F59E0B';
      case 'assigned': return '#F59E0B';
      case 'pickup_reached': return '#3B82F6';
      case 'pickup_completed': return '#8B5CF6';
      case 'delivery_reached': return '#F59E0B';
      case 'delivery_completed': return '#10B981';
      case 'cancelled': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const handleViewAllTasks = () => {
    safeSetActivePage('delivery-history');
  };

  const handleStatClick = (statKey) => {
    if (selectedStat === statKey) {
      setSelectedStat(null);
    } else {
      setSelectedStat(statKey);
    }
  };

  const handleToggleOnline = () => {
    const newOnlineStatus = !isOnline;
    setIsOnline(newOnlineStatus);
    
    if (newOnlineStatus) {
      setSelectedStat(null);
      setCurrentStep('available');
    } else {
      // When going offline, clear accepted orders but keep completed orders for history
      setAcceptedOrders([]);
      setCurrentStep('available');
    }
    
    safeToggleOnlineStatus(newOnlineStatus);
  };

  const handleAcceptOrder = (order) => {
    if (notificationIntervalRef.current) {
      clearInterval(notificationIntervalRef.current);
    }

    const acceptedOrder = {
      ...order,
      status: 'assigned',
      acceptedAt: new Date()
    };

    setAcceptedOrders([acceptedOrder]);
    setAvailableOrders([]); // Clear available orders when accepting
    setCurrentStep('accepted');
    
    setIncentives(prev => ({
      ...prev,
      today: prev.today + order.amount
    }));
  };

  const handleReachedPharmacy = (order) => {
    setAcceptedOrders(prev => 
      prev.map(o => 
        o.id === order.id ? { ...o, status: 'pickup_reached', pharmacyReachedAt: new Date() } : o
      )
    );
    setCurrentStep('pickup_reached');
  };

  const handlePickupCompleted = (order) => {
    setAcceptedOrders(prev => 
      prev.map(o => 
        o.id === order.id ? { ...o, status: 'pickup_completed', pickupCompletedAt: new Date() } : o
      )
    );
    setCurrentStep('pickup_completed');
  };

  const handleReachedCustomer = (order) => {
    setAcceptedOrders(prev => 
      prev.map(o => 
        o.id === order.id ? { ...o, status: 'delivery_reached', customerReachedAt: new Date() } : o
      )
    );
    setCurrentStep('delivery_reached');
  };

  const handleDeliveryCompleted = (order) => {
    const deliveredOrder = {
      ...order,
      status: 'delivery_completed',
      deliveredAt: new Date(),
      deliveryDate: new Date().toISOString().split('T')[0],
      completedTime: new Date().toLocaleTimeString(),
      rating: Math.floor(Math.random() * 2) + 4, // Random rating 4-5
      feedback: Math.random() > 0.5 ? 'Great service! Very professional and on time.' : 'Excellent delivery service!'
    };

    setCompletedOrders(prev => [...prev, deliveredOrder]);
    setAcceptedOrders([]);
    setCurrentStep('available');
    
    setIncentives(prev => ({
      ...prev,
      completedDeliveries: prev.completedDeliveries + 1,
      dailyOrdersCompleted: prev.dailyOrdersCompleted + 1,
      weekly: prev.weekly + order.amount,
      monthly: prev.monthly + order.amount,
      today: prev.today + order.amount + (order.tip || 0),
      customerTips: prev.customerTips + (order.tip || 0)
    }));

    // Auto-navigate to delivery history after 2 seconds
    setTimeout(() => {
      safeSetActivePage('delivery-history');
    }, 2000);
  };

  const handleCancelOrder = (order) => {
    setAcceptedOrders(prev => prev.filter(o => o.id !== order.id));
    setAvailableOrders(prev => [...prev, { ...order, status: 'pending' }]);
    setCurrentStep('available');
  };

  const handleCallPharmacy = (phoneNumber) => {
    window.open(`tel:${phoneNumber}`, '_self');
  };

  const handleCallCustomer = (phoneNumber) => {
    window.open(`tel:${phoneNumber}`, '_self');
  };

  const handleGetDirections = (location) => {
    const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(location)}`;
    window.open(mapsUrl, '_blank');
  };

  // Safe function to get medicines array
  const getMedicines = (task) => {
    return task?.medicines || [];
  };

  const getProgressSteps = () => {
    const steps = [
      { label: 'Order Accepted', key: 'accepted' },
      { label: 'Reached Pharmacy', key: 'pickup_reached' },
      { label: 'Pickup Completed', key: 'pickup_completed' },
      { label: 'Reached Customer', key: 'delivery_reached' },
      { label: 'Delivery Completed', key: 'delivery_completed' }
    ];

    const currentIndex = steps.findIndex(step => step.key === currentStep);
    
    return steps.map((step, index) => {
      const isCompleted = index < currentIndex;
      const isActive = step.key === currentStep;
      
      return (
        <React.Fragment key={step.key}>
          {index > 0 && (
            <div 
              style={{
                ...styles.progressLine,
                ...(isCompleted && styles.progressLineCompleted),
                ...(index <= currentIndex && styles.progressLineActive)
              }}
            />
          )}
          <div style={styles.progressStep}>
            <div 
              style={{
                ...styles.progressDot,
                ...(isActive && styles.progressDotActive),
                ...(isCompleted && styles.progressDotCompleted)
              }}
            />
            <div 
              style={{
                ...styles.progressLabel,
                ...(isActive && styles.progressLabelActive)
              }}
            >
              {step.label}
            </div>
          </div>
        </React.Fragment>
      );
    });
  };

  // If offline or target achieved, show special offline dashboard with black background
  if (!isOnline || incentives.dailyTargetAchieved) {
    return (
      <div style={styles.mainContent}>
        <audio ref={audioRef} src="/Audio.mp4" preload="auto" />
        
        <div style={styles.header}>
          <div>
            <h1 style={styles.greeting}>{getCurrentGreeting()}, {getDisplayName()}</h1>
            <p style={styles.subtitle}>{incentives.dailyTargetAchieved ? '🎉 Daily Target Achieved! You earned ₹300 bonus' : 'Ready to start delivering?'}</p>
          </div>
          <div style={styles.headerActions}>
            <div style={styles.onlineStatus}>
              <span style={{
                ...styles.statusDot,
                backgroundColor: '#F7D9EB'
              }}></span>
              <span style={styles.statusText}>Offline</span>
              {!incentives.dailyTargetAchieved && (
                <button
                  style={styles.statusToggle}
                  onClick={handleToggleOnline}
                >
                  Go Online
                </button>
              )}
            </div>
            <div style={styles.dateDisplay}>
              {new Date().toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>
          </div>
        </div>

        {incentives.dailyTargetAchieved && (
          <div style={styles.targetAchievedMessage}>
            🎉 Daily Target Achieved! You earned ₹300 bonus
          </div>
        )}     
        
        {/* Special Incentives Section */}
        <div style={styles.specialIncentivesSection}>
          <h2 style={{...styles.sectionTitle, color: '#F7D9EB', marginBottom: '20px'}}>
            Special Incentives & Offers
          </h2>
          
          <div style={styles.specialIncentiveCard}>
            <h3 style={styles.specialIncentiveTitle}>🎯 Daily Target Bonus</h3>
            <p style={styles.specialIncentiveDesc}>Complete 12 orders daily to earn ₹300 bonus</p>
            <div style={styles.progressBar}>
              <div style={{
                ...styles.progressFill,
                width: `${(incentives.dailyOrdersCompleted / 12) * 100}%`
              }}></div>
            </div>
            <p style={{...styles.specialIncentiveDesc, marginTop: '8px'}}>
              {incentives.dailyTargetAchieved 
                ? '🎉 Daily Target Achieved! You earned ₹300 bonus'
                : `Complete ${12 - incentives.dailyOrdersCompleted} more orders to reach daily target`
              }
            </p>
          </div>

          <div style={styles.specialIncentiveCard}>
            <h3 style={styles.specialIncentiveTitle}>👥 Referral Bonus</h3>
            <p style={styles.specialIncentiveDesc}>Refer friends and earn ₹200 per referral</p>
            <p style={{...styles.specialIncentiveDesc, marginTop: '8px', fontWeight: '600'}}>
              Available: {formatIndianCurrency(incentives.referralBonus)}
            </p>
          </div>

          <div style={styles.specialIncentiveCard}>
            <h3 style={styles.specialIncentiveTitle}>🎁 Joining Bonus</h3>
            <p style={styles.specialIncentiveDesc}>Welcome! Complete your first 5 orders to get ₹500</p>
            <p style={{...styles.specialIncentiveDesc, marginTop: '8px', fontWeight: '600'}}>
              Available: {formatIndianCurrency(incentives.joiningBonus)}
            </p>
          </div>

          <div style={styles.specialIncentiveCard}>
            <h3 style={styles.specialIncentiveTitle}>💝 Customer Tips</h3>
            <p style={styles.specialIncentiveDesc}>Customers can tip you for excellent service</p>
            <p style={{...styles.specialIncentiveDesc, marginTop: '8px', fontWeight: '600'}}>
              Earned: {formatIndianCurrency(incentives.customerTips)}
            </p>
          </div>

          {!incentives.dailyTargetAchieved && (
            <button
              style={styles.goOnlineLargeButton}
              onClick={handleToggleOnline}
            >
              Go Online
            </button>
          )}
        </div>
      </div>
    );
  }

  // Online mode - show full dashboard with light background
  return (
    <div style={styles.mainContent}>
      <div style={styles.header}>
        <div>
          <h1 style={styles.greeting}>{getCurrentGreeting()}, {getDisplayName()}</h1>
          <p style={styles.subtitle}>Here's your delivery overview for today</p>
        </div>
        <div style={styles.headerActions}>
          <div style={styles.onlineStatus}>
            <span style={{
              ...styles.statusDot,
              backgroundColor: '#10B981'
            }}></span>
            <span style={styles.statusText}>Online</span>
            <button
              style={styles.statusToggle}
              onClick={handleToggleOnline}
            >
              Go Offline
            </button>
          </div>
          <div style={styles.dateDisplay}>
            {new Date().toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </div>
          <div style={styles.actionButtons}>
            <button
              style={styles.notificationButton}
              onClick={safeToggleNotifications}
            >
              🔔
              {safeGetUnreadCount() > 0 && (
                <span style={styles.notificationBadge}>{safeGetUnreadCount()}</span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Incentives Section */}
      <div style={styles.incentivesSection}>
        <div style={styles.incentivesHeader}>
          <h2 style={styles.incentivesTitle}>Your Earnings & Incentives</h2>
        </div>
        <div style={styles.incentivesGrid}>
          <div style={styles.incentiveCard}>
            <h3 style={styles.incentiveAmount}>{formatIndianCurrency(incentives.today)}</h3>
            <p style={styles.incentiveLabel}>Today's Earnings</p>
            {incentives.customerTips > 0 && (
              <p style={{...styles.incentiveLabel, fontSize: '12px', marginTop: '4px'}}>
                Includes {formatIndianCurrency(incentives.customerTips)} tips
              </p>
            )}
          </div>
          <div style={styles.incentiveCard}>
            <h3 style={styles.incentiveAmount}>{formatIndianCurrency(incentives.weekly)}</h3>
            <p style={styles.incentiveLabel}>This Week</p>
          </div>
          <div style={styles.incentiveCard}>
            <h3 style={styles.incentiveAmount}>{formatIndianCurrency(incentives.monthly)}</h3>
            <p style={styles.incentiveLabel}>This Month</p>
          </div>
          <div style={styles.incentiveCard}>
            <h3 style={styles.incentiveAmount}>{incentives.completedDeliveries}</h3>
            <p style={styles.incentiveLabel}>Completed Deliveries</p>
            {incentives.bonusEligible && (
              <span style={styles.bonusBadge}>Bonus Eligible</span>
            )}
          </div>
        </div>
      </div>

      {/* Real-time Stats Grid */}
      <div style={styles.statsGrid}>
        <div 
          style={{
            ...styles.statCard,
            ...(selectedStat === 'totalToday' && styles.statCardActive)
          }}
          onClick={() => handleStatClick('totalToday')}
        >
          <div style={{ ...styles.statIcon, backgroundColor: '#F7D9EB' }}>📦</div>
          <div style={styles.statContent}>
            <h3 style={styles.statNumber}>{completedOrders.length + acceptedOrders.length}</h3>
            <p style={styles.statLabel}>Total Deliveries Today</p>
          </div>
        </div>

        <div 
          style={{
            ...styles.statCard,
            ...(selectedStat === 'pending' && styles.statCardActive)
          }}
          onClick={() => handleStatClick('pending')}
        >
          <div style={{ ...styles.statIcon, backgroundColor: '#E8F4FD' }}>⏳</div>
          <div style={styles.statContent}>
            <h3 style={styles.statNumber}>{availableOrders.length}</h3>
            <p style={styles.statLabel}>Pending Acceptance</p>
          </div>
        </div>

        <div 
          style={{
            ...styles.statCard,
            ...(selectedStat === 'inProgress' && styles.statCardActive)
          }}
          onClick={() => handleStatClick('inProgress')}
        >
          <div style={{ ...styles.statIcon, backgroundColor: '#E8F4FD' }}>🚚</div>
          <div style={styles.statContent}>
            <h3 style={styles.statNumber}>{acceptedOrders.filter(o => o.status !== 'assigned').length}</h3>
            <p style={styles.statLabel}>In Progress</p>
          </div>
        </div>

        <div 
          style={{
            ...styles.statCard,
            ...(selectedStat === 'completed' && styles.statCardActive)
          }}
          onClick={() => handleStatClick('completed')}
        >
          <div style={{ ...styles.statIcon, backgroundColor: '#F0F7E8' }}>✅</div>
          <div style={styles.statContent}>
            <h3 style={styles.statNumber}>{completedOrders.length}</h3>
            <p style={styles.statLabel}>Delivered</p>
          </div>
        </div>

        <div 
          style={{
            ...styles.statCard,
            ...(selectedStat === 'todayEarnings' && styles.statCardActive)
          }}
          onClick={() => handleStatClick('todayEarnings')}
        >
          <div style={{ ...styles.statIcon, backgroundColor: '#FFF7ED' }}>💰</div>
          <div style={styles.statContent}>
            <h3 style={styles.statNumber}>{formatIndianCurrency(incentives.today)}</h3>
            <p style={styles.statLabel}>Today's Earnings</p>
          </div>
        </div>

        <div 
          style={{
            ...styles.statCard,
            ...(selectedStat === 'cancelled' && styles.statCardActive)
          }}
          onClick={() => handleStatClick('cancelled')}
        >
          <div style={{ ...styles.statIcon, backgroundColor: '#FEE2E2' }}>❌</div>
          <div style={styles.statContent}>
            <h3 style={styles.statNumber}>0</h3>
            <p style={styles.statLabel}>Cancelled Orders</p>
          </div>
        </div>
      </div>

      <div style={styles.contentGrid}>
        <div style={styles.section}>
          <div style={styles.sectionHeader}>
            <h2 style={styles.sectionTitle}>
              {acceptedOrders.length > 0 ? 'Current Deliveries' : 'Available Deliveries'}
            </h2>
            {isOnline && completedOrders.length > 0 && (
              <span
                style={styles.viewAll}
                onClick={handleViewAllTasks}
              >
                View History
              </span>
            )}
          </div>

          {/* Delivery Progress Tracker */}
          {acceptedOrders.length > 0 && (
            <div style={styles.deliveryProgress}>
              {getProgressSteps()}
            </div>
          )}

          <div style={styles.tasksList}>
            {acceptedOrders.length > 0 ? (
              // Show accepted/current delivery with pharmacy details
              acceptedOrders.map(task => (
                <div key={task.id} style={styles.taskCard}>
                  {/* Medicine Details */}
                  <div style={styles.medicineDetails}>
                    <h4 style={styles.medicineTitle}>📦 Medicine Details</h4>
                    <ul style={styles.medicineList}>
                      {getMedicines(task).map((medicine, index) => (
                        <li key={index}>• {medicine}</li>
                      ))}
                    </ul>
                    <p style={{...styles.medicineList, marginTop: '8px', fontStyle: 'italic'}}>
                      📝 {task.instructions}
                    </p>
                  </div>

                  <div style={styles.taskHeader}>
                    <div style={styles.taskInfo}>
                      <h4 style={styles.orderId}>{task.orderId}</h4>
                      <p style={styles.customerName}>{task.customerName}</p>
                    </div>
                    <div style={styles.taskStatus}>
                      <span style={{
                        ...styles.statusBadge,
                        backgroundColor: getStatusColor(task.status)
                      }}>
                        {task.status.replace('_', ' ').toUpperCase()}
                      </span>
                      <span style={{
                        ...styles.priorityBadge,
                        color: getPriorityColor(task.priority)
                      }}>
                        {task.priority}
                      </span>
                    </div>
                  </div>

                  <div style={styles.taskDetails}>
                    {/* Pharmacy Location */}
                    <div style={styles.locationRow}>
                      <span style={styles.locationLabel}>🏥 Pharmacy:</span>
                      <span style={styles.locationText}>
                        {task.pharmacyLocation}
                        <div style={styles.contactInfo}>
                          <button
                            style={styles.contactButton}
                            onClick={() => handleCallPharmacy(task.pharmacyPhone)}
                          >
                            📞 {task.pharmacyPhone}
                          </button>
                          <button
                            style={styles.directionButton}
                            onClick={() => handleGetDirections(task.pharmacyLocation)}
                          >
                            🗺️ Get Directions
                          </button>
                        </div>
                      </span>
                    </div>

                    {/* Delivery Location */}
                    <div style={styles.locationRow}>
                      <span style={styles.locationLabel}>🏠 Delivery:</span>
                      <span style={styles.locationText}>
                        {task.deliveryLocation}
                        <div style={styles.contactInfo}>
                          <button
                            style={styles.contactButton}
                            onClick={() => handleCallCustomer(task.customerPhone)}
                          >
                            📞 {task.customerPhone}
                          </button>
                          <button
                            style={styles.directionButton}
                            onClick={() => handleGetDirections(task.deliveryLocation)}
                          >
                            🗺️ Get Directions
                          </button>
                        </div>
                      </span>
                    </div>
                  </div>

                  <div style={styles.taskMeta}>
                    <span style={styles.metaItem}>🕒 {task.estimatedTime}</span>
                    <span style={styles.metaItem}>📏 {task.distance}</span>
                    <span style={styles.metaItem}>💰 {formatIndianCurrency(task.amount)}</span>
                    {task.tip > 0 && (
                      <span style={{...styles.metaItem, color: '#10B981', fontWeight: '600'}}>
                        💝 Tip: {formatIndianCurrency(task.tip)}
                      </span>
                    )}
                  </div>

                  <div style={styles.taskActions}>
                    {/* Step-based actions */}
                    {task.status === 'assigned' && (
                      <>
                        <button
                          style={styles.primaryButton}
                          onClick={() => handleReachedPharmacy(task)}
                        >
                          🏥 I've Reached Pharmacy
                        </button>
                        <button
                          style={styles.directionButton}
                          onClick={() => handleGetDirections(task.pharmacyLocation)}
                        >
                          🗺️ Directions to Pharmacy
                        </button>
                      </>
                    )}

                    {task.status === 'pickup_reached' && (
                      <button
                        style={styles.successButton}
                        onClick={() => handlePickupCompleted(task)}
                      >
                        ✅ Pickup Completed
                      </button>
                    )}

                    {task.status === 'pickup_completed' && (
                      <button
                        style={styles.primaryButton}
                        onClick={() => handleReachedCustomer(task)}
                      >
                        🏠 I've Reached Customer
                      </button>
                    )}

                    {task.status === 'delivery_reached' && (
                      <button
                        style={styles.successButton}
                        onClick={() => handleDeliveryCompleted(task)}
                      >
                        ✅ Mark Delivery Completed
                      </button>
                    )}

                    {/* Cancel button available in all states */}
                    <button
                      style={styles.dangerButton}
                      onClick={() => handleCancelOrder(task)}
                    >
                      ❌ Cancel
                    </button>

                    <button
                      style={styles.secondaryButton}
                      onClick={() => safeSetSelectedTask({
                        ...task,
                        medicines: getMedicines(task)
                      })}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))
            ) : (
              // Show available deliveries (only one at a time)
              availableOrders.map(task => (
                <div key={task.id} style={styles.taskCard}>
                  {/* Medicine Details */}
                  <div style={styles.medicineDetails}>
                    <h4 style={styles.medicineTitle}>📦 Medicine Details</h4>
                    <ul style={styles.medicineList}>
                      {getMedicines(task).map((medicine, index) => (
                        <li key={index}>• {medicine}</li>
                      ))}
                    </ul>
                  </div>

                  <div style={styles.taskHeader}>
                    <div style={styles.taskInfo}>
                      <h4 style={styles.orderId}>{task.orderId}</h4>
                      <p style={styles.customerName}>{task.customerName}</p>
                    </div>
                    <div style={styles.taskStatus}>
                      <span style={{
                        ...styles.statusBadge,
                        backgroundColor: getStatusColor(task.status)
                      }}>
                        {task.status}
                      </span>
                      <span style={{
                        ...styles.priorityBadge,
                        color: getPriorityColor(task.priority)
                      }}>
                        {task.priority}
                      </span>
                    </div>
                  </div>

                  <div style={styles.taskDetails}>
                    <div style={styles.locationRow}>
                      <span style={styles.locationLabel}>🏥 Pharmacy:</span>
                      <span style={styles.locationText}>{task.pharmacyLocation}</span>
                    </div>
                    <div style={styles.locationRow}>
                      <span style={styles.locationLabel}>🏠 Delivery:</span>
                      <span style={styles.locationText}>{task.deliveryLocation}</span>
                    </div>
                  </div>

                  <div style={styles.taskMeta}>
                    <span style={styles.metaItem}>🕒 {task.estimatedTime}</span>
                    <span style={styles.metaItem}>📏 {task.distance}</span>
                    <span style={styles.metaItem}>💰 {formatIndianCurrency(task.amount)}</span>
                    {task.tip > 0 && (
                      <span style={{...styles.metaItem, color: '#10B981', fontWeight: '600'}}>
                        💝 Potential Tip: {formatIndianCurrency(task.tip)}
                      </span>
                    )}
                  </div>

                  <div style={styles.taskActions}>
                    <button
                      style={styles.acceptButton}
                      onClick={() => handleAcceptOrder(task)}
                    >
                      ✅ Accept Delivery
                    </button>
                    <button
                      style={styles.secondaryButton}
                      onClick={() => safeSetSelectedTask({
                        ...task,
                        medicines: getMedicines(task)
                      })}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div style={styles.sidebarSection}>
          {/* Live Route Tracker - Always active when online and has current order */}
          {isOnline && acceptedOrders.length > 0 && (
            <LiveRouteTracker 
              deliveryData={deliveryData} 
              isOnline={isOnline} 
              currentOrder={acceptedOrders[0]}
              currentStep={currentStep}
            />
          )}

          {/* Live Route Tracker - Show even when no active orders but online */}
          {isOnline && acceptedOrders.length === 0 && (
            <LiveRouteTracker 
              deliveryData={deliveryData} 
              isOnline={isOnline} 
              currentOrder={null}
              currentStep={currentStep}
            />
          )}

          {/* Delivery History Section - Always show when there are completed orders */}
          {completedOrders.length > 0 && (
            <div style={styles.deliveryHistorySection}>
              <div style={styles.sectionHeader}>
                <h2 style={styles.sectionTitle}>Recent Deliveries</h2>
                <span
                  style={styles.viewAll}
                  onClick={handleViewAllTasks}
                >
                  View All
                </span>
              </div>
              <div style={styles.tasksList}>
                {completedOrders.slice(-3).reverse().map((order, index) => (
                  <div key={order.id} style={styles.historyItem}>
                    <h4 style={styles.historyOrderId}>{order.orderId}</h4>
                    <p style={styles.historyDetails}>
                      {order.customerName} • {formatIndianCurrency(order.amount)}
                      {order.tip > 0 && ` + ${formatIndianCurrency(order.tip)} tip`}
                    </p>
                    <p style={styles.historyTime}>
                      Delivered: {order.deliveredAt?.toLocaleTimeString() || 'Just now'}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* AI Chat Button - Fixed at bottom right */}
      <button
        style={styles.aiChatButton}
        onClick={safeToggleAIChat}
        title="AI Assistant"
      >
        💬
      </button>
    </div>
  );
};

// Add default props to prevent errors
Dashboard.defaultProps = {
  profileData: {},
  deliveryData: {},
  isOnline: false,
  toggleOnlineStatus: () => {},
  setSelectedTask: () => {},
  toggleNotifications: () => {},
  getUnreadCount: () => 0,
  toggleAIChat: () => {},
  setActivePage: () => {}
};

export default Dashboard;