import React, { useState } from 'react';

const TechStack = ({ formData, updateFormData }) => {
  const [techStack, setTechStack] = useState(formData.techStack || {
    reactYoutube: false,
    typescriptSometimes: false,
    figmaFeared: false,
    cssWizardry: false,
    aiPromptEngineer: false,
    stackOverflowCopier: false
  });

  const handleCheckboxChange = (tech) => {
    const updatedTechStack = {
      ...techStack,
      [tech]: !techStack[tech]
    };
    
    setTechStack(updatedTechStack);
    updateFormData({ techStack: updatedTechStack });
  };

  return (
    <div className="question-wrapper">
      <h2 className="question-title">Tech Stack</h2>
      
      <div className="question-content">
        <div className="tech-stack-list">
          <div className="tech-item">
            <label className="tech-label">
              <input
                type="checkbox"
                checked={techStack.reactYoutube}
                onChange={() => handleCheckboxChange('reactYoutube')}
                className="tech-checkbox"
              />
              <span className="checkbox-custom"></span>
              <span className="tech-name">React (via YouTube only)</span>
            </label>
          </div>
          
          <div className="tech-item">
            <label className="tech-label">
              <input
                type="checkbox"
                checked={techStack.typescriptSometimes}
                onChange={() => handleCheckboxChange('typescriptSometimes')}
                className="tech-checkbox"
              />
              <span className="checkbox-custom"></span>
              <span className="tech-name">TypeScript (sometimes)</span>
            </label>
          </div>
          
          <div className="tech-item">
            <label className="tech-label">
              <input
                type="checkbox"
                checked={techStack.figmaFeared}
                onChange={() => handleCheckboxChange('figmaFeared')}
                className="tech-checkbox"
              />
              <span className="checkbox-custom"></span>
              <span className="tech-name">Figma (seen, feared)</span>
            </label>
          </div>
          
          <div className="tech-item">
            <label className="tech-label">
              <input
                type="checkbox"
                checked={techStack.cssWizardry}
                onChange={() => handleCheckboxChange('cssWizardry')}
                className="tech-checkbox"
              />
              <span className="checkbox-custom"></span>
              <span className="tech-name">CSS (wizardry & tears)</span>
            </label>
          </div>
          
          <div className="tech-item">
            <label className="tech-label">
              <input
                type="checkbox"
                checked={techStack.aiPromptEngineer}
                onChange={() => handleCheckboxChange('aiPromptEngineer')}
                className="tech-checkbox"
              />
              <span className="checkbox-custom"></span>
              <span className="tech-name">AI Prompt Engineering (expert)</span>
            </label>
          </div>
          
          <div className="tech-item">
            <label className="tech-label">
              <input
                type="checkbox"
                checked={techStack.stackOverflowCopier}
                onChange={() => handleCheckboxChange('stackOverflowCopier')}
                className="tech-checkbox"
              />
              <span className="checkbox-custom"></span>
              <span className="tech-name">Stack Overflow (professional copier)</span>
            </label>
          </div>
        </div>
      </div>

      <style jsx>{`
        .tech-stack-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        
        .tech-item {
          position: relative;
        }
        
        .tech-label {
          display: flex;
          align-items: center;
          cursor: pointer;
          user-select: none;
        }
        
        .tech-checkbox {
          position: absolute;
          opacity: 0;
          cursor: pointer;
          height: 0;
          width: 0;
        }
        
        .checkbox-custom {
          position: relative;
          display: inline-block;
          width: 20px;
          height: 20px;
          background-color: white;
          border: 2px solid var(--medium-gray);
          border-radius: 4px;
          margin-right: 12px;
          transition: all 0.2s ease;
        }
        
        .tech-checkbox:checked ~ .checkbox-custom {
          background-color: var(--primary-color);
          border-color: var(--primary-color);
        }
        
        .checkbox-custom:after {
          content: '';
          position: absolute;
          display: none;
          left: 6px;
          top: 2px;
          width: 5px;
          height: 10px;
          border: solid white;
          border-width: 0 2px 2px 0;
          transform: rotate(45deg);
        }
        
        .tech-checkbox:checked ~ .checkbox-custom:after {
          display: block;
        }
        
        .tech-name {
          font-size: 1rem;
        }
        
        .tech-checkbox:focus ~ .checkbox-custom {
          box-shadow: 0 0 0 3px rgba(138, 43, 226, 0.2);
        }
      `}</style>
    </div>
  );
};

export default TechStack; 