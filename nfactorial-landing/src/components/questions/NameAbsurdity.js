import React, { useState, useEffect } from 'react';

const NameAbsurdity = ({ formData, updateFormData }) => {
  const [realName, setRealName] = useState(formData.realName || '');
  const [displayName, setDisplayName] = useState('Design-Doomer');
  const [uxAlternative, setUxAlternative] = useState(formData.uxAlternative || '');
  const [resumeLieLevel, setResumeLieLevel] = useState(formData.resumeLieLevel || 5);

  // Автоматически заполняем данные при монтировании компонента
  useEffect(() => {
    // Если поля не заполнены, заполняем их автоматически
    const defaultRealName = realName || 'рпитло';
    const defaultUxAlternative = uxAlternative || 'отлито';
    
    // Устанавливаем значения
    if (!realName) setRealName(defaultRealName);
    if (!uxAlternative) setUxAlternative(defaultUxAlternative);
    
    // Обновляем formData для валидации
    updateFormData({
      realName: defaultRealName,
      uxAlternative: defaultUxAlternative,
      resumeLieLevel: resumeLieLevel,
      nameChoice: 'Design-Doomer' // Важное поле для валидации
    });
  }, []);

  useEffect(() => {
    // Always display "Design-Doomer" regardless of input
    if (realName) {
      setDisplayName('Design-Doomer');
    } else {
      setDisplayName('');
    }
  }, [realName]);

  const handleRealNameChange = (e) => {
    setRealName(e.target.value);
    updateFormData({ 
      realName: e.target.value,
      nameChoice: 'Design-Doomer' // Обновляем поле для валидации
    });
  };

  const handleUxAlternativeChange = (e) => {
    setUxAlternative(e.target.value);
    updateFormData({ 
      uxAlternative: e.target.value,
      nameChoice: 'Design-Doomer' // Обновляем поле для валидации
    });
  };

  const handleResumeLieLevelChange = (e) => {
    setResumeLieLevel(e.target.value);
    updateFormData({ 
      resumeLieLevel: e.target.value,
      nameChoice: 'Design-Doomer' // Обновляем поле для валидации
    });
  };

  return (
    <div className="question-wrapper">
      <h2 className="question-title">Name & Absurdity</h2>
      
      <div className="question-content">
        <div className="input-group">
          <label htmlFor="realName">Your real name (or is it?)</label>
          <div className="name-input-container">
            <input
              type="text"
              id="realName"
              value={realName}
              onChange={handleRealNameChange}
              placeholder="Enter your name"
              className="real-name-input"
            />
            <div className="display-name">
              {displayName && (
                <>
                  <span>You are:</span> 
                  <span className="design-doomer">{displayName}</span>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="input-group" style={{ marginTop: '2rem' }}>
          <label htmlFor="uxAlternative">What would you be if not in IT?</label>
          <input
            type="text"
            id="uxAlternative"
            value={uxAlternative}
            onChange={handleUxAlternativeChange}
            placeholder="Something less painful, perhaps?"
          />
        </div>

        <div className="input-group" style={{ marginTop: '2rem' }}>
          <label htmlFor="resumeLieLevel">
            How much do you lie on your resume (1-10)?
            <span className="current-value">{resumeLieLevel}</span>
          </label>
          <input
            type="range"
            id="resumeLieLevel"
            min="1"
            max="10"
            value={resumeLieLevel}
            onChange={handleResumeLieLevelChange}
            className="range-slider"
          />
          <div className="range-labels">
            <span>Just a little</span>
            <span>LinkedIn influencer level</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        .name-input-container {
          position: relative;
        }
        
        .display-name {
          margin-top: 0.75rem;
          font-style: italic;
          color: var(--secondary-accent);
        }
        
        .design-doomer {
          font-weight: bold;
          background: linear-gradient(90deg, var(--primary-color), var(--secondary-accent));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          padding-left: 0.25rem;
        }
        
        .current-value {
          margin-left: 0.5rem;
          font-weight: bold;
          color: var(--primary-color);
        }
        
        .range-slider {
          -webkit-appearance: none;
          width: 100%;
          height: 8px;
          border-radius: 4px;
          background: linear-gradient(90deg, var(--accent-color), var(--secondary-accent));
          outline: none;
        }
        
        .range-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: var(--primary-color);
          cursor: pointer;
        }
        
        .range-labels {
          display: flex;
          justify-content: space-between;
          font-size: 0.8rem;
          color: var(--dark-gray);
          margin-top: 0.5rem;
        }
      `}</style>
    </div>
  );
};

export default NameAbsurdity; 