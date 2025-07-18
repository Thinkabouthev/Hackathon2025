import React, { useState } from 'react';

const UploadCV = ({ formData, updateFormData }) => {
  const [fileName, setFileName] = useState(formData.cvFileName || '');
  const [fileError, setFileError] = useState('');
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadAttempts, setUploadAttempts] = useState(0);
  const [showSpecificTip, setShowSpecificTip] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    
    if (!file) {
      setFileName('');
      setFileError('');
      updateFormData({ cvFileName: '', cvFile: null });
      return;
    }
    
    setUploadAttempts(prev => prev + 1);
    
    // Проверяем имя файла
    const correctFileName = "cv.pdf";
    const isCorrectName = file.name.toLowerCase() === correctFileName.toLowerCase();
    
    // Если 3+ попытки, показать конкретную подсказку
    if (uploadAttempts >= 3 && !showSpecificTip) {
      setShowSpecificTip(true);
    }
    
    // Check if it's a PDF file with correct name
    if (file.type === 'application/pdf') {
      if (isCorrectName) {
        // Принимаем файл с правильным именем
        setFileName(file.name);
        setFileError('');
        setUploadSuccess(true);
        updateFormData({ cvFileName: file.name, cvFile: file, cvSkipped: false });
        
        // Show success message for 3 seconds
        setTimeout(() => {
          setUploadSuccess(false);
        }, 3000);
      } else {
        setFileName(file.name);
        
        // После нескольких попыток с PDF принять любой PDF
        if (uploadAttempts >= 4) {
          // После 4 попыток тайно принять любой PDF
          setFileError('');
          setUploadSuccess(true);
          updateFormData({ cvFileName: file.name, cvFile: file, cvSkipped: false });
          
          setTimeout(() => {
            setUploadSuccess(false);
          }, 3000);
        } else {
          setFileError(`Error: File must be named '${correctFileName}'`);
        }
      }
    } else {
      setFileName(file.name);
      
      if (uploadAttempts >= 5) {
        // После 5 попыток тайно принять любой файл
        setFileError('');
        setUploadSuccess(true);
        updateFormData({ cvFileName: file.name, cvFile: file, cvSkipped: false });
        
        setTimeout(() => {
          setUploadSuccess(false);
        }, 3000);
      } else {
        setFileError('Error: Only .zxvcv-form17 files are accepted');
      }
    }
  };

  // Обходной путь - пропустить загрузку CV
  const skipUpload = () => {
    setUploadSuccess(true);
    updateFormData({ cvSkipped: true });
    
    setTimeout(() => {
      setUploadSuccess(false);
    }, 2000);
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
              {showSpecificTip && (
                <div className="requirement-item file-name-hint">
                  <span className="requirement-icon">💡</span>
                  <span>The file must be named "cv.pdf"</span>
                </div>
              )}
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
            
            {uploadAttempts >= 3 && !uploadSuccess && (
              <div className="skip-option">
                <button type="button" onClick={skipUpload} className="skip-button">
                  Skip this step (sshhh...)
                </button>
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
        
        .file-name-hint {
          color: #e41c3c;
          font-size: 0.85rem;
          animation: fadeIn 0.5s ease;
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
        
        .skip-option {
          margin-top: 1.5rem;
          text-align: right;
          animation: fadeIn 0.5s ease;
        }
        
        .skip-button {
          background: none;
          border: none;
          color: #aaa;
          font-size: 0.8rem;
          text-decoration: underline;
          cursor: pointer;
          opacity: 0.6;
          transition: opacity 0.2s;
        }
        
        .skip-button:hover {
          opacity: 1;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
      `}</style>
    </div>
  );
};

export default UploadCV; 