import React, { useEffect } from 'react';
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
        disabled={true}
        renderInput={(params) => <TextField {...params} label={props.placeHolder ? props.placeHolder : 'Select a value'} variant="outlined" />} />

    const renderComponent = () => {
        if (loading)
            return <LoadingIndicator>{dummyAutocomplete}</LoadingIndicator>
        else
            return <Autocomplete
                options={data.result.length > 0 ? data.result : []}
                getOptionLabel={(option) => option.name}
                onChange={(event, value) => props.onSelectionCallback(value)}
                renderInput={(params) => <TextField {...params} label={props.placeHolder ? props.placeHolder : 'Select a value'} variant="outlined" />} />
    }

    return (
        renderComponent()
    );
}

export default ApiAutocomplete;