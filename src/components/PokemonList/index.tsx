import React from 'react'

import useInfiniteScroller from 'hooks/useInfiniteScroller'

import {
    fetchPokemons,
    selectStatusLoading,
    selectPokemonData,
    selectHasNext,
} from 'features/pokemon'

const PokemonList = () => {
    const { InfiniteScroller, data } = useInfiniteScroller({
        fetchAction: fetchPokemons,
        dataSelector: selectPokemonData,
        loadingSelector: selectStatusLoading,
        hasNextSelector: selectHasNext,
    })

    return (
        <InfiniteScroller>
            {data.map((pokemon) => (
                <div key={pokemon.id}>{pokemon.name}</div>
            ))}
        </InfiniteScroller>
    )
}

export default React.memo(PokemonList)
