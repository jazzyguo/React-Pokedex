import React from 'react'

import { unslug } from 'lib/utils/strings'

import styles from './Stats.module.scss'

type Props = {
    data: Stat[]
}

const MAX_STAT_VALUE = 255

const PokemonIdStat = ({ statName = '', value = 0 }) => {
    return (
        <div className={styles.stat}>
            <div className={styles.stat_name}>{unslug(statName)}</div>
            <div className={styles.stat_donut}>
                <div>
                    {value}/{MAX_STAT_VALUE}
                </div>
            </div>
        </div>
    )
}

const PokemonIdStats = ({ data = [] }: Props) => (
    <div className={styles.container}>
        {data.map(({ base_stat = 0, stat = {} } = {}) => (
            <PokemonIdStat
                key={stat.name}
                statName={stat.name}
                value={base_stat}
            />
        ))}
    </div>
)

export default React.memo(PokemonIdStats)
