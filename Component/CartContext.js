const { createContext, useState } = require("react");


const CartContext = createContext({});

export function CartContextProvider({children}){
    const [cartProducts,setCartProduct] = useState([])
    return(
        <CartContext.Provider value={cartProducts}>
            {children}
        </CartContext.Provider>
    )
}