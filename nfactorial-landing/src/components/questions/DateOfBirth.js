import React, { useState } from 'react';

const DateOfBirth = ({ formData, updateFormData }) => {
  const [year, setYear] = useState(formData.birthYear || '');
  const [captchaCompleted, setCaptchaCompleted] = useState(formData.captchaCompleted || false);
  const [captchaAttempt, setCaptchaAttempt] = useState('');

  // Generate years starting from 1910
  const years = [];
  for (let i = 1910; i <= 1950; i++) {
    years.push(i);
  }

  const handleYearChange = (e) => {
    setYear(e.target.value);
    updateFormData({ birthYear: e.target.value });
  };

  const handleCaptchaChange = (e) => {
    setCaptchaAttempt(e.target.value);
  };

  const handleCaptchaSubmit = () => {
    // Any input is considered valid for this absurd CAPTCHA
    if (captchaAttempt.trim() !== '') {
      setCaptchaCompleted(true);
      updateFormData({ captchaCompleted: true });
    }
  };

  return (
    <div className="question-wrapper">
      <h2 className="question-title">Date of Birth</h2>
      
      <div className="question-content">
        <div className="input-group">
          <label htmlFor="birthYear">Select your birth year</label>
          <select
            id="birthYear"
            value={year}
            onChange={handleYearChange}
            className="year-select"
          >
            <option value="">Select year</option>
            {years.map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>

        <div className="captcha-container">
          <h3 className="captcha-title">CAPTCHA: Prove you're still alive</h3>
          
          {!captchaCompleted ? (
            <div className="captcha-challenge">
              <div className="captcha-question">
                Complete this sentence: "Despite my advanced age, I can still..."
              </div>
              
              <div className="captcha-input-group">
                <input
                  type="text"
                  value={captchaAttempt}
                  onChange={handleCaptchaChange}
                  placeholder="Type anything to prove you're alive"
                  className="captcha-input"
                />
                <button 
                  className="captcha-button"
                  onClick={handleCaptchaSubmit}
                  disabled={captchaAttempt.trim() === ''}
                >
                  Verify
                </button>
              </div>
            </div>
          ) : (
            <div className="captcha-success">
              <div className="success-icon">✓</div>
              <div className="success-message">You've proven you're still breathing. Congratulations!</div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .year-select {
          width: 100%;
          padding: 0.75rem;
          border: 2px solid var(--medium-gray);
          border-radius: 6px;
          font-family: 'Inter', sans-serif;
          font-size: 1rem;
          transition: all 0.2s ease;
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23333' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 0.75rem center;
          background-size: 1rem;
        }
        
        .year-select:focus {
          outline: none;
          border-color: var(--primary-color);
          box-shadow: 0 0 0 3px rgba(138, 43, 226, 0.1);
        }
        
        .captcha-container {
          margin-top: 2.5rem;
          padding: 1.5rem;
          border: 1px solid var(--medium-gray);
          border-radius: 8px;
          background-color: var(--light-gray);
        }
        
        .captcha-title {
          font-size: 1.1rem;
          margin-bottom: 1rem;
          color: var(--primary-color);
        }
        
        .captcha-question {
          margin-bottom: 1rem;
          font-style: italic;
        }
        
        .captcha-input-group {
          display: flex;
          gap: 0.5rem;
        }
        
        .captcha-input {
          flex-grow: 1;
        }
        
        .captcha-button {
          padding: 0.75rem 1.5rem;
          background-color: var(--accent-color);
          color: var(--text-color);
          border: none;
          border-radius: 6px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .captcha-button:hover:not(:disabled) {
          background-color: #00e673;
          transform: translateY(-2px);
        }
        
        .captcha-button:disabled {
          background-color: var(--medium-gray);
          cursor: not-allowed;
        }
        
        .captcha-success {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        
        .success-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          background-color: var(--accent-color);
          color: white;
          border-radius: 50%;
          font-size: 1.2rem;
        }
        
        .success-message {
          font-weight: 500;
        }
      `}</style>
    </div>
  );
};

export default DateOfBirth; 