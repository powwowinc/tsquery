import { syntaxKindName } from '../syntax-kind.js';
export function identifier(node, selector) {
    const name = syntaxKindName(node.kind);
    return !!name && name.toLowerCase() === selector.value.toLowerCase();
}
//# sourceMappingURL=identifier.js.map