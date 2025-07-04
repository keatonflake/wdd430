var express = require("express");
var router = express.Router();
var sequenceGenerator = require("./sequenceGenerator");
const Message = require("../models/message");
const Contact = require("../models/contact");

router.get("/", async (req, res, next) => {
  try {
    const messages = await Message.find({});

    const populatedMessages = await Promise.all(
      messages.map(async (message) => {
        const messageObj = message.toObject();
        if (messageObj.sender) {
          const senderContact = await Contact.findOne({
            id: messageObj.sender,
          });
          messageObj.sender = senderContact || messageObj.sender;
        }
        return messageObj;
      })
    );

    console.log(
      "Messages from DB:",
      JSON.stringify(populatedMessages, null, 2)
    );
    res.status(200).json(populatedMessages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/", async (req, res, next) => {
  try {
    const maxMessageId = await sequenceGenerator.nextId("messages");

    if (!maxMessageId || maxMessageId === -1 || maxMessageId === "-1") {
      return res.status(500).json({ error: "Failed to generate message ID" });
    }

    const { id, ...bodyWithoutId } = req.body;

    const msgData = {
      id: maxMessageId,
      ...bodyWithoutId,
    };

    console.log("Creating message with data:", msgData);

    const newMessage = new Message(msgData);
    await newMessage.save();

    const messageObj = newMessage.toObject();
    if (messageObj.sender) {
      const senderContact = await Contact.findOne({ id: messageObj.sender });
      messageObj.sender = senderContact || messageObj.sender;
    }

    res.status(201).json(messageObj);
  } catch (error) {
    console.error("Error creating message:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
});

router.put("/:id", async (req, res, next) => {
  const msgData = req.body;

  try {
    const updatedMessage = await Message.findOneAndUpdate(
      { id: req.params.id },
      msgData,
      { new: true }
    );

    const messageObj = updatedMessage.toObject();
    if (messageObj.sender) {
      const senderContact = await Contact.findOne({ id: messageObj.sender });
      messageObj.sender = senderContact || messageObj.sender;
    }

    res.status(200).json(messageObj);
  } catch (error) {
    console.error("Error updating message:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const deletedMessage = await Message.deleteOne({ id: req.params.id });

    if (deletedMessage.deletedCount === 0) {
      return res.status(404).json({ error: "Message not found" });
    }

    res.status(204).end();
  } catch (error) {
    console.error("Error deleting message:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
