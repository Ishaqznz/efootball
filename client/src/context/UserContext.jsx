import React, { useState } from 'react'
import { createContext } from 'react';
import { useEffect } from 'react';
import api from '../api';

const userContext = createContext()
const UserProvider = ({ children }) => {

    const [userData, setUserData] = useState('');
    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log('use effect in user context is working!');
                
                const response = await api.get('/userStatus');
                console.log('response data about the user: ',response);
                setUserData(response.data.userData)
                console.log('userData from the server: ', response.data.userData);
            } catch (error) {
                console.log('error while authenticating the user', error);
            }
        }

        fetchData();
    }, []);

    console.log('user context here!');
    
    return (
        <userContext.Provider value={{userData, setUserData}}>
            {children}
        </userContext.Provider>
    )
}

export default userContext
export { UserProvider }