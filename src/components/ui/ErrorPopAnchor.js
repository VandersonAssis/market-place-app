import React, { useState, useEffect } from 'react';

const ErrorPopAnchor = (props) => {

  const [calculatedTop, setCalculatedTop] = useState();
  const [calculatedLeft, setCalculatedLeft] = useState();

  useEffect(() => {
    calculatePostiion(props.component.current.getBoundingClientRect());
  }, []);

  const calculatePostiion = (componentRect) => {
    setCalculatedTop(`${componentRect.top + componentRect.height}`);
    setCalculatedLeft(`${componentRect.left}`);
  };

  const calculateDisplay = () => {
    if (!props.component.current)
      return 'none';

    let fieldName = `entered${props.component.current.outerText}`;
    let test;

    if (props.inconsistencies && props.inconsistencies.length > 0)
      test = props.inconsistencies[0].split('|||')[0];

    if (props.inconsistencies && props.inconsistencies.length > 0 && props.inconsistencies[0].split('|||')[0] === fieldName) {
      return 'block';
    }
    else {
      return 'none';
    }
  };

  return (
    <div style={{
      left: calculatedLeft, top: calculatedTop, backgroundColor: "#e8e8e8", position: 'absolute', paddingTop: 7, paddingBottom: 7,
      paddingLeft: 45, paddingRight: 45, zIndex: 1000, borderRadius: 7, borderTopLeftRadius: 0, borderTopRightRadius: 0,
      display: calculateDisplay(), fontSize: '1rem', color: '#9100ff'
    }} >

      <table>
        <tbody>
          <tr>
            {props.inconsistencies ? props.inconsistencies.map((inconsistency) => {
              return (
                <td style={{ display: 'block' }} key={inconsistency.split('|||'[2])} >
                  {inconsistency.split('|||')[1]}
                </td>)
            }) : null}
          </tr>
        </tbody>
      </table>

    </div>
  )
}

export default ErrorPopAnchor;