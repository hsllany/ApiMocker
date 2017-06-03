const apiwhatever = require('./../apiwhatever');

let json = require('./../example/test.json');

apiwhatever.registerMocker('groupName', function () {
    let date = new Date();
    return 'group' + date.getTime();
})
console.log(apiwhatever.mock(json));