import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { Box } from '@mui/system'
import { serviceItems } from './NavBarList'
import Link from 'next/link';

const ServiceList = () => {
  return (
    <Box maxWidth={250}>
      <nav>
        <List>
          {serviceItems.map((i) => (
            <Link href={i.link} key={i.id}>
               <ListItem sx={{ backgroundColor: "#1E5128" }} key={i.id}>
                  <ListItemButton>
                    <ListItemIcon>{i.icon}</ListItemIcon>
                    <ListItemText primary={i.title} sx={{ color: 'white' }} />
                  </ListItemButton>
                </ListItem>
            </Link>
          ))}
        </List>
      </nav>
    </Box>
  )
}

export {ServiceList};
