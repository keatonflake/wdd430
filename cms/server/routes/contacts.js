var express = require("express");
var router = express.Router();
var sequenceGenerator = require("./sequenceGenerator");
const Contact = require("../models/contact");

router.get("/", async (req, res, next) => {
  try {
    const contacts = await Contact.find({}).populate("group");
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/", async (req, res, next) => {
  try {
    console.log("=== CONTACT CREATION DEBUG ===");
    console.log("1. Request body:", JSON.stringify(req.body, null, 2));

    // Add await here - this was missing!
    const maxContactId = await sequenceGenerator.nextId("contacts");
    console.log(
      "2. Generated contact ID:",
      maxContactId,
      "Type:",
      typeof maxContactId
    );

    if (!maxContactId || maxContactId === -1 || maxContactId === "-1") {
      console.log("3. ID generation failed");
      return res.status(500).json({ error: "Failed to generate contact ID" });
    }

    // Remove the id field from req.body to prevent it from overriding our generated ID
    const { id, ...bodyWithoutId } = req.body;

    const contactData = {
      id: maxContactId,
      ...bodyWithoutId,
    };

    console.log(
      "3. Contact data to save:",
      JSON.stringify(contactData, null, 2)
    );

    const newContact = new Contact(contactData);
    console.log(
      "4. New contact object before save:",
      JSON.stringify(newContact.toObject(), null, 2)
    );

    await newContact.save();
    console.log("5. Contact saved successfully");

    const savedContact = await Contact.findById(newContact._id);
    console.log(
      "6. Contact retrieved from DB:",
      JSON.stringify(savedContact.toObject(), null, 2)
    );

    res.status(201).json(newContact);
  } catch (error) {
    console.error("=== ERROR CREATING CONTACT ===");
    console.error("Error:", error);
    console.error("Stack:", error.stack);
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
});

router.put("/:id", async (req, res, next) => {
  const contactData = req.body;

  try {
    const updatedContact = await Contact.findOneAndUpdate(
      { id: req.params.id },
      contactData,
      { new: true }
    );

    res.status(200).json(updatedContact);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const deletedContact = await Contact.deleteOne({ id: req.params.id });

    if (deletedContact.deletedCount === 0) {
      return res.status(404).json({ error: "Contact not found" });
    }

    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
