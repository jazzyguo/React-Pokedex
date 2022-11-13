import React from 'react'

import DonutChart from 'components/DonutChart'

import { unslug } from 'lib/utils/strings'
import { STAT_COLORS } from 'lib/constants/pokemonTypes'

import styles from './Stats.module.scss'

type Props = {
    data: Stat[]
}

const MAX_STAT_VALUE = 255

/**
 * Renders a donut chart for each stat
 */
const PokemonIdStats = ({ data = [] }: Props) => (
    <div className={styles.container}>
        <h2>Base Stats</h2>
        <div className={styles.grid_container}>
            {data.map(({ base_stat = 0, stat = {} } = {}) => {
                const percentage = (base_stat / MAX_STAT_VALUE) * 100
                const statColor = STAT_COLORS[stat.name]
                return (
                    <DonutChart
                        key={stat.name}
                        percentage={percentage}
                        label={unslug(stat.name)}
                        centerText={`${base_stat}/${MAX_STAT_VALUE}`}
                        color={statColor}
                    />
                )
            })}
        </div>
    </div>
)

export default React.memo(PokemonIdStats)
