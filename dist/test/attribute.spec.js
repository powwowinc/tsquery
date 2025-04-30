import { conditional, simpleFunction, simpleProgram } from './fixtures/index.js';
import { factory } from 'typescript';
import { tsquery, ast, parse, query } from '../src/index.js';
import { getProperties } from '../src/traverse.js';
describe('tsquery:', () => {
    describe('tsquery - attribute:', () => {
        it('should find any nodes with a property with a value that matches a specific value', () => {
            const tree = ast(conditional);
            const result = query(tree, '[name="x"]');
            expect(result).toEqual([
                tree.statements[0].expression
                    .left,
                tree.statements[0].elseStatement
                    .statements[0].expression.left,
                tree.statements[1].expression
                    .left.left.left,
                tree.statements[1].expression
                    .right
            ]);
        });
        it('should find any nodes with a property with a value that does not match a specific value', () => {
            const ast = tsquery.ast(conditional);
            const result = tsquery(ast, '[name!="x"]');
            expect(result).toEqual([
                ast.statements[0].thenStatement
                    .statements[0].expression.expression,
                ast.statements[1].thenStatement
                    .statements[0].expression.left,
                ast.statements[1].elseStatement
                    .thenStatement.statements[0].expression.left
            ]);
        });
        it('should find any nodes with a nested property with a specific value', () => {
            const ast = tsquery.ast(conditional);
            const result = tsquery(ast, '[expression.name="foo"]');
            expect(result).toEqual([
                ast.statements[0].thenStatement
                    .statements[0].expression
            ]);
        });
        it('should find any nodes with a nested properties including array values', () => {
            const ast = tsquery.ast(simpleFunction);
            const result = tsquery(ast, 'FunctionDeclaration[parameters.0.name.name="x"]');
            expect(result).toEqual([ast.statements[0]]);
        });
        it('should find any nodes with a specific property', () => {
            const ast = tsquery.ast(conditional);
            const result = tsquery(ast, '[thenStatement]');
            expect(result).toEqual([
                ast.statements[0],
                ast.statements[1],
                ast.statements[1].elseStatement
            ]);
        });
        it('should support synthesized nodes', () => {
            const ast = factory.createVariableStatement(undefined, [
                factory.createVariableDeclaration('answer', undefined, factory.createLiteralTypeNode(factory.createNumericLiteral(42)))
            ]);
            const result = tsquery(ast, '[text="answer"]');
            expect(result).toEqual([ast.declarationList.declarations[0].name]);
        });
    });
    describe('tsquery - attribute operators:', () => {
        it('should find any nodes with an attribute with a value that matches a RegExp', () => {
            const ast = tsquery.ast(simpleFunction);
            const result = tsquery(ast, '[name=/x|foo/]');
            const [statement] = ast.statements;
            expect(result).toEqual([
                hasJSDoc(statement) &&
                    (statement.jsDoc[0].tags?.[0]).name,
                statement.name,
                statement.parameters[0].name,
                statement.body
                    .statements[0].declarationList.declarations[0].initializer.left
            ]);
        });
        it('should find any nodes with an attribute with a value that does not match a RegExp', () => {
            const ast = tsquery.ast(simpleFunction);
            const result = tsquery(ast, '[name!=/x|y|z/]');
            const [statement] = ast.statements;
            expect(result).toEqual(hasJSDoc(statement) && [
                statement.jsDoc[0].tags?.[0].tagName,
                statement.jsDoc[0].tags?.[1].tagName,
                ast.statements[0].name
            ]);
        });
        it('should handle a case-insensitive RegExp', () => {
            let throws = false;
            try {
                parse('Identifier[name=/CAPTCHA/i]');
            }
            catch {
                throws = true;
            }
            expect(throws).toBe(false);
        });
        it('should find any nodes with an attribute with a value that is greater than or equal to a value', () => {
            const ast = tsquery.ast(simpleProgram);
            const result = tsquery(ast, '[statements.length>=4]');
            expect(result).toEqual([ast]);
        });
        it('should find any nodes with an attribute with a value that is greater than a value', () => {
            const ast = tsquery.ast(simpleProgram);
            const result = tsquery(ast, '[statements.length>3]');
            expect(result).toEqual([ast]);
        });
        it('should find any nodes with an attribute with a value that is less than or equal to a value', () => {
            const ast = tsquery.ast(simpleProgram);
            const result = tsquery(ast, '[statements.length<=1]');
            expect(result).toEqual([
                ast.statements[3].thenStatement
            ]);
        });
        it('should find any nodes with an attribute with a value that is a specific type', () => {
            const ast = tsquery.ast(conditional);
            const result = tsquery(ast, '[value=type(boolean)]');
            expect(result).toEqual([
                ast.statements[1].expression
                    .left.right,
                ast.statements[1].elseStatement
                    .expression
            ]);
            expect(result.every((node) => typeof getProperties(node).value === 'boolean')).toEqual(true);
        });
        it('should find any nodes with an attribute with a value that is not a specific type', () => {
            const ast = tsquery.ast(simpleProgram);
            const result = tsquery(ast, '[value!=type(string)]');
            expect(result).toEqual([
                ast.statements[0].declarationList.declarations[0]
                    .initializer,
                ast.statements[2]
                    .expression.right.right
            ]);
            expect(result.every((node) => typeof getProperties(node).value !== 'string')).toEqual(true);
        });
    });
});
function hasJSDoc(node) {
    return !!node.jsDoc;
}
//# sourceMappingURL=attribute.spec.js.map