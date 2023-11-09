export enum ButtonType {
  Button = 'button',
  Submit = 'submit',
  Reset = 'reset',
}

interface Props {
    // children: React.ReactNode;
    name: string
    // type: 'button' | 'submit' | 'reset';
    type: ButtonType;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
    fullWidth?: boolean;
  }

  
const ButtonSer: React.FC<Props> = ({ onClick, type, name, fullWidth }) => {
  const buttonStyle: React.CSSProperties = {
    width: fullWidth ? '100%' : '50%', // Configura el ancho del botón
    fontWeight: 'bold',
  };
  return (
    <button
    style={buttonStyle}
    className="rounded shadow-lg hover:shadow-none hover:bg-ser hover:text-white pdy-2 px-4 py-3 block mx-auto bg-green-100 text-ser border border-darkser"
    onClick={onClick}
    type={type}
  >
    {name}
  </button>
  )
}

export {ButtonSer}