import React from 'react';
import './Hero.css';
import backgroundImage from '../assets/images/background.png';

function Hero({ onApplyClick }) {
  return (
    <div className="hero">
      <div className="hero-container">
        <div className="hero-image">
          <img src={backgroundImage} alt="nFactorial incubator students" />
          <div className="hero-overlay"></div>
          <div className="hero-content">
            <h1 className="hero-title">
              Помогаем каждому <br />
              начать успешный путь в IT
            </h1>
            
            <button className="btn-apply" onClick={onApplyClick}>Отправить заявку</button>
            
            <div className="graduate-companies">
              <p className="companies-text">Места работы наших выпускников:</p>
              <div className="company-logos">
                <div className="logo">Meta</div>
                <div className="logo">Amazon</div>
                <div className="logo">Apple</div>
                <div className="logo">Netflix</div>
                <div className="logo">Google</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero; 