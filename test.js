/**
 * Created by leeco on 17/5/26.
 */
let a = {
    b: "hello world"
};

let mock = require('./jsonmocker/mockerfactory');

function aa() {
    console.log(this.b);
}
let bb = 'console.log(\'lal\');';

mock.run(a, bb);

