import React from 'react'
import { useNavigate } from 'react-router-dom'

import {
    fetchPokemons,
    selectPokemonStatusLoading,
    selectPokemonData,
    selectHasNext,
    selectOffset,
} from 'features/pokemon'

import { unslug, getPokemonIdFromUrl } from 'lib/utils/strings'
import { getSpriteImageUrl } from 'lib/utils/image'

import useInfiniteScroller from 'lib/hooks/useInfiniteScroller'

import styles from './PokemonList.module.scss'

const PokemonList = () => {
    const navigate = useNavigate()

    const { InfiniteScroller, data } = useInfiniteScroller({
        fetchAction: fetchPokemons,
        dataSelector: selectPokemonData,
        loadingSelector: selectPokemonStatusLoading,
        hasNextSelector: selectHasNext,
        offsetSelector: selectOffset,
    })

    return (
        <InfiniteScroller className={styles.pokemonList}>
            {data.map((pokemon) => {
                const id = pokemon.id || getPokemonIdFromUrl(pokemon.url)
                const baseSpriteUrl = getSpriteImageUrl(id)
                const shinySpriteUrl = getSpriteImageUrl(id, {
                    shiny: true,
                })
                return (
                    <div
                        key={pokemon.name}
                        className={styles.pokemonList_item}
                        onClick={() => navigate(`/pokemon/${id}`)}
                    >
                        <img
                            src={baseSpriteUrl}
                            onMouseOver={(e) => {
                                e.currentTarget.src = shinySpriteUrl
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.src = baseSpriteUrl
                            }}
                            alt={pokemon.name}
                        />
                        <span className={styles.pokemonList_item_number}>
                            #{id}
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
