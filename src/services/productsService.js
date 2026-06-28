import {
    collection,
    addDoc,
    getDocs,
    getDoc,
    doc,
    query,
    where,
} from "firebase/firestore";

import { db } from "../firebase/config";

const productsRef = collection(db, "products");

export const getProducts = async () => 
{
    try 
    {
        const snapshot = await getDocs(productsRef);

        const productsFormat = snapshot.docs.map((doc) => 
        {
            return { id: doc.id, ...doc.data() };
        });   
        return productsFormat;
    } 
    catch (error)
    {
           console.error("Error fetching products: ", error);
        return [];
    }
};  

export const getProductById = async (id) => 
{
    try 
    {
        const productRef = doc(db, "products", id);
        const snapshot = await getDoc(productRef);
        
        if (snapshot.exists()) 
        {
            const product = { id: snapshot.id, ...snapshot.data() };
            return product;
        }
        else 
        {
            return null;
        }
    }
    catch (error) 
    {
        console.error("Error fetching product by ID: ", error);
        return null;
    }
};

export const getByCategory = async (category) => 
{
    try 
    {
        let queryRef;

        // Si se proporciona una categoría, se crea una consulta para filtrar los productos por esa categoría
        if (category) //Truthy: Si category tiene un valor válido (no es null, undefined, vacío, etc.), se ejecuta el bloque de código dentro del if. Si category es falsy (null, undefined, vacío, etc.), se ejecuta el bloque de código dentro del else.
        {
            queryRef = query( productsRef, where("category", "==", category) );
        }
        else // Si no se proporciona una categoría, se obtiene la referencia a todos los productos sin filtrar
        {
            queryRef = productsRef;
        }

        const snapshot = await getDocs(queryRef); /* Se ejecuta la consulta utilizando getDocs para obtener los documentos que cumplen con la condición de categoría (si se proporcionó) o todos los productos (si no se proporcionó una categoría) */

        // Se formatea la respuesta de la consulta para incluir el ID del documento junto con los datos del producto
        const productsFormat = snapshot.docs.map((doc) => 
        {
            return { id: doc.id, ...doc.data() }; /* Se mapea cada documento obtenido en el snapshot para crear un nuevo objeto que incluye el ID del documento (doc.id) y los datos del producto (doc.data()) utilizando el operador de propagación (...) para combinar ambos en un solo objeto */
        });
        return productsFormat; /* Se devuelve el array de productos formateados que cumplen con la condición de categoría (si se proporcionó) o todos los productos (si no se proporcionó una categoría) */
    }
    catch (error) 
    {
        console.error("Error fetching products by category: ", error);
        return [];
    }
};
        
export const createProduct = async (productData) => 
{
  try 
  {
    const docRef = await addDoc(productsRef, productData); // Se crea un nuevo documento en la colección "products" con los datos del producto proporcionados (productData) y se obtiene una referencia al documento recién creado (docRef)

    return docRef.id; // Se devuelve el ID del documento recién creado, que puede ser útil para realizar operaciones adicionales o redirigir al usuario a la página del producto recién creado
  } 
  catch (error) 
  {
    console.error("Error al crear producto:", error); // Se captura cualquier error que ocurra durante la creación del producto y se muestra en la consola para facilitar la depuración
    throw error; // Se lanza el error nuevamente para que pueda ser manejado por la función que llamó a createProduct, permitiendo que se tomen medidas adicionales en caso de fallo
  }
};