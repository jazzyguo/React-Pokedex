import React from 'react'

import { getPokemonIdFromUrl, unslug } from 'lib/utils/strings'
import { getSpriteImageUrl } from 'lib/utils/image'

import EvolutionDetails from './EvolutionDetails'

import ArrowSvg from 'assets/svg/Arrow'

import styles from './Evolutions.module.scss'

type Props = {
    id: number | undefined
    details?: EvolutionDetail[]
    chain: Evolution
    name?: string
}

/**
 * Recursive component to render evolution chain
 */
const Evolution = ({ id, details = [], chain, name = '' }: Props) => {
    const { evolves_to: evolvesTo = [] } = chain
    const imageUrl = getSpriteImageUrl(id)

    return (
        <div className={styles.evolution}>
            <div className={styles.evolution_meta}>
                <img src={imageUrl} alt={name} />
                <span className={styles.evolution_meta_name}>{name}</span>
                <EvolutionDetails details={details} />
            </div>
            {!!evolvesTo.length && (
                <div className={styles.evolution_children}>
                    <span className={styles.evolution_to}>
                        <ArrowSvg />
                    </span>
                    {evolvesTo.map(
                        (evolution) =>
                            evolution && (
                                <Evolution
                                    details={evolution?.evolution_details || []}
                                    chain={evolution}
                                    name={unslug(evolution?.species?.name)}
                                    id={getPokemonIdFromUrl(
                                        evolution?.species?.url || ''
                                    )}
                                />
                            )
                    )}
                </div>
            )}
        </div>
    )
}

export default React.memo(Evolution)