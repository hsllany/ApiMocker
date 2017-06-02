/**
 * Created by leeco on 17/5/31.
 */

let json = require('../apiwhatever/json');
let mocker = require('../apiwhatever/mockerfactory');

//=================jsonItem example=================

let item1 = new json.JsonItem("keyOne");
item1.mocker = mocker.randomString;

console.log(item1.toJsonString());
console.log('=====================\n');


//=================jsonTree example=================

let item2 = new json.JsonItem("keyTwo");
item2.mocker = mocker.buildRandomEnumFunction("nihao", 123, false);

let tree = new json.JsonObject();
tree.add(item1);
tree.add(item2);


let childTree = new json.JsonObject();
let childItem1 = new json.JsonItem("childKeyOne");
childItem1.setValueOrMocker("childValueOne");

childTree.add(childItem1);

let childTreeItem = new json.JsonItem("childTree");
childTreeItem.setValueOrMocker(childTree);

tree.add(childTreeItem);
console.log(tree.toJsonString());



