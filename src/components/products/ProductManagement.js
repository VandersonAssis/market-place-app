import { Box, Paper } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import productManagementActions from '../../redux/constants/productManagement.constants';
import ApiAutocomplete from '../ui/ApiAutocomplete';
import AddNewProduct from './AddNewProduct';
import ProductList from './ProductList';

export default function ProductManagement() {
    const dispatch = useDispatch();

    const sellerSelected = (selectedSeller) => {
        dispatch({ type: productManagementActions.SELLER_SELECTED, selectedSeller: selectedSeller });
    };

    const clear = () => {
        dispatch({ type: productManagementActions.SELLER_UNSELECTED });
    }

    useEffect(() => {
        return clear();
    }, []);

    return (
        <>
            <Paper >
                <ApiAutocomplete placeHolder='Select a seller' onSelectionCallback={sellerSelected} url={process.env.REACT_APP_SELLERS_API_URL} />
            </Paper>

            <Box marginTop={1} >
                <Paper >
                    <AddNewProduct />
                </Paper>
            </Box>

            <Box marginTop={1} width={1} >
                <ProductList />
            </Box>
        </>
    )
}