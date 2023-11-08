import { Layout } from "../../components/Layout"

const NotFound = () => {
  return (
    <Layout>
      <div className="bg-gradient-to-r from-green-400 to-green-600 min-h-screen flex justify-center items-center">
      <div className="bg-white bg-opacity-80 p-6 rounded-lg shadow-lg text-center">
        <h1 className="text-6xl font-bold text-green-800 mb-4">404</h1>
        <p className="text-2xl text-gray-800">Su página no ha sido encontrada</p>
      </div>
    </div>
    </Layout>
  )
}

export default NotFound