import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
  name: 'app',
  initialState: {
    user: {},
  },
  reducers: {
    setUser: (state, action) => ({ ...state, user: action.payload }),
  },
});

export default appSlice;
