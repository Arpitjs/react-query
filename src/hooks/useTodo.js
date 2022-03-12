import { useQuery } from "react-query";
import axios from "axios";

const fetchTodo = (id) =>
  axios.get(`https://jsonplaceholder.typicode.com/todos/${id}`);

const useTodo = (id) => useQuery(["todo", id], () => fetchTodo(id));

export default useTodo;
