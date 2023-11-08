import React, { useState } from 'react';
import { ChartBar } from "../../components/GráficaBarras";
import { ButtonSer, ButtonType } from '../../components/ButtonSer';

interface VentasMesData {
  "mes": string,
  "total": number,
  "ventas": number
}

const Dashboard: React.FC = () => {
  const [ventasMes, setVentasMes] = useState<VentasMesData[]>([]);
  const [errorMensaje, setErrorMensaje] = useState<string>('');
  const preAPI = process.env.API
  const postAPI = 'event/ventasMes'
  const API = `${preAPI}/${postAPI}`
  const [charData, setCharData] = useState<any>(null)
//   const config = {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   };

  const graficoVentas = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  
    try {
      const res = await fetch(
        API,
        // config
        );
  
      if (res.status === 403) {
        throw new Error('Acceso no autorizado');
      }
  
      if (res.status === 404) {
        setErrorMensaje('El serial no ha sido encontrado');
        return; // Evita continuar si el serial no se encontró
      }
  
      const data = await res.json();
      setVentasMes(data.ventas_mes);
      console.log(data.ventas_mes[0])
      if (data.ventas_mes.length > 0) {
      const charData = {
        labels: data.ventas_mes.map((venta: VentasMesData) => venta.mes),
        // labels: [ventasMes[0].mes, ventasMes[1].mes, ventasMes[2].mes],
        datasets: [
          {
            data: data.ventas_mes.map((venta: VentasMesData) => venta.ventas),
            // data: [ventasMes[0].ventas, ventasMes[1].ventas, ventasMes[2].ventas],
            label: "Valores en pesos",
            backgroundColor: data.ventas_mes.map(() => "blue"),
            // backgroundColor: ["red", "green", "blue"], // Colores de fondo para las barras
          },
        ],
      };
      setCharData(charData)
    }
    
    } catch (error: unknown) { // Añadir ": any" para manejar el tipo 'unknown'
      // Manejo de otros errores si es necesario
      console.error('Error:', error);
    }
  };
  
    
  return (
    <div className="bg-gray-200 min-h-screen p-4 flex flex-col justify-center items-center">
      {ventasMes.length > 0 && (
          <>
            {charData ? (
              <ChartBar charData={charData} />
            ) : (
              <p>Cargando datos...</p>
            )}

          </>
        )}
      <div className="bg-white shadow-lg rounded-lg p-6 w-full sm:w-96">
        <ButtonSer onClick={graficoVentas} name='Informes' type={ButtonType.Button} fullWidth={true} />
        
      </div>
      <div className="text-red-500">
            {errorMensaje && (
              <p className="text-red-500 font-bold mt-2">
                {errorMensaje}
              </p>
            )}
          </div>
    </div>
  );
}

export default Dashboard ;
