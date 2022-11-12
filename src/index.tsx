import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import { store } from './store'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Root from './root'

const IndexPage = React.lazy(() => import('pages/index'))
const PokemonIdPage = React.lazy(() => import('pages/pokemon/[id]'))


const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        children: [
            {
                index: true,
                element: <IndexPage />,
            },
            {
                path: 'pokemon/:id',
                element: <PokemonIdPage />,
            },
        ],
    },
])

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <Provider store={store}>
        <Suspense fallback={null}>
            <RouterProvider router={router} />
        </Suspense>
    </Provider>
)
