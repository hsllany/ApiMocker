const json = require('./json');
const MockerFactory = require('./mockerfactory');
const Template = require('./template');

function isWhiteSpace(c) {
    return c === ' ' || c === '\n' || c === '\r' || c === '\t' || c === '\b' || c === '\f';
}

String.prototype.startsWith = function (prefix) {
    return this.slice(0, prefix.length) === prefix;
};

String.prototype.endsWith = function (suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
}

let singleValueParser = {
    parseMockDSLToMocker: function (value, template) {
        if (typeof value === 'string' && value.startsWith("->")) {
            /*
             * functionAndParams should have following fields:
             * functionAndParams.name  -string, function name
             * functionAndParams.params  -Array, params
             */
            let functionAndParams = this._parseFunctionNameAndParams(value.substring(2));

            return this._buildMocker(functionAndParams, template);
        } else {
            return value;
        }
    },

    _parseFunctionNameAndParams: function (value) {
        let stringBuilder = '';
        let c = '\t';
        let position;

        //look for function name
        for (position = -1; position < value.length; position++) {
            if (position !== -1) {
                c = value[position];
                if (c === '(') {
                    position++;
                    break;
                }
            }

            while (isWhiteSpace(c)) {
                position++;
                c = value[position];
                if (position === value.length - 1) {
                    break;
                }
            }
            stringBuilder += c;
        }

        let functionName = stringBuilder;

        stringBuilder = '';
        let params = [];

        let first = true;

        for (; position < value.length; position++) {
            c = value[position];
            if (c === ')') {
                if (stringBuilder !== '') {
                    params.push(stringBuilder);
                }
                stringBuilder = '';

                break;
            }

            if (first) {
                while (isWhiteSpace(c)) {
                    position++;
                    c = value[position];
                    if (position === value.length - 1) {
                        break;
                    }
                }
                first = false;
            }

            if (c === ',' || c === ')') {
                if (stringBuilder !== '') {
                    params.push(stringBuilder);
                }
                stringBuilder = '';

                if (c === ')') {
                    break;
                }
            } else {
                stringBuilder += c;
            }
        }

        return {
            name: functionName, params: params
        }

    },

    _buildMocker: function (functionAndParams, template) {
        let functionNameToBeMocked = functionAndParams.name[0];
        functionNameToBeMocked = functionNameToBeMocked.toUpperCase() + functionAndParams.name.substring(1);
        functionNameToBeMocked = 'build' + functionNameToBeMocked;

        if (MockerFactory.internal.hasOwnProperty(functionNameToBeMocked) && typeof MockerFactory.internal[functionNameToBeMocked] === 'function') {
            return MockerFactory.internal[functionNameToBeMocked](functionAndParams.params, template);
        }

        return '![NotImplemented : ' + functionAndParams.name + ']';
    }
};

class TemplateParser {
    constructor(json) {
        if (typeof json === 'string') {
            this.rawString = json;
            this.rawData = JSON.parse(this.rawString);
        } else {
            this.rawData = json
        }

        this._check();
    }

    /**
     * check whether this data is right
     */
    _check() {
        if (this.rawData.hasOwnProperty('main')) {
            TemplateParser._checkMainModule(this.rawData["main"]);
        } else {
            throw 'ApiTemplate must have main field.'
        }

        if (this.rawData.hasOwnProperty("modules")) {
            TemplateParser._checkModules(this.rawData['modules']);
        }
    }

    process() {
        let template = new Template();

        if (this._hasModules()) {
            this.processModules(template);
        }

        this.processMainModule(template);

        //TODO handle the main_module parts
        return template;
    }

    processMainModule(template) {
        let main = this.rawData.main;
        template.mainName = main.name;

        let mainData = main.data;

        template.main = TemplateParser.processData(mainData, template);
    }

    processModules(template) {
        let modules = this.rawData.modules;

        for (let i = 0; i < modules.length; i++) {
            let module = modules[i];
            console.log("==>" + module.name);
            TemplateParser.processSingleModule(module, template);
        }
    }

    static processSingleModule(module, template) {
        if (module.hasOwnProperty('name') && module.hasOwnProperty('data')) {
            let moduleName = module['name'];
            let jsonObject = TemplateParser.processData(module['data'], template);

            template.addModule(moduleName, jsonObject);
        } else {
            throw 'Module must have name and data field';
        }
    }

    static processData(data, template) {
        let jsonObject = new json.JsonObject();

        for (let item in data) {
            let key = item;
            let dsl = data[item];

            let jsonItem = new json.JsonItem(key);
            jsonItem.setValueOrMocker(singleValueParser.parseMockDSLToMocker(dsl, template));

            jsonObject.add(jsonItem);
        }

        return jsonObject;
    }


    _hasModules() {
        return this.rawData.hasOwnProperty('modules');
    }

    static _checkMainModule(mainModule) {
        //TODO
    }

    static _checkModules(modules) {
        if (!modules instanceof Array) {
            throw 'modules must be an array';
        }

        for (let module in modules) {
            TemplateParser._checkSingleModule(modules[module]);
        }
    }

    static _checkSingleModule(singleModule) {

        if (singleModule.hasOwnProperty('name')) {
            let name = singleModule['name'];
            if (typeof name === 'string') {

            } else {
                throw 'Module name must be string';
            }
        } else {
            throw 'Module must have name value';
        }

        if (singleModule.hasOwnProperty('data')) {
            let data = singleModule['data'];

            if (typeof data === 'object') {
                for (let x in data) {
                    if (!TemplateParser._isValidField(data[x])) {
                        throw 'Module\'s data should contain only primary type.';
                    }
                }
            } else {
                throw 'Module data must be an object';
            }
        } else {
            throw 'Module must have data field.'
        }
    };

    static _isValidField(field) {
        if (typeof field === 'object') {
            return field === null || field === undefined;
        }

        return true;
    }
}


module.exports = TemplateParser;
module.exports.singleParser = singleValueParser;



