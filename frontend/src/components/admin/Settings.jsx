import React, { useState } from 'react';

const Settings = () => {
  const primaryColor = '#7C2A62';
  const accentColor = '#F7D9EB';
  
  const [activeSection, setActiveSection] = useState('general');

  // Roles & Permissions State
  const [roles, setRoles] = useState([
    {
      id: 1,
      name: 'Admin',
      description: 'Full control over system and settings',
      isDefault: true,
      permissions: {
        users: ['read', 'write', 'create', 'delete'],
        vendors: ['read', 'write', 'create', 'delete'],
        orders: ['read', 'write', 'create', 'delete'],
        payouts: ['read', 'write', 'create', 'delete'],
        settings: ['read', 'write', 'create', 'delete'],
        prescriptions: ['read', 'write', 'create', 'delete']
      }
    },
    {
      id: 2,
      name: 'Doctor',
      description: 'Handles prescriptions and patient consultations',
      isDefault: true,
      permissions: {
        orders: ['read', 'write'],
        prescriptions: ['read', 'write', 'create', 'approve'],
        patients: ['read', 'write']
      }
    },
    {
      id: 3,
      name: 'Support Agent',
      description: 'Handles issues, refunds, customer chats',
      isDefault: true,
      permissions: {
        users: ['read'],
        orders: ['read'],
        support_tickets: ['read', 'write', 'create']
      }
    },
    {
      id: 4,
      name: 'Delivery Agent',
      description: 'Handles order delivery updates',
      isDefault: true,
      permissions: {
        orders: ['read', 'write'],
        delivery: ['read', 'write', 'update']
      }
    },
    {
      id: 5,
      name: 'Vendor / Pharmacy',
      description: 'Manages stock and processes orders',
      isDefault: true,
      permissions: {
        orders: ['read', 'write'],
        inventory: ['read', 'write', 'create'],
        products: ['read', 'write', 'create']
      }
    }
  ]);

  // General Settings State
  const [generalSettings, setGeneralSettings] = useState({
    brandName: 'QuickMed',
    supportEmail: 'support@quickmed.com',
    supportPhone: '+91 1800-123-456',
    companyAddress: '123 Business Park, Bangalore, Karnataka - 560001',
    legalName: 'QuickMed Healthcare Solutions Pvt Ltd',
    termsUrl: 'https://quickmed.app/terms',
    privacyUrl: 'https://quickmed.app/privacy',
    timezone: 'GMT+5:30',
    locale: 'en-IN',
    currency: 'INR',
    domain: 'quickmed.app'
  });

  // Notifications State
  const [notificationSettings, setNotificationSettings] = useState({
    smsEnabled: true,
    emailEnabled: true,
    pushEnabled: true,
    templates: [
      {
        id: 1,
        type: 'sms',
        name: 'Order Delivery Update',
        content: 'Your order #{order_id} is out for delivery.',
        enabled: true
      },
      {
        id: 2,
        type: 'email',
        name: 'Invoice Template',
        content: 'Your invoice and prescription have been attached.',
        enabled: true
      },
      {
        id: 3,
        type: 'push',
        name: 'Prescription Review',
        content: 'Doctor has reviewed your prescription. Approve to proceed.',
        enabled: true
      }
    ]
  });

  // Payout & Commission State
  const [payoutSettings, setPayoutSettings] = useState({
    defaultCommission: 11.5,
    calculationMethod: 'flat',
    daytimeFee: 25,
    nighttimeFee: 45,
    startDate: '2025-04-01',
    promotionalOffers: []
  });

  // Tax & Billing State
  const [taxSettings, setTaxSettings] = useState({
    taxRate: 18,
    showTaxOnReceipts: true,
    orgName: 'QuickMed',
    orgAddress: '123 Business Park, Bangalore',
    orgPhone: '+91 1800-123-456',
    footerMessage: 'Thank you for choosing QuickMed!',
    legalName: 'QuickMed Healthcare Solutions Pvt Ltd',
    gstNumber: 'GSTIN123456789',
    billingPhone: '+91 1800-123-456'
  });

  // Security & Privacy State
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorEnabled: true,
    sessionTimeout: 30,
    allowedIPs: ['192.168.1.1', '10.0.0.1'],
    passwordPolicy: {
      enabled: true,
      minLength: 8,
      requireUppercase: true,
      requireNumber: true
    },
    ssoEnabled: false,
    piiMasking: true,
    dataRetention: 365,
    auditLogs: [
      { id: 1, time: '2024-01-15 10:30:00', user: 'admin@quickmed.com', action: 'Login', ip: '192.168.1.1', result: 'Success' },
      { id: 2, time: '2024-01-15 11:15:00', user: 'doctor@quickmed.com', action: 'View Patient', ip: '10.0.0.2', result: 'Success' }
    ]
  });

  // Medical Compliance State
  const [complianceSettings, setComplianceSettings] = useState({
    doctors: [
      { id: 1, name: 'Dr. Sharma', license: 'MED12345', specialization: 'Cardiology', status: 'approved' },
      { id: 2, name: 'Dr. Patel', license: 'MED67890', specialization: 'Pediatrics', status: 'pending' }
    ],
    rxRules: {
      autoApprove: true,
      highDosageReview: true,
      restrictedMedicineReview: true,
      genericSubstitution: true,
      effectiveDate: '2024-01-01'
    },
    restrictedMedicines: [
      { id: 1, name: 'Morphine', category: 'Opioid' },
      { id: 2, name: 'Diazepam', category: 'Benzodiazepine' }
    ],
    alerts: [
      { id: 1, type: 'High Dosage', description: 'Prescription exceeds recommended dosage', status: 'pending' },
      { id: 2, type: 'License Expiry', description: 'Doctor license expiring soon', status: 'acknowledged' }
    ]
  });

  // Integrations State
  const [integrationSettings, setIntegrationSettings] = useState({
    apiKeys: [
      { id: 1, name: 'Production Key', publicKey: 'pk_live_123456', secretKey: 'sk_live_789012', created: '2024-01-01' }
    ],
    webhooks: [
      { id: 1, name: 'Order Created', url: 'https://api.example.com/webhooks/orders', enabled: true, lastDelivery: '2024-01-15 10:30:00' }
    ],
    status: {
      uptime: 99.9,
      latency: 120,
      lastIncident: 'Up'
    }
  });

  // Backups & Logs State
  const [backupSettings, setBackupSettings] = useState({
    frequency: 'daily',
    logs: [
      { id: 1, time: '2024-01-15 10:30:00', user: 'admin', action: 'Backup created', result: 'Success' },
      { id: 2, time: '2024-01-15 09:15:00', user: 'system', action: 'Database update', result: 'Success' }
    ]
  });

  // Common State
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showPermissionsModal, setShowPermissionsModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [newRole, setNewRole] = useState({
    name: '',
    description: '',
    permissions: {}
  });

  // Filter roles based on search
  const filteredRoles = roles.filter(role =>
    role.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Available modules for permissions
  const availableModules = [
    { id: 'users', name: 'Users Management' },
    { id: 'vendors', name: 'Vendors Management' },
    { id: 'orders', name: 'Orders Management' },
    { id: 'payouts', name: 'Payouts & Commission' },
    { id: 'settings', name: 'System Settings' },
    { id: 'prescriptions', name: 'Prescriptions' },
    { id: 'patients', name: 'Patients Data' },
    { id: 'support_tickets', name: 'Support Tickets' },
    { id: 'delivery', name: 'Delivery Management' },
    { id: 'inventory', name: 'Inventory Management' },
    { id: 'products', name: 'Products Management' },
    { id: 'reports', name: 'Reports & Analytics' }
  ];

  // Available permission types
  const permissionTypes = [
    { id: 'read', name: 'Read', description: 'Can view data only' },
    { id: 'write', name: 'Write/Edit', description: 'Can modify data' },
    { id: 'create', name: 'Create', description: 'Can add new data' },
    { id: 'delete', name: 'Delete', description: 'Can remove data' },
    { id: 'approve', name: 'Approve/Verify', description: 'User can authorize requests' }
  ];

  // Handle creating new role
  const handleCreateRole = () => {
    if (!newRole.name.trim()) {
      alert('Role name is required');
      return;
    }

    if (roles.some(role => role.name.toLowerCase() === newRole.name.toLowerCase())) {
      alert('Role name must be unique');
      return;
    }

    const newRoleObj = {
      id: roles.length + 1,
      name: newRole.name,
      description: newRole.description,
      isDefault: false,
      permissions: newRole.permissions
    };

    setRoles([...roles, newRoleObj]);
    setShowCreateModal(false);
    setNewRole({ name: '', description: '', permissions: {} });
    alert('Role Created Successfully');
  };

  // Handle updating role permissions
  const handleUpdatePermissions = () => {
    if (!selectedRole) return;

    const updatedRoles = roles.map(role =>
      role.id === selectedRole.id ? { ...role, permissions: selectedRole.permissions } : role
    );

    setRoles(updatedRoles);
    setShowPermissionsModal(false);
    alert('Permissions Updated Successfully');
  };

  // Handle permission toggle
  const togglePermission = (module, permission) => {
    if (!selectedRole) return;

    const updatedPermissions = { ...selectedRole.permissions };
    
    if (!updatedPermissions[module]) {
      updatedPermissions[module] = [];
    }

    if (updatedPermissions[module].includes(permission)) {
      updatedPermissions[module] = updatedPermissions[module].filter(p => p !== permission);
    } else {
      updatedPermissions[module].push(permission);
    }

    setSelectedRole({
      ...selectedRole,
      permissions: updatedPermissions
    });
  };

  // Handle delete role
  const handleDeleteRole = (roleId) => {
    const role = roles.find(r => r.id === roleId);
    if (role?.isDefault) {
      alert('Default system roles cannot be deleted');
      return;
    }

    if (window.confirm('Are you sure you want to delete this role?')) {
      setRoles(roles.filter(role => role.id !== roleId));
      alert('Role deleted successfully');
    }
  };

  // Handle settings updates
  const handleGeneralSettingsUpdate = (field, value) => {
    setGeneralSettings(prev => ({ ...prev, [field]: value }));
  };

  const handleNotificationToggle = (channel) => {
    setNotificationSettings(prev => ({
      ...prev,
      [`${channel}Enabled`]: !prev[`${channel}Enabled`]
    }));
  };

  const handlePayoutUpdate = (field, value) => {
    setPayoutSettings(prev => ({ ...prev, [field]: value }));
  };

  const handleTaxUpdate = (field, value) => {
    setTaxSettings(prev => ({ ...prev, [field]: value }));
  };

  const handleSecurityUpdate = (field, value) => {
    setSecuritySettings(prev => ({ ...prev, [field]: value }));
  };

  // Handle saving general settings
  const handleSaveGeneralSettings = () => {
    alert('General settings saved successfully!');
  };

  // Handle saving notification settings
  const handleSaveNotificationSettings = () => {
    alert('Notification settings saved successfully!');
  };

  // Handle updating payout rates
  const handleUpdatePayoutRates = () => {
    alert('Payout rates updated successfully!');
  };

  // Handle saving tax settings
  const handleSaveTaxSettings = () => {
    alert('Tax settings saved successfully!');
  };

  // Handle saving security configuration
  const handleSaveSecurityConfiguration = () => {
    alert('Security configuration saved successfully!');
  };

  // Handle saving compliance rules
  const handleSaveComplianceRules = () => {
    alert('Compliance rules saved successfully!');
  };

  // Handle template actions
  const handlePreviewTemplate = (templateId) => {
    alert(`Previewing template ${templateId}`);
  };

  const handleEditTemplate = (templateId) => {
    alert(`Editing template ${templateId}`);
  };

  // Handle doctor actions
  const handleApproveDoctor = (doctorId) => {
    const updatedDoctors = complianceSettings.doctors.map(doctor =>
      doctor.id === doctorId ? { ...doctor, status: 'approved' } : doctor
    );
    setComplianceSettings(prev => ({ ...prev, doctors: updatedDoctors }));
    alert(`Doctor ${doctorId} approved successfully!`);
  };

  const handleRejectDoctor = (doctorId) => {
    const updatedDoctors = complianceSettings.doctors.map(doctor =>
      doctor.id === doctorId ? { ...doctor, status: 'rejected' } : doctor
    );
    setComplianceSettings(prev => ({ ...prev, doctors: updatedDoctors }));
    alert(`Doctor ${doctorId} rejected!`);
  };

  // Handle API key actions
  const handleViewSecret = (apiKeyId) => {
    alert(`Viewing secret for API key ${apiKeyId}`);
  };

  const handleRotateApiKey = (apiKeyId) => {
    alert(`Rotating API key ${apiKeyId}`);
  };

  const handleGenerateApiKey = () => {
    alert('Generating new API key');
  };

  // Handle backup actions
  const handleDownloadBackup = () => {
    alert('Downloading backup...');
  };

  const sections = [
    { id: 'general', name: 'General Settings', icon: '⚙️' },
    { id: 'roles', name: 'Roles & Permissions', icon: '👥' },
    { id: 'notifications', name: 'Notifications', icon: '🔔' },
    { id: 'payout', name: 'Payout & Commission', icon: '💰' },
    { id: 'tax', name: 'Tax & Billing', icon: '🧾' },
    { id: 'security', name: 'Security & Privacy', icon: '🔒' },
    { id: 'compliance', name: 'Medical Compliance', icon: '🏥' },
    { id: 'integrations', name: 'Integrations', icon: '🔗' },
    { id: 'backups', name: 'Backups & Logs', icon: '💾' }
  ];

  const renderSection = () => {
    switch (activeSection) {
      case 'general':
        return (
          <div>
            <h3 style={{ color: primaryColor, marginBottom: '20px' }}>General Settings</h3>
            <div style={{ display: 'grid', gap: '20px' }}>
              {/* Organization Branding */}
              <div style={{
                backgroundColor: 'white',
                padding: '20px',
                borderRadius: '8px',
                border: `1px solid ${accentColor}`
              }}>
                <h4 style={{ color: primaryColor, marginBottom: '15px' }}>Organization Branding</h4>
                <div style={{ display: 'grid', gap: '15px' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Upload Logo</label>
                    <input type="file" style={{ padding: '8px', border: `1px solid ${accentColor}`, borderRadius: '5px', width: '100%' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Upload Banner</label>
                    <input type="file" style={{ padding: '8px', border: `1px solid ${accentColor}`, borderRadius: '5px', width: '100%' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Brand Name</label>
                    <input 
                      type="text" 
                      value={generalSettings.brandName}
                      onChange={(e) => handleGeneralSettingsUpdate('brandName', e.target.value)}
                      style={{ padding: '8px', border: `1px solid ${accentColor}`, borderRadius: '5px', width: '100%' }} 
                    />
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div style={{
                backgroundColor: 'white',
                padding: '20px',
                borderRadius: '8px',
                border: `1px solid ${accentColor}`
              }}>
                <h4 style={{ color: primaryColor, marginBottom: '15px' }}>Contact Information</h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Support Email</label>
                    <input 
                      type="email" 
                      value={generalSettings.supportEmail}
                      onChange={(e) => handleGeneralSettingsUpdate('supportEmail', e.target.value)}
                      style={{ padding: '8px', border: `1px solid ${accentColor}`, borderRadius: '5px', width: '100%' }} 
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Support Phone</label>
                    <input 
                      type="tel" 
                      value={generalSettings.supportPhone}
                      onChange={(e) => handleGeneralSettingsUpdate('supportPhone', e.target.value)}
                      style={{ padding: '8px', border: `1px solid ${accentColor}`, borderRadius: '5px', width: '100%' }} 
                    />
                  </div>
                  <div style={{ gridColumn: '1 / -1' }}>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Company Address</label>
                    <textarea 
                      value={generalSettings.companyAddress}
                      onChange={(e) => handleGeneralSettingsUpdate('companyAddress', e.target.value)}
                      style={{ padding: '8px', border: `1px solid ${accentColor}`, borderRadius: '5px', width: '100%', minHeight: '60px' }} 
                    />
                  </div>
                  <div style={{ gridColumn: '1 / -1' }}>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Legal Name</label>
                    <input 
                      type="text" 
                      value={generalSettings.legalName}
                      onChange={(e) => handleGeneralSettingsUpdate('legalName', e.target.value)}
                      style={{ padding: '8px', border: `1px solid ${accentColor}`, borderRadius: '5px', width: '100%' }} 
                    />
                  </div>
                </div>
              </div>

              {/* Legal Policy Links */}
              <div style={{
                backgroundColor: 'white',
                padding: '20px',
                borderRadius: '8px',
                border: `1px solid ${accentColor}`
              }}>
                <h4 style={{ color: primaryColor, marginBottom: '15px' }}>Legal Policy Links</h4>
                <div style={{ display: 'grid', gap: '15px' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Terms of Service URL</label>
                    <input 
                      type="url" 
                      value={generalSettings.termsUrl}
                      onChange={(e) => handleGeneralSettingsUpdate('termsUrl', e.target.value)}
                      style={{ padding: '8px', border: `1px solid ${accentColor}`, borderRadius: '5px', width: '100%' }} 
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Privacy Policy URL</label>
                    <input 
                      type="url" 
                      value={generalSettings.privacyUrl}
                      onChange={(e) => handleGeneralSettingsUpdate('privacyUrl', e.target.value)}
                      style={{ padding: '8px', border: `1px solid ${accentColor}`, borderRadius: '5px', width: '100%' }} 
                    />
                  </div>
                </div>
              </div>

              {/* Localization */}
              <div style={{
                backgroundColor: 'white',
                padding: '20px',
                borderRadius: '8px',
                border: `1px solid ${accentColor}`
              }}>
                <h4 style={{ color: primaryColor, marginBottom: '15px' }}>Localization Settings</h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Timezone</label>
                    <select 
                      value={generalSettings.timezone}
                      onChange={(e) => handleGeneralSettingsUpdate('timezone', e.target.value)}
                      style={{ padding: '8px', border: `1px solid ${accentColor}`, borderRadius: '5px', width: '100%' }}
                    >
                      <option value="GMT+5:30">GMT+5:30 (India)</option>
                      <option value="GMT+0">GMT+0 (UTC)</option>
                      <option value="GMT-5">GMT-5 (EST)</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Locale</label>
                    <select 
                      value={generalSettings.locale}
                      onChange={(e) => handleGeneralSettingsUpdate('locale', e.target.value)}
                      style={{ padding: '8px', border: `1px solid ${accentColor}`, borderRadius: '5px', width: '100%' }}
                    >
                      <option value="en-IN">English (India)</option>
                      <option value="en-US">English (US)</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Currency</label>
                    <select 
                      value={generalSettings.currency}
                      onChange={(e) => handleGeneralSettingsUpdate('currency', e.target.value)}
                      style={{ padding: '8px', border: `1px solid ${accentColor}`, borderRadius: '5px', width: '100%' }}
                    >
                      <option value="INR">INR ₹</option>
                      <option value="USD">USD $</option>
                      <option value="EUR">EUR €</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Domain Name</label>
                    <input 
                      type="text" 
                      value={generalSettings.domain}
                      onChange={(e) => handleGeneralSettingsUpdate('domain', e.target.value)}
                      style={{ padding: '8px', border: `1px solid ${accentColor}`, borderRadius: '5px', width: '100%' }} 
                    />
                  </div>
                </div>
              </div>

              <button 
                onClick={handleSaveGeneralSettings}
                style={{
                  padding: '12px 30px',
                  backgroundColor: primaryColor,
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#6a2352';
                  e.target.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = primaryColor;
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                Save Changes
              </button>
            </div>
          </div>
        );

      case 'roles':
        return (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ color: primaryColor, margin: 0 }}>Roles & Permissions</h3>
              <button
                onClick={() => setShowCreateModal(true)}
                style={{
                  padding: '10px 20px',
                  backgroundColor: primaryColor,
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#6a2352';
                  e.target.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = primaryColor;
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                + New Role
              </button>
            </div>

            {/* Search Bar */}
            <div style={{ marginBottom: '20px' }}>
              <input
                type="text"
                placeholder="Search roles by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  padding: '10px',
                  border: `1px solid ${accentColor}`,
                  borderRadius: '5px',
                  width: '100%',
                  maxWidth: '400px',
                  transition: 'all 0.3s ease'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = primaryColor;
                  e.target.style.boxShadow = `0 0 0 2px ${accentColor}`;
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = accentColor;
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>

            {/* Roles List */}
            <div style={{
              backgroundColor: 'white',
              borderRadius: '8px',
              border: `1px solid ${accentColor}`,
              overflow: 'hidden'
            }}>
              {filteredRoles.map(role => (
                <div
                  key={role.id}
                  style={{
                    padding: '15px 20px',
                    borderBottom: `1px solid ${accentColor}`,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#f9f9f9';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'white';
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <h4 style={{ margin: 0, color: primaryColor }}>{role.name}</h4>
                      {role.isDefault && (
                        <span style={{
                          fontSize: '12px',
                          backgroundColor: accentColor,
                          color: primaryColor,
                          padding: '2px 8px',
                          borderRadius: '10px'
                        }}>
                          Default
                        </span>
                      )}
                    </div>
                    <p style={{ margin: '5px 0 0 0', color: '#666', fontSize: '14px' }}>
                      {role.description}
                    </p>
                  </div>
                  
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button
                      onClick={() => {
                        setSelectedRole({ ...role });
                        setShowPermissionsModal(true);
                      }}
                      style={{
                        padding: '8px 15px',
                        backgroundColor: 'transparent',
                        color: primaryColor,
                        border: `1px solid ${primaryColor}`,
                        borderRadius: '5px',
                        cursor: 'pointer',
                        fontSize: '14px',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = primaryColor;
                        e.target.style.color = 'white';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = 'transparent';
                        e.target.style.color = primaryColor;
                      }}
                    >
                      View Permissions
                    </button>
                    
                    {!role.isDefault && (
                      <button
                        onClick={() => handleDeleteRole(role.id)}
                        style={{
                          padding: '8px 15px',
                          backgroundColor: '#ff4444',
                          color: 'white',
                          border: 'none',
                          borderRadius: '5px',
                          cursor: 'pointer',
                          fontSize: '14px',
                          transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor = '#cc0000';
                          e.target.style.transform = 'translateY(-1px)';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor = '#ff4444';
                          e.target.style.transform = 'translateY(0)';
                        }}
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Create Role Modal */}
            {showCreateModal && (
              <div style={{
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
              }}>
                <div style={{
                  backgroundColor: 'white',
                  padding: '30px',
                  borderRadius: '8px',
                  width: '90%',
                  maxWidth: '500px',
                  maxHeight: '80vh',
                  overflow: 'auto'
                }}>
                  <h3 style={{ color: primaryColor, marginBottom: '20px' }}>Create New Role</h3>
                  
                  <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                      Role Name *
                    </label>
                    <input
                      type="text"
                      value={newRole.name}
                      onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
                      style={{
                        padding: '8px',
                        border: `1px solid ${accentColor}`,
                        borderRadius: '5px',
                        width: '100%',
                        transition: 'all 0.3s ease'
                      }}
                      placeholder="Enter role name"
                      onFocus={(e) => {
                        e.target.style.borderColor = primaryColor;
                        e.target.style.boxShadow = `0 0 0 2px ${accentColor}`;
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = accentColor;
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                  </div>

                  <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                      Description
                    </label>
                    <textarea
                      value={newRole.description}
                      onChange={(e) => setNewRole({ ...newRole, description: e.target.value })}
                      style={{
                        padding: '8px',
                        border: `1px solid ${accentColor}`,
                        borderRadius: '5px',
                        width: '100%',
                        minHeight: '80px',
                        transition: 'all 0.3s ease'
                      }}
                      placeholder="Enter role description"
                      onFocus={(e) => {
                        e.target.style.borderColor = primaryColor;
                        e.target.style.boxShadow = `0 0 0 2px ${accentColor}`;
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = accentColor;
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                  </div>

                  <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '20px' }}>
                    <button
                      onClick={() => setShowCreateModal(false)}
                      style={{
                        padding: '10px 20px',
                        backgroundColor: 'transparent',
                        color: '#666',
                        border: `1px solid #ccc`,
                        borderRadius: '5px',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = '#f5f5f5';
                        e.target.style.color = '#333';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = 'transparent';
                        e.target.style.color = '#666';
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleCreateRole}
                      style={{
                        padding: '10px 20px',
                        backgroundColor: primaryColor,
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = '#6a2352';
                        e.target.style.transform = 'translateY(-2px)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = primaryColor;
                        e.target.style.transform = 'translateY(0)';
                      }}
                    >
                      Create Role
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Permissions Modal */}
            {showPermissionsModal && selectedRole && (
              <div style={{
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
              }}>
                <div style={{
                  backgroundColor: 'white',
                  padding: '30px',
                  borderRadius: '8px',
                  width: '90%',
                  maxWidth: '800px',
                  maxHeight: '80vh',
                  overflow: 'auto'
                }}>
                  <h3 style={{ color: primaryColor, marginBottom: '20px' }}>
                    Permissions for {selectedRole.name}
                  </h3>

                  <div style={{ marginBottom: '20px' }}>
                    <h4 style={{ marginBottom: '15px' }}>Available Modules & Permissions</h4>
                    <div style={{ display: 'grid', gap: '15px' }}>
                      {availableModules.map(module => (
                        <div key={module.id} style={{
                          border: `1px solid ${accentColor}`,
                          borderRadius: '5px',
                          padding: '15px',
                          transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = primaryColor;
                          e.currentTarget.style.boxShadow = `0 2px 8px rgba(124, 42, 98, 0.1)`;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = accentColor;
                          e.currentTarget.style.boxShadow = 'none';
                        }}
                        >
                          <h5 style={{ margin: '0 0 10px 0', color: primaryColor }}>
                            {module.name}
                          </h5>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                            {permissionTypes.map(permission => (
                              <label
                                key={permission.id}
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '5px',
                                  cursor: selectedRole.isDefault ? 'not-allowed' : 'pointer',
                                  opacity: selectedRole.isDefault ? 0.6 : 1,
                                  padding: '5px 10px',
                                  borderRadius: '3px',
                                  transition: 'all 0.3s ease'
                                }}
                                onMouseEnter={(e) => {
                                  if (!selectedRole.isDefault) {
                                    e.currentTarget.style.backgroundColor = accentColor;
                                  }
                                }}
                                onMouseLeave={(e) => {
                                  if (!selectedRole.isDefault) {
                                    e.currentTarget.style.backgroundColor = 'transparent';
                                  }
                                }}
                              >
                                <input
                                  type="checkbox"
                                  checked={selectedRole.permissions[module.id]?.includes(permission.id) || false}
                                  onChange={() => !selectedRole.isDefault && togglePermission(module.id, permission.id)}
                                  disabled={selectedRole.isDefault}
                                  style={{ cursor: selectedRole.isDefault ? 'not-allowed' : 'pointer' }}
                                />
                                <span>{permission.name}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {selectedRole.isDefault && (
                    <div style={{
                      backgroundColor: '#fff3cd',
                      border: '1px solid #ffeaa7',
                      borderRadius: '5px',
                      padding: '10px',
                      marginBottom: '15px',
                      fontSize: '14px'
                    }}>
                      ⚠️ Default system roles permissions cannot be modified
                    </div>
                  )}

                  <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                    <button
                      onClick={() => setShowPermissionsModal(false)}
                      style={{
                        padding: '10px 20px',
                        backgroundColor: 'transparent',
                        color: '#666',
                        border: `1px solid #ccc`,
                        borderRadius: '5px',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = '#f5f5f5';
                        e.target.style.color = '#333';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = 'transparent';
                        e.target.style.color = '#666';
                      }}
                    >
                      Close
                    </button>
                    {!selectedRole.isDefault && (
                      <button
                        onClick={handleUpdatePermissions}
                        style={{
                          padding: '10px 20px',
                          backgroundColor: primaryColor,
                          color: 'white',
                          border: 'none',
                          borderRadius: '5px',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor = '#6a2352';
                          e.target.style.transform = 'translateY(-2px)';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor = primaryColor;
                          e.target.style.transform = 'translateY(0)';
                        }}
                      >
                        Update Permissions
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      case 'notifications':
        return (
          <div>
            <h3 style={{ color: primaryColor, marginBottom: '20px' }}>Notifications</h3>
            <div style={{ display: 'grid', gap: '20px' }}>
              {/* Notification Channels */}
              <div style={{
                backgroundColor: 'white',
                padding: '20px',
                borderRadius: '8px',
                border: `1px solid ${accentColor}`
              }}>
                <h4 style={{ color: primaryColor, marginBottom: '15px' }}>Notification Channels</h4>
                <div style={{ display: 'grid', gap: '15px' }}>
                  {['sms', 'email', 'push'].map(channel => (
                    <div key={channel} style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center',
                      padding: '15px',
                      border: `1px solid ${accentColor}`,
                      borderRadius: '5px',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = primaryColor;
                      e.currentTarget.style.boxShadow = `0 2px 8px rgba(124, 42, 98, 0.1)`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = accentColor;
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                    >
                      <div>
                        <div style={{ fontWeight: 'bold', textTransform: 'capitalize' }}>
                          {channel} Notifications
                        </div>
                        <div style={{ fontSize: '14px', color: '#666' }}>
                          {channel === 'sms' && 'SMS service provider-based notifications'}
                          {channel === 'email' && 'Email notifications through SMTP/API'}
                          {channel === 'push' && 'Push messages sent to mobile app'}
                        </div>
                      </div>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                        <input
                          type="checkbox"
                          checked={notificationSettings[`${channel}Enabled`]}
                          onChange={() => handleNotificationToggle(channel)}
                          style={{ transform: 'scale(1.2)' }}
                        />
                        <span>{notificationSettings[`${channel}Enabled`] ? 'Enabled' : 'Disabled'}</span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Notification Templates */}
              <div style={{
                backgroundColor: 'white',
                padding: '20px',
                borderRadius: '8px',
                border: `1px solid ${accentColor}`
              }}>
                <h4 style={{ color: primaryColor, marginBottom: '15px' }}>Notification Templates</h4>
                <div style={{ display: 'grid', gap: '15px' }}>
                  {notificationSettings.templates.map(template => (
                    <div key={template.id} style={{
                      border: `1px solid ${accentColor}`,
                      borderRadius: '5px',
                      padding: '15px',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = primaryColor;
                      e.currentTarget.style.boxShadow = `0 2px 8px rgba(124, 42, 98, 0.1)`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = accentColor;
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '10px' }}>
                        <div>
                          <div style={{ fontWeight: 'bold', textTransform: 'capitalize' }}>
                            {template.type} - {template.name}
                          </div>
                          <div style={{ fontSize: '14px', color: '#666', marginTop: '5px' }}>
                            {template.content}
                          </div>
                        </div>
                        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                          <button 
                            onClick={() => handlePreviewTemplate(template.id)}
                            style={{
                              padding: '5px 10px',
                              backgroundColor: 'transparent',
                              color: primaryColor,
                              border: `1px solid ${primaryColor}`,
                              borderRadius: '3px',
                              cursor: 'pointer',
                              fontSize: '12px',
                              transition: 'all 0.3s ease'
                            }}
                            onMouseEnter={(e) => {
                              e.target.style.backgroundColor = primaryColor;
                              e.target.style.color = 'white';
                            }}
                            onMouseLeave={(e) => {
                              e.target.style.backgroundColor = 'transparent';
                              e.target.style.color = primaryColor;
                            }}
                          >
                            Preview
                          </button>
                          <button 
                            onClick={() => handleEditTemplate(template.id)}
                            style={{
                              padding: '5px 10px',
                              backgroundColor: primaryColor,
                              color: 'white',
                              border: 'none',
                              borderRadius: '3px',
                              cursor: 'pointer',
                              fontSize: '12px',
                              transition: 'all 0.3s ease'
                            }}
                            onMouseEnter={(e) => {
                              e.target.style.backgroundColor = '#6a2352';
                              e.target.style.transform = 'translateY(-1px)';
                            }}
                            onMouseLeave={(e) => {
                              e.target.style.backgroundColor = primaryColor;
                              e.target.style.transform = 'translateY(0)';
                            }}
                          >
                            Edit
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button 
                onClick={handleSaveNotificationSettings}
                style={{
                  padding: '12px 30px',
                  backgroundColor: primaryColor,
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#6a2352';
                  e.target.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = primaryColor;
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                Save Changes
              </button>
            </div>
          </div>
        );

      case 'payout':
        return (
          <div>
            <h3 style={{ color: primaryColor, marginBottom: '20px' }}>Payout & Commission</h3>
            <div style={{ display: 'grid', gap: '20px' }}>
              {/* Vendor Commission */}
              <div style={{
                backgroundColor: 'white',
                padding: '20px',
                borderRadius: '8px',
                border: `1px solid ${accentColor}`
              }}>
                <h4 style={{ color: primaryColor, marginBottom: '15px' }}>Vendor Commission</h4>
                <div style={{ display: 'grid', gap: '15px' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                      Default Commission Percentage
                    </label>
                    <input
                      type="number"
                      value={payoutSettings.defaultCommission}
                      onChange={(e) => handlePayoutUpdate('defaultCommission', parseFloat(e.target.value))}
                      min="0"
                      max="100"
                      step="0.1"
                      style={{ 
                        padding: '8px', 
                        border: `1px solid ${accentColor}`, 
                        borderRadius: '5px', 
                        width: '100%', 
                        maxWidth: '200px',
                        transition: 'all 0.3s ease'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = primaryColor;
                        e.target.style.boxShadow = `0 0 0 2px ${accentColor}`;
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = accentColor;
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                    <div style={{ fontSize: '14px', color: '#666', marginTop: '5px' }}>
                      Percentage of order amount taken by platform
                    </div>
                  </div>
                </div>
              </div>

              {/* Delivery Agent Fees */}
              <div style={{
                backgroundColor: 'white',
                padding: '20px',
                borderRadius: '8px',
                border: `1px solid ${accentColor}`
              }}>
                <h4 style={{ color: primaryColor, marginBottom: '15px' }}>Delivery Agent Fee Structure</h4>
                <div style={{ display: 'grid', gap: '15px' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                      Calculation Method
                    </label>
                    <select
                      value={payoutSettings.calculationMethod}
                      onChange={(e) => handlePayoutUpdate('calculationMethod', e.target.value)}
                      style={{ 
                        padding: '8px', 
                        border: `1px solid ${accentColor}`, 
                        borderRadius: '5px', 
                        width: '100%', 
                        maxWidth: '200px',
                        transition: 'all 0.3s ease'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = primaryColor;
                        e.target.style.boxShadow = `0 0 0 2px ${accentColor}`;
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = accentColor;
                        e.target.style.boxShadow = 'none';
                      }}
                    >
                      <option value="flat">Flat Fee</option>
                      <option value="distance">Distance Based</option>
                    </select>
                  </div>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                    <div>
                      <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Daytime Fee (₹)</label>
                      <input
                        type="number"
                        value={payoutSettings.daytimeFee}
                        onChange={(e) => handlePayoutUpdate('daytimeFee', parseInt(e.target.value))}
                        min="0"
                        style={{ 
                          padding: '8px', 
                          border: `1px solid ${accentColor}`, 
                          borderRadius: '5px', 
                          width: '100%',
                          transition: 'all 0.3s ease'
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = primaryColor;
                          e.target.style.boxShadow = `0 0 0 2px ${accentColor}`;
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = accentColor;
                          e.target.style.boxShadow = 'none';
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Nighttime Fee (₹)</label>
                      <input
                        type="number"
                        value={payoutSettings.nighttimeFee}
                        onChange={(e) => handlePayoutUpdate('nighttimeFee', parseInt(e.target.value))}
                        min="0"
                        style={{ 
                          padding: '8px', 
                          border: `1px solid ${accentColor}`, 
                          borderRadius: '5px', 
                          width: '100%',
                          transition: 'all 0.3s ease'
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = primaryColor;
                          e.target.style.boxShadow = `0 0 0 2px ${accentColor}`;
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = accentColor;
                          e.target.style.boxShadow = 'none';
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Effective Date */}
              <div style={{
                backgroundColor: 'white',
                padding: '20px',
                borderRadius: '8px',
                border: `1px solid ${accentColor}`
              }}>
                <h4 style={{ color: primaryColor, marginBottom: '15px' }}>Effective Date</h4>
                <div>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                    Settlement Start Date
                  </label>
                  <input
                    type="date"
                    value={payoutSettings.startDate}
                    onChange={(e) => handlePayoutUpdate('startDate', e.target.value)}
                    style={{ 
                      padding: '8px', 
                      border: `1px solid ${accentColor}`, 
                      borderRadius: '5px', 
                      width: '100%', 
                      maxWidth: '200px',
                      transition: 'all 0.3s ease'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = primaryColor;
                      e.target.style.boxShadow = `0 0 0 2px ${accentColor}`;
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = accentColor;
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                  <div style={{ fontSize: '14px', color: '#666', marginTop: '5px' }}>
                    New rules effective from this date
                  </div>
                </div>
              </div>

              <button 
                onClick={handleUpdatePayoutRates}
                style={{
                  padding: '12px 30px',
                  backgroundColor: primaryColor,
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#6a2352';
                  e.target.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = primaryColor;
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                Update Rates
              </button>
            </div>
          </div>
        );

      case 'tax':
        return (
          <div>
            <h3 style={{ color: primaryColor, marginBottom: '20px' }}>Tax & Billing</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              {/* Left Column - Tax Settings & Organization Info */}
              <div style={{ display: 'grid', gap: '20px' }}>
                {/* Tax Settings */}
                <div style={{
                  backgroundColor: 'white',
                  padding: '20px',
                  borderRadius: '8px',
                  border: `1px solid ${accentColor}`
                }}>
                  <h4 style={{ color: primaryColor, marginBottom: '15px' }}>Tax Settings</h4>
                  <div style={{ display: 'grid', gap: '15px' }}>
                    <div>
                      <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                        GST / VAT / Sales Tax Rate (%)
                      </label>
                      <input
                        type="number"
                        value={taxSettings.taxRate}
                        onChange={(e) => handleTaxUpdate('taxRate', parseInt(e.target.value))}
                        min="0"
                        max="100"
                        style={{ 
                          padding: '8px', 
                          border: `1px solid ${accentColor}`, 
                          borderRadius: '5px', 
                          width: '100%',
                          transition: 'all 0.3s ease'
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = primaryColor;
                          e.target.style.boxShadow = `0 0 0 2px ${accentColor}`;
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = accentColor;
                          e.target.style.boxShadow = 'none';
                        }}
                      />
                    </div>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                      <input
                        type="checkbox"
                        checked={taxSettings.showTaxOnReceipts}
                        onChange={(e) => handleTaxUpdate('showTaxOnReceipts', e.target.checked)}
                        style={{ transform: 'scale(1.2)' }}
                      />
                      <span>Include Tax on User Receipts</span>
                    </label>
                  </div>
                </div>

                {/* Billing Organization Information */}
                <div style={{
                  backgroundColor: 'white',
                  padding: '20px',
                  borderRadius: '8px',
                  border: `1px solid ${accentColor}`
                }}>
                  <h4 style={{ color: primaryColor, marginBottom: '15px' }}>Billing Organization Information</h4>
                  <div style={{ display: 'grid', gap: '15px' }}>
                    <div>
                      <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Organization Name</label>
                      <input
                        type="text"
                        value={taxSettings.orgName}
                        onChange={(e) => handleTaxUpdate('orgName', e.target.value)}
                        style={{ 
                          padding: '8px', 
                          border: `1px solid ${accentColor}`, 
                          borderRadius: '5px', 
                          width: '100%',
                          transition: 'all 0.3s ease'
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = primaryColor;
                          e.target.style.boxShadow = `0 0 0 2px ${accentColor}`;
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = accentColor;
                          e.target.style.boxShadow = 'none';
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Address</label>
                      <textarea
                        value={taxSettings.orgAddress}
                        onChange={(e) => handleTaxUpdate('orgAddress', e.target.value)}
                        style={{ 
                          padding: '8px', 
                          border: `1px solid ${accentColor}`, 
                          borderRadius: '5px', 
                          width: '100%', 
                          minHeight: '60px',
                          transition: 'all 0.3s ease'
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = primaryColor;
                          e.target.style.boxShadow = `0 0 0 2px ${accentColor}`;
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = accentColor;
                          e.target.style.boxShadow = 'none';
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Phone Number</label>
                      <input
                        type="tel"
                        value={taxSettings.orgPhone}
                        onChange={(e) => handleTaxUpdate('orgPhone', e.target.value)}
                        style={{ 
                          padding: '8px', 
                          border: `1px solid ${accentColor}`, 
                          borderRadius: '5px', 
                          width: '100%',
                          transition: 'all 0.3s ease'
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = primaryColor;
                          e.target.style.boxShadow = `0 0 0 2px ${accentColor}`;
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = accentColor;
                          e.target.style.boxShadow = 'none';
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Invoice Settings */}
              <div style={{ display: 'grid', gap: '20px' }}>
                {/* Invoice Footer Message */}
                <div style={{
                  backgroundColor: 'white',
                  padding: '20px',
                  borderRadius: '8px',
                  border: `1px solid ${accentColor}`
                }}>
                  <h4 style={{ color: primaryColor, marginBottom: '15px' }}>Invoice Footer Message</h4>
                  <textarea
                    value={taxSettings.footerMessage}
                    onChange={(e) => handleTaxUpdate('footerMessage', e.target.value)}
                    style={{ 
                      padding: '8px', 
                      border: `1px solid ${accentColor}`, 
                      borderRadius: '5px', 
                      width: '100%', 
                      minHeight: '80px',
                      transition: 'all 0.3s ease'
                    }}
                    placeholder="Enter custom footer message for invoices..."
                    onFocus={(e) => {
                      e.target.style.borderColor = primaryColor;
                      e.target.style.boxShadow = `0 0 0 2px ${accentColor}`;
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = accentColor;
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </div>

                {/* Billing Organization Legal Info */}
                <div style={{
                  backgroundColor: 'white',
                  padding: '20px',
                  borderRadius: '8px',
                  border: `1px solid ${accentColor}`
                }}>
                  <h4 style={{ color: primaryColor, marginBottom: '15px' }}>Legal Information</h4>
                  <div style={{ display: 'grid', gap: '15px' }}>
                    <div>
                      <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Legal Name</label>
                      <input
                        type="text"
                        value={taxSettings.legalName}
                        onChange={(e) => handleTaxUpdate('legalName', e.target.value)}
                        style={{ 
                          padding: '8px', 
                          border: `1px solid ${accentColor}`, 
                          borderRadius: '5px', 
                          width: '100%',
                          transition: 'all 0.3s ease'
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = primaryColor;
                          e.target.style.boxShadow = `0 0 0 2px ${accentColor}`;
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = accentColor;
                          e.target.style.boxShadow = 'none';
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>GST / VAT ID</label>
                      <input
                        type="text"
                        value={taxSettings.gstNumber}
                        onChange={(e) => handleTaxUpdate('gstNumber', e.target.value)}
                        style={{ 
                          padding: '8px', 
                          border: `1px solid ${accentColor}`, 
                          borderRadius: '5px', 
                          width: '100%',
                          transition: 'all 0.3s ease'
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = primaryColor;
                          e.target.style.boxShadow = `0 0 0 2px ${accentColor}`;
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = accentColor;
                          e.target.style.boxShadow = 'none';
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Billing Phone</label>
                      <input
                        type="tel"
                        value={taxSettings.billingPhone}
                        onChange={(e) => handleTaxUpdate('billingPhone', e.target.value)}
                        style={{ 
                          padding: '8px', 
                          border: `1px solid ${accentColor}`, 
                          borderRadius: '5px', 
                          width: '100%',
                          transition: 'all 0.3s ease'
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = primaryColor;
                          e.target.style.boxShadow = `0 0 0 2px ${accentColor}`;
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = accentColor;
                          e.target.style.boxShadow = 'none';
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <button 
              onClick={handleSaveTaxSettings}
              style={{
                padding: '12px 30px',
                backgroundColor: primaryColor,
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: 'bold',
                marginTop: '20px',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#6a2352';
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = primaryColor;
                e.target.style.transform = 'translateY(0)';
              }}
            >
              Save Changes
            </button>
          </div>
        );

      case 'security':
        return (
          <div>
            <h3 style={{ color: primaryColor, marginBottom: '20px' }}>Security & Privacy</h3>
            <div style={{ display: 'grid', gap: '20px' }}>
              {/* Login Security */}
              <div style={{
                backgroundColor: 'white',
                padding: '20px',
                borderRadius: '8px',
                border: `1px solid ${accentColor}`
              }}>
                <h4 style={{ color: primaryColor, marginBottom: '15px' }}>Login Security</h4>
                <div style={{ display: 'grid', gap: '15px' }}>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    padding: '15px',
                    border: `1px solid ${accentColor}`,
                    borderRadius: '5px',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = primaryColor;
                    e.currentTarget.style.boxShadow = `0 2px 8px rgba(124, 42, 98, 0.1)`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = accentColor;
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                  >
                    <div>
                      <div style={{ fontWeight: 'bold' }}>Two-Factor Authentication (2FA)</div>
                      <div style={{ fontSize: '14px', color: '#666' }}>Enable 2FA for all user accounts</div>
                    </div>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                      <input
                        type="checkbox"
                        checked={securitySettings.twoFactorEnabled}
                        onChange={(e) => handleSecurityUpdate('twoFactorEnabled', e.target.checked)}
                        style={{ transform: 'scale(1.2)' }}
                      />
                    </label>
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Session Timeout (minutes)</label>
                    <select
                      value={securitySettings.sessionTimeout}
                      onChange={(e) => handleSecurityUpdate('sessionTimeout', parseInt(e.target.value))}
                      style={{ 
                        padding: '8px', 
                        border: `1px solid ${accentColor}`, 
                        borderRadius: '5px', 
                        width: '100%', 
                        maxWidth: '200px',
                        transition: 'all 0.3s ease'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = primaryColor;
                        e.target.style.boxShadow = `0 0 0 2px ${accentColor}`;
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = accentColor;
                        e.target.style.boxShadow = 'none';
                      }}
                    >
                      <option value={15}>15 minutes</option>
                      <option value={30}>30 minutes</option>
                      <option value={60}>60 minutes</option>
                    </select>
                  </div>

                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    padding: '15px',
                    border: `1px solid ${accentColor}`,
                    borderRadius: '5px',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = primaryColor;
                    e.currentTarget.style.boxShadow = `0 2px 8px rgba(124, 42, 98, 0.1)`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = accentColor;
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                  >
                    <div>
                      <div style={{ fontWeight: 'bold' }}>Password Policy Enforcement</div>
                      <div style={{ fontSize: '14px', color: '#666' }}>Require strong passwords</div>
                    </div>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                      <input
                        type="checkbox"
                        checked={securitySettings.passwordPolicy.enabled}
                        onChange={(e) => handleSecurityUpdate('passwordPolicy', { ...securitySettings.passwordPolicy, enabled: e.target.checked })}
                        style={{ transform: 'scale(1.2)' }}
                      />
                    </label>
                  </div>
                </div>
              </div>

              {/* Data Protection */}
              <div style={{
                backgroundColor: 'white',
                padding: '20px',
                borderRadius: '8px',
                border: `1px solid ${accentColor}`
              }}>
                <h4 style={{ color: primaryColor, marginBottom: '15px' }}>Data Protection</h4>
                <div style={{ display: 'grid', gap: '15px' }}>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    padding: '15px',
                    border: `1px solid ${accentColor}`,
                    borderRadius: '5px',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = primaryColor;
                    e.currentTarget.style.boxShadow = `0 2px 8px rgba(124, 42, 98, 0.1)`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = accentColor;
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                  >
                    <div>
                      <div style={{ fontWeight: 'bold' }}>PII Masking</div>
                      <div style={{ fontSize: '14px', color: '#666' }}>Mask personally identifiable information</div>
                    </div>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                      <input
                        type="checkbox"
                        checked={securitySettings.piiMasking}
                        onChange={(e) => handleSecurityUpdate('piiMasking', e.target.checked)}
                        style={{ transform: 'scale(1.2)' }}
                      />
                    </label>
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Data Retention (days)</label>
                    <input
                      type="number"
                      value={securitySettings.dataRetention}
                      onChange={(e) => handleSecurityUpdate('dataRetention', parseInt(e.target.value))}
                      min="30"
                      style={{ 
                        padding: '8px', 
                        border: `1px solid ${accentColor}`, 
                        borderRadius: '5px', 
                        width: '100%', 
                        maxWidth: '200px',
                        transition: 'all 0.3s ease'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = primaryColor;
                        e.target.style.boxShadow = `0 0 0 2px ${accentColor}`;
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = accentColor;
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Audit Logs */}
              <div style={{
                backgroundColor: 'white',
                padding: '20px',
                borderRadius: '8px',
                border: `1px solid ${accentColor}`
              }}>
                <h4 style={{ color: primaryColor, marginBottom: '15px' }}>Audit Logs</h4>
                <div style={{ maxHeight: '300px', overflow: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr style={{ backgroundColor: accentColor }}>
                        <th style={{ padding: '10px', textAlign: 'left', border: `1px solid ${accentColor}` }}>Time</th>
                        <th style={{ padding: '10px', textAlign: 'left', border: `1px solid ${accentColor}` }}>User</th>
                        <th style={{ padding: '10px', textAlign: 'left', border: `1px solid ${accentColor}` }}>Action</th>
                        <th style={{ padding: '10px', textAlign: 'left', border: `1px solid ${accentColor}` }}>IP Address</th>
                        <th style={{ padding: '10px', textAlign: 'left', border: `1px solid ${accentColor}` }}>Result</th>
                      </tr>
                    </thead>
                    <tbody>
                      {securitySettings.auditLogs.map(log => (
                        <tr key={log.id} style={{ transition: 'all 0.3s ease' }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = '#f9f9f9';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'white';
                          }}
                        >
                          <td style={{ padding: '10px', border: `1px solid ${accentColor}` }}>{log.time}</td>
                          <td style={{ padding: '10px', border: `1px solid ${accentColor}` }}>{log.user}</td>
                          <td style={{ padding: '10px', border: `1px solid ${accentColor}` }}>{log.action}</td>
                          <td style={{ padding: '10px', border: `1px solid ${accentColor}` }}>{log.ip}</td>
                          <td style={{ padding: '10px', border: `1px solid ${accentColor}`, color: log.result === 'Success' ? 'green' : 'red' }}>
                            {log.result}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <button 
                onClick={handleSaveSecurityConfiguration}
                style={{
                  padding: '12px 30px',
                  backgroundColor: primaryColor,
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#6a2352';
                  e.target.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = primaryColor;
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                Save Security Configuration
              </button>
            </div>
          </div>
        );

      case 'compliance':
        return (
          <div>
            <h3 style={{ color: primaryColor, marginBottom: '20px' }}>Medical Compliance</h3>
            <div style={{ display: 'grid', gap: '20px' }}>
              {/* Doctor Verification */}
              <div style={{
                backgroundColor: 'white',
                padding: '20px',
                borderRadius: '8px',
                border: `1px solid ${accentColor}`
              }}>
                <h4 style={{ color: primaryColor, marginBottom: '15px' }}>Doctor Verification</h4>
                <div style={{ maxHeight: '300px', overflow: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr style={{ backgroundColor: accentColor }}>
                        <th style={{ padding: '10px', textAlign: 'left', border: `1px solid ${accentColor}` }}>Name</th>
                        <th style={{ padding: '10px', textAlign: 'left', border: `1px solid ${accentColor}` }}>License</th>
                        <th style={{ padding: '10px', textAlign: 'left', border: `1px solid ${accentColor}` }}>Specialization</th>
                        <th style={{ padding: '10px', textAlign: 'left', border: `1px solid ${accentColor}` }}>Status</th>
                        <th style={{ padding: '10px', textAlign: 'left', border: `1px solid ${accentColor}` }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {complianceSettings.doctors.map(doctor => (
                        <tr key={doctor.id} style={{ transition: 'all 0.3s ease' }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = '#f9f9f9';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'white';
                          }}
                        >
                          <td style={{ padding: '10px', border: `1px solid ${accentColor}` }}>{doctor.name}</td>
                          <td style={{ padding: '10px', border: `1px solid ${accentColor}` }}>{doctor.license}</td>
                          <td style={{ padding: '10px', border: `1px solid ${accentColor}` }}>{doctor.specialization}</td>
                          <td style={{ padding: '10px', border: `1px solid ${accentColor}` }}>
                            <span style={{
                              padding: '2px 8px',
                              borderRadius: '10px',
                              fontSize: '12px',
                              backgroundColor: 
                                doctor.status === 'approved' ? '#d4edda' :
                                doctor.status === 'pending' ? '#fff3cd' :
                                '#f8d7da',
                              color: 
                                doctor.status === 'approved' ? '#155724' :
                                doctor.status === 'pending' ? '#856404' :
                                '#721c24'
                            }}>
                              {doctor.status}
                            </span>
                          </td>
                          <td style={{ padding: '10px', border: `1px solid ${accentColor}` }}>
                            <div style={{ display: 'flex', gap: '5px' }}>
                              <button 
                                onClick={() => handleApproveDoctor(doctor.id)}
                                style={{
                                  padding: '5px 10px',
                                  backgroundColor: '#28a745',
                                  color: 'white',
                                  border: 'none',
                                  borderRadius: '3px',
                                  cursor: 'pointer',
                                  fontSize: '12px',
                                  transition: 'all 0.3s ease'
                                }}
                                onMouseEnter={(e) => {
                                  e.target.style.backgroundColor = '#218838';
                                  e.target.style.transform = 'translateY(-1px)';
                                }}
                                onMouseLeave={(e) => {
                                  e.target.style.backgroundColor = '#28a745';
                                  e.target.style.transform = 'translateY(0)';
                                }}
                              >
                                Approve
                              </button>
                              <button 
                                onClick={() => handleRejectDoctor(doctor.id)}
                                style={{
                                  padding: '5px 10px',
                                  backgroundColor: '#dc3545',
                                  color: 'white',
                                  border: 'none',
                                  borderRadius: '3px',
                                  cursor: 'pointer',
                                  fontSize: '12px',
                                  transition: 'all 0.3s ease'
                                }}
                                onMouseEnter={(e) => {
                                  e.target.style.backgroundColor = '#c82333';
                                  e.target.style.transform = 'translateY(-1px)';
                                }}
                                onMouseLeave={(e) => {
                                  e.target.style.backgroundColor = '#dc3545';
                                  e.target.style.transform = 'translateY(0)';
                                }}
                              >
                                Reject
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Rx Approval Rules */}
              <div style={{
                backgroundColor: 'white',
                padding: '20px',
                borderRadius: '8px',
                border: `1px solid ${accentColor}`
              }}>
                <h4 style={{ color: primaryColor, marginBottom: '15px' }}>Prescription Approval Rules</h4>
                <div style={{ display: 'grid', gap: '15px' }}>
                  <label style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '10px', 
                    cursor: 'pointer',
                    padding: '15px',
                    border: `1px solid ${accentColor}`,
                    borderRadius: '5px',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = primaryColor;
                    e.currentTarget.style.boxShadow = `0 2px 8px rgba(124, 42, 98, 0.1)`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = accentColor;
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                  >
                    <input
                      type="checkbox"
                      checked={complianceSettings.rxRules.autoApprove}
                      style={{ transform: 'scale(1.2)' }}
                    />
                    <span>Auto-approve prescriptions for verified doctors</span>
                  </label>
                  <label style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '10px', 
                    cursor: 'pointer',
                    padding: '15px',
                    border: `1px solid ${accentColor}`,
                    borderRadius: '5px',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = primaryColor;
                    e.currentTarget.style.boxShadow = `0 2px 8px rgba(124, 42, 98, 0.1)`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = accentColor;
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                  >
                    <input
                      type="checkbox"
                      checked={complianceSettings.rxRules.highDosageReview}
                      style={{ transform: 'scale(1.2)' }}
                    />
                    <span>Manual review for high-dosage prescriptions</span>
                  </label>
                  <label style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '10px', 
                    cursor: 'pointer',
                    padding: '15px',
                    border: `1px solid ${accentColor}`,
                    borderRadius: '5px',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = primaryColor;
                    e.currentTarget.style.boxShadow = `0 2px 8px rgba(124, 42, 98, 0.1)`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = accentColor;
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                  >
                    <input
                      type="checkbox"
                      checked={complianceSettings.rxRules.restrictedMedicineReview}
                      style={{ transform: 'scale(1.2)' }}
                    />
                    <span>Manual review for restricted medicines</span>
                  </label>
                </div>
              </div>

              <button 
                onClick={handleSaveComplianceRules}
                style={{
                  padding: '12px 30px',
                  backgroundColor: primaryColor,
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#6a2352';
                  e.target.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = primaryColor;
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                Save Rules
              </button>
            </div>
          </div>
        );

      case 'integrations':
        return (
          <div>
            <h3 style={{ color: primaryColor, marginBottom: '20px' }}>Integrations</h3>
            <div style={{ display: 'grid', gap: '20px' }}>
              {/* API Keys */}
              <div style={{
                backgroundColor: 'white',
                padding: '20px',
                borderRadius: '8px',
                border: `1px solid ${accentColor}`
              }}>
                <h4 style={{ color: primaryColor, marginBottom: '15px' }}>API Keys</h4>
                <div style={{ display: 'grid', gap: '15px' }}>
                  {integrationSettings.apiKeys.map(key => (
                    <div key={key.id} style={{
                      border: `1px solid ${accentColor}`,
                      borderRadius: '5px',
                      padding: '15px',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = primaryColor;
                      e.currentTarget.style.boxShadow = `0 2px 8px rgba(124, 42, 98, 0.1)`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = accentColor;
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                        <div>
                          <div style={{ fontWeight: 'bold' }}>{key.name}</div>
                          <div style={{ fontSize: '14px', color: '#666', marginTop: '5px' }}>
                            Public Key: {key.publicKey}
                          </div>
                          <div style={{ fontSize: '14px', color: '#666' }}>
                            Created: {key.created}
                          </div>
                        </div>
                        <div style={{ display: 'flex', gap: '10px' }}>
                          <button 
                            onClick={() => handleViewSecret(key.id)}
                            style={{
                              padding: '5px 10px',
                              backgroundColor: 'transparent',
                              color: primaryColor,
                              border: `1px solid ${primaryColor}`,
                              borderRadius: '3px',
                              cursor: 'pointer',
                              fontSize: '12px',
                              transition: 'all 0.3s ease'
                            }}
                            onMouseEnter={(e) => {
                              e.target.style.backgroundColor = primaryColor;
                              e.target.style.color = 'white';
                            }}
                            onMouseLeave={(e) => {
                              e.target.style.backgroundColor = 'transparent';
                              e.target.style.color = primaryColor;
                            }}
                          >
                            View Secret
                          </button>
                          <button 
                            onClick={() => handleRotateApiKey(key.id)}
                            style={{
                              padding: '5px 10px',
                              backgroundColor: '#ffc107',
                              color: 'white',
                              border: 'none',
                              borderRadius: '3px',
                              cursor: 'pointer',
                              fontSize: '12px',
                              transition: 'all 0.3s ease'
                            }}
                            onMouseEnter={(e) => {
                              e.target.style.backgroundColor = '#e0a800';
                              e.target.style.transform = 'translateY(-1px)';
                            }}
                            onMouseLeave={(e) => {
                              e.target.style.backgroundColor = '#ffc107';
                              e.target.style.transform = 'translateY(0)';
                            }}
                          >
                            Rotate
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                  <button 
                    onClick={handleGenerateApiKey}
                    style={{
                      padding: '10px 15px',
                      backgroundColor: 'transparent',
                      color: primaryColor,
                      border: `2px dashed ${primaryColor}`,
                      borderRadius: '5px',
                      cursor: 'pointer',
                      fontWeight: 'bold',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = accentColor;
                      e.target.style.borderStyle = 'solid';
                      e.target.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = 'transparent';
                      e.target.style.borderStyle = 'dashed';
                      e.target.style.transform = 'translateY(0)';
                    }}
                  >
                    + Generate New API Key
                  </button>
                </div>
              </div>

              {/* Integration Status */}
              <div style={{
                backgroundColor: 'white',
                padding: '20px',
                borderRadius: '8px',
                border: `1px solid ${accentColor}`
              }}>
                <h4 style={{ color: primaryColor, marginBottom: '15px' }}>Integration Status</h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
                  <div style={{ 
                    textAlign: 'center', 
                    padding: '15px', 
                    backgroundColor: accentColor, 
                    borderRadius: '5px',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-5px)';
                    e.currentTarget.style.boxShadow = `0 5px 15px rgba(124, 42, 98, 0.2)`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                  >
                    <div style={{ fontSize: '24px', fontWeight: 'bold', color: primaryColor }}>
                      {integrationSettings.status.uptime}%
                    </div>
                    <div style={{ fontSize: '14px', color: '#666' }}>Uptime</div>
                  </div>
                  <div style={{ 
                    textAlign: 'center', 
                    padding: '15px', 
                    backgroundColor: accentColor, 
                    borderRadius: '5px',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-5px)';
                    e.currentTarget.style.boxShadow = `0 5px 15px rgba(124, 42, 98, 0.2)`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                  >
                    <div style={{ fontSize: '24px', fontWeight: 'bold', color: primaryColor }}>
                      {integrationSettings.status.latency}ms
                    </div>
                    <div style={{ fontSize: '14px', color: '#666' }}>Average Latency</div>
                  </div>
                  <div style={{ 
                    textAlign: 'center', 
                    padding: '15px', 
                    backgroundColor: accentColor, 
                    borderRadius: '5px',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-5px)';
                    e.currentTarget.style.boxShadow = `0 5px 15px rgba(124, 42, 98, 0.2)`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                  >
                    <div style={{ fontSize: '24px', fontWeight: 'bold', color: integrationSettings.status.lastIncident === 'Up' ? 'green' : 'red' }}>
                      {integrationSettings.status.lastIncident}
                    </div>
                    <div style={{ fontSize: '14px', color: '#666' }}>Last Incident</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'backups':
        return (
          <div>
            <h3 style={{ color: primaryColor, marginBottom: '20px' }}>Backups & Logs</h3>
            <div style={{ display: 'grid', gap: '20px' }}>
              {/* Backup Scheduling */}
              <div style={{
                backgroundColor: 'white',
                padding: '20px',
                borderRadius: '8px',
                border: `1px solid ${accentColor}`
              }}>
                <h4 style={{ color: primaryColor, marginBottom: '15px' }}>Backup Scheduling</h4>
                <div style={{ display: 'grid', gap: '15px' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Backup Frequency</label>
                    <select
                      value={backupSettings.frequency}
                      style={{ 
                        padding: '8px', 
                        border: `1px solid ${accentColor}`, 
                        borderRadius: '5px', 
                        width: '100%', 
                        maxWidth: '200px',
                        transition: 'all 0.3s ease'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = primaryColor;
                        e.target.style.boxShadow = `0 0 0 2px ${accentColor}`;
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = accentColor;
                        e.target.style.boxShadow = 'none';
                      }}
                    >
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                    </select>
                  </div>
                  <button 
                    onClick={handleDownloadBackup}
                    style={{
                      padding: '10px 20px',
                      backgroundColor: primaryColor,
                      color: 'white',
                      border: 'none',
                      borderRadius: '5px',
                      cursor: 'pointer',
                      fontWeight: 'bold',
                      width: 'fit-content',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = '#6a2352';
                      e.target.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = primaryColor;
                      e.target.style.transform = 'translateY(0)';
                    }}
                  >
                    Download Backup
                  </button>
                </div>
              </div>

              {/* Audit Logs */}
              <div style={{
                backgroundColor: 'white',
                padding: '20px',
                borderRadius: '8px',
                border: `1px solid ${accentColor}`
              }}>
                <h4 style={{ color: primaryColor, marginBottom: '15px' }}>Audit Logs</h4>
                <div style={{ maxHeight: '400px', overflow: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr style={{ backgroundColor: accentColor }}>
                        <th style={{ padding: '10px', textAlign: 'left', border: `1px solid ${accentColor}` }}>Time</th>
                        <th style={{ padding: '10px', textAlign: 'left', border: `1px solid ${accentColor}` }}>User</th>
                        <th style={{ padding: '10px', textAlign: 'left', border: `1px solid ${accentColor}` }}>Action</th>
                        <th style={{ padding: '10px', textAlign: 'left', border: `1px solid ${accentColor}` }}>Result</th>
                      </tr>
                    </thead>
                    <tbody>
                      {backupSettings.logs.map(log => (
                        <tr key={log.id} style={{ transition: 'all 0.3s ease' }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = '#f9f9f9';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'white';
                          }}
                        >
                          <td style={{ padding: '10px', border: `1px solid ${accentColor}` }}>{log.time}</td>
                          <td style={{ padding: '10px', border: `1px solid ${accentColor}` }}>{log.user}</td>
                          <td style={{ padding: '10px', border: `1px solid ${accentColor}` }}>{log.action}</td>
                          <td style={{ 
                            padding: '10px', 
                            border: `1px solid ${accentColor}`, 
                            color: log.result === 'Success' ? 'green' : 'red',
                            fontWeight: log.result === 'Failure' ? 'bold' : 'normal'
                          }}>
                            {log.result}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div>
            <h3 style={{ color: primaryColor, marginBottom: '20px' }}>{sections.find(s => s.id === activeSection)?.name}</h3>
            <div style={{
              backgroundColor: 'white',
              padding: '20px',
              borderRadius: '8px',
              border: `1px solid ${accentColor}`,
              textAlign: 'center'
            }}>
              <p>{sections.find(s => s.id === activeSection)?.name} configuration interface would be implemented here.</p>
              <div style={{
                height: '200px',
                background: `linear-gradient(180deg, ${accentColor} 0%, ${primaryColor} 100%)`,
                opacity: 0.1,
                borderRadius: '5px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {sections.find(s => s.id === activeSection)?.name} Interface
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div>
      <h2 style={{ color: primaryColor, marginBottom: '20px' }}>System Settings</h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: '250px 1fr', gap: '20px', minHeight: '600px' }}>
        {/* Settings Navigation */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          border: `1px solid ${accentColor}`,
          padding: '10px 0',
          height: 'fit-content',
          maxHeight: 'calc(100vh - 200px)',
          overflowY: 'auto',
          position: 'sticky',
          top: '20px'
        }}>
          {sections.map(section => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              style={{
                width: '100%',
                padding: '12px 20px',
                backgroundColor: activeSection === section.id ? accentColor : 'transparent',
                color: activeSection === section.id ? primaryColor : '#333',
                border: 'none',
                textAlign: 'left',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                fontSize: '14px',
                transition: 'all 0.3s ease',
                borderRadius: '0'
              }}
              onMouseEnter={(e) => {
                if (activeSection !== section.id) {
                  e.target.style.backgroundColor = '#f9f9f9';
                  e.target.style.color = primaryColor;
                }
              }}
              onMouseLeave={(e) => {
                if (activeSection !== section.id) {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.color = '#333';
                }
              }}
            >
              <span>{section.icon}</span>
              {section.name}
            </button>
          ))}
        </div>

        {/* Settings Content */}
        <div style={{ overflow: 'visible' }}>
          {renderSection()}
        </div>
      </div>
    </div>
  );
};

export default Settings;