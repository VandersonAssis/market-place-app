import React from 'react';
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ProductManagement from './components/products/ProductManagement';
import Purchase from './components/purchase/Purchase';
import Desktop from './components/desktop/Desktop';
import store from './redux/store/index.store';

export default function App() {
  return (
    <Provider store={store} >
      <Router>
        <Switch >
          <Desktop >
            <Route component={({ match }) =>
              <div>
                <Route path="/products" component={ProductManagement} />
                <Route path="/purchase" component={Purchase} />
              </div>
            } />
          </Desktop>
        </Switch>
      </Router>
    </Provider>
  );
}