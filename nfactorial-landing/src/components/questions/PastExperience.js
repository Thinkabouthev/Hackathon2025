import React, { useState } from 'react';

const PastExperience = ({ formData, updateFormData }) => {
  const [personalStatement, setPersonalStatement] = useState(formData.personalStatement || '');

  const handlePersonalStatementChange = (e) => {
    setPersonalStatement(e.target.value);
    updateFormData({ personalStatement: e.target.value });
  };

  return (
    <div className="question-wrapper acid-form">
      <h2 className="question-title acid-title">Acid Form</h2>
      
      <div className="question-content">
        <div className="input-group acid-input-group">
          <label htmlFor="personal-statement" className="acid-label">
            Write a one-line personal statement
          </label>
          <textarea
            id="personal-statement"
            value={personalStatement}
            onChange={handlePersonalStatementChange}
            placeholder="I am the best because..."
            className="acid-textarea"
            maxLength={100}
          />
          <div className="character-count">
            {personalStatement.length}/100 characters
          </div>
        </div>
        
        <div className="acid-warning">
          <span className="acid-warning-icon">⚠️</span>
          Warning: This form may cause visual discomfort and existential dread
        </div>
      </div>

      <style jsx>{`
        .acid-form {
          animation: backgroundShift 10s infinite linear;
        }
        
        @keyframes backgroundShift {
          0% { background-color: rgba(255, 0, 255, 0.05); }
          25% { background-color: rgba(0, 255, 255, 0.05); }
          50% { background-color: rgba(255, 255, 0, 0.05); }
          75% { background-color: rgba(0, 255, 0, 0.05); }
          100% { background-color: rgba(255, 0, 255, 0.05); }
        }
        
        .acid-title {
          font-family: "Comic Sans MS", cursive, sans-serif;
          color: #ff00ff;
          text-shadow: 2px 2px 0 #00ffff, -2px -2px 0 #ffff00;
          animation: textColorShift 3s infinite linear;
        }
        
        @keyframes textColorShift {
          0% { color: #ff00ff; }
          33% { color: #00ff00; }
          66% { color: #00ffff; }
          100% { color: #ff00ff; }
        }
        
        .acid-label {
          font-family: "Comic Sans MS", cursive, sans-serif;
          font-size: 1.3rem;
          color: #ff00ff;
          animation: blink 1s infinite;
        }
        
        @keyframes blink {
          0% { opacity: 1; }
          50% { opacity: 0.7; }
          100% { opacity: 1; }
        }
        
        .acid-textarea {
          background-color: rgba(0, 0, 0, 0.8);
          color: #00ff00;
          border: 3px solid #ff00ff;
          font-family: "Comic Sans MS", cursive, sans-serif;
          font-size: 1.2rem;
          text-shadow: 1px 1px 2px #00ffff;
          box-shadow: 0 0 15px rgba(255, 0, 255, 0.5);
        }
        
        .acid-textarea:focus {
          border-color: #00ffff;
          box-shadow: 0 0 20px rgba(0, 255, 255, 0.7);
        }
        
        .character-count {
          font-family: "Comic Sans MS", cursive, sans-serif;
          color: #00ffff;
          text-align: right;
          margin-top: 0.5rem;
        }
        
        .acid-warning {
          margin-top: 2rem;
          padding: 1rem;
          background-color: rgba(0, 0, 0, 0.7);
          border: 2px dashed #ff00ff;
          color: #ffff00;
          font-family: "Comic Sans MS", cursive, sans-serif;
          text-align: center;
          animation: borderColorShift 5s infinite linear;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }
        
        @keyframes borderColorShift {
          0% { border-color: #ff00ff; }
          25% { border-color: #00ffff; }
          50% { border-color: #ffff00; }
          75% { border-color: #00ff00; }
          100% { border-color: #ff00ff; }
        }
        
        .acid-warning-icon {
          font-size: 1.5rem;
          animation: rotate 3s infinite linear;
        }
        
        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default PastExperience; 