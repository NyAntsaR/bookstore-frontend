import React, { useState, useEffect } from "react";
import Layout from "../Core/Layout";
import {getProducts, deleteProduct} from './apiAdmin';
import { isAuthenticated } from "../Auth";
import { Link } from 'react-router-dom'

const ManageProducts = () => {

    const [products, setProducts] = useState([]);
    const {user, token} = isAuthenticated();

    const loadProducts = () => {
        // populate the products in the state
        getProducts().then(data => {
            if(data.error) {
                console.log(data.error)
            } else {
                setProducts(data)
            }
        });
    }

    const destroy = productId => {
        deleteProduct(productId, user._id, token).then(data => {
            if(data.error) {
                console.log(data.error)
            } else {
                loadProducts()
            }
        })
    }
    useEffect(() => {
        loadProducts()
    }, [])
    return (
        <Layout
            title="Manage Products"
            description="Perform CRUD on products"
            className="container description"
        >
            <div className="row">
                <div className="col-12">
                    <h2 className="text-center">
                        Total {products.length} product
                    </h2>
                    <hr />

                    <ul className="list-group">
                        {products.map((p, i) => (
                            <li key={i} className="list-group-item d-flex justify-content-between align-items-center">
                                <strong>{p.name}</strong>
                                <Link to={`/admin/product/update/${p._id}`}>
                                    <span className="badge badge-warning badge-pill">
                                        Update
                                    </span>
                                    
                                </Link>
                                <span onClick={() => destroy(p._id)} className='badge badge-danger badge-pill'>
                                    Delete
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            
        </Layout>
    );
};

export default ManageProducts;

