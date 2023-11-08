import { Layout } from "../../components/Layout"
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { green } from '@mui/material/colors';

const Vision = () => {
  return (
    <Layout>
      <div
    className="container flex items-center justify-center h-screen mt-5 lg:mt-1"
  >
    <Card sx={{ maxWidth: 600, p:1, backgroundColor: green[500]}}>
      <CardMedia
        sx={{ height: 300 }}
        image="https://res.cloudinary.com/combariza/image/upload/v1675258218/Servilla/vision_vqyyd1.jpg"
      ></CardMedia>
      <Typography variant='h4' align='center' sx={{p:1}}> Visión </Typography>

      <Typography color="text.primary" sx={{px:5, textAlign: 'justify'}}>
        En 5 años Servilla S.A.S será reconocida como una organización de
        soluciones de transporte de bienes y correspondencia, dirigida a ofrecer
        soluciones de logística donde nuestros principales compromisos serán:
        Fortalecer las relaciones con nuestros proveedores y clientes. Lograr
        posicionarse en el mercado de transporte de productos. Adoptar
        tecnología de punta que permita ser competentes en el mercado
        manteniendo la disciplina, lealtad y ética con nuestros clientes.
      </Typography>
      
    </Card>
  </div>
    </Layout>
  )
}

export default Vision