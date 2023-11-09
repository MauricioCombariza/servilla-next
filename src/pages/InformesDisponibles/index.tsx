import { useAuth } from "../../Auth"
import { Layout } from "../../components/Layout"
// import { Button } from "@mui/material"
import { ButtonSer, ButtonType } from "@/src/components/ButtonSer";
import { useRouter } from 'next/router';
// import { useNavigate } from "react-router-dom"

const InformesDisponibles: () => JSX.Element | null = () => {

  const auth = useAuth()
  const router = useRouter()
  // const navigate = useNavigate()
  
  const gestion = () =>{ 
    const path = '/GestionDocumentos'; 
    router.push(path);
    auth.setIsMensajero(true)
  }

    return (
  <Layout>
       <div className="container flex flex-col justify-around items-center w-2/3 mt-20 m-6">
       <ButtonSer
       onClick={gestion}
       name="Gestión"
       type={ButtonType.Button}
       fullWidth={true} />
       </div>
  </Layout>
    )
}

export default InformesDisponibles