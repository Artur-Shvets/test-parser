import { codeStructureInfo } from "../utils/StructureTagsManager.js";

function createItemTags() {
  let newCodeLines = [];
  let codeLines = codeStructureInfo.codeLines;
  codeStructureInfo.rows.forEach((row, index) => {
    let lineChars = [...codeLines[index]];
    row.blocks.reverse();

    row.blocks.forEach((block) => {
      lineChars[block.start] = `<span class='block ${block.type}'>${
        lineChars[block.start]
      }`;
      lineChars[block.end - 1] = `${lineChars[block.end - 1]}</span>`;
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
    if (/[\\}\\{\\:]/.test(row.content.slice(-3))) {
      newRowContent = `<div class='row ${row.type}'>${row.content}</div>`;
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
      newRowContent = `<div class='row-block ${row.type}${content} </div>`;
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
    updatedCodeLines[block.startLine] = `<div class='sub-block'>${
      updatedCodeLines[block.startLine]
    }`;
    if (block.endLine - 2 < updatedCodeLines.length) {
      updatedCodeLines[block.endLine - 2] = `${
        updatedCodeLines[block.endLine - 2]
      }</div>`;
    }
  });
  codeStructureInfo.codeLines = updatedCodeLines;
}

function createMainBlockTags() {
  let updatedCodeLines = [...codeStructureInfo.codeLines];
  codeStructureInfo.mainBlocks.forEach((mainBlock) => {
    if (mainBlock.startLine - 1 < updatedCodeLines.length) {
      updatedCodeLines[mainBlock.startLine - 1] = `<div class='main-block ${
        mainBlock.nodeType
      }'>${updatedCodeLines[mainBlock.startLine - 1]}`;
    }
    if (mainBlock.endLine - 2 < updatedCodeLines.length) {
      updatedCodeLines[mainBlock.endLine - 2] = `${
        updatedCodeLines[mainBlock.endLine - 2]
      }</div>`;
    }
  });
  codeStructureInfo.codeLines = updatedCodeLines;
}

export function createStructureTags() {
  createItemTags();
  createRowTags();
  createMainBlockTags();
  createSubBlockTags();
}
