import { Item } from "../Item/Item";
import { useCart } from "../../context/CartContext";


export const ItemDetail = ({ item }) => 
{
  const {addItem} = useCart(); /* Se utiliza el hook useCart para acceder a la función addItem del contexto del carrito de compras, lo que permite agregar un producto al carrito desde el componente ItemDetail */ 
  return (
    <Item {...item}>
      <button className="btn primary" onClick={() => addItem(item)}> {/* Renderiza un botón con la clase "btn primary" que, al hacer clic, llama a la función addItem pasando el producto actual como argumento para agregarlo al carrito de compras */}  
        Agregar al carrito
      </button>
    </Item>
  );
};
