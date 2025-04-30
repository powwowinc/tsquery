import { createSourceFile, ScriptTarget } from 'typescript';
import { ScriptKind } from './index';
/**
 * @public
 * Parse a string of code into an Abstract Syntax Tree which can then be queried with TSQuery Selectors.
 *
 * @param source - the code that should be parsed into a [`SourceFile`](https://github.com/microsoft/TypeScript/blob/main/src/services/types.ts#L159). A `SourceFile` is the TypeScript implementation of an Abstract Syntax Tree (with extra details).
 * @param fileName - a name (if known) for the `SourceFile`. Defaults to empty string.
 * @param scriptKind - the TypeScript [`ScriptKind`](https://github.com/microsoft/TypeScript/blob/main/src/compiler/types.ts#L7305) of the code. Defaults to `ScriptKind.TSX`. Set this to `ScriptKind.TS` if your code uses the `<Type>` syntax for casting.
 * @returns a TypeScript `SourceFile`.
 */
export function ast(source, fileName = '', scriptKind = ScriptKind.TSX) {
    return createSourceFile(fileName || '', source, ScriptTarget.Latest, true, scriptKind);
}
function ensure(code, scriptKind) {
    return isNode(code) ? code : ast(code, '', scriptKind);
}
ast.ensure = ensure;
function isNode(node) {
    return !!node.getSourceFile;
}
//# sourceMappingURL=ast.js.map