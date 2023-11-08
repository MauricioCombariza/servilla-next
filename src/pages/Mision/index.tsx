import { Layout } from "../../components/Layout"
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { green } from '@mui/material/colors';

const Mision = () => {
  return (
    <Layout>
      <div
    className="container flex items-center justify-center h-screen md:mt-5 lg:mt-1"
  >
    <Card sx={{ maxWidth: 600, p:1, backgroundColor: green[500]}}>
      <CardMedia
        sx={{ height: 300 }}
        image="https://res.cloudinary.com/combariza/image/upload/v1675258218/Servilla/mision_mf19dw.jpg"
      ></CardMedia>
      <Typography variant='h4' align='center' sx={{p:1}}> Misión </Typography>

      <Typography color="text.primary" sx={{px:5, textAlign: 'justify'}}>
        Somos una compañía dedicada a la mensajería expresa del sector público,
        privado y mixto, con cubrimiento urbano y nacional. Servilla S.A.S
        analiza el mercado para enfrentar los cambios migrando hacia una era
        digital y tecnificada. Las fortalezas de nuestra organización se
        fundamentan en: El personal competente en sistemas informáticos,
        operativos y de distribución. La experiencia, cobertura y mejoramiento
        continuo de los procesos a través de la implementación de herramientas
        tecnológicas, calidad y rapidez de entrega. Proyectamos hacia nuestros
        clientes la responsabilidad y el compromiso en la entrega de la
        correspondencia.
      </Typography>
      
    </Card>
  </div>
    </Layout>
  )
}

export default Mision