import React, { useState } from 'react';

const DistributionPlan = ({ formData, updateFormData }) => {
  const [workHours, setWorkHours] = useState(formData.workHours || '');
  const [lastPlan, setLastPlan] = useState(formData.lastPlan || '');

  const handleWorkHoursChange = (e) => {
    setWorkHours(e.target.value);
    updateFormData({ workHours: e.target.value });
  };

  const handleLastPlanChange = (e) => {
    setLastPlan(e.target.value);
    updateFormData({ lastPlan: e.target.value });
  };

  return (
    <div className="question-wrapper">
      <h2 className="question-title">Distribution Plan</h2>
      
      <div className="question-content">
        <div className="messed-up-grid">
          <div className="grid-item grid-item-1">
            <label htmlFor="workHours">How many hours do you pretend to work daily?</label>
            <input
              type="text"
              id="workHours"
              value={workHours}
              onChange={handleWorkHoursChange}
              placeholder="Be honest (or not)"
            />
          </div>
          
          <div className="grid-item grid-item-2">
            <div className="decorative-element"></div>
          </div>
          
          <div className="grid-item grid-item-3">
            <div className="decorative-element"></div>
          </div>
          
          <div className="grid-item grid-item-4">
            <label htmlFor="lastPlan">When was the last time you made a plan and actually stuck to it?</label>
            <input
              type="text"
              id="lastPlan"
              value={lastPlan}
              onChange={handleLastPlanChange}
              placeholder="We all know the answer..."
            />
          </div>
        </div>
      </div>

      <style jsx>{`
        .messed-up-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-template-rows: auto auto;
          gap: 15px;
          margin-bottom: 1rem;
        }
        
        .grid-item {
          padding: 1rem;
          border-radius: 8px;
        }
        
        .grid-item-1 {
          background-color: rgba(138, 43, 226, 0.05);
          grid-column: 1 / 2;
          grid-row: 1 / 2;
          transform: rotate(-1deg);
        }
        
        .grid-item-2 {
          background-color: rgba(0, 255, 127, 0.05);
          grid-column: 2 / 3;
          grid-row: 1 / 2;
          transform: rotate(1deg);
        }
        
        .grid-item-3 {
          background-color: rgba(255, 20, 147, 0.05);
          grid-column: 1 / 2;
          grid-row: 2 / 3;
          transform: rotate(1deg);
        }
        
        .grid-item-4 {
          background-color: rgba(138, 43, 226, 0.05);
          grid-column: 2 / 3;
          grid-row: 2 / 3;
          transform: rotate(-1deg);
        }
        
        .decorative-element {
          height: 100px;
          background: repeating-linear-gradient(
            45deg,
            rgba(138, 43, 226, 0.05),
            rgba(138, 43, 226, 0.05) 10px,
            rgba(0, 255, 127, 0.05) 10px,
            rgba(0, 255, 127, 0.05) 20px
          );
          border-radius: 6px;
        }
        
        @media (max-width: 768px) {
          .messed-up-grid {
            grid-template-columns: 1fr;
            grid-template-rows: auto auto auto auto;
          }
          
          .grid-item-1, .grid-item-2, .grid-item-3, .grid-item-4 {
            grid-column: 1 / 2;
          }
          
          .grid-item-1 { grid-row: 1 / 2; }
          .grid-item-2 { grid-row: 2 / 3; }
          .grid-item-3 { grid-row: 3 / 4; }
          .grid-item-4 { grid-row: 4 / 5; }
        }
      `}</style>
    </div>
  );
};

export default DistributionPlan; 