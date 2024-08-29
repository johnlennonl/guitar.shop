import { useState , useEffect } from "react";
import Header from "./components/Header.jsx";
import Guitar from "./components/Guitar.jsx";
import { db } from "./data/db.js";

function App() {
  //Funcion carrito de compras

  const initialCart = () => {
    const localStorageCart = localStorage.getItem('cart');
    return localStorageCart ? JSON.parse(localStorageCart) : [];
  }

  const [data] = useState(db);

  const [cart, setCart] = useState(initialCart);

  const MAX_ITEMS = 5

  useEffect( () => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  function addToCard(item) {
    const itemExists = cart.findIndex((guitar) => guitar.id === item.id);
    if (itemExists >= 0) {
      //Existe en el Carrito
      const upatedCart = [...cart];
      upatedCart[itemExists].quantity++;
      setCart(upatedCart);
    } else {
      item.quantity = 1;
      setCart([...cart, item]);
    }
  }

 
  function removeFromCart(id) {
    setCart(preevCart => preevCart.filter( guitar => guitar.id !== id) );

  }

  function increaseQuantity(id) {
    const updateCart = cart.map( item => {
      if (item.id === id && item.quantity < MAX_ITEMS) {
       return {
        ...item, 
        quantity: item.quantity + 1
       }
      }
      return item
    })
    setCart(updateCart)
  }

  function decreaseQuantity(id) {
    const updateCart = cart.map( item => {
      if (item.id === id && item.quantity > 1) {
       return {
        ...item, 
        quantity: item.quantity - 1
       }
      }
      return item
    })
    setCart(updateCart)
  }

  function cleanCart() {
    setCart([])
  }



  return (
    <>
      <Header
       cart={cart} 
       removeFromCart={removeFromCart}
       increaseQuantity={increaseQuantity}
       decreaseQuantity={decreaseQuantity}
       cleanCart={cleanCart}
      />

      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {data.map((guitar) => (
            <Guitar
              key={guitar.id}
              guitar={guitar}
              setCart={setCart}
              addToCard={addToCard}
              
            />
          ))}
        </div>
      </main>

      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">
            GuitarLA - Todos los derechos Reservados
          </p>
        </div>
      </footer>
    </>
  );
}

export default App;
