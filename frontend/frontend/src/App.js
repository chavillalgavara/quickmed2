import React, { useState, useEffect } from 'react';
import HomePage from './components/Homepage/HomePage';
import Login from './components/Login';
import Signup from './components/Signup';
import UserDashboard from './components/user/UserDashboard';
import VendorDashboard from './components/vendor/VendorDashboard';
import DoctorDashboard from './components/doctor/DoctorDashboard';
import DeliveryDashboard from './components/delivery/DeliveryDashboard';
import AdminLogin from './components/admin/AdminLogin';
import AdminDashboard from './components/admin/AdminDashboard';
import ReviewModal from './components/Homepage/ReviewModal';

import { ProfileProvider } from './components/user/ProfileContext';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [authMode, setAuthMode] = useState('login');
  const [currentUser, setCurrentUser] = useState(null);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviews, setReviews] = useState([]);

  const userTypeToPageMap = {
    vendor: 'vendorDashboard',
    doctor: 'doctorDashboard',
    delivery: 'deliveryDashboard',
    admin: 'adminDashboard',
  };

  // Load reviews from localStorage on component mount
  useEffect(() => {
    const savedReviews = localStorage.getItem('quickmed-reviews');
    if (savedReviews) {
      setReviews(JSON.parse(savedReviews));
    }
  }, []);

  useEffect(() => {
    const user = localStorage.getItem('currentUser');
    if (user) {
      try {
        const userData = JSON.parse(user);
        setCurrentUser(userData);
        setCurrentPage(userTypeToPageMap[userData.userType] || 'dashboard');
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('currentUser');
      }
    }
  }, []);

  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
    setCurrentPage(userTypeToPageMap[user.userType] || 'dashboard');
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
    setCurrentPage('home');
  };

  const navigateToAuth = () => {
    setCurrentPage('auth');
    setAuthMode('login');
  };

  const navigateToAdmin = () => {
    setCurrentPage('adminAuth');
    setAuthMode('login');
  };

  const switchToSignup = () => setAuthMode('signup');
  const switchToLogin = () => setAuthMode('login');
  
  const handleSignupSuccess = () => {
    setAuthMode('login');
    setCurrentPage('auth');
  };

  const handleBackToHome = () => setCurrentPage('home');

  // NEW FUNCTION: Handle navigation to login from services
  const handleNavigateToLogin = () => {
    setCurrentPage('auth');
    setAuthMode('login');
  };

  // Review Modal Functions
  const handleWriteReview = () => {
    setShowReviewModal(true);
  };

  const handleReviewSubmit = (newReview) => {
    const reviewToAdd = {
      ...newReview,
      avatar: newReview.name.split(' ').map(n => n[0]).join('').toUpperCase(),
      id: Date.now()
    };
    
    const updatedReviews = [reviewToAdd, ...reviews];
    setReviews(updatedReviews);
    localStorage.setItem('quickmed-reviews', JSON.stringify(updatedReviews));
    setShowReviewModal(false);
  };

  const handleCloseReviewModal = () => {
    setShowReviewModal(false);
  };

  const renderAuthPage = () => (
    authMode === 'login' ? (
      <Login 
        onSwitchToSignup={switchToSignup}
        onLoginSuccess={handleLoginSuccess}
        onBackToHome={handleBackToHome}
      />
    ) : (
      <Signup 
        onSwitchToLogin={switchToLogin}
        onSignupSuccess={handleSignupSuccess}
        onBackToHome={handleBackToHome}
      />
    )
  );

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <HomePage
            onNavigateToAuth={navigateToAuth}
            onNavigateToAdmin={navigateToAdmin}
            onNavigateToLogin={handleNavigateToLogin} // ADD THIS PROP
            onWriteReview={handleWriteReview}
            reviews={reviews}
          />
        );

      case 'auth':
        return renderAuthPage();

      case 'adminAuth':
        return (
          <AdminLogin
            onLoginSuccess={handleLoginSuccess}
            onBackToHome={handleBackToHome}
          />
        );

      case 'dashboard':
        return (
          <UserDashboard
            user={currentUser}
            onLogout={handleLogout}
            onWriteReview={handleWriteReview}
          />
        );

      case 'vendorDashboard':
        return (
          <VendorDashboard
            user={currentUser}
            onLogout={handleLogout}
          />
        );

      case 'doctorDashboard':
        return (
          <DoctorDashboard
            user={currentUser}
            onLogout={handleLogout}
          />
        );

      case 'deliveryDashboard':
        return (
          <DeliveryDashboard
            user={currentUser}
            onLogout={handleLogout}
          />
        );

      case 'adminDashboard':
        return (
          <AdminDashboard
            user={currentUser}
            onLogout={handleLogout}
          />
        );

      default:
        return (
          <HomePage
            onNavigateToAuth={navigateToAuth}
            onNavigateToAdmin={navigateToAdmin}
            onNavigateToLogin={handleNavigateToLogin} // ADD THIS PROP
            onWriteReview={handleWriteReview}
            reviews={reviews}
          />
        );
    }
  };

  return (
    <ProfileProvider>
      <div className="App">
        {renderPage()}
        
        {/* Review Modal */}
        {showReviewModal && (
          <ReviewModal
            onClose={handleCloseReviewModal}
            onReviewSubmit={handleReviewSubmit}
          />
        )}
      </div>
    </ProfileProvider>
  );
}

export default App;