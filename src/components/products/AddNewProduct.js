import { ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary, FormControl, TextField, Grid, Box, Button, unstable_StrictModeFade } from '@material-ui/core';
import { ExpandMore, SmsOutlined } from '@material-ui/icons';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import useHttp from '../hooks/useHttp';
import useRuler from '../hooks/useRuler';

export default function AddNewProduct() {
    const { sendRequest } = useHttp();

    const selectedSeller = useSelector(state => state.selectedSeller);
    const [enteredModel, setEnteredModel] = useState('');
    const [enteredName, setEnteredName] = useState('');
    const [enteredDescription, setEnteredDescription] = useState('');
    const [enteredPrice, setEnteredPrice] = useState();
    const [enteredQuantity, setEnteredQuantity] = useState();
    const [rules, setRules] = useState([]);

    const addNewRule = (newRule) => setRules(rules => [...rules, newRule]);

    const { initializeRuler, validate } = useRuler();

    useEffect(() => {
        initializeRuler(addNewRule,
            [
                {
                    fieldName: 'enteredName',
                    rules: [
                        { name: 'range', constraints: [3, 51] },
                        { name: 'contains', constraints: ['letter'] }
                    ]
                },
                {
                    fieldName: 'enteredModel',
                    rules: [
                        { name: 'range', constraints: [1, 25] },
                        { name: 'contains', constraints: ['letter'] }
                    ]
                },
                {
                    fieldName: 'enteredDescription',
                    rules: [
                        { name: 'range', constraints: [15, 255] },
                        { name: 'contains', constraints: ['letter'] }
                    ]
                }                
            ]
        )
    }, []);

    const submitNewProduct = event => {
        event.preventDefault();

        const newProduct = {
            idSeller: selectedSeller.id, model: enteredModel, name: enteredName, description: enteredDescription,
            price: enteredPrice, quantity: enteredQuantity
        };

        sendRequest(process.env.REACT_APP_PRODUCTS_API_URL, 'POST', JSON.stringify(newProduct));
        clearFields();
    };

    const clearFields = () => {
        setEnteredName('');
        setEnteredModel('');
        setEnteredDescription('');
        setEnteredPrice(0);
        setEnteredQuantity(0);
    };

    const handleChange = (fieldName, setField, value) => {
        setField(value);
        let test = validate(rules, fieldName, value);
        console.log(`Validate in newProduct ${test}`);
        
    }

    return (
        <ExpansionPanel disabled={selectedSeller === null || selectedSeller === ''} >
            <ExpansionPanelSummary expandIcon={<ExpandMore />} aria-controls="panel1a-content" id="panel1a-header" >
                Add new product for&nbsp;<span className="selected-seller" >[{selectedSeller != null ? selectedSeller.name : null}]</span>
            </ExpansionPanelSummary>

            <ExpansionPanelDetails className="panel-details" >
                <Box width="100%" >
                    <form onSubmit={submitNewProduct} >
                        <TextField className="text-field" label="Name" autoFocus={true} value={enteredName}
                            onChange={event => { handleChange('enteredName', setEnteredName, event.target.value) }} />
                        <br />
                        <TextField className="text-field" label="Model" value={enteredModel}
                            onChange={event => { handleChange('enteredModel', setEnteredModel, event.target.value) }} />
                        <br />
                        <TextField className="text-field" label="Price" type="number" value={enteredPrice}
                            onChange={event => { setEnteredPrice(event.target.value) }} />
                        <br />
                        <TextField className="text-field" label="Quantity" type="number" value={enteredQuantity}
                            onChange={event => { setEnteredQuantity(event.target.value) }} />
                        <br />
                        <TextField className="text-field" label="Description" multiline={true} rows="4" value={enteredDescription}
                            onChange={event => { handleChange('enteredDescription', setEnteredDescription, event.target.value) }} />

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