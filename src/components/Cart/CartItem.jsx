import { useCart } from "../../context/CartContext"; /* Importa el hook useCart desde el contexto del carrito de compras para acceder a las funciones y datos relacionados con el carrito */
import { Item } from "../Item/Item";

export const CartItem = ({item}) => 
{
    const {removeItem} = useCart(); /* Se utiliza el hook useCart para acceder a la función removeItem del contexto del carrito de compras, lo que permite eliminar un producto del carrito desde el componente CartItem */ 
    return <Item {...item}>
        <button 
            className="btn primary" 
            onClick={() => removeItem(item.id)}> {/* Renderiza un botón con la clase "btn primary" que, al hacer clic, llama a la función removeItem pasando el id del producto actual como argumento para eliminarlo del carrito de compras */}  
            Eliminar del carrito
        </button>
    </Item>;
};
