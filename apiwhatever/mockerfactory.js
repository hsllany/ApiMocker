const random = require('./randomutils');
var json = require('./json');

let MockerFactory = {
    mocker: {
        buildRandomString: function () {
            return function () {
                return random.randomString(random.randomInt(0, 100));
            }
        },

        buildRandomInt: function (template) {
            let min = 0;
            let max = 100;

            if (arguments.length > 1) {
                min = parseInt(arguments[1]);
            }

            if (arguments.length > 2) {
                max = parseInt(arguments[2]);
            }

            return function () {
                let r = random.randomInt(min, max);
                return r;
            }
        },

        buildRandomBoolean: function (template) {
            return function () {
                return random.randomBoolean();
            }
        },

        buildRandomNumber: function (template) {
            let min = 0;
            let max = 100;

            if (arguments.length > 1) {
                min = parseFloat(arguments[1]);
            }

            if (arguments.length > 2) {
                max = parseFloat(arguments[2]);
            }

            return function () {
                let r = random.randomNumber(min, max);
                return r;
            }
        },

        buildRandomStringOrNull: function () {
            let r = random.randomBoolean();
            return r ? this.randomString() : 'null';
        },

        buildRandomEnum: function (template) {

            let outerArguments = arguments;
            let number = arguments.length;

            return function () {
                let index = random.randomInt(1, number - 1);
                return outerArguments[index];
            }

        },

        buildRandomArrayOf: function (template, moduleName, number = 10) {
            return function () {
                if (!template.modules.hasOwnProperty(moduleName)) {
                    throw "Can not find ' " + moduleName + " ' in modules";
                }
                let jsonArray = new json.JsonArray();
                number = parseInt(number);
                let length = random.randomInt(0, number);

                for (let i = 0; i < length; i++) {
                    jsonArray.add(template.modules[moduleName]);
                }

                return jsonArray;
            }
        }
    }, filter: {
        buildRemoveField: function (template, fieldName) {
            let outArgments = arguments;

            return function () {

                for (let i = 1; i < outArgments.length; i++) {
                    this.removeChild(outArgments[i]);
                }
            }
        }
    }
}

module.exports = MockerFactory;

