/**
 * Created by leeco on 17/5/23.
 */
'use strict';
const util = require('util');
const Rule = require('./Rule');
const randomUtil = require('./randomutils');

module.exports = StringRule;

function StringRule() {

}

util.inherits(StringRule, Rule);

StringRule.prototype.apply = function (object) {
    return randomUtil.randomString();
}

StringRule.prototype.add = Rule.prototype.add;