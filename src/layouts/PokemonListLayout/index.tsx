import React from 'react'
import { useSelector } from 'react-redux'

import PokemonList from './components/PokemonList'

import Navbar from 'components/Navbar'
import FilterDropdown from './components/FilterDropdown'
import Loading from 'components/Loading'

import { selectPokemonStatusLoading } from 'features/pokemon'
import { selectGenerationsStatusLoading } from 'features/generations'

import useSearchPopup from 'lib/hooks/useSearchPopup'

import logo from 'assets/images/logo.png'

import styles from './PokemonListLayout.module.scss'

const PokemonListLayout = () => {
    const { SearchPopup, SearchTrigger } = useSearchPopup()

    const isPokemonsLoading = useSelector(selectPokemonStatusLoading)
    const isGenerationsLoading = useSelector(selectGenerationsStatusLoading)

    const isLoading = isPokemonsLoading || isGenerationsLoading

    return (
        <>
            <Navbar color="#ccc" className={styles.nav}>
                <img src={logo} className={styles.logo} alt="Pokemon Logo" />
                <FilterDropdown />
                <SearchTrigger />
            </Navbar>
            <SearchPopup />
            {isLoading ? <Loading className={styles.loading} /> : <PokemonList />}
        </>
    )
}

export default React.memo(PokemonListLayout)
