import { Link } from "react-router-dom";
import "./Nav.css";
import { useCart } from "../../context/CartContext.jsx"; /* Se importa el hook useCart desde el contexto del carrito de compras para acceder a la función getTotalItems, que se utiliza para obtener el número total de items en el carrito y mostrarlo en la barra de navegación */  

export const Nav = () => 
{
  const {getTotalItems} = useCart(); /* Utiliza el hook useCart para obtener la función getTotalItems del contexto del carrito, que se utiliza para obtener el número total de items en el carrito */ 
  const totalItems = getTotalItems(); /* Llama a la función getTotalItems para obtener el número total de items en el carrito y lo almacena en la variable totalItems */  
  return (
    <nav>
      <ul className="nav-list">
        <li>
          <Link to={"/"}>Inicio</Link>
        </li>
        <li>
          <Link to={"/carrito"} className="cart-link">
            <span className="cart-text">Carrito 🛒</span>
            {totalItems > 0 && ( <span className="cart-badge">{totalItems}</span> )} {/* Si el número total de items en el carrito es mayor que 0, se muestra un badge con el número total de items en el carrito utilizando un elemento span con la clase cart-badge. Si no hay items en el carrito, no se muestra el badge. */  }
        </Link>
        </li>
      </ul>
    </nav>
  );
};

