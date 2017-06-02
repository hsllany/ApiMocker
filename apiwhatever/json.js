'use strict';

/**
 *
 * @param json, could be JsonItem, JsonObject or JsonArray
 * @param mockFunction, function
 * @returns {*}
 */

function run(json, mockFunction) {
    let value = null;

    if (typeof mockFunction === 'function' && json instanceof Object) {

        value = mockFunction.call(json);

        if (typeof value === 'string') {
            return '"' + value + '"';
        } else if (value instanceof JsonArray || value instanceof JsonObject) {
            return value.toJsonString();
        } else {
            return value;
        }
    } else {
        throw 'Unknown mock type, must be \'function\'' + mockFunction + ' of ' + json.toString();
    }
}

function raw() {
    let value = this.value;

    if (value === null || value === undefined) {
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
        this._filter = null;
        this.parent = null;
    }

    add(jsonItem) {
        this.children.push(jsonItem);
        jsonItem.parent = this;
    }

    removeChild(childName) {
        let findIndex = -1;
        for (let i = 0; i < this.children.length; i++) {
            let child = this.children[i];
            if (child.key === childName) {
                findIndex = i;
                break;
            }
        }

        if (findIndex !== -1) {
            this.children[findIndex].silence = true;
        }
    }

    toJsonString() {
        let sb = '{';

        if (this._filter != null) {
            this._filter.call(this);
        }

        let first = true;
        for (let i = 0; i < this.children.length; i++) {
            let child = this.children[i];

            if (child.silence) {
                continue;
            }

            if (child instanceof JsonItem) {
                if(first){
                    first = false;
                }else {
                    sb += ', ';
                }
                sb += child.toJsonString();
            }
        }
        sb += '}';
        return sb;
    }
}


class JsonArray {
    constructor() {
        this.children = [];
        this._filter = null;
        this.parent = null;
    }

    add(jsonItem) {
        this.children.push(jsonItem);
        jsonItem.parent = this;
    }

    removeChildAt(index) {
        this.children[index].silence = true;
    }

    toJsonString() {
        let sb = '[';

        if (this._filter != null) {
            this._filter.call(this);
        }


        let first = true;
        for (let i = 0; i < this.children.length; i++) {
            let child = this.children[i];

            if (child.silence) {
                continue;
            }

            if(first){
                first = false;
            }else {
                sb += ', ';
            }
            sb += child.toJsonString();

        }
        sb += ']';
        return sb;
    }
}

class JsonItem {
    constructor(key) {
        this.key = key;
        this._mocker = null;
        this.parent = null;
    }

    setValueOrMocker(value) {
        if (typeof value === 'function') {
            this._mocker = value;
        } else if (value instanceof JsonObject || value instanceof JsonArray) {
            this.value = value;
            this.value.parent = this;
            this._mocker = raw;
        } else {
            this.value = value;
            this._mocker = raw;
        }
    }

    toJsonString() {
        if (this.key !== null && this.key !== undefined) {
            return '"' + this.key + '" : ' + run(this, this._mocker);
        } else {
            return run(this, this._mocker);
        }
    }

    toString(){
        return this.key;
    }
}


module.exports = {
    JsonObject: JsonObject, JsonArray: JsonArray, JsonItem: JsonItem
};
