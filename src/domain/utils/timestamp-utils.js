export const epochSecondsToLocaleString = (epochSeconds) => {
    return new Date(epochSeconds*1000).toLocaleString();
}