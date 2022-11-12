import { createSelector } from '@reduxjs/toolkit'

const selectSelf = (state: { pokemon: PokemonReducerState }) => state['pokemon']

export const selectStatusIdle = createSelector(
    selectSelf,
    (state) => state.status === 'idle'
)

export const selectStatusLoading = createSelector(
    selectSelf,
    (state) => state?.status === 'loading'
)

export const selectStatusReady = createSelector(
    selectSelf,
    (state) => state?.status === 'ready'
)

export const selectError = createSelector(selectSelf, (state) => state?.error)

export const selectPokemonData = createSelector(
    selectSelf,
    (state) => state?.data || []
)

export const selectCount = createSelector(
    selectSelf,
    (state) => state?.count || 0
)

export const selectHasNext = createSelector(
    selectSelf,
    selectStatusIdle,
    selectPokemonData,
    (state, isInit, data) => state?.next !== null || isInit || !data.length
)

export const selectOffset = createSelector(
    selectSelf,
    (state) => state?.offset || 0
)

export const selectSelectedPokemon = createSelector(
    selectSelf,
    (state) => state?.selectedPokemon
)

export const selectPokemonById = createSelector(
    selectPokemonData,
    selectSelectedPokemon,
    (_: any, id: string) => id,
    (data: Pokemon[], selectedPokemon: Pokemon, id: string) => {
        if (selectedPokemon && selectedPokemon.id === parseInt(id)) {
            return selectedPokemon
        }

        return data.find((pokemon: Pokemon) => pokemon.id === parseInt(id))
    }
)
