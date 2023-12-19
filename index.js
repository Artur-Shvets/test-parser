"use strict";
// index.js
// Цей файл є основним входом у JavaScript Code Visualizer.
// Він координує процес перетворення вхідного коду JavaScript в візуалізоване HTML-представлення.
import { inputCode } from "./src/utils/input_code.js";
import { codeStructureInfo } from "./src/utils/StructureTagsManager.js";
import { traverseAST, visitor } from "./src/ast/AstTraverser.js";
import { generateAST } from "./src/ast/AstGenerator.js";
import { createStructureTags } from "./src/ui/CodeVisualizer.js";
import { setInputContent, setOutputHtml } from "./src/ui/DomHandler.js";

// Генерує HTML-представлення вхідного коду.
// Отримує AST від вхідного коду, обходить його та створює відповідне HTML-представлення.
function generateHtml() {
  try {
    const { ast } = generateAST(inputCode);
    console.log("<| AST |>\n", ast);
    traverseAST(ast.program.body, visitor);

    createStructureTags();
    // console.log("<| codeLines |>\n", codeStructureInfo.codeLines);
    setInputContent(inputCode);
    setOutputHtml(codeStructureInfo.codeLines.join(""));

    console.log("<<< codeStructureInfo >>>", codeStructureInfo);
  } catch (error) {
    // console.error("Error generating HTML:", error);
  }
}

generateHtml(); // Виклик функції для ініціації процесу візуалізації.
