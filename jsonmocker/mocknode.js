const StringRule = require('./StringRule');
const IntRule = require('./intrule');
const BooleanRule = require('./booleanrule');
const NullRule = require('./nullrule')

module.exports = MockNode;

function MockNode(key) {
    this.key = key;
    this.rule = undefined;
}

MockNode.prototype.setRule = function (rule) {
    this.rule = rule;
}

MockNode.prototype.get = function () {
    let cur = this.rule;
    let obj = null;

    while (cur != undefined) {
        obj = cur.apply(obj);
        cur = cur.next;
    }

    return MockNode.toJsonString(this.key, obj);
}

MockNode.toJsonString = function (key, obj) {
    let json = '"' + key + '" : ';
    let val = '';
    if (obj === null) {
        val = 'null';
    } else if (typeof obj === 'number' || typeof obj === 'boolean') {
        val = obj;
    } else if (typeof obj === 'string') {
        val = '"' + obj + '"';
    }

    json += val;
    return json;
}

MockNode.buildStringRuleTo = function (node) {
    MockNode.buildRuleTo(node, new StringRule());
}

MockNode.buildIntRuleTo = function (node) {
    MockNode.buildRuleTo(node, new IntRule());
}

MockNode.buildNullRuleTo = function (node) {
    MockNode.buildRuleTo(node, new NullRule());
}

MockNode.buildBooleanRuleTo = function (node) {
    MockNode.buildRuleTo(node, new BooleanRule());
}

MockNode.buildRuleTo = function (node, rule) {
    if (node.rule == null) {
        node.rule = rule;
    } else {
        node.rule.add(rule);
    }
}


