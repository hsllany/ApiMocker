/**
 * Created by leeco on 17/5/23.
 */
'use strict';
const util = require('util');
const Rule = require('./Rule');
const randomUtil = require('./randomutils')

module.exports = BooleanRule;

function BooleanRule() {

}

util.inherits(BooleanRule, Rule);

BooleanRule.prototype.apply = function (object) {
    return randomUtil.randomBoolean();
}

BooleanRule.prototype.add = Rule.prototype.add;
