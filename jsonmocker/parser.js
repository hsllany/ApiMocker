/**
 * Created by leeco on 17/5/24.
 */

const json = require('./json');
const mocker = require('./mocker');


function Parser(jsonstring) {
    if (typeof jsonstring === 'string') {
        this.rawObject = JSON.parse(jsonstring);
    } else {
        throw "Must be string!"
    }
}

Parser.prototype.parse = function () {
    let jsonObject = new json.JsonObject();
    this._parseInternal(jsonObject, this.rawObject);
    return jsonObject;
}

Parser.prototype._parseInternal = function (parentTree, obj) {

    for (let x in obj) {
        if (typeof obj[x] === 'string') {
            let jsonChild = new json.JsonItem(x, parseSingleLine(obj[x]));
            parentTree.add(jsonChild);
        } else {
            let jsonChild = new json.JsonItem(x, obj[x]);
            parentTree.add(jsonChild);
        }
    }
};

function parseSingleLine(singleRule) {
    let functionName = singleRule.substring(1, singleRule.length - 1);

    // first look up in mock
    for (let x in mocker) {
        if (x === functionName) {
            return mocker[x];
        }
    }

    return null;
}

module.exports = Parser;



