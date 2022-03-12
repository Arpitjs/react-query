import { useQuery } from "react-query";
import axios from "axios";

const fetchPosts = () => axios
.get("https://jsonplaceholder.typicode.com/posts");


const fetchComments = () => axios
.get("https://jsonplaceholder.typicode.com/comments");


const Posts = () => {
  const onSuccess = (data) => {
    // console.log(data)
    console.log('perform side effect after data fetching')
  }
  const onError = (error) => {
    console.log('perform side effect after error')
  }
  
  const { isLoading, data: posts, isError, error, isFetching } = useQuery(
    "super-heroes",
    fetchPosts,
    { onSuccess, onError, select: posts => {
     const filtered =  posts.data.filter(post => post.title.startsWith('q'))
     return filtered.map(obj => obj.title);
    } }
  );

  const { data: comments, refetch } = useQuery('comments', fetchComments, {
    enabled: false, 
    select: comments => comments.data.filter(comment => comment.id < 10)
    .map(c => c.name)
  }); 

  if (isLoading || isFetching) return <h2>loading...</h2>;
  if (isError) return <h2>{error.message}</h2>;
  return (
    <>
      <h2>qute posts</h2>
      { posts?.map(name => <div key={name}>{name}</div>)}


      <div style={{ marginBottom: '50px'}}></div>

      <h2>Comments</h2>
      <button onClick={refetch}>fetch comments</button>
      { comments?.map(name=> <div key={name}>{name}</div>)}
    </>
  );
};

export default Posts;
