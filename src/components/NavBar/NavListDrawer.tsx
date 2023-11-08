import { Collapse, Divider, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { Box } from '@mui/system'
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React from 'react'
import { DetailList } from './DetailList';
import { ServiceList } from './ServiceList';
import { verticalNavItems } from './NavBarList';
import Link from 'next/link';

const NavListDrawer = () => {
  const [open, setOpen] = React.useState(false);
  const [openServ, setOpenServ] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleClickServ = () => {
    setOpenServ(!openServ);
  };

  return (
    <Box sx={{ width: 250 }}>
      <nav>
        <List>
          {verticalNavItems.map((i) => (
            <Link href={i.link} key={i.id}>
              <ListItemButton
                  onClick={i.nested ? handleClick : i.nestedServ ? handleClickServ : undefined}
                >
                  <ListItemIcon>{i.icon}</ListItemIcon>
                  <ListItemText primary={i.title} />
                  {i.nested ? (open ? <ExpandLessIcon /> : <ExpandMoreIcon />) : ''}
                  {i.nestedServ ? (openServ ? <ExpandLessIcon /> : <ExpandMoreIcon />) : ''}
                </ListItemButton>
            </Link>
          ))}
          <Collapse in={open} timeout="auto" unmountOnExit>
            <DetailList />
          </Collapse>
          <Collapse in={openServ} timeout="auto" unmountOnExit>
            <ServiceList />
          </Collapse>
        </List>
      </nav>
      <Divider />
    </Box>
  )
}

export {NavListDrawer};
