export const astNodeTypes = {
  Node: {
    type: '"string"',
    loc: "SourceLocation" | "null",
  },
  SourceLocation: {
    source: "string" | "null",
    start: "Position",
    end: "Position",
  },
  Position: {
    line: "number",
    column: "number",
  },
  Identifier: {
    type: "Identifier",
    name: "string",
  },
  PrivateName: {
    type: "PrivateName",
    id: "Identifier",
  },
  Literal: {},
  RegExpLiteral: {
    type: "RegExpLiteral",
    pattern: "string",
    flags: "string",
  },
  NullLiteral: {
    type: "NullLiteral",
  },
  StringLiteral: {
    type: "StringLiteral",
    value: "string",
  },
  BooleanLiteral: {
    type: "BooleanLiteral",
    value: "boolean",
  },
  NumericLiteral: {
    type: "NumericLiteral",
    value: "number",
  },
  BigIntLiteral: {
    type: "BigIntLiteral",
    value: "string",
  },
  DecimalLiteral: {
    type: "DecimalLiteral",
    value: "string",
  },
  Program: {
    type: "Program",
    interpreter: "InterpreterDirective" | "null",
    sourceType: "script" | "module",
    body: ["Statement" | "ImportDeclaration" | "ExportDeclaration"],
    directives: ["Directive"],
  },
  ExpressionStatement: {
    type: "ExpressionStatement",
    expression: "Expression",
    body: ["BlockStatement"],
  },
  BlockStatement: {
    type: "BlockStatement",
    body: ["BlockStatement"],
    directives: ["Directive"],
  },
  EmptyStatement: {
    type: "EmptyStatement",
  },
  DebuggerStatement: {
    type: "DebuggerStatement",
  },
  WithStatement: {
    type: "WithStatement",
    object: "Expression",
    body: "Statement",
  },
  ReturnStatement: {
    type: "ReturnStatement",
    argument: "Expression" | "null",
  },
  LabeledStatement: {
    type: "LabeledStatement",
    label: "Identifier",
    body: "Statement",
  },
  BreakStatement: {
    type: "BreakStatement",
    label: "Identifier" | "null",
  },
  ContinueStatement: {
    type: "ContinueStatement",
    label: "Identifier" | "null",
  },
  IfStatement: {
    type: "IfStatement",
    test: "Expression",
    consequent: "Statement",
    alternate: "Statement" | "null",
  },
  SwitchStatement: {
    type: "SwitchStatement",
    discriminant: "Expression",
    cases: ["SwitchCase"],
  },
  SwitchCase: {
    type: "SwitchCase",
    test: "Expression" | "null",
    consequent: ["Statement"],
  },
  ThrowStatement: {
    type: "ThrowStatement",
    argument: "Expression",
  },
  TryStatement: {
    type: "TryStatement",
    block: "BlockStatement",
    handler: "CatchClause" | "null",
    finalizer: "BlockStatement" | "null",
  },
  CatchClause: {
    type: "CatchClause",
    param: "Pattern",
    body: "BlockStatement",
  },
  WhileStatement: {
    type: "WhileStatement",
    test: "Expression",
    body: "Statement",
  },
  DoWhileStatement: {
    type: "DoWhileStatement",
    body: "Statement",
    test: "Expression",
  },
  ForStatement: {
    type: "ForStatement",
    init: "VariableDeclaration" | "Expression" | "null",
    test: "Expression" | "null",
    update: "Expression" | "null",
    body: "Statement",
  },
  ForInStatement: {
    type: "ForInStatement",
    left: "VariableDeclaration" | "Expression",
    right: "Expression",
    body: "Statement",
  },
  ForOfStatement: {
    type: "ForOfStatement",
    await: "boolean",
  },

  VariableDeclaration: {
    type: "VariableDeclaration",
    declarations: ["VariableDeclarator"],
    kind: "var" | "let" | "const" | "using",
  },
  VariableDeclarator: {
    type: "VariableDeclarator",
    id: "Pattern",
    init: "Expression" | "null",
  },
  Decorator: {
    type: "Decorator",
    expression: "Expression",
  },
  Directive: {
    type: "Directive",
    value: "DirectiveLiteral",
  },
  DirectiveLiteral: {
    type: "DirectiveLiteral",
  },
  InterpreterDirective: {
    type: "InterpreterDirective",
  },
  Expression: {},
  Super: {
    type: "Super",
  },
  Import: {
    type: "Import",
  },
  ThisExpression: {
    type: "ThisExpression",
  },
  ArrowFunctionExpression: {
    type: "ArrowFunctionExpression",
    body: "BlockStatement" | "Expression",
  },
  YieldExpression: {
    type: "YieldExpression",
    argument: "Expression" | "null",
    delegate: "boolean",
  },
  AwaitExpression: {
    type: "AwaitExpression",
    argument: "Expression" | "null",
  },
  ArrayExpression: {
    type: "ArrayExpression",
    elements: ["Expression" | "SpreadElement" | "null"],
  },
  ObjectExpression: {
    type: "ObjectExpression",
    properties: ["ObjectProperty" | "ObjectMethod" | "SpreadElement"],
  },
  ObjectMember: {
    key: "Expression",
    computed: "boolean",
    decorators: ["Decorator"],
  },
  ObjectProperty: {
    type: "ObjectProperty",
    shorthand: "boolean",
    value: "Expression",
  },
  ObjectMethod: {
    type: "ObjectMethod",
    kind: "get" | "set" | "method",
  },
  RecordExpression: {
    type: "RecordExpression",
    properties: ["ObjectProperty" | "ObjectMethod" | "SpreadElement"],
  },
  TupleExpression: {
    type: "TupleExpression",
    elements: ["Expression" | "SpreadElement" | "null"],
  },
  FunctionExpression: {
    type: "FunctionExpression",
    id: "Identifier" | "null",
    params: ["Pattern"],
    body: "BlockStatement",
    generator: "boolean",
    async: "boolean",
  },
  UnaryExpression: {
    type: "UnaryExpression",
    operator: "UnaryOperator",
    prefix: "boolean",
    argument: "Expression",
  },
  UnaryOperator: "-" | "+" | "!" | "~" | "typeof" | "void" | "delete" | "throw",

  UpdateExpression: {
    type: "UpdateExpression",
    operator: "UpdateOperator",
    argument: "Expression",
    prefix: "boolean",
  },
  UpdateOperator: "++" | "--",

  BinaryExpression: {
    type: "BinaryExpression",
    operator: "BinaryOperator",
    left: "Expression" | "PrivateName",
    right: "Expression",
  },
  BinaryOperator:
    "==" |
    "!=" |
    "===" |
    "!==" |
    "<" |
    "<=" |
    ">" |
    ">=" |
    "<<" |
    ">>" |
    ">>>" |
    "+" |
    "-" |
    "*" |
    "/" |
    "%" |
    "**" |
    "|" |
    "^" |
    "&" |
    "in" |
    "instanceof" |
    "|>",

  AssignmentExpression: {
    type: "AssignmentExpression",
    operator: "AssignmentOperator",
    left: "Pattern" | "Expression",
    right: "Expression",
  },
  AssignmentOperator:
    "=" |
    "+=" |
    "-=" |
    "*=" |
    "/=" |
    "%=" |
    "**=" |
    "<<=" |
    ">>=" |
    ">>>=" |
    "|=" |
    "^=" |
    "&=" |
    "||=" |
    "&&=" |
    "??=",

  LogicalExpression: {
    type: "LogicalExpression",
    operator: "LogicalOperator",
    left: "Expression",
    right: "Expression",
  },
  LogicalOperator: "||" | "&&" | "??",

  SpreadElement: {
    type: "SpreadElement",
    argument: "Expression",
  },
  ArgumentPlaceholder: {
    type: "ArgumentPlaceholder",
  },
  MemberExpression: {
    type: "MemberExpression",
    object: "Expression" | "Super",
    property: "Expression" | "PrivateName",
    computed: "boolean",
  },
  OptionalMemberExpression: {
    type: "OptionalMemberExpression",
    object: "Expression",
    property: "Expression" | "PrivateName",
    computed: "boolean",
    optional: "boolean",
  },
  BindExpression: {
    type: "BindExpression",
    object: "Expression" | "null",
    callee: "Expression",
  },
  ConditionalExpression: {
    type: "ConditionalExpression",
    test: "Expression",
    alternate: "Expression",
    consequent: "Expression",
  },
  CallExpression: {
    type: "CallExpression",
    callee: "Expression" | "Super" | "Import",
    arguments: ["Expression" | "SpreadElement"],
  },
  OptionalCallExpression: {
    type: "OptionalCallExpression",
    callee: "Expression",
    arguments: ["Expression" | "SpreadElement"],
    optional: "boolean",
  },
  NewExpression: {
    type: "NewExpression",
  },
  SequenceExpression: {
    type: "SequenceExpression",
    expressions: ["Expression"],
  },
  ParenthesizedExpression: {
    type: "ParenthesizedExpression",
    expression: "Expression",
  },
  DoExpression: {
    type: "DoExpression",
    body: "BlockStatement",
    async: "boolean",
  },
  ModuleExpression: {
    type: "ModuleExpression",
    body: "Program",
  },
  TopicReference: {
    type: "TopicReference",
  },
  TemplateLiteral: {
    type: "TemplateLiteral",
    quasis: ["TemplateElement"],
    expressions: ["Expression"],
  },
  TaggedTemplateExpression: {
    type: "TaggedTemplateExpression",
    tag: "Expression",
    quasi: "TemplateLiteral",
  },
  TemplateElement: {
    type: "TemplateElement",
    tail: "boolean",
    value: {
      cooked: "string" | "null",
      raw: "string",
    },
  },
  AssignmentProperty: {
    value: "Pattern",
  },
  ObjectPattern: {
    type: "ObjectPattern",
    properties: ["AssignmentProperty" | "RestElement"],
  },
  ArrayPattern: {
    type: "ArrayPattern",
    elements: ["Pattern" | "null"],
  },
  RestElement: {
    type: "RestElement",
    argument: "Pattern",
  },
  AssignmentPattern: {
    type: "AssignmentPattern",
    left: "Pattern",
    right: "Expression",
  },
  Class: {
    id: "Identifier" | "null",
    superClass: "Expression" | "null",
    body: "ClassBody",
    decorators: ["Decorator"],
  },
  ClassBody: {
    type: "ClassBody",
    body: [
      "ClassMethod" |
        "ClassPrivateMethod" |
        "ClassProperty" |
        "ClassPrivateProperty" |
        "StaticBlock",
    ],
  },
  ClassMethod: {
    type: "ClassMethod",
    key: "Expression",
    body: ["BlockStatement"],
    kind: "constructor" | "method" | "get" | "set",
    computed: "boolean",
    static: "boolean",
    decorators: ["Decorator"],
  },
  ClassPrivateMethod: {
    type: "ClassPrivateMethod",
    key: "PrivateName",
    kind: "method" | "get" | "set",
    static: "boolean",
    decorators: ["Decorator"],
  },
  ClassProperty: {
    type: "ClassProperty",
    key: "Expression",
    value: "Expression",
    static: "boolean",
    computed: "boolean",
  },
  ClassPrivateProperty: {
    type: "ClassPrivateProperty",
    key: "PrivateName",
    value: "Expression",
    static: "boolean",
  },
  ClassAccessorProperty: {
    type: "ClassAccessorProperty",
    key: "Expression" | "PrivateName",
    value: "Expression",
    static: "boolean",
    computed: "boolean",
  },
  StaticBlock: {
    type: "StaticBlock",
    body: ["Statement"],
  },
  ClassDeclaration: {
    type: "ClassDeclaration",
    id: "Identifier",
    body: "ClassBody",
  },
  ClassExpression: {
    type: "ClassExpression",
  },
  MetaProperty: {
    type: "MetaProperty",
    meta: "Identifier",
    property: "Identifier",
  },
  ModuleSpecifier: {
    local: "Identifier",
  },
  ImportDeclaration: {
    type: "ImportDeclaration",
    importKind: "null" | "type" | "typeof" | "value",
    specifiers: [
      "ImportSpecifier" | "ImportDefaultSpecifier" | "ImportNamespaceSpecifier",
    ],
    source: "StringLiteral",
    assertions: ["ImportAttribute"],
  },
  ImportSpecifier: {
    type: "ImportSpecifier",
    imported: "Identifier" | "StringLiteral",
  },
  ImportDefaultSpecifier: {
    type: "ImportDefaultSpecifier",
  },
  ImportNamespaceSpecifier: {
    type: "ImportNamespaceSpecifier",
  },
  ImportAttribute: {
    type: "ImportAttribute",
    key: "Identifier",
    value: "StringLiteral",
  },
  ExportDeclaration: {},
  ExportNamedDeclaration: {
    type: "ExportNamedDeclaration",
    declaration: "Declaration" | "null",
    specifiers: ["ExportSpecifier" | "ExportNamespaceSpecifier"],
    source: "StringLiteral" | "null",
    assertions: ["ImportAttribute"],
  },
  ExportSpecifier: {
    type: "ExportSpecifier",
    exported: "Identifier" | "StringLiteral",
    local: "Identifier" | "StringLiteral",
  },
  ExportNamespaceSpecifier: {
    type: "ExportNamespaceSpecifier",
    exported: "Identifier",
  },
  FunctionDeclaration: {
    type: "FunctionDeclaration",
    id: "Identifier" | "null",
    params: ["Pattern"],
    body: "BlockStatement",
    generator: "boolean",
    async: "boolean",
  },
  ExportDefaultDeclaration: {
    type: "ExportDefaultDeclaration",
    declaration:
      "OptFunctionDeclaration" | "OptClassDeclaration" | "Expression",
  },
  ExportAllDeclaration: {
    type: "ExportAllDeclaration",
    source: "StringLiteral",
    assertions: ["ImportAttribute"],
  },
  PipelineBody: {
    type: "PipelineBody",
  },
  PipelineBody: {
    type: "PipelineBareFunctionBody",
    callee: "Expression",
  },
  PipelineBareConstructorBody: {
    type: "PipelineBareConstructorBody",
    callee: "Expression",
  },
  PipelineBareConstructorBody: {
    type: "PipelineTopicBody",
    expression: "Expression",
  },
  PipelineBareConstructorBody: {
    type: "PipelineBareAwaitedFunctionBody",
    callee: "Expression",
  },
};
