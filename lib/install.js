module.exports = function(){
    var type = {
        name: 'Slack',
        service: 'slack'
    };

    return gladys.notification.install(type);
};