import { Link } from "react-router-dom";
import { Item } from "../Item/Item";
import "./ItemList.css";

export const ItemList = ({ products }) => 
{
  if (!products.length)/* Si no hay productos, muestra un mensaje indicando que no hay productos disponibles */
    return <p>No hay productos</p>;
  

  return (
    <div className="products-container">
      {products.map((product) => ( /* Itera sobre el array de productos y renderiza un componente Item para cada producto, envuelto en un Link para navegar a la página de detalles del producto */
        <Link to={`/product/${product.id}`} key={product.id}> {/* Crea un enlace a la página de detalles del producto utilizando el ID del producto como parte de la URL */}
          <Item {...product} /> {/* Renderiza el componente Item pasando todas las propiedades del producto como props utilizando el operador spread (...) */}
        </Link>
      ))}
    </div>
  );
};
