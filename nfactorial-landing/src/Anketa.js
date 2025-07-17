import React, { useState } from 'react';
import './App1.css';
import { useNavigate } from 'react-router-dom';

function Anketa() {
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [archetypeResult, setArchetypeResult] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError('');
    setSubmitted(false);
    setArchetypeResult(null);

    try {
      const response = await fetch('http://localhost:8000/assign-archetypes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          description: desc
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitted(true);
        setArchetypeResult(data);
        localStorage.setItem('mentor_info', JSON.stringify(data));
      } else {
        setError('Ошибка при отправке: ' + (
          typeof data.detail === 'string' 
            ? data.detail 
            : JSON.stringify(data.detail)
        ));
      }
    } catch (err) {
      setError('Сетевая ошибка: ' + err.message);
    }
  };

  const handleContinue = () => {
    navigate('/game');
  };

  return (
    <div className="App hogwarts-bg">
      <h1 className="hogwarts-title">Анкета участника</h1>

      <form onSubmit={handleSubmit} style={{ maxWidth: '600px', margin: '0 auto', padding: '2rem' }}>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ fontSize: '1.1rem' }}>Имя:</label><br />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-input"
            placeholder="Введите ваше имя"
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ fontSize: '1.1rem' }}>Описание:</label><br />
          <textarea
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            rows={6}
            className="form-input"
            placeholder="Расскажите о себе..."
          />
        </div>

        {error && <div style={{ color: '#ff7070', marginBottom: '1rem' }}>{error}</div>}
        {submitted && <div style={{ color: '#80ff95', marginBottom: '1rem' }}>Анкета отправлена успешно!</div>}

        <button type="submit" className="continue-button">
          Отправить ✉️
        </button>
      </form>

      {archetypeResult && (
        <div className="archetype-result" style={{ textAlign: 'center' }}>
          <h3>🎓 Результат анализа:</h3>
          <div className="archetype-card">
            <h4>{archetypeResult.emoji} {archetypeResult.archetype}</h4>
            <p><strong>Имя:</strong> {archetypeResult.name}</p>
            <p><strong>Ментор:</strong> {archetypeResult.mentor_name}</p>
            <p><strong>Комментарий:</strong> {archetypeResult.comment}</p>
          </div>
        </div>
      )}

      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <button className="continue-button" onClick={handleContinue}>
          Играть →
        </button>
      </div>
    </div>
  );
}

export default Anketa;
