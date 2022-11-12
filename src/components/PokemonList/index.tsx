import React from 'react'
import { useNavigate } from 'react-router-dom'

import {
    fetchPokemons,
    selectStatusLoading,
    selectPokemonData,
    selectHasNext,
    selectOffset,
} from 'features/pokemon'

import { unslug } from 'lib/utils/strings'
import useInfiniteScroller from 'lib/hooks/useInfiniteScroller'

import styles from './PokemonList.module.scss'

const PokemonList = () => {
    const navigate = useNavigate()

    const { InfiniteScroller, data } = useInfiniteScroller({
        fetchAction: fetchPokemons,
        dataSelector: selectPokemonData,
        loadingSelector: selectStatusLoading,
        hasNextSelector: selectHasNext,
        offsetSelector: selectOffset,
    })

    return (
        <InfiniteScroller className={styles.pokemonList}>
            {data.map((pokemon) => {
                const number = pokemon.id || (pokemon.url || '').split('/')[6]
                return (
                    <div
                        key={pokemon.name}
                        className={styles.pokemonList_item}
                        onClick={() => navigate(`/pokemon/${number}`)}
                    >
                        <span className={styles.pokemonList_item_number}>
                            #{number}
                        </span>
                        <span className={styles.pokemonList_item_name}>
                            {unslug(pokemon.name)}
                        </span>
                    </div>
                )
            })}
        </InfiniteScroller>
    )
}

export default React.memo(PokemonList)
