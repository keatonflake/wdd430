var Sequence = require("../models/sequence");

var maxDocumentId;
var maxMessageId;
var maxContactId;
var sequenceId = null;
var isInitialized = false;

function SequenceGenerator() {
  this.initialize();
}

SequenceGenerator.prototype.initialize = function () {
  return Sequence.findOne()
    .then((sequence) => {
      if (sequence) {
        sequenceId = sequence._id;
        maxDocumentId = sequence.maxDocumentId;
        maxMessageId = sequence.maxMessageId;
        maxContactId = sequence.maxContactId;
        isInitialized = true;
        console.log("Sequence generator initialized:", {
          sequenceId,
          maxDocumentId,
          maxMessageId,
          maxContactId,
        });
      } else {
        console.error("No sequence document found in database");
      }
    })
    .catch((err) => {
      console.error("Error initializing sequence generator:", err);
    });
};

SequenceGenerator.prototype.nextId = async function (collectionType) {
  // Wait for initialization if not complete
  if (!isInitialized) {
    console.log("Waiting for sequence generator to initialize...");
    await this.initialize();
  }

  if (!sequenceId) {
    console.error("Sequence generator not properly initialized");
    return -1;
  }

  var updateObject = {};
  var nextId;

  switch (collectionType) {
    case "documents":
      maxDocumentId++;
      updateObject = { maxDocumentId: maxDocumentId };
      nextId = maxDocumentId;
      break;
    case "messages":
      maxMessageId++;
      updateObject = { maxMessageId: maxMessageId };
      nextId = maxMessageId;
      break;
    case "contacts":
      maxContactId++;
      updateObject = { maxContactId: maxContactId };
      nextId = maxContactId;
      break;
    default:
      return -1;
  }

  try {
    await Sequence.updateOne({ _id: sequenceId }, { $set: updateObject });
    console.log(`Generated ${collectionType} ID: ${nextId}`);
    return nextId.toString();
  } catch (error) {
    console.error("Error updating sequence:", error);
    return -1;
  }
};

module.exports = new SequenceGenerator();
