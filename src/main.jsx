import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import { Toaster } from "sonner";
import { Provider } from "react-redux";
import { store } from "./lib/redux-toolkit/store.js";
import AddModal from "./components/AddModal.jsx";
import { BrowserRouter, Routes } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <>
    <BrowserRouter>
      <Provider store={store}>
          <App />
          <AddModal />
      </Provider>
    </BrowserRouter>
    <Toaster position="top-right" richColors />
  </>
);
