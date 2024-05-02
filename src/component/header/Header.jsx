import { useContext } from "react";
import logoImg from "../../assets/logo.jpg";
import Button from "../UI/Button.jsx";
import CartContext from "../../store/CartContext.jsx";
import UserProgressContext from "../../store/UserProgressContext.jsx";

export default function Header() {
  /**
   * CART CONTEXT & USER PROGRESS CONTEXT
   */
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  /**
   * TOTAL ITEM NUMBER CALCULATION
   */
  // reduce function reduces values in the array to a single value
  const totalCartItems = cartCtx.items.reduce((totalNumberOfItems, item) => {
    return totalNumberOfItems + item.quantity;
  }, 0);

  /**
   * SHOW CART HANDLER
   */
  function handleShowCart() {
    userProgressCtx.showCart();
  }

  return (
    <header id="main-header">
      <div id="title">
        <img src={logoImg} alt="A restaurant" />
        <h1>ReactFood</h1>
      </div>
      <nav>
        <Button textOnly onClick={handleShowCart}>
          Cart ({totalCartItems})
        </Button>
      </nav>
    </header>
  );
}
