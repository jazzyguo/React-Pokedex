import { createAsyncThunk } from '@reduxjs/toolkit'

import { POKEMON_GENERATIONS_URL } from 'lib/constants/api'

const fetchGeneration = createAsyncThunk<
    Generation,
    string | null,
    {
        rejectValue: Error
    }
>('pokemon/fetchGeneration', async (id, { rejectWithValue }) => {
    try {
        const response = await fetch(`${POKEMON_GENERATIONS_URL}/${id}`)

        if (response.status === 200) {
            const data = await response.json()

            return data
        } else {
            throw new Error('Error fetching generation')
        }
    } catch (error) {
        console.log(error)
        return rejectWithValue(error)
    }
})

export default fetchGeneration
