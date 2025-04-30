import { findMatches } from '../traverse.js';
export function descendant(node, selector, ancestors) {
    if (findMatches(node, selector.right, ancestors)) {
        return ancestors.some((ancestor, index) => findMatches(ancestor, selector.left, ancestors.slice(index + 1)));
    }
    return false;
}
//# sourceMappingURL=descendant.js.map