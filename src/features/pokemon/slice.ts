import { createSlice } from '@reduxjs/toolkit'

import { fetchPokemons, fetchPokemon } from './thunks'

export const name = 'pokemon'

export const initialState: PokemonReducerState = {
    count: 0,
    offset: 0,
    limit: 20,
    data: [],
    selectedPokemon: null,
    status: 'idle',
    error: undefined,
    next: null,
}

const pokemonSlice = createSlice({
    name,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchPokemons.pending, (state, { meta }) => {
            state.error = undefined
            state.status = 'loading'
            state.offset = meta.arg.offset
            state.limit = meta.arg.limit
        })
        builder.addCase(fetchPokemons.fulfilled, (state, { payload }) => {
            state.data = [...state.data, ...(payload.results || [])]
            state.count = payload.count || 0
            state.next = payload.next || null
            state.error = undefined
            state.status = 'ready'
        })
        builder.addCase(fetchPokemons.rejected, (state, { error }) => {
            state.error = error.message
            state.status = 'error'
        })
        builder.addCase(fetchPokemon.pending, (state) => {
            state.error = undefined
            state.status = 'loading'
            state.selectedPokemon = null
        })
        builder.addCase(fetchPokemon.fulfilled, (state, { payload }) => {
            // lets update the pokemon data if available
            // otherwise save it to the selectedPokemon key
            const index = state.data.findIndex((p) => p.name === payload.name)
            if (index !== -1) {
                state.data[index] = payload
            } else {
                state.selectedPokemon = payload
            }
            state.error = undefined
            state.status = 'ready'
        })
        builder.addCase(fetchPokemon.rejected, (state, { error }) => {
            state.error = error.message
            state.status = 'error'
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
