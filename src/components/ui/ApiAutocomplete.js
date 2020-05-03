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

    const renderComponent = () => {
        if (loading)
            return <LoadingIndicator />
        else
            return <Autocomplete
                id="combo-box-demo"
                options={data.length > 0 ? data : []}
                getOptionLabel={(option) => option.name}
                style={{ width: 300 }}
                onChange={(event, value) => props.onSelectionCallback(value)}
                renderInput={(params) => <TextField {...params} label={props.placeHolder ? props.placeHolder : 'Select a value'} />}
            />
    }

    return (
        renderComponent()
    );
}

export default ApiAutocomplete;