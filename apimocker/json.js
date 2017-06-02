'use strict';

function run(object, mock) {

    let value = null;

    if (typeof mock === 'string') {
        value = eval(mock);
        return value;
    } else if (typeof mock === 'function' && object instanceof Object) {
        object.mock = mock;
        value = object.mock();

        if (object.value != null && typeof (object.value) === 'object') {
            if ((object.value) instanceof (JsonObject) || (object.value) instanceof (JsonArray)) {
                return value;
            }
        }

        if (typeof value === 'string') {
            return '"' + value + '"';
        } else if(value instanceof JsonArray || value instanceof JsonObject){
            return value.toJsonString();
        }else {
            return value;
        }
    } else {
        throw 'Unknown mock type, must be one of \'string\' or \'function\'';
    }
}

function raw() {
    let value = this.value;

    if(value === null || value === undefined){
        return null;
    }

    if (value['toJsonString'] != null && typeof value['toJsonString'] === 'function') {
        return value.toJsonString();
    } else {
        return this.value;
    }
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
        let childrenMocked = (this.mocker != null ? mocker.run(this, this.mocker) : this.children );
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
        let childrenMocked = (this.mocker != null ? mocker.run(this, this.mocker) : this.children );
        for (let i = 0; i < childrenMocked.length; i++) {
            let child = childrenMocked[i];
            sb += child.toJsonString();
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

    setValueOrMocker(value) {
        if (typeof value === 'function') {
            this.mocker = value;
        } else if (value instanceof JsonObject || value instanceof JsonArray) {
            this.value = value;
            this.mocker = raw;
        } else {
            this.value = value;
            this.mocker = raw;
        }
    }

    toJsonString() {
        if (this.key !== null && this.key !== undefined) {
            return '"' + this.key + '" : ' + (this.mocker !== null ? run(this, this.mocker) : '"notmocked"');
        } else {
            return this.mocker !== null ? run(this, this.mocker) : '"notmocked"';
        }
    }
}


module.exports = {
    JsonObject: JsonObject, JsonArray: JsonArray, JsonItem: JsonItem
};
