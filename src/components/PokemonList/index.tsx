import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
    fetchPokemons,
    selectStatusIdle,
    selectPokemonData,
} from 'features/pokemon'

const PokemonList = () => {
    const dispatch = useDispatch()

    const isStatusIdle = useSelector(selectStatusIdle)
    const pokemonData: Pokemon[] = useSelector(selectPokemonData)

    useEffect(() => {
        if (isStatusIdle) {
            dispatch(
                fetchPokemons({
                    offset: 0,
                    limit: 20,
                })
            )
        }
    }, [isStatusIdle, dispatch])

    return (
        <div>
            {pokemonData.map((pokemon) => (
                <div key={pokemon.id}>{pokemon.name}</div>
            ))}
        </div>
    )
}

export default React.memo(PokemonList)
