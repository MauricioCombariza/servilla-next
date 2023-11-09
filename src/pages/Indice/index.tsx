import React from 'react';
import { useRouter } from 'next/router';
import { Layout } from "../../components/Layout"
import { useAuth } from '../../Auth';
import { AuthContextProps } from '../../Auth';
import { ButtonSer, ButtonType } from '@/src/components/ButtonSer';
// import { Button } from "@mui/material";
// import { useNavigate } from "react-router-dom"

interface FoxResponse {
    image: string;
  }

const Indice: React.FC = () => {
    const auth = useAuth() as AuthContextProps
    const perfil = auth.user.perfil
    const company = auth.user.company
    // console.log('User: ', auth.user)
    // console.log('Company:',company)
    const [imageUrl, setImageUrl] = React.useState<string>('');
    const router = useRouter();

  const routeSearchServilla = () =>{ 
    const path = '/Historico/Servilla'; 
    router.push(path);
  }
  const routeInformesForm = () =>{ 
    const path = '/InformesDisponibles'; 
    router.push(path);
  }
  // const routSearchClient = () => {
  //   const path = '/historico/cliente'; 
  //   router.push(path);
  // }
  const routeDashboard = () => {
    const path = '/Dashboard'
    router.push(path)
  }

  React.useEffect(() => {
    fetch('https://randomfox.ca/floof/')
      .then((response) => response.json())
      .then((data: FoxResponse) => setImageUrl(data.image));
  }, []);
    
  return (
    <Layout>
        <div className='container mx-3'>
            <p className="flex justify-center items-center text-ser text-2xl  my-5 lg:my-10">Bienvenido {auth.user.username}</p>
            <div className='container flex flex-col lg:flex-row lg:justify-around justify-center items-center'>
                <div className="flex flex-col gap-4  w-full lg:w-1/3 mt-5 justify-center items-center m-3 p-3">
                    {perfil > 4?
                    <div className='flex flex-col gap-4 w-full mt-5 justify-center items-center m-3'>
                        <ButtonSer onClick={routeDashboard} fullWidth={true} name='Dashboard' type={ButtonType.Button} />
                        <ButtonSer onClick={routeInformesForm}  fullWidth={true}type={ButtonType.Button} name='Informes' />
                        <ButtonSer onClick={routeSearchServilla}  fullWidth={true}type={ButtonType.Button} name='Busqueda' />
                    </div>:
                // perfil > 2?
                <div className='flex flex-col gap-4 w-full mt-5 justify-center items-center m-3'>
                    <ButtonSer onClick={routeInformesForm}  fullWidth={true}type={ButtonType.Button} name='Informes' />
                    <ButtonSer onClick={routeSearchServilla}  fullWidth={true}type={ButtonType.Button} name='Busqueda' />
                </div>
                // perfil > 0?
                // <Button onClick={routSearchClient} variant="contained" color="success" size="large" fullWidth={true}>Busquedas</Button>:
                // <p>Estas en el lugar equivocado</p>
                    }                       
                </div>
                <div className="flex justify-center items-center h-2/3">
                    {imageUrl && <img src={imageUrl} alt="Random Fox" />}
                </div>
            </div>
        </div>
    </Layout>
  )
}

export default Indice