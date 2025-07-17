import React, { useState, useRef, useEffect } from 'react';

const Links = ({ formData, updateFormData }) => {
  const [githubLink, setGithubLink] = useState(formData.githubLink || '');
  const [buttonPosition, setButtonPosition] = useState({ top: 0, left: 0 });
  const [buttonCaught, setButtonCaught] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const nextButtonRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      const container = containerRef.current.getBoundingClientRect();
      setButtonPosition({
        top: container.height / 2 - 25,
        left: container.width / 2 - 50
      });
    }
  }, []);

  const handleGithubLinkChange = (e) => {
    setGithubLink(e.target.value);
    updateFormData({ githubLink: e.target.value });
  };

  const handleMouseEnter = () => {
    if (buttonCaught || !githubLink.includes('github.com')) return;
    
    setAttempts(attempts + 1);
    
    // After 5 attempts, let them catch it
    if (attempts >= 5) {
      setButtonCaught(true);
      return;
    }
    
    const container = containerRef.current.getBoundingClientRect();
    
    // Random position within the container
    const newTop = Math.random() * (container.height - 50);
    const newLeft = Math.random() * (container.width - 100);
    
    setButtonPosition({
      top: newTop,
      left: newLeft
    });
  };

  const handleButtonClick = () => {
    if (githubLink.includes('github.com')) {
      setButtonCaught(true);
    }
  };

  return (
    <div className="question-wrapper">
      <h2 className="question-title">GitHub trap</h2>
      
      <div className="question-content" ref={containerRef}>
        <div className="input-group">
          <label htmlFor="githubLink">Your GitHub profile link</label>
          <input
            type="url"
            id="githubLink"
            value={githubLink}
            onChange={handleGithubLinkChange}
            placeholder="https://github.com/yourusername"
          />
          <div className="input-description">
            We need to see your code (and judge it silently)
          </div>
        </div>
        
        <div className="runaway-button-container">
          <button
            ref={nextButtonRef}
            className={`runaway-button ${buttonCaught ? 'caught' : ''}`}
            style={{ 
              top: `${buttonPosition.top}px`, 
              left: `${buttonPosition.left}px`,
              transition: attempts > 0 ? 'all 0.2s ease' : 'none'
            }}
            onMouseEnter={handleMouseEnter}
            onClick={handleButtonClick}
          >
            {buttonCaught ? 'Caught me!' : 'Next'}
          </button>
          
          {attempts > 0 && !buttonCaught && (
            <div className="button-message">
              {attempts < 3 ? "Not so fast!" : 
               attempts < 5 ? "Keep trying!" : 
               "Almost there!"}
            </div>
          )}
          
          {buttonCaught && (
            <div className="button-message success">
              Well done! You've caught the button!
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .runaway-button-container {
          position: relative;
          height: 200px;
          margin-top: 40px;
          border: 1px dashed #ccc;
          border-radius: 8px;
          overflow: hidden;
        }
        
        .runaway-button {
          position: absolute;
          padding: 10px 20px;
          background: linear-gradient(135deg, var(--primary-color), var(--secondary-accent));
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 600;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
          z-index: 10;
        }
        
        .runaway-button.caught {
          background: linear-gradient(135deg, #4CAF50, #8BC34A);
          transform: scale(1.1);
        }
        
        .button-message {
          position: absolute;
          bottom: 20px;
          left: 0;
          right: 0;
          text-align: center;
          font-style: italic;
          color: #666;
        }
        
        .button-message.success {
          color: #4CAF50;
          font-weight: bold;
        }
        
        .input-description {
          margin-top: 10px;
          font-size: 0.9rem;
          color: #666;
          font-style: italic;
        }
      `}</style>
    </div>
  );
};

export default Links; 