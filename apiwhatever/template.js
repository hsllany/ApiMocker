class Template {
    constructor() {
        this.main = null;
        this.modules = [];
        /**
         * Stores any api parameters.
         * @type {null}
         */
        this.context = null;
    }

    addModule(name, jsonObject) {
        this.modules[name] = jsonObject;
    }
}

module.exports = Template;