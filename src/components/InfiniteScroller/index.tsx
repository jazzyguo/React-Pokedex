import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Loading from 'components/Loading'

import { selectPage, setPage } from 'features/pokemon'

import { DEFAULT_LIMIT } from 'lib/constants/api'

import { debounce } from 'lodash'
import styles from './InfiniteScroller.module.scss'

type Props = {
    className?: string
    children?: React.ReactNode
    fetchData?: () => void
    loading?: boolean
    limit?: number
}

/**
 * Handle infinite scrolling and fetching of data
 * when the user scrolls to the bottom
 *
 * Will only show a number of items at a time on a page based on limit * 3
 * to reduce the amount of items rendered at once
 * This is achieved by saving a page number in the store and slicing children
 */
const InfiniteScroller = ({
    className = '',
    children = null,
    fetchData = () => {},
    loading = false,
    limit = DEFAULT_LIMIT,
}: Props) => {
    const dispatch = useDispatch()

    const page: number = useSelector(selectPage)
    const count: number = React.Children.count(children)

    const itemsToRender = limit * 3

    const maxPage = Math.ceil(count / itemsToRender)

    const debouncedFetch = debounce(fetchData, 200)

    console.log({ page, itemsToRender, count, maxPage })

    // as well as fetching for more data if the bottom is reached and there is more data to fetch
    const handleScroll = useCallback(() => {
        const { scrollTop, scrollHeight, clientHeight } =
            document.documentElement
        if (scrollTop + clientHeight >= scrollHeight) {
            debouncedFetch()
            if(page < maxPage) {
               // dispatch(setPage(page + 1))
            }
        }
        if (scrollTop === 0) {
            if (page > 1) {
                dispatch(setPage(page - 1))
            }
        }
    }, [debouncedFetch, page, dispatch, maxPage])

    // in order to keep track of the page, we fire off actions to update the page number
    // in store upon reaching the top or bottom of the page. we know we just reached the bottom
    // and the page number must increase when we see that maxPage is greater than the current page
    //
    // the page always gets set back to 1 on dropdown filter selection in
    // src/layouts/PokemonListLayout/components/FilterDropdown

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [handleScroll])

    return (
        <div className={className}>
            {React.Children.toArray(children).slice(
                (page - 1) * itemsToRender,
                page * itemsToRender
            )}
            {loading && <Loading className={styles.loading} />}
        </div>
    )
}

export default React.memo(InfiniteScroller)
