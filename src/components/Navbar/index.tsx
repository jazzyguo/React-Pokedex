import React from 'react'

import cx from 'classnames'

import styles from './Navbar.module.scss'

type Props = {
    color?: string
    children?: React.ReactNode
    className?: string
}

/**
 * Sticky nav, children can be passed in to be rendered
 */
const Navbar = ({ color = '#fff', children = null, className = '' }: Props) => (
    <div
        className={cx(className, styles.container)}
        style={{
            background: color,
        }}
    >
        {children}
    </div>
)

export default React.memo(Navbar)
