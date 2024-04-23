import React, { useState, useContext, createContext } from "react";
import { toast } from 'react-hot-toast';

const Context = createContext()

export const StateContext = ({ children }) => {
    const [showCart, setShowCart] = useState(false);
    const [qty, setQty] = useState(1);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalQuantities, setTotalQuantities] = useState(0)

    const onAdd = (product, quantity) => {
        const checkProductInCart = cartItems.find((item) => item._id === product._id);

        setTotalPrice((prevTotalPrice) => prevTotalPrice + (product.price * quantity));
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity)

        if (checkProductInCart) {
            const updatedCartItems = cartItems.map((item) => {
                if (item._id === product._id) {
                    return {...item, quantity: item.quantity + quantity}
                }
            });
            setCartItems(updatedCartItems)
        } else {
            product.quantity = quantity
            setCartItems([...cartItems, {...product}])
        }
        toast.success(`${qty} ${product.name} added to cart`)
    }

    const icQty = () => {
        setQty((prevQty) => prevQty + 1)
    }
    const decQty = () => {
        setQty((prevQty) => {
            if (prevQty - 1 < 1) {
                return 1
            }
            return prevQty - 1
        })
    }

    return (
        <Context.Provider
            value={{
                showCart, 
                setShowCart,
                qty,
                setQty,
                icQty,
                decQty,
                onAdd,
                cartItems
            }}
        >
            {children}
        </Context.Provider>
    )
}

export const useStateContext = () => useContext(Context)

