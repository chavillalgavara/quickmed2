import React, { useRef, useEffect } from 'react';

// AI Chatbot Widget Component
const AIChatbotWidget = ({ 
  showChatbot, 
  toggleChatbot, 
  chatMessages, 
  userMessage, 
  handleUserMessage, 
  sendMessage, 
  handleKeyPress,
  chatInputRef,
  chatMessagesEndRef
}) => {
  const chatWidgetRef = useRef(null);

  // Close chatbot when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (chatWidgetRef.current && !chatWidgetRef.current.contains(event.target)) {
        toggleChatbot();
      }
    };

    if (showChatbot) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showChatbot, toggleChatbot]);

  // Handle toggle with proper event propagation
  const handleToggleChatbot = (event) => {
    event.stopPropagation(); // Prevent event from bubbling up
    toggleChatbot();
  };

  // Handle send message with proper event propagation
  const handleSendMessage = (event) => {
    event.stopPropagation(); // Prevent event from bubbling up
    sendMessage();
  };

  // Handle key press with proper event propagation
  const handleKeyPressWrapper = (event) => {
    if (event.key === 'Enter') {
      event.stopPropagation(); // Prevent event from bubbling up
      handleKeyPress(event);
    }
  };

  return (
    <div 
      ref={chatWidgetRef}
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px', // Changed from left to right
        zIndex: 1000,
        fontFamily: 'Arial, sans-serif'
      }}
      onClick={(e) => e.stopPropagation()} // Prevent clicks inside from closing
    >
      {/* Chat Window */}
      {showChatbot && (
        <div 
          style={{
            width: '350px',
            height: '500px',
            backgroundColor: 'white',
            borderRadius: '20px',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            marginBottom: '15px',
            border: '1px solid #e0e0e0'
          }}
          onClick={(e) => e.stopPropagation()} // Prevent clicks inside from closing
        >
          {/* Chat Header */}
          <div style={{
            backgroundColor: '#7C2A62',
            color: 'white',
            padding: '15px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '32px',
                height: '32px',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '16px'
              }}>
                🤖
              </div>
              <div>
                <div style={{ fontWeight: 'bold', fontSize: '14px' }}>QuickMed Assistant</div>
                <div style={{ fontSize: '11px', opacity: 0.8 }}>Online • Ready to help</div>
              </div>
            </div>
            <button
              onClick={handleToggleChatbot}
              style={{
                background: 'none',
                border: 'none',
                color: 'white',
                fontSize: '18px',
                cursor: 'pointer',
                padding: '5px',
                borderRadius: '50%',
                width: '30px',
                height: '30px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'}
              onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
            >
              ✕
            </button>
          </div>

          {/* Messages Area */}
          <div style={{
            flex: 1,
            padding: '15px',
            overflowY: 'auto',
            backgroundColor: '#f8f9fa',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px'
          }}>
            {chatMessages.map((message) => (
              <div
                key={message.id}
                style={{
                  alignSelf: message.sender === 'user' ? 'flex-end' : 'flex-start',
                  maxWidth: '80%'
                }}
              >
                <div style={{
                  backgroundColor: message.sender === 'user' ? '#7C2A62' : 'white',
                  color: message.sender === 'user' ? 'white' : '#333',
                  padding: '10px 15px',
                  borderRadius: message.sender === 'user' 
                    ? '18px 18px 4px 18px' 
                    : '18px 18px 18px 4px',
                  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
                  fontSize: '14px',
                  lineHeight: '1.4'
                }}>
                  {message.text}
                </div>
                <div style={{
                  fontSize: '10px',
                  color: '#666',
                  marginTop: '4px',
                  textAlign: message.sender === 'user' ? 'right' : 'left',
                  padding: '0 5px'
                }}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            ))}
            <div ref={chatMessagesEndRef} />
          </div>

          {/* Input Area */}
          <div style={{
            padding: '15px',
            borderTop: '1px solid #e0e0e0',
            backgroundColor: 'white'
          }}>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <input
                ref={chatInputRef}
                type="text"
                value={userMessage}
                onChange={handleUserMessage}
                onKeyPress={handleKeyPressWrapper}
                placeholder="Type your message..."
                style={{
                  flex: 1,
                  padding: '12px 15px',
                  border: '1px solid #ddd',
                  borderRadius: '25px',
                  outline: 'none',
                  fontSize: '14px',
                  backgroundColor: '#f8f9fa'
                }}
                onClick={(e) => e.stopPropagation()} // Prevent input clicks from closing
              />
              <button
                onClick={handleSendMessage}
                disabled={!userMessage.trim()}
                style={{
                  backgroundColor: userMessage.trim() ? '#7C2A62' : '#ccc',
                  color: 'white',
                  border: 'none',
                  borderRadius: '50%',
                  width: '40px',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: userMessage.trim() ? 'pointer' : 'not-allowed',
                  fontSize: '16px',
                  transition: 'background-color 0.2s'
                }}
              >
                ➤
              </button>
            </div>
            <div style={{
              fontSize: '11px',
              color: '#666',
              textAlign: 'center',
              marginTop: '8px'
            }}>
              QuickMed AI Assistant • Your health companion
            </div>
          </div>
        </div>
      )}

      {/* Floating Chat Button */}
      <button
        onClick={handleToggleChatbot}
        style={{
          width: '60px',
          height: '60px',
          backgroundColor: '#7C2A62',
          border: 'none',
          borderRadius: '50%',
          color: 'white',
          fontSize: '24px',
          cursor: 'pointer',
          boxShadow: '0 4px 20px rgba(124, 42, 98, 0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.3s ease',
          transform: showChatbot ? 'rotate(360deg)' : 'rotate(0deg)'
        }}
        onMouseEnter={(e) => {
          e.target.style.transform = showChatbot ? 'rotate(360deg) scale(1.1)' : 'scale(1.1)';
          e.target.style.boxShadow = '0 6px 25px rgba(124, 42, 98, 0.4)';
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = showChatbot ? 'rotate(360deg)' : 'rotate(0deg)';
          e.target.style.boxShadow = '0 4px 20px rgba(124, 42, 98, 0.3)';
        }}
      >
        {showChatbot ? '✕' : '💬'}
      </button>

      {/* Unread message indicator */}
      {!showChatbot && chatMessages.filter(msg => msg.sender === 'bot').length > 1 && (
        <div style={{
          position: 'absolute',
          top: '-5px',
          right: '-5px',
          width: '20px',
          height: '20px',
          backgroundColor: '#ff4444',
          color: 'white',
          borderRadius: '50%',
          fontSize: '10px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 'bold',
          animation: 'pulse 2s infinite'
        }}>
          {chatMessages.filter(msg => msg.sender === 'bot').length - 1}
        </div>
      )}
    </div>
  );
};

export default AIChatbotWidget;