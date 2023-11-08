import React from 'react';

const Distribucion = () => {
  return (
    <div className="h-screen bg-darkser flex flex-col items-center justify-center">
      <div className="w-full bg-ser">
        <div className="block md:hidden">
          <img
            src="https://res.cloudinary.com/combariza/image/upload/v1672676866/Servilla/emprendimiento1_waa228.jpg"
            alt="foto1"
            className="w-full h-auto"
          />
        </div>
        <div className="hidden md:flex justify-between">
          <div className="w-1/2">
            <img
              src="https://res.cloudinary.com/combariza/image/upload/v1672676866/Servilla/emprendimiento1_waa228.jpg"
              alt="foto1"
              className="w-full h-auto"
            />
          </div>
          <div className="w-1/2">
            <img
              src="https://res.cloudinary.com/combariza/image/upload/v1672676873/Servilla/emprendimiento_ybgehx.jpg"
              alt="foto5"
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
      <div className="w-full bg-darkser text-center">
        <h1 className="text-3xl text-lightser shadow-xl my-4">
          ¿Desea crecer rápidamente su negocio en Bogotá o Santander?
        </h1>
        <p className="text-xl my-4 text-white">
          Atienda rápidamente a sus clientes, de forma segura y ágil.
        </p>
        <h3 className="text-lg my-4 text-white">
          Pregúntenos por el servicio de almacenamiento y entrega de sus paquetes pequeños
        </h3>
      </div>
    </div>
  );
};

export default Distribucion;
