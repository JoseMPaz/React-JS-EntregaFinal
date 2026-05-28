import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ItemDetail } from "../ItemDetail/ItemDetail";

export const ItemDetailContainer = () => 
{
  const { id } = useParams(); /* Obtiene el ID del producto de los parámetros de la URL utilizando el hook useParams de React Router */

  const [itemDetail, setItemDetail] = useState(null); /* Estado para almacenar los detalles del producto, inicialmente establecido en null */
  const [loading, setLoading]       = useState(true); /* Estado para controlar el estado de carga, inicialmente establecido en true */

  useEffect(() => 
  {
    fetch("/data/products.json") /* Realiza una solicitud fetch para obtener los datos de los productos desde un archivo JSON ubicado en la ruta "/data/products.json" */
      .then((response) => response.json()) /* Convierte la respuesta de la solicitud fetch a formato JSON */
      .then((data) => 
      {
        const item = data.find((element) => String(element.id) === id); /* Busca el producto en el array de productos utilizando el método find, comparando el ID del producto con el ID obtenido de los parámetros de la URL. Se convierte el ID del producto a string para asegurar la comparación correcta */
        if (item) /* Si se encuentra el producto, actualiza el estado itemDetail con los detalles del producto utilizando la función setItemDetail y luego retorna para salir de la función */
        {
          setItemDetail(item); /* Actualiza el estado itemDetail con los detalles del producto encontrado utilizando la función setItemDetail */
          return; /* Retorna para salir de la función después de actualizar el estado con los detalles del producto encontrado */
        }
        throw new Error("Elemento no encontrado"); /* Si no se encuentra el producto, lanza un error con el mensaje "Elemento no encontrado" */
      })
      .catch((error) => console.log(error)) /* Si ocurre un error durante la solicitud fetch o el procesamiento de los datos, se captura el error y se muestra en la consola utilizando console.log */
      .finally(() => setLoading(false)); /* Finalmente, independientemente de si la solicitud fetch fue exitosa o si ocurrió un error, se establece el estado loading en false utilizando la función setLoading para indicar que la carga ha finalizado */
  }, []);

  if (loading) 
    return <p>Cargando...</p>; /* Si el estado loading es true, muestra un mensaje de "Cargando..." indicando que los datos están siendo cargados */
  if (!itemDetail) 
    return <p>Producto no encontrado</p>; /* Si el estado itemDetail es null, muestra un mensaje de "Producto no encontrado" indicando que no se encontró el producto con el ID especificado */

  return (
    <section>
      <h1>Detalles del producto</h1>
      <div className="products-container">
        <ItemDetail item={itemDetail} /> {/* Renderiza el componente ItemDetail pasando los detalles del producto almacenados en el estado itemDetail como props utilizando la sintaxis de objeto (item={itemDetail}) para mostrar los detalles del producto en la interfaz de usuario */}
      </div>
    </section>
  );
};
