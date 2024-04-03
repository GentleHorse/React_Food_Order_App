export default function Cart() {
  return (
    <div className="cart">
      <h2>Your Cart</h2>
      <ul>
        <li className="cart-item">
          <p>Dish name A - 1 x $price</p>
          <div className="cart-item-actions">
            <button>-</button>1<button>+</button>
          </div>
        </li>

        <div className="cart-total">
            $53.97
        </div>

        <div className="modal-actions">
            <button>Close</button>
            <button>Go to Checkout</button>
        </div>
      </ul>
    </div>
  );
}
