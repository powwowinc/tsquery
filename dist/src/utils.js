import { getProperties } from './traverse';
export function getPath(obj, path) {
    const keys = path.split('.');
    for (const key of keys) {
        if (obj == null) {
            return obj;
        }
        const properties = isNode(obj) ? getProperties(obj) : {};
        obj =
            key in properties
                ? properties[key]
                : obj[key];
    }
    return obj;
}
export function isNode(node) {
    return !!node.getSourceFile;
}
export function inPath(node, ancestor, path) {
    if (path.length === 0) {
        return node === ancestor;
    }
    if (ancestor == null) {
        return false;
    }
    const [first] = path;
    const field = ancestor[first];
    const remainingPath = path.slice(1);
    if (Array.isArray(field)) {
        return field.some((item) => inPath(node, item, remainingPath));
    }
    else {
        return inPath(node, field, remainingPath);
    }
}
//# sourceMappingURL=utils.js.map