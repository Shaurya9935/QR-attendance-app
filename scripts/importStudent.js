import mongoose from "mongoose"
import dotenv from "dotenv"
import XLSX from "xlsx";

import connectDB from "../lib/db.js";
import Student from "../models/student.js"

dotenv.config();

async function importStudents() {
    try {
        await connectDB();
        const workbook = XLSX.readFile("students.xlsx");

        // console.log(workbook);
        // console.log(workbook.SheetNames)

        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const students = XLSX.utils.sheet_to_json(sheet);

        // console.log(students[0])

        console.log(`Found ${students.length} students`)

        const formattedStudents = students.map((student, index) => {
            if (!student.name) {
                console.log("Problem row:", index + 2); // +2 because Excel starts after header
                console.log(student);
            }

            return {
                name: student.name,
                enrollmentNumber: student.Enrollment_number,
                branch: student.Branch,
                mobileNumber: String(student.Mobile_number),
            };
        });

        // console.log(formattedStudents.find(student => !student.name));

        await Student.insertMany(formattedStudents);


        console.log("Students imported successfully")

        process.exit(1);
    } catch (error) {
        console.log(error);
    }
}

importStudents();