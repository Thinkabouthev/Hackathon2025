import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Winner.css';

// Базовый URL API с полным адресом
const API_BASE_URL = 'http://localhost:8000';

const Winner = () => {
  const [winnerInfo, setWinnerInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [debug, setDebug] = useState(null);
  const [resetting, setResetting] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);
  const [resetError, setResetError] = useState(null);

  useEffect(() => {
    const fetchWinnerInfo = async () => {
      try {
        console.log("Отправка запроса к API для получения статуса соревнования");
        const response = await fetch(`${API_BASE_URL}/competition-status`);
        const data = await response.json();
        
        console.log("Получен ответ:", data);
        setDebug(JSON.stringify(data, null, 2));
        
        if (!response.ok) {
          throw new Error('Не удалось получить информацию о победителе');
        }
        
        if (data.status === "ongoing") {
          // Это нормальный случай, когда соревнование еще идет
          setWinnerInfo(data);
          setLoading(false);
          return;
        }
        
        if (!data.winner || !data.winner.mentor_name) {
          throw new Error('Данные о победителе отсутствуют или некорректны');
        }
        
        setWinnerInfo(data);
        setLoading(false);
      } catch (err) {
        console.error("Ошибка при получении данных:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchWinnerInfo();
  }, [resetSuccess]); // Перезагружаем данные после успешного сброса

  // Функция для сброса соревнования
  const handleResetCompetition = async () => {
    setResetting(true);
    setResetSuccess(false);
    setResetError(null);
    
    try {
      const response = await fetch(`${API_BASE_URL}/reset-competition`, {
        method: 'POST',
      });
      
      const data = await response.json();
      
      if (response.ok) {
        console.log("Соревнование успешно сброшено:", data);
        setResetSuccess(true);
      } else {
        console.error("Ошибка при сбросе соревнования:", data);
        setResetError("Не удалось сбросить соревнование: " + JSON.stringify(data));
      }
    } catch (err) {
      console.error("Ошибка при сбросе соревнования:", err);
      setResetError("Ошибка сети: " + err.message);
    } finally {
      setResetting(false);
    }
  };

  // Функция для определения эмодзи и цвета ментора
  const getMentorDetails = (mentorName) => {
    console.log("Получаем детали для ментора:", mentorName);
    
    const mentorMap = {
      'Диана': { emoji: '🔥', color: '#a259e6' },
      'Бернар': { emoji: '🌤', color: '#ffb357' },
      'Бахредин': { emoji: '⚡️', color: '#4a90e2' },
      'Абай': { emoji: '🌊', color: '#3ec28f' }
    };

    const details = mentorMap[mentorName] || { emoji: '🏆', color: 'gold' };
    console.log("Детали ментора:", details);
    return details;
  };

  if (loading) {
    return (
      <div className="winner-container loading">
        <h1>Определяем победителя...</h1>
        <div className="loader"></div>
      </div>
    );
  }

  if (error || !winnerInfo) {
    return (
      <div className="winner-container error">
        <h1>Ой! Что-то пошло не так</h1>
        <p>{error || 'Не удалось получить информацию о победителе'}</p>
        {debug && (
          <div className="debug-info">
            <h3>Отладочная информация:</h3>
            <pre>{debug}</pre>
          </div>
        )}
        <div className="buttons">
          <Link to="/" className="back-home-btn">Вернуться на главную</Link>
          <button 
            className="refresh-btn" 
            onClick={() => window.location.reload()}
          >
            Обновить данные
          </button>
        </div>
      </div>
    );
  }

  // Если соревнование еще не завершено
  if (winnerInfo.status === "ongoing") {
    return (
      <div className="winner-container ongoing">
        <h1>Соревнование еще не завершено!</h1>
        <p>Участники все еще сражаются. Возвращайтесь позже, чтобы узнать победителя.</p>
        <div className="stats">
          <p>Количество участников: {winnerInfo.participants_count}</p>
        </div>
        <div className="buttons">
          <Link to="/" className="back-home-btn">Вернуться на главную</Link>
          <button 
            className="reset-btn"
            onClick={handleResetCompetition}
            disabled={resetting}
          >
            {resetting ? 'Сброс...' : 'Сбросить соревнование'}
          </button>
        </div>
      </div>
    );
  }

  // Если есть победитель
  const mentorName = winnerInfo.winner.mentor_name;
  const mentorDetails = getMentorDetails(mentorName);

  return (
    <div className="winner-container completed">
      <div className="confetti"></div>
      
      <div className="winner-announcement" style={{ borderColor: mentorDetails.color }}>
        <div className="winner-emoji">{mentorDetails.emoji}</div>
        <h1>Победитель определен!</h1>
        <h2>Клан ментора <span style={{ color: mentorDetails.color }}>{mentorName}</span> выиграл!</h2>
        
        <div className="winner-details">
          <p>Первым к финишу пришел: <strong>{winnerInfo.winner.name}</strong></p>
          <p>Дата и время завершения: {new Date(winnerInfo.winner.completed_at).toLocaleString()}</p>
          <p>Всего участников: {winnerInfo.participants_count}</p>
        </div>
        
        <div className="celebration-message">
          "Поздравляем команду ментора {mentorName}! 
          Ваша настойчивость, творческий подход и терпение привели вас к победе!"
        </div>
        
        {debug && (
          <div className="debug-info">
            <details>
              <summary>Отладочная информация</summary>
              <pre>{debug}</pre>
            </details>
          </div>
        )}
        
        {resetSuccess && (
          <div className="reset-success">
            Соревнование успешно сброшено! Можно начинать новую игру.
          </div>
        )}
        
        {resetError && (
          <div className="reset-error">
            {resetError}
          </div>
        )}
      </div>
      
      <div className="admin-panel">
        <h3>Панель администратора</h3>
        <div className="buttons">
          <Link to="/" className="back-home-btn">Вернуться на главную</Link>
          <button 
            className="refresh-btn" 
            onClick={() => window.location.reload()}
          >
            Обновить данные
          </button>
          <button 
            className="reset-btn"
            onClick={handleResetCompetition}
            disabled={resetting}
          >
            {resetting ? 'Сброс...' : 'Начать новую игру'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Winner; 