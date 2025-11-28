import React, { useState } from 'react';

const AdminLogin = ({ onLoginSuccess, onSwitchToSignup }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Restricted admin credentials (hidden from UI)
  const ADMIN_CREDENTIALS = {
    email: 'poornima@gmail.com',
    password: 'Poori@123'
  };

  const validateForm = () => {
    const newErrors = {};

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginError('');
    
    if (!validateForm()) {
      return;
    }

    // Check if credentials match the restricted admin credentials
    if (formData.email !== ADMIN_CREDENTIALS.email || formData.password !== ADMIN_CREDENTIALS.password) {
      setLoginError('Invalid admin credentials. Access restricted.');
      return;
    }

    setIsLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      const adminUser = {
        id: 1,
        name: 'Poornima Admin',
        email: formData.email,
        userType: 'admin',
        permissions: ['all']
      };
      localStorage.setItem('currentUser', JSON.stringify(adminUser));
      onLoginSuccess(adminUser);
      setIsLoading(false);
    }, 1500);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear errors when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    // Clear login error when user starts typing
    if (loginError) {
      setLoginError('');
    }
  };

  const handleInputFocus = (e) => {
    e.target.style.borderColor = '#7C2A62';
    e.target.style.boxShadow = '0 0 0 3px rgba(124, 42, 98, 0.1)';
  };

  const handleInputBlur = (e) => {
    e.target.style.borderColor = errors[e.target.name] ? '#e53e3e' : '#e1e1e1';
    e.target.style.boxShadow = 'none';
  };

  // Background image URL
  const backgroundImage = 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80';

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: `linear-gradient(rgba(124, 42, 98, 0.8), rgba(124, 42, 98, 0.9)), url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      padding: '20px',
      position: 'relative'
    }}>
      {/* Animated background overlay */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(45deg, rgba(124, 42, 98, 0.7) 0%, rgba(247, 217, 235, 0.4) 100%)',
        zIndex: 1
      }}></div>

      <div style={{
        background: 'rgba(255, 255, 255, 0.95)',
        padding: '40px',
        borderRadius: '20px',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
        width: '100%',
        maxWidth: '450px',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        position: 'relative',
        zIndex: 2,
        transform: 'translateY(0)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-5px)';
        e.currentTarget.style.boxShadow = '0 25px 80px rgba(0, 0, 0, 0.4)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 20px 60px rgba(0, 0, 0, 0.3)';
      }}
      >
        {/* Admin Badge */}
        <div style={{
          position: 'absolute',
          top: '-15px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: '#7C2A62',
          color: 'white',
          padding: '8px 20px',
          borderRadius: '25px',
          fontSize: '12px',
          fontWeight: 'bold',
          letterSpacing: '1px'
        }}>
          RESTRICTED ACCESS
        </div>

        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <div style={{
            width: '80px',
            height: '80px',
            background: 'linear-gradient(135deg, #7C2A62 0%, #F7D9EB 100%)',
            borderRadius: '50%',
            margin: '0 auto 15px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '32px'
          }}>
            🔐
          </div>
          <h1 style={{ 
            color: '#7C2A62', 
            margin: '0 0 10px 0',
            fontSize: '28px',
            fontWeight: 'bold',
            letterSpacing: '0.5px'
          }}>
            MediQuick Admin
          </h1>
          <p style={{ 
            color: '#666', 
            margin: 0,
            fontSize: '14px',
            lineHeight: '1.5'
          }}>
            Restricted Administrative Access
          </p>
        </div>

        {/* Login Error Message */}
        {loginError && (
          <div style={{
            padding: '12px',
            background: '#fef2f2',
            border: '1px solid #fecaca',
            borderRadius: '8px',
            marginBottom: '20px',
            textAlign: 'center'
          }}>
            <p style={{ 
              margin: 0, 
              color: '#dc2626', 
              fontSize: '13px',
              fontWeight: '500',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}>
              ⚠️ {loginError}
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              color: '#333',
              fontWeight: '600',
              fontSize: '14px'
            }}>
              Admin Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              required
              placeholder="Enter authorized admin email"
              style={{
                width: '100%',
                padding: '14px 16px',
                border: `2px solid ${errors.email ? '#e53e3e' : '#e1e1e1'}`,
                borderRadius: '10px',
                fontSize: '15px',
                transition: 'all 0.3s ease',
                boxSizing: 'border-box',
                backgroundColor: errors.email ? '#fef2f2' : '#fff'
              }}
            />
            {errors.email && (
              <div style={{
                color: '#e53e3e',
                fontSize: '12px',
                marginTop: '6px',
                display: 'flex',
                alignItems: 'center',
                gap: '5px'
              }}>
                ⚠️ {errors.email}
              </div>
            )}
          </div>

          <div style={{ marginBottom: '25px' }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '8px'
            }}>
              <label style={{
                color: '#333',
                fontWeight: '600',
                fontSize: '14px'
              }}>
                Admin Password
              </label>
              <button
                type="button"
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#7C2A62',
                  fontSize: '12px',
                  cursor: 'pointer',
                  textDecoration: 'underline'
                }}
                onClick={() => setLoginError('Please contact system administrator for password reset.')}
              >
                Forgot Password?
              </button>
            </div>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              required
              placeholder="Enter admin password"
              style={{
                width: '100%',
                padding: '14px 16px',
                border: `2px solid ${errors.password ? '#e53e3e' : '#e1e1e1'}`,
                borderRadius: '10px',
                fontSize: '15px',
                transition: 'all 0.3s ease',
                boxSizing: 'border-box',
                backgroundColor: errors.password ? '#fef2f2' : '#fff'
              }}
            />
            {errors.password && (
              <div style={{
                color: '#e53e3e',
                fontSize: '12px',
                marginTop: '6px',
                display: 'flex',
                alignItems: 'center',
                gap: '5px'
              }}>
                ⚠️ {errors.password}
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            style={{
              width: '100%',
              padding: '14px',
              background: isLoading ? '#9CA3AF' : '#7C2A62',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease',
              position: 'relative',
              height: '48px'
            }}
            onMouseOver={(e) => !isLoading && (e.target.style.background = '#6A2354')}
            onMouseOut={(e) => !isLoading && (e.target.style.background = '#7C2A62')}
          >
            {isLoading ? (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                <div style={{
                  width: '16px',
                  height: '16px',
                  border: '2px solid transparent',
                  borderTop: '2px solid white',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite'
                }}></div>
                Verifying Credentials...
              </div>
            ) : (
              'Access Admin Dashboard'
            )}
          </button>
        </form>

        <div style={{ 
          textAlign: 'center', 
          marginTop: '25px',
          paddingTop: '20px',
          borderTop: '1px solid #e1e1e1'
        }}>
          <p style={{ 
            color: '#666', 
            fontSize: '13px',
            margin: '0 0 15px 0',
            fontWeight: '500'
          }}>
            🔒 Single Admin Access Only
          </p>
          <button
            onClick={onSwitchToSignup}
            style={{
              background: 'none',
              border: 'none',
              color: '#7C2A62',
              cursor: 'pointer',
              fontSize: '13px',
              textDecoration: 'underline',
              fontWeight: '500'
            }}
          >
            Need admin access? Contact system administrator
          </button>
        </div>

        {/* Security notice */}
        <div style={{
          marginTop: '20px',
          padding: '12px',
          background: '#f0f9ff',
          border: '1px solid #bae6fd',
          borderRadius: '8px',
          textAlign: 'center'
        }}>
          <p style={{ 
            margin: 0, 
            color: '#0369a1', 
            fontSize: '11px',
            lineHeight: '1.4',
            fontWeight: '500'
          }}>
            🔐 Restricted Access: Only authorized personnel with valid credentials can login.
          </p>
        </div>
      </div>

      {/* CSS for spinner animation */}
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default AdminLogin;