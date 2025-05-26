import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  loading: false,
  error: null,
  filter: {
    priority: "",
  },
  user: JSON.parse(localStorage.getItem("user")),
  token:JSON.parse(localStorage.getItem("token"))
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
    setUser(state, { payload }) {
      state.user = payload;
      localStorage.setItem("user", JSON.stringify(payload));
    },
    setToken(state,{payload}){
      state.token=payload
      localStorage.setItem("token",JSON.stringify(payload))
    }
  },
});

export const { setData, setLoading, setFilter, addData, setUser,setToken } =
  todoSlice.actions;

export default todoSlice.reducer;
