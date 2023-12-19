// Цей файл відповідає за управління структурними тегами коду,
// що включає в себе логіку для ідентифікації та класифікації різних частин аналізованого коду.
import { inputCode } from "./input_code.js";

// Розбиває вхідний код на окремі рядки та ініціалізує
// базову структуру для подальшого аналізу та візуалізації.
function initializeStructureInfo() {
  let codeLines = inputCode.split("\n");
  return {
    codeLines: codeLines,
    rows: codeLines.map((codeLines, index) => ({
      blocks: [],
      line: index,
      content: codeLines,
      length: codeLines.length - 1,
      type: "",
    })),
    mainBlocks: [],
    subBlocks: [],
  };
}

// codeStructureInfo зберігає інформацію про всі рядки коду,
// а також про основні та підпорядковані блоки, ідентифіковані під час аналізу.
let codeStructureInfo = initializeStructureInfo();

// Додає блок інформації до визначеного рядка коду.
// 'node' представляє собою вузол AST, з якого витягується інформація.
function addRowBlock(node, endColumn = node.loc.end.column) {
  const startLine = node?.loc.start.line - 1;
  if (codeStructureInfo.rows[startLine]) {
    codeStructureInfo.rows[startLine].blocks.push({
      start: node.loc.start.column,
      end: endColumn,
      type: node.type,
    });
    codeStructureInfo.rows[startLine].type = node.type;
  }
}

// Додає підблок до структури візуалізації коду.
// Підблоки використовуються для представлення вкладених структур коду,
function addSubBlock(startLine, endLine) {
  codeStructureInfo.subBlocks.push({
    startLine,
    endLine,
  });
}

// Функція для додавання основного блоку до структури
function addMainBlock(startLine, endLine, node, key = null) {
  let id = codeStructureInfo.mainBlocks.length - 1;
  let lastMain = codeStructureInfo.mainBlocks[id];
  let nodeType = node.type;

  if (lastMain?.startLine === startLine && endLine === lastMain?.endLine) {
    return addRowBlock(node);
  }

  if (nodeType === "CatchClause") {
    console.log("TTT >>>");
    return;
  }

  if (nodeType === "SwitchStatement") {
    addSubBlock(startLine, endLine);
  }
  if (nodeType === "SwitchCase") {
    addSubBlock(startLine, endLine + 1);
  }
  if (key === "alternate" && nodeType === "IfStatement") {
    return;
  }

  endLine++;
  codeStructureInfo.mainBlocks.push({
    startLine,
    endLine,
    nodeType,
  });
}

export { addRowBlock, addSubBlock, addMainBlock, codeStructureInfo };
