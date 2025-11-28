import React from 'react';
import { navigationItems } from './VendorData';

const VendorSidebar = ({ 
  activePage, 
  setActivePage, 
  userProfile, 
  showMobileMenu, 
  toggleMobileMenu, 
  handleVendorClick, 
  handleLogout 
}) => {
  const sidebarStyle = {
    width: '280px',
    backgroundColor: '#F7D9EB',
    color: '#333333',
    display: 'flex',
    flexDirection: 'column',
    position: 'fixed',
    height: '100vh',
    left: 0,
    top: 0,
    zIndex: 1000,
    overflow: 'hidden',
    '@media (max-width: 768px)': {
      transform: showMobileMenu ? 'translateX(0)' : 'translateX(-100%)',
      transition: 'transform 0.3s ease'
    }
  };

  const sidebarHeaderStyle = {
    padding: '24px 20px 16px',
    borderBottom: '1px solid rgba(0,0,0,0.1)',
    position: 'relative',
    flexShrink: 0
  };

  const logoContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  };

  const logoImageStyle = {
    width: '40px',
    height: '40px',
    borderRadius: '8px',
    objectFit: 'cover'
  };

  const logoFallbackStyle = {
    fontSize: '24px',
    width: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderRadius: '8px'
  };

  const logoTextContainerStyle = {
    display: 'flex',
    flexDirection: 'column'
  };

  const logoStyle = {
    fontSize: '22px',
    fontWeight: '700',
    margin: '0 0 4px 0',
    color: '#333333',
    letterSpacing: '0.5px'
  };

  const vendorTitleStyle = {
    fontSize: '12px',
    opacity: 0.8,
    margin: 0,
    fontWeight: '400',
    color: '#333333'
  };

  const mobileCloseButtonStyle = {
    display: 'none',
    position: 'absolute',
    right: '16px',
    top: '24px',
    backgroundColor: 'transparent',
    border: 'none',
    color: '#333333',
    fontSize: '18px',
    cursor: 'pointer',
    padding: '4px',
    borderRadius: '4px',
    '@media (max-width: 768px)': {
      display: 'block'
    }
  };

  const vendorProfileSectionStyle = {
    padding: '16px 20px',
    borderBottom: '1px solid rgba(0,0,0,0.1)',
    flexShrink: 0,
    backgroundColor: 'rgba(0,0,0,0.05)'
  };

  const vendorProfileStyle = {
    display: 'flex',
    alignItems: 'center',
    padding: '12px',
    backgroundColor: 'rgba(0,0,0,0.08)',
    borderRadius: '10px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    border: '1px solid rgba(0,0,0,0.1)',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    '&:hover': {
      backgroundColor: 'rgba(0,0,0,0.12)',
      transform: 'translateY(-1px)',
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
    }
  };

  const vendorAvatarStyle = {
    fontSize: '28px',
    marginRight: '12px',
    width: '44px',
    height: '44px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderRadius: '10px',
    flexShrink: 0,
    border: '2px solid rgba(0,0,0,0.2)'
  };

  const vendorDetailsStyle = {
    flex: 1,
    minWidth: 0
  };

  const vendorNameStyle = {
    margin: '0 0 4px 0',
    fontWeight: '600',
    fontSize: '14px',
    color: '#333333',
    lineHeight: '1.2',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  };

  const vendorEmailStyle = {
    margin: '0 0 2px 0',
    fontSize: '11px',
    opacity: 0.9,
    color: '#333333',
    lineHeight: '1.2',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  };

  const navigationStyle = {
    flex: 1,
    padding: '16px 0',
    overflow: 'hidden'
  };

  const navButtonStyle = {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    padding: '14px 20px',
    backgroundColor: 'transparent',
    border: 'none',
    color: '#333333',
    fontSize: '14px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    opacity: 0.8
  };

  const navButtonActiveStyle = {
    backgroundColor: 'rgba(0,0,0,0.08)',
    opacity: 1,
    borderRight: '3px solid #7C2A62',
    fontWeight: '600'
  };

  const navIconStyle = {
    fontSize: '18px',
    marginRight: '12px',
    width: '20px',
    textAlign: 'center',
    flexShrink: 0
  };

  const navLabelStyle = {
    fontWeight: '500',
    fontSize: '14px'
  };

  const sidebarFooterStyle = {
    padding: '16px 20px',
    borderTop: '1px solid rgba(0,0,0,0.1)',
    flexShrink: 0,
    backgroundColor: 'rgba(0,0,0,0.05)'
  };

  const logoutButtonStyle = {
    width: '100%',
    padding: '10px 16px',
    backgroundColor: 'rgba(0,0,0,0.08)',
    color: '#333333',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '500',
    fontSize: '14px',
    transition: 'all 0.3s ease',
    '&:hover': {
      backgroundColor: 'rgba(0,0,0,0.12)'
    }
  };

  return (
    <div style={sidebarStyle}>
      <div style={sidebarHeaderStyle}>
        <div style={logoContainerStyle}>
          <img 
            src="/Quickmed img.png" 
            alt="QuickMed Logo" 
            style={logoImageStyle}
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'block';
            }}
          />
          <div style={logoTextContainerStyle}>
            <h1 style={logoStyle}>QUICKMED</h1>
            <p style={vendorTitleStyle}>Vendor Portal</p>
          </div>
        </div>
        <button 
          style={mobileCloseButtonStyle}
          onClick={toggleMobileMenu}
        >
          ✕
        </button>
      </div>

      {/* Vendor Profile at Top */}
      <div style={vendorProfileSectionStyle}>
        <div 
          style={vendorProfileStyle}
          onClick={handleVendorClick}
        >
          <div style={vendorAvatarStyle}>👤</div>
          <div style={vendorDetailsStyle}>
            <p style={vendorNameStyle}>{userProfile.fullName}</p>
            <p style={vendorEmailStyle}>{userProfile.email}</p>
          </div>
        </div>
      </div>
      
      <nav style={navigationStyle}>
        {navigationItems.map(item => (
          <button
            key={item.id}
            style={{
              ...navButtonStyle,
              ...(activePage === item.id ? navButtonActiveStyle : {})
            }}
            onClick={() => {
              setActivePage(item.id);
              toggleMobileMenu();
            }}
          >
            <span style={navIconStyle}>{item.icon}</span>
            <span style={navLabelStyle}>{item.label}</span>
          </button>
        ))}
      </nav>

      <div style={sidebarFooterStyle}>
        <button style={logoutButtonStyle} onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default VendorSidebar;