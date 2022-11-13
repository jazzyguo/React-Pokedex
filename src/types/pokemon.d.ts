type Pokemon = {
    name: string
    id?: number
    abilities?: Ability[]
    types?: PokemonType[]
    stats?: Stat[]
}

type PokemonType = {
    type: {
        name: string
    }
}

type Ability = {
    ability: {
        name: string
    }
}

type Stat = {
    base_stat: number
    stat: {
        name: string
    }
}

type EvolutionDetail = {
    min_level: number
    item: {
        name: string
    }
    location: {
        name: string
    }
    trigger: {
        name: string
    }
}

type Species = {
    name: string
    url: string
}

type Evolution = {
    id: number
    evolution_details?: EvolutionDetail[]
    evolves_to?: Evolution[]
    species?: Species
    chain: {
        evolves_to: Evolution[]
        evolution_details: EvolutionDetail[]
        species: Species
    }
}

type PokemonReducerState = {
    pagination: {
        count: number
        offset: number
        limit: number
        next: string | null
    }
    pokemon: {
        data: Pokemon[]
        selectedPokemon: Pokemon | null
        status: 'idle' | 'loading' | 'ready' | 'error'
        error: string | undefined
    }
    evolutions: {
        data: Evolution[]
        status: 'idle' | 'loading' | 'ready' | 'error'
        error: string | undefined
    }
}
