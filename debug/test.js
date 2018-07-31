global.gladys = require('./mock-gladys');

const init = require('../lib/init');

init().then(() => {
   console.log('PLOP');
}).catch((err) => {
    console.log(err);
});