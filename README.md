#Gladys-slack

This module allows you to speak with Gladys on your phone with the [Slack](https://slack.com/).

## Requirements

- You need Gladys >= 3.5.

##Configuration

###Step 1: Get your Slack API Key
- To get an API key, first go to the Slack apps management page at <a href="https://api.slack.com/apps">https://api.slack.com/apps</a>
- If you aren’t signed in, click ‘sign in to your Slack account’ to manage your team’s apps.
- Once you’re signed in, click the ‘Create an App’ button in the middle of the screen. (If you’ve created a Slack app before you’ll find the button in the upper-right corner)
- Give your app a name, such as “Gladys”, and choose the Slack team where you want it the app installed.

###Step 2: Add a New ‘Bot User’
- To add a new bot user, select ‘Bot users’ under the features heading on the left-hand side navigation of the app configuration page.</li>
- Click the ‘Add a bot user’ button and give it username, such as @gladys.</li>
- Keep the ‘always appear online’ slider in the off position (we want our slackbot to appear offline if it crashes) and then click the add bot user button.</li>
- Finally, we have to give our slackbot access to slack with our API key. Select ‘OAuth & Permissions’ under the features heading on the left-hand side navigation of the app configuration page and click the ‘Install App to Team’ button.</li>
- After you authorize the slackbot, you will then have access to the OAuth tokens - click ‘copy’ next to the slackbot user OAuth token to get the token on your clipboard!</li>
    
###Step 3: Setup Gladys
- Install the gladys-slack module in Gladys. Do not reboot for the moment ! 
- In your Gladys dashboard go to "Parameters" => "Parameters". Create Gladys parameter : `SLACK_API_KEY` => your Slack API key.
- Reboot Gladys
- Open Gladys logs (`pm2 logs gladys` on a Raspberry Pi), you should see :
`debug: Slack : Received message on channel = XXXXXXX, from = "XXXXXXX" with content = "Bonjour"`
- Copy the "from" and "channel" and create two Gladys parameters `TELEGRAM_CHAT_ID_yourChatId_USER` = `your user ID in Gladys`, and `SLACK_USER_yourUserIdInGladys_CHANNEL_ID` = `CHANNEL_ID`. This will help Gladys know that this Slack conversation is your user in Gladys, and that to contact you she will need to talk in this conversation (to speak in both way).
- You can know talk to Gladys !