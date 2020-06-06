import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Desktop from './components/desktop/Desktop';
import SignIn from './components/signin/SignIn';
import ProductManagement from './components/products/ProductManagement';
import Purchase from './components/purchase/Purchase';
import store from './redux/store/index.store';

export default function App() {
  return (
    <Provider store={store} >
      <Router>
        <Switch >
          <Route path="/login" component={SignIn} />
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