import {createContext, useContext, useState} from "react";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [isLogged, setIsLogged] = useState(false);

    const login = () => setIsLogged(true);
    const logout = () => setIsLogged(false);

    const value = {isLogged, login, logout};
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);


