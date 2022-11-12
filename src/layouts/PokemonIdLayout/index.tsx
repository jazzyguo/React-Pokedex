import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, Link, Outlet } from 'react-router-dom'

import {
    fetchPokemon,
    selectPokemonById,
    selectStatusLoading,
} from 'features/pokemon'

import BackButton from 'components/BackButton'
import Loading from 'components/Loading'

import Stats from './components/Stats'
import Types from './components/Types'
import Banner from './components/Banner'

import { unslug } from 'lib/utils/strings'

import pokeball from 'assets/images/pokeball.png'

import styles from './PokemonIdLayout.module.scss'

const NavButtons = ({ id }) => {}

const PokemonIdLayout = () => {
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

    const { name, id, types = [], stats = [] } = pokemonData

    return (
        <div className={styles.container}>
            <BackButton />
            {isLoading ? (
                <Loading size={100} className={styles.loading} />
            ) : (
                <>
                    <Banner name={name} id={id} types={types} />
                    <div className={styles.content}>
                        <div className={styles.content_title}>
                            <div>
                                <img src={pokeball} alt="pokeball" />
                                <h2>#{id}</h2>
                            </div>
                            <h1>{unslug(name)}</h1>
                        </div>
                        <Types data={types} />
                        <Stats data={stats} />
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
