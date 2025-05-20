import {createSlice} from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
  },
  reducers: {
    addUser: (state, action) => {
      // Correct way to add to array using Immer
      state.users.push(action.payload);
    },
    updateUser: (state, action) => {
      // Correct way to update an item in array
      const { index, data } = action.payload;
      state.users[index] = data;
    },
    deleteUser: (state, action) => {
      // Correct way to remove an item from array
      state.users.splice(action.payload, 1);
    },
  },
});

export const {addUser, updateUser, deleteUser} = userSlice.actions;
export default userSlice.reducer;
