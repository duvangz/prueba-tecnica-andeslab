import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Vista1 from './Vista1.tsx';
import Vista2 from './Vista2.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [{ path: "vista-1", element: <Vista1 /> }, { path: "vista-2", element: <Vista2 /> }]
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
