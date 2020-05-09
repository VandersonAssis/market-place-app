import React from 'react';
import ApiAutocomplete from '../ui/ApiAutocomplete'
import './css/ProductManagement.css';
import { Box, Paper } from '@material-ui/core';

export default function ProductManagement() {
    const onSelectSeller = (selectedSeller) => {
        //This is working
    };

    return (
        <>
            <Paper >
                <ApiAutocomplete placeHolder='Sellers' onSelectionCallback={onSelectSeller}
                    url={process.env.REACT_APP_SELLERS_API_URL} />
            </Paper>
        </>
    )
}