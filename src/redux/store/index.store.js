import { createStore } from 'redux';
import { productManagement } from '../reducers/productManagement.reducer';

const store = createStore(productManagement);

export default store;