import { createAsyncThunk } from '@reduxjs/toolkit'

import { POKEMON_LIST_URL } from '../constants'

const fetchPokemons = createAsyncThunk<
    {
        count: number
        results: Pokemon[]
    },
    { offset: number; limit: number },
    {
        rejectValue: Error
    }
>(
    'pokemon/fetchPokemons',
    async ({ offset = 0, limit = 20 }, { rejectWithValue }) => {
        try {
            const response = await fetch(
                `${POKEMON_LIST_URL}?offset=${offset}&limit=${limit}`
            )

            if (response.status === 200) {
                const { count, results } = await response.json()

                return {
                    count,
                    results,
                }
            } else {
                throw new Error('Error fetching pokemons')
            }
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export default fetchPokemons
