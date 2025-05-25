import { toast } from "sonner";
import { getTodos } from "../request";
import Loading from "./Loading";
import Todo from "./Todo";
import { setData, setLoading } from "../lib/redux-toolkit/slices/todo-slice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

export default function Todos() {
  const { data, filter, loading, error } = useSelector((state) => state.todo);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setLoading(true));
    getTodos(filter)
      .then(
        (res) => {
          dispatch(setData(res));
        },
        ({ message }) => {
          toast.error(message);
        }
      )
      .finally(() => {
        dispatch(setLoading(false));
      });
  }, [JSON.stringify(filter)]);

  if (loading) {
    return (
      <div className="container mx-auto px-5 flex justify-center py-10">
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-5 flex justify-center py-10">
        <p>{error}</p>
      </div>
    );
  }

  if (data.lenght === 0) {
    return (
      <div className="container mx-auto px-5 flex justify-center py-10">
        <p>No data</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5 container mx-auto px-5 pb-10 pt-[116px]">
      {data.map(({ completed, title, id, priority }) => {
        return (
          <Todo
            completed={completed}
            key={id}
            title={title}
            priority={priority}
            id={id}
          />
        );
      })}
    </div>
  );
}
