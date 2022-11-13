import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, Link, Outlet } from 'react-router-dom'

import {
    fetchPokemon,
    selectPokemonById,
    selectPokemonStatusLoading,
} from 'features/pokemon'

import BackButton from 'components/BackButton'
import Loading from 'components/Loading'

import Stats from './components/Stats'
import Banner from './components/Banner'
import Evolutions from './components/Evolutions'

import { unslug } from 'lib/utils/strings'

import styles from './PokemonIdLayout.module.scss'

const NavButtons = ({ id }) => {}

const PokemonIdLayout = () => {
    const dispatch = useDispatch()

    const { id: pokemonId } = useParams()

    const isLoading = useSelector(selectPokemonStatusLoading)

    const pokemonData: Pokemon = useSelector((state) =>
        selectPokemonById(state, pokemonId)
    )

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    useEffect(() => {
        if (!pokemonData) {
            dispatch(fetchPokemon(pokemonId))
        }
    }, [pokemonData, pokemonId, dispatch])

    if (!pokemonData) {
        return null
    }

    const { name: _name, id, types = [], stats = [] } = pokemonData

    if (!id) {
        throw new Error('Pokemon ID is missing')
    }

    const name = unslug(_name)

    return (
        <>
            <BackButton />
            <div className={styles.container}>
                {isLoading ? (
                    <Loading size={100} className={styles.loading} />
                ) : (
                    <>
                        <Banner name={name} id={id} types={types} />
                        <div className={styles.content}>
                            <Stats data={stats} />
                            <Evolutions id={id} />
                            {/* <Link to={`pokemon/${id}/abilities`} replace>
                            abilities
                        </Link> */}
                            <Outlet />
                        </div>
                    </>
                )}
            </div>
        </>
    )
}

export default React.memo(PokemonIdLayout)
