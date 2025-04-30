import { attribute } from './attribute.js';
import { child } from './child.js';
import { classMatcher } from './class.js';
import { descendant } from './descendant.js';
import { field } from './field.js';
import { has } from './has.js';
import { identifier } from './identifier.js';
import { matches } from './matches.js';
import { not } from './not.js';
import { nthChild, nthLastChild } from './nth-child.js';
import { adjacent, sibling } from './sibling.js';
import { type } from './type.js';
import { wildcard } from './wildcard.js';
export const MATCHERS = {
    adjacent,
    attribute,
    child,
    compound: matches('every'),
    class: classMatcher,
    descendant,
    field,
    'nth-child': nthChild,
    'nth-last-child': nthLastChild,
    has,
    identifier,
    matches: matches('some'),
    not,
    sibling,
    type,
    wildcard
};
//# sourceMappingURL=index.js.map