import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ProductManagement from './components/products/ProductManagement';
import Purchase from './components/purchase/Purchase';

function App() {
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={ ProductManagement } />
                <Route path="/purchase" exact component={ Purchase } />
            </Switch>
        </Router>
    );
}

export default App;