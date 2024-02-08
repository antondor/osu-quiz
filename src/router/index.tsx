import { Navigate, RouteObject } from 'react-router-dom'
import App from '../App'
import React from 'react'
import Quiz from '../components/Quiz/Quiz'
import StartPage from '../components/StartPage/StartPage'

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <App />,

    children: [
      {
        index: true,
        element: <Navigate to='/start' replace />,
      },
      {
        path: 'start',
        element: <StartPage />,
      },
      {
        path: 'quiz',
        element: <Quiz />,
      },
    ],
  },
]
