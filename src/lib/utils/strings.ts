export const unslug = (slug: string) => {
    if (typeof slug !== 'string') return slug

    const words = (slug || '').split('-')
    return words
        .map((word = '') => {
            return (word[0] || '').toUpperCase() + word.slice(1)
        })
        .join(' ')
}

export const getPokemonIdFromUrl = (url: string) => {
    const parts = (url || '').split('/')
    return parts[parts.length - 2]
}
