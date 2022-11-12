import React, { useCallback, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const InfiniteScroller = ({ children = null, fetchData = () => {} }) => {
    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const handleScroll = useCallback(() => {
        const { scrollTop, scrollHeight, clientHeight } =
            document.documentElement
        if (scrollTop + clientHeight >= scrollHeight) {
            fetchData()
        }
    }, [fetchData])

    return <div>{children}</div>
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
    limit = 20,
}) => {
    const dispatch = useDispatch()

    const [currOffset, setCurrOffset] = useState(0)

    const data = useSelector(dataSelector)
    const isLoading = useSelector(loadingSelector)
    const hasNext = useSelector(hasNextSelector)

    const fetchData = useCallback(() => {
        if (isLoading || !hasNext) return
        dispatch(fetchAction({ offset: currOffset, limit }))
        setCurrOffset(currOffset + limit)
    }, [currOffset, limit, dispatch, fetchAction, isLoading, hasNext])

    // on mount, we make sure there is enough data mounted to render a scrollbar
    useEffect(() => {
        const canScroll = document.body.scrollHeight > window.innerHeight
        if (!canScroll && hasNext) {
            fetchData()
        }
    }, [hasNext, fetchData])

    return {
        InfiniteScroller: ({ children }) => (
            <InfiniteScroller fetchData={fetchData} children={children} />
        ),
        data,
    }
}

export default useInfiniteScroller
