import { useNavigate } from "react-router-dom";
import "./ProductFormContainer.css";
import { useState } from "react";
import { ProductFormUI } from "./ProductFormUI";
import { validateProduct } from "../../utils/validateProduct";
import { uploadImage } from "../../services/uploadImage";
import { createProduct } from "../../services/productsService";

/**
 * Componente contenedor para el formulario de creación de productos.
 * Maneja el estado del formulario, la validación y la lógica de envío.
 */
export const ProductFormContainer = () => 
{
  const navigate = useNavigate(); //hook de react-router-dom para redirigir a otra ruta
  const [loading, setLoading] = useState(false); //estado para controlar el loading mientras se procesa el formulario
  const [errors, setErrors] = useState({}); //estado para controlar los errores de validación del formulario
  const [file, setFile] = useState(null); //estado para controlar el archivo de imagen seleccionado
  const [product, setProduct] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
  }); //estado para controlar los datos del producto que se van a enviar al backend

  const handleChange = (e) => 
  {
    const { name, value } = e.target; //desestructuramos el name y value del input que se está modificando
    setProduct({ ...product, [name]: value }); //actualizamos el estado del producto con el nuevo valor del input correspondiente
  };

  const handleFileChange = (e) => 
  {
    const file = e.target.files[0] || null; //obtenemos el archivo seleccionado o null si no hay ninguno
    setFile(file); //actualizamos el estado del archivo con el nuevo archivo seleccionado
  };

  const handleSubmit = async (e) => 
  {
    e.preventDefault(); //prevenimos el comportamiento por defecto del formulario que recarga la página

    //validamos los datos del producto y el archivo seleccionado utilizando la función validateProduct
    setErrors({}); //limpiamos los errores anteriores
    setLoading(true); //activamos el estado de loading mientras se procesa el formulario

    const newErrors = validateProduct({ ...product, file }); //validamos los datos del producto y el archivo seleccionado utilizando la función validateProduct

    if (Object.keys(newErrors).length > 0) //si hay errores de validación, actualizamos el estado de errores y desactivamos el loading
    {
      setErrors(newErrors);
      setLoading(false);
      return;
    }

    try 
    {
      const imageUrl = await uploadImage(file); //subimos la imagen al servidor utilizando la función uploadImage y obtenemos la URL de la imagen

      //creamos un objeto con los datos del producto y la URL de la imagen, convirtiendo el precio a número
      const productData = 
      {
        ...product,
        price: Number(product.price),
        image: imageUrl,
      };
      
      const id = await createProduct(productData); //creamos el producto en el backend utilizando la función createProduct y obtenemos el ID del nuevo producto

      setProduct({ name: "", price: "", category: "", description: "" });//reseteamos el estado del producto a sus valores iniciales
      setFile(null); //reseteamos el estado del archivo a null
      navigate(`/success/${id}`, { replace: true }); //redireccionamos a la página de éxito utilizando el ID del nuevo producto y reemplazando la ruta actual en el historial del navegador
    } 
    catch (error) 
    {
      setErrors({ general: error.message }); //si ocurre un error en la subida de la imagen o en la creación del producto, actualizamos el estado de errores con el mensaje del error
    } 
    finally 
    {
      setLoading(false); //desactivamos el estado de loading después de procesar el formulario, ya sea que haya sido exitoso o haya ocurrido un error
    }
  };

  return (
    <ProductFormUI
      product={product} //pasamos el estado del producto al componente ProductFormUI
      errors={errors} //pasamos el estado de errores al componente ProductFormUI
      loading={loading} //pasamos el estado de loading al componente ProductFormUI
      onChange={handleChange} //pasamos la función handleChange al componente ProductFormUI
      onFileChange={handleFileChange} //pasamos la función handleFileChange al componente ProductFormUI
      onSubmit={handleSubmit} //pasamos la función handleSubmit al componente ProductFormUI
    /> //pasamos los props necesarios al componente ProductFormUI para que pueda renderizar el formulario y manejar los eventos de cambio y envío
  );
};