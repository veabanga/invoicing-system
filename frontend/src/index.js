import React from 'react';
import ReactDOM from 'react-dom/client';
import { 
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
 } from 'react-router-dom'
import './assets/styles/bootstrap.custom.css'
// import 'bootstrap/dist/css/bootstrap.min.css' --> default bootstrap
import './assets/styles/index.css'
import { Provider } from 'react-redux';
import App from './App';
import store from './store';
import reportWebVitals from './reportWebVitals';
import HomeScreen from './screens/HomeScreen';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path='/' index={true} element={<HomeScreen />} />
    </Route>
  )
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
