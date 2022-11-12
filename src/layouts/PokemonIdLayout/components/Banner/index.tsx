import React, { useState } from 'react'

import Types from '../Types'

import { getSpriteImageUrl } from 'lib/utils/image'
import { TYPE_COLORS } from 'lib/constants/pokemonTypes'

import shiny from 'assets/images/shiny.png'
import pokeball from 'assets/images/pokeball.png'

import { unslug } from 'lib/utils/strings'

import styles from './Banner.module.scss'

type Props = {
    name: string
    id: string
    types: PokemonType[]
}

const Banner = ({ name = '', id = '', types = [] }: Props) => {
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
                className={styles.shiny}
            />
            <div className={styles.container_meta}>
                <div>
                    <img src={pokeball} alt="pokeball" />
                    <h2>#{id}</h2>
                </div>
                <h1>{unslug(name)}</h1>
                <Types data={types} />
            </div>
        </div>
    )
}

export default React.memo(Banner)
