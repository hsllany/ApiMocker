'use strict';

let mock = require('./mocker');

module.exports = {
    JsonObject: JsonObject, JsonArray: JsonArray, JsonItem: JsonItem
}

class JsonObject {
    /**
     * @param mocker should be one of 'function' or a piece of script string.
     */
    constructor() {
        this.children = [];
        this.mocker = null;
    }

    add(jsonItem) {
        this.children.push(jsonItem)
    }

    toJsonString() {
        let sb = '{';
        let childrenMocked = (this.mocker != null ? mock.run(this, this.mocker) : this.children );
        for (let i = 0; i < childrenMocked.length; i++) {
            let child = childrenMocked[i];
            sb += child.toJsonString();
            if (i < childrenMocked.length - 1) {
                sb += ', ';
            }
        }
        sb += '}';
        return sb;
    }
}


class JsonArray {
    constructor() {
        this.children = [];
        this.mocker = null;
    }

    add(jsonItem) {
        this.children.push(jsonItem)
    }

    toJsonString() {
        let sb = '[';
        for (let i = 0; i < this.children.length; i++) {
            let childrenMocked = (this.mocker != null ? mock.run(this, this.mocker) : this.children );
            sb += childrenMocked.toJsonString();
            if (i < childrenMocked.length - 1) {
                sb += ', ';
            }
        }
        sb += ']';
        return sb;
    }
}

class JsonItem {
    constructor(key) {
        this.key = key;
        this.mocker = null;
    }

    toJsonString() {
        if (this.key !== null && this.key !== undefined) {
            return '"' + this.key + '" : ' + this.mocker !== null ? toJson(mock.run(this, this.mocker)) : toJson('notmocked');
        } else {
            return this.mocker !== null ? toJson(mock.run(this, this.mocker)) : toJson('notmocked');
        }
    }
}

function toJson(value) {
    if (typeof value === 'string') {
        return '"' + value + '"';
    } else {
        return value;
    }
}