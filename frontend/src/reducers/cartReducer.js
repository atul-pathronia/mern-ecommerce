import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  SAVE_SHIPPING_INFO,
  ORDERED_PLACED_CART_NIL,
} from "../constants/cartConstant";

export const cartReducer = (
  state = { cartItems: [], shippingInfo: {} },
  action
) => {
  switch (action.type) {
    case ADD_TO_CART:
      // SAVING ACTION PAYLOAD AS ITEM
      const item = action.payload;
      // console.log(item);

      //   CHECKING IF ITEM ALREADY EXIST IN CARTITEM ARRAY
      const isItemAlreadyExist = state.cartItems.find(
        (existingItem) => existingItem.product === item.product
      );
      // console.log(isItemAlreadyExist);
      // IF ITEM ALREADY EXIST THEN REPLACING THE ITEM WITH UPDATED QUANTITY IF ANY
      if (isItemAlreadyExist) {
        return {
          ...state,
          cartItems: state.cartItems.map((existingItem) =>
            existingItem.product === isItemAlreadyExist.product
              ? item
              : existingItem
          ),
        };
      } else {
        // IF ITEM DOES NOT EXIST THEN RETURNING THE CART WITH ANY ALREADY EXISTING ITEMS IN THE CART AND ADDING THE NEW ONE
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }

    case REMOVE_CART_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((cartItem) => {
          return cartItem.product !== action.payload;
        }),
      };

    case ORDERED_PLACED_CART_NIL:
      return {
        ...state,
        cartItems: [],
      };

    case SAVE_SHIPPING_INFO:
      return {
        ...state,
        shippingInfo: action.payload,
      };

    default:
      return state;
  }
};
