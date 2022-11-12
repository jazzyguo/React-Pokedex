import { createAsyncThunk } from '@reduxjs/toolkit'

import { POKEMON_LIST_URL } from '../constants'

const fetchPokemons = createAsyncThunk<
    {
        count: number
        next: string | null
        results: Pokemon[]
    },
    { offset: number; limit: number },
    {
        rejectValue: Error
    }
>(
    'pokemon/fetchPokemons',
    async (
        { offset, limit } = {
            offset: 0,
            limit: 20,
        },
        { rejectWithValue }
    ) => {
        try {
            const response = await fetch(
                `${POKEMON_LIST_URL}?offset=${offset}&limit=${limit}`
            )

            if (response.status === 200) {
                const { count, results, next } = await response.json()

                return {
                    count,
                    results,
                    next,
                }
            } else {
                throw new Error('Error fetching pokemons')
            }
        } catch (error) {
            console.log(error)
            return rejectWithValue(error)
        }
    }
)

export default fetchPokemons
