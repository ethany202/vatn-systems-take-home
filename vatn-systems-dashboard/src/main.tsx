import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Layout from './components/layout/Layout.tsx';
import UploadCSV from './pages/upload/UploadCSV.tsx';
import ManagePlots from './pages/plots/ManagePlots.tsx';


const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout/>,
    children: [
      {
        // Add the two child paths
        index: true,
        path: '/upload',
        element: <UploadCSV/>
      },
      {
        path: '/plots',
        element: <ManagePlots/>
      }
    ]
  }
]) 

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
