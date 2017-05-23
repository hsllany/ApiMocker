/**
 * Created by leeco on 17/5/23.
 */
'use strict';
const util = require('util');
const Rule = require('./Rule');
const randomUtil = require('./randomutils')

module.exports = NullRule;

function NullRule() {

}

util.inherits(NullRule, Rule);

NullRule.prototype.apply = function (object) {
    let i = randomUtil.randomInt(0, 2);
    if (i == 1)
        return object;
    else
        return null;
}

NullRule.prototype.add = Rule.prototype.add;