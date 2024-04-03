import Cart from "./component/cart/Cart.jsx";
import Header from "./component/header/Header.jsx";
import Meals from "./component/meals/Meals.jsx";
import Modal from "./component/modal/Modal.jsx";

function App() {
  return (
    <main>
      <Header />
      <Meals />
      
      <Modal>
        <Cart />
      </Modal>
    </main>
  );
}

export default App;
