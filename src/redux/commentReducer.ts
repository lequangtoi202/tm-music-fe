import { createSlice } from '@reduxjs/toolkit';

const commentSlice = createSlice({
  name: 'comment',
  initialState: false,
  reducers: {
    deleteComment: (state, action) => {
      return action.payload;
    },
  },
});

export const { deleteComment } = commentSlice.actions;

export default commentSlice.reducer;
