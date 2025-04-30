import * as esquery from 'esquery';
import { SyntaxKind } from 'typescript';
const IDENTIFIER_QUERY = 'identifier';
/**
 * @public
 * Parse a `string` into an ESQuery `Selector`.
 *
 * @param selector - a TSQuery `Selector` (using the [ESQuery selector syntax](https://github.com/estools/esquery)).
 * @returns a validated `Selector` or `null` if the input `string` is invalid.
 * @throws if the `Selector` is syntactically valid, but contains an invalid TypeScript Node kind.
 */
export function parse(selector) {
    const cleanSelector = stripComments(stripNewLines(selector));
    return validate(esquery.parse(cleanSelector));
}
/**
 * @public
 * Ensure that an input is a parsed ESQuery `Selector`.
 *
 * @param selector - a TSQuery `Selector` (using the [ESQuery selector syntax](https://github.com/estools/esquery)).
 * @returns a validated `Selector`
 * @throws if the input `string` is invalid.
 */
parse.ensure = function ensure(selector) {
    if (isSelector(selector)) {
        return selector;
    }
    const parsed = parse(selector);
    if (!parsed) {
        throw new SyntaxError(`"${selector}" is not a valid TSQuery Selector.`);
    }
    return parsed;
};
function isSelector(selector) {
    return typeof selector !== 'string';
}
function stripComments(input) {
    return input.replace(/\/\*[\w\W]*\*\//g, '');
}
function stripNewLines(input) {
    return input.replace(/\n/g, '');
}
function validate(selector) {
    if (!selector) {
        return null;
    }
    const { selectors } = selector;
    if (selectors) {
        selectors.map(validate);
    }
    const { left, right } = selector;
    if (left) {
        validate(left);
    }
    if (right) {
        validate(right);
    }
    if (selector.type === IDENTIFIER_QUERY) {
        const { value } = selector;
        if (SyntaxKind[value] == null) {
            throw new SyntaxError(`"${value}" is not a valid TypeScript Node kind.`);
        }
    }
    return selector;
}
//# sourceMappingURL=parse.js.map