import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Home from './components/Home';
import Posts from './components/Posts';
import './App.css'
import { QueryClientProvider, QueryClient } from 'react-query'
import {ReactQueryDevtools } from 'react-query/devtools'
import Todos from './components/Todos';
import Todo from './components/Todo';
import { DynamicParallelPage } from './components/DynamicParallel';
import DependentQueries from './components/DependentQueries';
import PaginatedQueries from './components/PaginatedQueries';
import InfiniteQueries from './components/InfiniteQueries';

const queryClient = new QueryClient();
function App() {
  return (
 <QueryClientProvider client={queryClient}>
      <Router>
      <nav>
        <ul>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/super'>Super Heroes</Link>
          </li>
          <li>
            <Link to='/todos'>All Todos</Link>
          </li>
          <li>
            <Link to='/dynamic-parallel'>Dynamic Parallel Queries</Link>
          </li>
          <li>
            <Link to='/dependent'>Dependent Queries</Link>
          </li>
          <li>
            <Link to='/pagination'>pagination Queries</Link>
          </li>
          <li>
            <Link to='/infinite'>infinite Queries</Link>
          </li>
        </ul>
      </nav>
      <Routes>
      <Route path='/' element={<Home />} />
        <Route path='/super' element={<Posts />} />  
        <Route path='/todo/:id' element={<Todo />} />
         <Route path='/todos' element={<Todos />}/>
         <Route path='/dynamic-parallel'
          element={<DynamicParallelPage ids={[1, 3]}/>} />
         <Route path='/dependent'
          element={<DependentQueries email="arpited7@gmail.com" />} />
            <Route path='/pagination'
          element={<PaginatedQueries />} />
            <Route path='/infinite'
          element={<InfiniteQueries />} />
      </Routes>
  </Router>
  <ReactQueryDevtools initialIsOpen={false} position="bottom-right"/>
 </QueryClientProvider>
  );
}

export default App;
