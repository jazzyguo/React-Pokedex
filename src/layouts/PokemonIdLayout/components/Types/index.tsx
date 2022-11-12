import React from 'react'

import { unslug } from 'lib/utils/strings'
import { TYPE_COLORS } from 'lib/constants/pokemonTypes'

import styles from './Types.module.scss'

type Props = {
    data: PokemonType[]
}

const PokemonTypes = ({ data = [] }: Props) => {
    return (
        <div className={styles.container}>
            {data.map(({ type }) => {
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
                        {typeImgSrc && <img src={typeImgSrc} alt={type.name} />}
                        {unslug(type.name)}
                    </div>
                )
            })}
        </div>
    )
}

export default React.memo(PokemonTypes)
