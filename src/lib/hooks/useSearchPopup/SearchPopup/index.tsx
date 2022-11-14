import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
    fetchPokemons,
    selectHasNext,
    selectCount,
    selectPokemonStatusLoading,
} from 'features/pokemon'

import Modal from 'components/Modal'

import styles from './SearchPopup.module.scss'

type Props = {
    isOpen?: boolean
    setIsOpen?: (isOpen: boolean) => void
}

/**
 * Uses modal to display a popup allowing the user to query
 * and view all pokemon that match the query
 * search is debounced on typing end
 * because pokeapi does not have any fuzzy search, when this is
 * opened, we just fetch all pokemon and filter on the client side
 */
const SearchPopup = ({ isOpen = false, setIsOpen = () => {} }: Props) => {
    const dispatch = useDispatch()

    const count = useSelector(selectCount)
    const hasNext = useSelector(selectHasNext)
    const isLoading = useSelector(selectPokemonStatusLoading)

    // lets make sure we only fetch all pokemon once
    // we achieve this by checking store for next value
    // limit is just set to the count, or 2000 if 0
    // offset is already saved in store from any other prev call
    useEffect(() => {
        if (hasNext && isOpen && !isLoading) {
            dispatch(
                fetchPokemons({
                    limit: count || 2000,
                })
            )
        }
    }, [count, hasNext, dispatch, isOpen, isLoading])

    return (
        <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
            <input type="text" />
        </Modal>
    )
}

export default React.memo(SearchPopup)
