import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, Link, Outlet } from 'react-router-dom'

import {
    fetchPokemon,
    selectPokemonById,
    selectStatusLoading,
} from 'features/pokemon'

import BackButton from 'components/BackButton'
import Loading from 'components/Loading'

import { unslug } from 'lib/utils/strings'
import { getSpriteImageUrl } from 'lib/utils/image'

import pokeball from 'assets/images/pokeball.png'
import shiny from 'assets/images/shiny.png'

import { TYPE_COLORS } from 'lib/constants/pokemonTypes'

import styles from './PokemonId.module.scss'

/**
 * /index
 * Serving as a layout wrapper for the Pokemon details page.
 */
const PokemonIdLayout = () => {
    const [showShiny, setShowShiny] = useState(false)

    const dispatch = useDispatch()

    const { id: pokemonId } = useParams()

    const isLoading = useSelector(selectStatusLoading)

    const pokemonData: Pokemon = useSelector((state) =>
        selectPokemonById(state, pokemonId)
    )

    useEffect(() => {
        if (!pokemonData) {
            dispatch(fetchPokemon(pokemonId))
        }
    }, [pokemonData, pokemonId, dispatch])

    if (!pokemonData) {
        return null
    }

    const { name, id, types = [] } = pokemonData

    const spriteUrl = getSpriteImageUrl(id)
    const shinySpriteUrl = getSpriteImageUrl(id, {
        shiny: true,
    })

    const imageUrl = showShiny ? shinySpriteUrl : spriteUrl

    return (
        <div className={styles.container}>
            <BackButton />
            {isLoading ? (
                <Loading size={100} className={styles.loading} />
            ) : (
                <>
                    <div
                        className={styles.banner}
                        style={{
                            backgroundImage: `linear-gradient(${
                                TYPE_COLORS[types[0]?.type?.name]
                            }, #fff)`,
                        }}
                    >
                        <img
                            src={imageUrl}
                            alt={name}
                            className={styles.sprite}
                        />
                        <img
                            onClick={() => setShowShiny(!showShiny)}
                            src={shiny}
                            alt="shiny"
                            className={styles.shiny}
                        />
                    </div>
                    <div className={styles.content}>
                        <div className={styles.content_title}>
                            <div>
                                <img src={pokeball} alt="pokeball" />
                                <h2>#{id}</h2>
                            </div>
                            <h1>{unslug(name)}</h1>
                        </div>
                        <div className={styles.content_types}>
                            {types.map(({ type }) => {
                                let typeImgSrc

                                try {
                                    typeImgSrc = require(`assets/images/types/${type.name}.png`)
                                } catch (e) {
                                    console.log(e)
                                }

                                return (
                                    <div
                                        key={type.name}
                                        style={{
                                            backgroundColor:
                                                TYPE_COLORS[type.name],
                                        }}
                                    >
                                        {typeImgSrc && (
                                            <img
                                                src={typeImgSrc}
                                                alt={type.name}
                                            />
                                        )}
                                        {unslug(type.name)}
                                    </div>
                                )
                            })}
                        </div>
                        <Link to={`pokemon/${id}/abilities`} replace>
                            abilities
                        </Link>
                        <Outlet />
                    </div>
                </>
            )}
        </div>
    )
}

export default React.memo(PokemonIdLayout)
