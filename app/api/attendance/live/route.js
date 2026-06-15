import { NextResponse } from "next/server";

import connectDB from "@/lib/db";
import Attendance from "@/models/attendance";

export async function GET() {
    try {
        await connectDB();

        const records = await Attendance
            .find()
            .sort({ createdAt: -1 });

        return NextResponse.json(records);

    } catch (error) {
        console.log(error);

        return NextResponse.json(
            { message: "Server Error" },
            { status: 500 }
        );
    }
}