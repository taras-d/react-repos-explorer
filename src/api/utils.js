import queryString from 'query-string';
import { Subscription } from 'rxjs/Subscription';

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

export function unsub(...subs) {
    subs.forEach(s => {
        if (s && s instanceof Subscription) {
            s.unsubscribe();
        }
    });
}