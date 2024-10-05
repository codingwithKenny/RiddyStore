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
    function removeProduct(productId){
        setCartProduct(prev => {
           const newProductList =[...prev]
           const index = newProductList.indexOf(productId)
            console.log(newProductList)
            console.log(index)
            if(index !== -1){
                newProductList.splice(index,1)

            }
            return newProductList
        })

    }

    

    return (
        <CartContext.Provider value={{cartProducts, setCartProduct, addProduct, removeProduct}}>
            {children}
        </CartContext.Provider>
    );
}
