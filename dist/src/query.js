import { ast, match, parse } from './index.js';
export function query(code, selector, scriptKind) {
    return match(ast.ensure(code, scriptKind), parse.ensure(selector));
}
//# sourceMappingURL=query.js.map