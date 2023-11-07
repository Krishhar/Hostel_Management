
import Login from './models/login';
import Home from './models/home';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import Rootlayout from './models/rootlayout';
import Status from './models/status';
import Aform from './models/form';
import Dashboard from './models/dashboard';
import Register from './models/register';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Rootlayout/>}>
      <Route index element ={<Home/>}/>
      <Route path='status' element = {<Status/>}/>
      <Route path='form' element = {<Aform/>}/>
      <Route path='dashboard' element = {<Dashboard/>}/>
      <Route path='login' element = {<Login/>}/>
      <Route path='register' element = {<Register/>}/>
      

    </Route>
  )
)

function App() {
  return (
    <router>
    <RouterProvider router={router}/>
    </router>
  );
}

export default App;
