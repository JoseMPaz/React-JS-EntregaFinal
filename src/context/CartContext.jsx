import { createContext, useContext, useState} from "react"; /* Se importan los hooks createContext, useContext y useState desde la biblioteca de React para crear y utilizar el contexto del carrito de compras, así como para manejar el estado del carrito */
import { useNavigate } from "react-router-dom"; /* Se importa el hook useNavigate desde la biblioteca de React Router para permitir la navegación programática dentro de la aplicación, lo que se utiliza para redirigir a los usuarios después de completar el proceso de pago */
import React from "react"; /* Se importa la biblioteca de React para utilizar sus funcionalidades en la creación del contexto del carrito de compras y en la definición del componente CartProvider */

/* Se crea el contexto del carrito utilizando createContext de React para compartir el estado del carrito de compras entre los componentes de la aplicación */
export const CartContext = createContext(); /* Se exporta el contexto del carrito para que pueda ser utilizado en otros componentes de la aplicación */     

/* Custom hook para acceder al contexto del carrito de compras, que se puede utilizar en cualquier componente que esté envuelto por el CartProvider */
export const useCart = () => 
{
    const context = useContext (CartContext); /* Se utiliza el hook useContext para acceder al contexto del carrito de compras y obtener su valor actual */
    
    if (!context) 
        throw new Error("useCart debe usarse dentro de un CartProvider"); /* Se lanza un error si el hook useCart es utilizado fuera del componente CartProvider */
    
    return context;
}

export const CartProvider = ({ children }) => 
{
    const navigate = useNavigate(); /* Se utiliza el hook useNavigate de React Router para obtener la función de navegación que permite redirigir a los usuarios a diferentes rutas dentro de la aplicación */
    const [cart, setCart] = useState([]); /* Se define el estado del carrito de compras utilizando useState, inicialmente establecido como un array vacío */

    /* Función para verificar si un producto ya está en el carrito de compras, utilizando el método some para comprobar si existe un producto con el ID especificado en el array del carrito */
    const isInCart = (item) => 
    {
       const inCart = cart.some((element) => element.id === item.id); /* Función para verificar si un producto ya está en el carrito de compras, utilizando el método some para comprobar si existe un producto con el ID especificado en el array del carrito */   
        return inCart; /* Retorna true si el producto está en el carrito, de lo contrario retorna false */
    }

    /* Función para agregar un producto al carrito de compras, que verifica si el producto no está ya en el carrito utilizando la función isInCart y luego actualiza el estado del carrito agregando el nuevo producto al array existente utilizando el operador spread (...) */
    const addItem = (item) => 
    {
        if (isInCart(item)) 
        {
            alert("El producto ya está en el carrito"); /* Si el producto ya está en el carrito, muestra una alerta indicando que el producto ya ha sido agregado al carrito */
            return; /* Retorna para salir de la función sin agregar el producto al carrito */
        }
        setCart([...cart, item]); /* Si el producto no está en el carrito, actualiza el estado del carrito agregando el nuevo producto al array existente utilizando el operador spread (...) */    
        alert("Producto agregado al carrito"); /* Muestra una alerta indicando que el producto ha sido agregado al carrito */
    }

    const removeItem = (id) => {
        const updateCart = cart.filter((element) => element.id != id ); /* Función para eliminar un producto del carrito de compras, que utiliza el método filter para crear un nuevo array del carrito que excluye el producto con el ID especificado y luego actualiza el estado del carrito con el nuevo array utilizando la función setCart */
        setCart(updateCart); /* Actualiza el estado del carrito con el nuevo array que excluye el producto eliminado utilizando la función setCart */
        alert("Producto eliminado del carrito"); /* Muestra una alerta indicando que el producto ha sido eliminado del carrito */   
    };

    /* Función para vaciar el carrito de compras, estableciendo el estado del carrito como un array vacío utilizando la función setCart */
    const clearCart = () => 
    {
        setCart([]); 
    }

    /* Función para obtener el total de productos en el carrito de compras, que retorna la longitud del array del carrito utilizando la propiedad length(sin quantity)*/
    const getTotalItems = () => 
    {
        return cart.length; /* Función para obtener el total de productos en el carrito de compras, que retorna la longitud del array del carrito utilizando la propiedad length */
    }

    /* Función para obtener el total del carrito de compras, que utiliza el método reduce para sumar los precios de todos los productos en el carrito y retorna el total */
    const getCartTotal = () => 
    {
        return cart.reduce((total, item) => total + item.price, 0); /* Función para obtener el total del carrito de compras, que utiliza el método reduce para sumar los precios de todos los productos en el carrito y retorna el total */
    }

    const checkout = () => 
    {
        alert("Gracias por su compra"); /* Función para simular el proceso de pago, que muestra una alerta agradeciendo al usuario por su compra */
        clearCart(); /* Después de mostrar la alerta, se vacía el carrito de compras utilizando la función clearCart para restablecer el estado del carrito a un array vacío */
        navigate("/"); /* Luego, se utiliza la función navigate para redirigir al usuario a la página de inicio ("/") después de completar el proceso de pago */
    }

    const values = 
    { 
        cart,
        clearCart,
        addItem,
        removeItem,
        getTotalItems,
        getCartTotal,
        checkout
    }; /* Se crea un objeto values que contiene el estado del carrito de compras y las funciones para manipular el carrito, que se proporcionará como valor del contexto del carrito de compras */

    return (
        <CartContext.Provider value={values}> {/* Se proporciona el valor del contexto del carrito de compras, que incluye el estado del carrito y la función para agregar productos al carrito */}
            {children} {/* Se renderizan los componentes hijos que están envueltos por el CartProvider */}
        </CartContext.Provider>
    );
}