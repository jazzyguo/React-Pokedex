import React, { useState, useEffect } from 'react'

import { searchPokemon } from 'features/pokemon'

import SearchTrigger from './SearchTrigger'
import SearchPopup from './SearchPopup'

/**
 * Handles the importing/exporting of the SearchPopup component
 * along with the Modal component which will handle the users search
 * query and display all results
 * @return {SearchTrigger, SearchPopup}
 */
const useSearchPopup = () => {
    const [isOpen, setIsOpen] = useState(false)

    return {
        SearchTrigger: ({ className }) => (
            <SearchTrigger setIsOpen={setIsOpen} className={className} />
        ),
        SearchPopup: () => (
            <SearchPopup isOpen={isOpen} setIsOpen={setIsOpen} />
        ),
    }
}

export default useSearchPopup
