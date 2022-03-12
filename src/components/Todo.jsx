import { useParams } from "react-router-dom";
import useTodo from "../hooks/useTodo";

const Todo = () => {
  const { id } = useParams();
  const { data } = useTodo(id);
  return (
    <>
      <div>Todo details</div>
      {data?.data.id} - {data?.data.title}
    </>
  );
};

export default Todo;
