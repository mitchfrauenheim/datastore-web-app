import { Outlet, Link } from "react-router-dom";
import * as React from 'react';

import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import CameraIcon from '@mui/icons-material/Camera';
import HomeIcon from '@mui/icons-material/Home';
import ModeIcon from '@mui/icons-material/Mode'
import StickyNote2Icon from '@mui/icons-material/StickyNote2';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Camera } from "@mui/icons-material";

const navLinks = [
    {
        name: "Data Explorer Home",
        path: "/",
        icon: <HomeIcon />
    },
    {
        name: "Explore Snapshots",
        path: "/snapshotList",
        icon: <CameraIcon />
    },
    {
        name: "Explore PVs",
        path: "/pvList",
        icon: <StickyNote2Icon />
    },
    {
        name: "Explore Annotations",
        path: "/annotationList",
        icon: <ModeIcon />
    }
]

const drawerWidth = 240;

// const Layout = ({datastoreConfig}) => {
function Layout(props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div>
            <Toolbar />
            <Divider />
            <List>
                {navLinks.map(link => (
                    <ListItem key={link.name} component={Link} to={link.path} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                {link.icon}
                            </ListItemIcon>
                            <ListItemText sx={{ color: 'grey.700' }} primary={link.name} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar
                    position="fixed"
                    sx={{
                        width: { sm: `calc(100% - ${drawerWidth}px)` },
                        ml: { sm: `${drawerWidth}px` }
                    }}
                >
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{ mr: 2, display: { sm: 'none' } }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap component="div">
                            Osprey DCS
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Box
                    component="nav"
                    sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                    aria-label="navigation links"
                >
                    <Drawer
                        container={container}
                        variant="temporary"
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        ModalProps={{
                            keepMounted: true
                        }}
                        sx={{
                            display: { xs: 'block', sm: 'none' },
                            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
                        }}
                    >
                        {drawer}
                    </Drawer>
                    <Drawer
                        variant="permanent"
                        sx={{
                            display: { xs: 'none', sm: 'block' },
                            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
                        }}
                        open
                    >
                        {drawer}
                    </Drawer>
                </Box>
                <Box
                    component="main"
                    sx={{ flexGrow: 1, pt: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
                >
                    {/* <Toolbar /> */}
                    <Typography paragraph>
                        Hello World
                    </Typography>

                    <Outlet />
                </Box>
            </Box>

            {/* <nav style={{paddingBottom: "4px", borderBottom: "1px solid darkgray"}}>
                <ul>
                    <li>
                        <Link to="/">Data Explorer Home</Link>
                    </li>
                    <li>
                        <Link to="/snapshotList">Explore Snapshots</Link>
                    </li>
                    <li>
                        <Link to="/pvList">Explore PVs</Link>
                    </li>
                    <li>
                        <Link to="/annotationList">Explore Annotations</Link>
                    </li>
                </ul>
                <p><i>Datastore configuration: {props.datastoreConfig}</i></p>
            </nav>

            <Outlet /> */}
        </>
    )
};

export default Layout;