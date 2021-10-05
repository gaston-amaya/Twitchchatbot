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
  channels: [`${process.env.TWITCH_CHANNEL}`]

});

// Connect to the channel specified using the setings found in the configurations
// Any error found shall be logged out in the console
client.connect().catch(console.error);

// We shall pass the parameters which shall be required
client.on('message', (channel, tags, message, self) => {
    // Lack of this statement or it's inverse (!self) will make it in active
    if (self) return;
    
// This logs out all the messages sent on the channel on the terminal
    console.log(message);

});



