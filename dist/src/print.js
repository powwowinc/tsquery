import { EmitHint, NewLineKind, createPrinter, isSourceFile } from 'typescript';
import { ast } from './index.js';
/**
 * @public
 * Print a given `Node` or `SourceFile` to a string, using the default TypeScript printer.
 *
 * @param source - the `Node` or `SourceFile` to print.
 * @param options - any `PrinterOptions`.
 * @returns the printed code
 */
export function print(source, options = {}) {
    const printer = createPrinter({
        newLine: NewLineKind.LineFeed,
        ...options
    });
    if (!isSourceFile(source)) {
        const file = ast('');
        deletePos(source);
        return printer.printNode(EmitHint.Unspecified, source, file);
    }
    return printer.printFile(source).trim();
}
function deletePos(node) {
    node.pos = -1;
    node.forEachChild(deletePos);
}
//# sourceMappingURL=print.js.map