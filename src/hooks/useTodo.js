import { useQuery, useQueryClient } from "react-query";
import axios from "axios";

const fetchTodo = (id) =>
  axios.get(`https://jsonplaceholder.typicode.com/todos/${id}`);

const useTodo = (id) => {
  const queryClient = useQueryClient();
  return useQuery(["todo", id], () => fetchTodo(id),  {
    initialData: () => {
      const todo = queryClient
        .getQueryData('todos')
        ?.data?.find(todo => todo.id === parseInt(id))
      if (todo) {
        return { data: todo }
      } else {
        return undefined
      }
    }
  })
};

export default useTodo;
