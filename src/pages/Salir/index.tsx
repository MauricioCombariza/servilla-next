import { FormEvent } from "react";

import { Layout } from '../../components/Layout'
import { Button } from '@mui/material'
import { useAuth } from '../../Auth'


const Salir = () => {
    const auth = useAuth()
    
    const logout = (e: FormEvent<HTMLFormElement>) =>{
        e.preventDefault()
        auth.logout()
    }
  return (
     <Layout>
      <form onSubmit={logout}>
        <h1>Logout</h1>
        <label>¿Esta seguro de que desea salir?</label>
        <Button type='submit'>Salir</Button>
    </form>
     </Layout>
  )
}

export default Salir