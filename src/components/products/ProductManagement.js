import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import productManagementActions from '../../redux/constants/productManagement.constants';
import ApiAutocomplete from '../ui/ApiAutocomplete'
import './css/ProductManagement.css';
import { Box, Paper, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails } from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import AddNewProduct from './AddNewProduct';

export default function ProductManagement() {
    const dispatch = useDispatch();

    const sellerSelected = (selectedSeller) => {
        dispatch({ type: productManagementActions.SELLER_SELECTED, selectedSeller: selectedSeller });
    };

    return (
        <>
            <Paper >
                <ApiAutocomplete placeHolder='Sellers' onSelectionCallback={sellerSelected} url={process.env.REACT_APP_SELLERS_API_URL} />
            </Paper>

            <Box marginTop={1} >
                <Paper >
                    <AddNewProduct />
                </Paper>
            </Box>

            <Box marginTop={1} >
                <Paper >
                    <h2>List of products here</h2>

                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                    sit amet blandit leo lobortis eget.
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                    sit amet blandit leo lobortis eget.
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                    sit amet blandit leo lobortis eget.
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                    sit amet blandit leo lobortis eget.
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                    sit amet blandit leo lobortis eget.
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                    sit amet blandit leo lobortis eget.
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                    sit amet blandit leo lobortis eget.
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                    sit amet blandit leo lobortis eget.
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                    sit amet blandit leo lobortis eget.
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                    sit amet blandit leo lobortis eget.
                </Paper>
            </Box>
        </>
    )
}