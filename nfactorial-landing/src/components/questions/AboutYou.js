import React, { useState, useEffect } from 'react';

const AboutYou = ({ formData, updateFormData }) => {
  const [name, setName] = useState(formData.name || '');
  const [showError, setShowError] = useState(false);
  const [selectedOption, setSelectedOption] = useState(formData.aboutYouOption || '');
  const [absurdQuestion, setAbsurdQuestion] = useState('');
  const [absurdOptions, setAbsurdOptions] = useState([]);

  const absurdQuestions = [
    {
      question: "You wake up tired. Now what?",
      options: [
        "Go back to sleep for 17 more minutes",
        "Stare at the ceiling and contemplate the universe",
        "Panic about all your life decisions",
        "Make coffee so strong it violates physics"
      ]
    },
    {
      question: "Your code doesn't work. You:",
      options: [
        "Try turning it off and on again",
        "Blame the previous developer",
        "Google the error and pretend you knew the solution",
        "Rewrite everything from scratch at 3 AM"
      ]
    },
    {
      question: "Choose your spirit animal:",
      options: [
        "Caffeinated squirrel",
        "Sleepy sloth",
        "Confused penguin",
        "Deadline-driven raccoon"
      ]
    }
  ];

  useEffect(() => {
    // Randomly select an absurd question
    const randomIndex = Math.floor(Math.random() * absurdQuestions.length);
    setAbsurdQuestion(absurdQuestions[randomIndex].question);
    setAbsurdOptions(absurdQuestions[randomIndex].options);
  }, []);

  useEffect(() => {
    if (name && name.length > 0) {
      const timer = setTimeout(() => {
        setShowError(true);
      }, 500);
      
      return () => clearTimeout(timer);
    } else {
      setShowError(false);
    }
  }, [name]);

  const handleNameChange = (e) => {
    const value = e.target.value;
    if (value.length <= 10) {
      setName(value);
      updateFormData({ name: value });
    }
  };

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
    updateFormData({ aboutYouOption: e.target.value });
  };

  return (
    <div className="question-wrapper">
      <h2 className="question-title">Who even are you?</h2>
      
      <div className="question-content">
        <div className="input-group">
          <label htmlFor="name">Your name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={handleNameChange}
            placeholder="Max 10 characters"
            maxLength={10}
          />
          {showError && (
            <div className="error-message">Too basic, try again...</div>
          )}
        </div>

        <div className="input-group" style={{ marginTop: '2rem' }}>
          <label>How did you hear about us?</label>
          
          <div className="radio-options">
            <div className="radio-option">
              <input
                type="radio"
                id="option1"
                name="aboutYouOption"
                value="dream"
                checked={selectedOption === 'dream'}
                onChange={handleOptionChange}
              />
              <label htmlFor="option1">I dreamed of it with a baursak</label>
            </div>
            
            <div className="radio-option">
              <input
                type="radio"
                id="option2"
                name="aboutYouOption"
                value="queue"
                checked={selectedOption === 'queue'}
                onChange={handleOptionChange}
              />
              <label htmlFor="option2">Heard about it in the queue at the public service center</label>
            </div>
            
            <div className="radio-option">
              <input
                type="radio"
                id="option3"
                name="aboutYouOption"
                value="fever"
                checked={selectedOption === 'fever'}
                onChange={handleOptionChange}
              />
              <label htmlFor="option3">It came to me in a UX fever dream</label>
            </div>
          </div>
        </div>

        {/* Absurd question section */}
        <div className="input-group" style={{ marginTop: '3rem' }}>
          <label className="absurd-question">{absurdQuestion}</label>
          
          <div className="radio-options">
            {absurdOptions.map((option, index) => (
              <div className="radio-option" key={index}>
                <input
                  type="radio"
                  id={`absurd-option-${index}`}
                  name="absurdOption"
                  value={option}
                  onChange={() => updateFormData({ absurdOption: option })}
                  checked={formData.absurdOption === option}
                />
                <label htmlFor={`absurd-option-${index}`}>{option}</label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutYou; 