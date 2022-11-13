import React from 'react'
import { useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'

import { selectCount } from 'features/pokemon'
import { getSpriteImageUrl } from 'lib/utils/image'

import cx from 'classnames'
import styles from './CarouselNav.module.scss'

/**
 * Will render a way to go to the next
 * and previous pokemon based on current id
 * while rendering sprites
 */
const CarouselNav = () => {
    const { id } = useParams()
    const navigate = useNavigate()

    // make sure we can go prev or next based on count
    const count: number = useSelector(selectCount)

    const numberId = Number(id)
    const prev = numberId - 1
    const next = numberId + 1

    const hasPrev = prev > 0
    const hasNext = next <= count

    const ids = [
        ...(hasPrev ? [prev] : []),
        numberId,
        ...(hasNext ? [next] : []),
    ]

    return (
        <div className={styles.carouselNav}>
            {ids.map((id) => {
                const spriteUrl = getSpriteImageUrl(id)
                const isActive = id === numberId

                return (
                    <div
                        key={id}
                        className={cx(styles.carouselNav_item, {
                            [styles['carouselNav_item--active']]: isActive,
                        })}
                        onClick={() => !isActive && navigate(`/pokemon/${id}`)}
                    >
                        <img src={spriteUrl} alt={`${id}`} />
                    </div>
                )
            })}
        </div>
    )
}

export default React.memo(CarouselNav)
