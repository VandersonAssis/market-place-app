import { ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary, FormControl, TextField, Grid, Box, Button, unstable_StrictModeFade, Popover } from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import useHttp from '../hooks/useHttp';
import useRuler from '../hooks/useRuler';
import ErrorPopAnchor from '../ui/ErrorPopAnchor';
import ErrorAlert from '../ui/ErrorAlert';

export default function AddNewProduct() {
    const { sendPromisableRequest } = useHttp();
    const { initializeRuler, validate, allFieldsValid } = useRuler();

    const selectedSeller = useSelector(state => state.selectedSeller);

    const [enteredName, setEnteredName] = useState('');
    const [enteredModel, setEnteredModel] = useState('');
    const [enteredDescription, setEnteredDescription] = useState('');
    const [enteredPrice, setEnteredPrice] = useState();
    const [enteredQuantity, setEnteredQuantity] = useState();
    const [showErrorAlert, setShowErrorAlert] = useState(false);
    const [errorAlertMessage, setErrorAlertMessage] = useState('');

    const enteredNameRef = useRef();
    const enteredModelRef = useRef();
    const enteredDescriptionRef = useRef();
    const enteredPriceRef = useRef();
    const enteredQuantityRef = useRef();

    const [inputInconsistencies, setInputInconsistencies] = useState('');

    useEffect(() => {
        initializeRuler(
            [
                {
                    fieldName: 'enteredName',
                    ref: enteredNameRef,
                    rules: [
                        { name: 'range', constraints: [3, 51] },
                        { name: 'contains', constraints: ['letter'] }
                    ]
                },
                {
                    fieldName: 'enteredModel',
                    ref: enteredModelRef,
                    rules: [
                        { name: 'range', constraints: [1, 25] },
                        { name: 'contains', constraints: ['letter'] }
                    ]
                },
                {
                    fieldName: 'enteredDescription',
                    ref: enteredDescriptionRef,
                    rules: [
                        { name: 'range', constraints: [15, 255] },
                        { name: 'contains', constraints: ['letter'] }
                    ]
                }
            ]
        )
    }, []);

    const submitNewProduct = async event => {
        event.preventDefault();

        if (!allFieldsValid()) {
            setShowErrorAlert(true);
            setErrorAlertMessage('One or more fields are invalid.');
            return;
        }

        const newProduct = {
            idSeller: selectedSeller.id, model: enteredModel, name: enteredName, description: enteredDescription,
            price: enteredPrice, quantity: enteredQuantity
        };

        let data = await sendPromisableRequest(process.env.REACT_APP_PRODUCTS_API_URL, 'POST', JSON.stringify(newProduct));
        
        if(data.statusCode === 201)
            clearFields();
        else
            setErrorAlertMessage(data.message);

    };

    const clearFields = () => {
        setEnteredName('');
        setEnteredModel('');
        setEnteredDescription('');
        setInputInconsistencies('');
        setEnteredPrice(0);
        setEnteredQuantity(0);
        setShowErrorAlert(false);
        setErrorAlertMessage('');
    };

    const handleChange = (fieldName, setField, value) => {
        setField(value);
        setInputInconsistencies(validate(fieldName, value));
    }

    return (
        <>
            <ExpansionPanel disabled={selectedSeller === null || selectedSeller === ''} >
                <ExpansionPanelSummary expandIcon={<ExpandMore />} className="add-product-accordion" aria-controls="panel1a-content" id="panel1a-header" >
                    Add a new product for&nbsp;<span className="selected-seller" >[{selectedSeller != null ? selectedSeller.name : null}]</span>
                </ExpansionPanelSummary>

                <ExpansionPanelDetails className="panel-details" >
                    <Box width="100%" >
                        <ErrorAlert show={showErrorAlert} message={errorAlertMessage} />

                        <form onSubmit={submitNewProduct} >
                            <TextField ref={enteredNameRef} className="text-field" label="Name" value={enteredName}
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
        </>
    )
}