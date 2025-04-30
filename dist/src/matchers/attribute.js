import { getPath } from '../utils';
const OPERATOR = {
    '=': equal,
    '!=': notEqual,
    '<=': lessThanEqual,
    '<': lessThan,
    '>=': greaterThanEqual,
    '>': greaterThan
};
export function attribute(node, selector) {
    const obj = getPath(node, selector.name);
    // Bail on undefined but *not* if value is explicitly `null`:
    if (obj === undefined) {
        return false;
    }
    if (selector?.operator == null) {
        return obj != null;
    }
    const { operator } = selector;
    if (!selector?.value) {
        return false;
    }
    const { type, value } = selector.value;
    const matcher = OPERATOR[operator];
    if (matcher) {
        return matcher(obj, value, type);
    }
    return false;
}
function equal(obj, value, type) {
    switch (type) {
        case 'regexp':
            return typeof obj === 'string' && value.test(obj);
        case 'literal':
            return `${value}` === `${obj}`;
        case 'type':
            return value === typeof obj;
    }
}
function notEqual(obj, value, type) {
    switch (type) {
        case 'regexp':
            return typeof obj === 'string' && !value.test(obj);
        case 'literal':
            return `${value}` !== `${obj}`;
        case 'type':
            return value !== typeof obj;
    }
}
function lessThanEqual(obj, value) {
    return obj <= value;
}
function lessThan(obj, value) {
    return obj < value;
}
function greaterThanEqual(obj, value) {
    return obj >= value;
}
function greaterThan(obj, value) {
    return obj > value;
}
//# sourceMappingURL=attribute.js.map