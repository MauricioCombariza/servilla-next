import { Container } from "@mui/system";
import React from "react";
import { ButtonSer, ButtonType } from "../../components/ButtonSer";
import { LoadingSpinner } from "@/src/components/LoadingSpinner";
import { usePostSignup, SignupType } from "../../Hooks/usePostSignup";
import { useAuth, AuthContextProps } from "../../Auth";

interface FormData {
  auth: AuthContextProps
  email: string | null;
  username: string | null;
  company: string | null;
  password: string | null;
  confirmPassword: string | null;
  API: string;
}

function Registrarse () {
    const auth = useAuth()
    const form = React.useRef(null)

    const [isLoading, setIsLoading] = React.useState(false)

    const OnFormSubmit = async (dataForm: SignupType) => {
        setIsLoading(true); // Marca como cargando al iniciar la solicitud
        await usePostSignup(dataForm);
        setIsLoading(false); // Marca como no cargando al completar la solicitud
      };

    const signup = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const preAPI = process.env.API
        const postAPI = 'user/signup'
        const API = `${preAPI}/${postAPI}`

        if (form.current) {
          const formData = new FormData(form.current)
          const data: FormData = {
            auth: auth,
            email: formData.get('email')?.toString() || null,
            username: formData.get('username')?.toString() || null,
            company: formData.get('company')?.toString() || null,
            password: formData.get('password')?.toString() || null,
            confirmPassword: formData.get('confirmPassword')?.toString() || null,
            API: API
        }
        OnFormSubmit(data) 
        }
    }

    return (
        <Container maxWidth='md'>
            <form
            className="container lg:px-20 lg:m-20 mx-2 pt-10 bg-gray-200"
            method="post"
            onSubmit={signup}
            ref={form}
            >
            <h1 className="font-bold text-ser">REGISTRARSE</h1>
            <div className="py-2 px-2">
            <div>Email</div>
            <input
                name="email"
                className="w-full leading-snug text-gray-800 placeholder-blue-400 py-1 px-4 bg-green-600 rounded border border-darkser hover:bg-ser focus:outline-none focus:shadow-outline hover:text-white"
                type="email"
                placeholder="Email"
            />
            </div>
            <div className="py-2 px-2">
            <div>Username</div>
            <input
                name="username"
                className="w-full leading-snug text-gray-800 placeholder-blue-400 py-1 px-4 bg-green-600 rounded border border-darkser hover:bg-ser focus:outline-none focus:shadow-outline hover:text-white"
                type="username"
                placeholder="Usuario"
            />
            </div>
            <div className="py-2 px-2">
            <div>Compañia</div>
            <input
                name="company"
                className="w-full leading-snug text-gray-800 placeholder-blue-400 py-1 px-4 bg-green-600 rounded border border-darkser hover:bg-ser focus:outline-none focus:shadow-outline hover:text-white"
                type="company"
                placeholder="Compañía"
            />
            </div>
            <div className="py-2 px-2">
            <div>Clave</div>
            <input
                name="password"
                className="w-full leading-snug text-gray-800 placeholder-blue-400 py-1 px-4 bg-green-600 rounded border border-darkser hover:bg-ser focus:outline-none focus:shadow-outline hover:text-white"
                type="password"
                placeholder="Password"
            />
            </div>
            <div className="py-2 px-2">
            <div>Confirmar clave</div>
            <input
                name="confirmPassword"
                className="w-full leading-snug text-gray-800 placeholder-blue-400 py-1 px-4 bg-green-600 rounded border border-darkser hover:bg-ser focus:outline-none focus:shadow-outline hover:text-white"
                type="password"
                placeholder="Confirm Password"
            />
            </div>
            <div className="py-4">
            <ButtonSer type={ButtonType.Submit} name={"REGISTRARSE"} />
            </div>
        </form>
        {isLoading && <LoadingSpinner />}
        </Container>
    )
}

export default Registrarse