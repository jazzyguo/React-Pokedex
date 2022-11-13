import { createSelector } from '@reduxjs/toolkit'
import { IDLE_STATUS, LOADING_STATUS, READY_STATUS } from './constants'

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
export const selectPokemonById = createSelector(
    selectPokemonData,
    selectSelectedPokemon,
    (_: any, id: number) => id,
    (data: Pokemon[], selectedPokemon: Pokemon, id: string) => {
        if (selectedPokemon && selectedPokemon.id === parseInt(id)) {
            return selectedPokemon
        }

        return data.find((pokemon: Pokemon) => pokemon.id === parseInt(id))
    }
)
