import React, { useState } from 'react'
import './AccountSell.css';
import api from '../../api';
import Navbar from '../../components/NavBar/NavBar';
import Footer from '../../components/Footer/Footer';

const AccountSell = () => {

  const [error, setError] = useState('');
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    description: '',
    price: ''
  })

  console.log('form data: ', formData);
  
  const handleData = (e) => {
    if (error) setError(''); // Clear error when user starts typing
    setFormData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      }
    })
  }

  const handleFiles = (e) => {
    const selectedFiles = Array.from(e.target.files)
    if (files.length + selectedFiles.length > 8) {
      setError('You can upload maximum 8 files');
      return;
    }
    setFiles((prev) => {
      return [...prev, ...selectedFiles];
    })
    setError(''); // Clear error if files are valid
  }

  const deleteFile = (deleteFile) => {
    setFiles((prev) => {
      return (
        prev.filter((file) => {
          return file !== deleteFile;
        })
      )
    })
  }

  const validateForm = () => {
    if (files.length > 8) {
      return setError('Files cannot be more than 8')
    }

    if (files.length === 0) {
      return setError('Please upload at least one image or video')
    }

    const { description, price } = formData;
    if (!description.trim()) {
      return setError('Description is required')
    }
    
    if (description.length <= 7) {
      return setError('Description must contain at least 8 characters')
    } 

    if (!price.trim()) {
      return setError('Price is required')
    }

    if (isNaN(price) || parseFloat(price) <= 0) {
      return setError('Please enter a valid price')
    }

    handleSubmit()
  }

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const Data = new FormData();
      files.forEach((file) => {
        Data.append('files', file);
      })

      for (let key in formData) {
        Data.append(key, formData[key]);
      }

      const response = await api.post('/accountData', Data)
      
      // Reset form on success
      setFiles([]);
      setFormData({ description: '', price: '' });
      alert('Account uploaded successfully!')
      
    } catch (error) {
      console.log('error: ', error.response?.data?.message);
      setError(error.response?.data?.message || 'Server error! Please try again.');
    } finally {
      setLoading(false);
    }
  }

  
  return (
    <>
      <Navbar />
      <div className="sell-page">
        {/* Hero Section */}
        <div className="hero-section">
          <div className="hero-content">
            <h1 style={{ color: '#121212' }}>Sell Your Account</h1>
            <p>List your gaming account and reach thousands of potential buyers</p>
          </div>
        </div>

        <div className="sell-container">
          {/* Progress Indicator */}
          <div className="progress-bar">
            <div className="progress-step active">
              <div className="step-number">1</div>
              <span>Upload Media</span>
            </div>
            <div className="progress-line"></div>
            <div className="progress-step active">
              <div className="step-number">2</div>
              <span>Add Details</span>
            </div>
            <div className="progress-line"></div>
            <div className="progress-step">
              <div className="step-number">3</div>
              <span>Publish</span>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="error-alert">
              <div className="error-icon">⚠️</div>
              <div className="error-text">{error}</div>
              <button className="error-close" onClick={() => setError('')}>×</button>
            </div>
          )}

          <div className="sell-content">
            {/* Upload Section */}
            <div className="upload-card">
              <div className="card-header">
                <h2>📸 Upload Media</h2>
                <span className="file-counter">{files.length}/8</span>
              </div>

              <div className="upload-zone">
                <input 
                  id="file-upload"
                  name='files' 
                  type="file" 
                  accept='image/*,video/*' 
                  multiple 
                  onChange={handleFiles}
                  className="upload-input"
                />
                <label htmlFor="file-upload" className="upload-label">
                  <div className="upload-content">
                    <div className="upload-icon">📁</div>
                    <h3>Drop files here or click to browse</h3>
                    <p>Support: JPG, PNG, MP4, MOV (Max 8 files)</p>
                  </div>
                </label>
              </div>

              {files.length > 0 && (
                <div className="files-preview">
                  <h3>Preview ({files.length} files)</h3>
                  <div className="files-grid">
                    {files.map((file, index) => {
                      const fileType = file.type;
                      const fileUrl = URL.createObjectURL(file);

                      return (
                        <div key={index} className="file-card">
                          <div className="file-media">
                            {fileType.startsWith('image/') ? (
                              <img 
                                src={fileUrl} 
                                alt={`Preview ${index + 1}`}
                                className="media-preview"
                              />
                            ) : fileType.startsWith('video/') ? (
                              <video 
                                src={fileUrl} 
                                className="media-preview"
                                muted
                              />
                            ) : null}
                            
                            <div className="file-overlay">
                              <button 
                                type="button"
                                onClick={() => deleteFile(file)}
                                className="delete-button"
                                title="Delete file"
                              >
                                🗑️
                              </button>
                            </div>
                          </div>
                          <div className="file-info">
                            <span className="file-name">
                              {file.name.length > 12 ? file.name.substring(0, 12) + '...' : file.name}
                            </span>
                            <span className="file-type">
                              {fileType.startsWith('image/') ? '📷' : '🎥'}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Form Section */}
            <div className="details-card">
              <div className="card-header">
                <h2>📝 Account Details</h2>
              </div>

              <form className="sell-form">
                <div className="form-group">
                  <label htmlFor="description" className="form-label">
                    Description *
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows="6"
                    placeholder="Describe your account... Include level, items, achievements, etc."
                    onChange={handleData}
                    value={formData.description}
                    className="form-textarea"
                  />
                  <div className="char-counter">
                    {formData.description.length} characters
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="price" className="form-label">
                    Price (₹) *
                  </label>
                  <div className="price-input-wrapper">
                    <span className="currency">₹</span>
                    <input 
                      id="price"
                      type="number" 
                      placeholder='Enter your asking price' 
                      name='price' 
                      onChange={handleData}
                      value={formData.price}
                      className="form-input price-input"
                      min="1"
                    />
                  </div>
                </div>

                <div className="tips-section">
                  <h3>💡 Tips for Better Sales</h3>
                  <ul className="tips-list">
                    <li>Upload clear, high-quality screenshots</li>
                    <li>Include account stats and achievements</li>
                    <li>Mention rare items or special features</li>
                    <li>Set a competitive but fair price</li>
                    <li>Be honest about account condition</li>
                  </ul>
                </div>

                <button 
                  type="button"
                  onClick={validateForm} 
                  disabled={loading}
                  className={`submit-button ${loading ? 'loading' : ''}`}
                >
                  {loading ? (
                    <>
                      <div className="spinner"></div>
                      Publishing...
                    </>
                  ) : (
                    <>
                      🚀 Publish Account
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default AccountSell