/**
 * Created by leeco on 17/6/1.
 */
var TemplateParser = require('../apiwhatever/templateparser');
var singleValueParser = TemplateParser.singleParser;
var Template = require('../apiwhatever/template');

var template = new Template();

console.log(singleValueParser._parseFunctionNameAndParams("  functionName(   )"));

console.log(singleValueParser._parseFunctionNameAndParams("  functionName(a,123, true, null   )"));

console.log(singleValueParser._parseFunctionNameAndParams("  functionName(   lala-land   )"));

console.log(singleValueParser.parseMockDSLToMocker("randomString()", template));