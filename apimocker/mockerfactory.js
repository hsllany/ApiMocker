const random = require('./randomutils');
var json = require('./json');

let MockerFactory = {
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

    buildArrayOf: function (moduleName, template) {
        return function () {
            let jsonArray = new json.JsonArray();

            let length = random.randomInt(0, 10);

            for(let i = 0; i < length; i++){
                jsonArray.add(template.modules[moduleName]);
            }

            return jsonArray;
        }
    }
}

module.exports = MockerFactory;

