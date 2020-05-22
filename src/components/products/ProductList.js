import { GridList, GridListTile } from '@material-ui/core';
import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import useHttp from '../hooks/useHttp';
import LoadingIndicator from '../ui/LoadingIndicator';
import ProductListItem from './ProductListItem';

const ProductList = () => {
  const { loading, data, error, sendRequest, clear } = useHttp();
  const selectedSeller = useSelector(state => state.selectedSeller);
  const initialRender = useRef(true);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }

    if (selectedSeller === null || selectedSeller === '') return;

    sendRequest(`${process.env.REACT_APP_PRODUCTS_API_URL}/${selectedSeller.id}/seller`, 'GET');
  }, [selectedSeller]);

  useEffect(() => {
    return clear();
  }, [])

  const renderComponent = () => {
    if (loading)
      return <LoadingIndicator><div className="container" ><span className="products-label" >Products</span></div></LoadingIndicator>
    else
      return <div className="container" >
        {data.result.length > 0 ? <div className="products-label" >Products</div> : null} <br />

        <GridList cellHeight={250} className="grid-list" cols={3} >
          {
            data.result.length > 0 ? data.result.map(product => (
              <GridListTile key={product.id} cols={product.cols || 1} >
                <ProductListItem product={product} />
              </GridListTile>
            )) : []
          }
        </GridList>
      </div>
  }

  return (
    renderComponent()
  )
}

export default ProductList;