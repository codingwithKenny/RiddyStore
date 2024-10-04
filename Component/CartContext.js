import { createContext, useState, useEffect } from "react";

export const CartContext = createContext({});

export function CartContextProvider({children}) {
    const [cartProducts, setCartProduct] = useState([]);

    // Load cart from localStorage when the component mounts
    useEffect(() => {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            setCartProduct(JSON.parse(savedCart));
        }
    }, []); // Run once when the component mounts

    // Save cart to localStorage whenever cartProducts changes
    useEffect(() => {
        if (cartProducts.length > 0) {
            localStorage.setItem('cart', JSON.stringify(cartProducts));
        }
    }, [cartProducts]); // This runs whenever cartProducts updates

    function addProduct(productId) {
        setCartProduct(prev => [...prev, productId]);
    }

    return (
        <CartContext.Provider value={{cartProducts, setCartProduct, addProduct}}>
            {children}
        </CartContext.Provider>
    );
}
