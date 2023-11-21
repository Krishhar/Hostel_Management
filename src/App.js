import Login from './models/login';
import Home from './models/home';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import Rootlayout from './models/rootlayout';
import Status from './models/status';
import Aform from './models/form';
import Dashboard from './models/dashboard';
import Register from './models/register';
import { Box } from '@mui/material';

function App() {
  // Remove the definition of isUserSignedIn from here
  return (
    <Box sx={{backgroundColor:'rgba(31, 38, 46, 0.5)',overflowY: 'hidden', maxHeight: '100vh'}}>
      <router>
        <RouterProvider router={router}/>
      </router>
    </Box>
  );
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Rootlayout/>}>
      <Route index element={<Home/>}/>
      
      {(() => {
        const isUserSignedIn = !!localStorage.getItem('token');
        return isUserSignedIn && (
          <>
            <Route path='/' element={<Home/>}/>
            <Route path='form' element={<Aform/>}/>
            <Route path='dashboard' element={<Dashboard/>}/> 
            <Route path='status' element={<Status/>}/>
          </>
        );
      })()}
      
      <Route path='login' element={<Login/>}/>
      <Route path='register' element={<Register/>}/>
    </Route>
  )
)

export default App;

