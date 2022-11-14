import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import InfiniteScroller from 'components/InfiniteScroller'

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
    limit = 100,
    shouldFetch = true,
}) => {
    const dispatch = useDispatch()

    const data = useSelector(dataSelector)
    const isLoading = useSelector(loadingSelector)
    const hasNext = useSelector(hasNextSelector)
    const currOffset = useSelector(offsetSelector)

    const fetchData = useCallback(() => {
        if (isLoading || !hasNext || !shouldFetch) return
        dispatch(fetchAction({ offset: currOffset, limit }))
    }, [
        currOffset,
        limit,
        dispatch,
        fetchAction,
        isLoading,
        hasNext,
        shouldFetch,
    ])

    // on mount, we make sure there is enough data mounted to render a scrollbar
    useEffect(() => {
        const canScroll = document.body.scrollHeight > window.innerHeight
        if (!canScroll && hasNext && shouldFetch) {
            fetchData()
        }
    }, [hasNext, fetchData, shouldFetch])

    return {
        InfiniteScroller: ({ children, className }) => (
            <InfiniteScroller
                className={className}
                fetchData={fetchData}
                children={children}
                loading={isLoading}
                limit={limit}
            />
        ),
        data,
    }
}

export default useInfiniteScroller
