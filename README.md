<div align="center">

# Ticket System

Discord.JS Ticket System
  
![Discord](https://img.shields.io/static/v1?label=Discord.JS&message=V13&color=red)
![NodeJS](https://img.shields.io/static/v1?label=Node.JS&message=V18.10.0&color=green)
![Javascript](https://img.shields.io/static/v1?label=Code%20Language&message=Javascript&color=yellow)

</div>


### Reminder
This bot is easily coded this I did so everyone can understand it, with Managers/Models to make things look clean and not cluttered. Feel free to use these and make a Commit if you can improve anything!

### Support
if you need any Support with the code just send me a dm on discord: н1ѕтι.#1327

### Note
If this repo hits 10 stars i will update the bot with moderation and Fun commands!


### Setup the bot

#### Discord Developer Portal
1. First create a application on the [[Developer Portal](https://discord.com/developers/applications)]
2. Make your application a bot [[Image](https://user-images.githubusercontent.com/78086344/134589129-89f91109-4abc-4ca2-be56-d7c0ceb7a082.png)]

#### The bot it self!
1. Change the bot token to your bot token | You can find it under [[here](https://user-images.githubusercontent.com/78086344/134589639-75cdee6e-31bf-4593-b1e1-e8330510adbe.png)] <br>
You can change the token [[here](https://github.com/hoaxFacts/ExclusiveTickets-Discord-Bot/blob/main/data/config.yml)]
3. When you changed the token, you can simply start up the bot using: "node ." in your terminal!
* If this gives a error try changing the **Intents** of your bot at [[here](https://user-images.githubusercontent.com/78086344/134589639-75cdee6e-31bf-4593-b1e1-e8330510adbe.png)]



### Features
* Ticket System (Ticketpanel, Close, Remove, Add, Rename)
* Mutli Guild Supported
* Transcript System
* Interaction (Select Menu, Buttons)
* Changeable (Messages and Config)
* Database Models | Getters/Setts/Checkers for database information
* User Models | (findRole, findChannel etc)
* Blacklist System | (set, check)
* Language Selector | (NL, ENG)
* Utils (Ticket, embed, interaction)

### Command Handler
```js
module.exports = async(client) => {
const discord = require("discord.js");

module.exports = {
    name: "test",
    description: "Dit is een test commando.",
    perms: {
        client: [discord.Permissions.ADMINISTRATOR],
        user: [discord.Permissions.FLAGS.ADMINISTRATOR]
    },
    aliases: ["test"],

    execute: async(client, message, args) => {
    
    // Code
        
    }
}
```
