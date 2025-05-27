import { useNavigate } from "react-router-dom";
import { login } from "../request";
import { authValidation } from "../lib/utils";
import { toast } from "sonner";
import { setToken, setUser } from "../lib/redux-toolkit/slices/todo-slice";
import { useDispatch } from "react-redux";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const sendingData = {
      username: formData.get("username"),
      password: formData.get("password"),
    };

    const result = authValidation(sendingData);
    if (result) {
      const { message, target } = result;
      e.target[target]?.focus();
      toast.warning(message);
    } else {
      login(sendingData)
        .then(
          (res) => {
            dispatch(setUser(res));
            dispatch(setToken(res.access_token));
            toast.success("Malumotingiz Muvafaqqiyatli Saqlandi✅");
            navigate("/");
          },
          ({ message }) => {
            toast.error(message);
          }
        )
        .finally(() => {});
    }
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Kirish</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Foydalanuvchi nomi
            </label>
            <input
              id="username"
              name="username"
              type="text"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Foydalanuvchi nomingizni kiriting"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Parol
            </label>
            <input
              id="password"
              name="password"
              type="password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Parolingizni kiriting"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Kirish
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
