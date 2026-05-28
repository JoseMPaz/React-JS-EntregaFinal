import "./Item.css";

// FakeStore y dummyjson utilizan clave "title" para el nombre de producto
// Dummyjson tiene las imagenes en array bajo clave "images"⚠️

export const Item = ({ name, description, price, image, children }) => 
{
  return (
    <article className="card">
      <img src={image} alt={`foto de ${name}`} /> {/* Renderiza la imagen del producto utilizando la URL proporcionada en la prop "image" y establece el texto alternativo utilizando el nombre del producto */ }
      <h3>{name}</h3> {/* Renderiza el nombre del producto utilizando la prop "name" */}
      <p>{description}</p> {/* Renderiza la descripción del producto utilizando la prop "description" */}
      <p>${price}</p> {/* Renderiza el precio del producto utilizando la prop "price" y formateándolo como una cantidad monetaria */}
      {children} {/* Renderiza cualquier contenido adicional que se pase como hijos del componente Item, lo que permite agregar elementos adicionales como botones o enlaces dentro de la tarjeta del producto */ }
    </article>
  );
};
