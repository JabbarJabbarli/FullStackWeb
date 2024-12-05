import React from 'react'
import HomePage from '../pages/HomePage'
import AccountLayout from '../layouts/AccountLayout'
import { createBrowserRouter } from 'react-router-dom'


export const routes = createBrowserRouter([

    {
        path: "/",
        element: <HomePage />
    },

    {
        path: "/",
        element: <AccountLayout />
    }

])
