import React, { useCallback, useEffect } from 'react'

import Loading from 'components/Loading'

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
    limit,
}: Props) => {
    const itemsToRender = limit * 3

    const handleScroll = useCallback(() => {
        const { scrollTop, scrollHeight, clientHeight } =
            document.documentElement
        if (scrollTop + clientHeight >= scrollHeight) {
            fetchData()
        }
    }, [fetchData])

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [handleScroll])

    return (
        <div className={className}>
            {children}
            {loading && <Loading className={styles.loading} />}
        </div>
    )
}

export default React.memo(InfiniteScroller)
