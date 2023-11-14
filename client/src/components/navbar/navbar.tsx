import React from 'react';
import './navbar.css';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const navigateTo = useNavigate();

  return (
    <>
      <Button size="large" onClick={() => navigateTo('/trends')}>Trends</Button>
      <Button size="large" onClick={() => navigateTo('/traffic')}>Traffic</Button>
      <Button size="large" onClick={() => navigateTo('/engagement')}>Engagement</Button>
    </>
  );
}

export default Navbar;