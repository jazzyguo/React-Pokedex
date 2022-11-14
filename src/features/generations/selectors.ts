import { createSelector } from '@reduxjs/toolkit'
import { IDLE_STATUS, LOADING_STATUS, READY_STATUS } from 'lib/constants/api'

import { selectFilter, selectPokemonData } from 'features/pokemon'

const selectSelf = (state: { generations: GenerationsReducerState }) =>
    state['generations']

export const getGenerationsData = createSelector(
    selectSelf,
    ({ data }) => data || []
)

export const getGenerationsStatusIdle = createSelector(
    selectSelf,
    ({ status }) => status === IDLE_STATUS
)

export const getGenerationsStatusLoading = createSelector(
    selectSelf,
    ({ status }) => status === LOADING_STATUS
)

export const getGenerationsStatusReady = createSelector(
    selectSelf,
    ({ status }) => status === READY_STATUS
)

// based on the current filter string saved in store, we can fetch
// all the available pokemon data currently in store
// or return all the generational pokemon data coming from generations key
export const selectPokemonListData = createSelector(
    selectFilter,
    selectPokemonData,
    getGenerationsData,
    (filter: string, pokemonData: Pokemon[], generationsData: Generations) => {
        if (filter === 'all') return pokemonData

        const generation = generationsData[filter]

        if (!generation) return []

        return generation.pokemon_species
    }
)
