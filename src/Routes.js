/*------ REACT -------*/
import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';


/*------ AUTHENTICATION -------*/
import Signup from './components/User/Signup';
import Signin from './components/User/Signin';
import Home from './components/Core/Home';
import Shop from './components/Core/Shop';
import Product from './components/Core/Product';
import Cart from './components/Core/Cart';

/*------ AUTHORIZATION -------*/
import PrivateRoute from './components/Auth/PrivateRoute';
import Dashboard from './components/User/UserDashboard';
import AdminRoute from './components/Auth/AdminRoute';
import AdminDashboard from './components/User/AdminDashboard';

/*------ CATEGORY -------*/
import AddCategory from './components/Admin/AddCategory';

/*------ PRODUCT -------*/
import AddProduct from './components/Admin/AddProduct';
import UpdateProduct from './components/Admin/UpdateProduct';
import ManageProducts from  './components/Admin/ManageProducts';

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={ Home } />
                <Route path="/shop" exact component={ Shop } />
                <Route path="/signin" exact component={ Signin } />
                <Route path="/signup" exact component={ Signup } />

                <PrivateRoute path="/user/dashboard" exact component={ Dashboard } />
                <AdminRoute path="/admin/dashboard" exact component={ AdminDashboard } />
                <AdminRoute path="/create/category" exact component={ AddCategory } />
                <AdminRoute path="/create/product" exact component={ AddProduct } />
                <PrivateRoute path="/admin/products" exact component={ ManageProducts } />
                <AdminRoute path="/admin/product/update/:productId" exact component={ UpdateProduct } />

                <Route path="/product/:productId" exact component={ Product } />

                <Route path="/cart" exact component={Cart} />
            </Switch>
        </BrowserRouter>
    );
};

export default Routes;
