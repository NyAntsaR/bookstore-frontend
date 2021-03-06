import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import ShowImage from "./ShowImage";
import moment from "moment";
import { addItem, updateItem, removeItem } from "./cartHelpers";

const Card = ({
    product,
    showViewProductButton = true,
    showAddToCartButton = true,
    cartUpdate = false,
    showRemoveProductButton = false
}) => {
    const [redirect, setRedirect] = useState(false);
    const [count, setCount] = useState(product.count);

    const showViewButton = showViewProductButton => {
        return (
            showViewProductButton && (
                <Link to={`/product/${product._id}`} className="mr-2">
                    <button className="mt-2 mb-2" style={{backgroundColor: '#BCB0BA', borderRadius: '5px', color: 'white'}}>
                        <i class="fa fa-eye" aria-hidden="true"></i> View Product
                    </button>
                </Link>
            )
        );
    };

    const addToCart = () => {
        addItem(product, () => {
            setRedirect(true);
        });
    };

    const shouldRedirect = redirect => {
        if (redirect) {
            return <Redirect to="/cart" />;
        }
    };

    const showAddToCart = showAddToCartButton => {
        return (
            showAddToCartButton && (
                <button
                    onClick={addToCart}
                    className="btn mt-2 mb-2"
                >
                    < i className="fa fa-cart-plus" aria-hidden="true" style={{color:'#BCB0BA', fontSize: '30px'}}></i>
                </button>
            )
        );
    };

    const showRemoveButton = showRemoveProductButton => {
        return (
            showRemoveProductButton && (
                <button
                    onClick={() => removeItem(product._id)}
                    className="btn btn-outline-danger mt-2 mb-2"
                >
                    <i class="fa fa-trash" aria-hidden="true"></i>
                </button>
            )
        );
    };

    const showStock = quantity => {
        return quantity > 0 ? (
            <span className="badge-pill" style={{backgroundColor: 'green', color: 'white', fontSize: "12px"}}>In Stock</span>
        ) : (
            <span className="badge-pill">Out of Stock</span>
        );
    };

    const handleChange = productId => event => {
        setCount(event.target.value < 1 ? 1 : event.target.value);
        if (event.target.value >= 1) {
            updateItem(productId, event.target.value);
        }
    };

    const showCartUpdateOptions = cartUpdate => {
        return (
            cartUpdate && (
                <div>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text">
                                <i class="fa fa-plus" style={{color: 'green'}}>  </i>   Adjust Quantity
                            </span>
                        </div>
                        <input
                            type="number"
                            className="form-control"
                            value={count}
                            onChange={handleChange(product._id)}
                        />
                    </div>
                </div>
            )
        );
    };

    return (
        <div className="card" style={{width: 350, height: 598}}>
            <div className="card-header name" style={{backgroundColor: '#BCB0BA'}}>{product.name}</div>
            <div className="card-body">
                {shouldRedirect(redirect)}
                <div>
                    <ShowImage item={product} url="product" />
                    <p className=" mt-2" style={{fontSize: '12px',  margin:'0px'}}>
                        {product.description.substring(0, 500)}
                    </p>
                </div>
               
                <p className="black-10" style={{margin:'0px'}}> <spam style={{fontWeight:'bold', color: '#AE90AA'}}>Price: </spam> ${product.price}</p>
                <p className="black-9" style={{margin:'0px'}}>
                    <spam style={{fontWeight:'bold', color: '#AE90AA'}}>Category: </spam> {product.category && product.category.name}
                </p>
                <p className="black-8">
                    <spam style={{fontSize: '10px'}}>Created {moment(product.createdAt).fromNow()} </spam>
                </p>

                {showStock(product.quantity)}
                <br />

                {showViewButton(showViewProductButton)}

                {showAddToCart(showAddToCartButton)}

                {showRemoveButton(showRemoveProductButton)}

                {showCartUpdateOptions(cartUpdate)}
            </div>
        </div>
    );
};

export default Card;

