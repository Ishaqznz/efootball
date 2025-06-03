
import { useCallback, useRef, useState } from 'react';
import './SignUp.css'
import api from '../../api';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/NavBar/NavBar';
import Footer from '../../components/Footer/Footer';

const SignUp = () => {

  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    password: '',
    confirmPassword: ''
  })

  const navigate = useNavigate()

  const handleData = (e) => {
    setFormData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      }
    })
  }

  const validateForm = () => {
    const { fullName, phoneNumber, password, confirmPassword } = formData;

    if (fullName.length <= 2) {
      return setError('Name should contain more than 2 letters');
    }
    if (/[^a-zA-Z\s]/.test(fullName)) {
      return setError('Name should contain only letters and spaces');
    }

    if (!/^\d{10,}$/.test(phoneNumber)) {
      return setError('Phone number should contain at least 10 digits and only numbers');
    }

    if (password.length < 6) {
      return setError('Password must be at least 6 characters long');
    }

    if (password !== confirmPassword) {
      return setError('Passwords do not match');
    }

    setError('');
    console.log('Form submitted successfully:', formData);
    handleSubmit();
  };

  console.log('form data: ', formData);

  const handleSubmit = async () => {
    try {
      const response = await api.post('/signup', formData);
      alert('Successfully registered!');
      navigate('/')
    } catch (error) {
      console.log(error);
      alert('Server error!')
    }
  };

  return (
    <>
    <Navbar />
    <div className="signup-form">
      <h3>Sign Up</h3>
      <h5 style={{ color: 'red' }}>{ error }</h5>
      <form action="">
        <input type="text" placeholder='full name' name='fullName' onChange={(e) => handleData(e)}/>
        <br />
        <input type="number" placeholder='phone number' name='phoneNumber' onChange={(e) => handleData(e)}/>
        <br />
        <input type="text" placeholder='password' name='password' onChange={(e) => handleData(e)}/>
        <br />
        <input type="text" placeholder='confirm password' name='confirmPassword' onChange={(e) => handleData(e)}/>
      </form>
      <button onClick={() => validateForm()}>Sign Up</button>
      <h4>Already have an account! <button onClick={() => navigate('/login')}>Login</button></h4>
    </div>
    <Footer />
    </>
  )
}

export default SignUp;