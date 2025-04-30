import { findMatches, traverse } from '../traverse.js';
export function has(node, selector) {
    const collector = [];
    selector.selectors.forEach((childSelector) => {
        traverse(node, (childNode, ancestors) => {
            if (findMatches(childNode, childSelector, ancestors)) {
                collector.push(childNode);
            }
        });
    });
    return collector.length > 0;
}
//# sourceMappingURL=has.js.map