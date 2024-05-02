import Cart from "./component/cart/Cart.jsx";
import Checkout from "./component/cart/Checkout.jsx";
import Header from "./component/header/Header.jsx";
import Meals from "./component/meals/Meals.jsx";
import { CartContextProvider } from "./store/CartContext.jsx";
import { UserProgressContextProvider } from "./store/UserProgressContext.jsx";

function App() {
  return (
    <UserProgressContextProvider>
      <CartContextProvider>
        <Header />
        <Meals />
        <Cart />
        <Checkout />
      </CartContextProvider>
    </UserProgressContextProvider>
  );
}

export default App;
