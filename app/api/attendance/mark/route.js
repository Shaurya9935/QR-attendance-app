import { NextResponse } from "next/server"

import connectDB from "@/lib/db.js";
import Student from "@/models/student.js";
import Attendance from "@/models/attendance.js";
import { eventBuildFeatureUsage } from "next/dist/telemetry/events";

export async function POST(req) {
    try {
        await connectDB();

        const { enrollmentNumber, markedBy } = await req.json();

        const student = await Student.findOne({
            enrollmentNumber
        })

        if (!student) {
            return NextResponse.json(
                { message: "Student not found" },
                { status: 404 }
            );
        }

        const today = new Date().toDateString();

        const alreadyMarked = await Attendance.findOne({
            enrollmentNumber,
            eventDate: today
        })

        if (alreadyMarked) {
            NextResponse.json(
                { message: "Attendance already Marked" },
                { status: 400 }
            );
        }

        console.log(student)
        await Attendance.create({
            enrollmentNumber,
            name: student.name,
            branch: student.branch,
            markedBy,
            eventDate: today,
        });

        return NextResponse.json({
            success: true,
            studentName: student.name
        })
    } catch (error) {
        console.log(error);

        return NextResponse.json(
            { message: "Server Error" },
            { status: 500 }
        )
    }

}