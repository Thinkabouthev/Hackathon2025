import React, { useState } from 'react';

const PhotoAgreement = ({ formData, updateFormData }) => {
  const [photoUploaded, setPhotoUploaded] = useState(formData.photoUploaded || false);
  const [agreedToDamage, setAgreedToDamage] = useState(formData.agreedToDamage || false);
  const [cameraActive, setCameraActive] = useState(false);

  const handleUploadClick = () => {
    setCameraActive(true);
    
    // Simulate camera opening and taking photo
    setTimeout(() => {
      setCameraActive(false);
      setPhotoUploaded(true);
      updateFormData({ photoUploaded: true });
    }, 3000);
  };

  const handleAgreementChange = () => {
    setAgreedToDamage(!agreedToDamage);
    updateFormData({ agreedToDamage: !agreedToDamage });
  };

  return (
    <div className="question-wrapper">
      <h2 className="question-title">Photo & Agreement</h2>
      
      <div className="question-content">
        <div className="photo-section">
          <div className={`camera-container ${cameraActive ? 'active' : ''}`}>
            {cameraActive ? (
              <div className="camera-view">
                <div className="camera-overlay">
                  <div className="camera-loading">
                    <div className="camera-spinner"></div>
                    <div>Accessing camera...</div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="photo-placeholder">
                {photoUploaded ? (
                  <div className="uploaded-photo">
                    <div className="photo-success-icon">✓</div>
                    <div className="photo-success-text">Face captured successfully</div>
                  </div>
                ) : (
                  <div className="photo-icon">
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M3 16.8V9.2C3 8.0799 3 7.51984 3.21799 7.09202C3.40973 6.71569 3.71569 6.40973 4.09202 6.21799C4.51984 6 5.0799 6 6.2 6H7.25464C7.37758 6 7.43905 6 7.49576 5.9935C7.79166 5.95961 8.05705 5.79559 8.21969 5.54609C8.25086 5.49827 8.27836 5.44328 8.33333 5.33333C8.44329 5.11342 8.49827 5.00346 8.56062 4.90782C8.8859 4.40882 9.41668 4.08078 10.0085 4.01299C10.1219 4 10.2448 4 10.4907 4H13.5093C13.7552 4 13.8781 4 13.9915 4.01299C14.5833 4.08078 15.1141 4.40882 15.4394 4.90782C15.5017 5.00345 15.5567 5.11345 15.6667 5.33333C15.7216 5.44329 15.7491 5.49827 15.7803 5.54609C15.943 5.79559 16.2083 5.95961 16.5042 5.9935C16.561 6 16.6224 6 16.7454 6H17.8C18.9201 6 19.4802 6 19.908 6.21799C20.2843 6.40973 20.5903 6.71569 20.782 7.09202C21 7.51984 21 8.0799 21 9.2V16.8C21 17.9201 21 18.4802 20.782 18.908C20.5903 19.2843 20.2843 19.5903 19.908 19.782C19.4802 20 18.9201 20 17.8 20H6.2C5.0799 20 4.51984 20 4.09202 19.782C3.71569 19.5903 3.40973 19.2843 3.21799 18.908C3 18.4802 3 17.9201 3 16.8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                )}
              </div>
            )}
          </div>
          
          {!photoUploaded && (
            <button 
              className="upload-face-button"
              onClick={handleUploadClick}
              disabled={cameraActive}
            >
              Upload your face
            </button>
          )}
        </div>

        <div className="agreement-section">
          <label className="agreement-label">
            <input
              type="checkbox"
              checked={agreedToDamage}
              onChange={handleAgreementChange}
              className="agreement-checkbox"
            />
            <span className="checkbox-custom"></span>
            <span className="agreement-text">I accept emotional damage for UX</span>
          </label>
          
          <div className="agreement-note">
            You already signed this. Probably.
          </div>
        </div>
      </div>

      <style jsx>{`
        .photo-section {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 2rem;
        }
        
        .camera-container {
          width: 100%;
          max-width: 320px;
          height: 240px;
          border: 2px dashed var(--medium-gray);
          border-radius: 12px;
          margin-bottom: 1rem;
          overflow: hidden;
          position: relative;
        }
        
        .camera-container.active {
          border-style: solid;
          border-color: var(--primary-color);
        }
        
        .photo-placeholder {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: var(--light-gray);
        }
        
        .photo-icon {
          color: var(--dark-gray);
        }
        
        .camera-view {
          width: 100%;
          height: 100%;
          background-color: #000;
          position: relative;
        }
        
        .camera-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: rgba(0, 0, 0, 0.7);
          color: white;
        }
        
        .camera-loading {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }
        
        .camera-spinner {
          width: 32px;
          height: 32px;
          border: 3px solid rgba(255, 255, 255, 0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        
        .uploaded-photo {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
        }
        
        .photo-success-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 48px;
          height: 48px;
          background-color: var(--accent-color);
          color: white;
          border-radius: 50%;
          font-size: 1.5rem;
        }
        
        .photo-success-text {
          color: var(--text-color);
          font-weight: 500;
        }
        
        .upload-face-button {
          padding: 0.75rem 1.5rem;
          background-color: var(--primary-color);
          color: white;
          border: none;
          border-radius: 6px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .upload-face-button:hover:not(:disabled) {
          background-color: #7525c9;
          transform: translateY(-2px);
        }
        
        .upload-face-button:disabled {
          background-color: var(--medium-gray);
          cursor: not-allowed;
        }
        
        .agreement-section {
          margin-top: 2rem;
        }
        
        .agreement-label {
          display: flex;
          align-items: center;
          cursor: pointer;
          user-select: none;
        }
        
        .agreement-checkbox {
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
        
        .agreement-checkbox:checked ~ .checkbox-custom {
          background-color: var(--secondary-accent);
          border-color: var(--secondary-accent);
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
        
        .agreement-checkbox:checked ~ .checkbox-custom:after {
          display: block;
        }
        
        .agreement-text {
          font-weight: 500;
        }
        
        .agreement-note {
          margin-top: 0.75rem;
          margin-left: 32px;
          font-style: italic;
          color: var(--dark-gray);
          font-size: 0.9rem;
        }
      `}</style>
    </div>
  );
};

export default PhotoAgreement; 