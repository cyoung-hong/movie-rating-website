import { compose, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

const initialState = {};

const middleware = [thunk];

//var devEnv = (process.env.NODE_ENV === "development") ? devEnv = true : devEnv = false;

// const store = createStore(
//   initialState,
//   compose(
//       applyMiddleware(...middleware)
//   )

// );
