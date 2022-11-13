import React from 'react'

import styles from './Navbar.module.scss'

type Props = {
    color?: string
    children?: React.ReactNode
}

/**
 * Sticky top nav, children can be passed in to be rendered
 */
const Navbar = ({ color = '#fff', children = null }: Props) => (
    <div
        className={styles.container}
        style={{
            background: color,
        }}
    >
        {children}
    </div>
)

export default React.memo(Navbar)
