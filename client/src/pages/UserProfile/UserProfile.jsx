import React from 'react'
import './UserProfile.css'
import userContext from '../../context/UserContext'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../api';
import Navbar from '../../components/NavBar/NavBar'
import Footer from '../../components/Footer/Footer'

const UserProfile = () => {
  const { userData, setUserData } = useContext(userContext);
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      const response = await api.patch('/userLogout');
      alert('Logout successful!')
      setUserData(null);
      navigate('/')
    } catch (error) {
      console.log('Error while logout the user: ', error);
      alert('Server error!');
    }
  }

  return (
    <>
      <Navbar />
      <div className="profile-container">
        <div className="profile-card">
          <div className="profile-header">
            <div className="profile-avatar">
              <span className="avatar-text">
                {userData?.fullName?.charAt(0).toUpperCase()}
              </span>
            </div>
            <h2 className="profile-name">{userData?.fullName}</h2>
            <p className="profile-email">{userData?.email}</p>
          </div>
          
          <div className="profile-actions">
            <button 
              className="btn btn-primary" 
              onClick={() => navigate('/myAccounts')}
            >
              <span className="btn-icon">📊</span>
              My Accounts
            </button>
            
            <button 
              className="btn btn-secondary" 
              onClick={handleLogout}
            >
              <span className="btn-icon">🚪</span>
              Logout
            </button>
          </div>
        </div>
      </div>
    <Footer />
    </>
  )
}

export default UserProfile