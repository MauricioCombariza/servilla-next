import { Layout } from "../../components/Layout";
import { useState } from 'react';
import Container from '@mui/material/Container';
import axios from 'axios';
import { useAuth } from '../../Auth';
import { LoadingSpinner } from "../../components/LoadingSpinner";  // Ajusta la ruta a tu ubicación real del componente

function GestionDocumentos() {
  const [fechaInicial, setFechaInicial] = useState('');
  const [fechaFinal, setFechaFinal] = useState('');
  const [loading, setLoading] = useState(false); // Estado para controlar la visualización del spinner
  const auth = useAuth();

  const handleDescargarArchivo = async () => {
    try {
      setLoading(true); // Muestra el spinner mientras se realiza la descarga

      const token = auth.token;
      const baseApi = process.env.API
      // const API = 'https://servilla-server-api.onrender.com/document/documentos/gestion'
      // const API = 'http://127.0.0.1:8000/document/documentos/gestion'
      const API = `${baseApi}/document/documentos/gestion`

      const response = await axios.get(API, {
        params: {
          fecha_inicial: fechaInicial,
          fecha_final: fechaFinal,
        },
        responseType: 'blob',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'gestion.xlsx';
      a.click();

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error al descargar el archivo', error);
    } finally {
      setLoading(false); // Oculta el spinner después de la descarga
    }
  };

  return (
    <Layout>
      <Container maxWidth="md">
  <div className="mt-10 p-4 bg-gray-200 text-center">
    <h1 className="font-bold text-ser text-3xl mb-10">Descargar Archivo de Gestión</h1>
    <div className="flex flex-col items-center mb-10">
      <label htmlFor="fechaInicial" className="mb-2">Fecha Inicial(aaaa.mm.dd):</label>
      <input
        type="text"
        id="fechaInicial"
        value={fechaInicial}
        onChange={(e) => setFechaInicial(e.target.value)}
        className="w-full py-2 px-4 bg-green-600 rounded border border-darkser hover:bg-ser focus:outline-none focus:shadow-outline hover:text-white"
      />
      <label htmlFor="fechaFinal" className="mt-4 mb-2">Fecha Final(aaaa.mm.dd):</label>
      <input
        type="text"
        id="fechaFinal"
        value={fechaFinal}
        onChange={(e) => setFechaFinal(e.target.value)}
        className="w-full py-2 px-4 bg-green-600 rounded border border-darkser hover:bg-ser focus:outline-none focus:shadow-outline hover:text-white"
      />
    </div>
    <button
      onClick={handleDescargarArchivo}
      disabled={loading}
      className="bg-green-600 text-white py-2 px-4 rounded hover:bg-ser focus:outline-none focus:shadow-outline"
    >
      Descargar Archivo
    </button>
    {loading && <LoadingSpinner />} {/* Muestra el spinner si 'loading' es true */}
  </div>
</Container>

    </Layout>
  );
}

export default GestionDocumentos ;
