import { Layout } from "../../components/Layout"
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { green } from '@mui/material/colors';

const Calidad = () => {
  return (
    <Layout>
      <div
    className="container flex items-center justify-center h-screen md:mt-5 lg:mt-1"
  >
    <Card sx={{ maxWidth: 600, p:1, backgroundColor: green[500]}}>
      <CardMedia
        sx={{ height: 300 }}
        image="https://res.cloudinary.com/combariza/image/upload/v1675258218/Servilla/calidad_sfwsnf.jpg"
      ></CardMedia>
      <Typography variant='h4' align='center' sx={{p:1}}> Calidad </Typography>

      <Typography color="text.primary" sx={{px:5, textAlign: 'justify'}}>
        En Servilla S.A.S, compañía dedicada a la mensajería expresa del sector
        público, privado y mixto, con cubrimiento urbano y nacional, nos
        comprometemos a la satisfacción de las expectativas de nuestros clientes
        a través del cumplimiento de sus necesidades. Nos orientamos hacia el
        mejoramiento continuo de los procesos y el progreso integral de nuestro
        personal, para el logro de la calidad en el servicio.
      </Typography>
      
    </Card>
  </div>
    </Layout>
  )
}

export default Calidad