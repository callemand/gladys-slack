module.exports = function (sails) {

    const init = require('./lib/init');
    const notify = require('./lib/notify.js');
    const install = require('./lib/install.js');

    gladys.on('ready', function(){
        init().catch(sails.log.warn);
    });

    return {
        init: init,
        notify: notify,
        install: install
    };
};