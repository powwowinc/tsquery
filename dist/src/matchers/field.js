import { inPath } from '../utils.js';
export function field(node, selector, ancestors) {
    const path = selector.name.split('.');
    const ancestor = ancestors[path.length - 1];
    return inPath(node, ancestor, path);
}
//# sourceMappingURL=field.js.map