import React, { useContext, useEffect } from 'react'
import './Home.css'
import Navbar from '../../components/NavBar/NavBar';
import Cards from '../../components/Cards/Cards';
import userContext from '../../context/UserContext';
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