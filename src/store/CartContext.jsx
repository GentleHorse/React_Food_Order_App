import { createContext, useReducer } from "react";

/**
 * CONTEXT OBJECT
 */
const CartContext = createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {},
  clearCart: () => {},
});

/**
 * REDUCER FUNCTION
 */
function cartReducer(state, action) {
  /**
   * ADD AN ITEM
   */
  if (action.type === "ADD_ITEM") {
    // Check if the added item already exists (A) in the cart or not (B)
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );

    // Copy the cart items
    const updatedItems = [...state.items];

    // findIndex() returns "-1" when it couldn't find one
    if (existingCartItemIndex > -1) {
      // if the item exists ------------------------(A)
      const existingItem = state.items[existingCartItemIndex];

      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity + 1,
      };

      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      // if the item doesn't exist  ------------------------(B)
      updatedItems.push({
        ...action.item,
        quantity: 1,
      });
    }

    // Copy the whole state and only update the "items" array
    return { ...state, items: updatedItems };
  }

  /**
   * REMOVE AN ITEM
   */
  if (action.type === "REMOVE_ITEM") {
    // Find the targent item
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );

    // Copy the cart items
    const updatedItems = [...state.items];

    // The existing cart item
    const existingItem = state.items[existingCartItemIndex];

    // Check the target item quality is 1 or not
    if (existingItem.quantity === 1) {
      updatedItems.splice(existingCartItemIndex, 1);
    } else {
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity - 1,
      };

      updatedItems[existingCartItemIndex] = updatedItem;
    }

    return { ...state, items: updatedItems };
  }

  /**
   * CLEAR THE CART ITEMS
   */
  if (action.type === "CLEAR_CART") {
    return { ...state, items: [] };
  }

  // if nothing changed, return the original state
  return state;
}

/**
 * CONTEXT PROVIDER
 */
export function CartContextProvider({ children }) {
  // Set up reducer
  const [cart, dispatchCartAction] = useReducer(cartReducer, { items: [] });

  // The add & remove item functions
  function addItem(item) {
    dispatchCartAction({ type: "ADD_ITEM", item: item });
  }
  function removeItem(id) {
    dispatchCartAction({ type: "REMOVE_ITEM", id: id });
  }
  function clearCart() {
    dispatchCartAction({ type: "CLEAR_CART" });
  }

  // Cart context values
  const cartContext = {
    items: cart.items,
    addItem: addItem,
    removeItem: removeItem,
    clearCart: clearCart,
  };

  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  );
}

export default CartContext;
