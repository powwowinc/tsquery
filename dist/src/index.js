import { ast } from './ast.js';
import { map } from './map.js';
import { match } from './match.js';
import { parse } from './parse.js';
import { project, files } from './project.js';
import { query } from './query.js';
import { replace } from './replace.js';
import { syntaxKindName } from './syntax-kind.js';
export { ScriptKind, SyntaxKind } from 'typescript';
export { ast } from './ast.js';
export { print } from './print.js';
export { includes } from './includes.js';
export { match } from './match.js';
export { query } from './query.js';
export { parse } from './parse.js';
export { map } from './map.js';
export { replace } from './replace.js';
export { project, files } from './project.js';
/**
 * @deprecated Will be removed in v7. Use the directly exported functions instead:
 *
 * ```
 * // Use:
 * import { ast } from '@phenomnomnominal/tsquery';
 * ast('1 + 1')
 *
 * // Don't use:
 * import { tsquery } from '@phenomnomnominal/tsquery';
 * tsquery.ast('1 + 1')
 * ```
 */
const api = query;
api.ast = ast;
api.map = map;
api.match = match;
api.parse = parse;
api.project = project;
api.projectFiles = files;
api.query = query;
api.replace = replace;
api.syntaxKindName = syntaxKindName;
export const tsquery = api;
//# sourceMappingURL=index.js.map