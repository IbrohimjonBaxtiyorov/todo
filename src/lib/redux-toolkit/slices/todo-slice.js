import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  loading: false,
  error: null,
  filter: {
    priority: "",
  },
  user:null
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    setData(state, { payload }) {
      state.data = payload;
    },
    addData(state, { payload }) {
      state.data.unshift(payload);
    },
    setLoading(state, { payload }) {
      state.loading = payload;
    },
    setFilter(state, { payload }) {
      state.filter = payload;
    },
    setUser(state ,{payload}){
      
    }
  },
});

export const { setData, setLoading, setFilter, addData } = todoSlice.actions;

export default todoSlice.reducer;
