import React from "react"

interface Props {
    children: React.ReactNode;
  }
  

const Layout: React.FC<Props> = ({children}) => {
  return (
    <div className='flex flex-col mt-24 lg:mt-20'>
        {children}
    </div>
  )
}

export  {Layout}