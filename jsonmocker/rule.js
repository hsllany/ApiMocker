/**
 * Created by leeco on 17/5/23.
 */
'use strict';

const randomUtil = require('./randomutils')
const util = require('util');

let rule = {
    RandomIntRule: RandomIntRule,
    RandomStringRule: RandomStringRule,
    RandomBooleanRule: RandomBooleanRule,
    RandomNullRule: RandomNullRule
}
module.exports = rule;

function Rule() {
    this.next = null;
    this.pre = null;
    this.head = this;
}

Rule.prototype.add = function (another) {
    this.next = another;
    another.pre = this;
    another.head = this.head;
};

Rule.prototype.apply = function (object) {
    return object;
};

/* ------------IntRule------------ */

function RandomIntRule() {
}
util.inherits(RandomIntRule, Rule);
RandomIntRule.prototype.apply = function (object) {
    return randomUtil.randomInt();
};
RandomIntRule.prototype.add = Rule.prototype.add;

/* ------------RandomStringRule------------ */
function RandomStringRule() {
}
util.inherits(RandomStringRule, Rule);
RandomStringRule.prototype.apply = function (object) {
    let length = randomUtil.randomInt(0, 50);
    return randomUtil.randomString(length);
};
RandomStringRule.prototype.add = Rule.prototype.add;

/* ------------NullRule------------ */
function RandomNullRule(nullPercent) {
    if (nullPercent > 1) {
        nullPercent = 1;
    }

    if (nullPercent < 0) {
        nullPercent = 0;
    }

    this.nullPercent = nullPercent;
}
util.inherits(RandomNullRule, Rule);
RandomNullRule.prototype.apply = function (object) {
    let i = randomUtil.randomInt(0, 100);
    if (i > this.nullPercent * 100)
        return object;
    else
        return null;
};
RandomNullRule.prototype.add = Rule.prototype.add;

/* ------------BooleanRule------------ */
function RandomBooleanRule() {
}
util.inherits(RandomBooleanRule, Rule);
RandomBooleanRule.prototype.apply = function (object) {
    return randomUtil.randomBoolean();
};
RandomBooleanRule.prototype.add = Rule.prototype.add;