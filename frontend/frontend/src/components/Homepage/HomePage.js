import React, { useState } from 'react';
import Navbar from './Navbar';
import Hero from './Hero';
import AboutUs from './AboutUs';
import Services from './Services';
import Reviews from './Reviews';
import Footer from './Footer';
import AdminLoginModal from './AdminLoginModal';
import ReviewModal from './ReviewModal';
import ServiceDetailsModal from './ServiceDetailsModal';
import Contact from './Contact';
import Doctors from './Doctors';

const HomePage = ({ onNavigateToAuth, onNavigateToAdmin, onNavigateToHome, onNavigateToLogin, reviews, onWriteReview }) => {
  const [activeSection, setActiveSection] = useState('home');
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSectionChange = (section) => {
    setActiveSection(section);
    setIsMobileMenuOpen(false);
    
    // Scroll to top when changing sections
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleServiceLearnMore = (service) => {
    setSelectedService(service);
    setShowServiceModal(true);
  };

  // Use the provided onWriteReview prop or fall back to showing the modal
  const handleWriteReview = () => {
    if (onWriteReview) {
      onWriteReview();
    } else {
      setShowReviewModal(true);
    }
  };

  const styles = {
    homepage: {
      minHeight: '100vh',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    },
    section: {
      padding: '2rem',
    }
  };

  return (
    <div style={styles.homepage}>
      <Navbar 
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
        onNavigateToAuth={onNavigateToAuth}
        onNavigateToAdmin={() => setShowAdminModal(true)}
        isMobileMenuOpen={isMobileMenuOpen}
        onMobileMenuToggle={handleMobileMenuToggle}
      />

      <main>
        {activeSection === 'home' && (
          <Hero 
            onSectionChange={handleSectionChange}
            onNavigateToAuth={onNavigateToLogin}
          />
        )}
        {activeSection === 'about' && (
          <AboutUs 
            onNavigateToAuth={onNavigateToLogin}
          />
        )}
        {activeSection === 'services' && (
          <Services 
            onLearnMore={handleServiceLearnMore}
            onNavigateToLogin={onNavigateToLogin}
          />
        )}
        {activeSection === 'doctors' && (
          <Doctors 
            onNavigateToLogin={onNavigateToLogin}
          />
        )}
        {activeSection === 'reviews' && (
          <Reviews 
            onWriteReview={handleWriteReview}
            reviews={reviews}
          />
        )}
        {activeSection === 'contact' && <Contact />}
      </main>

      <Footer onSectionChange={handleSectionChange} />

      {/* Modals */}
      {showAdminModal && (
        <AdminLoginModal 
          onClose={() => setShowAdminModal(false)}
          onLoginSuccess={onNavigateToAdmin}
          onBackToHome={onNavigateToHome}
        />
      )}

      {showReviewModal && (
        <ReviewModal 
          onClose={() => setShowReviewModal(false)}
        />
      )}

      {showServiceModal && selectedService && (
        <ServiceDetailsModal 
          service={selectedService}
          onClose={() => setShowServiceModal(false)}
          onBookService={onNavigateToAuth}
        />
      )}
    </div>
  );
};

export default HomePage;