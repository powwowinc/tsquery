import { SyntaxKind } from 'typescript';
import { conditional, simpleFunction } from './fixtures/index.js';
import { tsquery } from '../src/index.js';
describe('tsquery:', () => {
    describe('tsquery - identifier:', () => {
        it('should find any nodes of a specific SyntaxKind', () => {
            const ast = tsquery.ast(conditional);
            const result = tsquery(ast, 'Identifier');
            expect(result[0].kind).toEqual(SyntaxKind.Identifier);
            expect(result).toEqual([
                ast.statements[0].expression
                    .left,
                ast.statements[0].thenStatement
                    .statements[0].expression.expression,
                ast.statements[0].elseStatement
                    .statements[0].expression.left,
                ast.statements[1].expression
                    .left.left.left,
                ast.statements[1].expression
                    .right,
                ast.statements[1].thenStatement
                    .statements[0].expression.left,
                ast.statements[1].elseStatement
                    .thenStatement.statements[0].expression.left
            ]);
        });
        it('should work with JSDoc contents', () => {
            const ast = tsquery.ast(simpleFunction);
            const result = tsquery(ast, 'FunctionDeclaration JSDocParameterTag');
            expect(result[0].kind).toEqual(SyntaxKind.JSDocParameterTag);
            const [statement] = ast.statements;
            expect(result).toEqual(hasJSDoc(statement) && [
                statement.jsDoc[0].tags?.[0],
                statement.jsDoc[0].tags?.[1]
            ]);
        });
        it('should throw if an invalid SyntaxKind is used', () => {
            const ast = tsquery.ast(conditional);
            expect(() => {
                tsquery(ast, 'FooBar');
            }).toThrow('"FooBar" is not a valid TypeScript Node kind.');
        });
    });
});
function hasJSDoc(node) {
    return !!node.jsDoc;
}
//# sourceMappingURL=identifier.spec.js.map