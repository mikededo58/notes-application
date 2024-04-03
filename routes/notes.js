const notes = require("express").Router();
const { readAndAppend, readFromFile } = require("../helpers/fsUtils");
const { v4: uuidv4 } = require("uuid");

notes.get("/", (req, res) =>
  readFromFile("./db/notes.json").then((data) => res.json(JSON.parse(data)))
);

notes.post("/", (req, res) => {
  const { title, text } = req.body;

  if (title && text) {
    const newNotes = {
      title,
      text,
      note_id: uuidv4(),
    };

    readAndAppend(newNotes, "./db/notes.json");

    const response = {
      status: "sucess",
      body: newNotes,
    };
    res.json(response);
  } else {
    res.json("Error in posting notes");
  }
});
module.exports = notes;
//class constrcut 