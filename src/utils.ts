export const randomValueBetweenRangeWithBias = (min: number, max: number, bias = 1): number => {
    return Math.max(Math.pow(Math.random(), 1 / bias) * max, min)
}

export const hexToRGBA = (hex: string, alpha: number): string => {
    hex = hex.replace('#', '')

    const r = parseInt(hex.substring(0, 2), 16)
    const g = parseInt(hex.substring(2, 4), 16)
    const b = parseInt(hex.substring(4, 6), 16)

    return `rgba(${r}, ${g}, ${b}, ${alpha})`
}