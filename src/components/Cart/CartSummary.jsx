import { useCart } from "../../context/CartContext";

export const CartSummary = () => 
{
    const {
        getTotalItems,
        getCartTotal,
        clearCart,
        checkout
    } = useCart();

    return (
        <div className="cart-summary">

            <h2>Resumen del carrito</h2>

            <p>
                Total de productos: {getTotalItems()}
            </p>

            <p>
                Total a pagar: ${getCartTotal()}
            </p>

            <button
                className="btn primary"
                onClick={clearCart}
            >
                Vaciar carrito
            </button>

            <button
                className="btn primary"
                onClick={checkout}
            >
                Finalizar compra
            </button>

        </div>
    );
};