import React, { useState, useContext } from 'react';

const AuthContext = React.createContext();
const UserContext = React.createContext();

const useAuthContext = () => {
    return useContext(AuthContext);
};
const useUserContext = () => {
    return useContext(UserContext);
};
const AuthProvider = ({ children }) => {
    const [isAuth, setIsAuth] = useState(false);
    const [user, setUser] = useState({});
    return (
        <AuthContext.Provider value={{ isAuth, setIsAuth }}>
            <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>
        </AuthContext.Provider>
    );
};

export { AuthProvider, useAuthContext, useUserContext };
