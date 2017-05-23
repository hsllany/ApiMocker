/**
 * Created by leeco on 17/5/23.
 */
'use strict';

module.exports = Rule;

function Rule() {
    this.next = null;
    this.pre = null;
    this.head = this;
}

Rule.prototype.add = function (another) {
    this.next = another;
    another.pre = this;
    another.head = this.head;
}

Rule.prototype.apply = function (object) {
    return object;
}