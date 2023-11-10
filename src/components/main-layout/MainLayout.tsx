import React from 'react';
import './MainLayout.css';
import { Drawer, IconButton } from '@mui/material';
import { Menu } from '@mui/icons-material';
import { Outlet } from 'react-router-dom';
import Navbar from '../navbar/navbar';

function MainLayout() {
    const [state, setState] = React.useState({ open: false });
    const ANCHOR = 'left';

    const toggleDrawer =
        (isOpen: boolean) =>
        (event: React.KeyboardEvent | React.MouseEvent) => {
            if (event.type === 'keydown' && ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')) {
                return;
            }
    
            setState({ ...state, open: isOpen });
        };

    return (
        <div>
            <Drawer
                anchor={ANCHOR}
                open={state.open}
                onClose={toggleDrawer(false)}
            >
                <Navbar />
            </Drawer>
            <Outlet />
            <IconButton style={{position: 'absolute', left: 0, bottom: 0}} onClick={toggleDrawer(true)} size="large">
                <Menu fontSize="large"/>
            </IconButton>
        </div>
    );
}

export default MainLayout;
