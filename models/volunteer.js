import mongoose from "mongoose";

const volunteerSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },
});

export default mongoose.models.Volunteer ||
  mongoose.model("Volunteer", volunteerSchema);