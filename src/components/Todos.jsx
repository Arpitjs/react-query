import useTodos from "../hooks/useTodos";
import { Link } from "react-router-dom";
import { useState } from 'react'
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

const Todos = () => {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')

  const onSuccess = (data) => {
    console.log('perform side effect after data fetching')
  }
  const onError = (error) => {
    console.log('perform side effect after error')
  }

  function handleAddHeroClick() {
    const hero = { title, body }
    mutate(hero)
  } 

  function addTodo(post) {
    return axios
    .post('https://jsonplaceholder.typicode.com/posts', post);
  }
  
  //mutation
  const queryClient = useQueryClient();
  const { mutate } = useMutation(addTodo, {
   // onSuccess: () => queryClient.invalidateQueries('todos') will make additonal network request
  //  onSuccess: (data) => queryClient.setQueryData('todo', oldQueryData => {
  //    return {
  //     ...oldQueryData,
  //     data: [...oldQueryData.data, data.data] 
  //    }
  //  }) 
  onMutate: async (newHero) => {
   await queryClient.cancelQueries('todos');
   const previousData = queryClient.getQueryData('todos');
   queryClient.setQueryData('todo', oldQueryData => {
       return {
        ...oldQueryData,
        data: [...oldQueryData.data,
           { id: oldQueryData?.data.length + 1, ...newHero } ] 
       }
     }) 
     return {
       previousData
     }
  },
  onError: (_error, _data, context) => {
    queryClient.setQueryData('todos', context.previousData);
  },
  onSettled: () => {
    queryClient.invalidateQueries('todos');
  }
  });

  const { isLoading, data, isError,
     error, isFetching } = useTodos(onSuccess, onError)

  if (isLoading || isFetching) return <h2>loading...</h2>;
  if (isError) return <h2>{error.message}</h2>;
  return (
    <>
      <div>all the todos: </div>
      <br />
      <div>
        <input
          type='text'
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <input
          type='text'
          value={body}
          onChange={e => setBody(e.target.value)}
        />
        <button onClick={handleAddHeroClick}>Add Todo</button>
      </div>
      <br />
        {data?.data.map((todo) => {
        return <div key={todo.id}>
            <Link to={`/todo/${todo.id}`}>
            <p style={{ padding: '2px' }}> {todo.title} </p>
            </Link>
        </div>;
      })}
    </>
  );
};

export default Todos;
