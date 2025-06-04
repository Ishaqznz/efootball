import React, { useState } from 'react';
import { Search, Globe, User, Menu, X, ShoppingBag } from 'lucide-react';
import './Navbar.css';
import { useNavigate } from 'react-router-dom';
import userContext from '../../context/UserContext';
import { useContext } from 'react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const { userData, setUserData } = useContext(userContext);

  const navigate = useNavigate()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo Section */}
        <div className="navbar-logo">
          <div className="logo-icon">
            <ShoppingBag size={28} />
          </div>
          <span className="logo-text">Apex.com</span>
        </div>

        {/* Search Section */}
        <div className={`search-container ${isSearchFocused ? 'focused' : ''}`}>
          <Search className="search-icon" size={20} />
          <input
            type="text"
            placeholder="Search by games, items etc..."
            className="search-input"
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
          />
        </div>

        {/* Right Section */}
        <div className="navbar-right">
          <button className="sell-btn" onClick={() => navigate('/sell')}>
            <span>Sell Item</span>
          </button>
          
          <div className="icon-group">
            <button className="icon-btn">
              <Globe size={22} />
            </button>
            
            <button className="login-btn" onClick={() => {
              !userData ? navigate('/login'): navigate('/profile');
            }}>
              <User size={18} />
              {/* <span>Login</span> */}
              { userData ? <span>{userData.fullName}</span>:  <span>Login</span>}
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="mobile-menu-btn" onClick={toggleMenu}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
        <div className="mobile-search">
          <Search className="search-icon" size={20} />
          <input
            type="text"
            placeholder="Search by games, items etc..."
            className="search-input"
          />
        </div>
        
        <div className="mobile-menu-items">
          <button className="mobile-menu-item">
            <ShoppingBag size={20} />
            <span>Sell Item</span>
          </button>
          
          <button className="mobile-menu-item">
            <Globe size={20} />
            <span>Language</span>
          </button>
          
          <button className="mobile-menu-item">
            <User size={20} />
            <span>Login</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;