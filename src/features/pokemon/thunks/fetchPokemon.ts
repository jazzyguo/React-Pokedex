import { createAsyncThunk } from '@reduxjs/toolkit'

import { POKEMON_LIST_URL } from '../constants'

export const fetchPokemonRequest = async (id: string | number | null) => {
    if (!id) {
        throw new Error('Invalid id')
    }

    const response = await fetch(
        `${POKEMON_LIST_URL}/${id.toString().toLocaleLowerCase()}`
    )

    if (response.status === 200) {
        const data = await response.json()

        return data
    } else {
        throw new Error('Error fetching pokemon')
    }
}

const fetchPokemon = createAsyncThunk<
    Pokemon,
    string | number | null,
    {
        rejectValue: Error
    }
>('pokemon/fetchPokemon', async (id, { rejectWithValue }) => {
    try {
        return await fetchPokemonRequest(id)
    } catch (error) {
        console.log(error)
        return rejectWithValue(error)
    }
})

export default fetchPokemon
