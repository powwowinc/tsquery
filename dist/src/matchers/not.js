import { findMatches } from '../traverse.js';
export function not(node, selector, ancestors) {
    return !selector.selectors.some((childSelector) => findMatches(node, childSelector, ancestors));
}
//# sourceMappingURL=not.js.map