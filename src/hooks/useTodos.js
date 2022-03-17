import { useQuery } from "react-query";
import { request } from "../axios";

const fetchSuperHeroes = () => {
  return request({ url: '/todos', method: 'get' })
}

const useTodos = (onSuccess, onError) => {
  return useQuery("todos", fetchSuperHeroes, {
    onSuccess,
    onError,
  });
};

export default useTodos;
