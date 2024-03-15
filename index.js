const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors({ credentials: true }));

app.use((error, req, res, next) => {
  if (error instanceof SyntaxError && error.status === 400 && 'body' in error) {
      return res.status(400).send({ "error": error.message });
  }
  next();
});

const port = 3001;

class Message {
  constructor(username, content) {
    this.username = username;
    this.content = content;
  }
}

class Channel {
  constructor(name) {
    this.name = name;
    this.messages = []
  }
}

const channels = [
  new Channel("Channel 1"),
  new Channel("Channel 2"),
  new Channel("Channel 3"),
];

function getChannelWithRes(channelId, res) {
  if (isNaN(channelId)) {
    res.status(400).json({
      "error": "Channel ID that you passed is not a number."
    });

    return;
  }

  let channel = channels[channelId];

  if (!channel) {
    res.status(404).json({
      "error": "There is no channel with this ID."
    });

    return;
  };

  return channel;
}

app.get('/channels', (_req, res) => {
  let channelNames = channels.map((channel) => {return channel.name});

  res.status(200).json(channelNames);
});

app.get('/messages/:channelId', (req, res) => {
  let channelId = parseInt(req.params.channelId);
  let channel = getChannelWithRes(channelId, res);

  if (!channel) {
    return;
  }

  res.status(200).json(channel.messages);
});

app.post('/:channelId', (req, res) => {
  let channelId = parseInt(req.params.channelId);
  let channel = getChannelWithRes(channelId, res);

  if (!channel) {
    return;
  }

  let username = req.body.username;
  let message = req.body.message;

  if (!username || !message) {
    res.status(400).json({"error": "Some fields are missing."});
    return;
  }

  channels[channelId].messages.push(new Message(username, message));

  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
