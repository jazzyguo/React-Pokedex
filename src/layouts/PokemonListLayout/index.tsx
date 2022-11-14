import React from 'react'

import PokemonList from 'components/PokemonList'
import Navbar from 'components/Navbar'

import useSearchPopup from 'lib/hooks/useSearchPopup'

import styles from './PokemonListLayout.module.scss'

const PokemonListLayout = () => {
    const { SearchPopup, SearchTrigger } = useSearchPopup()

    return (
        <>
            <Navbar color="#ccc">
                <SearchTrigger className={styles.search} />
            </Navbar>
            <SearchPopup />
            <PokemonList />
        </>
    )
}

export default React.memo(PokemonListLayout)
