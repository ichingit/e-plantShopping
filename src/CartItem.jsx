import React, { useState,useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';
import ProductList from './ProductList';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const [showPlants, setShowPlants] = useState(false);
  const dispatch = useDispatch();
  const [showCart, setShowCart] = useState(true);
  const [addedToCart, setAddedToCart] = useState({});
  const [showProductList, setShowProductList] = useState(false);

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    let TotalAmountAll =0;
    for (let i = 0; i < cart.length; i++) {
        var ncost = Number(cart[i].cost.replace("$",""));
        var nqut = Number(cart[i].quantity);
       TotalAmountAll += (ncost * nqut);
      }
    
    return TotalAmountAll.toString();
   
  };

  const handleContinueShopping = (e) => {
        onContinueShopping(e);
      };
    
      const handleCheckoutShopping = (e) => {
        alert('Functionality to be added for future reference');
      };



  const handleIncrement = (item) => {
    let x = { ...item };
    x.quantity++
    dispatch(updateQuantity(x));
  };

  const handleDecrement = (item) => {
    let x = { ...item };
        if  (x.quantity>0){
        x.quantity--
        dispatch(updateQuantity(x));
        }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item));
  };

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
    let totalCost =0;
    var ncost = Number(item.cost.replace("$",""));
    var nqut = Number(item.quantity);
    totalCost = ncost * nqut;
    return totalCost.toString();
  };

  

  return (
        <div className="cart-container">
            <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
            <div>
              {cart.map(item => (
                <div className="cart-item" key={item.name}>
                    <img className="cart-item-image" src={item.image} alt={item.name} />
                    <div className="cart-item-details">
                    <div className="cart-item-name">{item.name}</div>
                    <div className="cart-item-cost">{item.cost}</div>
                    <div className="cart-item-quantity">
                        <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                        <span className="cart-item-quantity-value">{item.quantity}</span>
                        <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
                    </div>
                    <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
                    <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
                    </div>
                </div>
                ))}
            </div>
            <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
            <div className="continue_shopping_btn">
                <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button>
                <br />
                <button className="get-started-button1" onClick={(e) => handleCheckoutShopping(e)}>Checkout</button>
            </div>
        </div>
           
        
  );
}

export default CartItem;


