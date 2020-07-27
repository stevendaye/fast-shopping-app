import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { Switch, Route } from "react-router";
import { Provider } from "react-redux";
import { store, persistor} from "./store";
import { PersistGate } from "redux-persist/lib/integration/react";
import Navbar from './components/layouts/Navbar';
import Landing from './components/productboard/Landing';
import Cart from './components/productboard/Cart';
import Checkout from './components/productboard/Checkout';
import Thanks from './components/productboard/Thanks';
import _404 from './components/layouts/_404';
import products from "./config/products.json";
import categories from "./config/categories.json";
import productCategories from "./config/productCategories.json";
import { doSaveProducts } from "./actions/products";
import { doSaveCategories, doSaveProductCategories } from "./actions/categories";
import "./App.css";
import "./Layout.css";

const App = () => {
  useEffect(() => {
    store.dispatch(doSaveProductCategories(productCategories));
    store.dispatch(doSaveProducts(products));
    store.dispatch(doSaveCategories(categories));
  }, []);

  return (
    <Provider store = {store}>
      <PersistGate loading = {null} persistor = {persistor}>
        <Router>
          <Fragment>
            <div className = "wrapper">
              <Navbar/>
              <div className = "container">
                <Switch>
                  <Route exact path = "/" component = { Landing }/>
                  <Route exact path = "/cart" component = { Cart }/>
                  <Route exact path = "/checkout"  component = { Checkout } />
                  <Route exact path = "/thanks"component = { Thanks } />
                  <Route component = { _404 } />
                </Switch>
              </div>
            </div>
          </Fragment>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
