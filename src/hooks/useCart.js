import AppContext from "../context";
import { useContext } from "react";

export const useCart = () => {
    const {cartItems,setcartItems} = useContext(AppContext);
    const totalPrice = cartItems.reduce((sum, obj) => sum + Number(obj.price),0);
    return { cartItems, setcartItems, totalPrice };
}

