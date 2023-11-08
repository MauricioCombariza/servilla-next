import React from "react";
import { ButtonSer, ButtonType } from "../../components/ButtonSer";
import Container from '@mui/material/Container';
import { useAuth } from "../../Auth";
import { AuthContextProps } from "../../Auth";
import { LoginType } from "../../Hooks/usePostLogin";
import { usePostLogin, LOADING_STATUS } from "../../Hooks/usePostLogin";
import { LoadingSpinner } from "../../components/LoadingSpinner";

interface FormData {
    auth: AuthContextProps
    email: string;
    password: string;
    API: string;
  }
  

const Ingresar = () => {
    const auth = useAuth() as AuthContextProps
    const form = React.useRef<HTMLFormElement>(null)
    
    const OnFormSubmit = (dataLogin: LoginType) => usePostLogin(dataLogin);

    const [errorMensaje, setErrorMensaje] = React.useState<string | null>(null);
    const [isLoading, setIsLoading] = React.useState<string>('')

    
    const login = async (e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault()
        setIsLoading(LOADING_STATUS)
        const preAPI = process.env.API
        const postAPI = 'user/login'
        try {
          if (form.current) {
            const formData = new FormData(form.current);
            const data: FormData = {
              auth: auth,
              API: `${preAPI}/${postAPI}`,
              email: formData.get('email') as string,
              password: formData.get('password') as string
            };
    
            const response = await OnFormSubmit(data);
            // console.log('Response: ', response)
    
            if (response && response.answer !== undefined) {
              setErrorMensaje(response.answer);
            } else {
              setErrorMensaje(null);
            }
          } else {
            console.error('form.current es nulo');
          }
        } finally {
          setIsLoading(''); // Restablecer el estado de isLoading después de la solicitud
        }
      }

    
    
    return (
        <div>
            <Container maxWidth="md">
            <form
                method="post"
                className="container mt-10 lg:px-20 lg:m-20 mx-2 pt-10 bg-gray-200"
                onSubmit={login}
                ref={form}
            >
                
                <h1 className="font-bold text-ser">INGRESAR</h1>
                <div className="py-2 px-2 mt-10">
                <div>Email</div>
                <input
                    className="w-full leading-snug text-gray-800 placeholder-blue-400 py-1 px-4 bg-green-600 rounded border border-darkser hover:bg-ser focus:outline-none focus:shadow-outline hover:text-white"
                    type="email"
                    name="email"
                    placeholder="Email"
                />
                </div>
                <div className="py-2 px-2">
                <div>Clave</div>
                <input
                    className="w-full leading-snug text-gray-800 placeholder-blue-400 py-1 px-4 bg-green-600 rounded border border-darkser hover:bg-ser focus:outline-none focus:shadow-outline hover:text-white"
                    type="password"
                    name="password"
                    placeholder="Password"
                    
                />
                </div>
                <div className="py-4">
                <ButtonSer
                type={ButtonType.Submit}
                name={'INGRESAR'} />
                </div>
                <div className="text-red-500">
                
                </div>
                
            </form>
            {isLoading == 'LOADING' ? (

              <>
              <h1>Descargando....</h1>
              <LoadingSpinner />
              </>
              ) : ( 
              <div className="text-red-500">
                {errorMensaje && (
                  <p className="text-red-500 font-bold mt-2">
                    {errorMensaje}
                  </p>
                )}
              </div>
                )}
              
            </Container>
        </div>
    )
}

export default Ingresar