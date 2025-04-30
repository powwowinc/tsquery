import { conditional } from './fixtures';
import { tsquery } from '../src/index';
describe('tsquery:', () => {
    describe('tsquery - :has:', () => {
        it('should find any nodes with multiple attributes', () => {
            const ast = tsquery.ast(conditional);
            const result = tsquery(ast, 'ExpressionStatement:has([name="foo"][kindName="Identifier"])');
            expect(result).toEqual([
                ast.statements[0].thenStatement
                    .statements[0]
            ]);
        });
        it('should find any nodes with one of multiple attributes', () => {
            const ast = tsquery.ast(conditional);
            const result = tsquery(ast, 'IfStatement:has(BinaryExpression [name="foo"], BinaryExpression [name="x"])');
            expect(result).toEqual([ast.statements[0], ast.statements[1]]);
        });
        it('should handle chained :has selectors', () => {
            const ast = tsquery.ast(conditional);
            const result = tsquery(ast, 'BinaryExpression:has(Identifier[name="x"]):has([text="test"])');
            expect(result).toEqual([
                ast.statements[1].expression,
                ast.statements[1].expression
                    .left,
                ast.statements[1].expression
                    .left.left
            ]);
        });
        it('should handle nested :has selectors', () => {
            const ast = tsquery.ast(conditional);
            const result = tsquery(ast, 'SourceFile:has(IfStatement:has(TrueKeyword, FalseKeyword))');
            expect(result).toEqual([ast]);
        });
    });
});
//# sourceMappingURL=has.spec.js.map