import React, { useState, useRef, useEffect } from 'react';

const Links = ({ formData, updateFormData, onNext }) => {
  const [githubLink, setGithubLink] = useState(formData.githubLink || '');
  const [buttonPosition, setButtonPosition] = useState({ top: 0, left: 0 });
  const [buttonCaught, setButtonCaught] = useState(formData.githubLinkCaught || false);
  const [attempts, setAttempts] = useState(0);
  const nextButtonRef = useRef(null);
  const containerRef = useRef(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  
  // Количество попыток, после которых кнопку можно поймать
  const REQUIRED_ATTEMPTS = 10;

  // Функция для настройки безопасных границ
  const updateButtonPosition = () => {
    if (containerRef.current) {
      const container = containerRef.current.getBoundingClientRect();
      setContainerSize({ width: container.width, height: container.height });
      
      // Безопасные отступы от краев
      const BUTTON_HEIGHT = 44; // высота кнопки + отступы
      const BUTTON_WIDTH = 100; // ширина кнопки + отступы
      const SAFE_MARGIN = 20; // дополнительный отступ для безопасности
      
      setButtonPosition({
        top: Math.min(container.height / 2 - BUTTON_HEIGHT/2, container.height - BUTTON_HEIGHT - SAFE_MARGIN),
        left: Math.min(container.width / 2 - BUTTON_WIDTH/2, container.width - BUTTON_WIDTH - SAFE_MARGIN)
      });
    }
  };

  // Инициализация и обновление при изменении размера
  useEffect(() => {
    updateButtonPosition();
    
    // Добавляем слушатель изменения размера окна
    window.addEventListener('resize', updateButtonPosition);
    
    return () => {
      window.removeEventListener('resize', updateButtonPosition);
    };
  }, []);

  const handleGithubLinkChange = (e) => {
    setGithubLink(e.target.value);
    updateFormData({ githubLink: e.target.value });
  };
  
  // Функция для перемещения кнопки в случайную позицию
  const moveButtonRandomly = () => {
    if (buttonCaught) return;
    
    // Безопасные границы с учетом размеров кнопки
    const BUTTON_HEIGHT = 44;
    const BUTTON_WIDTH = 100;
    const SAFE_MARGIN = 10;
    
    // Random position within the container with safe margins
    const maxTop = containerSize.height - BUTTON_HEIGHT - SAFE_MARGIN;
    const maxLeft = containerSize.width - BUTTON_WIDTH - SAFE_MARGIN;
    
    // Убедимся, что значения положительные и применим более широкий диапазон
    const newTop = Math.max(SAFE_MARGIN, Math.min(Math.random() * maxTop, maxTop));
    const newLeft = Math.max(SAFE_MARGIN, Math.min(Math.random() * maxLeft, maxLeft));
    
    setButtonPosition({
      top: newTop,
      left: newLeft
    });
  };

  const handleMouseEnter = () => {
    if (buttonCaught || !githubLink.includes('github.com')) return;
    
    setAttempts(attempts + 1);
    
    // После REQUIRED_ATTEMPTS попыток, позволяем поймать кнопку
    if (attempts >= REQUIRED_ATTEMPTS) {
      setButtonCaught(true);
      updateFormData({ 
        githubLink: githubLink, 
        githubLinkCaught: true 
      });
      return;
    }
    
    moveButtonRandomly();
  };

  const handleContainerClick = (e) => {
    // Перемещаем кнопку случайным образом при клике на контейнер,
    // если кнопка еще не поймана
    if (!buttonCaught && githubLink.includes('github.com')) {
      moveButtonRandomly();
    }
  };

  const handleButtonClick = (e) => {
    e.stopPropagation(); // Предотвращаем всплытие события до контейнера
    
    if (!buttonCaught && githubLink.includes('github.com')) {
      // Если кнопка еще не поймана, но есть правильная ссылка GitHub
      setButtonCaught(true);
      updateFormData({ 
        githubLink: githubLink, 
        githubLinkCaught: true 
      });
    } else if (buttonCaught && onNext) {
      // Если кнопка уже поймана и пользователь нажал на нее снова, переходим дальше
      onNext();
    }
  };

  // Determine the message to show
  const getMessage = () => {
    if (buttonCaught) {
      return <div className="button-message success">Well done! You've caught the button!</div>;
    } else if (attempts > 0) {
      if (attempts < REQUIRED_ATTEMPTS * 0.3) return <div className="button-message">Not so fast!</div>;
      if (attempts < REQUIRED_ATTEMPTS * 0.6) return <div className="button-message">Keep trying!</div>;
      if (attempts < REQUIRED_ATTEMPTS * 0.9) return <div className="button-message">Almost there!</div>;
      return <div className="button-message">Just a bit more effort!</div>;
    }
    return null;
  };

  return (
    <div className="question-wrapper">
      <h2 className="question-title">GitHub trap</h2>
      
      <div className="question-content">
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
        
        <div 
          className="runaway-button-container" 
          ref={containerRef}
          onClick={handleContainerClick}
        >
          <button
            ref={nextButtonRef}
            className={`runaway-button ${buttonCaught ? 'caught' : ''}`}
            style={{ 
              top: `${buttonPosition.top}px`, 
              left: `${buttonPosition.left}px`,
              transition: attempts > 0 ? 'all 0.15s ease-out' : 'none'
            }}
            onMouseEnter={handleMouseEnter}
            onClick={handleButtonClick}
          >
            {buttonCaught ? 'Caught me!' : 'Next'}
          </button>
          
          {getMessage()}
        </div>
      </div>

      <style jsx>{`
        .runaway-button-container {
          position: relative;
          height: 350px;
          margin-top: 40px;
          border: 1px dashed #ccc;
          border-radius: 8px;
          overflow: hidden;
          cursor: pointer;
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
          max-width: 100px;
          user-select: none;
        }
        
        .runaway-button.caught {
          background: linear-gradient(135deg, #4CAF50, #8BC34A);
          transform: scale(1.1);
          transition: all 0.3s ease !important;
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
        
        @media (max-width: 768px) {
          .runaway-button-container {
            height: 300px;
          }
        }
      `}</style>
    </div>
  );
};

export default Links; 