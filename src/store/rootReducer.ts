import {
    pokemonSliceInitialState,
    pokemonSliceReducer,
} from '../features/pokemon/slice'

export const initialAppState = {
    ...pokemonSliceInitialState,
}

const rootReducer = {
    ...pokemonSliceReducer,
}

export default rootReducer
