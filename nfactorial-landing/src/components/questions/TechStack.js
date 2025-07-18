import React, { useState, useEffect, useRef } from 'react';

const TechStack = ({ formData, updateFormData }) => {
  const [linkedinLink, setLinkedinLink] = useState(formData.linkedinLink || '');
  const [hasScrolled, setHasScrolled] = useState(formData.hasScrolledContract || false);
  const [agreedToTerms, setAgreedToTerms] = useState(formData.agreedToTerms || false);
  const [showError, setShowError] = useState(false);
  const termsRef = useRef(null);

  // Отслеживаем скролл контракта
  const handleScroll = () => {
    if (termsRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = termsRef.current;
      // Если пользователь прокрутил до конца или почти до конца
      if (scrollTop + clientHeight >= scrollHeight - 50) {
        setHasScrolled(true);
        updateFormData({ hasScrolledContract: true });
      }
    }
  };

  const handleLinkedinChange = (e) => {
    setLinkedinLink(e.target.value);
    updateFormData({ linkedinLink: e.target.value });
  };

  const handleCheckboxChange = (e) => {
    if (!hasScrolled) {
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
      return; // Prevent checking if not scrolled
    }
    
    setAgreedToTerms(e.target.checked);
    
    if (e.target.checked && linkedinLink && hasScrolled) {
      updateFormData({ 
        linkedinLink: linkedinLink,
        agreedToTerms: true,
        techChoices: ['soulContract'] // Для совместимости с валидацией формы
      });
    } else {
      updateFormData({ 
        linkedinLink: linkedinLink,
        agreedToTerms: false
      });
    }
  };

  return (
    <div className="question-wrapper">
      <h2 className="question-title">Линкедин и контракт на душу</h2>
      
      <div className="question-content">
        <div className="input-group">
          <label>
            <span className="input-emoji">🎯</span> Данные: Ссылка на LinkedIn
          </label>
          <input
            type="url"
            value={linkedinLink}
            onChange={handleLinkedinChange}
            placeholder="https://linkedin.com/in/your-profile"
            className="linkedin-input"
          />
        </div>
        
        <div className="contract-container">
          <label className="contract-label">
            <span className="input-emoji">💣</span> UX: Terms & Conditions для твоей души
          </label>
          
          <div 
            ref={termsRef} 
            className="contract-text"
            onScroll={handleScroll}
          >
            <h3>УСЛОВИЯ И ПОЛОЖЕНИЯ ДОГОВОРА ПРОДАЖИ ДУШИ</h3>
            <p>Версия 14.2.8 от 01.04.2023</p>
            
            <p><strong>ПРОЧИТАЙТЕ ВНИМАТЕЛЬНО:</strong> Прокручивая этот текст, вы подтверждаете согласие со всеми его положениями.</p>
            
            <h4>1. ОПРЕДЕЛЕНИЕ ТЕРМИНОВ</h4>
            <p>1.1. "Компания" — загадочная организация, которая управляет React, TypeScript и прочими инструментами фронтенд-мучений.</p>
            <p>1.2. "Пользователь" (также "Вы", "Жертва", "Еще один фронтендер") — физическое лицо, которое по своей воле или по незнанию согласилось продать свою бессмертную душу.</p>
            <p>1.3. "Душа" — неосязаемая субстанция, которая будет использоваться для поддержания жизни в экосистеме JavaScript.</p>
            <p>1.4. "React" — демонический инструмент, который выглядит безобидно, пока не приходит время разобраться с ContextAPI.</p>
            
            <h4>2. ПРЕДМЕТ ДОГОВОРА</h4>
            <p>2.1. Настоящий Договор регулирует передачу прав на Вашу душу компании в обмен на временный доступ к знаниям фронтенд-разработки.</p>
            <p>2.2. Вы подтверждаете, что душа действительно принадлежит Вам и не была ранее заложена другим технологиям.</p>
            
            <h4>3. ПРАВА И ОБЯЗАННОСТИ СТОРОН</h4>
            <p>3.1. <strong>Компания обязуется:</strong></p>
            <p>3.1.1. Предоставить Вам иллюзию понимания React в течение первых трех проектов.</p>
            <p>3.1.2. Поддерживать постоянные обновления, нарушающие Ваш существующий код.</p>
            <p>3.1.3. Выпускать новые хуки каждые 6 месяцев, делая ваши знания устаревшими.</p>
            <p>3.1.4. Обеспечить не менее 27 конфликтов зависимостей в Вашем package.json.</p>
            
            <p>3.2. <strong>Пользователь обязуется:</strong></p>
            <p>3.2.1. Говорить всем, что React — лучший фреймворк, даже не попробовав другие.</p>
            <p>3.2.2. Сидеть до 3 часов ночи, отлаживая useEffect.</p>
            <p>3.2.3. Установить не менее 350 npm-пакетов для стилизации одной кнопки.</p>
            <p>3.2.4. Повторять "JSX — это так элегантно" перед каждым stand-up.</p>
            <p>3.2.5. Писать собственную библиотеку компонентов вместо использования готовой.</p>
            
            <h4>4. ОСОБЫЕ УСЛОВИЯ</h4>
            <p>4.1. Вам запрещается:</p>
            <p>4.1.1. Публично признавать, что вы не понимаете, как работает Redux.</p>
            <p>4.1.2. Называть CSS обычным языком программирования при других фронтендерах.</p>
            <p>4.1.3. Писать веб-приложения без единой анимации при наведении.</p>
            <p>4.1.4. Сдавать проекты в срок (это противоречит самой сути фронтенд-разработки).</p>
            
            <h4>5. РЕЖИМ РАБОТЫ</h4>
            <p>5.1. С момента подписания договора Вы обязаны:</p>
            <p>5.1.1. Просыпаться с мыслью о неоптимизированных компонентах.</p>
            <p>5.1.2. Видеть сны в формате JSX.</p>
            <p>5.1.3. Говорить на языке, состоящем на 40% из слов "component", "state", "prop" и "hook".</p>
            <p>5.1.4. Испытывать физическую боль при виде inline-стилей.</p>
            
            <h4>6. СРОК ДЕЙСТВИЯ ДОГОВОРА</h4>
            <p>6.1. Договор заключается на вечность или до выхода Web Assembly 3.0, что наступит раньше.</p>
            <p>6.2. Досрочное расторжение договора возможно только при условии полного отказа от использования интернета и перехода на жизнь в лесу.</p>
            
            <h4>7. ПРОЦЕСС ОТБОРА ДУШИ</h4>
            <p>7.1. Отбор души происходит постепенно с каждым установленным npm-пакетом.</p>
            <p>7.2. Полная потеря души наступает после первого самостоятельно написанного кастомного хука.</p>
            <p>7.3. Признаки потери души включают: говорить о JavaScript за обедом, рисовать архитектуру приложения на салфетках, объяснять бабушке, как работает virtual DOM.</p>
            
            <h4>8. ГАРАНТИИ</h4>
            <p>8.1. Компания гарантирует:</p>
            <p>8.1.1. Ваша душа будет использована для питания очередного громоздкого фреймворка.</p>
            <p>8.1.2. Вы получите временное облегчение от CSS-страданий (не более 30 минут в неделю).</p>
            <p>8.1.3. Минимум три человека будут впечатлены вашим тёмным режимом в приложении.</p>
            
            <h4>9. ЗАКЛЮЧИТЕЛЬНЫЕ ПОЛОЖЕНИЯ</h4>
            <p>9.1. Подписывая данный договор, вы подтверждаете, что осознаете всю тщетность попыток понять, почему ваш компонент перерендеривается 8 раз за секунду.</p>
            <p>9.2. Вы согласны с тем, что отныне слово "семантика" вызывает у вас нервную дрожь.</p>
            <p>9.3. Вы признаете, что добровольно становитесь частью культа фронтенд-разработки.</p>
            
            <p>ПОЗДРАВЛЯЕМ! ТЕПЕРЬ ВЫ ОФИЦИАЛЬНО ФРОНТЕНД-РАЗРАБОТЧИК!</p>
            <p>PS: Это навсегда. Серьёзно. Навсегда. Удачи вам прочитать этот маленький текст до конца...</p>
            <p>PSS: Вы дошли до конца? Какие молодцы... или просто промотали?</p>
            <p>PSSS: На случай если Вы просто промотали, знайте, что Ваша душа всё равно уже принадлежит нам. И да, этот текст нужно прокрутить до конца, иначе чекбокс не активируется.</p>
            <p>PSSSS: Правда, мы знаем, что Вы всё равно не читали весь контракт. Никто не читает...</p>
          </div>
          
          <div className="terms-checkbox-container">
            <label className={`terms-label ${!hasScrolled ? 'disabled-label' : ''}`}>
              <input 
                type="checkbox" 
                checked={agreedToTerms}
                onChange={handleCheckboxChange}
                disabled={!hasScrolled}
                className="terms-checkbox"
              />
              Я согласен продать душу и стать фронтенд-разработчиком навсегда
            </label>
            
            {showError && (
              <div className="scroll-error">Сначала прокрутите весь контракт до конца!</div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .question-content {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        
        .input-emoji {
          font-size: 1.2rem;
          margin-right: 8px;
        }
        
        .linkedin-input {
          width: 100%;
          padding: 12px;
          border: 2px solid #e41c3c;
          border-radius: 8px;
          font-size: 16px;
          margin-top: 8px;
          transition: all 0.3s;
        }
        
        .linkedin-input:focus {
          border-color: #ff8c00;
          box-shadow: 0 0 8px rgba(228, 28, 60, 0.3);
          outline: none;
        }
        
        .contract-container {
          margin-top: 15px;
        }
        
        .contract-label {
          display: block;
          margin-bottom: 10px;
          font-weight: 500;
        }
        
        .contract-text {
          height: 250px;
          overflow-y: scroll;
          padding: 20px;
          background-color: #f9f9f9;
          border: 1px solid #ddd;
          border-radius: 8px;
          font-size: 14px;
          line-height: 1.6;
          margin-bottom: 15px;
          box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.05);
          color: #333;
        }
        
        .contract-text h3, .contract-text h4 {
          color: #e41c3c;
          margin-top: 16px;
          margin-bottom: 8px;
        }
        
        .contract-text p {
          margin-bottom: 10px;
        }
        
        .terms-checkbox-container {
          margin-top: 16px;
        }
        
        .terms-label {
          display: flex;
          align-items: center;
          font-weight: 500;
          cursor: pointer;
        }
        
        .disabled-label {
          cursor: not-allowed;
          opacity: 0.6;
        }
        
        .terms-checkbox {
          margin-right: 10px;
          width: 18px;
          height: 18px;
        }
        
        .terms-checkbox:disabled {
          cursor: not-allowed;
        }
        
        .scroll-error {
          color: #e41c3c;
          margin-top: 8px;
          font-size: 14px;
          font-style: italic;
          animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
      `}</style>
    </div>
  );
};

export default TechStack; 