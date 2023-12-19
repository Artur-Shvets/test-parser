function generateAST(codeInput) {
    return Babel.transform(codeInput, {
        ast: true
    });
}

const codeInput = `
  function generateAST(codeInput) {
    return Babel.transform(codeInput, {
        ast: true
    });
}
`;

console.log(generateAST(codeInput).ast)
