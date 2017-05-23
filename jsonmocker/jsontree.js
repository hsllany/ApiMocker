'use strict';

module.exports = JsonTree

function JsonTree() {
    this.parent = null;
    this.root = this;
    this.children = [];
}

JsonTree.prototype.addChild = function (child) {
    this.children.push(child);
}