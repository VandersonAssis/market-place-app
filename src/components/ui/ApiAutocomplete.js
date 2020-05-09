import React, { useState, useEffect } from 'react';
import { TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import LoadingIndicator from './LoadingIndicator';
import useHttp from '../hooks/useHttp';

const ApiAutocomplete = props => {
    const { loading, data, error, sendRequest, clear } = useHttp();

    useEffect(() => {
        sendRequest(props.url, 'GET');
    }, []);

    const dummyAutocomplete = <Autocomplete
        options={[]}
        style={{ pointerEvents: "none" }}
        renderInput={(params) => <TextField {...params} label={props.placeHolder ? props.placeHolder : 'Select a value'} />} />

    const renderComponent = () => {
        if (loading)
            return <LoadingIndicator >{dummyAutocomplete}</LoadingIndicator>
        else
            return <Autocomplete
            options={data.length > 0 ? data : []}            
            getOptionLabel={(option) => option.name}
            onChange={(event, value) => props.onSelectionCallback(value)}
            renderInput={(params) => <TextField {...params} label={props.placeHolder ? props.placeHolder : 'Select a value'} variant="outlined" />} />
    }

    return (
        renderComponent()
    );
}

export default ApiAutocomplete;