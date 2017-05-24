/**
 * Created by leeco on 17/5/24.
 */
let parser = {}

const JsonTree = require('./json');
const MockNode = require('./mocknode');

module.exports = parser;

parser.parse = function (object) {
    let root = new JsonTree(null);
    this._parseInternal(root, object);

    return root;
};

parser._parseInternal = function (tree, object) {
    if (object instanceof Object) {
        for (let x in object) {
            let mockNode = new MockNode(x);
            let child = new JsonTree(mockNode);
            this._parseInternal(child, object[x]);
            tree.addChild(child);
        }
    }
}
