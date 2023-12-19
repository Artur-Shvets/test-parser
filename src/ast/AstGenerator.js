export function generateAST(codeInput) {
    return Babel.transform(codeInput, {
        ast: true
    });
}
