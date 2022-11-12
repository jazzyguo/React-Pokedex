type Pokemon = {
    name: string
    id?: number
    abilities?: Ability[]
    types?: PokemonType[]
}

type PokemonType = {
    name: string
}

type Ability = {
    ability: {
        name: string
    }
}

type PokemonReducerState = {
    count: number
    offset: number
    limit: number
    data: Pokemon[]
    selectedPokemon: Pokemon | null
    status: 'idle' | 'loading' | 'ready' | 'error'
    error: string | undefined
    next: string | null
}
