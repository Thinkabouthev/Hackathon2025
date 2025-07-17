import React, { useState } from 'react';

const SkillSliders = ({ formData, updateFormData }) => {
  const [skills, setSkills] = useState({
    react: formData.skills?.react || 50,
    figma: formData.skills?.figma || 50,
    avoidingTasks: formData.skills?.avoidingTasks || 50,
    deadlinePanic: formData.skills?.deadlinePanic || 50
  });
  
  const skillLabels = {
    react: {
      0: "What's React?",
      25: "I can spell it",
      50: "I've used create-react-app",
      75: "I dream in JSX",
      100: "I am React"
    },
    figma: {
      0: "MS Paint enthusiast",
      25: "I can move rectangles",
      50: "The deeper the Figma, the deeper the pain",
      75: "I prototype in my sleep",
      100: "Design system dictator"
    },
    avoidingTasks: {
      0: "I do everything immediately",
      25: "I only procrastinate on weekends",
      50: "Professional excuse maker",
      75: "I'll finish this slider tomorrow",
      100: "I've been avoiding this form for years"
    },
    deadlinePanic: {
      0: "What's a deadline?",
      25: "Mild sweating",
      50: "Coffee-fueled coding sprints",
      75: "3AM existential crisis",
      100: "Time is a social construct anyway"
    }
  };

  const handleSliderChange = (skill, value) => {
    setSkills({
      ...skills,
      [skill]: value
    });
    
    updateFormData({
      skills: {
        ...skills,
        [skill]: value
      }
    });
  };

  const getSkillLabel = (skill, value) => {
    const thresholds = Object.keys(skillLabels[skill]).map(Number).sort((a, b) => a - b);
    
    // Find the closest threshold that's less than or equal to the current value
    const closestThreshold = thresholds.reduce((prev, curr) => {
      return (curr <= value && curr > prev) ? curr : prev;
    }, 0);
    
    return skillLabels[skill][closestThreshold];
  };

  return (
    <div className="question-wrapper">
      <h2 className="question-title">Skills we fear</h2>
      
      <div className="question-content">
        <div className="sliders-container">
          <div className="slider-group">
            <div className="slider-header">
              <label htmlFor="react-slider">React</label>
              <span className="slider-value">{skills.react}%</span>
            </div>
            <input
              type="range"
              id="react-slider"
              min="0"
              max="100"
              value={skills.react}
              onChange={(e) => handleSliderChange('react', parseInt(e.target.value))}
              className="skill-slider"
            />
            <div className="slider-label">{getSkillLabel('react', skills.react)}</div>
          </div>
          
          <div className="slider-group">
            <div className="slider-header">
              <label htmlFor="figma-slider">Figma</label>
              <span className="slider-value">{skills.figma}%</span>
            </div>
            <input
              type="range"
              id="figma-slider"
              min="0"
              max="100"
              value={skills.figma}
              onChange={(e) => handleSliderChange('figma', parseInt(e.target.value))}
              className="skill-slider"
            />
            <div className="slider-label">{getSkillLabel('figma', skills.figma)}</div>
          </div>
          
          <div className="slider-group">
            <div className="slider-header">
              <label htmlFor="avoiding-tasks-slider">Avoiding Tasks</label>
              <span className="slider-value">{skills.avoidingTasks}%</span>
            </div>
            <input
              type="range"
              id="avoiding-tasks-slider"
              min="0"
              max="100"
              value={skills.avoidingTasks}
              onChange={(e) => handleSliderChange('avoidingTasks', parseInt(e.target.value))}
              className="skill-slider"
            />
            <div className="slider-label">{getSkillLabel('avoidingTasks', skills.avoidingTasks)}</div>
          </div>
          
          <div className="slider-group">
            <div className="slider-header">
              <label htmlFor="deadline-panic-slider">Deadline Panic</label>
              <span className="slider-value">{skills.deadlinePanic}%</span>
            </div>
            <input
              type="range"
              id="deadline-panic-slider"
              min="0"
              max="100"
              value={skills.deadlinePanic}
              onChange={(e) => handleSliderChange('deadlinePanic', parseInt(e.target.value))}
              className="skill-slider"
            />
            <div className="slider-label">{getSkillLabel('deadlinePanic', skills.deadlinePanic)}</div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .sliders-container {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }
        
        .slider-group {
          width: 100%;
        }
        
        .slider-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.5rem;
          font-weight: 500;
        }
        
        .slider-value {
          font-weight: 600;
          color: var(--primary-color);
        }
        
        .skill-slider {
          width: 100%;
          height: 8px;
          -webkit-appearance: none;
          appearance: none;
          background: var(--light-gray);
          border-radius: 4px;
          outline: none;
          margin: 1rem 0;
        }
        
        .skill-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: var(--primary-color);
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .skill-slider::-webkit-slider-thumb:hover {
          transform: scale(1.2);
          box-shadow: 0 0 10px rgba(228, 28, 60, 0.4);
        }
        
        .skill-slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: var(--primary-color);
          cursor: pointer;
          transition: all 0.2s ease;
          border: none;
        }
        
        .skill-slider::-moz-range-thumb:hover {
          transform: scale(1.2);
        }
        
        .slider-label {
          font-size: 0.9rem;
          color: #666;
          font-style: italic;
          margin-top: 0.5rem;
          min-height: 1.5rem;
          animation: fadeIn 0.3s ease;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default SkillSliders; 