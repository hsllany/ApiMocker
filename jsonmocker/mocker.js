const random = require('./randomutils')

let mocker = {

    run: function (object, mock) {
        let value = null;

        if (typeof mock === 'string') {
            value = eval(mock);
        } else if (typeof mock === 'function' && object instanceof Object) {
            object.mock = mock;
            value = object.mock();
        } else {
            throw 'Unknow mock type, must be one of \'string\' or \'function\'';
        }
    },

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

