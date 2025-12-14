import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate,  } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLogged, setIsLogged] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

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
        setCookie('isLogged', 'true');
        setCookie('user', JSON.stringify(userData.data));
        setCookie('token', userData.token);
        setCookie('userId', userData.data._id);
    };

    const logout = () => {
        setIsLogged(false);
        setUser(null);
        navigate('/', { replace: true });
        
        // Clear cookies
        deleteCookie('isLogged');
        deleteCookie('user');
        deleteCookie('token');
        deleteCookie('userId');
    };

    

    // Helper functions for cookie management
    const setCookie = (name, value, days = 1) => {
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
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; samesite=lax`;
    };

    const value = { isLogged, user, login, logout };
    
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);