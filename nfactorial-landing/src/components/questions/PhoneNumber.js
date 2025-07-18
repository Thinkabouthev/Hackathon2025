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
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showResetForm, setShowResetForm] = useState(false);
  const [confirmClickCount, setConfirmClickCount] = useState(0);
  const [hasShownError, setHasShownError] = useState(false);
  const [phone, setPhone] = useState('');

  // Convert digits array to phone number string for form data
  useEffect(() => {
    if (isEditing) {
      const phoneNumberStr = `+7 (${phoneDigits[0]}${phoneDigits[1]}${phoneDigits[2]}) ${phoneDigits[3]}${phoneDigits[4]}${phoneDigits[5]}-${phoneDigits[6]}${phoneDigits[7]}-${phoneDigits[8]}${phoneDigits[9]}`;
      updateFormData({ phoneNumber: phoneNumberStr, phone: phoneNumberStr });
      setPhone(phoneNumberStr);
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
    setShowError(false);
    setShowResetForm(false);
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
    // Не позволяем быстро нажимать кнопку OK подряд
    if (isButtonDisabled) {
      return;
    }
    
    // Увеличиваем счетчик нажатий
    setConfirmClickCount(confirmClickCount + 1);
    
    // Блокируем кнопку на короткое время
    setIsButtonDisabled(true);
    setTimeout(() => {
      setIsButtonDisabled(false);
    }, 800); // Задержка 800мс между нажатиями
    
    if (currentDigitIndex < 9) {
      setCurrentDigitIndex(currentDigitIndex + 1);
    } else {
      // Завершили ввод номера
      setShowNextButton(true);
    }
    
    // Reset inactivity timer
    if (inactivityTimer) clearTimeout(inactivityTimer);
    setPlayInactivitySound(false);
  };

  const handleNextClick = () => {
    // Если ошибка уже была показана ранее и пользователь повторно заполнил форму
    if (hasShownError) {
      // Переходим на следующий этап
      if (onNext && typeof onNext === 'function') {
        onNext();
      }
      return;
    }
    
    // Первый раз - показываем ошибку
    // Эмулируем загрузку страницы
    setIsLoading(true);
    
    // Через 2 секунды показываем ошибку
    setTimeout(() => {
      setIsLoading(false);
      setShowError(true);
      setShowNextButton(false);
      setIsEditing(false);
      setShowResetForm(true);
      // Сбрасываем форму
      setCurrentDigitIndex(0);
      setPhoneDigits(Array(10).fill(8));
      // Отмечаем что ошибка была показана
      setHasShownError(true);
    }, 2000);
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
          <button 
            className={`confirm-button ${isButtonDisabled ? 'disabled' : ''}`} 
            onClick={handleConfirmDigit} 
            disabled={isButtonDisabled}
          >
            OK
          </button>
        </div>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="question-wrapper">
        <h2 className="question-title">Номер телефона через боль</h2>
        <div className="question-content">
          <div className="loading-screen">
            <div className="spinner"></div>
            <p>Отправка данных...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="question-wrapper">
      <h2 className="question-title">Номер телефона через боль</h2>
      
      <div className="question-content">
        {showError && (
          <div className="error-message">
            <h3>Произошла ошибка! ¯\_(ツ)_/¯</h3>
            <p>Похоже, что-то пошло не так при обработке вашего номера.</p>
            <p>Пожалуйста, заполните форму заново.</p>
          </div>
        )}
        
        {!showError && (
          <div className="instruction">
            Введите номер вручную.
            <div className="instruction-detail">(по-другому никак)</div>
          </div>
        )}
        
        {showResetForm && (
          <button className="edit-button" onClick={handleStartEditing}>
            Заполнить заново
          </button>
        )}
        
        {!showResetForm && renderPhoneNumber()}
        
        {showWarning && (
          <div className="warning-message">
            Мы заметили агрессию. Расслабься. Это кнопки.
          </div>
        )}
        
        {playInactivitySound && (
          <div className="inactivity-message">
            Пиииип... оживите форму
          </div>
        )}
        
        {showNextButton && (
          <div className="next-container">
            <button 
              className="next-button" 
              onClick={handleNextClick}
            >
              {hasShownError ? 'ПРОДОЛЖИТЬ' : 'ДАЛЕЕ'}
            </button>
            <div className="ux-message">
              {hasShownError 
                ? "На этот раз всё должно получиться!"
                : <>
                    "Если ты ввёл этот номер — ты точно достоин быть UX-инженером."
                    <br />
                    "Эта форма создана по ГОСТу бюрократии 2003 года."
                  </>
              }
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PhoneNumber; 