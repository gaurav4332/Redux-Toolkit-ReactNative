// Import necessary functions and libraries
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import UserReducer from "../slice/UserSlice"; // Import your user slice
import AsyncStorage from "@react-native-async-storage/async-storage"; // Storage for persisting Redux state in React Native

// These are specific imports for redux-persist
import persistReducer from "redux-persist/es/persistReducer"; // To wrap the root reducer with persistence
import { persistStore } from "redux-persist"; // To create a persisted store for saving and rehydrating state

// Step 1: Combine multiple reducers into a single root reducer
// Even though you only have one reducer now (`UserReducer`), using combineReducers makes it easy to scale in the future
const rootReducer = combineReducers({
  users: UserReducer, // State will be available under state.users
});

// Step 2: Configuration object for redux-persist
const persistConfig = {
  key: "root",                  // Key for the root level of the persisted state
  storage: AsyncStorage,       // Define storage engine (AsyncStorage for React Native)
};

// Step 3: Wrap the root reducer with persistReducer
// This enhancer enables automatic save/load of state from storage
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Step 4: Create the Redux store using configureStore
const store = configureStore({
  reducer: persistedReducer,   // Use the persisted reducer instead of plain rootReducer
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable check for redux-persist compatibility
    }),
});

// Step 5: Create a persisted store instance
// This is used in your app entry point to persist and rehydrate Redux state
const persistedStore = persistStore(store);

// Step 6: Export the store and persistedStore to use in your app
export { store, persistedStore };
 