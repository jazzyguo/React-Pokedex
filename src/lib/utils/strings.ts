export const unslug = (slug: string) => {
    const words = slug.split('-')
    return words
        .map((word = '') => {
            return (word[0] || '').toUpperCase() + word.slice(1)
        })
        .join(' ')
}
