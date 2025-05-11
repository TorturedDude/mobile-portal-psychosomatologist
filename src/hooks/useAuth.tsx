// auth-context.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface AuthContextProps {
    isAuthenticated: boolean;
    setToken: (token: string) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [token, setTokenState] = useState<string | null>(null);

    useEffect(() => {
        AsyncStorage.getItem("access_token").then(storedToken => {
            if (storedToken) setTokenState(storedToken);
        });
    }, []);

    const setToken = async (newToken: string) => {
        await AsyncStorage.setItem("access_token", newToken);
        setTokenState(newToken);
    };

    const logout = async () => {
        await AsyncStorage.removeItem("access_token");
        setTokenState(null);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated: !!token, setToken, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within AuthProvider");
    return context;
};
