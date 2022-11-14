import { createSlice } from '@reduxjs/toolkit'

import { fetchGeneration, fetchGenerations } from './thunks'

import {
    IDLE_STATUS,
    LOADING_STATUS,
    READY_STATUS,
    ERROR_STATUS,
} from 'lib/constants/api'

export const name = 'generations'

export const initialState: GenerationsReducerState = {
    data: {},
    status: IDLE_STATUS,
    error: undefined,
}

const generationsSlice = createSlice({
    name,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchGeneration.pending, (state) => {
            state.error = undefined
            state.status = LOADING_STATUS
        })
        builder.addCase(fetchGeneration.fulfilled, (state, { payload }) => {
            state.error = undefined
            state.status = READY_STATUS
        })
        builder.addCase(fetchGeneration.rejected, (state, { error }) => {
            state.error = error.message
            state.status = ERROR_STATUS
        })
        builder.addCase(fetchGenerations.pending, (state) => {
            state.error = undefined
            state.status = LOADING_STATUS
        })
        builder.addCase(fetchGenerations.fulfilled, (state, { payload }) => {
            state.error = undefined
            state.status = READY_STATUS
        })
        builder.addCase(fetchGenerations.rejected, (state, { error }) => {
            state.error = error.message
            state.status = ERROR_STATUS
        })
    },
})

export const generationsSliceInitialState = {
    [name]: initialState,
}

export const generationsSliceReducer = {
    [name]: generationsSlice.reducer,
}

export default generationsSlice.reducer
