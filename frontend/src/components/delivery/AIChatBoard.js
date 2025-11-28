import React, { useState, useEffect, useRef } from 'react';

const AIChatBoard = ({ isOpen, onClose, user }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your QuickMed AI assistant. How can I help you with your deliveries today?",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const styles = {
    chatModalOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1003
    },
    chatContainer: {
      backgroundColor: 'white',
      borderRadius: '12px',
      width: '90%',
      maxWidth: '400px',
      height: '80vh',
      maxHeight: '600px',
      display: 'flex',
      flexDirection: 'column',
      boxShadow: '0 20px 25px -5px rgba(0,0,0,0.2)',
      overflow: 'hidden'
    },
    chatHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '20px',
      backgroundColor: '#7C2A62',
      color: 'white'
    },
    chatHeaderInfo: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px'
    },
    chatAvatar: {
      fontSize: '24px'
    },
    chatTitle: {
      margin: 0,
      fontSize: '18px',
      fontWeight: '600'
    },
    chatStatus: {
      margin: 0,
      fontSize: '12px',
      opacity: 0.8,
      display: 'flex',
      alignItems: 'center',
      gap: '6px'
    },
    chatCloseButton: {
      backgroundColor: 'transparent',
      border: 'none',
      color: 'white',
      fontSize: '20px',
      cursor: 'pointer',
      padding: '4px'
    },
    chatMessages: {
      flex: 1,
      padding: '20px',
      overflowY: 'auto',
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      backgroundColor: '#f8fafc'
    },
    message: {
      maxWidth: '80%',
      padding: '12px 16px',
      borderRadius: '18px',
      fontSize: '14px',
      lineHeight: '1.4'
    },
    userMessage: {
      alignSelf: 'flex-end',
      backgroundColor: '#7C2A62',
      color: 'white',
      borderBottomRightRadius: '4px'
    },
    aiMessage: {
      alignSelf: 'flex-start',
      backgroundColor: 'white',
      color: '#1f2937',
      border: '1px solid #e5e7eb',
      borderBottomLeftRadius: '4px'
    },
    messageContent: {
      display: 'flex',
      flexDirection: 'column',
      gap: '4px'
    },
    messageText: {
      margin: 0
    },
    messageTime: {
      fontSize: '10px',
      opacity: 0.7,
      alignSelf: 'flex-end'
    },
    typingIndicator: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      padding: '12px 16px',
      backgroundColor: 'white',
      borderRadius: '18px',
      border: '1px solid #e5e7eb',
      alignSelf: 'flex-start',
      maxWidth: '150px'
    },
    typingDots: {
      display: 'flex',
      gap: '2px'
    },
    typingText: {
      fontSize: '12px',
      color: '#6b7280'
    },
    chatInputContainer: {
      padding: '16px',
      borderTop: '1px solid #e5e7eb',
      backgroundColor: 'white'
    },
    chatInputWrapper: {
      display: 'flex',
      gap: '8px',
      marginBottom: '12px'
    },
    chatInput: {
      flex: 1,
      padding: '12px 16px',
      border: '1px solid #d1d5db',
      borderRadius: '24px',
      fontSize: '14px',
      outline: 'none'
    },
    sendButton: {
      backgroundColor: '#7C2A62',
      color: 'white',
      border: 'none',
      borderRadius: '50%',
      width: '40px',
      height: '40px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '16px'
    },
    chatSuggestions: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '6px',
      alignItems: 'center'
    },
    suggestionLabel: {
      fontSize: '12px',
      color: '#6b7280',
      marginRight: '4px'
    },
    suggestionButton: {
      backgroundColor: '#f3f4f6',
      color: '#374151',
      border: 'none',
      borderRadius: '12px',
      padding: '4px 8px',
      fontSize: '11px',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease'
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponses = [
        "I can help you optimize your delivery route for better efficiency.",
        "Based on your current location, I suggest taking the route via MG Road for less traffic.",
        "Your performance this week is excellent! Keep up the good work.",
        "I notice you have 3 deliveries scheduled for the next 2 hours. Would you like me to suggest the best route?",
        "Your customer satisfaction rating is 4.8/5. That's above average!",
        "I can help you with navigation, delivery updates, or performance insights. What do you need?",
        "Remember to update your status to 'Online' when you're ready to accept new deliveries.",
        "Your earnings this month are trending 15% higher than last month. Great job!",
        "I can assist with customer communication templates if you need to send updates.",
        "Based on traffic patterns, I recommend starting your deliveries after 10 AM for faster routes."
      ];

      const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];
      
      const aiMessage = {
        id: messages.length + 2,
        text: randomResponse,
        sender: 'ai',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (!isOpen) return null;

  return (
    <div style={styles.chatModalOverlay}>
      <div style={styles.chatContainer}>
        <div style={styles.chatHeader}>
          <div style={styles.chatHeaderInfo}>
            <div style={styles.chatAvatar}>🤖</div>
            <div>
              <h3 style={styles.chatTitle}>QuickMed AI Assistant</h3>
              <p style={styles.chatStatus}>
                <span style={styles.statusDot}></span>
                Online - Ready to help
              </p>
            </div>
          </div>
          <button style={styles.chatCloseButton} onClick={onClose}>
            ✕
          </button>
        </div>

        <div style={styles.chatMessages}>
          {messages.map((message) => (
            <div
              key={message.id}
              style={{
                ...styles.message,
                ...(message.sender === 'user' ? styles.userMessage : styles.aiMessage)
              }}
            >
              <div style={styles.messageContent}>
                <div style={styles.messageText}>{message.text}</div>
                <div style={styles.messageTime}>
                  {formatTime(message.timestamp)}
                </div>
              </div>
            </div>
          ))}
          {isTyping && (
            <div style={styles.typingIndicator}>
              <div style={styles.typingDots}>
                <span style={{...styles.typingDotsSpan, animationDelay: '0s'}}></span>
                <span style={{...styles.typingDotsSpan, animationDelay: '0.2s'}}></span>
                <span style={{...styles.typingDotsSpan, animationDelay: '0.4s'}}></span>
              </div>
              <span style={styles.typingText}>AI is typing...</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div style={styles.chatInputContainer}>
          <div style={styles.chatInputWrapper}>
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message here..."
              style={styles.chatInput}
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim()}
              style={styles.sendButton}
            >
              📤
            </button>
          </div>
          <div style={styles.chatSuggestions}>
            <span style={styles.suggestionLabel}>Quick suggestions:</span>
            {['Best route?', 'Earnings tips', 'Performance', 'Help'].map((suggestion, index) => (
              <button
                key={index}
                style={styles.suggestionButton}
                onClick={() => setInputMessage(suggestion)}
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIChatBoard;