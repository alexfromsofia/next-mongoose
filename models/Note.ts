import mongoose, { Schema, Document, Model } from "mongoose";

const NoteSchema: Schema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required."],
    unique: true,
    trim: true,
    maxlength: [40, "Title cannot be more than 40 characters."],
  },
  description: {
    type: String,
    required: true,
    maxlength: [200, "Description cannot be more than 200 characters."],
  },
});

let model: Model<Document, {}>;

try {
  model = mongoose.model("Note");
} catch (error) {
  model = mongoose.model("Note", NoteSchema);
}

export default model;
