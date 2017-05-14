import queryString from 'query-string';

export function bindMethod(ctx, ...methods) {
    methods.forEach(m => {
        let fn = ctx[m];
        if (typeof fn === 'function') {
            ctx[m] = fn.bind(ctx);
        } else {
            console.warn(`Cannot bind context to the method "${m}"`);
        }
    });
}

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