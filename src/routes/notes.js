const express = require("express");
const Note = require("../models/note.js");
const { WithAuth } = require("../middlewares/auth.js");

const router = express.Router();

const isOwner = (user, note) => {
  if (JSON.stringify(user._id) === JSON.stringify(note.author._id)) {
    return true;
  } else {
    return false;
  }
};

router.post("/", WithAuth, async (req, res) => {
  const { title, body } = req.body;

  try {
    const note = new Note({ title: title, body: body, author: req.user.id });
    await note.save();
    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ error: "Problem creating the note, try again" });
  }
});

router.get("/search", WithAuth, async (req, res) => {
  const { query } = req.query;

  try {
    const notes = await Note.find({ author: req.user._id }).find({
      $text: { $search: query },
    });

    res.json(notes);
  } catch (error) {
    res.json({ error: error }).status(500);
  }
});

router.get("/:id", WithAuth, async (req, res) => {
  const { id } = req.params;

  try {
    const note = await Note.findById(id);

    if (isOwner(req.user, note)) {
      res.status(200).json(note);
    } else {
      res.status(403).json({ error: "Permission denied" });
    }
  } catch (error) {
    res.status(500).json({ error: "Problem requesting the note, try again" });
  }
});

router.get("/", WithAuth, async (req, res) => {
  try {
    const notes = await Note.find({ author: req.user._id });
    res.status(200).json(notes);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Problem requesting the note list, try again" });
  }
});

router.put("/:id", WithAuth, async (req, res) => {
  const { title, body } = req.body;
  const { id } = req.params;

  try {
    const note = await Note.findById(id);

    if (isOwner(req.user, note)) {
      const newNote = await Note.findOneAndUpdate(
        { _id: id },
        { $set: { title: title, body: body } },
        { upsert: true, returnOriginal: false }
      );

      res.status(200).json(newNote);
    } else {
      res.status(403).json({ error: "Permission denied" });
    }
  } catch (error) {
    res.status(500).json({ error: "Problem updating the note, try again" });
  }
});

router.delete("/:id", WithAuth, async (req, res) => {
  const { id } = req.params;

  try {
    const note = await Note.findById(id);

    if (isOwner(req.user, note)) {
      await note.delete();
      res.status(204).json({ message: "Note successfully deleted" });
    } else {
      res.status(403).json({ error: "Permission denied" });
    }
  } catch (error) {
    res.status(500).json({
      error:
        "Problem deleting the note, maybe the note doesn't exist, try again",
    });
  }
});

module.exports = router;
