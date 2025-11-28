import React, { useState } from 'react';
import AnalyticsDashboard from './AnalyticsDashboard';
import UsersManagement from './UsersManagement';
import VendorLookup from './VendorLookup';
import DoctorLookup from './DoctorLookup';
import DeliveryAgentLookup from './DeliveryAgentLookup';
import OrdersManagement from './OrdersManagement';
import PayoutsDashboard from './PayoutsDashboard';
import Settings from './Settings';
import SupportDisputesDashboard from './SupportDisputesDashboard';
import Dashboard from './Dashboard';
import ReviewsManagement from './ReviewsManagement';

const AdminDashboard = ({ user, onLogout }) => {
  const [activeModule, setActiveModule] = useState('dashboard');
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const primaryColor = '#7C2A62';
  const accentColor = '#F7D9EB';

  const modules = [
    { id: 'dashboard', name: 'Dashboard', icon: '📊' },
    { id: 'analytics', name: 'Analytics', icon: '📈' },
    { id: 'users', name: 'Users Management', icon: '👥' },
    { id: 'vendors', name: 'Vendor Lookup', icon: '🏪' },
    { id: 'doctors', name: 'Doctor Lookup', icon: '👨‍⚕️' },
    { id: 'delivery', name: 'Delivery Agents', icon: '🚚' },
    { id: 'orders', name: 'Orders', icon: '📦' },
    { id: 'payouts', name: 'Payouts', icon: '💰' },
    { id: 'reviews', name: 'Reviews Management', icon: '⭐' },
    { id: 'support', name: 'Support & Disputes', icon: '🛡️' },
    { id: 'settings', name: 'Settings', icon: '⚙️' }
  ];

  const handleLogoutClick = () => {
    setShowLogoutConfirm(true);
  };

  const handleConfirmLogout = () => {
    setShowLogoutConfirm(false);
    onLogout();
  };

  const handleCancelLogout = () => {
    setShowLogoutConfirm(false);
  };

  const renderModule = () => {
    switch (activeModule) {
      case 'dashboard':
        return <Dashboard />;
      case 'analytics':
        return <AnalyticsDashboard />;
      case 'users':
        return <UsersManagement />;
      case 'vendors':
        return <VendorLookup />;
      case 'doctors':
        return <DoctorLookup />;
      case 'delivery':
        return <DeliveryAgentLookup />;
      case 'orders':
        return <OrdersManagement />;
      case 'payouts':
        return <PayoutsDashboard />;
      case 'reviews':
        return <ReviewsManagement />;
      case 'support':
        return <SupportDisputesDashboard />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      {/* Sidebar - Fixed position */}
      <div style={{
        width: '250px',
        backgroundColor: primaryColor,
        color: 'white',
        padding: '20px 0',
        position: 'fixed',
        left: 0,
        top: 0,
        height: '100vh',
        overflowY: 'auto',
        zIndex: 1000
      }}>
        <div style={{ padding: '0 20px 20px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <h2 style={{ margin: 0, color: 'white' }}>QuickMed Admin</h2>
          <p style={{ margin: '5px 0 0', fontSize: '12px', opacity: 0.8 }}>Welcome, {user?.name}</p>
        </div>
        
        <nav style={{ marginTop: '20px' }}>
          {modules.map(module => (
            <button
              key={module.id}
              onClick={() => setActiveModule(module.id)}
              style={{
                width: '100%',
                padding: '12px 20px',
                backgroundColor: activeModule === module.id ? accentColor : 'transparent',
                color: activeModule === module.id ? primaryColor : 'white',
                border: 'none',
                textAlign: 'left',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                fontSize: '14px',
                transition: 'all 0.3s'
              }}
            >
              <span>{module.icon}</span>
              {module.name}
            </button>
          ))}
        </nav>

        <div style={{ padding: '0 20px', marginTop: 'auto' }}>
          <button
            onClick={handleLogoutClick}
            style={{
              width: '100%',
              margin: '20px 0',
              padding: '10px',
              backgroundColor: 'transparent',
              color: 'white',
              border: '1px solid rgba(255,255,255,0.3)',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content - With left margin for sidebar */}
      <div style={{ 
        flex: 1, 
        padding: '20px', 
        marginLeft: '250px',
        minHeight: '100vh'
      }}>
        <div style={{
          backgroundColor: 'white',
          borderRadius: '10px',
          padding: '20px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          minHeight: 'calc(100vh - 40px)'
        }}>
          {renderModule()}
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2000
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '30px',
            borderRadius: '10px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
            maxWidth: '400px',
            width: '90%',
            textAlign: 'center'
          }}>
            <h3 style={{ margin: '0 0 15px 0', color: primaryColor }}>
              Confirm Logout
            </h3>
            <p style={{ margin: '0 0 25px 0', color: '#666', lineHeight: '1.5' }}>
              Are you sure you want to logout from the admin dashboard?
            </p>
            <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
              <button
                onClick={handleCancelLogout}
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#f8f9fa',
                  color: '#333',
                  border: '1px solid #ddd',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  minWidth: '80px'
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmLogout}
                style={{
                  padding: '10px 20px',
                  backgroundColor: primaryColor,
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  minWidth: '80px'
                }}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;