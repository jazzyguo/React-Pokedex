import {
    selectPokemons,
    selectLoading,
    selectError,
    selectCount,
} from './selectors'

import { fetchPokemons } from './thunks'

const thunks = {
    fetchPokemons,
}

const selectors = {
    selectPokemons,
    selectLoading,
    selectError,
    selectCount,
}

const exports = {
    thunks,
    selectors,
}

export default exports
