import { inputCode } from "./input_code.js";

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

let codeStructureInfo = initializeStructureInfo();

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

function addSubBlock(startLine, endLine) {
  codeStructureInfo.subBlocks.push({
    startLine,
    endLine,
  });
}

function addMainBlock(startLine, endLine, node, key = null) {
  let id = codeStructureInfo.mainBlocks.length - 1;
  let lastMain = codeStructureInfo.mainBlocks[id];
  let nodeType = node.type;

  if (lastMain?.startLine === startLine && endLine === lastMain?.endLine) {
    return addRowBlock(node);
  }

  if (nodeType === "CatchClause") {
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
