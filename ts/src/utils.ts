
export const getKeys = <T extends any>(o: T): Array<keyof T> => {
    const keys:Array<keyof T> = [];
    for (let key in o) {
        keys.push(key);
    }
    return keys;
}