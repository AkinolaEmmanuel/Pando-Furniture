import { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLogged, setIsLogged] = useState(false);
    const [user, setUser] = useState(null);

    // Check for existing session on mount
    useEffect(() => {
        const savedAuth = getCookie('isLogged');
        const savedUser = getCookie('user');
        
        if (savedAuth === 'true' && savedUser) {
            setIsLogged(true);
            setUser(JSON.parse(savedUser));
        }
    }, []);

    const login = (userData) => {
        setIsLogged(true);
        setUser(userData);
        
        // Set cookies
        setCookie('isLogged', 'true', 7);
        setCookie('user', JSON.stringify(userData), 7);
        setCookie('userId', userData.data._id, 7);
    };

    const logout = () => {
        setIsLogged(false);
        setUser(null);
        
        // Clear cookies
        deleteCookie('isLogged');
        deleteCookie('user');
        deleteCookie('userId');
    };

    // Helper functions for cookie management
    const setCookie = (name, value, days) => {
        const expires = new Date();
        expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
        document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
    };

    const getCookie = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
        return null;
    };

    const deleteCookie = (name) => {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    };

    const value = { isLogged, user, login, logout };
    
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);