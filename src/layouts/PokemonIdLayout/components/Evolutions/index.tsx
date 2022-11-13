import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Loading from 'components/Loading'
import Evolution from './Evolution'

import {
    selectEvolutionById,
    fetchEvolutions,
    selectEvolutionStatusLoading,
} from 'features/pokemon'

import { getPokemonIdFromUrl, unslug } from 'lib/utils/strings'

import styles from './Evolutions.module.scss'

type Props = {
    id: number
}

/**
 * Fetches and lists out evolution tree for a given pokemon
 * Links to a pokemon in the tree if clicked
 */
const Evolutions = ({ id }: Props) => {
    const dispatch = useDispatch()

    const evolutionData = useSelector((state) => selectEvolutionById(state, id))

    const isLoading = useSelector(selectEvolutionStatusLoading)

    useEffect(() => {
        if (!evolutionData) {
            dispatch(fetchEvolutions(id))
        }
    }, [evolutionData, id, dispatch])

    const { chain = {} } = evolutionData || {}

    const canEvolve = !!chain.evolves_to?.length

    return (
        <div className={styles.container}>
            <h2>Evolutions</h2>
            {isLoading ? (
                <Loading />
            ) : (
                <>
                    {!canEvolve ? (
                        <div className={styles.no_evolutions}>
                            This pokemon has no evolution chain
                        </div>
                    ) : (
                        <Evolution
                            chain={chain}
                            id={getPokemonIdFromUrl(chain?.species?.url)}
                            name={unslug(chain?.species?.name)}
                        />
                    )}
                </>
            )}
        </div>
    )
}

export default React.memo(Evolutions)
