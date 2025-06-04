// import NavBar from "./components/NavBar/NavBar";
import SignUp from "./pages/SignUp/SignUp";
import Login from "./pages/Login/Login";
import AccountSell from "./pages/AccountSell/AccountSell";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home'
import AccountDetails from './pages/AcountDetails/AccountDetails'
import { createContext } from "react";
import { useEffect } from "react";
import api from './api';
import { UserProvider } from "./context/UserContext";
import MyAccounts from "./pages/myAccounts/MyAccounts";
import UserProfile from "./pages/UserProfile/UserProfile";

function App() {

    return (
        <UserProvider>
            <Routes>
                <Route path='/' element={ <Home /> } /> 
                <Route path='/sell' element={ <AccountSell /> } /> 
                <Route path='/login' element={ <Login /> } /> 
                <Route path='/signup' element={ <SignUp /> } /> 
                <Route path="account/:id" element={ <AccountDetails /> } />
                <Route path="/profile" element={ <UserProfile /> } />
                <Route path="/myAccounts" element={ <MyAccounts /> } />
            </Routes>
        </UserProvider>
    )
}

export default App;
