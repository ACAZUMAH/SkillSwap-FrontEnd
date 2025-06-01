import React from 'react'
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import { routes } from './routes'

export const AppRouter: React.FC = () => {

    const routers = createBrowserRouter([
        {
            element: <Outlet />,
            children: [...routes]
        }
    ])

  return (
    <RouterProvider router={routers}/>
  )
}
