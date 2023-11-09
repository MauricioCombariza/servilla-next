// import '@/styles/globals.css'
import '../styles/globals.css'
import Head from 'next/head';
import { AuthProvider } from '@/src/Auth'
import type { AppProps } from 'next/app'
import { NavBar } from '@/src/components/NavBar/NavBarTailwind'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Head>
        <link rel="icon" type="image/svg+xml" href="https://res.cloudinary.com/combariza/image/upload/v1695061362/Servilla/servilla_favicon.png" />
        <title>Servilla S.A.S - Solución logística</title>
        <meta name="description" content="Empresa dedicada al envio de paquetes y documentos, en Colombia, desde 1974" />
        <meta name="keywords" content="paqueteria, envíos, logística, mensajeria, distribución" />
      </Head>
      <NavBar />
      <Component {...pageProps} />
    </AuthProvider>
  )
}
