const { RTMClient, WebClient } = require('@slack/client');
const shared = require('./shared');
const Promise = require('bluebird');

/*
const bot_token = 'xoxb-310707043328-407169231168-3p8OWnNxBqyo10KN6uFEks8S';
const rtm       = new RTMClient(bot_token);
const web       = new WebClient(bot_token);
*/
module.exports = function init(){
    return gladys.param.getValue('SLACK_API_KEY')
        .then((slackApiKey) => {

            console.log(slackApiKey);

            shared.slackApiKey = slackApiKey;

            console.log('RTMClient');

            shared.bot = new RTMClient(shared.slackApiKey);


            shared.bot.on('message', (message) => {
                console.log('message');
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

            /*
            shared.bot.on('webhook_error', (error) => {
                sails.log.warn(`Telegram : Webhook error : ${error}`);
            });

            shared.bot.on('polling_error', (error) => {
                sails.log.warn(`Telegram : Polling error : ${error}`);
            });
            */
        })
};