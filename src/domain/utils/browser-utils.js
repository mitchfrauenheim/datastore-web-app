export const writeObjectToLocalStorage = (storageName, objectToStore) => {
    // write specified object to browser storage using specified name as key in map
    window.localStorage.setItem(storageName, JSON.stringify(objectToStore));
}

export const readObjectFromLocalStorage = (storageName, objectToReadInto) => {
    // read object with specified name from browser storage map into specified object
    return Object.assign(
        objectToReadInto, JSON.parse(window.localStorage.getItem(storageName)));
}