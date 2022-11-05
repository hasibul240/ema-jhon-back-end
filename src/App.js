import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Main from './components/Main/Main';
import About from './components/About/About';
import Shop from './components/Shop/Shop';
import Orders from './components/Orders/Orders';
import Inventory from './components/Inventory/Inventory';
import { ProductsAndCartLoader } from './components/Loaders/ProductsAndCartLoader';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import Shipping from './components/Shipping/Shipping';
import PriveteRoute from './components/Routes/PriveteRoute';


function App() {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <Main></Main>,
            children: [
                {
                    path: '/',
                    element: <Shop />
                },
                {
                    path: '/shop',
                    element: <Shop />
                },
                {
                    path: 'orders',
                    loader: ProductsAndCartLoader,
                    element: <Orders />
                },
                {
                    path: 'inventory',
                    element: <PriveteRoute><Inventory /></PriveteRoute>
                },
                {
                    path: '/shipping',
                    element: <PriveteRoute><Shipping /></PriveteRoute>
                },
                {
                    path: 'about',
                    element: <About />
                },
                {
                    path: '/login',
                    element: <Login />
                },
                {
                    path: '/signup',
                    element: <SignUp />
                }
            ]
        },

    ]);

    return (
        <div>
            <RouterProvider router={router}></RouterProvider>
        </div>
    );
}

export default App;