import React from 'react';

const ProductListItem = (props) => {
  return (
    <>
      <span>Name: {props.product.name} Model: {props.product.model}</span>
      <br />
      <img src="https://videohive.img.customer.envatousercontent.com/files/2f2241b7-4005-4c05-befc-e6426b923496/inline_image_preview.jpg?auto=compress%2Cformat&fit=crop&crop=top&max-h=8000&max-w=590&s=b3b3d94d508d2b5772005d431f3c79d0" />
    </>
  );
}

export default ProductListItem;