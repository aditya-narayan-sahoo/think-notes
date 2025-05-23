import mongoose from "mongoose";
import Note from "../models/notes.model.js";

export const getNotes = async (req, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 }); // Newest note first
    res.status(200).json(notes);
  } catch (error) {
    console.error(`Error in getNotes controller: ${error.message}`);
    res.status(500).json({ message: "Failed to fetch all notes" });
  }
};

export const getNoteById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid note ID" });
    }

    const note = await Note.findById(id);
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json(note);
  } catch (error) {
    console.error(`Error in getNoteById controller: ${error.message}`);
    res.status(500).json({ message: "Failed to fetch the requested note" });
  }
};

export const createNote = async (req, res) => {
  try {
    const { title, content } = req.body || {};

    if (!title || !content) {
      return res
        .status(400)
        .json({ message: "Title and content are required" });
    }

    const newNote = new Note({ title, content });
    const savedNote = await newNote.save();

    res
      .status(201)
      .json({ message: "Note created successfully", note: savedNote });
  } catch (error) {
    console.error(`Error in createNote controller: ${error.message}`);
    res.status(500).json({ message: "Failed to create the note" });
  }
};

export const updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid note ID" });
    }
    const { title, content } = req.body;
    if (!title || !content) {
      return res
        .status(400)
        .json({ message: "Title and content are required" });
    }
    const updatedNote = await Note.findByIdAndUpdate(
      id,
      { title, content },
      { new: true }
    );

    if (!updatedNote) {
      return res.status(404).json({ message: "Note not found" });
    }

    res
      .status(200)
      .json({ message: "Note updated successfully", note: updatedNote });
  } catch (error) {
    console.error(`Error in updateNote controller: ${error.message}`);
    res.status(500).json({ message: "Failed to update the note" });
  }
};

export const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid note ID" });
    }

    const deletedNote = await Note.findByIdAndDelete(id);
    if (!deletedNote) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json({
      message: `Note with ID: ${deletedNote._id} has been deleted successfully`,
    });
  } catch (error) {
    console.error(`Error in deleteNote controller: ${error.message}`);
    res.status(500).json({ message: "Failed to delete the note" });
  }
};
