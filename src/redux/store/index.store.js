import { createStore } from 'redux';
import { seller } from '../reducers/productManagement.reducer';

const store = createStore(seller);

export default store;