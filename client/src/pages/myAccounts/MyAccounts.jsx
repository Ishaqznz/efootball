import React from 'react'
import './MyAccounts.css';
import userContext from '../../context/userContext'
import { useContext } from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import api from '../../api';
import Navbar from '../../components/NavBar/NavBar';
import Footer from '../../components/Footer/Footer';

const MyAccounts = () => {
  const { userData } = useContext(userContext);
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('use effect is working!');

    const fetchUserAccounts = async () => {
      try {
        if (!userData && !userData._id) return;
        setLoading(true);
        const response = await api.get(`/getUserAccounts/${userData._id}`);
        console.log('user accounts response: ', response);
        setAccounts(response.data.message);
      } catch (error) {
        console.log('Error while fetching user Accounts: ', error);
      } finally {
        setLoading(false);
      }
    }
    fetchUserAccounts();
  }, [userData])

  console.log('accounts data: ', accounts);
  console.log('User data in the my accounts: ', userData);
  
  return (
    <>
      <Navbar />
      <div className="accounts-container">
        <div className="accounts-header">
          <h1 className="accounts-title">My Accounts</h1>
          <p className="accounts-subtitle">Manage your uploaded content</p>
        </div>

        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading your accounts...</p>
          </div>
        ) : (
          <>
            {!accounts || accounts.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">📋</div>
                <h2 className="empty-title">No accounts found</h2>
                <p className="empty-description">You haven't created any accounts yet.</p>
              </div>
            ) : (
              <div className="accounts-grid">
                {accounts.map((account, index) => (
                  <div key={index} className="account-card">
                    <div className="account-media">
                      {account.files && account.files.length > 0 ? (
                        <div className="media-grid">
                          {account.files.map((file, fileIndex) => (
                            <div key={fileIndex} className="media-item">
                              {file.url.includes('image') ? (
                                <img 
                                  src={file.url} 
                                  alt={`Account ${index + 1} - Media ${fileIndex + 1}`}
                                  className="media-image"
                                />
                              ) : (
                                <video 
                                  src={file.url} 
                                  controls 
                                  className="media-video"
                                  preload="metadata"
                                />
                              )}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="no-media">
                          <span className="no-media-icon">🎬</span>
                          <p>No media files</p>
                        </div>
                      )}
                    </div>
                    
                    <div className="account-content">
                      <div className="account-description">
                        <h3 className="description-title">Description</h3>
                        <p className="description-text">
                          {account.description || 'No description provided'}
                        </p>
                      </div>
                      
                      <div className="account-price">
                        <span className="price-label">Price</span>
                        <span className="price-value">
                          ${account.price || '0.00'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
      <Footer />
    </>
  )
}

export default MyAccounts