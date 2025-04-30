import { transform, visitNode, visitEachChild } from 'typescript';
import { ast, match, parse, print } from './index';
/**
 * @public
 * Transform AST `Nodes` within a given `Node` matching a `Selector`. Can be used to do `Node`-based replacement or removal of parts of the input AST.
 *
 * @param sourceFile - the TypeScript [`SourceFile`](https://github.com/microsoft/TypeScript/blob/main/src/services/types.ts#L159) to be searched.
 * @param selector - a TSQuery `Selector` (using the [ESQuery selector syntax](https://github.com/estools/esquery)).
 * @param nodeTransformer - a function to transform any matched `Nodes`. If the original `Node` is returned, there is no change. If a new `Node` is returned, the original `Node` is replaced. If `undefined` is returned, the original `Node` is removed.
 * @returns a transformed `Node`.
 */
export function map(sourceFile, selector, nodeTransformer) {
    const matches = match(sourceFile, parse.ensure(selector));
    return mapTransform(sourceFile, matches, nodeTransformer);
}
function mapTransform(sourceFile, matches, nodeTransformer) {
    const transformer = createTransformer((node) => {
        if (matches.includes(node)) {
            return nodeTransformer(node);
        }
        return node;
    });
    const [transformed] = transform(sourceFile, [transformer]).transformed;
    return ast(print(transformed));
}
export function createTransformer(nodeTransformer) {
    return function (context) {
        return function (rootNode) {
            function visit(node) {
                const replacement = nodeTransformer(node);
                if (replacement !== node) {
                    return replacement;
                }
                return visitEachChild(node, visit, context);
            }
            return visitNode(rootNode, visit) || rootNode;
        };
    };
}
//# sourceMappingURL=map.js.map