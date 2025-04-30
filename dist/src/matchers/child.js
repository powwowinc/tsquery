import { findMatches } from '../traverse';
export function child(node, selector, ancestors) {
    if (findMatches(node, selector.right, ancestors)) {
        return findMatches(ancestors[0], selector.left, ancestors.slice(1));
    }
    return false;
}
//# sourceMappingURL=child.js.map