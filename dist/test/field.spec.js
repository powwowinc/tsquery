import { conditional, simpleProgram } from './fixtures/index.js';
import { tsquery } from '../src/index.js';
describe('tsquery:', () => {
    describe('tsquery - field:', () => {
        it('should find any nodes with a single field', () => {
            const ast = tsquery.ast(conditional);
            const result = tsquery(ast, '.expression');
            expect(result).toEqual([
                ast.statements[0].expression,
                ast.statements[0].thenStatement
                    .statements[0].expression,
                ast.statements[0].thenStatement
                    .statements[0].expression.expression,
                ast.statements[0].elseStatement
                    .statements[0].expression,
                ast.statements[1].expression,
                ast.statements[1].thenStatement
                    .statements[0].expression,
                ast.statements[1].elseStatement
                    .expression,
                ast.statements[1].elseStatement
                    .thenStatement.statements[0].expression
            ]);
        });
        it('should find any nodes with a field sequence', () => {
            const ast = tsquery.ast(simpleProgram);
            const result = tsquery(ast, '.declarations.initializer');
            expect(result).toEqual([
                ast.statements[0].declarationList.declarations[0]
                    .initializer,
                ast.statements[1].declarationList.declarations[0]
                    .initializer
            ]);
        });
    });
});
//# sourceMappingURL=field.spec.js.map