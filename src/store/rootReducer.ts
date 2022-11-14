import {
    pokemonSliceInitialState,
    pokemonSliceReducer,
} from '../features/pokemon/slice'

import {
    evolutionsSliceInitialState,
    evolutionsSliceReducer,
} from '../features/evolutions/slice'

import {
    generationsSliceInitialState,
    generationsSliceReducer,
} from '../features/generations/slice'

export const initialAppState = {
    ...pokemonSliceInitialState,
    ...evolutionsSliceInitialState,
    ...generationsSliceInitialState,
}

const rootReducer = {
    ...pokemonSliceReducer,
    ...evolutionsSliceReducer,
    ...generationsSliceReducer,
}

export default rootReducer
