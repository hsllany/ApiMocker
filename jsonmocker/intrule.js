/**
 * Created by leeco on 17/5/23.
 */
'use strict';
const util = require('util');
const Rule = require('./Rule');
const randomUtil = require('./randomutils')

module.exports = IntRule;

function IntRule() {

}

util.inherits(IntRule, Rule);

IntRule.prototype.apply = function (object) {
    return randomUtil.randomInt();
}

IntRule.prototype.add = Rule.prototype.add;