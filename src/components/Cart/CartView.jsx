import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext.jsx"; /* Se importa el hook useCart desde el contexto del carrito de compras para acceder al estado del carrito y mostrar los productos agregados al carrito en el componente CartView */
import { CartList } from "./CartList";
import { CartSummary } from "./CartSummary";

import "../Nav/Nav.css"

export const CartView = () => 
{
    const{cart} = useCart(); /* Se utiliza el hook useCart para acceder al estado del carrito de compras desde el contexto del carrito, lo que permite mostrar los productos agregados al carrito en el componente CartView */  
    return (
        <section className="cart-container">
            <h1>Carrito de compras</h1>
            {cart.length > 0 ? <>
                <CartList /> {/* Renderiza el componente CartList para mostrar la lista de productos agregados al carrito de compras si el carrito no está vacío */}        
                <CartSummary /> {/* Renderiza el componente CartSummary para mostrar un resumen del carrito de compras, como el total de productos y el total del carrito, si el carrito no está vacío */}
            </> : 
            <>
                <div className="empty-state">
                    <p className="empty-cart">El carrito está vacío</p>
                    <Link to={"/"} className="btn primary big primary">
                        Volver al inicio
                    </Link> {/* Renderiza un enlace que redirige al usuario a la página de inicio si el carrito está vacío, con la clase "btn primary" para aplicar estilos al botón */} 
                </div>
            </>
            }  
        </section>
    );
}