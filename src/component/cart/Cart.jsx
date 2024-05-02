import { useContext } from "react";
import Modal from "../UI/Modal.jsx";
import CartContext from "../../store/CartContext.jsx";
import { currencyFormatter } from "../../util/formatting.js";
import Button from "../UI/Button.jsx";
import UserProgressContext from "../../store/UserProgressContext.jsx";
import CartItem from "./CartItem.jsx";

export default function Cart() {
  /**
   * CART CONTEXT & USER PROGRESS CONTEXT
   */
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  /**
   * TOTAL PRICE CALCULATION
   */
  const cartTotal = cartCtx.items.reduce((totalPrice, item) => {
    return totalPrice + item.price * item.quantity;
  }, 0);

  /**
   * CLOSE HANDLER
   */
  function handleCloseCart() {
    userProgressCtx.hideCart();
  }

  return (
    <Modal className="cart" open={userProgressCtx.progress === "cart"}>
      {/* TITLE */}
      <h2>Your Cart</h2>

      {/* MEALS */}
      <ul>
        {cartCtx.items.map((item) => (
          <CartItem
            key={item.id}
            name={item.name}
            quantity={item.quantity}
            price={item.price}
            onIncrease={() => cartCtx.addItem(item)}
            onDecrease={() => cartCtx.removeItem(item.id)}
          />
        ))}
      </ul>

      {/* TOTAL PRICE */}
      <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>

      {/* ACTION BUTTONS */}
      <p className="modal-actions">
        <Button textOnly onClick={handleCloseCart}>
          Close
        </Button>
        <Button onClick={handleCloseCart}>Go to Checkout</Button>
      </p>
    </Modal>
  );
}
