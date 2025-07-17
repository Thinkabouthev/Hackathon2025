import React, { useState, useEffect } from 'react';

const PhoneNumber = ({ formData, updateFormData }) => {
  const [phoneNumber, setPhoneNumber] = useState(formData.phoneNumber || '');
  const [currentLabelIndex, setCurrentLabelIndex] = useState(0);
  const [labelText, setLabelText] = useState('Email or Telegram');
  
  const changingLabels = [
    'Email or Telegram',
    'Favorite food',
    'Birth year',
    'Pet name',
    'Childhood hero',
    'First job',
    'Favorite color'
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentLabelIndex((prevIndex) => (prevIndex + 1) % changingLabels.length);
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    setLabelText(changingLabels[currentLabelIndex]);
  }, [currentLabelIndex]);

  const handlePhoneNumberChange = (e) => {
    const value = e.target.value;
    setPhoneNumber(value);
    updateFormData({ phoneNumber: value });
  };

  return (
    <div className="question-wrapper">
      <h2 className="question-title">Contact crisis</h2>
      
      <div className="question-content">
        <div className="input-group">
          <label htmlFor="phoneNumber" className="changing-label">
            {labelText}
            <span className="label-hint">(Don't worry, we just need your email or Telegram)</span>
          </label>
          <input
            type="text"
            id="phoneNumber"
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
            placeholder="Enter your email or Telegram username"
          />
          <div className="input-description">
            The label keeps changing, but we really just need your contact info.
          </div>
        </div>
      </div>

      <style jsx>{`
        .changing-label {
          transition: color 0.3s ease;
          animation: colorChange 3s infinite;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        
        .label-hint {
          font-size: 0.8rem;
          opacity: 0.6;
          font-style: italic;
        }
        
        .input-description {
          margin-top: 10px;
          font-size: 0.9rem;
          color: #666;
          font-style: italic;
        }
        
        @keyframes colorChange {
          0% { color: #e41c3c; }
          33% { color: #ff8c00; }
          66% { color: #ff1493; }
          100% { color: #e41c3c; }
        }
      `}</style>
    </div>
  );
};

export default PhoneNumber; 