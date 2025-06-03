import React, { useContext, useEffect } from 'react'
import './Home.css'
import Navbar from '../../components/NavBar/NavBar';
import Cards from '../../components/Cards/Cards';
import api from '../../api';
import userContext from '../../context/userContext';
import Footer from '../../components/Footer/Footer';

const Home = () => {
  const {userData, setUserData} = useContext(userContext)
  console.log('User data in the userData Home component: ', userData);

  return (
    <>
      <Navbar />
      <Cards />
      <Footer />
    </>
  )
}

export default Home