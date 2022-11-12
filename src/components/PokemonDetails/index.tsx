import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { fetchPokemon, selectPokemonById } from 'features/pokemon'

import { unslug } from 'lib/utils/strings'

const PokemonDetails = () => {
    const dispatch = useDispatch()

    const { id: pokemonId } = useParams()

    const pokemonData: Pokemon = useSelector((state) =>
        selectPokemonById(state, pokemonId)
    )

    useEffect(() => {
        if (!pokemonData) {
            dispatch(fetchPokemon(pokemonId))
        }
    }, [pokemonData, pokemonId, dispatch])

    if (!pokemonData) {
        return null
    }

    const { name } = pokemonData

    return (
        <div>
            <h1>{unslug(name)}</h1>
        </div>
    )
}

export default React.memo(PokemonDetails)
