import { createSelector } from '@reduxjs/toolkit'

const selectSelf = (state) => state['pokemon']

export const selectStatusLoading = createSelector(
    selectSelf,
    (state) => state?.status === 'loading'
)

export const selectStatusReady = createSelector(
    selectSelf,
    (state) => state?.status === 'ready'
)

export const selectError = createSelector(
    selectSelf,
    (state) => state?.error
)

export const selectPokemons = createSelector(
    selectSelf,
    (state) => state?.data || []
)

export const selectCount = createSelector(
    selectSelf,
    (state) => state?.count || 0
)
