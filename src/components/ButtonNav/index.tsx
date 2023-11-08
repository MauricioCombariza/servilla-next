import React from "react"

interface Props {
    children: React.ReactNode;
    onClick?: () => void;
  }

  

const ButtonNav: React.FC<Props> = ({onClick, children}) => {
  return (
    <button
    className='flex justify-between invisible lg:visible hover:bg-green-300 p-4 rounded-lg hover:underline hover:decoration-4 hover:decoration-solid hover:text-black'
    onClick={onClick}
    >
        {children}
    </button>
  )
}

export  {ButtonNav}