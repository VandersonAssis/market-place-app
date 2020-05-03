import React from 'react';
import ApiAutocomplete from '../ui/ApiAutocomplete'

export default function ProductManagement() {
    const onSelectSeller = (selectedSeller) => {
                
    };
    
    return (
        <ApiAutocomplete placeHolder='Sellers' onSelectionCallback={onSelectSeller} url={process.env.REACT_APP_SELLERS_API_URL} />
    )
}