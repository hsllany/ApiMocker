/**
 * Created by leeco on 17/5/31.
 */

const json = require('./json');

class Template {
    constructor() {
        this.main = null;
        this.modules = [];
    }

    addModule(name, jsonObject){
        this.modules[name] = jsonObject;
    }
}

module.exports = Template;