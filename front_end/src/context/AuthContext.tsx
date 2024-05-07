import UserInterface from "@/interfaces/userInterface";
import { api } from "@/services/api";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import { createContext, useState } from "react";

export const AuthContext = createContext({} as AuthContextProps);

interface AuthContextProps {
    signIn: (data: SignInData) => Promise<void | string>;
    signUp: (data: SignInData) => Promise<void | string>;
    user: UserInterface | null;
    setUser: (data: UserInterface) => void;
    isAuthenticated: boolean;
    logout: () => void;
}

interface SignInData {
    username: string;
    password: string;
}

export function AuthProvider({ children }: any) {
    const [user, setUser] = useState<UserInterface | null>(null);
    const [isAuthenticated, setAuthenticated] = useState(false);
    const router = useRouter();

    async function signIn({ username, password }: SignInData) {
        let users = await api.post("user/singIn", {
            username,
            password,
        });

        if (users) {
            if (users.data.error) {
                return users.data.error;
            } else {
               
                if (users.data.message !== undefined) {
                    alert(users.data.message)
                }
                let decoded: UserInterface = jwtDecode(users.data.token);
                setCookie(undefined, "token", users.data.token, {
                    maxAge: 60 * 60 * 730000,
                });
                api.defaults.headers["Authorization"] = `Bearer ${users.data.token}`;

                setAuthenticated(true);

                setUser(decoded);
                router.push("/dashboard");
                return user;
            }
        }
    }
    async function signUp({ username, password }: SignInData) {
        let users = await api.post("user/singUp", {
            username,
            password,
        });

        if (users) {
            if (users.data.error) {
                return users.data.error;
            } else {
              
                if (users.data.message !== undefined) {
                    alert(users.data.message)
                }
                let decoded: UserInterface = jwtDecode(users.data.token);
                setCookie(undefined, "token", users.data.token, {
                    maxAge: 60 * 60 * 730000,
                });
                api.defaults.headers["Authorization"] = `Bearer ${users.data.token}`;

                setAuthenticated(true);

                setUser(decoded);
                router.push("/dashboard");
                return user;
            }
        }
    }

    function logout() {
        setCookie(undefined, "token", "", {
            maxAge: 0,
        });

        destroyCookie(undefined, "token");
        setAuthenticated(false);

        router.push("/");
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                signIn,
                signUp,
                isAuthenticated,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}