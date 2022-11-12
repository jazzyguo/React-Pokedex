import React from 'react'

type Props = {
    data: Ability[]
}

const PokemonIdAbilities = ({ data }: Props) => <div>Abilities</div>

export default React.memo(PokemonIdAbilities)
