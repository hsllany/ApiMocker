const rule = require('./rule');

const StringRule = rule.RandomStringRule;
const IntRule = rule.RandomIntRule;
const BooleanRule = rule.RandomBooleanRule;
const NullRule = rule.RandomNullRule;

module.exports = MockNode;

function MockNode() {
    this.rule = undefined;
}

MockNode.prototype.setRule = function (rule) {
    this.rule = rule;
}

MockNode.prototype.get = function (val) {
    let cur = this.rule;
    let obj = val;

    while (cur != undefined) {
        obj = cur.apply(obj);
        cur = cur.next;
    }

    return MockNode.toJsonString(obj);
}

MockNode.toJsonString = function (obj) {
    let val = '';
    if (obj === null) {
        val = 'null';
    } else if (typeof obj === 'number' || typeof obj === 'boolean') {
        val = obj;
    } else if (typeof obj === 'string') {
        val = '"' + obj + '"';
    }

    return val;
}

MockNode.buildStringRuleTo = function (node) {
    MockNode.buildRuleTo(node, new StringRule());
}

MockNode.buildIntRuleTo = function (node) {
    MockNode.buildRuleTo(node, new IntRule());
}

MockNode.buildNullRuleTo = function (node, nullpercent = 0.5) {
    MockNode.buildRuleTo(node, new NullRule(nullpercent));
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


