import React, { useState, useEffect } from 'react';

const EmotionalReflection = ({ formData, updateFormData }) => {
  const [reflection, setReflection] = useState(formData.reflection || '');
  const [hasSubmitted, setHasSubmitted] = useState(formData.reflectionSubmitted || false);
  const [isTyping, setIsTyping] = useState(false);

  // Set emotionalResponse if the user has already submitted a reflection
  useEffect(() => {
    if (hasSubmitted) {
      updateFormData({ 
        reflection: reflection,
        reflectionSubmitted: true,
        emotionalResponse: reflection
      });
    }
  }, []);

  const handleReflectionChange = (e) => {
    setReflection(e.target.value);
    updateFormData({ reflection: e.target.value });
  };

  const handleSubmitReflection = () => {
    if (reflection.trim() !== '') {
      setIsTyping(true);
      
      // Simulate AI thinking and typing
      setTimeout(() => {
        setIsTyping(false);
        setHasSubmitted(true);
        updateFormData({ 
          reflection: reflection,
          reflectionSubmitted: true,
          emotionalResponse: reflection  // Add emotionalResponse for form validation
        });
      }, 2000);
    }
  };

  return (
    <div className="question-wrapper">
      <h2 className="question-title">Emotional Reflection</h2>
      
      <div className="question-content">
        <div className="chat-container">
          <div className="chat-messages">
            <div className="message bot-message">
              <div className="bot-avatar">AI</div>
              <div className="message-bubble">
                What did you feel when your layout failed?
              </div>
            </div>
            
            {!hasSubmitted ? (
              <div className="message user-input">
                <textarea
                  value={reflection}
                  onChange={handleReflectionChange}
                  placeholder="Type your deepest design trauma here..."
                  rows={3}
                  className="reflection-textarea"
                  disabled={hasSubmitted}
                />
                <button 
                  className="send-button"
                  onClick={handleSubmitReflection}
                  disabled={reflection.trim() === '' || hasSubmitted}
                >
                  Send
                </button>
              </div>
            ) : (
              <>
                <div className="message user-message">
                  <div className="message-bubble user-bubble">
                    {reflection}
                  </div>
                </div>
                
                <div className="message bot-message">
                  <div className="bot-avatar">AI</div>
                  <div className="message-bubble">
                    Pain confirmed.
                  </div>
                </div>
              </>
            )}
            
            {isTyping && (
              <div className="message bot-message">
                <div className="bot-avatar">AI</div>
                <div className="message-bubble typing-bubble">
                  <span className="typing-dot"></span>
                  <span className="typing-dot"></span>
                  <span className="typing-dot"></span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .chat-container {
          border: 1px solid var(--medium-gray);
          border-radius: 12px;
          overflow: hidden;
        }
        
        .chat-messages {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          padding: 1rem;
          max-height: 400px;
          overflow-y: auto;
        }
        
        .message {
          display: flex;
          align-items: flex-start;
        }
        
        .bot-message {
          margin-right: 3rem;
        }
        
        .user-message {
          flex-direction: row-reverse;
          margin-left: 3rem;
        }
        
        .bot-avatar {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          background: linear-gradient(135deg, #e41c3c, #ff1493);
          color: white;
          border-radius: 50%;
          margin-right: 0.75rem;
          font-weight: bold;
          font-size: 0.9rem;
        }
        
        .message-bubble {
          background-color: #f5f5f5;
          padding: 0.75rem 1rem;
          border-radius: 18px;
          border-top-left-radius: 4px;
          max-width: 80%;
          color: #333;
        }
        
        .user-bubble {
          background-color: #e41c3c;
          color: white;
          border-top-left-radius: 18px;
          border-top-right-radius: 4px;
        }
        
        .user-input {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          width: 100%;
          margin-top: 1rem;
        }
        
        .reflection-textarea {
          width: 100%;
          border: 1px solid var(--medium-gray);
          border-radius: 8px;
          padding: 0.75rem;
          resize: none;
          font-family: 'Inter', sans-serif;
          color: #333;
        }
        
        .reflection-textarea:focus {
          outline: none;
          border-color: #e41c3c;
        }
        
        .send-button {
          align-self: flex-end;
          padding: 0.5rem 1.5rem;
          background-color: #e41c3c;
          color: white;
          border: none;
          border-radius: 18px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .send-button:hover:not(:disabled) {
          background-color: #d01835;
        }
        
        .send-button:disabled {
          background-color: var(--medium-gray);
          cursor: not-allowed;
        }
        
        .typing-bubble {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          padding: 0.75rem;
          min-width: 60px;
        }
        
        .typing-dot {
          width: 8px;
          height: 8px;
          background-color: var(--dark-gray);
          border-radius: 50%;
          animation: typing-animation 1.4s infinite ease-in-out both;
        }
        
        .typing-dot:nth-child(1) {
          animation-delay: 0s;
        }
        
        .typing-dot:nth-child(2) {
          animation-delay: 0.2s;
        }
        
        .typing-dot:nth-child(3) {
          animation-delay: 0.4s;
        }
        
        @keyframes typing-animation {
          0%, 100% { transform: scale(0.7); opacity: 0.5; }
          50% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default EmotionalReflection; 