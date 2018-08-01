const { RTMClient, WebClient } = require('@slack/client');
const shared = require('./shared');
const Promise = require('bluebird');

module.exports = function init(){
    return gladys.param.getValue('SLACK_API_KEY')
        .then((slackApiKey) => {
            shared.slackApiKey = slackApiKey;
            shared.bot = new RTMClient(shared.slackApiKey);

            shared.bot.on('message', (message) => {
                if (message.type === 'message' && message.text) {

                    sails.log.debug(`Slack : Received message on channel = ${message.channel}, from = "${message.user}" with content = "${message.text}"`);

                    gladys.param.getValue(`SLACK_CHAT_ID_${message.user}_USER`)
                        .then((value) => {

                            // get the user
                            return gladys.user.getById({id: value});
                        })
                        .then((user) => {

                            // sending the message
                            return gladys.message.send(user, {text: message.text});
                        })
                        .catch(() => {
                            sails.log.warn(`Slack : Conversation not linked to a user in Gladys.`);
                            sails.log.warn(`Create a param in Gladys "SLACK_CHAT_ID_${message.user}_USER" with in value the ID of your user in Gladys`);
                        });


                }
            });

            shared.bot.start();
        })
};