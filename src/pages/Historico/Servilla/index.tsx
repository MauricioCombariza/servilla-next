import { Layout } from "../../../components/Layout"
import { SearchedForm } from "../../../components/SearchedForm"
import { useAuth } from "../../../Auth"
import { useRouter } from 'next/router';

const Servilla: () => JSX.Element | null = () => {
  const auth = useAuth()
  const router = useRouter();
  const perfil = auth.user.perfil
  
  if (perfil && perfil > 2) {
    return (
      <Layout>
        <div>
          <SearchedForm />
        </div>
      </Layout>
    );
  } 
  return null;
};

// Un componente de redirección personalizado
const RedirectToLogin: () => null = () => {
  const router = useRouter();
  router.push('/Ingresar');
  return null;
};

export default () => {
  const auth = useAuth();

  return auth.user ? <Servilla /> : <RedirectToLogin />;
}

