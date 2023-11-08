import EditIcon from '@mui/icons-material/Edit';
import HomeIcon from '@mui/icons-material/Home';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CrisisAlertIcon from '@mui/icons-material/CrisisAlert';
import HighQualityIcon from '@mui/icons-material/HighQuality';
import LockIcon from '@mui/icons-material/Lock';
import PedalBikeIcon from '@mui/icons-material/PedalBike';
import MailIcon from '@mui/icons-material/Mail';
import ArticleIcon from '@mui/icons-material/Article';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import AttachEmailIcon from '@mui/icons-material/AttachEmail';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import PrintIcon from '@mui/icons-material/Print';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import { ListType, ListDetailType } from './type/navListType';

const horizontalNavItems: ListType[] = [
    {
        icon: 
        <HomeIcon sx={{ color:{xs:"green", sm:"white"} }}/>
        ,
        title: "Nosotros",
        link: "/",
        nested: true,
        private: false,
        id:1,
        className: '',
        onclick: undefined
    },
    {
        icon: <PedalBikeIcon sx={{ color:{xs:"green", sm:"white"} }}/>,
        title: "Servicios",
        link: "",
        private: false,
        nested: true,
        id:401,
        className: ''
    },
    {  icon: <LocalPhoneIcon sx={{ color:{xs:"green", sm:"white"} }}/>,
      title: "Contactenos",
      link: "/Contactenos",
      private: false,
      id:3,
      className: ''
    },
    {
        icon: <LockOpenIcon sx={{ color:{xs:"green", sm:"white"} }}/>,
        title: "Ingresar",
        link: "/Ingresar",
        private: false,
        id:4,
        className: ''
    },
    {
        icon: <EditIcon sx={{ color:{xs:"green", sm:"white"} }}/>,
        title: "Registrarse",
        link: "/Registrarse",
        private: false,
        id:5,
        className: ''
    },
    {
        icon: <ArticleIcon sx={{ color:{xs:"green", sm:"white"} }}/>,
        title: "Informes",
        link: "/Indice",
        private: true,
        id:6,
        className: ''
    },
    {
        icon: <LockIcon sx={{ color:{xs:"green", sm:"white"} }}/>,
        title: "Cerrar sesion",
        link: "/Salir",
        private: true,
        id:7,
        className: ''
    },
    
  ];

  const verticalNavItems: ListType[] = [
    {
        icon: 
        <HomeIcon sx={{ color:{xs:"green", sm:"white"} }}/>
        ,
        title: "Nosotros",
        link: "/",
        nested: true,
        private: false,
        id:400,
        className: ''
    },
    {
        icon: <PedalBikeIcon sx={{ color:{xs:"green", sm:"white"} }} />,
        title: "Servicios",
        link: "/",
        private: false,
        nestedServ: true,
        id:401,
        className: ''
    },
    {
      icon: <LocalPhoneIcon sx={{ color:{xs:"green", sm:"white"} }}/>,
      title: "Contactenos",
      link: "/Contactenos",
      private: false,
      id:402,
      className: ''
    },
    {
        icon: <LockOpenIcon sx={{ color:{xs:"green", sm:"white"} }}/>,
        title: "Ingresar",
        link: "/Ingresar",
        private: false,
        id:403,
        className: ''
    },
    {
        icon: <EditIcon sx={{ color:{xs:"green", sm:"white"} }}/>,
        title: "Registrarse",
        link: "/Registrarse",
        private: false,
        id:404,
        nested: false,
        className: ''
    },
    {
        icon: <LockIcon sx={{ color:{xs:"green", sm:"white"} }}/>,
        title: "Cerrar sesion",
        link: "/Salir",
        private: true,
        id:405,
        nested: false,
        className: ''
    },
    {
        icon: <LockIcon sx={{ color:{xs:"green", sm:"white"} }}/>,
        title: "Informes",
        link: "/Indice",
        private: true,
        id:405,
        nested: false,
        className: ''
    },
  ];

  const homeItems: ListDetailType[] = [
    {
        icon: <VisibilityIcon sx={{ color:"white", "& :hover": { color: "Green" } }}/>,
        title: "Misión",
        link: "/Mision",
        private: false,
        id:100,
        className: ''
    },
    {
        icon: <CrisisAlertIcon sx={{ color:"white", "& :hover": { color: "Green" } }}/>,
        title: "Visión",
        link: "/Vision",
        private: false,
        id:101,
        className: ''
    },
    {
        icon: <HighQualityIcon sx={{ color:"white", "& :hover": { color: "Green" } }}/>,
        title: "Calidad",
        link: "/Calidad",
        private: false,
        id:102,
        className: ''
    },

  ]

  const privatePages: ListDetailType[] = [
    {
        title: "cliente",
        link: "/Historico/Cliente",
        private: true,
        id: 200,
        icon: <MailIcon sx={{ color:"white", "& :hover": { color: "Green" } }}/>,
        className: ''
    },
    {
        title: "servilla",
        link: "/Historico/Servilla",
        private: true,
        id: 201,
        icon: <MailIcon sx={{ color:"white", "& :hover": { color: "Green" } }}/>,
        className: ''
    },
    {
        title: "logout",
        link: "/Salir",
        private: true,
        id: 202,
        icon: <MailIcon sx={{ color:"white", "& :hover": { color: "Green" } }}/>,
        className: ''
    }
  ]

  const serviceItems: ListDetailType[] = [
    {
        icon: <MailIcon sx={{ color:"white", "& :hover": { color: "Green" } }}/>,
        title: "Distribución",
        link: "/Servicio/Distribucion",
        private: false,
        id:300,
        className: ''
    },
    {
        icon: <LocalShippingIcon sx={{ color:"white", "& :hover": { color: "Green" } }}/>,
        title: "Paqueteo",
        link: "/Servicio/Paqueteo",
        private: false,
        id:301,
        className: ''
    },
    {
        icon: <PrintIcon sx={{ color:"white", "& :hover": { color: "Green" } }}/>,
        title: "Impresión",
        link: "/Servicio/Impresion",
        private: false,
        id:302,
        className: ''
    },
    {
        icon: <AttachEmailIcon sx={{ color:"white", "& :hover": { color: "Green" } }}/>,
        title: "Email certificado",
        link: "/Servicio/Email",
        private: false,
        id:303,
        className: ''
    },
    {
        icon: <WarehouseIcon sx={{ color:"white", "& :hover": { color: "Green" } }}/>,
        title: "Fullfilment",
        link: "/Servicio/Fullfilment",
        private: false,
        id:304,
        className: ''
    },
    {
        icon: <CardGiftcardIcon sx={{ color:"white", "& :hover": { color: "Green" } }}/>,
        title: "Alistamiento y embalaje",
        link: "/Servicio/Alistamiento",
        private: false,
        id:305,
        className: ''
    },

  ]

  export {horizontalNavItems, homeItems, serviceItems, verticalNavItems, privatePages}