import { createSlice } from '@reduxjs/toolkit';

const successSlice = createSlice({
  name: 'success',
  initialState: null,
  reducers: {
    setSuccess: (state, action) => {
      return action.payload;
    },
    clearSuccess: (state) => {
      return null;
    },
  },
});

export const { setSuccess, clearSuccess } = successSlice.actions;

export default successSlice.reducer;
