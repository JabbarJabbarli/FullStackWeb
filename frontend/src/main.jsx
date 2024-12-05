import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { routes } from "./routes/index.jsx"
import "../src/styles/reset.scss"
import "../src/styles/pages.scss"

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={routes} />
)
