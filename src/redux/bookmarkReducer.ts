import { createSlice } from '@reduxjs/toolkit';
import { Bookmark } from '../model/Bookmark';

const bookmarkSlice = createSlice({
  name: 'bookmarks',
  initialState: [] as Bookmark[],
  reducers: {
    setBookmarks: (state, action) => {
      return action.payload;
    },
    addBookmark: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { setBookmarks, addBookmark } = bookmarkSlice.actions;

export default bookmarkSlice.reducer;
