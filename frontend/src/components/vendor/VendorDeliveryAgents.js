import React, { useState } from 'react';
import { deliveryAgents } from './VendorData';

const VendorDeliveryAgents = ({
  setShowNotificationsBellModal,
  notifications
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredAgents = deliveryAgents.filter(agent =>
    agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agent.phone.includes(searchTerm)
  );

  const handleCallAgent = (phone) => {
    window.open(`tel:${phone}`, '_self');
  };

  const handleWhatsAppAgent = (phone) => {
    const message = `Hello, regarding medicine pickup from pharmacy.`;
    window.open(`https://wa.me/${phone.replace('+', '')}?text=${encodeURIComponent(message)}`, '_blank');
  };

  // Inline CSS Styles
  const mainContentStyle = {
    padding: '24px',
    minHeight: '100vh'
  };

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '30px'
  };

  const headerActionsStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '16px'
  };

  const notificationBellStyle = {
    position: 'relative',
    backgroundColor: 'white',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    padding: '10px 12px',
    fontSize: '18px',
    cursor: 'pointer',
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

  const greetingStyle = {
    fontSize: '28px',
    fontWeight: '700',
    color: '#1f2937',
    margin: '0 0 8px 0'
  };

  const subtitleStyle = {
    fontSize: '16px',
    color: '#6b7280',
    margin: 0
  };

  const searchContainerStyle = {
    marginBottom: '24px'
  };

  const searchInputContainerStyle = {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'white',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    padding: '8px 12px'
  };

  const searchInputStyle = {
    flex: 1,
    border: 'none',
    outline: 'none',
    fontSize: '14px',
    padding: '4px 0'
  };

  const sectionStyle = {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '24px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    border: '1px solid #e5e7eb'
  };

  const sectionHeaderStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px'
  };

  const sectionTitleStyle = {
    fontSize: '20px',
    fontWeight: '600',
    color: '#1f2937',
    margin: 0
  };

  const viewAllStyle = {
    fontSize: '14px',
    color: '#7C2A62',
    fontWeight: '500'
  };

  const agentsGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '20px'
  };

  const agentCardStyle = {
    padding: '20px',
    border: '1px solid #e5e7eb',
    borderRadius: '12px',
    backgroundColor: '#f8fafc'
  };

  const agentHeaderStyle = {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '16px',
    gap: '12px'
  };

  const agentAvatarStyle = {
    fontSize: '24px',
    width: '50px',
    height: '50px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#7C2A62',
    color: 'white',
    borderRadius: '50%'
  };

  const agentInfoStyle = {
    flex: 1
  };

  const agentNameStyle = {
    fontSize: '18px',
    fontWeight: '600',
    color: '#1f2937',
    margin: '0 0 4px 0'
  };

  const agentVehicleStyle = {
    fontSize: '14px',
    color: '#6b7280',
    margin: 0
  };

  const agentPhoneStyle = {
    fontSize: '16px',
    fontWeight: '500',
    color: '#1f2937',
    margin: '0 0 16px 0'
  };

  const contactActionsStyle = {
    display: 'flex',
    gap: '8px'
  };

  const callButtonStyle = {
    flex: 1,
    backgroundColor: '#10B981',
    color: 'white',
    border: 'none',
    padding: '10px',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px'
  };

  const whatsappButtonStyle = {
    flex: 1,
    backgroundColor: '#25D366',
    color: 'white',
    border: 'none',
    padding: '10px',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px'
  };

  return (
    <div style={mainContentStyle}>
      <div style={headerStyle}>
        <div>
          <h1 style={greetingStyle}>Delivery Contacts</h1>
          <p style={subtitleStyle}>Contact delivery agents for order pickups</p>
        </div>
        <div style={headerActionsStyle}>
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

      <div style={sectionStyle}>
        <div style={sectionHeaderStyle}>
          <h2 style={sectionTitleStyle}>Delivery Agents</h2>
          <span style={viewAllStyle}>
            {deliveryAgents.length} agents
          </span>
        </div>

        <div style={searchContainerStyle}>
          <div style={searchInputContainerStyle}>
            <input
              type="text"
              style={searchInputStyle}
              placeholder="Search agents by name or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div style={agentsGridStyle}>
          {filteredAgents.map(agent => (
            <div key={agent.id} style={agentCardStyle}>
              <div style={agentHeaderStyle}>
                <div style={agentAvatarStyle}>🚗</div>
                <div style={agentInfoStyle}>
                  <h3 style={agentNameStyle}>{agent.name}</h3>
                  <p style={agentVehicleStyle}>{agent.vehicle}</p>
                </div>
              </div>
              
              <p style={agentPhoneStyle}>📱 {agent.phone}</p>

              <div style={contactActionsStyle}>
                <button 
                  style={callButtonStyle}
                  onClick={() => handleCallAgent(agent.phone)}
                >
                  📞 Call
                </button>
                <button 
                  style={whatsappButtonStyle}
                  onClick={() => handleWhatsAppAgent(agent.phone)}
                >
                  💬 WhatsApp
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredAgents.length === 0 && (
          <div style={{ textAlign: 'center', padding: '40px', color: '#6b7280' }}>
            <p>No delivery agents found matching your search.</p>
          </div>
        )}
      </div>

      <div style={{...sectionStyle, marginTop: '24px'}}>
        <div style={sectionHeaderStyle}>
          <h2 style={sectionTitleStyle}>Quick Actions</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
          <button 
            style={{
              padding: '16px',
              backgroundColor: '#F7D9EB',
              border: '1px solid #7C2A62',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '8px'
            }}
            onClick={() => {
              if (deliveryAgents.length > 0) {
                handleCallAgent(deliveryAgents[0].phone);
              }
            }}
          >
            <span style={{ fontSize: '20px' }}>📞</span>
            Call Nearest Agent
          </button>
          
          <button 
            style={{
              padding: '16px',
              backgroundColor: '#F0FDF4',
              border: '1px solid #10B981',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '8px'
            }}
            onClick={() => {
              const message = `Medicines ready for pickup at pharmacy.`;
              deliveryAgents.forEach(agent => {
                window.open(`https://wa.me/${agent.phone.replace('+', '')}?text=${encodeURIComponent(message)}`, '_blank');
              });
            }}
          >
            <span style={{ fontSize: '20px' }}>📦</span>
            Notify All - Ready for Pickup
          </button>
        </div>
      </div>
    </div>
  );
};

export default VendorDeliveryAgents;