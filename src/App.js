import Login from './models/login';
import Home from './models/home';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import Rootlayout from './models/rootlayout';
import Status from './models/status';
import Aform from './models/form';
import Dashboard from './models/dashboard';
import Register from './models/register';
import { Box } from '@mui/material';
import AdvisorDashboard from './models/AdvisorDashboard';
import DeputyWardenDashboard from './models/DeputyWardenDashboard';


function App() {
  // Remove the definition of isUserSignedIn from here
  return (
    <Box sx={{backgroundColor:'rgba(31, 38, 46, 0.5)'}}>
      <router>
        <RouterProvider router={router}/>
      </router>
    </Box>
  );
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Rootlayout />}>
      <Route index element={<Home />} />

      {/* Common routes for all users */}
      <Route path='form' element={<Aform />} />
      <Route path='dashboard' element={<Dashboard />} />
      <Route path='status' element={<Status />} />

      {/* Routes for 'advisor' role */}
      {localStorage.getItem('role') === 'class Advisor' && (
        <>
          <Route path='Advisor' element={<AdvisorDashboard />} />
          
        </>
      )}

      {/* Routes for 'deputyWarden' role */}
      {localStorage.getItem('role') === 'deputy Warden' && (
        <>
          <Route path='DeputyWarden' element={<DeputyWardenDashboard />} />
          
        </>
      )}

      <Route path='login' element={<Login />} />
      <Route path='register' element={<Register />} />
    </Route>
  )
);

export default App;

