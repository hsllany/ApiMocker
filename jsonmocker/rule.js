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

let RandomIntRule = new Rule();
RandomIntRule.apply = function (obj) {

}

