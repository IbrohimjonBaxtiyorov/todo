import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  loading: false,
  error: null,
  filter: {
    priority: "",
  },
  user: JSON.parse(localStorage.getItem("user")),
  token: JSON.parse(localStorage.getItem("token")),
  diagnosticData: [],
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
    setToken(state, { payload }) {
      state.token = payload;
      localStorage.setItem("token", JSON.stringify(payload));
    },
    setDiagnostic(state, { payload }) {
      state.diagnosticData = payload;
    },
    setLogOut(state, { payload }) {
      (state.user = payload),
        (state.token = payload),
        localStorage.removeItem("user"),
        localStorage.removeItem("token");
    },
    setDeletetodo(state, { payload }) {
      state.data = state.data.filter((todo) => todo.id !== payload);
    },
  },
});

export const {
  setData,
  setLoading,
  setFilter,
  addData,
  setUser,
  setToken,
  setDiagnostic,
  setLogOut,
  setDeletetodo,
} = todoSlice.actions;

export default todoSlice.reducer;
