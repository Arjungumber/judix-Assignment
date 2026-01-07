import { createContext, useEffect, useState } from 'react';
import axios from "axios";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);


    const loadUser = async () => {
        try {
        const res = await axios.get(
            `${process.env.REACT_APP_API_URL}auth/me`, {
            headers: {
            'Authorization' :`Bearer ${localStorage.getItem('token')}`
            },
        });
        setUser(res.data.user);
        } catch {
        logout();
        } finally {
        setLoading(false);
        }
    };

    const login = async (data) => {
        const res = await axios.post(
        `${process.env.REACT_APP_API_URL}auth/login`, data);
        localStorage.setItem('token', res.data.token);
        await loadUser();
        return (res.data.user);
    };

    const signup = async (data) => {
        await axios.post(`${process.env.REACT_APP_API_URL}auth/signup`, data);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    useEffect(() => {
        if (localStorage.getItem('token')) loadUser();
        else setLoading(false);
    }, []);

    return (
        <AuthContext.Provider value={{ user, login, signup, logout, loading, loadUser }}>
        {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
