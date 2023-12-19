// Імпорт визначень типів вузлів AST та
// функцій для управління структурними тегами
import { astNodeTypes } from "./ast_node_types.js";
import {
  addRowBlock,
  addSubBlock,
  addMainBlock,
} from "../utils/StructureTagsManager.js";

// Обробляє кожен вузол AST, викликаючи відповідні функції для кожного ключа вузла.
function processNode(node, visitor) {
  const typeDescription = astNodeTypes[node.type];
  const keysToTraverse = typeDescription
    ? Object.keys(typeDescription)
    : Object.keys(node);

  keysToTraverse.forEach((key) => {
    if (node.hasOwnProperty(key)) {
      key == "alternate" && console.log("key", key);
      traverseAST(node[key], visitor, key);
    }
  });
}

// Обходить AST, використовуючи рекурсивний підхід.
// Для кожного вузла викликає функцію visitor та processNode.
export function traverseAST(node, visitor, key = null) {
  if (!node) return;
  if (Array.isArray(node)) {
    node.forEach((child) => traverseAST(child, visitor));
  } else if (typeof node === "object") {
    visitor(node, key);
    processNode(node, visitor);
  }
}

// Перевіряє, чи є вказаний тип вузла підтипом.
// Підтипи використовуються для ідентифікації вкладених структур у коді.
// function isSubType(nodeType) {
//   return ["ClassBody", "BlockStatement", "ObjectExpression"].includes(nodeType);
// }

// Функція visitor, яка викликається для кожного вузла під час обходу AST.
// Визначає тип вузла та виконує відповідні дії.
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
