import { Route, Routes, useNavigate } from "react-router-dom";
import Header from "./components/Header";
import Todos from "./components/Todos";
import { useDispatch, useSelector } from "react-redux";
import { setAddModal } from "./lib/redux-toolkit/slices/modal-slice";
import Login from "./pages/Login";

export default function App() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.todo);
  const navigate = useNavigate();
  const handleClick = () => {
    if (user) {
      dispatch(setAddModal());
    } else {
      navigate("/login");
    }
  };
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header handleClick={handleClick} />{" "}
              <main>
                <Todos />
              </main>
            </>
          }
        />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}
