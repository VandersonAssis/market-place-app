import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ProductManagement from './components/products/ProductManagement';
import Purchase from './components/purchase/Purchase';
import Desktop from './components/ui/Desktop';

export default function App() {
    return (
        <Router>
            <Switch >
                <Desktop >
                    <Route component={({ match }) =>
                        <div>
                            <Route path="/product" component={ProductManagement} />
                            <Route path="/purchase" component={Purchase} />
                        </div>
                    } />
                </Desktop>
            </Switch>
        </Router>
    );
}