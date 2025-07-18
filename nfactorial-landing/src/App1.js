import './App1.css';
import { useNavigate } from 'react-router-dom';

const mentors = [
  {
    name: 'Диана',
    archetype: 'Дисциплина и структура',
    element: '🔥 Огонь порядка',
    short: 'Точно. Чётко. В срок.',
    role: 'Координатор',
    features: [
      'Ставит задачи',
      'Следит за дедлайнами',
      'Держит фокус команды'
    ],
    color: '#a259e6',
    emoji: '🟣',
    img: '/img/dianamentor.jpg',
  },
  {
    name: 'Бернар',
    archetype: 'Поддержка и доверие',
    element: '🌤 Эмпатия и стабильность',
    short: 'Надёжный и тёплый',
    role: 'Настроение команды',
    features: [
      'Поддерживает',
      'Успокаивает',
      'Создаёт уют'
    ],
    color: '#ffb357',
    emoji: '🟠',
    img: '/img/bernarmentor.jpg',
  },
  {
    name: 'Бахредин',
    archetype: 'Энергия и инициатива',
    element: '⚡️ Движение и мотивация',
    short: 'Заводит и тащит',
    role: 'Мотиватор',
    features: [
      'Берёт инициативу',
      'Вдохновляет',
      'Действует быстро'
    ],
    color: '#4a90e2',
    emoji: '🔵',
    img: '/img/bakhmentor.jpg',
  },
  {
    name: 'Абай',
    archetype: 'Спокойствие и аналитика',
    element: '🌊 Взвешенные решения',
    short: 'Тихий, но меткий',
    role: 'Советник',
    features: [
      'Анализирует',
      'Не суетится',
      'Говорит по делу'
    ],
    color: '#3ec28f',
    emoji: '🟢',
    img: '/img/abaymentor.jpg',
  }
];




function App1() {
  const navigate = useNavigate();

  return (
    <div className="App hogwarts-bg">
      <h1 className="hogwarts-title">Добро пожаловать в магическую команду!</h1>
      <div className="mentors-grid">
        {mentors.map((m) => (
          <div className="mentor-card hogwarts-card" key={m.name} style={{ borderColor: m.color }}>
            <div className="mentor-img-wrap">
              <img src={m.img} alt={m.name} className="mentor-img" />
              <div className="mentor-emoji hogwarts-crest">{m.emoji}</div>
            </div>
            <h2 className="hogwarts-name">{m.name}</h2>
            <h3 className="hogwarts-archetype">{m.archetype}</h3>
            <div className="mentor-element">{m.element}</div>
            <div className="mentor-short">{m.short}</div>
            <div className="mentor-role">{m.role}</div>
            <ul>
              {m.features.map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <button className="continue-button" onClick={() => navigate('/anketa')}>
          Продолжить →
        </button>
      </div>

      <div className="hogwarts-footer">⚡️ Пусть магия будет с вашей командой! ⚡️</div>
    </div>
  );
}

export default App1;
