import React from 'react'

import Modal from 'components/Modal'

import styles from './SearchPopup.module.scss'

type Props = {
    isOpen?: boolean
    setIsOpen?: (isOpen: boolean) => void
}

/**
 * Uses modal to display a popup allowing the user to query
 * and view all pokemon that match the query
 */
const SearchPopup = ({ isOpen = false, setIsOpen = () => {} }: Props) => {
    return (
        <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
            <div>hi</div>
        </Modal>
    )
}

export default React.memo(SearchPopup)
