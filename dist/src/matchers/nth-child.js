import { findMatches } from '../traverse.js';
import { getVisitorKeys } from './sibling.js';
export function nthChild(node, selector, ancestors) {
    const { right } = selector;
    if (right && !findMatches(node, right, ancestors)) {
        return false;
    }
    return findNthChild(node, () => selector.index.value - 1);
}
export function nthLastChild(node, selector, ancestors) {
    const { right } = selector;
    if (right && !findMatches(node, right, ancestors)) {
        return false;
    }
    return findNthChild(node, (length) => length - selector.index.value);
}
function findNthChild(node, getIndex) {
    if (!node.parent) {
        return false;
    }
    const keys = getVisitorKeys(node.parent || null);
    return keys.some((key) => {
        const prop = node.parent[key];
        if (Array.isArray(prop)) {
            const index = prop.indexOf(node);
            return index >= 0 && index === getIndex(prop.length);
        }
        return false;
    });
}
//# sourceMappingURL=nth-child.js.map