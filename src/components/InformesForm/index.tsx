import { Container } from "@mui/system";
import React, { useState } from "react";
import { ButtonSer, ButtonType } from "../ButtonSer";
import { usePostInforme, InformeType } from "../../Hooks/usePostInforme";
import { useAuth, AuthContextProps } from "../../Auth";


interface FormData {
  auth: AuthContextProps;
  mensajero: string;
  API: string;
}

function InformesForm() {
  const auth = useAuth();
  const form = React.useRef(null);
  const [downloadLink, setDownloadLink] = useState<string | null>(null);
  const [isDownload, setIsDownload] = useState<boolean>(false)

  const OnFormSubmit = async (dataForm: InformeType) => {
    
    setIsDownload(true)
    const response = await usePostInforme(dataForm);
    console.log('Response:', response)
    if (response && typeof response === "string") {
      setDownloadLink(response);
    }
    console.log(downloadLink)
    if (downloadLink) {
      const response = await fetch(`/static${downloadLink}`);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "/mnt/c/Users/mcomb/OneDrive/Escritorio/Pendientes/pendientes.csv";
      link.click();
      URL.revokeObjectURL(url); // Liberar el objeto URL después de la descarga
      setIsDownload(true)
    }
  };

  const informe = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (form.current) {
      const formData = new FormData(form.current);
      const data: FormData = {
        auth: auth,
        mensajero: formData.get("mensajero")?.toString() || "",
        API: "http://127.0.0.1:8000/event/pendientes/mensajero",
      };
      OnFormSubmit(data);
    }
  };

  
  return (
    <Container maxWidth="md">
      <form
        className="container lg:px-20 lg:m-20 mx-2 pt-10 bg-gray-200"
        method="post"
        onSubmit={informe}
        ref={form}
      >
        <h1 className="font-bold text-ser">INFORME</h1>
        { auth.isMensajero?(
          <div className="py-2 px-2">
          <div>Mensajero</div>
          <input
            name="mensajero"
            className="w-full leading-snug text-gray-800 placeholder-blue-400 py-1 px-4 bg-green-600 rounded border border-darkser hover:bg-ser focus:outline-none focus:shadow-outline hover:text-white"
            type="mensajero"
            placeholder="Mensajero"
          />
        </div>
        )
        : ('')
          
        }

        <div className="py-4">
          <ButtonSer type={ButtonType.Submit} name={"EJECUTAR"} />
        </div>
        
      </form>
      {
        isDownload? (
          <div className="container bg-green-200 p-3">
            <h2>Descarga exitosa !!</h2>
            <h5>El producto ha sido descargado en la siguiente ruta: </h5>
            <h5>/mnt/c/Users/mcomb/OneDrive/Escritorio/Pendientes/pendientes.csv</h5>
          </div>
        ):
        auth.isMensajero?
        (
          <p>Ingresar el código del mensajero del que desee extraer sus pendientes </p>
        )
        :
        ('')
      }
    </Container>
  );
}

export { InformesForm };
