import React, { useState, useEffect, useCallback } from 'react';
import VendorModals from './VendorModals';
import VendorSidebar from './VendorSidebar';
import VendorStockManagement from './VendorStockManagement';
import VendorOrdersManagement from './VendorOrdersManagement';
import VendorPrescriptionVerification from './VendorPrescriptionVerification';
import VendorAnalytics from './VendorAnalytics';
import VendorProfile from './VendorProfile';
import { initialData, user as defaultUser, navigationItems, stockFilters, getOrderTabs } from './VendorData';

const VendorDashboard = ({ user = defaultUser, onLogout }) => {
  const [activePage, setActivePage] = useState('stock');
  const [stockFilter, setStockFilter] = useState('all');
  const [orderFilter, setOrderFilter] = useState('pending');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedPrescription, setSelectedPrescription] = useState(null);
  const [analyticsPeriod, setAnalyticsPeriod] = useState('week');
  
  // State for real-time features
  const [stock, setStock] = useState([]);
  const [orders, setOrders] = useState({ pending: [], ready: [], picked: [], cancelled: [] });
  const [prescriptions, setPrescriptions] = useState([]);
  const [showAddMedicineModal, setShowAddMedicineModal] = useState(false);
  const [editingMedicine, setEditingMedicine] = useState(null);
  const [showEditStockModal, setShowEditStockModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showNotificationsModal, setShowNotificationsModal] = useState(false);
  const [showNotificationsBellModal, setShowNotificationsBellModal] = useState(false);
  const [showChatModal, setShowChatModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  
  // Search state
  const [searchTerm, setSearchTerm] = useState('');
  
  // Chat state
  const [chatMessages, setChatMessages] = useState([
    { id: 1, text: 'Hello! How can I help you today?', isUser: false }
  ]);
  const [newMessage, setNewMessage] = useState('');

  const [newMedicine, setNewMedicine] = useState({
    name: '',
    category: '',
    quantity: '',
    minStock: '',
    price: '',
    expiryDate: '',
    prescriptionRequired: false,
    supplier: '',
    batchNo: ''
  });

  // User profile state
  const [userProfile, setUserProfile] = useState({
    fullName: 'Rajesh Kumar',
    email: 'rajesh.pharmacy@gmail.com',
    phone: '9876543210',
    pharmacyName: 'City Medical Store',
    licenseNumber: 'PHARM-UP-2024-789',
    gstNumber: '07AABCU9603R1ZM',
    address: 'Shop No. 15, Medical Complex, Sector 15',
    city: 'Noida',
    state: 'Uttar Pradesh',
    pincode: '201301',
    openingTime: '08:00 AM',
    closingTime: '10:00 PM'
  });

  // Form validation errors
  const [formErrors, setFormErrors] = useState({});

  // Notification settings state
  const [notificationSettings, setNotificationSettings] = useState({
    newOrders: true,
    lowStock: true,
    expiringMedicines: true,
    prescriptionVerification: true,
    orderReady: true,
    soundEnabled: true,
    pushNotifications: true,
    emailNotifications: false,
    smsNotifications: true
  });

  // Notifications state
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'order',
      title: 'New Order Received',
      message: 'Order ORD-001 from Priya Sharma',
      time: '2 mins ago',
      read: false
    },
    {
      id: 2,
      type: 'prescription',
      title: 'Prescription Uploaded',
      message: 'New prescription from Amit Kumar needs verification',
      time: '5 mins ago',
      read: false
    },
    {
      id: 3,
      type: 'stock',
      title: 'Low Stock Alert',
      message: 'Paracetamol 500mg is running low',
      time: '1 hour ago',
      read: false
    }
  ]);

  // Form validation functions
  const validateField = (fieldName, value) => {
    let error = '';
    
    switch (fieldName) {
      case 'phone':
        const phoneRegex = /^(\+91[\-\s]?)?[0]?(91)?[6789]\d{9}$/;
        if (!value.trim()) {
          error = 'Phone number is required';
        } else if (!phoneRegex.test(value.replace(/\s/g, ''))) {
          error = 'Please enter a valid Indian phone number';
        }
        break;
        
      case 'pharmacyName':
        if (!value.trim()) {
          error = 'Pharmacy name is required';
        } else if (value.length < 2) {
          error = 'Pharmacy name must be at least 2 characters long';
        }
        break;
        
      case 'licenseNumber':
        if (!value.trim()) {
          error = 'License number is required';
        } else if (value.length < 5) {
          error = 'License number must be at least 5 characters long';
        }
        break;

      case 'gstNumber':
        const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
        if (!value.trim()) {
          error = 'GST number is required';
        } else if (!gstRegex.test(value)) {
          error = 'Please enter a valid GST number';
        }
        break;
        
      case 'address':
        if (!value.trim()) {
          error = 'Address is required';
        } else if (value.length < 10) {
          error = 'Address must be at least 10 characters long';
        }
        break;
        
      case 'city':
        const cityRegex = /^[A-Za-z\s]+$/;
        if (!value.trim()) {
          error = 'City is required';
        } else if (!cityRegex.test(value)) {
          error = 'City should contain only letters and spaces';
        }
        break;
        
      case 'state':
        const stateRegex = /^[A-Za-z\s]+$/;
        if (!value.trim()) {
          error = 'State is required';
        } else if (!stateRegex.test(value)) {
          error = 'State should contain only letters and spaces';
        }
        break;
        
      case 'pincode':
        const pincodeRegex = /^[1-9][0-9]{5}$/;
        if (!value.trim()) {
          error = 'Pincode is required';
        } else if (!pincodeRegex.test(value)) {
          error = 'Please enter a valid 6-digit pincode';
        }
        break;
        
      default:
        break;
    }
    
    setFormErrors(prev => ({
      ...prev,
      [fieldName]: error
    }));
    
    return error;
  };

  const validateForm = () => {
    const errors = {};
    
    errors.phone = validateField('phone', userProfile.phone);
    errors.pharmacyName = validateField('pharmacyName', userProfile.pharmacyName);
    errors.licenseNumber = validateField('licenseNumber', userProfile.licenseNumber);
    errors.gstNumber = validateField('gstNumber', userProfile.gstNumber);
    errors.address = validateField('address', userProfile.address);
    errors.city = validateField('city', userProfile.city);
    errors.state = validateField('state', userProfile.state);
    errors.pincode = validateField('pincode', userProfile.pincode);
    
    setFormErrors(errors);
    
    return !Object.values(errors).some(error => error);
  };

  // Initialize state with mock data
  useEffect(() => {
    setStock(initialData.stock);
    setOrders(initialData.orders);
    setPrescriptions(initialData.prescriptions);
    
    if (user) {
      setUserProfile({
        fullName: user.fullName || 'Rajesh Kumar',
        email: user.email || 'rajesh.pharmacy@gmail.com',
        phone: user.phone || '9876543210',
        pharmacyName: user.pharmacyName || 'City Medical Store',
        licenseNumber: user.licenseNumber || 'PHARM-UP-2024-789',
        gstNumber: user.gstNumber || '07AABCU9603R1ZM',
        address: user.address || 'Shop No. 15, Medical Complex, Sector 15',
        city: user.city || 'Noida',
        state: user.state || 'Uttar Pradesh',
        pincode: user.pincode || '201301',
        openingTime: user.openingTime || '08:00 AM',
        closingTime: user.closingTime || '10:00 PM'
      });
    }
  }, [user]);

  // Real-time prescription updates simulation
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() < 0.1 && prescriptions.length < 5) {
        const newPrescription = {
          id: prescriptions.length + 1,
          orderId: `ORD-00${prescriptions.length + 3}`,
          customerName: 'New Customer',
          doctorName: 'Dr. New',
          uploadedTime: new Date().toLocaleString(),
          status: 'pending',
          medicines: ['New Medicine 250mg', 'Another Medicine 500mg'],
          imageUrl: 'https://via.placeholder.com/400x500?text=New+Prescription'
        };
        setPrescriptions(prev => [...prev, newPrescription]);
        
        if (notificationSettings.prescriptionVerification) {
          showNotification('New Prescription Uploaded', `New prescription received from ${newPrescription.customerName}`);
        }
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [prescriptions.length, notificationSettings.prescriptionVerification]);

  // Simulate new order notifications
  useEffect(() => {
    const orderInterval = setInterval(() => {
      if (Math.random() < 0.05 && orders.pending.length < 10) {
        const newOrder = {
          id: `ORD-00${orders.pending.length + orders.ready.length + orders.picked.length + orders.cancelled.length + 1}`,
          customerName: 'New Customer',
          customerPhone: '+91 98765 43299',
          items: [
            { name: 'Paracetamol 500mg', quantity: 1, price: 15 }
          ],
          total: 15,
          orderTime: new Date().toLocaleString(),
          deliveryType: Math.random() > 0.5 ? 'home' : 'pickup',
          address: 'New Address, Sector 62, Noida',
          prescriptionRequired: false
        };
        
        setOrders(prev => ({
          ...prev,
          pending: [...prev.pending, newOrder]
        }));
        
        if (notificationSettings.newOrders) {
          showNotification('New Order Received', `Order ${newOrder.id} from ${newOrder.customerName}`);
        }
      }
    }, 15000);

    return () => clearInterval(orderInterval);
  }, [orders, notificationSettings.newOrders]);

  const formatIndianCurrency = (amount) => {
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  const getCurrentGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  const isLowStock = (medicine) => medicine.quantity <= medicine.minStock;
  
  const isExpiringSoon = (medicine) => {
    const expiryDate = new Date(medicine.expiryDate);
    const today = new Date();
    const diffTime = expiryDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 30;
  };

  const isExpired = (medicine) => {
    const expiryDate = new Date(medicine.expiryDate);
    const today = new Date();
    return expiryDate < today;
  };

  // Enhanced search functionality
  const filteredStock = stock.filter(medicine => {
    const matchesSearch = searchTerm === '' || 
      medicine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      medicine.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      medicine.batchNo.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (!matchesSearch) return false;
    
    switch (stockFilter) {
      case 'low':
        return isLowStock(medicine);
      case 'expiring':
        return isExpiringSoon(medicine);
      case 'prescription':
        return medicine.prescriptionRequired;
      default:
        return true;
    }
  });

  // Search handlers
  const handleSearchChange = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, []);

  const handleClearSearch = useCallback(() => {
    setSearchTerm('');
  }, []);

  // Chat handlers
  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const userMessage = { id: chatMessages.length + 1, text: newMessage, isUser: true };
      setChatMessages(prev => [...prev, userMessage]);
      setNewMessage('');
      
      // Simulate bot response
      setTimeout(() => {
        const botResponse = { 
          id: chatMessages.length + 2, 
          text: 'Thank you for your message. Our support team will get back to you shortly.', 
          isUser: false 
        };
        setChatMessages(prev => [...prev, botResponse]);
      }, 1000);
    }
  };

  const showNotification = (title, message) => {
    console.log(`Notification: ${title} - ${message}`);
    // Add to notifications list
    const newNotification = {
      id: notifications.length + 1,
      type: getNotificationType(title),
      title,
      message,
      time: 'Just now',
      read: false
    };
    setNotifications(prev => [newNotification, ...prev]);
  };

  const getNotificationType = (title) => {
    if (title.includes('Order')) return 'order';
    if (title.includes('Prescription')) return 'prescription';
    if (title.includes('Stock') || title.includes('Expiring')) return 'stock';
    return 'system';
  };

  // Medicine Management Functions
  const handleAddMedicine = () => {
    const medicine = {
      ...newMedicine,
      id: Math.max(...stock.map(m => m.id), 0) + 1,
      quantity: parseInt(newMedicine.quantity) || 0,
      minStock: parseInt(newMedicine.minStock) || 0,
      price: parseFloat(newMedicine.price) || 0
    };
    
    setStock(prev => [...prev, medicine]);
    setShowAddMedicineModal(false);
    setNewMedicine({
      name: '',
      category: '',
      quantity: '',
      minStock: '',
      price: '',
      expiryDate: '',
      prescriptionRequired: false,
      supplier: '',
      batchNo: ''
    });
    
    showNotification('Medicine Added', `${medicine.name} has been added to inventory`);
  };

  const handleEditMedicine = (medicine) => {
    setEditingMedicine({...medicine});
    setShowEditStockModal(true);
  };

  const handleUpdateStock = () => {
    if (editingMedicine) {
      setStock(prev => prev.map(med => 
        med.id === editingMedicine.id ? {
          ...editingMedicine,
          quantity: parseInt(editingMedicine.quantity) || 0,
          minStock: parseInt(editingMedicine.minStock) || 0,
          price: parseFloat(editingMedicine.price) || 0
        } : med
      ));
      setShowEditStockModal(false);
      setEditingMedicine(null);
      showNotification('Stock Updated', `${editingMedicine.name} stock has been updated`);
    }
  };

  // Profile Management Functions
  const handleProfileUpdate = () => {
    if (validateForm()) {
      console.log('Profile updated:', userProfile);
      setShowProfileModal(false);
      setFormErrors({});
      showNotification('Profile Updated', 'Your profile has been updated successfully');
    }
  };

  // Notification Settings Functions
  const handleSaveNotificationSettings = () => {
    console.log('Notification settings saved:', notificationSettings);
    setShowNotificationsModal(false);
    showNotification('Settings Saved', 'Notification settings updated successfully');
  };

  // Notifications Functions
  const handleClearAllNotifications = () => {
    setNotifications([]);
  };

  // Order Management Functions
  const markOrderReady = (orderId) => {
    const order = orders.pending.find(o => o.id === orderId);
    if (order) {
      setOrders(prev => ({
        ...prev,
        pending: prev.pending.filter(o => o.id !== orderId),
        ready: [...prev.ready, order]
      }));
      setSelectedOrder(null);
      
      if (notificationSettings.orderReady) {
        showNotification('Order Ready', `Order ${orderId} is now ready for ${order.deliveryType === 'pickup' ? 'pickup' : 'delivery'}`);
      }
    }
  };

  const markOrderPicked = (orderId) => {
    const order = orders.ready.find(o => o.id === orderId);
    if (order) {
      setOrders(prev => ({
        ...prev,
        ready: prev.ready.filter(o => o.id !== orderId),
        picked: [...prev.picked, order]
      }));
      setSelectedOrder(null);
    }
  };

  const printLabel = (orderId) => {
    alert(`Printing label for order ${orderId}`);
  };

  const cancelOrder = (orderId) => {
    const order = orders.pending.find(o => o.id === orderId);
    if (order) {
      setOrders(prev => ({
        ...prev,
        pending: prev.pending.filter(o => o.id !== orderId),
        cancelled: [...prev.cancelled, { ...order, cancelledTime: new Date().toLocaleString() }]
      }));
      setSelectedOrder(null);
      showNotification('Order Cancelled', `Order ${orderId} has been cancelled`);
    }
  };

  // Prescription Verification Functions
  const approvePrescription = (prescriptionId) => {
    setPrescriptions(prev => prev.map(p => 
      p.id === prescriptionId ? { ...p, status: 'approved' } : p
    ));
    
    const prescription = prescriptions.find(p => p.id === prescriptionId);
    if (prescription) {
      const order = orders.pending.find(o => o.id === prescription.orderId);
      if (order) {
        markOrderReady(prescription.orderId);
      }
    }
    
    setSelectedPrescription(null);
  };

  const rejectPrescription = (prescriptionId) => {
    setPrescriptions(prev => prev.map(p => 
      p.id === prescriptionId ? { ...p, status: 'rejected' } : p
    ));
    
    const prescription = prescriptions.find(p => p.id === prescriptionId);
    if (prescription) {
      cancelOrder(prescription.orderId);
    }
    
    setSelectedPrescription(null);
  };

  const messageDoctor = (prescriptionId) => {
    const prescription = prescriptions.find(p => p.id === prescriptionId);
    if (prescription) {
      const message = `Need clarification for prescription ${prescriptionId} for order ${prescription.orderId}`;
      alert(`Messaging Dr. ${prescription.doctorName}: ${message}`);
    }
  };

  // Logout function
  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    setShowLogoutModal(false);
    if (onLogout) {
      onLogout();
    }
  };

  // Mobile menu toggle
  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  // Handle vendor click - go directly to profile page
  const handleVendorClick = () => {
    setActivePage('profile');
    setShowMobileMenu(false);
  };

  // Analytics data
  const analyticsData = {
    kpis: {
      ordersToday: 24,
      avgFulfillment: '32 mins',
      splitOrders: 3,
      revenue: 8450
    },
    orderTrends: [
      { day: 'Mon', orders: 18, revenue: 6200 },
      { day: 'Tue', orders: 22, revenue: 7400 },
      { day: 'Wed', orders: 25, revenue: 8100 },
      { day: 'Thu', orders: 20, revenue: 6800 },
      { day: 'Fri', orders: 28, revenue: 9200 },
      { day: 'Sat', orders: 35, revenue: 11500 },
      { day: 'Sun', orders: 30, revenue: 9800 }
    ],
    topLocalities: [
      { area: 'Sector 15', orders: 45 },
      { area: 'Sector 18', orders: 38 },
      { area: 'Sector 62', orders: 32 },
      { area: 'Sector 128', orders: 28 },
      { area: 'Sector 137', orders: 25 }
    ]
  };

  // Get dynamic order tabs based on current orders state
  const orderTabs = getOrderTabs(orders);

  const renderMainContent = () => {
    switch (activePage) {
      case 'stock':
        return (
          <VendorStockManagement
            userProfile={userProfile}
            stockFilter={stockFilter}
            stock={stock}
            searchTerm={searchTerm}
            filteredStock={filteredStock}
            stockFilters={stockFilters}
            formatIndianCurrency={formatIndianCurrency}
            getCurrentGreeting={getCurrentGreeting}
            isLowStock={isLowStock}
            isExpiringSoon={isExpiringSoon}
            isExpired={isExpired}
            handleSearchChange={handleSearchChange}
            handleClearSearch={handleClearSearch}
            handleEditMedicine={handleEditMedicine}
            setShowAddMedicineModal={setShowAddMedicineModal}
            setShowNotificationsBellModal={setShowNotificationsBellModal}
            notifications={notifications}
            setStockFilter={setStockFilter}
          />
        );
      case 'orders':
        return (
          <VendorOrdersManagement
            orderFilter={orderFilter}
            selectedOrder={selectedOrder}
            orders={orders}
            orderTabs={orderTabs}
            formatIndianCurrency={formatIndianCurrency}
            setShowNotificationsBellModal={setShowNotificationsBellModal}
            notifications={notifications}
            setSelectedOrder={setSelectedOrder}
            markOrderReady={markOrderReady}
            markOrderPicked={markOrderPicked}
            printLabel={printLabel}
            cancelOrder={cancelOrder}
            setOrderFilter={setOrderFilter}
          />
        );
      case 'prescriptions':
        return (
          <VendorPrescriptionVerification
            selectedPrescription={selectedPrescription}
            prescriptions={prescriptions}
            setShowNotificationsBellModal={setShowNotificationsBellModal}
            notifications={notifications}
            setSelectedPrescription={setSelectedPrescription}
            approvePrescription={approvePrescription}
            rejectPrescription={rejectPrescription}
            messageDoctor={messageDoctor}
          />
        );
      case 'analytics':
        return (
          <VendorAnalytics
            analyticsData={analyticsData}
            formatIndianCurrency={formatIndianCurrency}
            setShowNotificationsBellModal={setShowNotificationsBellModal}
            notifications={notifications}
          />
        );
      case 'profile':
        return (
          <VendorProfile
            userProfile={userProfile}
            stock={stock}
            orders={orders}
            prescriptions={prescriptions}
            setShowNotificationsBellModal={setShowNotificationsBellModal}
            setShowProfileModal={setShowProfileModal}
            notifications={notifications}
          />
        );
      default:
        return (
          <VendorStockManagement
            userProfile={userProfile}
            stockFilter={stockFilter}
            stock={stock}
            searchTerm={searchTerm}
            filteredStock={filteredStock}
            stockFilters={stockFilters}
            formatIndianCurrency={formatIndianCurrency}
            getCurrentGreeting={getCurrentGreeting}
            isLowStock={isLowStock}
            isExpiringSoon={isExpiringSoon}
            isExpired={isExpired}
            handleSearchChange={handleSearchChange}
            handleClearSearch={handleClearSearch}
            handleEditMedicine={handleEditMedicine}
            setShowAddMedicineModal={setShowAddMedicineModal}
            setShowNotificationsBellModal={setShowNotificationsBellModal}
            notifications={notifications}
            setStockFilter={setStockFilter}
          />
        );
    }
  };

  const modalsProps = {
    showAddMedicineModal,
    setShowAddMedicineModal,
    showEditStockModal,
    setShowEditStockModal,
    showProfileModal,
    setShowProfileModal,
    showNotificationsModal,
    setShowNotificationsModal,
    showNotificationsBellModal,
    setShowNotificationsBellModal,
    showChatModal,
    setShowChatModal,
    showLogoutModal,
    setShowLogoutModal,
    newMedicine,
    setNewMedicine,
    editingMedicine,
    setEditingMedicine,
    userProfile,
    setUserProfile,
    notificationSettings,
    setNotificationSettings,
    notifications,
    chatMessages,
    newMessage,
    setNewMessage,
    formErrors,
    validateField,
    handleAddMedicine,
    handleUpdateStock,
    handleProfileUpdate,
    handleSaveNotificationSettings,
    handleClearAllNotifications,
    handleSendMessage,
    confirmLogout
  };

  const containerStyle = {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: '#f8fafc',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
  };

  const mobileHeaderStyle = {
    display: 'none',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#7C2A62',
    color: 'white',
    padding: '12px 16px',
    zIndex: 999,
    borderBottom: '1px solid rgba(255,255,255,0.1)',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    '@media (max-width: 768px)': {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  };

  const mobileMenuButtonStyle = {
    backgroundColor: 'transparent',
    border: 'none',
    color: 'white',
    fontSize: '18px',
    cursor: 'pointer',
    padding: '6px',
    borderRadius: '4px',
    '&:hover': {
      backgroundColor: 'rgba(255,255,255,0.1)'
    }
  };

  const mobileLogoStyle = {
    textAlign: 'center',
    flex: 1
  };

  const mobileActionsStyle = {
    display: 'flex',
    gap: '8px'
  };

  const notificationBellStyle = {
    position: 'relative',
    backgroundColor: 'white',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    padding: '10px 12px',
    fontSize: '18px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  };

  const notificationBadgeStyle = {
    position: 'absolute',
    top: '-5px',
    right: '-5px',
    backgroundColor: '#EF4444',
    color: 'white',
    borderRadius: '50%',
    width: '18px',
    height: '18px',
    fontSize: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '600'
  };

  const logoStyle = {
    fontSize: '22px',
    fontWeight: '700',
    margin: '0 0 4px 0',
    color: 'white',
    letterSpacing: '0.5px'
  };

  const vendorTitleStyle = {
    fontSize: '12px',
    opacity: 0.8,
    margin: 0,
    fontWeight: '400'
  };

  const contentStyle = {
    flex: 1,
    marginLeft: '280px',
    padding: '0',
    minHeight: '100vh',
    '@media (max-width: 768px)': {
      marginLeft: '0',
      marginTop: '60px'
    }
  };

  const mobileOverlayStyle = {
    display: 'none',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 998,
    '@media (max-width: 768px)': {
      display: 'block'
    }
  };

  const chatbotWidgetStyle = {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    zIndex: 1000
  };

  const chatbotWidgetButtonStyle = {
    backgroundColor: '#7C2A62',
    color: 'white',
    border: 'none',
    borderRadius: '50%',
    width: '60px',
    height: '60px',
    fontSize: '24px',
    cursor: 'pointer',
    boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  return (
    <div style={containerStyle}>
      {/* Mobile Header */}
      <div style={mobileHeaderStyle}>
        <button 
          style={mobileMenuButtonStyle}
          onClick={toggleMobileMenu}
        >
          ☰
        </button>
        <div style={mobileLogoStyle}>
          <h1 style={logoStyle}>QUICKMED</h1>
          <p style={vendorTitleStyle}>Vendor Portal</p>
        </div>
        <div style={mobileActionsStyle}>
          <button 
            style={notificationBellStyle}
            onClick={() => setShowNotificationsBellModal(true)}
          >
            🔔
            {notifications.length > 0 && (
              <span style={notificationBadgeStyle}>
                {notifications.length}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Sidebar */}
      <VendorSidebar
        activePage={activePage}
        setActivePage={setActivePage}
        userProfile={userProfile}
        showMobileMenu={showMobileMenu}
        toggleMobileMenu={toggleMobileMenu}
        handleVendorClick={handleVendorClick}
        handleLogout={handleLogout}
      />

      {/* Mobile Overlay */}
      {showMobileMenu && (
        <div style={mobileOverlayStyle} onClick={toggleMobileMenu} />
      )}

      <div style={contentStyle}>
        {renderMainContent()}
      </div>

      {/* Floating Chatbot Widget */}
      <div style={chatbotWidgetStyle}>
        <button 
          style={chatbotWidgetButtonStyle}
          onClick={() => setShowChatModal(true)}
          title="Chat Support"
        >
          💬
        </button>
      </div>

      <VendorModals {...modalsProps} />
    </div>
  );
};

export default VendorDashboard;