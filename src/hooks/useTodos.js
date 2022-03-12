import { useQuery } from "react-query";
import axios from "axios";

const fetchSuperHeroes = () =>
  axios.get("https://jsonplaceholder.typicode.com/todos");

const useTodos = (onSuccess, onError) => {
  return useQuery("super-heroes", fetchSuperHeroes, {
    onSuccess,
    onError,
  });
};

export default useTodos;
