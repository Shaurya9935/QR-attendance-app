import QRCode from "qrcode";
import connectDB from "../lib/db.js";
import Student from "../models/student.js";
import dotenv from "dotenv";


dotenv.config();

await connectDB();

const students = await Student.find();

for(const student of students) {
    await QRCode.toFile(
        `./qrcodes/${student.enrollmentNumber}_${student.name}.png`,
        student.enrollmentNumber
    );
}

console.log("QR Codes Generated")
