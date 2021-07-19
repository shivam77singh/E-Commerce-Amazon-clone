import { db } from "../Firebase.jsx";
export const initialState = {
  basket: [],
  userId: "",
  userEmail: "",
  userName: "",
  user: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM_TO_BASKET":
      return {
        ...state,
        basket: [...state.basket, action.item],
      };
    case "DELETE_ITEM_FROM_BASKET":
      return {
        ...state,
        basket: [...state.basket].filter((item) => {
          return action.id !== item.id;
        }),
      };
    case "SET_COUNT_OF_ITEM":
      const arr = [...state.basket];
      arr.forEach((item) => {
        if (item.id === action.id) {
          item.count = action.count;
        }
      });
      return {
        ...state,
        basket: arr,
      };
    case "SET_USER":
      console.log("user added to local successfully", action.userName);
      return {
        ...state,
        userId: action.userId,
        userName: action.userName,
        userEmail: action.userEmail,
        user: action.user,
        basket: action.basket,
      };
    default:
      return state;
  }
};
export default reducer;
