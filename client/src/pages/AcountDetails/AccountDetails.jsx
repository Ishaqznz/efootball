import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../../api';
import Navbar from '../../components/NavBar/NavBar';
import './AccountDetails.css'
import Footer from '../../components/Footer/Footer';

const AccountDetails = () => {
  const { id } = useParams();
  const [account, setAccount] = useState({});
  const [files, setFiles] = useState([]);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchAccount = async () => {
      const fetchedAccount = await api.get(`/getAccount/${id}`);
      console.log('fetched data: ', fetchedAccount);
      console.log('fetched account data: ', fetchedAccount.data.accountData.files);

      setAccount(fetchedAccount.data.accountData)
      setFiles(fetchedAccount.data.accountData.files)
    }
    fetchAccount();
  }, [id])

  const handleImageSelect = (index) => {
    setSelectedImage(index);
  };

  const handleQuantityChange = (type) => {
    if (type === 'increment') {
      setQuantity(prev => prev + 1);
    } else if (type === 'decrement' && quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  console.log('account: ', account);
  console.log('files data: ', files);

  return (
    <>
      <Navbar />
      <div className="product-container">
        <div className="product-content">
          {/* Left Side - Image Gallery */}
          <div className="product-gallery">
            <div className="main-image-container">
              {files.length > 0 && (
                files[selectedImage]?.url.includes('image') ? 
                  <img 
                    src={files[selectedImage].url} 
                    alt="Product" 
                    className="main-image"
                  /> : 
                  <video 
                    src={files[selectedImage]?.url} 
                    className="main-video"
                    controls
                  />
              )}
            </div>
            
            <div className="thumbnail-container">
              {files.map((file, index) => (
                <div 
                  key={index}
                  className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                  onClick={() => handleImageSelect(index)}
                >
                  {file.url.includes('image') ? 
                    <img src={file.url} alt={`Thumbnail ${index + 1}`} /> :
                    <video src={file.url} muted />
                  }
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Product Info */}
          <div className="product-info">
            <div className="product-header">
              <h1 className="product-title">{account.title || 'Efootball Account'}</h1>
              <div className="product-rating">
              </div>
            </div>

            <div className="price-section">
              <div className="price-container">
                <span className="current-price">₹{account.price}</span>
                <span className="original-price">₹{account.price ? Math.floor(account.price * 1.4) : 0}</span>
                <span className="discount">30% off</span>
              </div>
            </div>

            <div className="product-description">
              <h3>Description</h3>
              <p>{account.description || 'No description available'}</p>
            </div>

            <div className="product-features">
              <h3>Features</h3>
              <ul>
                <li>100% guarantee </li>
                <li>Only Konami</li>
                <li>Konami Linked</li>
                <li>Trust Worthy</li>
              </ul>
            </div>

            {/* <div className="quantity-section">
              <label>Quantity:</label>
              <div className="quantity-controls">
                <button 
                  className="quantity-btn"
                  onClick={() => handleQuantityChange('decrement')}
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <span className="quantity-value">{quantity}</span>
                <button 
                  className="quantity-btn"
                  onClick={() => handleQuantityChange('increment')}
                >
                  +
                </button>
              </div>
            </div> */}

            <div className="action-buttons">
              <button className="btn btn-secondary buy-now">
                Buy Now
              </button>
            </div>

            {/* <div className="delivery-info">
              <div className="delivery-item">
                <span className="delivery-icon">🚚</span>
                <div>
                  <strong>Free Delivery</strong>
                  <p>Get free delivery on orders above ₹499</p>
                </div>
              </div>
              <div className="delivery-item">
                <span className="delivery-icon">↩️</span>
                <div>
                  <strong>Easy Returns</strong>
                  <p>15 days return policy</p>
                </div>
              </div>
              <div className="delivery-item">
                <span className="delivery-icon">🛡️</span>
                <div>
                  <strong>Secure Payment</strong>
                  <p>100% secure payment methods</p>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default AccountDetails