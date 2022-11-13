import React, { useState } from 'react'

import Types from '../Types'

import { getSpriteImageUrl } from 'lib/utils/image'
import { TYPE_COLORS } from 'lib/constants/pokemonTypes'

import shiny from 'assets/images/shiny.png'
import pokeball from 'assets/images/pokeball.png'

import cx from 'classnames'
import styles from './Banner.module.scss'

type Props = {
    name?: string
    id: number | undefined
    types?: PokemonType[]
}

/**
 * Main banner image for a pokemon along with its name, id, and types
 */
const Banner = ({ name = '', id, types = [] }: Props) => {
    const [showShiny, setShowShiny] = useState(false)

    const spriteUrl = getSpriteImageUrl(id)
    const shinySpriteUrl = getSpriteImageUrl(id, {
        shiny: true,
    })

    const imageUrl = showShiny ? shinySpriteUrl : spriteUrl

    return (
        <div
            className={styles.container}
            style={{
                backgroundImage: `linear-gradient(${
                    TYPE_COLORS[types[0]?.type?.name]
                }, #fff)`,
            }}
        >
            <img src={imageUrl} alt={name} className={styles.sprite} />
            <img
                onClick={() => setShowShiny(!showShiny)}
                src={shiny}
                alt="shiny"
                className={cx(styles.shiny, {
                    [styles['shiny--active']]: showShiny,
                })}
            />
            <div className={styles.container_meta}>
                <div>
                    <img src={pokeball} alt="pokeball" />
                    <h2>#{id}</h2>
                </div>
                <h1>{name}</h1>
                <Types data={types} />
            </div>
        </div>
    )
}

export default React.memo(Banner)
