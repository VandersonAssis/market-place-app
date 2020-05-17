import { ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary, FormControl, TextField, Grid, Box, Button, unstable_StrictModeFade, Popover } from '@material-ui/core';
import { ExpandMore, SmsOutlined } from '@material-ui/icons';
import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import useHttp from '../hooks/useHttp';
import useRuler from '../hooks/useRuler';
import ErrorPopAnchor from '../ui/ErrorPopAnchor';

export default function AddNewProduct() {
    const { sendRequest } = useHttp();

    const selectedSeller = useSelector(state => state.selectedSeller);
    
    const [enteredName, setEnteredName] = useState('');
    const [enteredModel, setEnteredModel] = useState('');    
    const [enteredDescription, setEnteredDescription] = useState('');
    const [enteredPrice, setEnteredPrice] = useState();
    const [enteredQuantity, setEnteredQuantity] = useState();

    const enteredNameRef = useRef();
    const enteredModelRef = useRef();
    const enteredDescriptionRef = useRef();
    const enteredPriceRef = useRef();
    const enteredQuantityRef = useRef();

    const [rules, setRules] = useState([]);
    const [inputInconsistencies, setInputInconsistencies] = useState('');

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
        setInputInconsistencies('');
        setEnteredPrice(0);
        setEnteredQuantity(0);
    };

    const handleChange = (fieldName, setField, value) => {
        setField(value);
        let inconsistencies = validate(rules, fieldName, value);
        setInputInconsistencies(inconsistencies);
    }

    return (
        <ExpansionPanel disabled={selectedSeller === null || selectedSeller === ''} >
            <ExpansionPanelSummary expandIcon={<ExpandMore />} aria-controls="panel1a-content" id="panel1a-header" >
                Add new product for&nbsp;<span className="selected-seller" >[{selectedSeller != null ? selectedSeller.name : null}]</span>
            </ExpansionPanelSummary>

            <ExpansionPanelDetails className="panel-details" >
                <Box width="100%" >
                    <form onSubmit={submitNewProduct} >                        
                        <TextField ref={enteredNameRef} className="text-field" label="Name" autoFocus={true} value={enteredName}
                            onChange={event => { handleChange('enteredName', setEnteredName, event.target.value) }} />
                        <ErrorPopAnchor component={enteredNameRef} inconsistencies={inputInconsistencies} />

                        <br />
                        <TextField ref={enteredModelRef} className="text-field" label="Model" value={enteredModel}
                            onChange={event => { handleChange('enteredModel', setEnteredModel, event.target.value) }} />
                        <ErrorPopAnchor component={enteredModelRef} inconsistencies={inputInconsistencies} />                            
                        
                        <br />
                        <TextField ref={enteredPriceRef} className="text-field" label="Price" type="number" value={enteredPrice}
                            onChange={event => { setEnteredPrice(event.target.value) }} />
                        <ErrorPopAnchor component={enteredPriceRef} inconsistencies={inputInconsistencies} />

                        <br />
                        <TextField ref={enteredQuantityRef} className="text-field" label="Quantity" type="number" value={enteredQuantity}
                            onChange={event => { setEnteredQuantity(event.target.value) }} />
                        <ErrorPopAnchor component={enteredQuantityRef} inconsistencies={inputInconsistencies} />

                        <br />
                        <TextField ref={enteredDescriptionRef} className="text-field" label="Description" multiline={true} rows="4" value={enteredDescription}
                            onChange={event => { handleChange('enteredDescription', setEnteredDescription, event.target.value) }} />
                        <ErrorPopAnchor component={enteredDescriptionRef} inconsistencies={inputInconsistencies} />

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