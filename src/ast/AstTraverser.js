import { astNodeTypes } from "./ast_node_types.js";
import {
  addRowBlock,
  addSubBlock,
  addMainBlock,
} from "../utils/StructureTagsManager.js";

function processNode(node, visitor) {
  const typeDescription = astNodeTypes[node.type];
  const keysToTraverse = typeDescription
    ? Object.keys(typeDescription)
    : Object.keys(node);

  keysToTraverse.forEach((key) => {
    if (node.hasOwnProperty(key)) {
      traverseAST(node[key], visitor, key);
    }
  });
}

export function traverseAST(node, visitor, key = null) {
  if (!node) return;
  if (Array.isArray(node)) {
    node.forEach((child) => traverseAST(child, visitor));
  } else if (typeof node === "object") {
    visitor(node, key);
    processNode(node, visitor);
  }
}

export function visitor(node, key = null) {
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
        addSubBlock(startLine, endLine);
        break;
      case "ClassBody":
        addSubBlock(startLine, endLine);
        break;
      case "BlockStatement":
        addSubBlock(startLine, endLine);
        break;
      default:
        addMainBlock(startLine, endLine, node, key);
        break;
    }
  }
}
