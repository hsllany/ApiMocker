const TemplateParser = require('../apiwhatever/templateparser');
const MockFactory = require('../apiwhatever/mockerfactory');

let apiwhatever = {
    mock: function (rawJsonObject) {
        let rawData = rawJsonObject;
        if (typeof rawJsonObject === 'string') {
            rawData = JSON.parse(rawJsonObject);
        }

        try {
            let tParser = new TemplateParser(rawData);
            let template = tParser.process();

            return template.main.toJsonString();
        } catch (e) {
            console.log(e);
        }
    },

    registerMocker: function (funcName, func) {
        if (typeof funcName === 'string' && typeof func === 'function') {
            MockFactory.external.mocker[funcName] = func;
        } else {
            throw 'failed to register, funcName must be a string and function must by a \'function\'';
        }
    },

    registerFilter: function (funcName, func) {
        if (typeof funcName === 'string' && typeof func === 'function') {
            MockFactory.external.filter[funcName] = func;
        } else {
            throw 'failed to register, funcName must be a string and function must by a \'function\'';
        }
    }
};

module.exports = apiwhatever;