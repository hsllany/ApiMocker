'use strict';

function randomInt(min = 0, max = 100) {
    return Math.round(Math.random() * (max - min) + min);
}

function randomNumber(min = 0, max = 100) {
    return Math.random() * (max - min) + min;
}


function randomString(number = 20, charset) {
    let sb = "";

    for (let i = 0; i < number; i++) {
        let index = randomInt(0, charset.length - 1);
        sb += charset[index];
    }

    return sb;
}

function randomBoolean(trueProbability = 0.5) {
    let r = randomInt(0, 100);
    if (r < trueProbability * 100) {
        return true;
    }
    return false;
}

exports.randomInt = randomInt;
exports.randomString = randomString;
exports.randomBoolean = randomBoolean;
exports.randomNumber = randomNumber;