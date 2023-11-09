import { Layout } from "../../components/Layout";
import { InformesForm } from "../../components/InformesForm";
import { useAuth } from "../../Auth";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Informes: React.FC = () => {
  const auth = useAuth();
  const perfil = auth.user.perfil;
  const router = useRouter();

  useEffect(() => {
    if (perfil && perfil <= 1) {
      // Redirigir al usuario a la página de inicio de sesión.
      router.push("/login");
    }
  }, [perfil]);

  return (
    <Layout>
      <InformesForm />
    </Layout>
  );
};

export default Informes;
