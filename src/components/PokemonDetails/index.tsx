import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { fetchPokemon, selectPokemonById } from 'features/pokemon'

import BackButton from 'components/BackButton'

import { unslug } from 'lib/utils/strings'
import { getSpriteImageUrl } from 'lib/utils/image'

import pokeball from 'assets/images/pokeball.png'

import { TYPE_COLORS } from 'lib/constants/pokemonTypes'

import styles from './PokemonDetails.module.scss'

const PokemonDetails = () => {
    const dispatch = useDispatch()

    const { id: pokemonId } = useParams()

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

    const imageUrl = getSpriteImageUrl(id)

    return (
        <div className={styles.container}>
            <BackButton />
            <div
                className={styles.banner}
                style={{
                    backgroundImage: `linear-gradient(${
                        TYPE_COLORS[types[0].type.name]
                    }, #fff)`,
                }}
            >
                <img src={imageUrl} alt={name} />
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
                                    backgroundColor: TYPE_COLORS[type.name],
                                }}
                            >
                                {typeImgSrc && (
                                    <img src={typeImgSrc} alt={type.name} />
                                )}
                                {unslug(type.name)}
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default React.memo(PokemonDetails)
