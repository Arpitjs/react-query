import useTodos from "../hooks/useTodos";
import { Link } from "react-router-dom";

const Todos = () => {
  const onSuccess = (data) => {
    console.log('perform side effect after data fetching')
  }
  const onError = (error) => {
    console.log('perform side effect after error')
  }
  
  const { isLoading, data, isError,
     error, isFetching } = useTodos(onSuccess, onError)

  if (isLoading || isFetching) return <h2>loading...</h2>;
  if (isError) return <h2>{error.message}</h2>;
  return (
    <>
      <div>all the todos: </div>
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
