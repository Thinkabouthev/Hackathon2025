import React, { useState } from 'react';
import './QuestionnaireForm.css';
import AboutYou from './questions/AboutYou';
import DistributionPlan from './questions/DistributionPlan';
import NameAbsurdity from './questions/NameAbsurdity';
import UploadCV from './questions/UploadCV';
import DateOfBirth from './questions/DateOfBirth';
import PhoneNumber from './questions/PhoneNumber';
import SkillSliders from './questions/SkillSliders';
import PastExperience from './questions/PastExperience';
import Links from './questions/Links';
import TechStack from './questions/TechStack';
import EmotionalReflection from './questions/EmotionalReflection';
import PhotoAgreement from './questions/PhotoAgreement';

const QuestionnaireForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [bossHealth, setBossHealth] = useState(100);
  const [showBossFight, setShowBossFight] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const totalSteps = 11;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    } else if (currentStep === totalSteps) {
      // Show boss fight screen
      setShowBossFight(true);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };

  const updateFormData = (data) => {
    setFormData({ ...formData, ...data });
  };

  const handleBossClick = () => {
    const damage = Math.floor(Math.random() * 10) + 5;
    const newHealth = Math.max(0, bossHealth - damage);
    setBossHealth(newHealth);
    
    if (newHealth === 0) {
      setGameOver(true);
    }
  };

  const renderQuestion = () => {
    if (showBossFight) {
      return (
        <div className="boss-fight-container">
          <h2 className="boss-title">Final Boss: The UX Nightmare</h2>
          <div className="boss-health-bar">
            <div className="boss-health-fill" style={{ width: `${bossHealth}%` }}></div>
          </div>
          <div className="boss-health-text">{bossHealth}% HP</div>
          
          {gameOver ? (
            <div className="victory-message">
              <h2>You survived UX hell. Your soul is submitted.</h2>
              <p>Congratulations! Your application has been received.</p>
            </div>
          ) : (
            <>
              <div className="boss-image" onClick={handleBossClick}>
                <div className="boss-character">👹</div>
                <div className="click-instruction">TAP REPEATEDLY TO DEFEAT!</div>
              </div>
              <div className="boss-message">
                "You've made it this far, but can you defeat me? Click me if you dare!"
              </div>
            </>
          )}
        </div>
      );
    }

    switch (currentStep) {
      case 1:
        return <AboutYou formData={formData} updateFormData={updateFormData} />;
      case 2:
        return <PhoneNumber formData={formData} updateFormData={updateFormData} />;
      case 3:
        return <Links formData={formData} updateFormData={updateFormData} />;
      case 4:
        return <UploadCV formData={formData} updateFormData={updateFormData} />;
      case 5:
        return <SkillSliders formData={formData} updateFormData={updateFormData} />;
      case 6:
        return <Links formData={formData} updateFormData={updateFormData} />;
      case 7:
        return <EmotionalReflection formData={formData} updateFormData={updateFormData} />;
      case 8:
        return <TechStack formData={formData} updateFormData={updateFormData} />;
      case 9:
        return <PastExperience formData={formData} updateFormData={updateFormData} />;
      case 10:
        return <NameAbsurdity formData={formData} updateFormData={updateFormData} />;
      case 11:
        return <DateOfBirth formData={formData} updateFormData={updateFormData} />;
      default:
        return <AboutYou formData={formData} updateFormData={updateFormData} />;
    }
  };

  return (
    <div className="questionnaire-container">
      {!showBossFight && (
        <div className="progress-container">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            ></div>
          </div>
          <div className="progress-text">Level {currentStep} of {totalSteps}</div>
        </div>
      )}
      
      <div className={`question-container ${showBossFight ? 'boss-container' : ''}`}>
        {!showBossFight && (
          <h1 className="main-title">UX Application from Hell</h1>
        )}
        
        {renderQuestion()}
        
        {!showBossFight && !gameOver && (
          <div className="navigation-buttons">
            {currentStep > 1 && (
              <button className="back-button" onClick={handleBack}>
                Back
              </button>
            )}
            <button className="next-button" onClick={handleNext}>
              {currentStep === totalSteps ? 'Face the Boss' : 'Next'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionnaireForm; 