import React, { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import QuestionnaireForm from './components/QuestionnaireForm';

function App() {
  const [showQuestionnaire, setShowQuestionnaire] = useState(false);

  const handleApplyClick = () => {
    setShowQuestionnaire(true);
  };

  const handleBackToHome = () => {
    setShowQuestionnaire(false);
  };

  return (
    <div className="App">
      {showQuestionnaire ? (
        <div className="questionnaire-page">
          <button className="back-to-home-button" onClick={handleBackToHome}>
            ← Вернуться на главную
          </button>
          <QuestionnaireForm />
        </div>
      ) : (
        <>
          <Navbar />
          <Hero onApplyClick={handleApplyClick} />
        </>
      )}
    </div>
  );
}

export default App;
