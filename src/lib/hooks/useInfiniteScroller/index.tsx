import React, { useCallback, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const InfiniteScroller = ({
    className = '',
    children = null,
    fetchData = () => {},
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

    return <div className={className}>{children}</div>
}

/**
 *
 * @param fetchAction action creator to fetch data
 * @param dataSelector selector to get data from redux store
 * @param loadingSelector selector to get loading status from redux store
 * @param hasNextSelector selector to get hasNext status from redux store
 * @returns
 */
const useInfiniteScroller = ({
    fetchAction = (props) => props,
    dataSelector = () => [],
    loadingSelector = () => false,
    hasNextSelector = () => false,
    offsetSelector = () => 0,
    limit = 40,
}) => {
    const dispatch = useDispatch()

    const data = useSelector(dataSelector)
    const isLoading = useSelector(loadingSelector)
    const hasNext = useSelector(hasNextSelector)
    const currOffset = useSelector(offsetSelector)

    const fetchData = useCallback(() => {
        if (isLoading || !hasNext) return
        dispatch(fetchAction({ offset: currOffset, limit }))
    }, [currOffset, limit, dispatch, fetchAction, isLoading, hasNext])

    // on mount, we make sure there is enough data mounted to render a scrollbar
    useEffect(() => {
        const canScroll = document.body.scrollHeight > window.innerHeight
        if (!canScroll && hasNext) {
            fetchData()
        }
    }, [hasNext, fetchData])

    return {
        InfiniteScroller: ({ children, className }) => (
            <InfiniteScroller
                className={className}
                fetchData={fetchData}
                children={children}
            />
        ),
        data,
    }
}

export default useInfiniteScroller
