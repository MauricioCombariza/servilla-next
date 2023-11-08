import { Layout } from "../../components/Layout";
import { CloudinaryImage } from "../../components/Image/CloudinaryImage";

function HomePage(): JSX.Element {
  return (
    <Layout>
      <div className="wrapper pt-10 md:pt-20 grid bg-darkser">
        <div className="uno invisible md:visible flex justify-center content-center bg-ser">
          <CloudinaryImage
          url="v1643213357/Servilla/delivery3_imei5v.webp"
          width={220}
          height={260}
          alt="Foto1"
          />
        </div>
        <div className="dos flex col-start-1 col-end-5 md:col-start-2 md:col-end-3 justify-center content-center md:h-86 hidden-sm-only bg-darkser object-cover">
          <div className="md:hidden w-full h-auto flex justify-center items-center">
            <img
            src="https://res.cloudinary.com/combariza/image/upload/,c_limit/v1643213349/Servilla/delivery2_djawkh.jpg"
            className="w-full h-auto" // Mostrar en dispositivos móviles, ocultar en pantallas medianas o más grandes
            alt="Foto2"
            />
          </div>
        <div className="hidden md:block w-full h-auto">
        <CloudinaryImage
          url="v1643213349/Servilla/delivery2_djawkh.jpg"
          width={200}
          height={260}
          alt="Foto2"
          />
        </div>
        </div>
        <div className="tres invisible md:visible flex justify-center content-center h-86 bg-dark-ser">
        <CloudinaryImage
          url="v1643213335/Servilla/ruedas_tvuc5k.jpg"
          width={200}
          height={260}
          alt="Foto3"
          />
        </div>
        <div className="cuatro invisible md:visible flex justify-center col-start-3 col-end-6 md:col-start-4 md:col-end-5 content-center h-86 bg-darkser">
        <CloudinaryImage
          url="v1643213327/Servilla/delivey_bike_1_sw3ll6.jpg"
          width={200}
          height={260}
          alt="Foto4"
          />
        </div>
        <div className="cinco invisible md:visible flex justify-center content-center bg-ser">
        <CloudinaryImage
          url="v1643213313/Servilla/delivery1_tebayn.jpg"
          width={220}
          height={260}
          alt="Foto5"
          />
        </div>
        <div className="seis flex bg-darkser">
          <h1>
          <CloudinaryImage
          url="v1643312465/Servilla/servilla_logo_qejs06.png"
          width={450}
          height={260}
          alt="logo"
          />
          </h1>
          <h3 className="text-center">
            Desde 1973 entregando su correspondencia
          </h3>
        </div>
      </div>
    </Layout>
  );
}

export default HomePage ;
