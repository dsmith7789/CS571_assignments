
// You MUST have a file called "token.secret" in the same directory as this file!
// This should be the secret token found in https://dashboard.ngrok.com/
// Make sure it is on a single line with no spaces!
// It will NOT be committed.

// TO START
//   1. Open a terminal and run 'npm start'
//   2. Open another terminal and run 'npm run tunnel'
//   3. Copy/paste the ngrok HTTPS url into the DialogFlow fulfillment.
//
// Your changes to this file will be hot-reloaded!

import fetch from 'node-fetch';
import fs from 'fs';
import ngrok from 'ngrok';
import morgan from 'morgan';
import express from 'express';

// Read and register with secret ngrok token.
ngrok.authtoken(fs.readFileSync("token.secret").toString().trim());

// Start express on port 53705
const app = express();
const port = 53705;

// Accept JSON bodies and begin logging.
app.use(express.json());
app.use(morgan(':date ":method :url" :status - :response-time ms'));

// "Hello World" endpoint.
// You should be able to visit this in your browser
// at localhost:53705 or via the ngrok URL.
app.get('/', (req, res) => {
  res.status(200).send(JSON.stringify({
    msg: 'Express Server Works!'
  }))
})

// Dialogflow will POST a JSON body to /.
// We use an intent map to map the incoming intent to
// its appropriate async functions below.
// You can examine the request body via `req.body`
// See https://cloud.google.com/dialogflow/es/docs/fulfillment-webhook#webhook_request
app.post('/', (req, res) => {
  const intent = req.body.queryResult.intent.displayName;

  // A map of intent names to callback functions.
  // The "HelloWorld" is an example only -- you may delete it.
  const intentMap = {
    "HelloWorld": doHelloWorld,
    "GetNumUsers": doGetNumUsers,
    "GetNumMessages": doGetNumMessages,
    "GetChatroomMessages": doGetChatroomMessages
  }

  if (intent in intentMap) {
    // Call the appropriate callback function
    intentMap[intent](req, res);
  } else {
    // Uh oh! We don't know what to do with this intent.
    // There is likely something wrong with your code.
    // Double-check your names.
    console.error(`Could not find ${intent} in intent map!`)
    res.status(404).send(JSON.stringify({ msg: "Not found!" }));
  }
})

// Open for business!
app.listen(port, () => {
  console.log(`DialogFlow Handler listening on port ${port}. Use 'npm run tunnel' to expose this.`)
})

// Your turn!
// See https://cloud.google.com/dialogflow/es/docs/fulfillment-webhook#webhook_response
// Use `res` to send your response; don't return!

async function doHelloWorld(req, res) {
  res.status(200).send({
    fulfillmentMessages: [
      {
        text: {
          text: [
            'You will see this if you trigger an intent named HelloWorld'
          ]
        }
      }
    ]
  })
}

async function doGetNumUsers(req, res) {
  const resp = await fetch("https://cs571.org/s23/hw12/api/numUsers", {
    headers: {
      "X-CS571-ID": "bid_81b3bf23169ffb1c0d94"
    }
  })
  const data = await resp.json()
  const numUsers = await data["users"]
  res.status(200).send({
    fulfillmentText: `There are ${numUsers} registered users on BadgerChat!`
  })
}

async function doGetNumMessages(req, res) {
  const chatroomName = req.body.queryResult.parameters.chatroomName
  //console.log(chatroomName)
  const validChatroomsRaw = await fetch("https://www.cs571.org/s23/hw12/api/chatroom", {
    headers: {
      "X-CS571-ID": "bid_81b3bf23169ffb1c0d94"
    }
  })
  const validChatrooms = await validChatroomsRaw.json()

  if (validChatrooms.includes(chatroomName)) {
    const resp = await fetch(`https://www.cs571.org/s23/hw12/api/chatroom/${chatroomName}/numMessages`, {
      headers: {
        "X-CS571-ID": "bid_81b3bf23169ffb1c0d94"
      }
    })
    const data = await resp.json()
    const numMessages = await data["messages"]
    res.status(200).send({
      fulfillmentText: `There are ${numMessages} messages in ${chatroomName}!`
    })
  } else {
    const resp = await fetch("https://www.cs571.org/s23/hw12/api/numMessages", {
      headers: {
        "X-CS571-ID": "bid_81b3bf23169ffb1c0d94"
      }
    })
    const data = await resp.json()
    const numMessages = await data["messages"]
    res.status(200).send({
      fulfillmentText: `There are ${numMessages} messages on BadgerChat!`
    })
  }
}

async function doGetChatroomMessages(req, res) {
  const params = req.body.queryResult.parameters
  // console.log(params)
  const chatroomName = params.chatroomname
  var numMessages = params.number
  if (typeof(numMessages) != 'number') {
    numMessages = 1
  } else if (numMessages > 5) {
    numMessages = 5
  }

  console.log("chatroom = ", chatroomName)
  console.log("numMessages = ", numMessages)

  const resp = await fetch(`https://www.cs571.org/s23/hw12/api/chatroom/${chatroomName}/messages`, {
    headers: {
      "X-CS571-ID": "bid_81b3bf23169ffb1c0d94"
    }
  })
  const data = await resp.json()
  const messages = await data["messages"]
  // console.log(messages)
  const recentMessages = await messages.slice(0, numMessages)
  console.log(recentMessages)
  const cards = recentMessages.map(recentMessage => convertToCard(recentMessage))
  console.log(cards)

  res.status(200).send({
    fulfillmentMessages: [
      {
        text: {
          text: [
            `Here are the latest ${numMessages} posts in ${chatroomName}!`
          ]
        }
      },
      ...cards
    ]
  })
}

/**
 * Converts the message json object to a card object for display purposes in DialogFlow fulfillment message.
 * @param {} message retrieved from the API
 * @returns a card representation of the message
 */
function convertToCard(message) {
  const messageCard = {
    card: {
      title: message.title,
      subtitle: message.content,
      buttons: [
        {
          text: "Read More",
          postback: `https://cs571.org/s23/badgerchat/chatrooms/${message.chatroom}/messages/${message.id}`
        }
      ]
    }
  }
  console.log(messageCard)
  return messageCard
}