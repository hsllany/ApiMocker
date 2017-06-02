
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