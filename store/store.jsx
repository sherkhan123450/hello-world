import { configureStore } from "@reduxjs/toolkit";
import aboutReducer from "./slices/aboutSlice";
import cartReducer from "./slices/cartSlice";
import foodItemsReducer from "./slices/getSetFoodItemsSlice";
import createFoodReducer from "./slices/createFoodSlice";
import adminReducer from "./slices/adminSlice";
import orderReducer from "./slices/orderSlice";
import authReducer from "./slices/authSlice";
import profileReducer from "./slices/profileSlice";
import contactReducer from "./slices/contactSlice";
import categoryReducer from "./slices/getSetFoodCategorySlice";
import usersReducer from "./slices/getUsersSlice";
import siteReducer from "./slices/generalSlice";
import packageReducer from "./slices/packageSlice";
import currendOrderReducer from "./slices/currentOrderSlice";
import previousOrderReducer from "./slices/previousOrderSlice";
import UtilesReducer from "./slices/utilsSlice";
import reservationReducer from "./slices/reservationSlice";

export const store = configureStore({
  reducer: {
    utiles: UtilesReducer,
    reservation: reservationReducer,
    cOrders: currendOrderReducer,
    pOrders: previousOrderReducer,
    package: packageReducer,
    site: siteReducer,
    about: aboutReducer,
    foodItems: foodItemsReducer,
    admin: adminReducer,
    orders: orderReducer,
    cart: cartReducer,
    foodItem: createFoodReducer,
    auth: authReducer,
    profile: profileReducer,
    contact: contactReducer,
    categories: categoryReducer,
    users: usersReducer, // Add the categoryReducer here
  },
});
