import { createSlice } from '@reduxjs/toolkit'

import { fetchPokemons, fetchPokemon, fetchEvolutions } from './thunks'

import {
    IDLE_STATUS,
    LOADING_STATUS,
    READY_STATUS,
    ERROR_STATUS,
} from './constants'

export const name = 'pokemon'

export const initialState: PokemonReducerState = {
    pagination: {
        count: 0,
        offset: 0,
        limit: 0,
        next: null,
    },
    pokemon: {
        data: [],
        selectedPokemon: null,
        status: IDLE_STATUS,
        error: undefined,
    },
    evolutions: {
        data: [],
        status: IDLE_STATUS,
        error: undefined,
    },
}

const pokemonSlice = createSlice({
    name,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchPokemons.pending, (state, { meta }) => {
            state.pokemon.error = undefined
            state.pokemon.status = LOADING_STATUS
            state.pagination.offset = meta.arg.offset || state.pagination.offset
            state.pagination.limit = meta.arg.limit || state.pagination.limit
        })
        builder.addCase(fetchPokemons.fulfilled, (state, { payload }) => {
            state.pokemon.data = [
                ...state.pokemon.data,
                ...(payload.results || []),
            ]
            state.pagination.count = payload.count || 0
            state.pagination.next = payload.next || null
            state.pagination.offset =
                state.pagination.offset + state.pagination.limit
            state.pokemon.error = undefined
            state.pokemon.status = READY_STATUS
        })
        builder.addCase(fetchPokemons.rejected, (state, { error }) => {
            state.pokemon.error = error.message
            state.pokemon.status = ERROR_STATUS
        })
        builder.addCase(fetchPokemon.pending, (state) => {
            state.pokemon.error = undefined
            state.pokemon.status = 'loading'
            state.pokemon.selectedPokemon = null
        })
        builder.addCase(fetchPokemon.fulfilled, (state, { payload }) => {
            // lets update the pokemon data if available
            // otherwise save it to the selectedPokemon key
            const index = state.pokemon.data.findIndex(
                (p) => p.name === payload.name
            )
            if (index !== -1) {
                state.pokemon.data[index] = payload
            } else {
                state.pokemon.selectedPokemon = payload
            }
            state.pokemon.error = undefined
            state.pokemon.status = READY_STATUS
        })
        builder.addCase(fetchPokemon.rejected, (state, { error }) => {
            state.pokemon.error = error.message
            state.pokemon.status = ERROR_STATUS
        })
        builder.addCase(fetchEvolutions.pending, (state) => {
            state.evolutions.error = undefined
            state.evolutions.status = 'loading'
        })
        builder.addCase(fetchEvolutions.fulfilled, (state, { payload }) => {
            state.evolutions.data = [...state.evolutions.data, payload]
            state.evolutions.error = undefined
            state.evolutions.status = READY_STATUS
        })
        builder.addCase(fetchEvolutions.rejected, (state, { error }) => {
            state.evolutions.error = error.message
            state.evolutions.status = ERROR_STATUS
        })
    },
})

export const pokemonSliceInitialState = {
    [name]: initialState,
}

export const pokemonSliceReducer = {
    [name]: pokemonSlice.reducer,
}

export default pokemonSlice.reducer
