import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import UserContext from '../../contexts/userContext';
import GlobalStyle from '../../Styles/globalStyles';
import SignInPage from '../SignIn';
import SignUpPage from '../SignUp';
import RegistersPage from '../Registers';

function App() {
    const [user, setUser] = useState(
        localStorage.getItem('userdata')
            ? JSON.parse(localStorage.getItem('userdata'))
            : null
    );

    return (
        // eslint-disable-next-line react/jsx-no-constructed-context-values
        <UserContext.Provider value={{ user, setUser }}>
            <GlobalStyle />
            <Routes>
                <Route path="/sign-up" element={<SignUpPage />} />
                <Route path="/login" element={<SignInPage />} />
                <Route path="/user/registers" element={<RegistersPage />} />
            </Routes>
        </UserContext.Provider>
    );
}

export default App;
