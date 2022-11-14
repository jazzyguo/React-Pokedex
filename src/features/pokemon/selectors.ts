import { createSelector } from '@reduxjs/toolkit'
import { IDLE_STATUS, LOADING_STATUS, READY_STATUS } from './constants'
import { unslug } from 'lib/utils/strings'

const selectSelf = (state: { pokemon: PokemonReducerState }) => state['pokemon']

export const selectPokemonStatusIdle = createSelector(
    selectSelf,
    ({ pokemon }) => pokemon?.status === IDLE_STATUS
)

export const selectPokemonStatusLoading = createSelector(
    selectSelf,
    ({ pokemon }) => pokemon?.status === LOADING_STATUS
)

export const selectPokemonStatusReady = createSelector(
    selectSelf,
    ({ pokemon }) => pokemon?.status === READY_STATUS
)

export const selectPokemonError = createSelector(
    selectSelf,
    ({ pokemon }) => pokemon?.error
)

export const selectPokemonData = createSelector(
    selectSelf,
    ({ pokemon }) => pokemon?.data || []
)

export const selectCount = createSelector(
    selectSelf,
    ({ pagination }) => pagination?.count || 0
)

export const selectHasNext = createSelector(
    selectSelf,
    selectPokemonStatusIdle,
    selectPokemonData,
    ({ pagination }, isInit, data) =>
        pagination?.next !== null || isInit || !data.length
)

export const selectOffset = createSelector(
    selectSelf,
    ({ pagination }) => pagination?.offset || 0
)

export const selectSelectedPokemon = createSelector(
    selectSelf,
    ({ pokemon }) => pokemon?.selectedPokemon
)

export const selectEvolutionData = createSelector(
    selectSelf,
    ({ evolutions }) => evolutions?.data || []
)

export const selectEvolutionStatusIdle = createSelector(
    selectSelf,
    ({ evolutions }) => evolutions?.status === IDLE_STATUS
)

export const selectEvolutionStatusLoading = createSelector(
    selectSelf,
    ({ evolutions }) => evolutions?.status === LOADING_STATUS
)

export const selectEvolutionStatusReady = createSelector(
    selectSelf,
    ({ evolutions }) => evolutions?.status === READY_STATUS
)

export const selectEvolutionError = createSelector(
    selectSelf,
    ({ evolutions }) => evolutions?.error
)

export const selectEvolutionById = createSelector(
    selectEvolutionData,
    (_: any, id: number) => id,
    (data: Evolution[], id: number) => {
        return data.find((e) => e.id === id)
    }
)

// this selects pokemon from the main data array
// but if its not found based on the id existing (api fetched),
// then it will index into the selectedPokemon key
// finds pokemon by matching id which can be
// a number string or a pokemon's name
export const selectPokemonById = createSelector(
    selectPokemonData,
    selectSelectedPokemon,
    (_: any, id: string | null) => id,
    (data: Pokemon[], selectedPokemon: Pokemon, id: string | null) => {
        if (!id) return null

        if (
            selectedPokemon &&
            (selectedPokemon.id === parseInt(id) ||
                selectedPokemon.name === id.toLocaleLowerCase())
        ) {
            return selectedPokemon
        }

        return data.find(
            (pokemon: Pokemon) =>
                pokemon.id === parseInt(id) ||
                pokemon.name === id.toLocaleLowerCase()
        )
    }
)

// used to filter pokemon by doing a simple case insensitive string includes check
// with first letter match
export const selectFilteredPokemon = createSelector(
    selectPokemonData,
    (_: any, filter: string) => filter,
    (data: Pokemon[], filter: string) => {
        if (!filter) return []

        const toSearch = filter.toLocaleLowerCase()

        return data.filter((pokemon: Pokemon) => {
            const pokemonName = unslug(pokemon?.name || '').toLocaleLowerCase()
            return (
                pokemonName &&
                pokemonName.includes(toSearch) &&
                pokemonName[0] === toSearch[0]
            )
        })
    }
)
