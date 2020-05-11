import React from 'react';

const LoadingIndicator = props => (
  <div className="ring-container" >
    <div className="lds-ring">
      <div />
    </div>
    
    <div className="component" >
      {props.children}
    </div>
  </div>
);

export default LoadingIndicator;