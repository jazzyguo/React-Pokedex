import React from 'react'

import styles from './Stats.module.scss'

type Props = {
    data: Stat[]
}

const PokemonIdStats = ({ data = [] }: Props) => (
    <div className={styles.container}>Stats</div>
)

export default React.memo(PokemonIdStats)
