import { NextResponse } from "next/server";

import connectDB from "@/lib/db";
import Student from "@/models/student";
import Attendance from "@/models/attendance";

export async function GET() {
    try {
        await connectDB();

        const today = new Date().toDateString();

        const totalStudents =
            await Student.countDocuments();

        const presentStudents =
            await Attendance.countDocuments({
                eventDate: today,
            });

        const absentStudents =
            totalStudents - presentStudents;

        const attendancePercentage =
            totalStudents === 0
                ? 0
                : ((presentStudents / totalStudents) * 100).toFixed(2);

        return NextResponse.json({
            totalStudents,
            presentStudents,
            absentStudents,
            attendancePercentage,
        });

    } catch (error) {
        console.log(error);

        return NextResponse.json(
            { message: "Server Error" },
            { status: 500 }
        );
    }
}