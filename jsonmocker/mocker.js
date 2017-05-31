const random = require('./randomutils');
var JSON = require('./json');

let mocker = {
    randomString: function () {
        return random.randomString(random.randomInt(0, 100));
    },

    randomStringOrNull: function () {
        let r = random.randomBoolean();
        return r ? this.randomString() : 'null';
    },

    randomEnum: function () {
        let number = arguments.length;

        let index = random.randomInt(0, number);
        return arguments[index];
    },
}

module.exports = mocker;

