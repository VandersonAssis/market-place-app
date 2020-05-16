import { ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary, FormControl, TextField, Grid, Box, Button } from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import useHttp from '../hooks/useHttp';

export default function AddNewProduct() {
    const { sendRequest } = useHttp();

    const selectedSeller = useSelector(state => state.selectedSeller);
    const [enteredModel, setEnteredModel] = useState('');
    const [enteredName, setEnteredName] = useState('');
    const [enteredDescription, setEnteredDescription] = useState('');
    const [enteredPrice, setEnteredPrice] = useState();
    const [enteredQuantity, setEnteredQuantity] = useState();

    const submitNewProduct = event => {
        event.preventDefault();
        
        const newProduct = { idSeller: selectedSeller.id, model: enteredModel, name: enteredName, description: enteredDescription, 
            price: enteredPrice, quantity: enteredQuantity };

        sendRequest(process.env.REACT_APP_PRODUCTS_API_URL, 'POST', JSON.stringify(newProduct))
    };

    return (
        <ExpansionPanel disabled={selectedSeller === null || selectedSeller === ''} >
            <ExpansionPanelSummary expandIcon={<ExpandMore />} aria-controls="panel1a-content" id="panel1a-header" >
                Add new product for&nbsp;<span className="selected-seller" >[{selectedSeller != null ? selectedSeller.name : null}]</span>
            </ExpansionPanelSummary>

            <ExpansionPanelDetails className="panel-details" >
                <Box width="100%" >
                    <form onSubmit={submitNewProduct} >
                        <TextField className="text-field" label="Name" autoFocus={true} value={enteredName}
                            onChange={event => { setEnteredName(event.target.value) }} />
                        <br />
                        <TextField className="text-field" label="Model" value={enteredModel}
                            onChange={event => { setEnteredModel(event.target.value) }} />
                        <br />                        
                        <TextField className="text-field" label="Price" type="number" value={enteredPrice}
                            onChange={event => { setEnteredPrice(event.target.value) }} />
                        <br />
                        <TextField className="text-field" label="Quantity" type="number" value={enteredQuantity}
                            onChange={event => { setEnteredQuantity(event.target.value) }} />
                        <br />
                        <TextField className="text-field" label="Description" multiline={true} rows="4" value={enteredDescription}
                            onChange={event => { setEnteredDescription(event.target.value) }} />
                        
                        <br /> <br />
                        <Button color="primary" type="submit" variant="contained" >
                            REGISTER
                        </Button>
                    </form>
                </Box>
            </ExpansionPanelDetails>
        </ExpansionPanel>
    )
}