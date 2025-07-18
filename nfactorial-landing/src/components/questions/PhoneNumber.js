import React, { useState, useEffect } from 'react';
import './PhoneNumber.css';

const PhoneNumber = ({ formData, updateFormData, onNext }) => {
  const [phoneDigits, setPhoneDigits] = useState(Array(10).fill(8));
  const [currentDigitIndex, setCurrentDigitIndex] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [showNextButton, setShowNextButton] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [lastClickTime, setLastClickTime] = useState(0);
  const [inactivityTimer, setInactivityTimer] = useState(null);
  const [playInactivitySound, setPlayInactivitySound] = useState(false);

  // Convert digits array to phone number string for form data
  useEffect(() => {
    if (isEditing) {
      const phoneNumberStr = `+7 (${phoneDigits[0]}${phoneDigits[1]}${phoneDigits[2]}) ${phoneDigits[3]}${phoneDigits[4]}${phoneDigits[5]}-${phoneDigits[6]}${phoneDigits[7]}-${phoneDigits[8]}${phoneDigits[9]}`;
      updateFormData({ phoneNumber: phoneNumberStr });
    }
  }, [phoneDigits, isEditing, updateFormData]);

  // Handle inactivity
  useEffect(() => {
    if (isEditing) {
      // Clear previous timer if exists
      if (inactivityTimer) clearTimeout(inactivityTimer);
      
      // Set new inactivity timer (15 seconds)
      const timer = setTimeout(() => {
        setPlayInactivitySound(true);
      }, 15000);
      
      setInactivityTimer(timer);
    }
    
    return () => {
      if (inactivityTimer) clearTimeout(inactivityTimer);
    };
  }, [isEditing, phoneDigits, currentDigitIndex]);

  // Reset inactivity sound after playing
  useEffect(() => {
    if (playInactivitySound) {
      setTimeout(() => {
        setPlayInactivitySound(false);
      }, 3000);
    }
  }, [playInactivitySound]);

  const handleStartEditing = () => {
    setIsEditing(true);
  };

  const handleIncrementDigit = () => {
    const currentTime = new Date().getTime();
    
    // Check if clicking too fast (less than 300ms between clicks)
    if (currentTime - lastClickTime < 300) {
      setShowWarning(true);
      setTimeout(() => setShowWarning(false), 3000);
    } else {
      const newDigits = [...phoneDigits];
      newDigits[currentDigitIndex] = (newDigits[currentDigitIndex] + 1) % 10;
      setPhoneDigits(newDigits);
    }
    
    setLastClickTime(currentTime);
    
    // Reset inactivity timer
    if (inactivityTimer) clearTimeout(inactivityTimer);
    setPlayInactivitySound(false);
  };

  const handleConfirmDigit = () => {
    if (currentDigitIndex < 9) {
      setCurrentDigitIndex(currentDigitIndex + 1);
    } else {
      setShowNextButton(true);
    }
    
    // Reset inactivity timer
    if (inactivityTimer) clearTimeout(inactivityTimer);
    setPlayInactivitySound(false);
  };

  const handleNextClick = () => {
    if (onNext && typeof onNext === 'function') {
      onNext();
    }
  };

  const renderPhoneDigit = (index) => {
    const isCurrentDigit = isEditing && index === currentDigitIndex;
    
    return (
      <span 
        className={`phone-digit ${isCurrentDigit ? 'current-digit' : ''}`}
      >
        {phoneDigits[index]}
      </span>
    );
  };

  const renderPhoneNumber = () => {
    if (!isEditing) {
      return (
        <div className="static-phone">
          +7 (777) 888-88-88
          <button className="edit-button" onClick={handleStartEditing}>
            изменить
          </button>
        </div>
      );
    }

    return (
      <div className="phone-input">
        <div className="phone-display">
          +7 (
          {renderPhoneDigit(0)}
          {renderPhoneDigit(1)}
          {renderPhoneDigit(2)}
          ) 
          {renderPhoneDigit(3)}
          {renderPhoneDigit(4)}
          {renderPhoneDigit(5)}
          -
          {renderPhoneDigit(6)}
          {renderPhoneDigit(7)}
          -
          {renderPhoneDigit(8)}
          {renderPhoneDigit(9)}
        </div>
        
        <div className="controls">
          <button className="increment-button" onClick={handleIncrementDigit}>+</button>
          <button className="confirm-button" onClick={handleConfirmDigit}>OK</button>
        </div>
      </div>
    );
  };

  return (
    <div className="question-wrapper">
      <h2 className="question-title">Номер телефона через боль</h2>
      
      <div className="question-content">
        <div className="instruction">
          Введите номер вручную.
          <div className="instruction-detail">(по-другому никак)</div>
        </div>
        
        {renderPhoneNumber()}
        
        {showWarning && (
          <div className="warning-message">
            Мы заметили агрессию. Расслабься. Это UX.
          </div>
        )}
        
        {playInactivitySound && (
          <div className="inactivity-message">
            Пиииип... оживите форму
          </div>
        )}
        
        {showNextButton && (
          <div className="next-container">
            <button className="next-button" onClick={handleNextClick}>ДАЛЕЕ</button>
            <div className="ux-message">
              "Если ты ввёл этот номер — ты точно достоин быть UX-инженером."
              <br />
              "Эта форма создана по ГОСТу бюрократии 2003 года."
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PhoneNumber; 