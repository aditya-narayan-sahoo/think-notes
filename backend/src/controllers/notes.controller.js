import mongoose from "mongoose";
import Note from "../models/notes.model.js";
import asyncHandler from "../utils/asyncHandler.js";

export const getNotes = asyncHandler(async (req, res) => {
  const notes = await Note.find().sort({ createdAt: -1 });
  res.status(200).json(notes);
});

export const getNoteById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid note ID" });
  }
  const note = await Note.findById(id);
  if (!note) {
    return res.status(404).json({ message: "Note not found" });
  }
  res.status(200).json(note);
});

export const createNote = asyncHandler(async (req, res) => {
  const { title, content } = req.body || {};
  if (!title || !content) {
    return res.status(400).json({ message: "Title and content are required" });
  }
  const newNote = new Note({ title, content });
  const savedNote = await newNote.save();
  res
    .status(201)
    .json({ message: "Note created successfully", note: savedNote });
});

export const updateNote = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid note ID" });
  }
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).json({ message: "Title and content are required" });
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
});

export const deleteNote = asyncHandler(async (req, res) => {
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
});
