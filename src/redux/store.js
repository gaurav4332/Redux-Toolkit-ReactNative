import { configureStore } from "@reduxjs/toolkit"; // Import the configureStore function from Redux Toolkit
import userSlice from "./slices/userSlice"; // Import the userSlice reducer

// Create and configure the Redux store
const store = configureStore({
    reducer: {
        users: userSlice, // Register the userSlice reducer under the 'users' key in the state
    }
});

export default store; // Export the configured store

/**
 * Explanation:
 * 1. configureStore:
 *    - The `configureStore` function from `@reduxjs/toolkit` is used to create a Redux store.
 *    - It simplifies the store setup process by automatically applying recommended middleware and enabling Redux DevTools.
 * 
 * 2. reducer:
 *    - The `reducer` property is an object where keys correspond to state slice names and values correspond to the slice reducers.
 *    - `users: userSlice`:
 *      - This registers the `userSlice` reducer under the `users` key in the state.
 *      - The state managed by `userSlice` will be accessible via `state.users`.
 * 
 * 3. Export default store:
 *    - The configured store is exported as the default export from this module.
 *    - This store will be provided to the React application through the `<Provider>` component from `react-redux`.
 */
