import React from 'react';

const MessagesContent = ({ state, actions, dashboardData }) => {
  const { patientMessages } = state;
  const { getUnreadMessagesCount, handleStartConversation, handleViewFullHistory } = actions;

  const isMobile = window.innerWidth <= 768;
  const isTablet = window.innerWidth <= 1024;

  const formatMessageTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now - date) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };

  const conversations = Object.entries(patientMessages)
    .map(([patientName, messages]) => {
      const lastMessage = messages[messages.length - 1];
      const unreadCount = messages.filter(msg => msg.from === 'patient' && !msg.read).length;
      const patient = dashboardData.patients.find(p => p.name === patientName);

      return {
        patientName,
        patient,
        lastMessage,
        unreadCount,
        timestamp: lastMessage.timestamp
      };
    })
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

  return (
    <div style={styles.mainContent}>
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <h1 style={styles.greeting}>Messages</h1>
          <p style={styles.subtitle}>Communicate with your patients</p>
        </div>
        <div style={styles.messagesStats}>
          <div style={styles.messageStat}>
            <span style={styles.messageStatNumber}>{getUnreadMessagesCount()}</span>
            <span style={styles.messageStatLabel}>Unread Messages</span>
          </div>
          <div style={styles.messageStat}>
            <span style={styles.messageStatNumber}>{Object.keys(patientMessages).length}</span>
            <span style={styles.messageStatLabel}>Active Conversations</span>
          </div>
        </div>
      </div>

      <div style={styles.messagesOverview}>
        <div style={{
          ...styles.conversationsGrid,
          gridTemplateColumns: isMobile ? '1fr' : isTablet ? '1fr' : 'repeat(auto-fill, minmax(400px, 1fr))'
        }}>
          {conversations.map((conversation) => (
            <div key={conversation.patientName} style={styles.conversationCard}>
              <div style={styles.conversationCardHeader}>
                <div style={styles.conversationCardAvatar}>
                  👤
                  {conversation.unreadCount > 0 && (
                    <span style={styles.unreadBadge}>
                      {conversation.unreadCount}
                    </span>
                  )}
                </div>
                <div style={styles.conversationCardInfo}>
                  <h4 style={styles.conversationCardName}>{conversation.patientName}</h4>
                  <p style={styles.conversationCardLastMessage}>
                    {conversation.lastMessage.message}
                  </p>
                </div>
                <span style={styles.conversationCardTime}>
                  {formatMessageTime(conversation.timestamp)}
                </span>
              </div>
              <div style={styles.conversationCardActions}>
                <button 
                  style={styles.primaryButton}
                  onClick={() => {
                    if (conversation.patient) {
                      handleStartConversation(conversation.patient);
                    }
                  }}
                >
                  Open Chat
                </button>
                <button 
                  style={styles.viewHistoryButton}
                  onClick={() => handleViewFullHistory(conversation.patientName)}
                >
                  View History
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const styles = {
  mainContent: {
    padding: 'clamp(15px, 3vw, 30px)',
    textAlign: 'left'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '30px',
    textAlign: 'left',
    flexWrap: 'wrap',
    gap: '20px'
  },
  headerLeft: {
    textAlign: 'left',
    flex: 1
  },
  greeting: {
    fontSize: 'clamp(20px, 4vw, 28px)',
    fontWeight: '700',
    color: '#1f2937',
    margin: '0 0 8px 0',
    textAlign: 'left'
  },
  subtitle: {
    fontSize: 'clamp(14px, 2vw, 16px)',
    color: '#6b7280',
    margin: 0,
    textAlign: 'left'
  },
  messagesStats: {
    display: 'flex',
    gap: '20px',
    flexWrap: 'wrap'
  },
  messageStat: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '16px 24px',
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    minWidth: '140px'
  },
  messageStatNumber: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#7C2A62',
    marginBottom: '4px'
  },
  messageStatLabel: {
    fontSize: '14px',
    color: '#6b7280'
  },
  messagesOverview: {
    marginTop: '20px',
    textAlign: 'left'
  },
  conversationsGrid: {
    display: 'grid',
    gap: '20px',
    textAlign: 'left'
  },
  conversationCard: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    border: '1px solid #e5e7eb',
    textAlign: 'left'
  },
  conversationCardHeader: {
    display: 'flex',
    alignItems: 'flex-start',
    marginBottom: '16px',
    textAlign: 'left',
    gap: '12px'
  },
  conversationCardAvatar: {
    position: 'relative',
    fontSize: '32px',
    marginRight: '12px',
    flexShrink: 0
  },
  conversationCardInfo: {
    flex: 1,
    textAlign: 'left',
    minWidth: 0
  },
  conversationCardName: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#1f2937',
    margin: '0 0 4px 0',
    textAlign: 'left'
  },
  conversationCardLastMessage: {
    fontSize: '14px',
    color: '#6b7280',
    margin: 0,
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    textAlign: 'left'
  },
  conversationCardTime: {
    fontSize: '12px',
    color: '#9CA3AF',
    flexShrink: 0
  },
  conversationCardActions: {
    display: 'flex',
    gap: '8px',
    textAlign: 'left',
    flexWrap: 'wrap'
  },
  primaryButton: {
    backgroundColor: '#7C2A62',
    color: 'white',
    border: 'none',
    padding: '10px 14px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    flex: 1,
    minWidth: '100px'
  },
  viewHistoryButton: {
    backgroundColor: 'transparent',
    color: '#7C2A62',
    border: '2px solid #7C2A62',
    padding: '8px 14px',
    borderRadius: '8px',
    fontSize: '13px',
    fontWeight: '600',
    cursor: 'pointer',
    flex: 1,
    minWidth: '90px'
  },
  unreadBadge: {
    position: 'absolute',
    top: '-2px',
    right: '-2px',
    backgroundColor: '#EF4444',
    color: 'white',
    borderRadius: '8px',
    padding: '1px 6px',
    fontSize: '10px',
    fontWeight: '600',
    minWidth: '16px',
    textAlign: 'center'
  }
};

export default MessagesContent;