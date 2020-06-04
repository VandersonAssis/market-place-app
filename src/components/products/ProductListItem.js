import { Box, Card, ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary, Grid, IconButton } from '@material-ui/core';
import { Edit, ExpandMore } from '@material-ui/icons';
import { MdModeEdit, MdDeleteForever } from "react-icons/md";
import React from 'react';

const buttonStyle = {
  width: '100%',
  borderStyle: 'solid',
  borderWidth: 1,
  borderColor: 'black',
  borderRadius: 0,
  padding: 0,
  paddingTop: 7,
  paddingBottom: 7,
  marginLeft: 7,  
  width: '91%'
}

const ProductListItem = (props) => {
  return (
    <Card className="product-card" >
      <Grid container >
        <Grid item sm={10} >
          <span className="product-name" >{props.product.name} </span><br />
          <img className="product-image" src="https://videohive.img.customer.envatousercontent.com/files/2f2241b7-4005-4c05-befc-e6426b923496/inline_image_preview.jpg?auto=compress%2Cformat&fit=crop&crop=top&max-h=8000&max-w=590&s=b3b3d94d508d2b5772005d431f3c79d0" /><br />
        </Grid>

        <Grid item sm={2} >
          <IconButton style={{...buttonStyle, marginTop: 19}} >
            <MdModeEdit />
          </IconButton>
          <br />
          <IconButton style={{...buttonStyle, borderTopWidth: 0}} >
            <MdDeleteForever />
          </IconButton>
        </Grid>
      </Grid>
      <Grid container style={{ padding: 7 }} >
        <Grid item sm={4} >
          <span title="Model" >| M. {props.product.model}</span>
        </Grid>

        <Grid item sm={4} >
          <span title="Price" >| P. {props.product.price}</span>
        </Grid>

        <Grid item sm={3} >
          <span title="Quantity" >| Q. {props.product.quantity}</span>
        </Grid>
      </Grid>
      <ExpansionPanel >
        <ExpansionPanelSummary expandIcon={<ExpandMore />} className="product-list-item-accordion" aria-controls="panel1a-content" id="panel1a-header" >
          Description:
        </ExpansionPanelSummary>

        <ExpansionPanelDetails className="panel-details" >
          
            {props.product.description}
          
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </Card>
  );
}

export default ProductListItem;