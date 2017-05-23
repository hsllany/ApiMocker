/**
 * Created by leeco on 17/5/23.
 */
'use strict';

function randomInt(min = 0, max = 100) {
    return Math.round(Math.random() * (max - min) + min);
}

const ABC = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+:,.?/`\\|';

function randomString(number = 20) {
    let sb = "";

    for (let i = 0; i < number; i++) {
        let index = randomInt(0, ABC.length - 1);
        sb += ABC[index];
    }

    return sb;
}

function randomBoolean() {
    let r = randomInt(0, 1);
    if (r === 1) {
        return true;
    }
    return false;
}

exports.randomInt = randomInt;
exports.randomString = randomString;
exports.randomBoolean = randomBoolean;