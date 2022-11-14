import React from 'react'

import PokemonList from 'components/PokemonList'
import Navbar from 'components/Navbar'

import useSearchPopup from 'lib/hooks/useSearchPopup'

import logo from 'assets/images/logo.png'

import styles from './PokemonListLayout.module.scss'

const PokemonListLayout = () => {
    const { SearchPopup, SearchTrigger } = useSearchPopup()

    return (
        <>
            <Navbar color="#ccc">
                <img src={logo} className={styles.logo} alt="Pokemon Logo" />
                <SearchTrigger />
            </Navbar>
            <SearchPopup />
            <PokemonList />
        </>
    )
}

export default React.memo(PokemonListLayout)
