import { parse } from './index';
import { findMatches, traverse } from './traverse';
/**
 * @public
 * Find AST `Nodes` within a given AST `Node` matching a `Selector`.
 *
 * @param node - the `Node` to be searched. This could be a TypeScript [`SourceFile`](https://github.com/microsoft/TypeScript/blob/main/src/services/types.ts#L159), or a `Node` from a previous query.
 * @param selector - a TSQuery `Selector` (using the [ESQuery selector syntax](https://github.com/estools/esquery)).
 * @returns an `Array` of `Nodes` which match the `Selector`.
 */
export function match(node, selector) {
    const results = [];
    traverse(node, (childNode, ancestry) => {
        if (findMatches(childNode, parse.ensure(selector), ancestry)) {
            results.push(childNode);
        }
    });
    return results;
}
//# sourceMappingURL=match.js.map