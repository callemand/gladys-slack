const shared = require('./shared.js');
const Promise = require('bluebird');

module.exports = function notify(message, user) {
    if(shared.bot === null) return Promise.reject(`BOT_NOT_INITIALIZED`);
    return gladys.param.getValue(`SLACK_USER_${user.id}_CHANNEL_ID`)
        .then((value) => {
            console.log("Slack plugin notifing 3...");

            shared.bot.sendMessage(message.text, value);

            return Promise.resolve(true);
        })
        .catch(() => {

            sails.log.warn(`Slack : Conversation not linked to a user in Gladys.`);
            sails.log.warn(`Create a param in Gladys "SLACK_USER_${user.id}_CHANNEL_ID" with in value the chat ID of your slack conversation with Gladys.`);

            return Promise.reject();
        });
};