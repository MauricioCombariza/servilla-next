// @ts-nocheck
// use client
import React from 'react';
import Link from 'next/link'
// import { NavLink } from 'react-router-dom'

import { horizontalNavItems } from './NavBarList'
import { NavListDrawer } from './NavListDrawer';
import { DetailList } from './DetailList';
import { ServiceList } from './ServiceList';
import { useAuth } from '../../Auth';

import { ButtonNav } from '../ButtonNav'
import { IconButton, Drawer, AppBar } from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';


import MenuIcon from '@mui/icons-material/Menu';





const NavBar = () => {
  const activeStyle = 'underline underline-offset-4'
  const [open, setOpen] = React.useState(false)
  const [openNav, setOpenNav] = React.useState(false);
  const [openServ, setOpenServ] = React.useState(false)
  const auth = useAuth()
    
  const handleClick = () => {
    setOpenNav(!openNav);
    console.log('handleClick')
  };
  const handleClickServ = () => {
    setOpenServ(!openServ);
    console.log('handleClickServe')
  };

return (
<>
<AppBar>
<nav className='flex justify-between static w-full bg-ser lg:py-3 top-0'>
    <Link href="/"> 
            <img
                src="https://res.cloudinary.com/combariza/image/upload/c_fill,w_200,h_50/v1643312479/Servilla/servilla_logo_white_pzdmwm.png"
                alt="logo1"
                className="absolute cursor-pointer pt-3 pl-2 lg:pt-0"
              />
        </Link>
    <ul className='flex items-center text-white gap-3'>
          {horizontalNavItems.map((item) => (
            (item.private === auth.authorized?
              <ButtonNav key={item.id} onClick={item.id === 1?handleClick:item.id===401?handleClickServ:undefined}>
                <li className={item.className}>
                  <Link
                  href={item.link}
                  className={({isActive}) => isActive? activeStyle:undefined }
                  >
                    {item.icon}
                    {item.title}
                    {item.nested? open ? <ExpandLess /> : <ExpandMore /> : ''}
                    {item.nestedServ? openServ ? <ExpandLess /> : <ExpandMore /> : ''}
                  </Link>
              </li>
              </ButtonNav>:null
            )
          ))}
          <div className='absolute right-5 lg:invisible'>
          <IconButton
            color='inherit'
            size='large'
            sx={{ flexGrow: 1, display: { xs: "block", sm: "none" } }}
            onClick={()=>setOpen(true)}
            >
                <MenuIcon />
            </IconButton>
          </div>
      </ul>
 </nav>

</AppBar>
 <Drawer
 anchor="left"
 open={open}
 onClose={() => setOpen(false)}
 >
     <NavListDrawer />
 </Drawer>
 <Drawer
    anchor="left"
    open={openNav}
    onClose={() => setOpenNav(false)}
    >
        <DetailList />
    </Drawer>
    <Drawer
    anchor="left"
    open={openServ}
    onClose={() => setOpenServ(false)}
    >
        <ServiceList />
    </Drawer>
</>
)
}
export {NavBar}