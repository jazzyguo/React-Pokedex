import { createAsyncThunk } from '@reduxjs/toolkit'

import { POKEMON_LIST_URL } from '../constants'

const fetchPokemons = createAsyncThunk<
    Pokemon,
    number | null,
    {
        rejectValue: Error
    }
>('pokemon/fetchPokemon', async (id, { rejectWithValue }) => {
    try {
        if (!id) {
            throw new Error('Invalid id')
        }

        const response = await fetch(`${POKEMON_LIST_URL}/${id}`)

        if (response.status === 200) {
            const data = await response.json()

            return data
        } else {
            throw new Error('Error fetching pokemon')
        }
    } catch (error) {
        console.log(error)
        return rejectWithValue(error)
    }
})

export default fetchPokemons
