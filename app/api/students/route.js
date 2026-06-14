import { NextResponse } from "next/server";
import connectDB from "@/lib/db.js";
import Student from "@/models/student.js";

export async function GET() {
    await connectDB();

    const students = await Student.find();

    return NextResponse.json(students);
}
