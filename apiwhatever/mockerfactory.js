const random = require('./randomutils');
var json = require('./json');

let MockerFactory = {
    mocker: {
        buildRandomString: function () {
            return function () {
                return random.randomString(random.randomInt(0, 100));
            }
        },

        buildRandomStringOrNull: function () {
            let r = random.randomBoolean();
            return r ? this.randomString() : 'null';
        },

        buildRandomEnum: function (enumsArray) {

            let params = enumsArray;
            let number = enumsArray.length;

            return function () {
                let index = random.randomInt(0, number - 1);
                return params[index];
            }

        },

        buildRandomArrayOf: function (moduleName, template) {
            return function () {
                let jsonArray = new json.JsonArray();

                let length = random.randomInt(0, 10);

                for (let i = 0; i < length; i++) {
                    jsonArray.add(template.modules[moduleName]);
                }

                return jsonArray;
            }
        }
    }, filter: {
        buildRemoveField: function (fieldName) {
            return function () {

                for(let i = 0; i < fieldName.length; i++){
                    this.removeChild(fieldName[i]);
                }
            }
        }
    }
}

module.exports = MockerFactory;

