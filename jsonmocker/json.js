'use strict';

module.exports = {
    JsonObject: JsonObject,
    JsonArray: JsonArray,
    JsonItem: JsonItem
}

function JsonObject() {
    // to hold JsonItem
    this.children = [];
}

JsonObject.prototype.add = function (jsonItem) {
    this.children.push(jsonItem);
}

JsonObject.prototype.toJsonString = function () {
    let sb = '{';

    for (let i = 0; i < this.children.length; i++) {
        let child = this.children[i];

        sb += child.toJsonString();

        if (i < this.children.length - 1) {
            sb += ', ';
        }
    }

    sb += '}';
    return sb;
};

function JsonArray() {
    this.children = [];
}
JsonArray.prototype.add = JsonObject.prototype.add;
JsonArray.prototype.toJsonString = function () {
    let sb = '[';
    for (let i = 0; i < this.children.length; i++) {
        let child = this.children[i];

        sb += child.toJsonString();

        if (i < this.children.length - 1) {
            sb += ', ';
        }
    }

    sb += ']';
    return sb;
};

function JsonItem(key, value, mocknode) {
    this.key = key;
    this.value = value;
    this.mockNode = mocknode;
}

JsonItem.prototype.toJsonString = function () {
    if (this.key !== null && this.key !== undefined) {
        return '"' + this.key + '" : ' + smartToString(this.value, this.mockNode);
    } else {
        return smartToString(this.value, this.mockNode);
    }
};

function smartToString(val, mocknode) {
    if (mocknode != null) {
        return mocknode.get(val);
    }
    if (val == null) {
        return 'null';
    }
    if (val instanceof JsonObject) {
        return val.toJsonString();
    } else if (typeof val == 'string') {
        return '"' + val + '"';
    } else {
        return val;
    }
}