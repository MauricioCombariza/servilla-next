import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { green, red } from '@mui/material/colors';
import { useAuth } from '../../Auth';

export interface MediaCardType {
    serial: string,
    estado: string,
    company: number,
    nombre: string,
    direccion: string,
    ciudad: string,
    codigo: string,
    dirnum: string,
    inicio: string,
    medio: string,
    final: string,
    retorno: string
}

function MediaCard({serial, company, nombre, direccion, ciudad, codigo, dirnum, inicio, medio, final, retorno}: MediaCardType) {

  const auth = useAuth()
  const perfil = auth.user.perfil
  const empresa = auth.user.company

  if (serial) {
    if (perfil > 2) {
      return (
        <Card sx={{ maxWidth: 345 }}>
         <div key={serial}
             >
               <CardMedia
             sx={{ height: 280 }}
             image={`https://www.gruposervilla.com/guias/${inicio}/${medio}/${final}.png`}
             // image="https://res.cloudinary.com/combariza/image/upload/w_200,h_260,c_fill/v1643213357/Servilla/delivery3_imei5v.webp"
             title="ghsdhs"
           />
           <CardContent sx={{backgroundColor: retorno === "E"? green[400]:red[500]}}>
             <Typography gutterBottom variant="h6" component="div">
               {nombre}
             </Typography>
             <Typography variant="body2" color="text.secondary">
               {direccion} | {ciudad} | {codigo} 
             </Typography>
             <Typography variant="body2" color="text.secondary">
               {retorno} | Dirnum | {dirnum} 
             </Typography>           
           </CardContent>
           </div>
         </Card>
   );
    }
    if (perfil == 1 && empresa == company){
      return (
        <Card sx={{ maxWidth: 345 }}>
         <div key={serial}
             >
               <CardMedia
             sx={{ height: 280 }}
             image={`https://www.gruposervilla.com/guias/${inicio}/${medio}/${final}.png`}
             // image="https://res.cloudinary.com/combariza/image/upload/w_200,h_260,c_fill/v1643213357/Servilla/delivery3_imei5v.webp"
             title="ghsdhs"
           />
           <CardContent sx={{backgroundColor: retorno === "E"? green[400]:red[500]}}>
             <Typography gutterBottom variant="h6" component="div">
               {nombre}
             </Typography>
             <Typography variant="body2" color="text.secondary">
               {direccion} | {ciudad} | {codigo} 
             </Typography>
             <Typography variant="body2" color="text.secondary">
               {retorno} | Dirnum | {dirnum} 
             </Typography>
           </CardContent>
           </div>
         </Card>
   );
    }
    else {
      return (
        <h1>Imagen no autorizada</h1>
      )
    }
  }
  else {
    return <h1>Serial no encontrado!!</h1>;
  }
   

  
}
export {MediaCard}