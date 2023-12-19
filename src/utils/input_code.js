export const inputCode = `function generateHtml() {
  try {
    const { ast } = generateAST(inputCode);
    console.log("<| AST |>", ast);
    traverseAST(ast.program.body, visitor);
    createStructureTags();
    setInputContent(inputCode);
    setOutputHtml(codeStructureInfo.codeLines.join(""));

    console.log("<<< codeStructureInfo >>>", codeStructureInfo);
  } catch (error) {
    console.log("<<< error >>>", error);
  }
}

generateHtml();

function initializeStructureInfo() {
  let codeLines = inputCode.split("");
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


function addMainBlock(startLine, endLine, node) {
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
  if (lastMain?.nodeType === "IfStatement" && nodeType === "IfStatement") {
    return;
  }

  endLine++;
  codeStructureInfo.mainBlocks.push({
    startLine,
    endLine,
    nodeType,
  });
}

function createItemTags() {
  let newCodeLines = [];
  let codeLines = codeStructureInfo.codeLines;
  codeStructureInfo.rows.forEach((row, index) => {
    let lineChars = [...codeLines[index]];
    row.blocks.reverse();

    row.blocks.forEach((block) => {
      lineChars[block.start] = '';
      lineChars[block.end - 1] = '';
    });
    row.content = lineChars.join("");
  });
  codeStructureInfo.codeLines = newCodeLines;
}

function createRowTags() {
  let updatedCodeLines = codeStructureInfo.rows.map((row) => {
    let content;
    let newRowContent;
    row.content = row.content.trimStart();
    if (/[\\}\\{]/.test(row.content.slice(-3))) {
      newRowContent = '';
    } else if (row.content) {
      let isOpenTag = row.content.slice(0, 5) == "<span";
      let isCloseTag = row.content.slice(-7) == "</span>";

      if (isOpenTag && isCloseTag) {
        content = row.content.slice(18, -7);
      } else if (isOpenTag) {
        content = row.content.slice(18);
      } else if (isCloseTag) {
        content = "'>" + row.content.slice(0, -7);
      } else {
        content = "'>" + row.content;
      }
      // console.log("content", content);
      newRowContent = '';
    } else {
      newRowContent = "<br>";
    }

    return newRowContent;
  });
  codeStructureInfo.codeLines = updatedCodeLines;
}

function createSubBlockTags() {
  let updatedCodeLines = [...codeStructureInfo.codeLines];
  codeStructureInfo.subBlocks.forEach((block) => {
    updatedCodeLines[block.startLine] = '';
    //  SUBBLOCK LINES BUG FIX
    if (block.endLine - 2 < updatedCodeLines.length) {
      updatedCodeLines[block.endLine - 2] = '';
    }
  });
  codeStructureInfo.codeLines = updatedCodeLines;
}

function createMainBlockTags() {
  let updatedCodeLines = [...codeStructureInfo.codeLines];
  codeStructureInfo.mainBlocks.forEach((mainBlock) => {
    if (mainBlock.startLine - 1 < updatedCodeLines.length) {
      updatedCodeLines[mainBlock.startLine - 1] = '';
    }
    if (mainBlock.endLine - 2 < updatedCodeLines.length) {
      updatedCodeLines[mainBlock.endLine - 2] = '';
    }
  });
  codeStructureInfo.codeLines = updatedCodeLines;
}



const output = document.getElementById("output");
const input = document.getElementById("input");


function processNode(node, visitor) {
  const typeDescription = astNodeTypes[node.type];
  const keysToTraverse = typeDescription
    ? Object.keys(typeDescription)
    : Object.keys(node);

  keysToTraverse.forEach((key) => {


  });
}


function traverseAST(node, visitor) {
  if (!node) return;
  console.log("___TYPE___", node.type);
  if (Array.isArray(node)) {
    node.forEach((child) => traverseAST(child, visitor));
  } else if (typeof node === "object") {
    visitor(node);
    processNode(node, visitor);
  }
}



function visitor(node) {
  let startLine = node.loc.start.line;
  let endLine = node.loc.end.line;
  let nodeType = node.type;
  let endColumn = node.loc.end.column;

  if (startLine === endLine) {
    switch (nodeType) {
      case "ObjectProperty":
        addRowBlock(node, endColumn + 1);
        break;
      default:
        addRowBlock(node);
        break;
    }
  } else {
    switch (nodeType) {
      case "ObjectExpression":
        // console.log("ObjectExpression", startLine, endLine);
        addSubBlock(startLine, endLine);
        break;
      case "ClassBody":
        addSubBlock(startLine, endLine);
        break;
      case "BlockStatement":
        addSubBlock(startLine, endLine);
        break;
      default:
        addMainBlock(startLine, endLine, node);
        break;
    }
  }
}
`;
