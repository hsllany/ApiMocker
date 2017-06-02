/**
 * Created by leeco on 17/6/1.
 */
var TemplateParser = require('../apiwhatever/templateparser');
var jsonRaw = require('../example/test.json');

let jsonParser = new TemplateParser(jsonRaw);
let template = jsonParser.process();

console.log(template);

console.log(template.modules["student"].toJsonString());

let jsonObject = template.modules['group'];

console.log(jsonObject.toJsonString());

let mainObject = template.main;

console.log('\n');
console.log(mainObject.toJsonString());