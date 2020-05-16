import React from 'react';
import '../ui/css/ApiAutocomplete.css';
import '../ui/css/LoadingIndicator.css';
import '../products/css/ProductManagement.css';
import '../products/css/ProductList.css';
import '../products/css/AddNewProduct.css';
import './css/Desktop.css';
import './css/TopBar.css';
import { Grid, Box } from '@material-ui/core';
import TopBar from './TopBar';

export default function Desktop(props) {
    return (
        <Grid justify="center" container >
            <TopBar />            

            <Grid className="content" container item sm={9} >
                <Box marginTop={1} width="100%" >
                    {props.children}
                </Box>
            </Grid>
        </Grid>
    )
}