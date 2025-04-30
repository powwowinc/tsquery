import { findMatches } from '../traverse';
export function matches(modifier) {
    return function (node, selector, ancestors) {
        return selector.selectors[modifier]((childSelector) => findMatches(node, childSelector, ancestors));
    };
}
//# sourceMappingURL=matches.js.map