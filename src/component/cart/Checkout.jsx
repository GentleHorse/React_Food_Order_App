import { useContext } from "react";
import Modal from "../UI/Modal.jsx";
import CartContext from "../../store/CartContext.jsx";
import { currencyFormatter } from "../../util/formatting.js";
import Input from "../UI/Input.jsx";
import Button from "../UI/Button.jsx";
import UserProgressContext from "../../store/UserProgressContext.jsx";
import useHttp from "../../hook/useHttp.js";
import Error from "../error/Error.jsx";

/**
 * AVOID INFITNITE LOOP
 *
 * If "requestConfig" is created inside the component,
 * even thought it's an empty object,
 * it's newly created everytime the component re-rendered.
 * This cause an infinite loop,
 * because it's one of the depedencies of useCallback in the useHttp hook.
 * Thus, it's needed to be defined outside the component.
 */
const requestConfig = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

/**
 * COMPONENT BODY
 */
export default function Checkout() {
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
  function handleClose() {
    userProgressCtx.hideCheckout();
  }

  /**
   * CUSTOM HTTP HOOK
   */
  const {
    data,
    isLoading: isSending,
    error,
    sendRequest,
    clearData
  } = useHttp("http://localhost:3000/orders", requestConfig);

  /**
   * FORM SUBMIT HANDLER
   */
  function handleSubmit(event) {
    event.preventDefault(); // Cancel the default webpage submission behaviour

    /**
     * Handle the input data
     */
    const fd = new FormData(event.target);
    const customerData = Object.fromEntries(fd.entries()); // Returns key-value pairs

    /**
     * Send POST http request
     */
    sendRequest(
      JSON.stringify({
        order: {
          items: cartCtx.items,
          customer: customerData,
        },
      })
    );
  }

  /**
   * FINISH SUBMISSION HANDLER
   */
  function handleFinish() {
    userProgressCtx.hideCheckout();
    cartCtx.clearCart();
    clearData();
  }

  /**
   * SHOW BUTTONS CONDITIONALLY
   */
  let actions = (
    <>
      <Button type="button" textOnly onClick={handleClose}>
        Close
      </Button>
      <Button>Submit Order</Button>
    </>
  );

  if (isSending) {
    actions = <span>Sending order data .....</span>;
  }

  /**
   * SHOW SUCCESS MESSAGE
   */
  if (data && !error) {
    return (
      <Modal
        open={userProgressCtx.progress === "checkout"}
        onClose={handleClose}
      >
        <h2>Success!</h2>
        <p>Your order was submitted successfully.</p>
        <p>
          We will get back to you with more details with email within the next
          few minutes.
        </p>
        <p className="modal-actions">
          <Button onClick={handleFinish}>Okay</Button>
        </p>
      </Modal>
    );
  }

  return (
    <Modal open={userProgressCtx.progress === "checkout"} onClose={handleClose}>
      <form onSubmit={handleSubmit}>
        <h2>Checkout</h2>
        <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>

        <Input label="Full Name" type="text" id="name" />
        <Input label="E-Mail Address" type="email" id="email" />
        <Input label="Street" type="text" id="street" />

        <div className="control-row">
          <Input label="Postal Code" type="text" id="postal-code" />
          <Input label="City" type="text" id="city" />
        </div>

        {error && <Error title="Failed to submit order" message={error} />}

        <p className="modal-actions">{actions}</p>
      </form>
    </Modal>
  );
}
