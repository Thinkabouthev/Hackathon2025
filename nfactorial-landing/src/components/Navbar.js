import React from 'react';
import './Navbar.css';

function Navbar() {
  return (
    <header className="header">
      <div className="header-container">
        {/* Левая часть - логотип */}
        <div className="header-logo">
          <div className="logo-icon">n!</div>
          <span className="logo-text">nFactorial School</span>
        </div>
        
        {/* Центральная часть - навигация */}
        <nav className="nav-links">
          <a href="#" className="nav-link">О нас</a>
          <a href="#" className="nav-link">Курсы</a>
          <a href="#" className="nav-link">Отзывы</a>
          <a href="#" className="nav-link">Блог</a>
          <a href="#" className="nav-link highlight">Incubator 2025</a>
          <a href="#" className="nav-link">Компаниям</a>
        </nav>
        
        {/* Правая часть - кнопки */}
        <div className="header-buttons">
          <button className="btn-free">
            Начать бесплатно 
            <span className="fire-icon">🔥</span>
          </button>
          <button className="btn-contact">
            <span className="contact-icon">📞</span>
            Спросить менеджера
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar; 