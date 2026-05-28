import { Route, Routes } from "react-router-dom";

import { Count } from "./components/Count/Count";
import { Footer } from "./components/Footer/Footer";
import { Header } from "./components/Header/Header";

import { ItemListContainer } from "./components/ItemListContainer/ItemListContainer";
import { ItemDetailContainer } from "./components/ItemDetailContainer/ItemDetailContainer";
import "./App.css";
import { CartView } from "./components/Cart/CartView";

function App() 
{
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<ItemListContainer />} /> {/* Ruta para mostrar la lista de productos utilizando el componente ItemListContainer */}
          <Route path="/product/:id" element={<ItemDetailContainer />} /> {/* Ruta para mostrar el detalle de un producto específico utilizando el ID del producto como parámetro en la URL */} 
          <Route path="/carrito" element={<CartView />} /> {/* Ruta para mostrar el carrito de compras, actualmente muestra un encabezado simple */}
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;