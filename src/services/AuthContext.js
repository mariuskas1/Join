import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { tryFetchWithAuthentication } from "./apiService";


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const checkUserAuthentication = async () => {
            const storedUser = localStorage.getItem("currentUser");

            if (!storedUser) {
                navigate("/");
                return;
            }

            const isUserTokenValid = await tryFetchWithAuthentication();
            if (!isUserTokenValid) {
                localStorage.removeItem("currentUser");
                setUser(null);
                navigate("/");
            } else {
                setUser(storedUser);
            }
        };

        checkUserAuthentication();
    }, [navigate]);

    return (
        <AuthContext.Provider value={{ user }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
