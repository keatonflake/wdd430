var express = require("express");
var router = express.Router();
var sequenceGenerator = require("./sequenceGenerator");
const Document = require("../models/document");

router.get("/", async (req, res, next) => {
  try {
    const documents = await Document.find({});
    res.status(200).json(documents);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/", async (req, res, next) => {
  const maxDocumentId = sequenceGenerator.nextId("documents");
  const docData = req.body;
  docData = {
    id: maxDocumentId,
    ...docData,
  };
  try {
    const newDoc = new Document(docData);
    await newDoc.save();
    res.status(201).json(newDoc);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/:id", async (req, res, next) => {
  const docData = req.body;

  try {
    const updatedDoc = await Document.findOneAndUpdate(
      { id: req.params.id },
      docData,
      { new: true }
    );

    res.status(200).json(updatedDoc);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const deletedDoc = await Document.deleteOne({ id: req.params.id });

    if (deletedDoc.deletedCount === 0) {
      return res.status(404).json({ error: "Document not found" });
    }

    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
