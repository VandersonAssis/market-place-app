import React, { useEffect } from 'react';
import useHttp from '../hooks/useHttp';
import { useSelector } from 'react-redux';
import LoadingIndicator from '../ui/LoadingIndicator';

const ProductList = () => {
  const { loading, data, error, sendRequest, clear } = useHttp();
  const selectedSeller = useSelector(state => state.selectedSeller);

  useEffect(() => {
    if (selectedSeller === null || selectedSeller === '') return;

    sendRequest(`${process.env.REACT_APP_PRODUCTS_API_URL}/${selectedSeller.id}/seller`, 'GET');
  }, [selectedSeller]);

  const renderComponent = () => {
    if(loading)
      return <LoadingIndicator><div className="container" ><h3>Products</h3></div></LoadingIndicator>
    else
      return <div className="container" >
              <h3>Products</h3>
              <ul>
                {
                  data.length > 0 ? data.map(product => (
                    <li key={product.id} >{product.name}</li>
                  )) : []
                }
              </ul>
            </div>
  }

  return (
    renderComponent()
  )
}

export default ProductList;