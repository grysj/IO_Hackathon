import { createContext, useContext, useState } from "react";
import {mockUser} from "../mock/MockedData";
const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const user = mockUser
    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, user }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
