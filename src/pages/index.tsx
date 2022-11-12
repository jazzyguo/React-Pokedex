import React from 'react'
import { ScrollRestoration } from "react-router-dom";

import PokemonList from 'components/PokemonList'

const IndexPage = () => (
    <div>
        <PokemonList />
    </div>
)

export default React.memo(IndexPage)
