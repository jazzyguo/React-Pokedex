import React from 'react'

import PokemonList from 'components/PokemonList'

const IndexPage = () => (
    <div>
        <PokemonList />
    </div>
)

export default React.memo(IndexPage)
