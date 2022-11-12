import React, { useCallback, useEffect } from 'react'

import Loading from 'components/Loading'

import styles from './InfiniteScroller.module.scss'

const InfiniteScroller = ({
    className = '',
    children = null,
    fetchData = () => {},
    loading = false,
}) => {
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
