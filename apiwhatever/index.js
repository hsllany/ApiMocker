const TemplateParser = require('../apiwhatever/templateparser');

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
    }
};

module.exports = apiwhatever;