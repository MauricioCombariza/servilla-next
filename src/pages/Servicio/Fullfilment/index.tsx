import { Layout } from "../../../components/Layout";

function Fullfilment() {
  const deliveryImage = 'https://res.cloudinary.com/combariza/image/upload/v1675258218/Servilla/mision_mf19dw.jpg';

  return (
    <Layout>
      <div className="container mx-auto px-4">
        <header className="bg-gray-800 text-white p-4">
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold">Almacenamiento y logística</h1>
          <p>¡Entregamos tus paquetes de manera rápida y segura!</p>
        </header>
        <section className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 flex items-center">
            <img src={deliveryImage} alt="Distribución de Paquetes" className="w-full h-auto" />
          </div>
          <div className="w-full md:w-1/2 md:pl-4">
            <section className="bg-white shadow-md p-4 mt-4">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold">Servicios de Transporte</h2>
              <ul className="pl-4">
                <li>Envíos locales y nacionales</li>
                <li>Entrega express en 24 horas</li>
                <li>Rastreo de paquetes en tiempo real</li>
                <li>Embalaje y etiquetado profesional</li>
                <li>Entrega programada</li>
              </ul>
            </section>

            <section className="bg-white shadow-md p-4 mt-4">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold">¿Por qué elegirnos?</h2>
              <ul className="pl-4">
                <li>Rápido y confiable: Nuestro equipo de mensajeros está capacitado para realizar entregas rápidas y seguras.</li>
                <li>Seguimiento en tiempo real: Ofrecemos un sistema de rastreo en línea para que puedas seguir el progreso de tu paquete en tiempo real.</li>
                <li>Servicio al cliente excepcional: Nuestro equipo de atención al cliente está disponible las 24 horas para responder a tus consultas y brindarte asistencia.</li>
                <li>Flexibilidad de entrega: Ofrecemos opciones de entrega programada para adaptarnos a tus necesidades.</li>
                <li>Embalaje profesional: Nuestro equipo de embalaje se asegura de que tus paquetes estén protegidos de manera adecuada durante el transporte.</li>
              </ul>
            </section>

            <section className="bg-white shadow-md p-4 mt-4">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold">Distribución de Fulfillment</h2>
              <p>Ofrecemos servicios de distribución de fulfillment para ayudarte a almacenar, empacar y enviar tus productos a tus clientes de manera eficiente.</p>
              <p>Beneficios de nuestra distribución de fulfillment:</p>
              <ul className="pl-4">
                <li>Almacenamiento seguro y organizado de productos</li>
                <li>Empaque personalizado y etiquetado</li>
                <li>Envío rápido y confiable</li>
                <li>Gestión de inventario y control de stock</li>
                <li>Sistema de seguimiento de pedidos en línea</li>
              </ul>
            </section>
          </div>
        </section>

        <footer className="flex justify-around bg-gray-800 text-white p-4 mt-4 text-center">
          <p>Telfono: 5476000</p>
          <p>Email: mauricio.combariza@gruposervilla.com</p>
        </footer>
      </div>
    </Layout>
  );
}

export default Fullfilment ;
