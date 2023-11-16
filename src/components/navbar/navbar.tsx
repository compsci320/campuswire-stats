import React from 'react';
import './navbar.css';
import { ListItem, ListItemButton } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

import MovingIcon from '@mui/icons-material/Moving';
import TrafficIcon from '@mui/icons-material/Traffic';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import AnalyticsIcon from '@mui/icons-material/Analytics';

interface NavbarProps {
  width: number;
  page: string;
  setPage: (newPage: string) => void;
}

function Navbar(props: NavbarProps) {
  const navigateTo = useNavigate();
  const location = useLocation();

  const pages = [
    {
      path: '/trends',
      title: 'Trends',
      icon: <MovingIcon sx={{ fontSize: 25, marginRight: 2 }} />
    },
    {
      path: '/traffic',
      title: 'Traffic',
      icon: <TrafficIcon sx={{ fontSize: 25, marginRight: 2 }} />
    },
    {
      path: '/engagement',
      title: 'Engagement',
      icon: <Diversity3Icon sx={{ fontSize: 25, marginRight: 2 }} />
    },
  ];

  return (
    <div style={{ width: props.width }} className="navbar">
      <AnalyticsIcon sx={{ fontSize: 60, marginLeft: 1, marginTop: 1, marginBottom: 3, color: 'white' }} />
      {
        pages.map(page => (
          <ListItem disablePadding={true}>
            <div className="navbar-item" style={{ backgroundColor: location.pathname === page.path ? "#002f5b" : "#004e98" }}>
                <ListItemButton 
                    sx={{
                      "&.Mui-focusVisible": { backgroundColor: "#002f5b", color: "white" },
                      "&:hover": { backgroundColor: "#003262", color: "white" },
                      borderRadius: 2 
                    }} 
                    onClick={() => navigateTo(page.path)}
                >
                { page.icon }
                { page.title }
                </ListItemButton>
            </div>
          </ListItem>
        ))
      }
    </div>
  );
}

export default Navbar;