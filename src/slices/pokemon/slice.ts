import { createSlice, SerializedError } from '@reduxjs/toolkit'

import { fetchPokemons } from './thunks'

export const name = 'pokemon'

type State = {
    count: number
    data: Pokemon[]
    status: 'idle' | 'loading' | 'ready' | 'error'
    error: SerializedError | null
}

export const initialState: State = {
    count: 0,
    data: [],
    status: 'idle',
    error: null,
}

const pokemonSlice = createSlice({
    name,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchPokemons.pending, (state) => {
            state.error = null
            state.status = 'loading'
        })
        builder.addCase(fetchPokemons.fulfilled, (state, { payload }) => {
            state.data = payload.results || []
            state.count = payload.count || 0
            state.error = null
            state.status = 'ready'
        })
        builder.addCase(fetchPokemons.rejected, (state, { error }) => {
            state.error = error
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
