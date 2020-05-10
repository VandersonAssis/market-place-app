import React from 'react';
import { useSelector } from 'react-redux';
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails } from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';

export default function AddNewProduct() {
    const seller = useSelector(state => state.seller);

    return (
        <ExpansionPanel >
            <ExpansionPanelSummary expandIcon={<ExpandMore />} aria-controls="panel1a-content" id="panel1a-header" >
                Add new product for&nbsp;<span className="selected-seller" >[{seller.name}]</span>
            </ExpansionPanelSummary>

            <ExpansionPanelDetails>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                sit amet blandit leo lobortis eget.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                sit amet blandit leo lobortis eget.
            </ExpansionPanelDetails>
        </ExpansionPanel>
    )
}