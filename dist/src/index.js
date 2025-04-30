import { ast } from './ast';
import { map } from './map';
import { match } from './match';
import { parse } from './parse';
import { project, files } from './project';
import { query } from './query';
import { replace } from './replace';
import { syntaxKindName } from './syntax-kind';
export { ScriptKind, SyntaxKind } from 'typescript';
export { ast } from './ast';
export { print } from './print';
export { includes } from './includes';
export { match } from './match';
export { query } from './query';
export { parse } from './parse';
export { map } from './map';
export { replace } from './replace';
export { project, files } from './project';
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