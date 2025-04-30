import { conditional, forLoop, simpleFunction, simpleProgram } from './fixtures/index.js';
import { tsquery } from '../src/index.js';
describe('tsquery:', () => {
    describe('tsquery - matches:', () => {
        it('should find any nodes that match a SyntaxKind', () => {
            const ast = tsquery.ast(conditional);
            const result = tsquery(ast, ':matches(IfStatement)');
            expect(result).toEqual([
                ast.statements[0],
                ast.statements[1],
                ast.statements[1].elseStatement
            ]);
        });
        it('should find any nodes that matches one of several SyntaxKind', () => {
            const ast = tsquery.ast(forLoop);
            const result = tsquery(ast, ':matches(BinaryExpression, ExpressionStatement)');
            expect(result).toEqual([
                ast.statements[0].initializer,
                ast.statements[0].condition,
                ast.statements[0].statement.statements[0]
            ]);
        });
        it('should find any nodes that match an attribute or a SyntaxKind', () => {
            const ast = tsquery.ast(simpleFunction);
            const result = tsquery(ast, ':matches([name="foo"], ReturnStatement)');
            expect(result).toEqual([
                ast.statements[0].name,
                ast.statements[0].body.statements[2]
            ]);
        });
        it('should find any nodes that implicitly match one of several SyntaxKinds', () => {
            const ast = tsquery.ast(simpleProgram);
            const result = tsquery(ast, 'BinaryExpression, VariableStatement');
            expect(result).toEqual([
                ast.statements[0],
                ast.statements[1],
                ast.statements[2].expression,
                ast.statements[2]
                    .expression.right,
                ast.statements[3].thenStatement
                    .statements[0].expression
            ]);
        });
    });
});
//# sourceMappingURL=matches.spec.js.map