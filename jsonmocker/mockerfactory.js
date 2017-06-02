const random = require('./randomutils');
var json = require('./json');

let MockerFactory = {
    buildRandomString: function (args) {
        return function () {
            return random.randomString(random.randomInt(0, 100));
        }
    },

    buildRandomStringOrNull: function (args) {
        let r = random.randomBoolean();
        return r ? this.randomString() : 'null';
    },

    buildRandomEnum: function (args) {

        let params = args;
        let number = args.length;

        return function () {
            let index = random.randomInt(0, number - 1);
            return params[index];
        }

    },

    buildArrayOf: function (args, template) {
        return function () {
            let jsonArray = new json.JsonArray();

            let length = random.randomInt(0, 10);

            for(let i = 0; i < length; i++){
                jsonArray.add(template.modules[args]);
            }

            return jsonArray;
        }
    }
}

module.exports = MockerFactory;

