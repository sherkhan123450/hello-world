import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  readySite: false,
};

const siteSlice = createSlice({
  name: 'site',
  initialState,
  reducers: {
    setReadySite: (state, action) => {
      let value = action.payload; // This value will be passed when dispatching the action
      state.readySite = value;    // Update the state with the new value
    },
  },
});

export const { setReadySite } = siteSlice.actions;

export default siteSlice.reducer;
