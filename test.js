/**
 * Created by leeco on 17/5/23.
 */
var MockNode = require("./jsonmocker/mocknode")

console.log('hello world');

let node = new MockNode("hello world");

MockNode.buildStringRuleTo(node);
console.log(node.get());