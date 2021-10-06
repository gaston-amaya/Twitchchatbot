/** @format */

// makes the variables inside dot.env available to our node project
require("dotenv").config();

const tim = require("tmi.js");

// we setup the connection configurations
// these include the channel, username and password
const client = new tim.Client({
  options: {
    debug: true,
    messagesLogLevel: "info",
  },
  connection: {
    reconnct: true,
    secure: true,
  },
// lack of identity tags makes the bot anonymous and able to fetch messages from the channel
// for reading, supervision, spying, or viewing purposes only
identity: {
  username: `${process.env.TWITCH_USERNAME}`,
  password: `oauth:${process.env.TWITCH_OAUTH}`
},
  channels: [`${process.env.TWITCH_CHANNEL}`]

});

// Connect to the channel specified using the setings found in the configurations
// Any error found shall be logged out in the console
client.connect().catch(console.error);

// We shall pass the parameters which shall be required
client.on('message', (channel, tags, message, self) => {
    // Lack of this statement or it's inverse (!self) will make it in active
    if (self) return;

   switch (message.toLowerCase()) {
   

    
      case 'commands':
            client.say(channel, `@${tags.username}, available commands are:
            Commands Help Greetings Hi !Website !Name
           
            For more help just type "Help"
            `);
            break;

                 // In case the message in lowercase is equal to the string '!website', send the sender of that message your personal website
        case '!website':
          client.say(channel, `@${tags.username}, my website is www.google.com!`);
          break;
          
          // In case the message in lowercase is equal to the string 'greetings', send the sender of that message 'Hello @Username, what's up?!'
      case 'greetings':
          client.say(channel, `Hello @${tags.username}, what's up?!`);
          break;
          
          // In case the message in lowercase is equal to the string 'hi', send the sender of that message 'Username, hola'
      case 'hi':
          client.say(channel, `${tags.username}, hola!`);
          break;
   
   
   } 
    


});



