import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productReducer,
  productDetailsReducer,
  adminCreateProductReducer,
  adminDeleteProductReducer,
} from "./reducers/productReducer";
import {
  forgotPasswordReducer,
  profileUpdateReducer,
  userReducer,
  adminUserDetailsReducer,
  adminAllUsersReducer,
} from "./reducers/userReducer";
import { cartReducer } from "./reducers/cartReducer";
import {
  adminAllOrdersReducer,
  adminOrderReducer,
  myOrdersDetailsReducer,
  myOrdersReducer,
  newOrderReducer,
} from "./reducers/orderReducer";
import {
  myReviewsReducer,
  newReviewReducer,
  updateMyReviewwReducer,
} from "./reducers/reviewReducer";
// import { adminGetAllUsers } from "./actions/userAction";
// import { updateUserProfile } from "./actions/userAction";

const reducer = combineReducers({
  products: productReducer,
  product: productDetailsReducer,
  user: userReducer,
  profile: profileUpdateReducer,
  forgotPass: forgotPasswordReducer,
  cart: cartReducer,
  newOrder: newOrderReducer,
  myOrders: myOrdersReducer,
  orderDetails: myOrdersDetailsReducer,
  newReivew: newReviewReducer,
  getAllReviewsOfUser: myReviewsReducer,
  updateMyReview: updateMyReviewwReducer,
  newProduct: adminCreateProductReducer,
  deleteProduct: adminDeleteProductReducer,
  adminAllOrders: adminAllOrdersReducer,
  adminSingleOrder: adminOrderReducer,
  adminAllUsers: adminAllUsersReducer,
  adminSingleUser: adminUserDetailsReducer,
});

const initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : {},
  },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
