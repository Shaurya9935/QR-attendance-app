import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  enrollmentNumber: {
    type: String,
    required: true,
    unique: true,
  },

  branch: {
    type: String,
    required: true,
  },

  mobileNumber: {
    type: String,
    required: true,
  },
});

export default mongoose.models.Student ||
  mongoose.model("Student", studentSchema);