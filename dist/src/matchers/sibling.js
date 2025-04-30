import { findMatches } from '../traverse.js';
export function sibling(node, selector, ancestors) {
    return !!((findMatches(node, selector.right, ancestors) &&
        findSibling(node, ancestors, siblingLeft)) ||
        (selector.left.subject &&
            findMatches(node, selector.left, ancestors) &&
            findSibling(node, ancestors, siblingRight)));
    function siblingLeft(prop, index) {
        return prop
            .slice(0, index)
            .some((precedingSibling) => findMatches(precedingSibling, selector.left, ancestors));
    }
    function siblingRight(prop, index) {
        return prop
            .slice(index, prop.length)
            .some((followingSibling) => findMatches(followingSibling, selector.right, ancestors));
    }
}
export function adjacent(node, selector, ancestors) {
    return !!((findMatches(node, selector.right, ancestors) &&
        findSibling(node, ancestors, adjacentLeft)) ||
        (selector.right.subject &&
            findMatches(node, selector.left, ancestors) &&
            findSibling(node, ancestors, adjacentRight)));
    function adjacentLeft(prop, index) {
        return index > 0 && findMatches(prop[index - 1], selector.left, ancestors);
    }
    function adjacentRight(prop, index) {
        return (index < prop.length - 1 &&
            findMatches(prop[index + 1], selector.right, ancestors));
    }
}
function findSibling(node, ancestors, test) {
    const [parent] = ancestors;
    if (!parent) {
        return false;
    }
    const keys = getVisitorKeys(node.parent || null);
    return keys.some((key) => {
        const prop = node.parent[key];
        if (Array.isArray(prop)) {
            const index = prop.indexOf(node);
            if (index === -1) {
                return false;
            }
            return test(prop, index);
        }
        return false;
    });
}
const FILTERED_KEYS = ['parent'];
export function getVisitorKeys(node) {
    return node
        ? Object.keys(node)
            .filter((key) => !FILTERED_KEYS.includes(key))
            .filter((key) => {
            const value = node[key];
            return Array.isArray(value) || typeof value === 'object';
        })
        : [];
}
//# sourceMappingURL=sibling.js.map