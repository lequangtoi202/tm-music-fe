import { createSlice } from '@reduxjs/toolkit';

const errorSlice = createSlice({
  name: 'error',
  initialState: null,
  reducers: {
    setError: (state, action) => {
      return action.payload;
    },
    clearError: (state) => {
      return null;
    },
  },
});

export const { setError, clearError } = errorSlice.actions;

export default errorSlice.reducer;
