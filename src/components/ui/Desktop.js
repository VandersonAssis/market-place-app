import React from 'react';
import './css/ApiAutocomplete.css';
import './css/LoadingIndicator.css';
import './css/Desktop.css';
import { Grid, Box } from '@material-ui/core';

export default function Desktop(props) {
    return (
        <Grid justify="center" container >
            <Grid className="top-menu-container" container >
                <Grid item sm={2} >
                    <span className="top-menu-app-name" >Market Place</span>
                    <span className="top-menu-item" >Products</span>
                    <span className="top-menu-item" >Buy</span>
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