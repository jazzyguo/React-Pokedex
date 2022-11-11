type Pokemon = {
    name: string
}

type PokemonReducerState = {
    count: number
    offset: number
    limit: number
    data: Pokemon[]
    status: 'idle' | 'loading' | 'ready' | 'error'
    error: string | undefined
}
