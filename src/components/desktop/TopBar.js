import React from 'react';
import { Grid, Box } from '@material-ui/core';
import { Link } from 'react-router-dom';

const TopBar = () => {
  return (
    <>
      <Grid className="top-menu-container" container >
        <Grid item sm={10} >          
          <span className="top-menu-app-name" >EMarket Place</span>
          <Link className="top-menu-item" to="/products">Products</Link>
          <Link className="top-menu-item" to="/purchase">Buy</Link>
        </Grid>

        <Grid item sm={2} >
          <span className="logged-in-user" >Vanderson (Admin View)</span>
        </Grid>
      </Grid>

      <Grid className="top-menu-bottom-container" container />
    </>
  )
}

export default TopBar;