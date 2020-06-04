import { Box, Button, ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary, TextField } from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import useHttp from '../hooks/useHttp';
import useRuler from '../hooks/useRuler';
import ErrorAlert from '../ui/ErrorAlert';
import ErrorPopAnchor from '../ui/ErrorPopAnchor';
import productManagementActions from '../../redux/constants/productManagement.constants';

export default function AddNewProduct() {
    const dispatch = useDispatch();

    const { sendPromisableRequest } = useHttp();
    const { initializeRuler, validate, allFieldsValid } = useRuler();

    const selectedSeller = useSelector(state => state.selectedSeller);

    const [enteredName, setEnteredName] = React.useState('');
    const [enteredModel, setEnteredModel] = React.useState('');
    const [enteredDescription, setEnteredDescription] = React.useState('');
    const [enteredPrice, setEnteredPrice] = React.useState();
    const [enteredQuantity, setEnteredQuantity] = React.useState();
    const [showErrorAlert, setShowErrorAlert] = React.useState(false);
    const [errorAlertMessage, setErrorAlertMessage] = React.useState('');
    const [inputInconsistencies, setInputInconsistencies] = React.useState('');

    const enteredNameRef = useRef();
    const enteredModelRef = useRef();
    const enteredDescriptionRef = useRef();
    const enteredPriceRef = useRef();
    const enteredQuantityRef = useRef();

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

    const submitForm = async event => {
        event.preventDefault();

        console.log('all fields are ' + allFieldsValid());

        if (!allFieldsValid()) {
            console.log('all fields INVALID');
                        
            displayErrorAlert('One or more fields are invalid.');
            return;
        }

        const newProduct = {
            idSeller: selectedSeller.id, model: enteredModel, name: enteredName, description: enteredDescription,
            price: enteredPrice, quantity: enteredQuantity
        };

        let data = await sendPromisableRequest(process.env.REACT_APP_PRODUCTS_API_URL, 'POST', JSON.stringify(newProduct));

        if (data.statusCode === 201) {
            clearFields();
            dispatch({ type: productManagementActions.PRODUCT_ADDED, addedProduct: data.result })
        }
        else {
            displayErrorAlert(data.message);
        }

    };

    const displayErrorAlert = (message) => {
        setErrorAlertMessage(message);
        setShowErrorAlert(true);
    }

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

                        <form onSubmit={submitForm} data-test="submit-new-product-form" >
                            <TextField type="text" ref={enteredNameRef} className="text-field" label="Name" value={enteredName}
                                onChange={event =>  { handleChange('enteredName', setEnteredName, event.target.value) } } 
                                data-test="input-entered-name" />
                            <ErrorPopAnchor component={enteredNameRef} inconsistencies={inputInconsistencies} data-test="error-pop-anchor" />

                            <br />
                            <TextField ref={enteredModelRef} className="text-field" label="Model" value={enteredModel}
                                onChange={event => { handleChange('enteredModel', setEnteredModel, event.target.value) }} 
                                data-test="input-entered-model" />
                            <ErrorPopAnchor component={enteredModelRef} inconsistencies={inputInconsistencies} data-test="error-pop-anchor" />

                            <br />
                            <TextField ref={enteredPriceRef} className="text-field" label="Price" type="number" value={enteredPrice}
                                onChange={event => { setEnteredPrice(event.target.value) }} 
                                data-test="input-entered-price" />
                            <ErrorPopAnchor component={enteredPriceRef} inconsistencies={inputInconsistencies} data-test="error-pop-anchor" />

                            <br />
                            <TextField ref={enteredQuantityRef} className="text-field" label="Quantity" type="number" value={enteredQuantity}
                                onChange={event => { setEnteredQuantity(event.target.value) }} 
                                data-test="input-entered-quantity" />
                            <ErrorPopAnchor component={enteredQuantityRef} inconsistencies={inputInconsistencies} data-test="error-pop-anchor" />

                            <br />
                            <TextField ref={enteredDescriptionRef} className="text-field" label="Description" multiline={true} rows="4" value={enteredDescription}
                                onChange={event => { handleChange('enteredDescription', setEnteredDescription, event.target.value) }} 
                                data-test="input-entered-description" />
                            <ErrorPopAnchor component={enteredDescriptionRef} inconsistencies={inputInconsistencies} data-test="error-pop-anchor" />
                            <br /> <br />
                            <Button id="submit-new-product" color="primary" type="submit" variant="contained" >
                                REGISTER
                            </Button>
                        </form>
                    </Box>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        </>
    )
}