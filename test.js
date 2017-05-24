/**
 * Created by leeco on 17/5/23.
 */
const JsonTree = require('./jsonmocker/json');
const MockNode = require('./jsonmocker/mocknode');

let a  ="string";
console.log(a instanceof Object);

let jt = new JsonTree();

let node = new MockNode("test");
MockNode.buildStringRuleTo(node);
jt._mockNodes.push(node);
MockNode.buildStringRuleTo(jt._mockNodes);

jt.key = "a";

let jtChild = new JsonTree();
let nodeChild = new MockNode("testChild");
MockNode.buildStringRuleTo(nodeChild);
jtChild._mockNodes.push(nodeChild);
jtChild.key = "child";

jt._children.push(jtChild);

console.log(jt.toJsonString());