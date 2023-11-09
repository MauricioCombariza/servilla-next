import React from 'react'
import { Container, Grid } from '@mui/material';
import { ButtonSer, ButtonType } from '../ButtonSer';
import { MediaCard } from '../MediaCard';
import { useAuth } from '../../Auth';
import { AuthContextProps } from '../../Auth';

interface DbType {
serial: string,
no_entidad: number,
mot_esc: string,
ret_esc: string,
nombred: string,
dirdes1: string
ciudad: string
cod_men: string
dir_num: string
}

const SearchedForm = () => {
    const [serial, setSerial] = React.useState('')
    const [dirnum, setDirnum] = React.useState('')
    const [usuarios, setUsuarios] = React.useState<DbType[]>([])
    const [errorMensaje, setErrorMensaje] = React.useState<string>('');
    const auth = useAuth() as AuthContextProps
    const token = auth.token
    const user = auth.user

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    
    let pathFetch = "";
    let pathEnd = "";

    if (serial.length !== 0) {
        pathFetch = "serial";
        pathEnd = serial;
      }
      if (dirnum.length !== 0) {
        pathFetch = "dirnum";
        pathEnd = dirnum;
      }
    const preAPI = process.env.API
    const postAPI = 'event'
    const urlBase = `${preAPI}/${postAPI}`

    const API = `${urlBase}/${pathFetch}/${pathEnd}`

    
    const buscar = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
    
      if (serial.length === 0 && dirnum.length === 0) {
        setErrorMensaje('Por favor, ingrese un serial o dirnum válido');
        return; // Evita realizar la búsqueda si no hay datos válidos
      }
    
      setErrorMensaje(''); // Limpiar mensaje de error si hay datos válidos
    
      try {
        const res = await fetch(API, config);
        if (res.status === 401) {
          setErrorMensaje('El serial no ha sido encontrado');
          return
        }
    
        if (res.status === 403) {
          throw new Error('Acceso no autorizado');
        }
    
        if (res.status === 404) {
          setErrorMensaje('El serial no ha sido encontrado');
          return; // Evita continuar si el serial no se encontró
        }
    
        const data = await res.json();
        setUsuarios(data);
      } catch (error: unknown) { // Añadir ": any" para manejar el tipo 'unknown'
        // Manejo de otros errores si es necesario
        console.error('Error:', error);
      }
    };
    
  
  return (
    <Container>
        <Container maxWidth="md">
          <h2 className='text-2xl mt-2'>{user?.username} tus busquedas:</h2>
    <form
        method="post"
        className="container mt-10 lg:px-20 lg:m-20 mx-2 bg-gray-200 rounded-sm"
        onSubmit={buscar}
    >
        
        <h1 className="font-bold text-ser pt-6">BUSCAR</h1>
        <div className="py-2 px-2 mt-10">
        <div>Serial</div>
        <input
            className="w-full leading-snug text-gray-800 placeholder-blue-400 py-1 px-4 bg-green-600 rounded border border-darkser hover:bg-ser focus:outline-none focus:shadow-outline hover:text-white"
            type="text"
            name="serial"
            value={serial}
            placeholder="Serial"
            onChange={e => setSerial(e.target.value)}
        />
        </div>
        <div className="py-2 px-2">
        <div>Direccion Numerica</div>
        <input
            className="w-full leading-snug text-gray-800 placeholder-blue-400 py-1 px-4 bg-green-600 rounded border border-darkser hover:bg-ser focus:outline-none focus:shadow-outline hover:text-white"
            type="text"
            name="dirnum"
            placeholder="Dirnum"
            value={dirnum}
            onChange={(e) => setDirnum(e.target.value)}
        />
        </div>
        <div className="py-4">
        <ButtonSer type={ButtonType.Submit} name={'BUSCAR'} />
        </div>
        <div className="text-red-500">
        
        </div>
        <div className="text-red-500">
            {errorMensaje && (
              <p className="text-red-500 font-bold mt-2">
                {errorMensaje}
              </p>
            )}
          </div>
        
    </form>
    
    </Container>
    <Container sx={{mt:5, border: 3, boxShadow: 3}}>
      <Grid container spacing={2}>
        { usuarios.map(p => (
          <Grid item xs={12} sm={6} md={4} key={p.serial}>
          <MediaCard
          serial={p.serial}
          company={p.no_entidad}
          estado={p.mot_esc}
          retorno={p.ret_esc}
          nombre={p.nombred}
          direccion={p.dirdes1}
          ciudad={p.ciudad}
          codigo={p.cod_men}
          dirnum={p.dir_num}
          inicio={p.serial.length === 16? p.serial.substr(0, 8): p.serial.substr(0, 4)}
          medio={p.serial.length === 16? p.serial.substr(8, 5): p.serial.substr(4, 3)}
          final={p.serial.length === 16? p.serial.substr(10, 6): p.serial.substr(4, 6)}
          />
          </Grid>
        ))
        }
      </Grid>
    </Container>
    </Container>

  )
}

export {SearchedForm}