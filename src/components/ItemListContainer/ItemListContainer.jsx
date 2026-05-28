import { useEffect, useState } from "react";
import { ItemList } from "../ItemList/ItemList";

export const ItemListContainer = () => 
{
  const [products, setProducts] = useState([]);/* Estado para almacenar los productos obtenidos de la solicitud */
  const [loading, setLoading] = useState(true);/* Estado para controlar el estado de carga de la solicitud */

  //Con el JSON LOCAL: productos.json
  useEffect(() => 
  {
    setLoading(true);/* Establece loading en true al iniciar la solicitud */

    fetch ("/data/products.json")/* Ruta relativa al directorio public*/
      .then((response) => response.json())/* Convierte la respuesta a JSON */
      .then((data) => setProducts(data))/* Actualiza el estado con los productos obtenidos */
      .catch((error) => console.log("Hubo un error:", error))/* Maneja cualquier error que ocurra durante la solicitud */
      .finally(() => setLoading(false));/* Establece loading en false una vez que la solicitud se completa, ya sea con éxito o con error */
  }, []);
 
  if (loading)/* Si loading es true, muestra un mensaje de carga */
    return <p>Cargando...</p>;

  return (
    <section>
      <ItemList products={products} /> {/* Renderiza el componente ItemList pasando los productos obtenidos como props */}
    </section>
  );
};
