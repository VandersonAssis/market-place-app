import React from 'react';
import { Card, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Box } from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';

const ProductListItem = (props) => {
  return (
    <Card className="product-card" >
      <span className="product-name" >Name: {props.product.name} Model: {props.product.model}</span><br />
      <img className="product-image" src="https://videohive.img.customer.envatousercontent.com/files/2f2241b7-4005-4c05-befc-e6426b923496/inline_image_preview.jpg?auto=compress%2Cformat&fit=crop&crop=top&max-h=8000&max-w=590&s=b3b3d94d508d2b5772005d431f3c79d0" /><br />

      <ExpansionPanel >
        <ExpansionPanelSummary expandIcon={<ExpandMore />} className="product-list-item-accordion" aria-controls="panel1a-content" id="panel1a-header" >
          Description:
        </ExpansionPanelSummary>

        <ExpansionPanelDetails className="panel-details" >
          <Box width="100%" >
            {props.product.description}            
          </Box>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </Card>
  );
}

export default ProductListItem;