import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { persistStore, persistCombineReducers } from "redux-persist";
import AsyncStorage from "@react-native-community/async-storage";

import { leaders } from "./leaders";
import { dishes } from "./dishes";
import { comments } from "./comments";
import { promotions } from "./promotions";
import { favorites } from "./favorites";
import { login } from "./login";

// export const ConfigureStore = () => {
//   const store = createStore(
//     combineReducers({ leaders, dishes, comments, promotions, favorites, login }),
//     applyMiddleware(thunk, logger)
//   );
//   return store;
// };

const config = { key: "root", storage: AsyncStorage, debug: true };

export const ConfigureStore = () => {
  const store = createStore(
    persistCombineReducers(config, {
      leaders,
      dishes,
      comments,
      promotions,
      favorites,
      login,
    }),
    applyMiddleware(thunk, logger)
  );
  const persistor = persistStore(store);
  return { persistor, store };
};
