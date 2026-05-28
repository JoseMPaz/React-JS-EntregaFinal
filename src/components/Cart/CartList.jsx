import { CartItem } from "./CartItem";
import { useCart } from "../../context/CartContext";

export const CartList = () => 
{
    const { cart } = useCart();

    return (
        <div className="cart-items-container">
            {
                cart.map((element) => (
                    <CartItem
                        key={element.id}
                        item={element}
                    />
                ))
            }
        </div>
    );
};