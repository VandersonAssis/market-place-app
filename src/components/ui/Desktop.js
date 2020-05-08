import React from 'react';
import './css/ApiAutocomplete.css';
import './css/LoadingIndicator.css';
import './css/Desktop.css';
import { Grid, Paper } from '@material-ui/core';

export default function Desktop(props) {
    return (
        <Grid container >
            <Grid container className="top-menu-container" >
                <Grid item sm={2} >
                    <span className="top-menu-app-name" >Market Place</span>            
                    <span className="top-menu-item" >Products</span>
                    <span className="top-menu-item" >Buy</span>
                </Grid>
            </Grid>
            <Grid container className="top-menu-bottom-container" ></Grid>

            <Grid container >
                asdf
            </Grid>
        </Grid>

        // <div>
        //     {props.children}
        // </div>
    )
}