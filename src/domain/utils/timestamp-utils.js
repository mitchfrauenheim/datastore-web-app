export const epochSecondsToLocaleString = (epochSeconds) => {
    return new Date(epochSeconds*1000).toLocaleString();
}

export const epochSecondsToIsoString = (epochSeconds) => {
    return new Date(epochSeconds*1000).toISOString();
}

export const epochMillisToIsoString = (epochMillis) => {
    return new Date(epochMillis).toISOString();
}