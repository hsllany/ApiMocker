/**
 * Created by leeco on 17/5/24.
 */

const json = require('./jsonmocker/json');
const MockNode = require('./jsonmocker/mocker');
let node = new MockNode();
MockNode.buildStringRuleTo(node);

let jsonItem = new json.JsonItem("he", "world");
console.log(jsonItem.toJsonString());

let jsonObject = new json.JsonObject();
jsonObject.add(jsonItem);
jsonObject.add(jsonItem);

let jsonObject2 = new json.JsonObject();
let jsonItem2 = new json.JsonItem("he", "world", node);
jsonObject2.add(jsonItem2);
jsonObject2.add(jsonItem2);

jsonObject.add(new json.JsonItem("combine", jsonObject2));

console.log(jsonObject.toJsonString());