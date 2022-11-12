export const getSpriteImageUrl = (
    id: number | string,
    { shiny = false } = {}
) =>
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
        shiny ? 'shiny/' : ''
    }${id}.png`
