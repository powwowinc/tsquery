import { attribute } from './attribute';
import { child } from './child';
import { classMatcher } from './class';
import { descendant } from './descendant';
import { field } from './field';
import { has } from './has';
import { identifier } from './identifier';
import { matches } from './matches';
import { not } from './not';
import { nthChild, nthLastChild } from './nth-child';
import { adjacent, sibling } from './sibling';
import { type } from './type';
import { wildcard } from './wildcard';
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