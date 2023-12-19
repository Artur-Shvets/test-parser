"use strict";
import { inputCode } from "./src/utils/input_code.js";
import { codeStructureInfo } from "./src/utils/StructureTagsManager.js";
import { traverseAST, visitor } from "./src/ast/AstTraverser.js";
import { generateAST } from "./src/ast/AstGenerator.js";
import { createStructureTags } from "./src/ui/CodeVisualizer.js";
import { setInputContent, setOutputHtml } from "./src/ui/DomHandler.js";

function generateHtml() {
  try {
    const { ast } = generateAST(inputCode);
    traverseAST(ast.program.body, visitor);
    createStructureTags();
    setInputContent(inputCode);
    setOutputHtml(codeStructureInfo.codeLines.join(""));
  } catch (error) {
    console.error("Error generating HTML:", error);
  }
}

generateHtml();
