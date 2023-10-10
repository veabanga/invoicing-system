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
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import PrivateRoute from './components/privateRoute';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import ProfileScreen from './screens/ProfileScreen';
import OrderScreen from './screens/OrderScreen';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path='/' index={true} element={<HomeScreen />} />
      <Route path='/cart' index={true} element={<CartScreen />} />
      <Route path='/login' index={true} element={<LoginScreen />} />
      <Route path='/register' index={true} element={<RegisterScreen />} />

      <Route path='' element={<PrivateRoute/>}>
        <Route path='/profile' index={true} element={<ProfileScreen />} />
        <Route path='/placeorder' index={true} element={<PlaceOrderScreen />} />
        <Route path='/order/:id' index={true} element={<OrderScreen />}/>

      </Route>
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
