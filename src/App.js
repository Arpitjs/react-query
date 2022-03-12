import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Home from './components/Home';
import Posts from './components/Posts';
import './App.css'
import { QueryClientProvider, QueryClient } from 'react-query'
import {ReactQueryDevtools } from 'react-query/devtools'
import Todos from './components/Todos';
import Todo from './components/Todo';

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
        </ul>
      </nav>
      <Routes>
      <Route path='/' element={<Home />} />
        <Route path='/super' element={<Posts />} />  
        <Route path='/todo/:id' element={<Todo />} />
         <Route path='/todos' element={<Todos />} />
      </Routes>
  </Router>
  <ReactQueryDevtools initialIsOpen={false} position="bottom-right"/>
 </QueryClientProvider>
  );
}

export default App;
