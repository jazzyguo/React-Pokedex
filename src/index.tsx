import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import { store } from './store'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Root from './root'

import PokemonIdAbilitiesPage from 'pages/pokemon/[id]/abilities'

const IndexPage = React.lazy(() => import('pages/index'))
const PokemonIdLayout = React.lazy(() => import('components/PokemonId/Layout'))

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
                element: <PokemonIdLayout />,
                children: [
                    {
                        path: 'pokemon/:id/',
                    },
                    {
                        path: 'pokemon/:id/abilities',
                        element: <PokemonIdAbilitiesPage />,
                    },
                ],
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
