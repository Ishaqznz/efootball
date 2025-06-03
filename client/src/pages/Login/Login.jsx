import React, { useState } from 'react'
import './Login.css'
import api from '../../api';
import { useNavigate } from 'react-router-dom';
import userContext from '../../context/userContext';
import { useContext } from 'react';
import Navbar from '../../components/NavBar/NavBar';
import Footer from '../../components/Footer/Footer';


const Login = () => {

  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    phoneNumber: '',
    password: ''
  });

  const { userData, setUserData } = useContext(userContext);

  const navigate = useNavigate()

  const handleData = (e) => {
    setFormData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      }
    })
  }

  const formValidate = () => {
    const { phoneNumber, password } = formData;

    if (!/^\d{10,}$/.test(phoneNumber)) {
      setError('Phone number must contain at least 10 digits and only numbers');
      return false;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return false;
    }

    setError('');
    handleSubmit();
    return true;
  };

  const handleSubmit = async () => {
    try {
      const response = await api.post('/login', formData);
      console.log(response.data);
      alert('Successfull logged in!');
      const userResponse = await api.get('/userStatus');
      setUserData(userResponse.data.userData);

      navigate('/');
    } catch (error) {
      console.log('error happened!', error);
      alert(error.message ? error.response.data.message: 'Server error!');
    }
  }

  console.log('form data: ', formData);

  return (
    <>
    <Navbar />
      <div className="login-form">
        <h3>Login</h3>
        <h5 style={{ color: 'red' }}>{ error }</h5>
        <form action="">
          <input type="number" name='phoneNumber' placeholder='phone number' onChange={(e) => handleData(e)}/>
          <br />
          <input type="text" name='password' placeholder='password' onChange={(e) => handleData(e)}/>
          <br />
        </form>
        <button onClick={() => formValidate()}>Login</button>
        <h5>new to here <button onClick={() => navigate('/signup')}>signup</button></h5>
      </div>
      <Footer />
    </>
  )
}

export default Login