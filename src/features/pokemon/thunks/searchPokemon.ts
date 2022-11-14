import { createAsyncThunk } from '@reduxjs/toolkit'

import { POKEMON_LIST_URL } from '../constants'

import { fetchPokemonRequest } from './fetchPokemon'

const searchPokemon = createAsyncThunk<
    Pokemon[],
    string | null,
    {
        rejectValue: Error
    }
>('pokemon/searchPokemon', async (searchTerm, { rejectWithValue }) => {
    try {
        return await fetchPokemonRequest(searchTerm)
    } catch (error) {
        console.log(error)
        return rejectWithValue(error)
    }
})

export default searchPokemon
