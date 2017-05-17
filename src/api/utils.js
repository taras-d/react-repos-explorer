import queryString from 'query-string';

export function parseQuery(str, options) {
    return queryString.parse(str, options);
}

export function stringifyQuery(obj, options) {
    return queryString.stringify(obj, options);
}

export function getRepoSize(sizeKb) {
    if (sizeKb < 1024) {
        return `${sizeKb} Kb`;
    } else {
        return `${(sizeKb / 1024).toFixed(2)} Mb`;
    }
}