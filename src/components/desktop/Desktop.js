import React from 'react';
import '../ui/css/ApiAutocomplete.css';
import '../ui/css/LoadingIndicator.css';
import '../products/css/ProductManagement.css';
import '../products/css/ProductList.css';
import './css/Desktop.css';
import { Grid, Box } from '@material-ui/core';
import { Link } from 'react-router-dom';

export default function Desktop(props) {
    return (
        <Grid justify="center" container >
            <Grid className="top-menu-container" container >
                <Grid item sm={9} >
                    <span className="top-menu-app-name" >Market Place</span>
                    <Link className="top-menu-item" to="/products">Products</Link>
                    <Link className="top-menu-item" to="/purchase">Buy</Link>
                </Grid>
            </Grid>

            <Grid className="top-menu-bottom-container" container />

            <Grid className="content" container item sm={9} >
                <Box marginTop={1} width="100%" >
                    {props.children}
                </Box>
            </Grid>
        </Grid>
    )
}