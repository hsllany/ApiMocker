const random = require('./randomutils');
var json = require('./json');

const ABC = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$';

let MockerFactory = {
    internal: {
        mocker: {
            /**
             * Simulate the string of length and charset.
             * @param length, positive integer or 'random'; If random length is set, the string's length will be in
             * [0, 100]
             * @param charset, string
             * @returns {*}
             */
            randomString: function (length = 'random', charset = ABC) {
                if (typeof charset !== 'string') {
                    console.warn('Charset must be string when randomString().');
                    charset = ABC;
                }
                if (length === 'random') {
                    return random.randomString(random.randomInt(0, 100), charset);
                } else if (typeof length === 'number') {
                    return random.randomString(length, charset);
                } else {
                    console.warn('Unknown length ' + length + " when randomString().");
                    return random.randomString(random.randomInt(0, 100), charset);
                }
            },

            randomInt: function (min = 0, max = 100) {
                let r = random.randomInt(parseInt(min), parseInt(max));
                return r;

            },

            randomBoolean: function (trueProbablity = 0.5) {
                return random.randomBoolean();

            },

            randomNumber: function (min = 0, max = 100) {
                let r = random.randomNumber(parseFloat(min), parseFloat(max));
                return r;
            },

            randomStringOrNull: function (nullProbability = 0.5) {
                let r = random.randomBoolean(nullProbability);
                return !r ? MockerFactory.internal.mocker.randomString() : 'null';
            },

            randomIntOrNull: function (nullProbability = 0.5, min = 0, max = 100) {
                let r = random.randomBoolean(nullProbability);
                return !r ? MockerFactory.internal.mocker.randomInt(min, max) : 'null';
            },

            randomBooleanOrNull: function (nullProbability = 0.5, trueProbability = 0.5) {
                let r = !random.randomBoolean(nullProbability);
                return r ? MockerFactory.internal.mocker.randomBoolean(trueProbability) : 'null';
            },

            randomEnum: function () {
                let index = random.randomInt(0, arguments.length - 1);
                return arguments[index];
            },

            date: function (args) {
                return new Date(args);
            },

            timestamp: function (args) {
                return new Date().getTime();
            },

            randomArrayOf: function (moduleName, min = 0, max = 10) {
                if (typeof min !== 'number' || typeof max !== 'number' || min * max < 0 || min > max) {
                    throw 'Min and max must be positive, number and max > min when randomArrayOf().';
                }

                let template = this.template;

                if (!template.modules.hasOwnProperty(moduleName)) {
                    throw "Can not find ' " + moduleName + " ' in modules";
                }
                let jsonArray = new json.JsonArray(template);
                min = parseInt(min);
                max = parseInt(max);
                let length = random.randomInt(min, max);

                for (let i = 0; i < length; i++) {
                    jsonArray.add(template.modules[moduleName]);
                }

                return jsonArray;

            },

            fixedNumberArrayOf: function (moduleNme, number = 10) {
                if (typeof number === 'number' || number < 0) {
                    throw 'ArrayNumber must be positive when fixedNumberArrayOf()';
                }

                let template = this.template;
                if (!template.modules.hasOwnProperty(moduleNme)) {
                    throw "Can't find  '" + moduleNme + "' in modules";
                }

                let jsonArray = new json.JsonArray(template);
                for (let i = 0; i < length; i++) {
                    jsonArray.add(template.modules[moduleNme]);
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

