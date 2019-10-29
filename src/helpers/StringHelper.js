export const stringFormat = (string, size) => {
    string = string.toUpperCase();

    return string.length > size ? (string.substring(0, size - 3) + '...') : string;
};