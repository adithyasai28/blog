import Register from "./components/forms/Register";
import Signin from "./components/forms/Signin";
import Header from "./components/header/Header";
import Home from "./components/home/Home";
import Root from "./components/Root";
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
 const App = () => {
  let router = createBrowserRouter([
    {
      path: '',
      element: <Root/>,
      children: [
        {
          path: 'signin',
          element: <Signin/>,
        },
        {
          path: 'signup',
          element: <Register/>,
        },
      ]
    }
  ])
  return (
    <div>
      <RouterProvider router={router} /> 
    </div>
  );
}
export default App;
