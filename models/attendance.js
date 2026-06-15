import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema(
  {
    enrollmentNumber: {
      type: String,
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    branch: {
      type: String,
      required: true,
    },

    markedBy: {
      type: String,
      required: true,
    },

    eventDate: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

attendanceSchema.index(
  {
    enrollmentNumber: 1,
    eventDate: 1,
  },
  {
    unique: true,
  }
);

export default mongoose.models.Attendance ||
  mongoose.model("Attendance", attendanceSchema);