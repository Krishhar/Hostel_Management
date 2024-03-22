import Login from './models/login';
import Home from './models/home';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import Rootlayout from './models/rootlayout';
import Status from './models/status';
import Aform from './models/form';
import Dashboard from './models/dashboard';
import Register from './models/register';
import AdvisorDashboard from './models/AdvisorDashboard';
import DeputyWardenDashboard from './models/DeputyWardenDashboard';
import ClassAdvisorHistory from './models/ClassAdvisorHistory';
import DeputyWardenHistory from './models/DeputyWardenHistory';
import OutpassApplicationsComponent from './models/dispayOutpass';


function App() {
  // Remove the definition of isUserSignedIn from here
  return (
      <router>
        <RouterProvider router={router}/>
      </router>
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
      {localStorage.getItem('role') === 'classAdvisor' && (
        <>
          <Route path='advisor' element={<AdvisorDashboard />} />
          <Route path='history' element={<ClassAdvisorHistory/>}/>
          <Route path='application' element={<OutpassApplicationsComponent/>}/>
          
        </>
      )}

      {/* Routes for 'deputyWarden' role */}
      {localStorage.getItem('role') === 'deputyWarden' && (
        <>
           
          <Route path='DeputyWarden' element={<DeputyWardenDashboard />} />
          <Route path='history' element={<DeputyWardenHistory/>}/>
          <Route path='application' element={<OutpassApplicationsComponent/>}/>
          
        </>
      )}
      <Route path='login' element={<Login />} />
      <Route path='register' element={<Register />} />
      
    </Route>
  )
);

export default App;