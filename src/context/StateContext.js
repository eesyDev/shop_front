import React, { useState, useContext, createContext, useEffect, useRef } from "react";
import { toast } from 'react-hot-toast';

const Context = createContext()

export const StateContext = ({ children }) => {
    const [showCart, setShowCart] = useState(false);
    const [qty, setQty] = useState(1);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalQuantities, setTotalQuantities] = useState(0);

    const isInitialMount = useRef(true)

    useEffect(() => {
        if(isInitialMount.current) {

        const localData = localStorage.getItem('products');
        console.log('init products', localData)
        if (localData) {
            try {
                const { cartItems, totalPrice, totalQuantities } = JSON.parse(localData);
                console.log('loading products')

                setCartItems(cartItems || []);
                setTotalPrice(totalPrice || 0);
                setTotalQuantities(totalQuantities || 0);
            } catch (err) {
                console.log('Err of loading products')
            }
        };
        isInitialMount.current = false
    } else {
        console.log('saving products to localStorage');
        const doc = {
            cartItems, totalPrice, totalQuantities
        };
    
        localStorage.setItem('products', JSON.stringify(doc));
    }

     }, [cartItems, totalPrice, totalQuantities]);

    let foundProduct;
    let index;

    const onAdd = (product, quantity) => {
        const checkProductInCart = cartItems.find((item) => item._id === product._id);

        setTotalPrice((prevTotalPrice) => prevTotalPrice + (product.price * quantity));
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity)

        if (checkProductInCart) {
            const updatedCartItems = cartItems.map((item) => {
                if (item._id === product._id) {
                    return { ...item, quantity: item.quantity + quantity }
                }
            });
            setCartItems(updatedCartItems);
        } else {
            product.quantity = quantity
            setCartItems([...cartItems, { ...product }])
        }
        toast.success(`${qty} ${product.name} added to cart`)
    }

    const toggleCartItemQuantity = (id, value) => {
        foundProduct = cartItems.find((item) => item._id === id);

        const newCartItems = cartItems.filter((item) => item._id !== id);
        if (value === "inc") {
            setCartItems([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity + 1 }]);
            setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price);
            setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1)
        } else if (value === "dec") {
            if (foundProduct.quantity > 1) {
                setCartItems([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity - 1 }]);
                setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price);
                setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1)
            }

        } else {
            return
        }
    }

    const onRemove = (product) => {
        console.log(product)
        foundProduct = cartItems.find((item) => item._id === product._id);
        const newCartItems = cartItems.filter((item) => item._id !== product._id);

        setCartItems(newCartItems);
        setTotalPrice((prevTotalPrice) => prevTotalPrice - (foundProduct?.price * foundProduct.quantity));
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - foundProduct.quantity)
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
                cartItems,
                totalPrice,
                totalQuantities,
                toggleCartItemQuantity,
                onRemove
            }}
        >
            {children}
        </Context.Provider>
    )
}

export const useStateContext = () => useContext(Context)

