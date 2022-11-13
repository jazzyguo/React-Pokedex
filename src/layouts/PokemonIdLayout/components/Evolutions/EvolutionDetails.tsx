import React from 'react'

import { unslug } from 'lib/utils/strings'
import { get } from 'lodash'

import styles from './Evolutions.module.scss'

type Props = {
    details?: EvolutionDetail[]
}

// depending on the trigger name
// the value can be different and involve different wordings
// ie 'use-item' should involve item.name for Use Item (item.name)
const TRIGGER_MAP = {
    'level-up': [
        {
            key: 'min_level',
            aux: 'at Lv. ',
        },
        {
            key: 'location.name',
            aux: 'at ',
        },
        {
            key: 'known_move_type.name',
            aux: 'with move of type: ',
        },
    ],
    'use-item': [
        {
            key: 'item.name',
            aux: '- ',
        },
    ],
}

const EvolutionDetails = ({ details = [] }: Props) => {
    return (
        <div className={styles.evolution_meta_detail}>
            {details.map((detail) => {
                const { trigger } = detail

                const triggerName = trigger?.name

                // get the keys to chek for in the detail object
                const triggerKeysToCheck = TRIGGER_MAP[triggerName]

                // check the keys for a found value associated to the trigger name
                // and return the first found value
                const { value: triggerKeyValue, aux } =
                    triggerKeysToCheck.reduce(
                        (foundValue, { key, aux }) =>
                            foundValue?.value
                                ? foundValue
                                : {
                                      value: get(detail, key),
                                      aux,
                                  },
                        null
                    )

                if (!triggerKeyValue) {
                    return null
                }

                return (
                    <div
                        key={trigger.name}
                        className={styles.evolution_meta_trigger}
                    >
                        {unslug(trigger.name)} {aux}
                        {unslug(triggerKeyValue)}
                    </div>
                )
            })}
        </div>
    )
}

export default React.memo(EvolutionDetails)
