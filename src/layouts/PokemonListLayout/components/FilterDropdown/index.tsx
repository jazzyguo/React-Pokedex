import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Select from 'react-select'

import {
    fetchGenerations,
    fetchGeneration,
    selectGenerationsData,
    selectGenerationsCount,
} from 'features/generations'
import { selectFilter, setFilter } from 'features/pokemon'

import styles from './FilterDropdown.module.scss'

/**
 * Handles filtering and displaying of pokemon list
 * Based on generational data
 * Also handles fetching of generations data
 */
const FilterDropdown = () => {
    const dispatch = useDispatch()

    const currentFilter = useSelector(selectFilter)
    const generations: Generations = useSelector(selectGenerationsData)
    const generationsCount = useSelector(selectGenerationsCount)

    const options = [
        { label: 'All', value: 'all' },
        ...Object.keys(generations).map(
            (_, idx) => ({
                label: `Gen. ${idx + 1}`,
                value: idx + 1,
            }),
            []
        ),
    ]

    const defaultValue = options.find(
        (option) => option.value === currentFilter
    )

    const [selectedOption, setSelectedOption] = useState(defaultValue)

    // fetch generational data to use for dropdown
    useEffect(() => {
        if (!generationsCount) {
            dispatch(fetchGenerations())
        }
    }, [dispatch])

    // update filter in store when dropdown changes
    // as well as fetch the generation data if it doesn't exist
    // this requests cache logic is handled in the thunk
    useEffect(() => {
        if (selectedOption) {
            dispatch(setFilter(selectedOption.value))
            if (selectedOption.value !== 'all') {
                dispatch(fetchGeneration(selectedOption.value))
            }
        }
    }, [selectedOption, dispatch])

    const isMobile = window.innerWidth < 768

    return (
        <div className={styles.container}>
            <Select
                defaultValue={selectedOption}
                onChange={setSelectedOption}
                options={options}
                menuPlacement={isMobile ? 'top' : 'bottom'}
                className={styles.select}
                isSearchable={false}
            />
        </div>
    )
}

export default React.memo(FilterDropdown)
