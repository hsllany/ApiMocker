const random = require('./randomutils');
var json = require('./json');

let MockerFactory = {
    internal: {
        mocker: {
            randomString: function () {
                return random.randomString(random.randomInt(0, 100));

            },

            randomInt: function (min = 0, max = 100) {
                let r = random.randomInt(parseInt(min), parseInt(max));
                return r;

            },

            randomBoolean: function () {
                return random.randomBoolean();

            },

            randomNumber: function (min = 0, max = 100) {
                let r = random.randomNumber(parseFloat(min), parseFloat(max));
                return r;
            },

            randomStringOrNull: function () {
                let r = random.randomBoolean();
                return r ? this.randomString() : 'null';
            },

            randomEnum: function () {
                let index = random.randomInt(0, arguments.length - 1);
                return arguments[index];
            },

            randomArrayOf: function (moduleName, number = 10) {
                let template = this.template;

                if (!template.modules.hasOwnProperty(moduleName)) {
                    throw "Can not find ' " + moduleName + " ' in modules";
                }
                let jsonArray = new json.JsonArray(template);
                number = parseInt(number);
                let length = random.randomInt(0, number);

                for (let i = 0; i < length; i++) {
                    jsonArray.add(template.modules[moduleName]);
                }

                return jsonArray;

            }
        }, filter: {
            removeField: function () {
                for (let i = 0; i < arguments.length; i++) {
                    this.removeChild(arguments[i]);
                }
            }
        }
    }, external: {
        mocker: {}, filter: {}
    }
};

module.exports = MockerFactory;

