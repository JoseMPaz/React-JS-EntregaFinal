import { useEffect, useState } from "react";
import { ItemList } from "../ItemList/ItemList";
import { getProducts, getByCategory } from "../../services/productsService";
import { useParams } from "react-router-dom";

export const ItemListContainer = () => 
{
  const {category} = useParams(); /* Obtiene la categoría del producto de los parámetros de la URL utilizando el hook useParams de React Router */

  const [products, setProducts] = useState([]);/* Estado para almacenar los productos obtenidos de la solicitud */
  const [loading, setLoading] = useState(true);/* Estado para controlar el estado de carga de la solicitud */

  //Con el JSON LOCAL: productos.json
  useEffect(() => 
  {
    setLoading(true);/* Establece loading en true al iniciar la solicitud */

    getByCategory(category)/* Llama a la función getProducts pasando la categoría obtenida de los parámetros de la URL para obtener los productos desde la base de datos o servicio */
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
