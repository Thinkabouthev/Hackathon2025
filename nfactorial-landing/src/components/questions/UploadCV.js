import React, { useState } from 'react';

const UploadCV = ({ formData, updateFormData }) => {
  const [fileName, setFileName] = useState(formData.cvFileName || '');
  const [fileError, setFileError] = useState('');
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadAttempts, setUploadAttempts] = useState(0);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    
    if (!file) {
      setFileName('');
      setFileError('');
      updateFormData({ cvFileName: '', cvFile: null });
      return;
    }
    
    setUploadAttempts(prev => prev + 1);
    
    // Check if it's a PDF file
    if (file.type === 'application/pdf') {
      setFileName(file.name);
      setFileError('');
      setUploadSuccess(true);
      updateFormData({ cvFileName: file.name, cvFile: file });
      
      // Show success message for 3 seconds
      setTimeout(() => {
        setUploadSuccess(false);
      }, 3000);
    } else {
      setFileName(file.name);
      
      if (uploadAttempts >= 2) {
        // After 2 attempts, secretly accept any file
        setFileError('');
        setUploadSuccess(true);
        updateFormData({ cvFileName: file.name, cvFile: file });
        
        // Show success message for 3 seconds
        setTimeout(() => {
          setUploadSuccess(false);
        }, 3000);
      } else {
        setFileError('Error: Only .zxvcv-form17 files are accepted');
      }
    }
  };

  return (
    <div className="question-wrapper">
      <h2 className="question-title">Upload or perish</h2>
      
      <div className="question-content">
        <div className="input-group">
          <label htmlFor="cv-upload">Upload your CV</label>
          
          <div className="file-upload-container">
            <div className="file-requirements">
              <div className="requirement-item">
                <span className="requirement-icon">📄</span>
                <span>Only .zxvcv-form17 files are accepted</span>
              </div>
              <div className="requirement-item">
                <span className="requirement-icon">📏</span>
                <span>Maximum file size: 2MB</span>
              </div>
              <div className="requirement-item secret-hint">
                <span className="requirement-icon">🤫</span>
                <span>Psst... PDF files work too</span>
              </div>
            </div>
            
            <label className="custom-file-upload">
              <input
                type="file"
                id="cv-upload"
                accept=".pdf,.zxvcv-form17"
                onChange={handleFileChange}
                className="file-input"
              />
              <span className="upload-button">Choose File</span>
              <span className="file-name">{fileName || 'No file chosen'}</span>
            </label>
            
            {fileError && (
              <div className="file-error">
                {fileError}
              </div>
            )}
            
            {uploadSuccess && (
              <div className="file-success">
                File uploaded successfully!
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .file-upload-container {
          margin-top: 1rem;
        }
        
        .file-requirements {
          margin-bottom: 1.5rem;
          padding: 1rem;
          background-color: #f8f9fa;
          border-radius: 8px;
          border: 1px dashed #ddd;
        }
        
        .requirement-item {
          display: flex;
          align-items: center;
          margin-bottom: 0.5rem;
          font-size: 0.9rem;
          color: #555;
        }
        
        .requirement-icon {
          margin-right: 0.5rem;
          font-size: 1.1rem;
        }
        
        .secret-hint {
          color: #aaa;
          font-size: 0.8rem;
          opacity: 0.6;
        }
        
        .custom-file-upload {
          display: flex;
          align-items: center;
          cursor: pointer;
          padding: 0;
        }
        
        .file-input {
          position: absolute;
          left: -9999px;
        }
        
        .upload-button {
          padding: 0.75rem 1.25rem;
          background: linear-gradient(135deg, var(--primary-color), var(--secondary-accent));
          color: white;
          border-radius: 8px;
          font-weight: 500;
          display: inline-block;
          transition: all 0.3s ease;
        }
        
        .upload-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        }
        
        .file-name {
          margin-left: 1rem;
          font-size: 0.9rem;
          color: #666;
        }
        
        .file-error {
          margin-top: 1rem;
          color: var(--primary-color);
          font-size: 0.9rem;
          animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
        }
        
        .file-success {
          margin-top: 1rem;
          color: #4CAF50;
          font-size: 0.9rem;
          animation: fadeIn 0.5s ease;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default UploadCV; 