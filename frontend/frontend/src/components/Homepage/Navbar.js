import React, { useState, useEffect } from 'react';

const Navbar = ({ activeSection, onSectionChange, onNavigateToAuth, onNavigateToAdmin, isMobileMenuOpen, onMobileMenuToggle }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Initial check
    checkScreenSize();

    // Add event listener
    window.addEventListener('resize', checkScreenSize);

    // Cleanup
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const styles = {
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: isMobile ? '0.8rem 1rem' : '1rem 2rem',
      backgroundColor: '#F7D9EB',
      boxShadow: '0 4px 20px rgba(124, 42, 98, 0.3)',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      minHeight: '60px',
      boxSizing: 'border-box',
    },
    logo: {
      display: 'flex',
      alignItems: 'center',
      gap: isMobile ? '10px' : '15px',
      cursor: 'pointer',
      flexShrink: 0,
      minWidth: isMobile ? '180px' : '220px',
    },
    logoImage: {
      width: isMobile ? '50px' : '60px', // Increased from 38px/45px
      height: isMobile ? '50px' : '60px', // Increased from 38px/45px
      objectFit: 'contain',
    },
    logoText: {
      margin: 0,
      color: '#000000',
      fontSize: isMobile ? '2rem' : '2.5rem', // Increased from 1.8rem/2.2rem
      fontWeight: 'bold',
      background: 'linear-gradient(45deg, #7C2A62, #5a1a4a)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      lineHeight: '1.2',
    },
    tagline: {
      margin: 0,
      color: '#000000',
      fontSize: isMobile ? '0.8rem' : '0.9rem',
      fontWeight: '500',
      lineHeight: '1.3',
      display: isMobile && window.innerWidth <= 480 ? 'none' : 'block',
    },
    mobileMenuButton: {
      display: isMobile ? 'flex' : 'none',
      backgroundColor: 'transparent',
      border: '2px solid #7C2A62',
      cursor: 'pointer',
      padding: '0.5rem',
      color: '#7C2A62',
      borderRadius: '8px',
      transition: 'all 0.3s ease',
      zIndex: 1001,
      width: '50px',
      height: '50px',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
    },
    nav: {
      display: isMobile ? 'none' : 'flex',
      alignItems: 'center',
      gap: '0.8rem',
      flexWrap: 'wrap',
      justifyContent: 'center',
    },
    navButton: {
      padding: '0.5rem 1rem',
      border: 'none',
      backgroundColor: 'transparent',
      cursor: 'pointer',
      fontSize: '0.9rem',
      borderRadius: '20px',
      transition: 'all 0.3s ease',
      fontWeight: '600',
      color: '#000000',
      whiteSpace: 'nowrap',
      minHeight: '44px',
    },
    activeNavButton: {
      backgroundColor: '#7C2A62',
      color: '#ffffff',
      boxShadow: '0 2px 10px rgba(124, 42, 98, 0.3)',
    },
    authButtons: {
      display: isMobile ? 'none' : 'flex',
      gap: '0.5rem',
      marginLeft: '1rem',
      flexShrink: 0,
    },
    loginButton: {
      padding: '0.5rem 1rem',
      border: '2px solid #7C2A62',
      backgroundColor: 'transparent',
      cursor: 'pointer',
      borderRadius: '20px',
      fontWeight: '600',
      transition: 'all 0.3s ease',
      color: '#7C2A62',
      whiteSpace: 'nowrap',
      minHeight: '44px',
    },
    adminButton: {
      padding: '0.5rem 1rem',
      border: 'none',
      backgroundColor: '#7C2A62',
      color: 'white',
      cursor: 'pointer',
      borderRadius: '20px',
      fontWeight: '600',
      transition: 'all 0.3s ease',
      whiteSpace: 'nowrap',
      minHeight: '44px',
    },
    mobileNav: {
      position: 'fixed',
      top: '60px',
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: '#F7D9EB',
      flexDirection: 'column',
      padding: '2rem 1.5rem',
      boxShadow: '0 4px 20px rgba(124, 42, 98, 0.3)',
      zIndex: 999,
      gap: '1rem',
      overflowY: 'auto',
      transform: isMobileMenuOpen ? 'translateX(0)' : 'translateX(-100%)',
      transition: 'transform 0.3s ease-in-out',
    },
    mobileOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      zIndex: 998,
      display: isMobileMenuOpen ? 'block' : 'none',
    },
    hamburgerIcon: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      width: '24px',
      height: '18px',
    },
    hamburgerLine: {
      height: '3px',
      width: '100%',
      backgroundColor: '#7C2A62',
      borderRadius: '3px',
      transition: 'all 0.3s ease',
    },
    closeIcon: {
      position: 'relative',
      width: '24px',
      height: '24px',
    },
    closeLine: {
      position: 'absolute',
      height: '3px',
      width: '100%',
      backgroundColor: '#7C2A62',
      borderRadius: '3px',
      top: '50%',
      left: '0',
    },
    mobileNavButton: {
      padding: '1rem',
      border: 'none',
      backgroundColor: 'transparent',
      cursor: 'pointer',
      fontSize: '1.1rem',
      borderRadius: '10px',
      transition: 'all 0.3s ease',
      fontWeight: '600',
      color: '#000000',
      textAlign: 'left',
      width: '100%',
      marginBottom: '0.5rem',
    },
    mobileAuthButtons: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
      marginTop: '2rem',
      width: '100%',
    },
    mobileLoginButton: {
      padding: '1rem',
      border: '2px solid #7C2A62',
      backgroundColor: 'transparent',
      cursor: 'pointer',
      borderRadius: '10px',
      fontWeight: '600',
      fontSize: '1.1rem',
      color: '#7C2A62',
      width: '100%',
    },
    mobileAdminButton: {
      padding: '1rem',
      border: 'none',
      backgroundColor: '#7C2A62',
      color: 'white',
      cursor: 'pointer',
      borderRadius: '10px',
      fontWeight: '600',
      fontSize: '1.1rem',
      width: '100%',
    }
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'services', label: 'Services' },
    { id: 'doctors', label: 'Doctors' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'contact', label: 'Contact' }
  ];

  const handleMouseEnter = (e) => {
    if (!isMobile) {
      e.target.style.transform = 'translateY(-2px)';
      e.target.style.boxShadow = '0 4px 12px rgba(124, 42, 98, 0.2)';
    }
  };

  const handleMouseLeave = (e) => {
    if (!isMobile) {
      e.target.style.transform = 'translateY(0)';
      if (!e.target.style.backgroundColor || e.target.style.backgroundColor === 'transparent') {
        e.target.style.boxShadow = 'none';
      }
    }
  };

  const handleMobileMenuToggle = () => {
    onMobileMenuToggle();
    if (isMobile) {
      document.body.style.overflow = isMobileMenuOpen ? 'auto' : 'hidden';
    }
  };

  const handleMobileNavClick = (sectionId) => {
    onSectionChange(sectionId);
    handleMobileMenuToggle();
  };

  const HamburgerIcon = () => (
    <div style={styles.hamburgerIcon}>
      <div style={styles.hamburgerLine} />
      <div style={styles.hamburgerLine} />
      <div style={styles.hamburgerLine} />
    </div>
  );

  const CloseIcon = () => (
    <div style={styles.closeIcon}>
      <div style={{...styles.closeLine, transform: 'rotate(45deg)'}} />
      <div style={{...styles.closeLine, transform: 'rotate(-45deg)'}} />
    </div>
  );

  return (
    <>
      {/* Mobile Overlay */}
      {isMobile && (
        <div 
          style={styles.mobileOverlay}
          onClick={handleMobileMenuToggle}
        />
      )}

      <header style={styles.header}>
        <div 
          style={styles.logo} 
          onClick={() => onSectionChange('home')}
        >
          <img 
            src="/Quickmed img.png" 
            alt="QuickMed Logo" 
            style={styles.logoImage}
          />
          <div>
            <h1 style={styles.logoText}>QUICKMED</h1>
            <p style={styles.tagline}>Quick Care Smarter Health</p>
          </div>
        </div>

        {/* Hamburger Menu Button - Only shows on mobile */}
        <button 
          style={styles.mobileMenuButton}
          onClick={handleMobileMenuToggle}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = 'rgba(124, 42, 98, 0.1)';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = 'transparent';
          }}
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? <CloseIcon /> : <HamburgerIcon />}
        </button>

        {/* Desktop Navigation - Hidden on mobile */}
        <nav style={styles.nav}>
          {navItems.map(item => (
            <button
              key={item.id}
              style={{
                ...styles.navButton,
                ...(activeSection === item.id && styles.activeNavButton)
              }}
              onClick={() => onSectionChange(item.id)}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {item.label}
            </button>
          ))}
          <div style={styles.authButtons}>
            <button 
              style={styles.loginButton}
              onClick={onNavigateToAuth}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              Login
            </button>
            <button 
              style={styles.adminButton}
              onClick={onNavigateToAdmin}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              🔧 Admin
            </button>
          </div>
        </nav>

        {/* Mobile Navigation - Shows when hamburger is clicked */}
        {isMobile && (
          <nav style={styles.mobileNav}>
            {navItems.map(item => (
              <button
                key={item.id}
                style={{
                  ...styles.mobileNavButton,
                  ...(activeSection === item.id && styles.activeNavButton)
                }}
                onClick={() => handleMobileNavClick(item.id)}
              >
                {item.label}
              </button>
            ))}
            <div style={styles.mobileAuthButtons}>
              <button 
                style={styles.mobileLoginButton}
                onClick={() => {
                  onNavigateToAuth();
                  handleMobileMenuToggle();
                }}
              >
                Login
              </button>
              <button 
                style={styles.mobileAdminButton}
                onClick={() => {
                  onNavigateToAdmin();
                  handleMobileMenuToggle();
                }}
              >
                🔧 Admin
              </button>
            </div>
          </nav>
        )}
      </header>
    </>
  );
};

export default Navbar;