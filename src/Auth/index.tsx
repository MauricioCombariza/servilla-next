import React, { useContext, createContext, useState } from "react";
import { useRouter } from "next/router";
// import { useNavigate, Navigate } from "react-router-dom";

interface User {
  email: string;
  username: string;
  company: number
  perfil: number
  activate: number
}

export interface AuthContextProps {
  authorized: boolean;
  user: User;
  token: string;
  setToken: (token: string) => void;
  login: (token: string
    , user: User
    ) => void;
  signup: () => void;
  logout: () => void;
  isMensajero: boolean,
  setIsMensajero: (isMensajero:boolean) => void
}

const AuthContext = createContext<AuthContextProps>({
  authorized: false,
  user: {
    email: '',
    username: '',
    company: 1,
    activate: 1,
    perfil: 1
  },
  token: '',
  setToken: () => {
    null
  },
  isMensajero: false,
  setIsMensajero: () => false,
  login: () => {
    null
  },
  signup: () => {
    null
  },
  logout: () => {
    null
  }
});

function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState({
    email: '',
    username: '',
    company: 1,
    activate: 1,
    perfil: 1
  })
  const [authorized, setAuthorized] = useState(false)
  const [token, setToken] = useState('')

  // Estado para mostrar o no el input en el formulario para filtrar este informe
  const [ isMensajero, setIsMensajero] = useState<boolean>(false)

  const login = (token: string
    , user: User
    ) => {
    setToken(token)
    setUser(user)
    setAuthorized(true)
    router.push("/Indice");
  };
  const signup = () => {
    router.push("/Indice");
  }
  const newToken = (token: string) => {
    setToken(token)
  }
  const newAuthorized = () =>{
    setAuthorized(true)
  }
  const logout = () => {
    setUser({
      email: '',
      username: '',
      company: 1,
      activate: 1,
      perfil: 1
    });
    router.push("/");
    setAuthorized(false)
    setToken('')
  };
  const auth = {
    authorized,
    user,
    newToken,
    newAuthorized,
    setToken,
    token,
    login,
    signup,
    logout,
    // Set de todas los input autorizados para los informes
    isMensajero,
    setIsMensajero,
  };

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

function useAuth(): AuthContextProps {
  const auth = useContext<AuthContextProps>(AuthContext);
  return auth;
}

function ProtectRoute({ children }: { children: React.ReactNode }) {
  const auth = useAuth();
  const router = useRouter();

  if (!auth.authorized) {
    // Redirigir al usuario a la página de inicio de sesión si no está autorizado
    router.push('/ingresar');
    return null; // Puedes devolver null aquí, ya que la redirección hará que el componente de la página de inicio de sesión se cargue.
  }

  return <>{children}</>;
}


export { AuthProvider, useAuth, ProtectRoute };
