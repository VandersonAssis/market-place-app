import { GridList, GridListTile, Box } from '@material-ui/core';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import useHttp from '../hooks/useHttp';
import LoadingIndicator from '../ui/LoadingIndicator';
import ProductListItem from './ProductListItem';

const ProductList = () => {
  const { loading, data, error, sendRequest, clear } = useHttp();
  const { selectedSeller, addedProduct } = useSelector(state => state);
  const [productList, setProductList] = useState({ result: [] });
  const initialRender = useRef(true);

  useEffect(() => {
    loadProductsList();
  }, [selectedSeller]);

  useEffect(() => {
    if (!addedProduct) return;

    const newList = JSON.parse(JSON.stringify(productList));

    if (!Array.isArray(newList.result))
      newList.result = new Array();

    newList.result.push(addedProduct);
    setProductList(newList);
  }, [addedProduct]);

  useEffect(() => {
    setProductList(data);
  }, [data])

  const loadProductsList = () => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }

    if (selectedSeller === null || selectedSeller === '') {
      setProductList([]);
      return;
    }

    sendRequest(`${process.env.REACT_APP_PRODUCTS_API_URL}/${selectedSeller.id}/seller`, 'GET');
  };

  useEffect(() => {
    return clear();
  }, [])

  const renderComponent = () => {
    if (loading)
      return <LoadingIndicator><div className="container" ><span className="products-label" >Products</span></div></LoadingIndicator>
    else
      return <div className="container" >
        <br />
        {productList.result && productList.result.length > 0 ? <div className="products-label" >Products</div> : null}
        <GridList className="grid-list" cols={3} >
          {
            productList.result && productList.result.length > 0 ? productList.result.map(product => (
              <GridListTile style={{height: 'auto'}} key={product.id} >
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