import React from 'react'

import BackButton from 'components/BackButton'
import CarouselNav from 'components/CarouselNav'

import styles from './Navbar.module.scss'

type Props = {
    color?: string
}

/**
 * Sticky top nav for the pokemon id page layout
 * that will render a back button and a way to go to the next
 * and previous pokemon based on current id
 */
const Navbar = ({ color = '#fff' }: Props) => (
    <div
        className={styles.container}
        style={{
            background: color,
        }}
    >
        <BackButton />
        <CarouselNav />
    </div>
)

export default React.memo(Navbar)
